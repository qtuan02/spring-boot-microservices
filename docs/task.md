# Hướng Dẫn Sử Dụng Task (Taskfile)

**Task** là công cụ giúp chạy các lệnh phức tạp một cách đơn giản và nhất quán trên mọi hệ điều hành (Windows/Mac/Linux). Nó thay thế cho Makefile hoặc script bash thủ công.

## 1. Cài Đặt

Nếu bạn chưa cài đặt Task:

- **Mac/Linux**: `brew install go-task/tap/go-task`
- **Windows**: `choco install go-task` hoặc cài qua Scoop.
- Chi tiết xem tại [Taskfile Installation](https://taskfile.dev/installation/).

## 2. Các Lệnh Chính

### Chạy Hệ Thống

- `task start`: Build project, tạo Docker Image, và khởi động toàn bộ hệ thống (DB, RabbitMQ, Apps). **Đây là lệnh quan trọng nhất.**
- `task stop`: Dừng và xóa toàn bộ container.
- `task restart`: Restart toàn bộ hệ thống.

### Hạ Tầng (Infrastructure)

Các lệnh này chỉ tác động đến Database và RabbitMQ, không ảnh hưởng đến code Java. Dùng khi bạn muốn chạy DB dưới Docker nhưng chạy code Java trên IDE để debug.

- `task start_infra`: Chỉ khởi động PostgreSQL và RabbitMQ.
- `task stop_infra`: Dừng hạ tầng.
- `task restart_infra`: Khởi động lại hạ tầng.

### Build & Test

- `task build`: Đóng gói Maven và tạo Docker Image cho tất cả services.
- `task test`: Chạy toàn bộ Unit Test và Integration Test.
- `task format`: Tự động format code theo chuẩn Palantir.
- `task clean`: Dọn dẹp folder `target/`.

## 3. Cách Hoạt Động

File cấu hình nằm tại `Taskfile.yml` ở thư mục gốc.

Ví dụ, khi bạn chạy `task build`, nó thực chất sẽ gọi các lệnh Maven phức tạp bên dưới:

```bash
# Trên Mac/Linux:
./mvnw -pl catalog-service spring-boot:build-image -DskipTests
./mvnw -pl order-service spring-boot:build-image -DskipTests

# Trên Windows, nó tự động chuyển đổi thành:
cmd /c mvnw.cmd ...
```

Nhờ Task, bạn không cần nhớ các tham số dài dòng của Maven hay Docker Compose.
