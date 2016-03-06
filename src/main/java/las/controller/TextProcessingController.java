package las.controller;

import las.model.TokenList;
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

    @ResponseBody
    @RequestMapping(method = RequestMethod.POST)
    public String textProcessing(@RequestBody String text, ModelMap model) throws Exception {
        System.out.println(text);

        // Для графана
//        Parser parser = new Parser();
//        model.addAttribute("tokens", parser.parse(inputText));
//        DecodingDescriptors descriptors = new DecodingDescriptors();
//        model.addAttribute("descriptors", descriptors.spellOutDescriptors());
//        return "result-of-processing";

        // Mystem
        las.service.Mystem.DecodingDescriptors descriptors = new las.service.Mystem.DecodingDescriptors();
        model.addAttribute("descriptors", descriptors.spellOutDescriptors());
        las.service.Mystem.Parser parser = new las.service.Mystem.Parser();
        model.addAttribute("tokens", parser.parse(text));
        return "result-of-processing-mystem";
    }
}
