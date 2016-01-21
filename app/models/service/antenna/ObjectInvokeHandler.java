package models.service.antenna;

import com.ani.octopus.antenna.core.dto.stub.StubInvocationDto;
import com.ani.octopus.antenna.infrastructure.service.ObjectInvokeListener;
import com.ani.octopus.commons.object.dto.object.ObjectQueryDto;
import org.springframework.stereotype.Component;

import java.rmi.RemoteException;
import java.util.List;

/**
 * Created by huangbin on 12/28/15.
 */
@Component("objectInvokeListener")
public class ObjectInvokeHandler implements ObjectInvokeListener {

    @Override
    public void onInvokeObject(ObjectQueryDto objectQueryDto, List<StubInvocationDto> list) throws RemoteException {
    }
}
