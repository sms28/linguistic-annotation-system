package las.service.Grafematic;

import java.io.*;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Scanner;

public class HandleTokens {

    public HashMap<String, String> spellOutDescriptors() {
        HashMap<String, String> map = new HashMap<String, String>();
        try {
            Scanner file = new Scanner(Paths.get
                    ("C:\\Users\\hp9\\workspace\\LinguisticTextMarkupProgram\\list-of-descriptors\\Dialing-AOT.txt"));
            while (file.hasNextLine()) {
                Scanner line = new Scanner(file.nextLine());
                map.put(line.next(), line.nextLine());
                line.close();
            }
            file.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return map;
    }
}
