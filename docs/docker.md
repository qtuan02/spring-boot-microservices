# Docker Workflow

Dự án sử dụng **Docker** để đóng gói services và **Task** (Taskfile) để quản lý quy trình build/run một cách đơn giản.

## 1. Quy Trình Chạy

Để chạy toàn bộ hệ thống bằng Docker, bạn chỉ cần 2 lệnh.

### Bước 1: Build Docker Images

Lệnh này sẽ đóng gói code Java thành Docker Image mà không cần viết Dockerfile (sử dụng Spring Boot Buildpacks).

```bash
task build
```

Bên trong, Task sẽ chạy lệnh Maven sau cho từng service:

```bash
./mvnw spring-boot:build-image -DskipTests
```

Tên image được định nghĩa trong `pom.xml`, ví dụ: `qtuan02/ecommerce-catalog-service`.

### Bước 2: Khởi động hệ thống

```bash
task start
```

Lệnh này sẽ khởi động toàn bộ Database, RabbitMQ và các Microservices. Bên trong nó chạy:

```bash
docker compose \
  -f deployment/docker-compose/infra.yml \
  -f deployment/docker-compose/apps.yml \
  up -d
```

### Bước 3: Dừng hệ thống

```bash
task stop
```

Tương đương với `docker compose down`.

## 2. Cấu Hình Docker Compose

Cấu hình được chia thành 2 file để quản lý dễ dàng hơn.

### File `infra.yml` (Hạ tầng)

Chứa các thành phần ít thay đổi như database và message broker:

- **catalog-db**: PostgreSQL cho Catalog Service, port 15432.
- **order-db**: PostgreSQL cho Order Service, port 25432.
- **notification-db**: PostgreSQL cho Notification Service, port 35432.
- **ecommerce-rabbitmq**: RabbitMQ với port 5672 (app) và 15672 (Web UI).

### File `apps.yml` (Ứng dụng)

Chứa các Microservices do chúng ta code:

- **catalog-service**: Port 8081.
- **order-service**: Port 8082.
- **notification-service**: Port 8083.

Mỗi service được cấu hình kết nối đến database và RabbitMQ tương ứng thông qua biến môi trường.

## 3. Thêm Service Mới

Khi bạn code xong một service mới (ví dụ `payment-service`), hãy làm theo 3 bước:

1. **Cập nhật `Taskfile.yml`**: Thêm lệnh build cho service mới trong task `build`.
2. **Cập nhật `infra.yml`** (nếu cần DB riêng): Thêm `payment-db`.
3. **Cập nhật `apps.yml`**: Thêm cấu hình cho service mới với đầy đủ environment variables.
