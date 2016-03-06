package las.service.Grafematic;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Scanner;

public class Parser {

    public Parser() {}

    private void startGrafematicAnalyzer() {
        try {
            String line;
            Process p = Runtime.getRuntime().exec("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\Parsers\\GraphAn.exe");
            p.waitFor();
            BufferedReader bri = new BufferedReader(new InputStreamReader(p.getInputStream()));
            BufferedReader bre = new BufferedReader(new InputStreamReader(p.getErrorStream()));
            while ((line = bri.readLine()) != null) {
                System.out.println(line);
            }
            bri.close();
            while ((line = bre.readLine()) != null) {
                System.out.println(line);
            }
            bre.close();
            p.waitFor();
        }
        catch (Exception err) {
            err.printStackTrace();
        }
    }

    private void writeToFile(String input) throws FileNotFoundException{
        PrintWriter inputFile = new PrintWriter
                ("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\Parsers\\text\\input.txt");
        inputFile.print(input);
        inputFile.close();
    }

    public ArrayList<DescriptionList> parse(final String input) throws IllegalArgumentException, FileNotFoundException {

        ArrayList<DescriptionList> result = null;
            try {
                writeToFile(input);
                startGrafematicAnalyzer();
                Scanner outputFile = new Scanner(Paths.get
                        ("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\Parsers\\text\\output.gra"));
                result = handle(outputFile);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        return result;
    }

    private ArrayList<DescriptionList> handle(Scanner scanner) {

        ArrayList<DescriptionList> descriptionData = new ArrayList<DescriptionList>();
        //skip processing the first blank line
        Scanner line = new Scanner(scanner.nextLine());
        line.close();

        while (scanner.hasNextLine()) {
            line = new Scanner(scanner.nextLine());
            DescriptionList res = new DescriptionList();
            res.word = line.next();
            res.begin = line.nextInt();
            res.length = line.nextInt();
            res.properties = new ArrayList<String>();
            while (line.hasNext()) {
                res.properties.add(line.next());
            }
            descriptionData.add(res);
            line.close();
        }
        scanner.close();
        return descriptionData;
    }
}
