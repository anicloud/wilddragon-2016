package models.service.function;

import models.dto.function.FunctionMetaData;

import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
public interface FunctionServiceAdapter {
    // get
    FunctionMetaData getFunction(Long groupId, Integer FunctionId);
    Set<FunctionMetaData> findFunctionsByGroupId(Long groupId);

    // update
    FunctionMetaData updateFunction(FunctionMetaData functionMetaData);

    // create
    FunctionMetaData createFunction(FunctionMetaData functionMetaData);

    // delete
    FunctionMetaData deleteFunction(FunctionMetaData functionMetaData);
}
