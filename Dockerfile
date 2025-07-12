# ===== Stage 1: Build with Java 23 =====
FROM eclipse-temurin:23-jdk AS builder

WORKDIR /app

# Copy Maven wrapper scripts and give them execution permission
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn/ .mvn
COPY src/ src/

# Fix permission issue
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# ===== Stage 2: Run the built JAR =====
FROM eclipse-temurin:23-jdk

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
