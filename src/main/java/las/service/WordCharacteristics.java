package las.service;


import las.service.Mystem.MystemLemma;
import java.util.ArrayList;

public class WordCharacteristics {
    public String word;
    public ArrayList<String> grafematicData;
    public ArrayList<MystemLemma> morphologicalData;

    public WordCharacteristics(String word, ArrayList<String> grafematicData, ArrayList<MystemLemma> morphologicalData)
    {
        this.word = word;
        this.grafematicData = grafematicData;
        this.morphologicalData = morphologicalData;
    }
}
