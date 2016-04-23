package las.service.LSPLPatterns;

import java.io.Serializable;
import java.util.ArrayList;

public class LSPLPatternsWordDescription implements Serializable {

    private static final long serialVersionUID = 1L;
    public String word;
    public ArrayList<String> properties;

    public LSPLPatternsWordDescription() {
        this.properties = new ArrayList<String>();
    }

    public LSPLPatternsWordDescription(String word, ArrayList<String> properties) {
        this.word = word;
        this.properties = properties;
    }
}