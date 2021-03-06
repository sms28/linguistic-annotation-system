package las.service.Mystem;

import org.apache.xmlbeans.XmlCursor;
import org.apache.xmlbeans.XmlObject;

import javax.xml.namespace.QName;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class MystemParser {

    private static String PATH = "C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\Parsers\\";

    public MystemParser() {}

    private void startMystemAnalyzer() {
        try {
            ProcessBuilder procBuilder = new ProcessBuilder(
                    PATH + "mystem.exe",
                    "-ni", "--format", "xml", "--eng-gr",
                    PATH + "text\\mystem-input.txt",
                    PATH + "text\\mystem-output.xml");
            procBuilder.redirectErrorStream(true);

            Process process = procBuilder.start();
            InputStream stdout = process.getInputStream();
            InputStreamReader isrStdout = new InputStreamReader(stdout);
            BufferedReader brStdout = new BufferedReader(isrStdout);

            String programLine;
            while ((programLine = brStdout.readLine()) != null) {
                System.out.println(programLine);
            }

            int exitVal = process.waitFor();

            if (exitVal != 0) {
                System.err.println("Ошибка в работе mystem");
            }
        } catch(Exception e) {
            System.err.println(e.getMessage());
        }
    }

    private void writeToFile(String input) throws FileNotFoundException{
        PrintWriter inputFile = new PrintWriter(new OutputStreamWriter(new FileOutputStream(
                PATH + "text\\mystem-input.txt"),
                StandardCharsets.UTF_8), true);
        inputFile.print(input);
        inputFile.close();
    }

    private ArrayList<String> retrieveGrInformation(String gr) {
        ArrayList<String> props = new ArrayList<String>();

        int begin = 0;
        int end = Math.min(gr.indexOf('='), gr.indexOf(','));
        if (end == -1) { end = Math.max(gr.indexOf('='), gr.indexOf(',')); }
        while (end != -1) {
            props.add(gr.substring(begin, end));
            begin = end + 1;
            end = Math.min(gr.indexOf('=', begin), gr.indexOf(',', begin));
            if (end == -1) { end = Math.max(gr.indexOf('=', begin), gr.indexOf(',', begin)); }
        }
        props.add(gr.substring(begin, gr.length()));
        return props;
    }

    public ArrayList<MystemWordDescription> retrieveDescrXML() {

        ArrayList<MystemWordDescription> list = new ArrayList<MystemWordDescription>();

        XmlObject xobj = null;
        try {
            xobj = XmlObject.Factory.parse(new File
                    (PATH + "text\\mystem-output.xml"));
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        XmlCursor cursor = xobj.newCursor();
        cursor.selectPath("*//w");
        while (cursor.hasNextSelection()) {

            MystemWordDescription word = new MystemWordDescription();
            cursor.toNextSelection();

            word.word = cursor.getTextValue();
            word.lemmas = new ArrayList<MystemLemma>();

            Boolean t = cursor.toFirstChild();
            while (t) {
                MystemLemma lemma = new MystemLemma();
                lemma.lemma = cursor.getAttributeText(new QName("lex"));
                String xmlString = cursor.getAttributeText(new QName("gr"));
                lemma.properties = retrieveGrInformation(xmlString);
                word.lemmas.add(lemma);
                t = cursor.toNextSibling();
            }
            cursor.toParent();
            list.add(word);
        }

        return list;
    }

    public ArrayList<MystemWordDescription> parse(String input) {

        ArrayList<MystemWordDescription> result = null;
            try {
                writeToFile(input);

                startMystemAnalyzer();

                result = retrieveDescrXML();
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        return result;
    }

}
