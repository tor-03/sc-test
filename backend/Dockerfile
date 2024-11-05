# Use the official OpenJDK image as a base for Java 17
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app

# Copy the Maven project files
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Download Maven dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the application source code and build it
COPY src src
RUN ./mvnw package -DskipTests

# Use a smaller base image for production
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the Spring Boot JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port for Cloud Run
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
