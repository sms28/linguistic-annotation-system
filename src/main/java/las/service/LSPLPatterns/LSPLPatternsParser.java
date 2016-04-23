package las.service.LSPLPatterns;

import las.service.Grafematic.GrafematicWordDescription;
import las.service.Position;
import org.apache.xmlbeans.XmlCursor;
import org.apache.xmlbeans.XmlObject;

import javax.xml.namespace.QName;
import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Scanner;

public class LSPLPatternsParser {

    private static String PATH = "C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\Parsers\\";

    public LSPLPatternsParser() {}

    private void startLSPLPatternsAnalyzer() {
        try {
            ProcessBuilder procBuilder = new ProcessBuilder(
                    PATH + "lspl-tools-patterns\\bin\\lspl-find",
                    "-i",
                    PATH + "text\\lspl-input.txt",
                    "-p",
                    PATH + "text\\lspl-input-patterns.txt",
                    "-o",
                    PATH + "text\\lspl-output.xml",
                    "-t",
                    PATH + "text\\lspl-output-text.xml",
                    "-r",
                    PATH + "text\\lspl-output-patterns.xml",
                    "AP", "AT", "ATT", "APT");
            procBuilder.redirectErrorStream(true);

            Process process = procBuilder.start();
            InputStream stdout = process.getInputStream();
            InputStreamReader isrStdout = new InputStreamReader(stdout);
            BufferedReader brStdout = new BufferedReader(isrStdout);

            String programLine = null;
            while ((programLine = brStdout.readLine()) != null) {
                System.out.println(programLine);
            }

            int exitVal = process.waitFor();

            if (exitVal != 0) {
                System.err.println("Ошибка в работе lspl");
            }
        } catch(Exception e) {
            System.err.println(e.getMessage());
        }
    }

    private void writeToFile(String input) throws FileNotFoundException {
        PrintWriter inputFile = new PrintWriter
                (PATH + "text\\lspl-input.txt");
        inputFile.print(input);
        inputFile.close();
    }

    public ArrayList<LSPLPatternsWordDescription> parse(String input, ArrayList<GrafematicWordDescription> grafanData) {

        ArrayList<LSPLPatternsWordDescription> result = null;
        try {
            writeToFile(input);
            startLSPLPatternsAnalyzer();
            result = handle(grafanData);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }

    private ArrayList<Position> getTermsPositions() {
        ArrayList<Position> termPositions = new ArrayList<Position>();

        XmlObject xobj = null;
        try {
            xobj = XmlObject.Factory.parse(new File
                    (PATH + "text\\lspl-output.xml"));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        XmlCursor cursor = xobj.newCursor();

        cursor.selectPath("*//match");

        Integer prevBegin = -1;

        while (cursor.hasNextSelection()) {
            cursor.toNextSelection();
            Integer begin = Integer.parseInt(cursor.getAttributeText(new QName("startPos")));
            Integer end = Integer.parseInt(cursor.getAttributeText(new QName("endPos")));

            if (!prevBegin.equals(begin)) {
                termPositions.add(new Position(begin, end));
                prevBegin = begin;
            }
        }

        return termPositions;
    }

    /**
     * Attention! Required grafan parser results
     * @return ArrayList<LSPLPatternsWordDescription>
     */
    private ArrayList<LSPLPatternsWordDescription> handle(ArrayList<GrafematicWordDescription> grafanData) {

        ArrayList<Position> termPositions = getTermsPositions();
        ArrayList<LSPLPatternsWordDescription> descriptionData = new ArrayList<LSPLPatternsWordDescription>();

        Boolean isBeginSearch = false,
                isEndSearch = false;
        Integer searchPosition = -1,
                j = 0,
                descriptionDataSize = 0,
                possibleBegin = 0;


        if (!termPositions.isEmpty()) {
            isBeginSearch = true;
            searchPosition = termPositions.get(j).begin;

        }
        for (GrafematicWordDescription grafanItem : grafanData) {
            descriptionData.add(new LSPLPatternsWordDescription(grafanItem.word, new ArrayList<String>()));

            while (isBeginSearch && grafanItem.begin > searchPosition) {
                ++j;
                isBeginSearch = false;
                if (!j.equals(termPositions.size())) {
                    isBeginSearch = true;
                    searchPosition = termPositions.get(j).begin;
                }
            }

            if (isBeginSearch && grafanItem.begin.equals(searchPosition)) {
                isBeginSearch = false;
                isEndSearch = true;
                possibleBegin = descriptionDataSize;
                searchPosition = termPositions.get(j).end;
            }

            if (isEndSearch && grafanItem.end > searchPosition) {
                ++j;
                isEndSearch = false;
                if (!j.equals(termPositions.size())) {
                    isBeginSearch = true;
                    searchPosition = termPositions.get(j).begin;
                }
            }

            if (isEndSearch && grafanItem.end.equals(searchPosition)) {
                descriptionData.get(possibleBegin).properties.add("TERM_BEGIN");
                descriptionData.get(descriptionDataSize).properties.add("TERM_END");
                ++j;
                isEndSearch = false;
                if (!j.equals(termPositions.size())) {
                    isBeginSearch = true;
                    searchPosition = termPositions.get(j).begin;
                }
            }

            ++descriptionDataSize;
        }
        return descriptionData;
    }
}
