# Order Service

> Microservice quản lý đơn hàng | Spring Boot 3.5.9 + PostgreSQL + RabbitMQ

## Yêu Cầu

| Tool   | Version |
| ------ | ------- |
| JDK    | 21+     |
| Docker | 20.10+  |

## Khởi Động

```bash
# 1. Start database + RabbitMQ
docker compose -f deployment/docker-compose/infra.yml up -d

# 2. Chạy catalog-service trước (dependency)
cd catalog-service && ./mvnw spring-boot:run

# 3. Chạy order-service
cd order-service
./mvnw spring-boot:run   # Windows: mvnw.cmd spring-boot:run
```

**Kiểm tra:** http://localhost:8082/swagger-ui.html

## Tech Stack

| Library                          | Mục đích                   |
| -------------------------------- | -------------------------- |
| `spring-boot-starter-web`        | REST API                   |
| `spring-boot-starter-data-jpa`   | JPA/Hibernate              |
| `spring-boot-starter-amqp`       | RabbitMQ messaging         |
| `postgresql`                     | Database driver            |
| `flyway-core`                    | DB migration tự động       |
| `resilience4j-spring-boot3`      | Retry + Circuit Breaker    |
| `shedlock-spring`                | Distributed job scheduling |
| `springdoc-openapi`              | Swagger UI                 |
| `spring-boot-starter-actuator`   | Health + Metrics           |
| `micrometer-registry-prometheus` | Prometheus                 |
| `testcontainers`                 | Integration testing        |
| `rest-assured`                   | API testing                |
| `wiremock`                       | Mock external APIs         |
| `instancio-junit`                | Test data generation       |
| `spotless-maven-plugin`          | Code formatting            |

## Kiến Trúc

```
┌─────────────────┐     HTTP      ┌─────────────────┐
│  Order Service  │ ───────────▶ │ Catalog Service │
│   :8082         │   (validate)  │   :8081         │
└────────┬────────┘               └─────────────────┘
         │
         │ publish events
         ▼
┌─────────────────┐
│    RabbitMQ     │
│   :5672/:15672  │
└─────────────────┘
```

## Database

**Port:** `25432` | **User/Pass:** `postgres/postgres`

### Schema

```sql
-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    order_number TEXT UNIQUE,
    status TEXT,           -- NEW, IN_PROCESS, DELIVERED, CANCELLED, ERROR
    customer_name TEXT,
    customer_email TEXT,
    delivery_address TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY,
    order_id UUID REFERENCES orders(id),
    code TEXT,
    name TEXT,
    price NUMERIC,
    quantity INT
);

-- Order Events (Transactional Outbox)
CREATE TABLE order_events (
    id BIGINT PRIMARY KEY,
    order_number TEXT,
    event_type TEXT,
    payload JSONB,
    created_at TIMESTAMP
);
```

## RabbitMQ

**Management UI:** http://localhost:15672 (guest/guest)

| Queue              | Mô tả        |
| ------------------ | ------------ |
| `new-orders`       | Đơn hàng mới |
| `delivered-orders` | Đã giao      |
| `cancelled-orders` | Đã hủy       |
| `error-orders`     | Lỗi xử lý    |

## Resilience4j Config

```properties
# Retry: max 2 lần, đợi 1s giữa các lần
resilience4j.retry.backends.catalog-service.max-attempts=2
resilience4j.retry.backends.catalog-service.wait-duration=1s

# Circuit Breaker: mở khi 50% request fail
resilience4j.circuitbreaker.backends.catalog-service.failure-rate-threshold=50
```

## Scheduled Jobs

| Job                       | Cron    | Mô tả                          |
| ------------------------- | ------- | ------------------------------ |
| `OrderEventPublishingJob` | mỗi 5s  | Publish events từ outbox table |
| `OrderProcessingJob`      | mỗi 10s | Xử lý đơn hàng NEW             |

## Config

File: `src/main/resources/application.properties`

```properties
server.port=8082
order.catalog-service-url=http://localhost:8081

# Database
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:25432/postgres}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}

# RabbitMQ
spring.rabbitmq.host=${RABBITMQ_HOST:localhost}
spring.rabbitmq.port=${RABBITMQ_PORT:5672}
spring.rabbitmq.username=${RABBITMQ_USERNAME:guest}
spring.rabbitmq.password=${RABBITMQ_PASSWORD:guest}
```

## Lệnh Thường Dùng

```bash
./mvnw spring-boot:run          # Chạy app
./mvnw test                     # Chạy tests
./mvnw spotless:apply           # Format code
./mvnw spring-boot:build-image  # Build Docker image
```

## Endpoints Hệ Thống

| Endpoint               | Mô tả              |
| ---------------------- | ------------------ |
| `/swagger-ui.html`     | API docs           |
| `/actuator/health`     | Health check       |
| `/actuator/prometheus` | Prometheus metrics |
