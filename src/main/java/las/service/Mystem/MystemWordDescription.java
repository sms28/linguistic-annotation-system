package las.service.Mystem;

import java.io.Serializable;
import java.util.ArrayList;

public class MystemWordDescription implements Serializable {

    private static final long serialVersionUID = 1L;
    public String word;
    public ArrayList<MystemLemma> lemmas;

    public MystemWordDescription() {
        this.lemmas = new ArrayList<MystemLemma>();
    }

}