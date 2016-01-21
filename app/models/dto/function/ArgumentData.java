package models.dto.function;

/**
 * Created by huangbin on 12/14/15.
 */
public class ArgumentData {
    public ArgumentType type;
    public String name;

    public ArgumentData(ArgumentType type, String name) {
        this.type = type;
        this.name = name;
    }
}
