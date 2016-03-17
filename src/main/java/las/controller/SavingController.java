package las.controller;

import las.model.TokenList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class SavingController {


    @ResponseBody
    @RequestMapping(value = "/result-save.html")
    public String resultSave(@RequestBody TokenList tokens) {

//        XmlObject xobj = null;
//        try {
//            xobj = XmlObject.Factory.parse(new File
//                    ("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\main\\webapp\\resources\\results\\mystem-output.xml"));
//        } catch (Exception e) {
//            System.err.println(e.getMessage());
//        }
//        XmlCursor cursor = xobj.newCursor();
//        cursor.selectPath("*//w");
//        int i = 0;
//        while (cursor.hasNextSelection()) {
//
//            cursor.toNextSelection();
//
//            Boolean t = cursor.toFirstChild();
//            while (t) {
//                for (String descr: tokens.tokens[i].getDescriptors()) {
//                    if (cursor.getAttributeText(new QName("gr")).equals(descr)) {
//                        cursor.removeXml();
//                        break;
//                    }
//                }
//                cursor.toNextSibling(new QName("ana"));
//            }
//            cursor.toParent();
//            ++i;
//        }
//
//        try {
//            xobj.save(new File
//                    ("C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\main\\webapp\\resources\\results\\mystem-output.xml"));
//        } catch (Exception e) {
//            System.err.println(e.getMessage());
//        }

        return "";
    }
}
