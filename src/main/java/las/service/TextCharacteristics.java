package las.service;

import las.service.Grafematic.GrafematicWordDescription;
import las.service.Mystem.MystemWordDescription;
import las.service.Mystem.MystemLemma;

import java.util.ArrayList;
import java.util.HashMap;

public class TextCharacteristics {

    public HashMap<Integer, WordCharacteristics> text;


    public TextCharacteristics(ArrayList<GrafematicWordDescription> textGrafematic, ArrayList<MystemWordDescription> textMorphological) {
        text = new HashMap<Integer, WordCharacteristics>();

        int key = 0;

        int gSize = textGrafematic.size();
        int mSize = textMorphological.size();
        int gIndex = 0;

        for (int mIndex = 0; mIndex < mSize; ++mIndex) {
            String mWord = textMorphological.get(mIndex).word;
            while (gIndex < gSize && !mWord.equals(textGrafematic.get(gIndex).word)) {

                // Добавление в результирующий список слова только с графематической обработкой
                text.put(key++,
                         new WordCharacteristics
                             (textGrafematic.get(gIndex).word,
                              textGrafematic.get(gIndex).properties,
                              new ArrayList<MystemLemma>())
                         );

                ++gIndex;
            }

            if (gIndex >= gSize) {
                // Добавление в результирующий список слова только с морфологической обработкой
                text.put(key++,
                        new WordCharacteristics
                                (mWord,
                                 new ArrayList<String>(),
                                 textMorphological.get(mIndex).lemmas)
                        );
            } else {
                // Добавление в результирующий список слова со всеми обработками
                text.put(key++,
                        new WordCharacteristics
                                (mWord,
                                 textGrafematic.get(gIndex).properties,
                                 textMorphological.get(mIndex).lemmas)
                );
                ++gIndex;
            }
        }

        // Добавление оставшихся слов с графематической обработкой
        while (gIndex < gSize) {
            text.put(key++,
                    new WordCharacteristics
                            (textGrafematic.get(gIndex).word,
                             textGrafematic.get(gIndex).properties,
                             new ArrayList<MystemLemma>())
            );

            ++gIndex;
        }
    }
}
