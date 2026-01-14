# Catalog Service

> Microservice quản lý danh mục sản phẩm (Product Catalog) với Spring Boot 3.5.9, Java 21

## 📦 Tech Stack

| Công nghệ          | Mô tả                             |
| ------------------ | --------------------------------- |
| **Spring Boot**    | REST API + JPA/Hibernate          |
| **PostgreSQL**     | Database lưu trữ sản phẩm         |
| **Flyway**         | Quản lý database migration        |
| **Swagger**        | API documentation tự động         |
| **Actuator**       | Health check + Prometheus metrics |
| **Testcontainers** | Integration testing với Docker    |
| **Spotless**       | Auto-format code (Palantir Java)  |

---

## 🚀 Quick Start

```bash
# 1. Khởi động PostgreSQL
docker compose -f deployment/docker-compose/infra.yml up -d

# 2. Chạy ứng dụng
cd catalog-service
./mvnw spring-boot:run
```

📍 **URL:** `http://localhost:8081`

---

## 📚 API Reference

### `GET /api/products?page={n}`

Lấy danh sách sản phẩm có phân trang (mặc định: 10 items/page)

```json
{
  "data": [{ "code": "P001", "name": "Product Name", "price": 29.99 }],
  "totalElements": 100,
  "pageNumber": 1,
  "totalPages": 10,
  "isFirst": true,
  "hasNext": true
}
```

### `GET /api/products/{code}`

Lấy sản phẩm theo mã code → `200 OK` hoặc `404 Not Found`

---

## 🔗 Utility Endpoints

| Endpoint               | Mô tả              |
| ---------------------- | ------------------ |
| `/swagger-ui.html`     | API Documentation  |
| `/actuator/health`     | Health check       |
| `/actuator/info`       | Build & Git info   |
| `/actuator/prometheus` | Prometheus metrics |

---

## 🗄️ Database Schema

```sql
CREATE TABLE products (
    id          BIGINT PRIMARY KEY,
    code        TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    description TEXT,
    image_url   TEXT,
    price       NUMERIC NOT NULL
);
```

> 💡 Flyway tự động migrate khi ứng dụng khởi động

---

## ⚙️ Configuration

```properties
# application.properties
server.port=8081
catalog.page-size=10

# Database (có thể override bằng env vars)
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:15432/postgres}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
```

---

## 📁 Project Structure

```
catalog-service/
├── src/main/java/com/qtuan02/catalog/
│   ├── ApplicationProperties.java     # @ConfigurationProperties
│   ├── CatalogServiceApplication.java
│   ├── domain/
│   │   ├── Product.java               # DTO record
│   │   ├── ProductEntity.java         # JPA Entity
│   │   ├── ProductMapper.java         # Entity → DTO
│   │   ├── ProductRepository.java     # Spring Data JPA
│   │   ├── ProductService.java        # Business logic
│   │   ├── ProductNotFoundException.java
│   │   └── PagedResult.java           # Pagination wrapper
│   └── web/
│       ├── controllers/ProductController.java
│       └── exception/GlobalExceptionHandler.java
├── src/main/resources/
│   ├── application.properties
│   └── db/migration/
│       ├── V1__create_products_table.sql
│       └── V2__add_books_data.sql
└── pom.xml
```

---

## 🧪 Commands

```bash
# Chạy tests (Testcontainers + REST Assured)
./mvnw test

# Build & verify
./mvnw verify

# Check format
./mvnw spotless:check

# Auto-fix format
./mvnw spotless:apply

# Build Docker image
./mvnw spring-boot:build-image -DskipTests
```

---

## 🐳 CI/CD

GitHub Actions tự động chạy khi:

- Push code vào `catalog-service/**` trên branch `main`
- Tạo Pull Request vào branch `main`

📄 File: `.github/workflows/catalog-service.yml`
