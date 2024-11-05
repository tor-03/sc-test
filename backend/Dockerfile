# Use OpenJDK base image to build the application
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app

# Copy Maven project files
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code and build the application
COPY src src
RUN ./mvnw package -DskipTests

# Stage 2: Run the Spring Boot application
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port for Cloud Run
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
