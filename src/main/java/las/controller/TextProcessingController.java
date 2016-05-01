package las.controller;

import las.service.EnglishRussianTitle;
import las.service.Grafematic.GrafematicDecodingDescriptors;
import las.service.Grafematic.GrafematicWordDescription;
import las.service.Grafematic.GrafematicParser;
import las.service.LSPLPatterns.LSPLPatternsParser;
import las.service.LSPLPatterns.LSPLPatternsWordDescription;
import las.service.TextCharacteristics;
import las.service.Mystem.MystemDecodingDescriptors;
import las.service.Mystem.MystemWordDescription;
import las.service.Mystem.MystemParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@Controller
@RequestMapping("/text-processing.html")
public class TextProcessingController {
    @RequestMapping(method = RequestMethod.GET)
    public String redirect() {
        return "index";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String textProcessing(@RequestParam(value="inputText") String text,
                                 @RequestParam(value="annotationType") String select, ModelMap model) {


        // Извлечение и объединение всех дескрипторов
        GrafematicDecodingDescriptors grafematicDecoding = new GrafematicDecodingDescriptors();
        HashMap<String, EnglishRussianTitle> grafematicDescriptors = grafematicDecoding.spellOutDescriptors();

        MystemDecodingDescriptors morphologicalDecoding = new MystemDecodingDescriptors();
        HashMap<String, EnglishRussianTitle> morphologicalDescriptors = morphologicalDecoding.spellOutDescriptors();


        model.addAttribute("grafanDescriptors", grafematicDescriptors);
        model.addAttribute("mystemDescriptors", morphologicalDescriptors);



        TextCharacteristics tokens = null;
        ArrayList<GrafematicWordDescription> grafanData = new ArrayList<GrafematicWordDescription>();
        ArrayList<MystemWordDescription> mystemData = new ArrayList<MystemWordDescription>();
        ArrayList<LSPLPatternsWordDescription> termData = new ArrayList<LSPLPatternsWordDescription>();


        // Графематическая разметка
        if (select.equals("grafan") ||
            select.equals("grafan&mystem") ||
            select.equals("grafan&term") ||
            select.equals("grafan&term&mystem")) {
                GrafematicParser parser = new GrafematicParser();
                grafanData = parser.parse(text);
        }


        // Морфологическая разметка
        if (select.equals("mystem") ||
            select.equals("grafan&mystem") ||
            select.equals("grafan&term&mystem")) {
                MystemParser parser = new MystemParser();
                mystemData = parser.parse(text);
        }


        // Терминологическая разметка
        if (select.equals("grafan&term") ||
            select.equals("grafan&term&mystem")) {
                LSPLPatternsParser parser = new LSPLPatternsParser();
                termData = parser.parse(text, grafanData);
        }

        tokens = new TextCharacteristics(grafanData, mystemData, termData);

        model.addAttribute("tokens", tokens);

        return "result-of-processing";
    }
}
