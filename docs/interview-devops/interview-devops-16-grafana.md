# 16. Grafana

## 1. Why This Matters
Grafana là phần "mặt tiền" (UI) của toàn bộ hệ thống Observability. Đối với System Engineer tại Enterprise, khả năng trực quan hóa hệ thống phân tán, thiết kế Dashboard thông minh, và biến hàng triệu con số khô khan thành thông tin có ý nghĩa (actionable insights) để báo cáo lãnh đạo hoặc debug sự cố là kỹ năng bắt buộc. 

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **Bạn đã biết (từ CV):** Đã triển khai Grafana cùng Prometheus trên EKS.
- **Phỏng vấn có thể hỏi:** Best practices khi thiết kế Dashboard. Cấu hình Data source, quản lý Dashboards as Code, phân quyền trong Grafana.
- **Khoảng trống cần bù đắp:** Quản lý Grafana quy mô doanh nghiệp (SSO/AD integration, Provisioning qua GitOps, Plugin ecosystem).

## 4. Prerequisites
- Đã nắm rõ Prometheus (Chương 15).
- Hiểu biết về PromQL và các khái niệm time-series.

## 5. Core Concepts

### 5.1 Grafana Architecture & Data Sources

#### Definition
Grafana không tự lưu trữ time-series metrics (ngoại trừ log nội bộ và database của chính nó dùng lưu cấu hình, user, dashboard như SQLite/PostgreSQL). Nó hoạt động như một cỗ máy truy vấn, kết nối tới các **Data Sources** (Prometheus, Loki, Elasticsearch, CloudWatch...) lấy dữ liệu về và vẽ.

#### Why It Exists
Cung cấp một điểm truy cập duy nhất (Single Pane of Glass) để xem dữ liệu từ vô số các backend khác nhau mà không cần nhảy qua nhiều công cụ.

#### How It Works
- User mở Dashboard.
- Grafana parse các panels, dịch thành câu query gửi qua API xuống Data Sources.
- Data Sources trả về JSON, Grafana Render thành biểu đồ trên trình duyệt.

### 5.2 Dashboard Design & Variables

#### Definition
- **Dashboard:** Tập hợp các Panel hiển thị thông tin.
- **Variables (Templating):** Biến số có thể thay đổi trên UI (dropdown menu) để tự động hóa thay đổi query. VD: Biến `$datacenter`, `$namespace`, `$pod`.

#### Best Practices
1. Nguyên tắc "Top-Down" (Nhìn từ trên xuống): Trên cùng hiển thị RED metrics (Business/App level), cuộn xuống dưới là USE metrics (Hạ tầng/Node level).
2. Không nhồi nhét: Dùng Row để ẩn/hiện bớt các Panel không cần thiết.
3. Dùng Variables để tránh việc phải tạo 100 Dashboards cho 100 Pods.

### 5.3 Dashboards as Code (Provisioning)

#### Definition
Phương pháp lưu trữ định nghĩa Dashboard (file JSON) và Data Sources (file YAML) trên Git, và Grafana tự động load chúng lúc khởi động (thường kết hợp với ConfigMap trong K8s hoặc Ansible).

#### Why It Exists
- Không bị mất Dashboard nếu server Grafana sập (Disaster Recovery).
- Version control được lịch sử thay đổi (Ai vừa phá Dashboard?).
- Triển khai hàng loạt dễ dàng.

### 5.4 Annotations (Chú thích)

#### Definition
Là các đường gạch dọc trên biểu đồ đánh dấu một sự kiện quan trọng.
VD: Có một đường Annotation gạch xuống báo hiệu "Lúc 9:00 AM có đợt Deploy mới", sau đường đó thì thấy CPU tăng vọt => Giúp dễ dàng nhận diện nguyên nhân lỗi.

## 6. Architecture

```text
[ Users (Browser) ]
        |
        v
+-----------------------+
|    Grafana Server     | <--- Config DB (MySQL/PostgreSQL: lưu user/dashboards)
| (Authentication SSO)  |
+-----------------------+
  |        |         | (Plugins / API Queries)
  v        v         v
[Prom]   [Loki]  [CloudWatch]   (Data Sources)
```

## 7. Hands-on Commands / Configuration

**Grafana Provisioning Data Source (YAML):**
```yaml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus-server:9090
    isDefault: true
```

**K8s ConfigMap approach (kết hợp Helm `grafana` chart):**
Trong helm chart, dùng sidecar quét các configmap có label `grafana_dashboard: "1"` để tự động nạp dashboard.

## 8. Common Interview Questions

### Q1: Giải thích sự khác biệt giữa Grafana Alerting và Prometheus Alertmanager?
**Model Answer:**
- Prometheus Alertmanager là công cụ chuyên trách, hiệu năng cao, thường được ưu tiên dùng trong hệ thống thuần Prometheus.
- Grafana Alerting thân thiện với người dùng hơn, hỗ trợ alert đa nguồn (alert từ nhiều data source khác nhau như MySQL, CloudWatch, Prometheus cùng lúc). Từ bản Grafana 8, Grafana Alerting đã hợp nhất và mượn kiến trúc từ Alertmanager, cho phép setup các quy tắc Routing trực tiếp trên UI. Ở hệ thống doanh nghiệp lớn quản lý bằng code, em thường dùng Alertmanager; nhưng nếu có team non-tech cần tự tạo rule, Grafana Alert là lựa chọn tốt.

