# Spring Boot Microservices

Dự án E-Commerce mẫu (Microservices + Monorepo) minh họa cách xây dựng hệ thống phân tán hiện đại.

## Tech Stack & Tooling

- **Core**: Java 21, Spring Boot 3.5.9, Maven
- **Infrastructure**: PostgreSQL, RabbitMQ, Docker
- **Dev Tools**:
  - **Task (Taskfile)**: Chạy lệnh nhanh (start infra, build, test...)
  - **Flyway**: Quản lý database migrations
  - **Testcontainers**: Integration testing với Docker
  - **Spotless**: Auto-format code

## 1. Setup Environment

### Windows

Cài đặt thủ công và thêm vào Environment Variables (Path):

1.  **JDK 21**: [Adoptium](https://adoptium.net/)
2.  **Maven 3.9+**: [Apache Maven](https://maven.apache.org/download.cgi)
3.  **Docker Desktop**: [Docker](https://www.docker.com/products/docker-desktop/) (Bắt buộc)
4.  **Task** (Optional): [Taskfile Installation](https://taskfile.dev/installation/) - Giúp chạy các lệnh setup nhanh hơn.

### Mac / Linux

Dự án sử dụng **SDKMAN** để quản lý version. Tạo file `.sdkmanrc` tại thư mục gốc:

```text
java=21.0.9-tem
maven=3.9.12
```

Sau đó chạy lệnh để cài đặt và kích hoạt:

```bash
sdk env install && sdk env
```

## 2. Quick Start

### Bước 1: Khởi động Infrastructure

Bật **Docker Desktop**, sau đó mở terminal tại thư mục gốc dự án:

```bash
# Cách 1: Dùng Task (Nhanh nhất)
task start_infra

# Cách 2: Dùng Docker Compose thuần (nếu chưa cài Task)
docker compose -f deployment/docker-compose/infra.yml up -d
```

_Lệnh này sẽ tải và chạy PostgreSQL & RabbitMQ._

### Bước 2: Chạy Services

Mở 2 terminal riêng biệt:

**1. Catalog Service** (Port 8081)

```bash
cd catalog-service
./mvnw spring-boot:run
# Windows dùng: mvnw.cmd spring-boot:run
```

**2. Order Service** (Port 8082)

```bash
cd order-service
./mvnw spring-boot:run
# Windows dùng: mvnw.cmd spring-boot:run
```

**3. Notification Service** (Port 8083)

```bash
cd notification-service
./mvnw spring-boot:run
# Windows dùng: mvnw.cmd spring-boot:run
```

**4. API Gateway** (Port 8989)

```bash
cd api-gateway
./mvnw spring-boot:run
# Windows dùng: mvnw.cmd spring-boot:run
```

### Option: Chạy Full Docker

Nếu muốn chạy toàn bộ hệ thống bằng Docker (không cần cài Java/Maven):

```bash
task build   # Build Docker images
task start   # Run Infra + Apps
```

## 3. Kiểm Tra & Tài Liệu

Sau khi chạy xong, truy cập:

- **Catalog API**: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)
- **Order API**: [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)
- **API Gateway (Tổng hợp)**: [http://localhost:8989/swagger-ui.html](http://localhost:8989/swagger-ui.html)
- **RabbitMQ**: [http://localhost:15672](http://localhost:15672) (guest/guest)

**Xem tài liệu chi tiết:**

- [Cấu trúc & Architecture](docs/1.structure.md)
- [Catalog Service](docs/2.catalog-service.md)
- [Order Service](docs/3.order-service.md)
- [Notification Service](docs/4.notification-service.md)
- [API Gateway](docs/5.api-gateway.md)
- [Docker Guide](docs/docker.md)
- [CI/CD (GitHub Actions)](docs/github.md)
- [Hướng dẫn sử dụng Task](docs/task.md)
