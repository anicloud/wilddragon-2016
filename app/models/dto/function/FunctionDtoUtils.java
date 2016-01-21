package models.dto.function;


import com.ani.octopus.commons.stub.enumeration.PrivilegeType;
import com.ani.octopus.commons.stub.enumeration.StubConnType;
import com.ani.octopus.commons.stub.type.DataCollectionType;
import com.ani.octopus.commons.stub.type.DataPrimitiveType;
import com.ani.octopus.commons.stub.type.DataType;
import com.ani.octopus.stub.core.domain.stub.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by huangbin on 12/17/15.
 */
public class FunctionDtoUtils {
    public static ArgumentType fromArgumentTypeDto(DataType dataType) {
        ArgumentType type = null;
        if (dataType != null) {
            if (dataType instanceof DataCollectionType) {
                DataCollectionType collectionType = (DataCollectionType) dataType;
                type = new ArgumentType(ArgumentType.Type.ARRAY, fromArgumentTypeDto(collectionType.membersDataType));
            } else {
                DataPrimitiveType primitiveType = (DataPrimitiveType) dataType;
                switch (primitiveType.type) {
                    case BOOLEAN:
                        type = new ArgumentType(ArgumentType.Type.BOOLEAN);
                        break;
                    case INTEGER:
                        type = new ArgumentType(ArgumentType.Type.INTEGER);
                        break;
                    case PERCENTAGE:
                        type = new ArgumentType(ArgumentType.Type.SHORT);
                        break;
                    case FLOAT:
                        type = new ArgumentType(ArgumentType.Type.FLOAT);
                        break;
                    case STRING:
                    default:
                        type = new ArgumentType(ArgumentType.Type.STRING);
                        break;
                }
            }
        }
        return type;
    }

    public static ArgumentData fromArgumentDto(StubArgument ArgumentDto) {
        if (ArgumentDto == null) {
            return null;
        }
        return new ArgumentData(fromArgumentTypeDto(ArgumentDto.dataType), ArgumentDto.name);
    }

    public static List<ArgumentData> fromArgumentDtos(List<StubArgument> ArgumentDtos) {
        if (ArgumentDtos == null) {
            return null;
        }
        List<ArgumentData> argumentDatas = new ArrayList<>(ArgumentDtos.size());
        for (int i=0; i<ArgumentDtos.size(); i++) {
            argumentDatas.add(i, fromArgumentDto(ArgumentDtos.get(i)));
        }
        return argumentDatas;
    }

    public static FunctionConnType fromFunctionConnTypeDto(StubConnType connTypeDto) {
        FunctionConnType connType = FunctionConnType.SYNC;
        if (connTypeDto == StubConnType.ASYNC) {
            connType = FunctionConnType.ASYNC;
        }
        return connType;
    }

    public static FunctionPrivilegeType fromFunctionPrivilegeTypeDto(PrivilegeType typeDto) {
        FunctionPrivilegeType type = FunctionPrivilegeType.READABLE;
        if (typeDto == PrivilegeType.WRITE) {
            type = FunctionPrivilegeType.WRITABLE;
        } else if (typeDto == PrivilegeType.EXECUTE) {
            type = FunctionPrivilegeType.EXECUTABLE;
        }
        return type;
    }

    public static FunctionGroupData fromFunctionGroupDto(StubGroup groupDto) {
        if (groupDto == null) {
            return null;
        }
        return new FunctionGroupData(groupDto.groupId, groupDto.name);
    }

    public static FunctionMetaData fromFunctionMetaDto(Stub metaDto) {
        if (metaDto == null) {
            return null;
        }
        FunctionMetaData functionMetaData = new FunctionMetaData(metaDto.stubId, metaDto.name,
                fromFunctionGroupDto(metaDto.group),
                fromArgumentDtos(metaDto.inputArguments),
                fromArgumentDtos(metaDto.outputArguments),
                fromFunctionConnTypeDto(metaDto.connType),
                fromFunctionPrivilegeTypeDto(metaDto.privilegeType));

        return functionMetaData;
    }
}
