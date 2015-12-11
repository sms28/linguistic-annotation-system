package las.controller;

import las.model.TokenList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class SavingController {


    @ResponseBody
    @RequestMapping(value = "/result-save.html")
    public String resultSave(@RequestBody TokenList tokens) {

        System.out.println(tokens.getTokens().length);
        return "";
    }
}
