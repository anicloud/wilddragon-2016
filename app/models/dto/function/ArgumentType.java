package models.dto.function;

/**
 * Created by huangbin on 12/17/15.
 */
public class ArgumentType {
    public final Type type;
    public final ArgumentType componentType;

    public enum Type {
        VOID,
        BOOLEAN,
        BYTE,
        CHAR,
        SHORT,
        INTEGER,
        LONG,
        FLOAT,
        DOUBLE,
        STRING,
        ARRAY;
    }

    public ArgumentType(Type type) {
        this.type = type;
        this.componentType = null;
    }

    public ArgumentType(Type type, ArgumentType componentType) {
        this.type = type;
        this.componentType = componentType;
    }

    public boolean isArray() {
        return (type == Type.ARRAY);
    }
}
