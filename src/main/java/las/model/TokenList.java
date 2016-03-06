package las.model;


import java.util.List;

public class TokenList {
    public Token[] tokens;

    public Token[] getTokens() {
        return tokens;
    }

    public void setTokens(Token[] tokens) {
        this.tokens = tokens.clone();
    }
}