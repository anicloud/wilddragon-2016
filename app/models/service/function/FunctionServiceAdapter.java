package models.service.function;

import models.dto.device.FunctionData;
import models.dto.function.FunctionMetaData;

import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
public interface FunctionServiceAdapter {
    // find
    FunctionMetaData findFunctionMeta(Long groupId, Integer functionId);
    List<FunctionMetaData> findFunctionMetasByDevice(Long masterId);
    List<FunctionMetaData> findFunctionMetasByDevice(Long masterId, Integer slaveId);

    // update
    FunctionMetaData updateFunctionMeta(FunctionMetaData functionMetaData);

    // create
    FunctionMetaData createFunctionMeta(FunctionMetaData functionMetaData);

    // delete
    FunctionMetaData deleteFunction(FunctionMetaData functionMetaData);
}
