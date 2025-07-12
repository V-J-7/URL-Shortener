# ===== Stage 1: Build the app using Java 23 =====
FROM eclipse-temurin:23-jdk AS builder

# Set working directory inside container
WORKDIR /app

# Copy essential files for Maven build
COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn/ .mvn
COPY src/ src/

# Build the Spring Boot app (skip tests to speed things up)
RUN ./mvnw clean package -DskipTests

# ===== Stage 2: Run the app =====
FROM eclipse-temurin:23-jdk

WORKDIR /app

# Copy the JAR file built in the previous stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port (make sure Spring Boot is listening on this)
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
