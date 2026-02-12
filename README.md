# Spring Boot Microservices - E-Commerce System

Hệ thống E-Commerce demo với kiến trúc **Microservices + Monorepo**, minh họa các best practices khi xây dựng ứng dụng phân tán.

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Kiến Trúc](#kiến-trúc)
- [Tech Stack](#tech-stack)
- [Cần Chuẩn Bị](#cần-chuẩn-bị)
- [Quick Start](#quick-start)
- [Services](#services)
- [Truy Cập](#truy-cập)
- [Tài Liệu](#tài-liệu)

## Giới Thiệu

Dự án E-Commerce mẫu demo các concepts quan trọng trong Microservices:

- ✅ **Service Independence** - Mỗi service có database riêng
- ✅ **Event-Driven** - Giao tiếp bất đồng bộ qua RabbitMQ
- ✅ **API Gateway** - Single entry point
- ✅ **Resilience** - Circuit Breaker, Retry, Timeout
- ✅ **Transactional Outbox** - Đảm bảo eventual consistency
- ✅ **Database Migrations** - Flyway version control
- ✅ **Containerization** - Docker ready
- ✅ **CI/CD** - GitHub Actions automated testing

## Kiến Trúc

```
                                           ┌──────────────────┐
                                      ┌───▶│  Catalog Service │◀─┐
                                      │    │   (Port 8081)    │  │
                                      │    └──────────────────┘  │
                                      │                          │
┌────────┐      ┌─────────────┐      │    ┌──────────────────┐  │
│  User  │─────▶│ API Gateway │──────┼───▶│ Inventory Service│◀─┤ HTTP
│ Client │      │ (Port 8989) │      │    │   (Port 8082)    │  │ (Sync)
└────────┘      └─────────────┘      │    └──────────────────┘  │
                                      │                          │
                                      │    ┌──────────────────┐  │
                                      └───▶│  Order Service   │──┘
                                           │   (Port 8083)    │
                                           └────────┬─────────┘
                                                    │
                                                    │ Events
                                                    ▼
                                           ┌─────────────────┐
                                           │    RabbitMQ     │
                                           │  (Port 5672)    │
                                           └────────┬────────┘
                                                    │ Events
                                                    ▼
                                           ┌──────────────────┐
                                           │   Notification   │
                                           │     Service      │
                                           │   (Port 8084)    │
                                           └──────────────────┘
```

**Communication**:

- **Sync (HTTP)**: Client → Gateway → Services, Order → Catalog/Inventory
- **Async (RabbitMQ)**: Order → Notification (events)

## Tech Stack

**Core**:

- Java 21 + Spring Boot 3.5.9 + Maven

**Infrastructure**:

- PostgreSQL 18 (mỗi service có DB riêng)
- RabbitMQ 4.0.4 (message broker)
- Spring Cloud Gateway (API Gateway)
- MailHog (test email)
- Docker + Docker Compose

**Libraries quan trọng**:

- `spring-boot-starter-data-jpa` - Database (Hibernate)
- `flyway-core` - DB migrations
- `springdoc-openapi` - Swagger docs
- `resilience4j` - Circuit Breaker & Retry
- `spring-boot-starter-amqp` - RabbitMQ
- `testcontainers` - Testing với Docker
- `shedlock` - Distributed locking

**Dev Tools**:

- Taskfile (task runner)
- Spotless (code format)
- GitHub Actions (CI/CD)

## Cần Chuẩn Bị

**Bắt buộc**:

- JDK 21 - [Download từ Adoptium](https://adoptium.net/)
- Docker Desktop - [Download](https://www.docker.com/products/docker-desktop/) (**PHẢI CÓ**)

**Optional**:

- Maven 3.9+ (hoặc dùng `mvnw` wrapper có sẵn)
- Task - [Cài đặt Taskfile](https://taskfile.dev/installation/)

## Quick Start

### Cách 1: Local Development (Recommended khi đang code)

Chạy từng service riêng để dễ debug.

**Bước 1 - Start Infrastructure**:

Bật Docker Desktop, sau đó:

```bash
# Nếu có Task
task start_infra

# Hoặc dùng Docker Compose
docker compose -f deployment/docker-compose/infra.yml up -d
```

Lệnh này khởi động PostgreSQL, RabbitMQ và MailHog.

**Bước 2 - Chạy Services**:

Mở terminal riêng cho từng service:

```bash
# Terminal 1
cd catalog-service && ./mvnw spring-boot:run

# Terminal 2
cd inventory-service && ./mvnw spring-boot:run

# Terminal 3
cd order-service && ./mvnw spring-boot:run

# Terminal 4
cd notification-service && ./mvnw spring-boot:run

# Terminal 5
cd api-gateway && ./mvnw spring-boot:run
```

Windows dùng `mvnw.cmd` thay vì `./mvnw`.

✅ Xong! Vào [http://localhost:8989/swagger-ui.html](http://localhost:8989/swagger-ui.html)

---

### Cách 2: Full Docker (Giống production)

Chạy toàn bộ hệ thống trong Docker.

```bash
# Build images
task build

# Start tất cả
task start

# Check
docker ps

# Stop khi xong
task stop
```

## Services

Hệ thống gồm 5 services:

**1. Catalog Service** (Port 8081)

- Quản lý sản phẩm, categories, authors
- [Swagger](http://localhost:8081/swagger-ui.html)

**2. Inventory Service** (Port 8082)

- Quản lý tồn kho
- Deduct stock với pessimistic locking
- [Swagger](http://localhost:8082/swagger-ui.html)

**3. Order Service** (Port 8083)

- Xử lý đơn hàng
- Publish events sang RabbitMQ
- Circuit breaker + retry patterns
- [Swagger](http://localhost:8083/swagger-ui.html)

**4. Notification Service** (Port 8084)

- Gửi email notifications
- Consume events từ RabbitMQ
- Không có API public

**5. API Gateway** (Port 8989)

- Single entry point cho tất cả services
- Tổng hợp Swagger UI
- [Swagger](http://localhost:8989/swagger-ui.html) ⭐

**Infrastructure**:

- **RabbitMQ**: Ports 5672 (AMQP), 15672 (Management UI)
  - Credentials: guest/guest
- **MailHog**: Ports 1025 (SMTP), 8025 (Web UI)

## Truy Cập

Sau khi start services:

**API Docs** (Swagger UI):

- API Gateway: [http://localhost:8989/swagger-ui.html](http://localhost:8989/swagger-ui.html) ⭐ Dùng cái này
- Hoặc truy cập từng service riêng (8081, 8082, 8083)

**Management**:

- RabbitMQ: [http://localhost:15672](http://localhost:15672) (guest/guest)
- MailHog: [http://localhost:8025](http://localhost:8025)
- Health checks: `http://localhost:<port>/actuator/health`

**Test thử API**:

Lấy danh sách sản phẩm:

```bash
curl http://localhost:8989/catalog/api/products
```

Tạo đơn hàng:

```bash
curl -X POST http://localhost:8989/orders/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Nguyen Van A",
      "email": "test@example.com",
      "phone": "0123456789"
    },
    "deliveryAddress": {
      "addressLine1": "123 Main St",
      "city": "Hanoi",
      "country": "VIETNAM"
    },
    "items": [
      { "code": "P001", "name": "Product", "price": 29.99, "quantity": 1 }
    ]
  }'
```

## Project Structure

```
spring-boot-microservices/
├── .github/workflows/          # CI/CD pipelines
├── deployment/docker-compose/  # Docker configs
│   ├── infra.yml              # PostgreSQL, RabbitMQ, MailHog
│   └── apps.yml               # Microservices
├── docs/                      # Documentation
│   ├── 1.structure.md
│   ├── 2.catalog-service.md
│   ├── 3.inventory-service.md
│   ├── 4.order-service.md
│   ├── 5.notification-service.md
│   ├── 6.api-gateway.md
│   ├── 7.docker.md
│   ├── 8.github-actions.md
│   └── 9.task.md
├── catalog-service/
├── inventory-service/
├── order-service/
├── notification-service/
├── api-gateway/
├── pom.xml                    # Parent POM
├── Taskfile.yml
└── README.md
```

**Mỗi service theo Layered Architecture**:

```
[service-name]/
├── src/main/java/com/qtuan02/[service]/
│   ├── web/         # Controllers, Exception Handlers
│   ├── domain/      # Entities, Services, Repositories
│   ├── clients/     # HTTP clients
│   ├── events/      # Event handlers
│   ├── jobs/        # Scheduled tasks
│   └── config/      # Spring configs
├── src/main/resources/
│   ├── application.properties
│   └── db/migration/    # Flyway SQL scripts
└── pom.xml
```

## Tài Liệu

**Services**:

- [Cấu Trúc & Architecture](docs/1.structure.md)
- [Catalog Service](docs/2.catalog-service.md)
- [Inventory Service](docs/3.inventory-service.md)
- [Order Service](docs/4.order-service.md)
- [Notification Service](docs/5.notification-service.md)
- [API Gateway](docs/6.api-gateway.md)

**Operations**:

- [Docker Guide](docs/7.docker.md)
- [CI/CD (GitHub Actions)](docs/8.github-actions.md)
- [Task Runner](docs/9.task.md)

## Contributing

Khi thêm service mới:

1. Update `deployment/docker-compose/apps.yml`
2. Thêm GitHub Actions workflow
3. Update `Taskfile.yml`
4. Viết docs trong `docs/`

## Khởi Động Nhanh

**Development**:

```bash
task start_infra
# Sau đó chạy services bằng IDE
```

**Production-like**:

```bash
task build && task start
```

---

Dự án mẫu cho mục đích học tập.
