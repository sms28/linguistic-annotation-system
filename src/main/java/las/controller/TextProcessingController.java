package las.controller;

import las.service.Grafematic.DecodingDescriptors;
import las.service.Grafematic.Parser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/text-processing.html")
public class TextProcessingController {
    @RequestMapping(method = RequestMethod.GET)
    public String redirect() {
        return "index";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String textProcessing(@RequestParam("inputText") String inputText, ModelMap model) throws Exception {
        Parser parser = new Parser();
        model.addAttribute("tokens", parser.parse(inputText));
        DecodingDescriptors descriptors = new DecodingDescriptors();
        model.addAttribute("descriptors", descriptors.spellOutDescriptors());
        return "result-of-processing";
    }
}
