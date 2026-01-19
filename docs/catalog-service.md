# Catalog Service

> Microservice quản lý sản phẩm | Spring Boot 3.5.9 + PostgreSQL

## Yêu Cầu

| Tool   | Version |
| ------ | ------- |
| JDK    | 21+     |
| Docker | 20.10+  |

## Khởi Động

```bash
# 1. Start database
docker compose -f deployment/docker-compose/infra.yml up -d

# 2. Chạy ứng dụng
cd catalog-service
./mvnw spring-boot:run   # Windows: mvnw.cmd spring-boot:run
```

**Kiểm tra:** http://localhost:8081/swagger-ui.html

## Tech Stack

| Library                          | Mục đích             |
| -------------------------------- | -------------------- |
| `spring-boot-starter-web`        | REST API             |
| `spring-boot-starter-data-jpa`   | JPA/Hibernate        |
| `postgresql`                     | Database driver      |
| `flyway-core`                    | DB migration tự động |
| `springdoc-openapi`              | Swagger UI           |
| `spring-boot-starter-actuator`   | Health + Metrics     |
| `micrometer-registry-prometheus` | Prometheus           |
| `testcontainers`                 | Integration testing  |
| `rest-assured`                   | API testing          |
| `spotless-maven-plugin`          | Code formatting      |

## API

| Method | Endpoint               | Mô tả              |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/products?page=1` | Danh sách sản phẩm |
| GET    | `/api/products/{code}` | Chi tiết sản phẩm  |

**Response mẫu:**

```json
{
  "data": [{ "code": "P001", "name": "Product", "price": 29.99 }],
  "totalElements": 100,
  "pageNumber": 1,
  "totalPages": 10
}
```

## Database

**Port:** `15432` | **User/Pass:** `postgres/postgres`

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price NUMERIC NOT NULL
);
```

## Config

File: `src/main/resources/application.properties`

```properties
server.port=8081
catalog.page-size=10

# Database (có thể override bằng biến môi trường)
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:15432/postgres}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
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
