name := "wilddragon"

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  javaWs
)

//log4j
libraryDependencies += "org.apache.logging.log4j" % "log4j-core" % "2.5"

libraryDependencies += "org.slf4j" % "slf4j-api" % "1.7.13"

libraryDependencies += "org.slf4j" % "slf4j-log4j12" % "1.7.13"

//pac4j
libraryDependencies += "org.pac4j" % "play-pac4j_java" % "1.4.0"

libraryDependencies += "org.pac4j" % "pac4j-cas" % "1.7.0"

//aspectj
libraryDependencies += "org.aspectj" % "aspectjrt" % "1.7.3"

libraryDependencies += "org.aspectj" % "aspectjweaver" % "1.8.5"

libraryDependencies += "org.aspectj" % "aspectjweaver" % "1.8.5"

//javax
libraryDependencies += "javax" % "javaee-api" % "7.0"

//Spring
libraryDependencies += "org.springframework" % "spring-core" % "4.3.1.RELEASE"

libraryDependencies += "org.springframework" % "spring-context" % "4.3.1.RELEASE"

libraryDependencies += "org.springframework" % "spring-aop" % "4.3.1.RELEASE"

libraryDependencies += "org.springframework" % "spring-beans" % "4.3.1.RELEASE"

libraryDependencies += "org.springframework" % "spring-expression" % "4.3.1.RELEASE"

libraryDependencies += "org.springframework" % "spring-jms" % "4.2.1.RELEASE"


libraryDependencies += "org.springframework.security" % "spring-security-core" % "3.2.7.RELEASE"

libraryDependencies += "org.hibernate" % "hibernate-core" % "4.3.11.Final"


//activemq
libraryDependencies += "org.apache.activemq" % "activemq-core" % "5.7.0"

libraryDependencies += "org.apache.activemq" % "activemq-pool" % "5.11.1"

libraryDependencies += "org.apache.activemq" % "activemq-spring" % "5.11.1"

//aliyun
libraryDependencies += "com.aliyun" % "aliyun-java-sdk-core" % "3.0.7"

libraryDependencies += "com.aliyun" % "aliyun-java-sdk-sts" % "2.1.6"

//amazon s3
libraryDependencies += "com.amazonaws" % "aws-java-sdk-s3" % "1.11.58"

////octopus
libraryDependencies += "com.ani.octopus" % "octopus-commons" % "1.0"

libraryDependencies += "com.ani.bus.commons" % "device-bus-commons" % "1.0"

libraryDependencies += "com.ani.bus.commons" % "service-bus-commons" % "1.0"

libraryDependencies += "com.ani.octopus.stub" % "stub-meta" % "1.0"

libraryDependencies += "com.ani.octopus.antenna" % "octopus-antenna" % "1.0"

libraryDependencies += "com.ani.bus.device" % "device-bus-core" % "1.0"

libraryDependencies += "com.ani.bus.service" % "service-core" % "1.0"