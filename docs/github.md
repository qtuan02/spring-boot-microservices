# GitHub Actions (CI/CD)

Hệ thống sử dụng **GitHub Actions** để tự động hóa quy trình Build, Test và Push Docker Image mỗi khi có code mới.

## 1. Khi Nào Pipeline Chạy?

Workflow sẽ **tự động chạy** khi:

1. **Push**: Có code mới được đẩy lên nhánh `main`.
2. **Pull Request**: Có PR được tạo vào nhánh `main`.
3. **Path Filter**: Chỉ chạy khi code trong thư mục của service đó bị thay đổi. Ví dụ: sửa code trong `catalog-service/` thì chỉ workflow Catalog chạy. Sửa README thì không chạy gì cả.

## 2. Pipeline Chạy Những Gì?

Một workflow điển hình sẽ thực hiện tuần tự các bước sau:

```text
[Checkout Code] → [Setup Java 21] → [Test & Verify] → [Login DockerHub] → [Build & Push Image]
```

Chi tiết từng bước:

1. **Checkout Code**: Tải source code mới nhất về runner.
2. **Setup Java 21**: Cài đặt JDK 21 và cache Maven để build nhanh hơn ở lần sau.
3. **Build with Maven**: Chạy lệnh `./mvnw -ntp verify` để chạy toàn bộ Unit Test và Integration Test. Nếu test fail thì quy trình dừng ngay.
4. **Login to Docker Hub**: Đăng nhập để có quyền push image.
5. **Build & Push Docker Image**: Tạo Docker Image từ file JAR và đẩy lên Docker Hub.

## 3. Cấu Hình Secrets

Để pipeline có thể login và push image, bạn cần cấu hình **Secrets** trên GitHub (Settings → Secrets → Actions):

- **`DOCKERHUB_USERNAME`**: Tên tài khoản Docker Hub của bạn (ví dụ: `qtuan02`).
- **`DOCKERHUB_TOKEN`**: Access Token tạo tại Docker Hub → Account Settings → Security.

## 4. Thêm Workflow Cho Service Mới

Khi tạo service mới (ví dụ `notification-service`), bạn chỉ cần:

1. Copy file `.github/workflows/catalog-service.yml`.
2. Đổi tên thành `notification-service.yml`.
3. Sửa các chỗ sau:
   - `paths`: Sửa thành `notification-service/**`
   - `working-directory`: Sửa thành `./notification-service`
   - `DOCKER_IMAGE_NAME`: Sửa thành `.../ecommerce-notification-service`

## 5. File Cấu Hình Mẫu

File: `.github/workflows/catalog-service.yml`

```yaml
name: Catalog Service CI

on:
  push:
    paths:
      - catalog-service/** # Chỉ chạy khi sửa code trong folder này
    branches:
      - "main"

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    env:
      working-directory: ./catalog-service
      DOCKER_IMAGE_NAME: ${{ secrets.DOCKERHUB_USERNAME }}/ecommerce-catalog-service

    defaults:
      run:
        working-directory: ${{ env.working-directory }}

    steps:
      # 1. Tải code về
      - uses: actions/checkout@v5

      # 2. Cài Java 21
      - name: Setup Java 21
        uses: actions/setup-java@v5
        with:
          java-version: "21"
          distribution: "temurin"
          cache: "maven"

      # 3. Chạy Test & Verify
      - name: Build with Maven
        run: chmod +x mvnw && ./mvnw -ntp verify

      # 4. Đăng nhập Docker Hub (Chỉ chạy khi push branch main)
      - name: Login to Docker Hub
        if: github.ref == 'refs/heads/main'
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # 5. Build Image & Push
      - name: Build and Push Docker Image
        if: github.ref == 'refs/heads/main'
        run: |
          ./mvnw spring-boot:build-image -DskipTests
          docker push $DOCKER_IMAGE_NAME
```
