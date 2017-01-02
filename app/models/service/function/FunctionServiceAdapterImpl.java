package models.service.function;

import com.ani.bus.device.commons.dto.device.DeviceMasterDto;
import com.ani.bus.device.commons.dto.device.DeviceSlaveDto;
import com.ani.bus.device.commons.dto.device.FunctionDto;
import com.ani.bus.device.infrastructure.service.DeviceBusService;
import com.ani.octopus.commons.stub.dto.StubDto;
import com.ani.octopus.stub.core.domain.stub.Stub;
import com.ani.octopus.stub.core.service.AniStubMetaService;
import models.dto.function.FunctionDataUtils;
import models.dto.function.FunctionMetaData;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("functionServiceAdapter")
public class FunctionServiceAdapterImpl implements FunctionServiceAdapter {
    @Resource
    AniStubMetaService aniStubMetaService;

    @Resource
    private DeviceBusService deviceBusService;

    @Override
    public FunctionMetaData findFunctionMeta(Long groupId, Integer functionId) {
        if (groupId == null || functionId == null) {
            return null;
        }
        Stub stub = aniStubMetaService.getStub(new StubDto(groupId, functionId));
        return FunctionDataUtils.fromFunctionMetaDto(stub);
    }

    @Override
    public List<FunctionMetaData> findFunctionMetasByDevice(Long masterId) {
        DeviceMasterDto masterDto = deviceBusService.findDeviceMaster(masterId);
        List<FunctionMetaData> metaDatas = null;
        if (masterDto.functions != null) {
            metaDatas = new ArrayList<>(masterDto.functions.size());
            for (FunctionDto functionDto : masterDto.functions) {
                metaDatas.add(findFunctionMeta(functionDto.groupId, functionDto.functionId));
            }
        }
        return metaDatas;
    }

    @Override
    public List<FunctionMetaData> findFunctionMetasByDevice(Long masterId, Integer slaveId) {
        DeviceSlaveDto slaveDto = deviceBusService.findDeviceSlave(masterId, slaveId);
        List<FunctionMetaData> metaDatas = null;
        if (slaveDto.functions != null) {
            metaDatas = new ArrayList<>(slaveDto.functions.size());
            for (FunctionDto functionDto : slaveDto.functions) {
                metaDatas.add(findFunctionMeta(functionDto.groupId, functionDto.functionId));
            }
        }
        return metaDatas;
    }

    @Override
    public FunctionMetaData updateFunctionMeta(FunctionMetaData functionMetaData) {
        if (functionMetaData == null) {
            return null;
        }
        return null;
    }

    @Override
    public FunctionMetaData createFunctionMeta(FunctionMetaData functionMetaData) {
        return null;
    }

    @Override
    public FunctionMetaData deleteFunction(FunctionMetaData functionMetaData) {
        return null;
    }
}
