# Edit this file to set custom options
# Tomcat accepts two parameters JAVA_OPTS and CATALINA_OPTS
# JAVA_OPTS are used during START/STOP/RUN
# CATALINA_OPTS are used during START/RUN

JAVA_HOME="/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home"
AGENT_PATHS=""
JAVA_AGENTS=""
JAVA_LIBRARY_PATH=""
CLASSPATH="$CATALINA_BASE/bin/insight-bootstrap-tcserver-1.8.3.RELEASE.jar:$CATALINA_BASE/lib/aspectjweaver-1.6.12.M2.jar"
JVM_OPTS="-Dinsight.base=$CATALINA_BASE/insight -Dinsight.logs=$CATALINA_BASE/logs -Djava.awt.headless=true -Dgemfire.disableShutdownHook=true -Dgemfire.ignoreMisses=true -Xmx1024m -XX:MaxPermSize=256m -Xss256K"
JAVA_OPTS="$JVM_OPTS $AGENT_PATHS $JAVA_AGENTS $JAVA_LIBRARY_PATH"
