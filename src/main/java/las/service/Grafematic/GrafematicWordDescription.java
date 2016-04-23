package las.service.Grafematic;

import java.io.Serializable;
import java.util.ArrayList;

public class GrafematicWordDescription implements Serializable {

    private static final long serialVersionUID = 1L;
    public String word;
    public Integer begin;
    public Integer end;
    public ArrayList<String> properties;

    public GrafematicWordDescription() {
        this.properties = new ArrayList<String>();
    }
}