### Q2: Nếu Dashboard load quá chậm, em tối ưu bằng cách nào?
**Model Answer:**
Dashboard chậm thường do query nặng hoặc quá nhiều dữ liệu hiển thị. Em tối ưu qua các bước:
1. Giảm thiểu khoảng thời gian truy vấn mặc định (ví dụ xem 1h thay vì 30 ngày).
2. Tránh sử dụng query regex quá rộng (`.*`).
3. Sử dụng **Recording Rules** ở phía Prometheus để tính toán trước các chỉ số phức tạp, Grafana chỉ việc lôi metric đã tính ra hiển thị.
4. Điều chỉnh thông số `Min step` trong các panel cho phù hợp để không lấy quá nhiều điểm dữ liệu li ti (data points).

### Q3: Làm sao để tích hợp Grafana với hệ thống quản lý user của Công ty (ví dụ: Active Directory của Enterprise)?
**Model Answer:**
Em sẽ cấu hình Grafana tích hợp với Active Directory thông qua giao thức LDAP hoặc SAML/OIDC.
Cấu hình mapping role: nhóm `Domain Admins` trong AD sẽ tương ứng với quyền `Admin` trên Grafana; nhóm `DevTeam` tương ứng `Viewer` hoặc `Editor` trên một số Folder nhất định. Điều này giúp quản lý user tập trung (SSO) không cần tạo tài khoản tay.

### Q4: Kể tên một số loại Panel phổ biến và khi nào dùng chúng?
**Model Answer:**
- **Time series / Graph:** Hiển thị sự thay đổi qua thời gian (CPU, RAM).
- **Stat:** Số tổng hợp (Current CPU %, Total Error Rate).
- **Gauge:** Đo lường có giới hạn (Đồng hồ công tơ mét biểu diễn % disk usage).
- **Table:** Hiển thị Top N (Ví dụ top 10 pods ăn CPU nhiều nhất).
- **Logs:** Đọc dữ liệu từ Loki/Elasticsearch.

## 9. Scenario-Based Questions

### Scenario 1: Quản trị Dashboard ở quy mô lớn
**Situation:** Enterprise có 20 team dev, mỗi team tự lên Grafana bấm tạo Dashboard rồi tạo ra hàng trăm Dashboard lộn xộn, bị ghi đè. Em giải quyết sao?
**How to approach:** Chuyển sang GitOps và RBAC.
**Model Answer:**
1. Khóa quyền Edit trên UI đối với phần lớn user. Áp dụng Dashboards as Code.
2. Ai muốn tạo Dashboard phải viết file JSON, tạo Pull Request lên GitLab. Hệ thống CI/CD sẽ validate và deploy qua API hoặc K8s ConfigMap.
3. Tổ chức cấu trúc thư mục (Folders) trên Grafana, phân quyền RBAC: Team A chỉ được xem/edit trong thư mục của Team A.

### Scenario 2: Tracing sự cố sau triển khai
**Situation:** App tự nhiên dở chứng lúc 10h sáng. Làm sao để Dashboard Grafana giúp phát hiện nhanh lỗi do bản deploy lúc 9h55?
**How to approach:** Sử dụng Annotations API.
**Model Answer:**
Trong pipeline CI/CD, ở bước cuối cùng sau khi deploy thành công, em sẽ thêm một lệnh `curl` gọi vào API Grafana Annotations để tạo một đường vạch đánh dấu (Tag: 'deploy-prod-v1.2'). Khi sự cố xảy ra, kỹ sư nhìn lên dashboard sẽ thấy ngay một đường kẻ vạch ngay trước mốc thời gian metric bắt đầu bất thường, xác nhận ngay nguyên nhân là do bản deploy mới.

## 10. Troubleshooting Exercises

### Problem 1: No Data trên Panel
**Symptoms:** Một panel hiển thị `No Data`.
**Root Cause:**
- Query bị sai hoặc metric đó đã không còn được expose.
- Variable trên dropdown không match với giá trị thực tế của môi trường.
- Data source không kết nối được (Time drift giữa Grafana và TSDB).
**Solution:** Click "Edit Panel" -> bật "Query Inspector" để xem chuỗi JSON request/response và câu query cuối cùng được generate để debug thẳng bằng tay trên Prometheus UI.

## 11. Key Takeaways
- Grafana không lưu metrics, nó chỉ query.
- Dùng Variables để làm Dashboard "động" (Dynamic).
- Dashboards as Code (Provisioning) là bắt buộc trong DevOps/SRE.
- Kết hợp Annotations và SSO cho môi trường doanh nghiệp.

## 12. Quick Reference
| Tính năng | Tác dụng |
|---|---|
| Provisioning | Load Data Sources / Dashboards từ file |
| Variables | Templating, tạo dropdown list |
| Annotations | Đánh dấu sự kiện trên trục thời gian |
| Role-based Access | Phân quyền Admin/Editor/Viewer |
