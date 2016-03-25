package las.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;


@Controller
public class DownloadController {
    @RequestMapping(value="/download", method = RequestMethod.GET)
    public String download(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment;filename=text.xml");

        try {
            File file = new File(
                    "C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\src\\main\\webapp\\resources\\results\\mystem-output.xml");
            FileInputStream fileIn = new FileInputStream(file);
            ServletOutputStream out = response.getOutputStream();

            byte[] outputByte = new byte[4096];
            Integer length = fileIn.read(outputByte, 0, 4096);
            while(length != -1) {
                out.write(outputByte, 0, length);
                length = fileIn.read(outputByte, 0, 4096);
            }
            fileIn.close();
            out.flush();
            out.close();
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }

        return "";
    }
}