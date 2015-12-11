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
import java.io.InputStream;


@Controller
public class DownloadController {
    @RequestMapping(value="/download", method = RequestMethod.GET)
    public String download(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment;filename=text.txt");

        try {
            ServletOutputStream servletOut;
            FileInputStream fin = new FileInputStream(
                    request.getSession().getServletContext().getRealPath("") + "\\resources\\results\\result.txt");
            response.setContentLength(fin.available());
             servletOut = response.getOutputStream();

            int i;
            while ((i = fin.read()) != -1){

                servletOut.write(i);

            }
            servletOut.close();

        } catch(Exception e) {
            System.out.println(e.getMessage());
        }

        return "";
    }
}