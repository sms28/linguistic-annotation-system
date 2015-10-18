package las.service.Grafematic;

import java.io.Serializable;
import java.util.ArrayList;

public class DescriptionList implements Serializable {

    private static final long serialVersionUID = 1L;
    public String word;
    public Integer begin, length;
    public ArrayList<String> properties;

    public DescriptionList() {}
}