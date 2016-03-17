package las.service.Grafematic;

import las.service.DescriptionList;

import java.io.Serializable;
import java.util.ArrayList;

public class GrafematicDescriptionList implements Serializable, DescriptionList {

    private static final long serialVersionUID = 1L;
    public String word;
    public Integer begin, length;
    public ArrayList<String> properties;

    public GrafematicDescriptionList() {}
}