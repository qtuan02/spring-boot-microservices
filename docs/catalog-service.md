# Catalog Service

> Microservice quản lý danh mục sản phẩm với Spring Boot 3.5.9 + PostgreSQL

---

## Yêu Cầu Hệ Thống

| Tool   | Version                        |
| ------ | ------------------------------ |
| JDK    | 21+                            |
| Docker | 20.10+                         |
| Maven  | 3.9+ (tùy chọn, đã có wrapper) |

---

## Bắt Đầu Nhanh

### Bước 1: Khởi động Database

```bash
docker compose -f deployment/docker-compose/infra.yml up -d
```

> Kiểm tra database đã sẵn sàng:
>
> ```bash
> docker ps | findstr catalog-db
> ```

### Bước 2: Chạy ứng dụng

```bash
cd catalog-service
./mvnw spring-boot:run
```

> **Windows users:** Dùng `mvnw.cmd spring-boot:run`

### Bước 3: Kiểm tra

Mở trình duyệt và truy cập:

| URL                                   | Mô tả              |
| ------------------------------------- | ------------------ |
| http://localhost:8081/swagger-ui.html | API Documentation  |
| http://localhost:8081/api/products    | Danh sách sản phẩm |
| http://localhost:8081/actuator/health | Health check       |

---

## Tech Stack

| Công nghệ         | Mục đích                          |
| ----------------- | --------------------------------- |
| Spring Boot 3.5.9 | REST API + JPA/Hibernate          |
| PostgreSQL 18     | Database                          |
| Flyway            | Database migration tự động        |
| Swagger (OpenAPI) | API documentation                 |
| Actuator          | Health check + Prometheus metrics |
| Testcontainers    | Integration testing               |
| Spotless          | Code formatting (Palantir style)  |

---

## API Endpoints

### Lấy danh sách sản phẩm

```http
GET /api/products?page=1
```

**Response:**

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

### Lấy chi tiết sản phẩm

```http
GET /api/products/{code}
```

**Response:** `200 OK` với product JSON hoặc `404 Not Found`

---

## Endpoints Hệ Thống

| Endpoint               | Mô tả                  |
| ---------------------- | ---------------------- |
| `/swagger-ui.html`     | Swagger UI             |
| `/actuator/health`     | Health check           |
| `/actuator/info`       | Build & Git info       |
| `/actuator/prometheus` | Metrics cho Prometheus |

---

## Database

### Schema

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

### Cấu hình kết nối

```properties
# Mặc định (có thể override bằng biến môi trường)
spring.datasource.url=jdbc:postgresql://localhost:15432/postgres
spring.datasource.username=postgres
spring.datasource.password=postgres
```

| Biến môi trường | Giá trị mặc định                             |
| --------------- | -------------------------------------------- |
| `DB_URL`        | `jdbc:postgresql://localhost:15432/postgres` |
| `DB_USERNAME`   | `postgres`                                   |
| `DB_PASSWORD`   | `postgres`                                   |

> Flyway tự động chạy migration khi ứng dụng khởi động

---

## Cấu Hình

File: `catalog-service/src/main/resources/application.properties`

```properties
server.port=8081
catalog.page-size=10
```

---

## Cấu Trúc Dự Án

```
catalog-service/
├── src/main/java/com/qtuan02/catalog/
│   ├── ApplicationProperties.java      # Config properties binding
│   ├── CatalogServiceApplication.java  # Main class
│   ├── domain/
│   │   ├── Product.java                # DTO (record)
│   │   ├── ProductEntity.java          # JPA Entity
│   │   ├── ProductMapper.java          # Entity ↔ DTO
│   │   ├── ProductRepository.java      # Spring Data JPA
│   │   ├── ProductService.java         # Business logic
│   │   ├── ProductNotFoundException.java
│   │   └── PagedResult.java            # Pagination wrapper
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

## Các Lệnh Thường Dùng

> Tất cả lệnh chạy từ thư mục `catalog-service/`

### Chạy ứng dụng

```bash
./mvnw spring-boot:run
```

### Chạy tests

```bash
./mvnw test
```

### Build & verify

```bash
./mvnw verify
```

### Code formatting

```bash
# Kiểm tra format
./mvnw spotless:check

# Tự động sửa format
./mvnw spotless:apply
```

### Build Docker image

```bash
./mvnw spring-boot:build-image -DskipTests
```

> Image name: `qtuan02/ecommerce-catalog-service`

---

## CI/CD

GitHub Actions tự động chạy khi:

- ✅ Push code vào `catalog-service/**` trên branch `main`
- ✅ Tạo Pull Request vào branch `main`

📄 Workflow file: `.github/workflows/catalog-service.yml`

---

## Troubleshooting

### Database không kết nối được

```bash
# Kiểm tra container đang chạy
docker ps | findstr catalog-db

# Xem logs
docker logs catalog-db

# Restart database
docker compose -f deployment/docker-compose/infra.yml restart catalog-db
```

### Port 8081 đã bị sử dụng

```bash
# Windows: Tìm process đang dùng port
netstat -ano | findstr :8081

# Hoặc đổi port trong application.properties
server.port=8082
```

### Spotless check fail

```bash
# Auto-fix format
./mvnw spotless:apply
```
