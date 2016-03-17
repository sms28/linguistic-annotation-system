package las.service.Mystem;

import las.service.DescriptionList;

import java.io.Serializable;
import java.util.ArrayList;

public class MystemDescriptionList implements Serializable, DescriptionList {

    private static final long serialVersionUID = 1L;
    public String word;
    public ArrayList<MystemLemma> lemmas;

}