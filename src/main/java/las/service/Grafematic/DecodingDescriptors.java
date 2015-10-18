package las.service.Grafematic;

import java.io.*;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Scanner;

public class DecodingDescriptors {

    public HashMap<String, String> spellOutDescriptors() {
        HashMap<String, String> result = new HashMap<String, String>();
        try {
            Scanner file = new Scanner(Paths.get
                    ("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\list-of-descriptors\\Dialing-AOT.txt"));
            while (file.hasNextLine()) {
                String line = file.nextLine();
                Integer position = line.indexOf(' ');
                if (position != -1) {
                    result.put(line.substring(0, position), line.substring(position + 1));
                }
            }
            file.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
}