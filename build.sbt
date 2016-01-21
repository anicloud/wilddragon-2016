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

libraryDependencies += "org.aspectj" % "aspectjrt" % "1.7.3"

libraryDependencies += "org.aspectj" % "aspectjweaver" % "1.8.5"

libraryDependencies += "org.aspectj" % "aspectjweaver" % "1.8.5"

//javax
libraryDependencies += "javax" % "javaee-api" % "7.0"

//Spring
libraryDependencies += "org.springframework" % "spring-core" % "4.1.6.RELEASE"

libraryDependencies += "org.springframework" % "spring-context" % "4.1.6.RELEASE"

libraryDependencies += "org.springframework" % "spring-aop" % "4.1.6.RELEASE"

libraryDependencies += "org.springframework" % "spring-beans" % "4.1.6.RELEASE"

libraryDependencies += "org.springframework" % "spring-expression" % "4.1.6.RELEASE"

libraryDependencies += "org.springframework" % "spring-jms" % "4.1.6.RELEASE"

//activemq
libraryDependencies += "org.apache.activemq" % "activemq-core" % "5.7.0"

libraryDependencies += "org.apache.activemq" % "activemq-pool" % "5.11.1"

libraryDependencies += "org.apache.activemq" % "activemq-spring" % "5.11.1"

// octopus
libraryDependencies += "com.ani.octopus" % "octopus-commons" % "1.0"

libraryDependencies += "com.ani.bus.commons" % "device-bus-commons" % "1.0"

libraryDependencies += "com.ani.octopus.account" % "account-manager" % "1.0"

libraryDependencies += "com.ani.octopus.stub" % "stub-meta" % "1.0"

libraryDependencies += "com.ani.octopus.antenna" % "octopus-antenna" % "1.0"

libraryDependencies += "com.ani.bus.device" % "device-bus" % "1.0"

libraryDependencies += "com.ani.bus.service" % "service-bus" % "1.0"