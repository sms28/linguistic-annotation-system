package las.model;


import java.util.ArrayList;
import java.util.List;

public class Token {
    private String lemma;
    private String begin;
    private String length;
//    private List<String> descriptors;

    public String getBegin() {
        return begin;
    }

    public void setBegin(String begin) {
        this.begin = begin;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }
//
//    public List<String> getDescriptors() {
//        return descriptors;
//    }
//
//    public void setDescriptors(List<String> descriptors) {
//        this.descriptors = descriptors;
//    }

    public String getLemma() {
        return lemma;
    }

    public void setLemma(String lemma) {
        this.lemma = lemma;
    }
}