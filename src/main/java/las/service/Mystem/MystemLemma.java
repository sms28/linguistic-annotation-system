package las.service.Mystem;

import java.io.Serializable;
import java.util.ArrayList;

public class MystemLemma implements Serializable {

    private static final long serialVersionUID = 1L;
    public String lemma;
    public ArrayList<String> properties;

    public MystemLemma() {
        this.properties = new ArrayList<String>();
    }

}