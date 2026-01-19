# Setup Guide

> Hướng dẫn cài đặt và chạy Spring Boot Microservices

## Yêu Cầu

| Tool   | Version | Download                             |
| ------ | ------- | ------------------------------------ |
| JDK    | 21+     | [Adoptium](https://adoptium.net/)    |
| Docker | 20.10+  | [Docker Desktop](https://docker.com) |
| Task   | 3.x     | [Taskfile](https://taskfile.dev/)    |

> Maven không cần cài, dự án có sẵn Maven Wrapper (`mvnw`)

## Cấu Trúc Dự Án

```
spring-boot-microservices/
├── catalog-service/     # Product API (:8081)
├── order-service/       # Order API (:8082)
├── deployment/          # Docker configs
├── docs/                # Tài liệu
├── Taskfile.yml         # Task runner
└── pom.xml              # Parent POM
```

## Quick Start

```bash
# 1. Start infrastructure (PostgreSQL + RabbitMQ)
task start_infra

# 2. Chạy catalog-service
cd catalog-service && ./mvnw spring-boot:run

# 3. Chạy order-service (terminal mới)
cd order-service && ./mvnw spring-boot:run
```

## Task Commands

| Command              | Mô tả                           |
| -------------------- | ------------------------------- |
| `task start_infra`   | Khởi động PostgreSQL + RabbitMQ |
| `task stop_infra`    | Dừng infrastructure             |
| `task restart_infra` | Restart infrastructure          |
| `task format`        | Format code (Spotless)          |
| `task test`          | Format + chạy tests             |
| `task build`         | Build Docker images             |
| `task start`         | Build + chạy tất cả bằng Docker |
| `task stop`          | Dừng tất cả Docker containers   |

## Services

| Service         | Port | URL                                   |
| --------------- | ---- | ------------------------------------- |
| catalog-service | 8081 | http://localhost:8081/swagger-ui.html |
| order-service   | 8082 | http://localhost:8082/swagger-ui.html |

## Infrastructure

| Service    | Port             | Credentials       |
| ---------- | ---------------- | ----------------- |
| catalog-db | 15432            | postgres/postgres |
| order-db   | 25432            | postgres/postgres |
| RabbitMQ   | 5672, 15672 (UI) | guest/guest       |

**RabbitMQ UI:** http://localhost:15672

## GitHub Actions (CI/CD)

Mỗi service có workflow riêng:

| Workflow              | Trigger                                                |
| --------------------- | ------------------------------------------------------ |
| `catalog-service.yml` | Push/PR vào `main` + thay đổi trong `catalog-service/` |
| `order-service.yml`   | Push/PR vào `main` + thay đổi trong `order-service/`   |

**Pipeline steps:**

1. Setup JDK 21
2. Build + Test (`./mvnw verify`)
3. Build Docker image
4. Push to Docker Hub

**Secrets cần thiết:**

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

## Tech Stack

| Category   | Technology                             |
| ---------- | -------------------------------------- |
| Framework  | Spring Boot 3.5.9                      |
| Database   | PostgreSQL 18                          |
| Messaging  | RabbitMQ 4.0                           |
| Migration  | Flyway                                 |
| API Docs   | SpringDoc OpenAPI (Swagger)            |
| Resilience | Resilience4j                           |
| Scheduling | ShedLock                               |
| Testing    | Testcontainers, REST Assured, WireMock |
| Formatting | Spotless (Palantir Java Format)        |
| CI/CD      | GitHub Actions                         |
