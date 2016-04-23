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


        // Только графематическая разметка
        if (select.equals("grafan")) {
            GrafematicParser parser = new GrafematicParser();
            tokens = new TextCharacteristics(parser.parse(text), new ArrayList<MystemWordDescription>());
        }

        // Только морфологическая разметка
        if (select.equals("mystem")) {
            MystemParser parser = new MystemParser();
            tokens = new TextCharacteristics(new ArrayList<GrafematicWordDescription>(), parser.parse(text));
        }

        // Морфологическая и графематическая разметка
        if (select.equals("mystem&grafan")) {
            GrafematicParser gParser = new GrafematicParser();
            MystemParser mParser = new MystemParser();
            tokens = new TextCharacteristics(gParser.parse(text), mParser.parse(text));
        }

        // Терминологическая разметка
        if (select.equals("term&grafan")) {
            GrafematicParser gParser = new GrafematicParser();
            LSPLPatternsParser lParser = new LSPLPatternsParser();
            ArrayList<GrafematicWordDescription> grafanData = gParser.parse(text);
            ArrayList<LSPLPatternsWordDescription> ksdjcsdhjds = lParser.parse(text, grafanData);
            tokens = new TextCharacteristics(grafanData, new ArrayList<MystemWordDescription>());
        }

        model.addAttribute("tokens", tokens);

        return "result-of-processing";
    }
}
