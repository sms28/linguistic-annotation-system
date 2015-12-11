package las.controller;

import las.model.Token;
import las.model.TokenList;
import las.service.Grafematic.DecodingDescriptors;
import las.service.Grafematic.Parser;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/result-save.html")
public class SavingController {

//    @RequestMapping(method=RequestMethod.POST,
//            consumes="application/json",headers = "content-type=application/x-www-form-urlencoded")
//    @ResponseBody
//    public String resultSave(HttpServletRequest request) throws Exception {
//        System.out.println(request.getParameter("meow"));
////        Parser parser = new Parser();
////        model.addAttribute("tokens", parser.parse(token));
//        //DecodingDescriptors descriptors = new DecodingDescriptors();
//        //model.addAttribute("descriptors", descriptors.spellOutDescriptors());
//        return "result-of-processing";
//    }

    @RequestMapping(method=RequestMethod.POST)
    @ResponseBody
    public String resultSave(@ModelAttribute(value="tokens") TokenList tokenList) {
        System.out.println();
        System.out.println(tokenList.getTokens().size());
//        System.out.println(request.getParameter("meow"));
//        Parser parser = new Parser();
//        model.addAttribute("tokens", parser.parse(token));
        //DecodingDescriptors descriptors = new DecodingDescriptors();
        //model.addAttribute("descriptors", descriptors.spellOutDescriptors());
        return "";
    }
}
