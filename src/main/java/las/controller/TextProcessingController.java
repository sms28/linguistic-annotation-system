package las.controller;

import las.service.DecodingDescriptors;
import las.service.Grafematic.GrafematicDecodingDescriptors;
import las.service.Grafematic.GrafematicParser;
import las.service.Mystem.MystemDecodingDescriptors;
import las.service.Mystem.MystemParser;
import las.service.Parser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

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

        Parser parser = null;
        DecodingDescriptors descriptors = null;
        String pageName = "";

        if (select.equals("grafan")) {
            parser = new GrafematicParser();
            descriptors = new GrafematicDecodingDescriptors();
            pageName = "result-of-processing";
        }

        if (select.equals("mystem")) {
            parser = new MystemParser();
            descriptors = new MystemDecodingDescriptors();
            pageName = "result-of-processing-mystem";
        }

        model.addAttribute("tokens", parser.parse(text));
        model.addAttribute("descriptors", descriptors.spellOutDescriptors());

        return pageName;
    }
}
