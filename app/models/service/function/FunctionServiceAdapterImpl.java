package models.service.function;

import com.ani.octopus.commons.stub.dto.StubDto;
import com.ani.octopus.stub.core.domain.stub.Stub;
import com.ani.octopus.stub.core.service.AniStubMetaService;
import models.dto.function.FunctionMetaData;
import models.dto.function.FunctionDtoUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("functionServiceAdapter")
public class FunctionServiceAdapterImpl implements FunctionServiceAdapter {
    @Resource
    AniStubMetaService stubMetaService;

    @Override
    public FunctionMetaData getFunction(Long groupId, Integer functionId) {
        StubDto stubDto = new StubDto(groupId, functionId);
        Stub stub = stubMetaService.getStub(stubDto);
        return FunctionDtoUtils.fromFunctionMetaDto(stub);
    }

    @Override
    public Set<FunctionMetaData> findFunctionsByGroupId(Long groupId) {
        return null;
    }

    @Override
    public FunctionMetaData updateFunction(FunctionMetaData functionMetaData) {

        return null;
    }

    @Override
    public FunctionMetaData createFunction(FunctionMetaData functionMetaData) {
        return null;
    }

    @Override
    public FunctionMetaData deleteFunction(FunctionMetaData functionMetaData) {
        return null;
    }
}
