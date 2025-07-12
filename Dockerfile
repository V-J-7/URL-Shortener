# Use Java 23 (yes, it's available via Eclipse Temurin)
FROM eclipse-temurin:23-jdk as builder

WORKDIR /app

# Copy everything to container
COPY . .

# Build the application
RUN ./mvnw clean package -DskipTests

# Run phase
FROM eclipse-temurin:23-jdk

WORKDIR /app

# Copy built jar from builder image
COPY --from=builder /app/target/*.jar app.jar

# Expose the default port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
