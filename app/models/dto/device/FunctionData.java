package models.dto.device;

/**
 * Created by huangbin on 12/18/15.
 */
public class FunctionData {
    public Integer functionId;
    public Long groupId;

    public FunctionData(Integer functionId, Long groupId) {
        this.functionId = functionId;
        this.groupId = groupId;
    }
}
