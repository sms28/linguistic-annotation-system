package las.service;

import las.service.Grafematic.GrafematicDescriptionList;
import las.service.Mystem.MystemDescriptionList;
import las.service.Mystem.MystemLemma;

import java.util.ArrayList;
import java.util.HashMap;

public class GrafematicMystemText {

    public HashMap<Integer, GrafematicMystemDescriptionList> text;


    public GrafematicMystemText(ArrayList<GrafematicDescriptionList> grafematicText, ArrayList<MystemDescriptionList> morphologicalText) {
        text = new HashMap<Integer, GrafematicMystemDescriptionList>();

        int key = 0;

        int gSize = grafematicText.size();
        int mSize = morphologicalText.size();
        int gIndex = 0;

        for (int mIndex = 0; mIndex < mSize; ++mIndex) {
            String mWord = morphologicalText.get(mIndex).word;
            while (gIndex < gSize && !mWord.equals(grafematicText.get(gIndex).word)) {

                // Добавление в результирующий список слова только с графематической обработкой
                text.put(key++,
                         new GrafematicMystemDescriptionList
                             (grafematicText.get(gIndex).word,
                              grafematicText.get(gIndex).properties,
                              new ArrayList<MystemLemma>())
                         );

                ++gIndex;
            }

            if (gIndex >= gSize) {
                // Добавление в результирующий список слова только с морфологической обработкой
                text.put(key++,
                        new GrafematicMystemDescriptionList
                                (mWord,
                                 new ArrayList<String>(),
                                 morphologicalText.get(mIndex).lemmas)
                        );
            } else {
                // Добавление в результирующий список слова со всеми обработками
                text.put(key++,
                        new GrafematicMystemDescriptionList
                                (mWord,
                                 grafematicText.get(gIndex).properties,
                                 morphologicalText.get(mIndex).lemmas)
                );
                ++gIndex;
            }
        }

        // Добавление оставшихся слов с графематической обработкой
        while (gIndex < gSize) {
            text.put(key++,
                    new GrafematicMystemDescriptionList
                            (grafematicText.get(gIndex).word,
                             grafematicText.get(gIndex).properties,
                             new ArrayList<MystemLemma>())
            );

            ++gIndex;
        }
    }
}
