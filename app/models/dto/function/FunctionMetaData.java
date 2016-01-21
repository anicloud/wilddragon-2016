package models.dto.function;

import java.util.List;

/**
 * Created by huangbin on 12/14/15.
 */
public class FunctionMetaData {
    public Integer functionId;
    public String name;
    public FunctionGroupData group;
    public List<ArgumentData> input;
    public List<ArgumentData> output;
    public FunctionConnType connType;
    public FunctionPrivilegeType privilegeType;

    public FunctionMetaData(Integer functionId, String name, FunctionGroupData group,
                            List<ArgumentData> input, List<ArgumentData> output,
                            FunctionConnType connType, FunctionPrivilegeType privilegeType) {
        this.functionId = functionId;
        this.name = name;
        this.group = group;
        this.input = input;
        this.output = output;
        this.connType = connType;
        this.privilegeType = privilegeType;
    }
}
