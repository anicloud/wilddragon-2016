#!/bin/sh
if [ -d wilddragon-1.0 ]; then
    
    cd wilddragon-1.0;
    
    if [ ! -d logs ]; then
        mkdir logs;
    fi

    nohup bin/wilddragon \
          -Dhttp.port=disabled -Dhttps.port=9443 \
          -Dhttps.keyStore=/home/anicloud/.keystore/anicloud.cn.keystore \
          -Dhttps.keyStorePassword=Anicl0ud \
          > logs/run.log 2>&1 &
    exit;
fi
