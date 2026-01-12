# Init pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
	https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sivalabs</groupId>
    <artifactId>spring-boot-microservices</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>spring-boot-microservices</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <java.version>21</java.version>
        <maven.compiler.release>${java.version}</maven.compiler.release>
        <spotless-maven-plugin.version>3.0.0</spotless-maven-plugin.version>
    </properties>

    <modules></modules>
</project>
```
# Manage version project with https://sdkman.io/ (just mac/linix, not window)
- Create file .sdkmanrc
`java=21.0.8-tem`,
`maven=3.9.12`

# Clean package
- Command `./mvnw clean package`
