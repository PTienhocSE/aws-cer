# 15. Prometheus

## 1. Why This Matters
Prometheus là tiêu chuẩn de facto cho giám sát môi trường Cloud-Native và Kubernetes. Đối với JD System & DevOps Engineer yêu cầu Kubernetes, Grafana, OpenShift, Prometheus là nền tảng cốt lõi không thể thiếu. Việc hiểu sâu PromQL, kiến trúc và cách scale Prometheus sẽ là yếu tố quyết định để ứng viên chứng minh năng lực triển khai hệ thống cho doanh nghiệp.

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **Bạn đã biết (từ CV):** Đã dùng Prometheus, Grafana, helm chart, kube-prometheus-stack cho hệ thống E-Commerce 23 microservices.
- **Phỏng vấn có thể hỏi:** Cách viết PromQL phức tạp, cách tune cấu hình scrape, cơ chế lưu trữ của Prometheus (TSDB), và cách scale cho hệ thống lớn (Thanos/Cortex).
- **Khoảng trống cần bù đắp:** Quản trị Prometheus ở mức Multi-DC, tối ưu hóa cardinality, xử lý alert nâng cao với Alertmanager.

## 4. Prerequisites
- Kiến thức về Monitoring & Observability (Chương 14).
- Kiến thức cơ bản về HTTP, Kubernetes architecture.

## 5. Core Concepts

### 5.1 Prometheus Architecture

#### Definition
Hệ thống giám sát mã nguồn mở dựa trên mô hình "Pull" (chủ động đi lấy dữ liệu) từ các HTTP endpoints (thường ở path `/metrics`).

#### Why It Exists
Giải quyết bài toán giám sát hàng ngàn container/nodes động nhờ cơ chế Service Discovery và mô hình Pull dễ dàng đi qua firewall (so với push).

#### How It Works
- **Prometheus Server:** Chứa Time-Series Database (TSDB) để lưu dữ liệu, bộ Scraping (kéo metrics), bộ tính toán rule.
- **Exporters:** Các process chuyển đổi metrics ứng dụng/hệ thống sang format của Prometheus (Node Exporter, Blackbox Exporter).
- **Pushgateway:** Dùng cho các job chạy ngắn hạn (cron jobs) push metrics lên, rồi Prom pull về từ Pushgateway.
- **Alertmanager:** Nhận cảnh báo từ Prom, gom nhóm (grouping), chống trùng lặp (deduplication) và gửi đi (Email, Slack, Webhook).

#### Real-world Example
Thay vì cấu hình tĩnh IP của 100 VMs, Prometheus tích hợp với K8s hoặc AWS EC2 API (Service Discovery) để tự động phát hiện các node/pod mới sinh ra và cào metrics của chúng.

### 5.2 Data Model & Metric Types

#### Definition
Dữ liệu là Time-series, định danh bằng tên metric và các cặp key-value (labels).
Format: `<metric_name>{<label_name>=<label_value>, ...} value timestamp`

- **Counter:** Giá trị chỉ tăng lên (VD: tổng số request).
- **Gauge:** Giá trị có thể tăng hoặc giảm (VD: RAM usage, số lượng queue đang chờ).
- **Histogram:** Gom nhóm dữ liệu vào các bucket để tính toán phân phối (VD: thời gian phản hồi p95, p99).
- **Summary:** Tương tự Histogram nhưng tính toán quantile trực tiếp tại client.

### 5.3 PromQL (Prometheus Query Language)

#### How It Works
Ngôn ngữ truy vấn mạnh mẽ cho time-series.
- **Selectors:** `http_requests_total{status="500", environment="prod"}`
- **Operators:** Toán học (`+, -, *, /`), So sánh (`==, !=, >, <`).
- **Functions:** `rate()` (tốc độ tăng trưởng cho counter), `irate()`, `histogram_quantile()`.

### 5.4 High Cardinality Problem

#### Definition
Cardinality là số lượng kết hợp độc nhất giữa các labels. VD nếu label `user_id` có 1 triệu user, số lượng time-series tạo ra sẽ làm sập RAM của Prometheus Server.

#### How to approach
Tránh đưa các dữ liệu có độ biến thiên cao (user_id, email, session_id) vào Prometheus labels. Chỉ dùng log/tracing cho các dữ liệu này.

## 6. Architecture

```text
                                    +-------------------+
                                    |   Prometheus UI   |
                                    +-------------------+
                                             | PromQL
+--------------------+   Alerts    +-------------------------+
|                    | <---------- | Prometheus Server       |
|    Alertmanager    |             |  - TSDB                 |
|                    |             |  - HTTP Server          |
+--------------------+             |  - PromQL Engine        |
  | Email/Slack/Pager              +-------|-----------------+
                                           | Pull
   +--------------+      +-----------------+-----------------+
   | Pushgateway  |      | Service Discovery (K8s, EC2)      |
   +--------------+      +---------+-----------------+-------+
         ^                         |                 |
  Push   |                    Pull |                 | Pull
+--------+--------+      +---------+-------+   +-----+---------+
| Short-lived Job |      | Node Exporter   |   | App (Metrics) |
+-----------------+      +-----------------+   +---------------+
```

## 7. Hands-on Commands / Configuration

**Common PromQL:**
1. Tính tỉ lệ lỗi (Error Rate):
`sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100`

2. Lấy P95 Latency:
`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service))`

3. Tính % Free Disk:
`100 - (node_filesystem_avail_bytes / node_filesystem_size_bytes * 100)`

**Alertmanager Routing (Grouping & Inhibition):**
```yaml
route:
  group_by: ['alertname', 'cluster']
  group_wait: 30s # Đợi 30s để gom nhóm các alert giống nhau
  receiver: 'slack_general'
  routes:
  - matchers: [severity="critical"]
    receiver: 'pagerduty'

inhibit_rules:
- source_matchers: [alertname="NodeDown"]
  target_matchers: [alertname="ServiceDown"] # Không báo ServiceDown nếu Node chứa nó đã tẻo
  equal: ['node']
```

## 8. Common Interview Questions

### Q1: Push vs Pull model. Tại sao Prometheus lại chọn Pull?
**Model Answer:**
Prometheus chọn Pull vì:
1. Dễ dàng nhận biết mục tiêu nào đang chết (việc không cào được metrics là một chỉ báo up/down).
2. Tốt cho bảo mật mạng: Prometheus khởi tạo kết nối (outbound) từ mạng quản trị vào mạng ứng dụng, không cần mở port chiều ngược lại.
3. Không làm quá tải client: Prometheus kiểm soát rate kéo, nếu dùng Push, một lượng lớn traffic ập tới có thể làm sập Monitoring server.

### Q2: Khác biệt giữa `rate()` và `irate()` trong PromQL?
**Model Answer:**
Cả hai đều dùng cho Counter. `rate()` tính trung bình tốc độ tăng trưởng trên toàn bộ khoảng thời gian (VD: 5m), phù hợp để cảnh báo (alerting) vì nó mượt mà và loại bỏ gai nhọn (spikes). `irate()` chỉ dùng 2 điểm dữ liệu cuối cùng trong khoảng thời gian đó để tính toán, nó rất nhạy với sự thay đổi, phù hợp để vẽ graph realtime cần hiển thị độ giật cục, không phù hợp cho alerting.

### Q3: Khi dữ liệu Prometheus lớn lên, làm thế nào để Scale và lưu trữ lâu dài?
**Model Answer:**
Bản thân Prometheus không thiết kế cho lưu trữ dài hạn và scale out ngang (cluster ngang) một cách tự nhiên. Em sẽ sử dụng **Thanos** hoặc **VictoriaMetrics**:
1. Cấu hình các Prometheus server ở chế độ HA (chạy 2 con song song).
2. Dùng Thanos Sidecar để upload các block dữ liệu cũ (TSDB) lên Object Storage (S3/MinIO) để lưu trữ dài hạn.
3. Dùng Thanos Query để cung cấp một view hợp nhất (Global View) và tự động lọc dữ liệu trùng (deduplication) từ nhiều con Prometheus.

### Q4: Node Exporter vs kube-state-metrics vs cAdvisor?
**Model Answer:**
- **Node Exporter:** Thu thập metrics ở cấp độ máy chủ vật lý/VM (CPU, RAM, Disk I/O, Network của host).
- **cAdvisor:** Được tích hợp trong Kubelet, đo lường tài nguyên thực tế mà các container (Pod) đang tiêu thụ.
- **kube-state-metrics:** Lắng nghe K8s API server để sinh ra metrics về trạng thái của các objects K8s (VD: Pod nào đang CrashLoopBackOff, Deployment nào thiếu replicas).

### Q5: Giải thích Recording Rules. Tại sao cần nó?
**Model Answer:**
Recording rules cho phép tính toán trước (pre-calculate) các PromQL query phức tạp, tốn tài nguyên và lưu kết quả vào một time-series metric mới. Khi Dashboard hiển thị, nó chỉ cần query cái metric mới này thay vì tính toán lại toàn bộ, giúp giảm tải CPU cho Prometheus Server và làm Dashboard load nhanh hơn.

## 9. Scenario-Based Questions

### Scenario 1: High Cardinality Crash
**Situation:** Dev vô tình thêm `user_id` vào label của số liệu đếm số lượng HTTP request. Sau 1 giờ, Prometheus bị OOM (Out of Memory) và crash.
**How to approach:** Khắc phục ngay lập tức, sau đó áp dụng cơ chế block label.
**Model Answer:**
1. Em sẽ báo dev gỡ bỏ `user_id` khỏi label và redeploy ứng dụng.
2. Để phục hồi Prometheus, em có thể xoá bỏ data TSDB gần nhất hoặc chạy script xoá riêng metric bị phình to (dùng Prom API delete_series).
3. Về lâu dài, em sẽ cấu hình `metric_relabel_configs` ở cấp Prometheus (chức năng `drop` hoặc lược bỏ label) để chặn các label nguy hiểm (như `user_id`, `session_id`) trước khi dữ liệu được ghi vào TSDB.

### Scenario 2: Xử lý Alert rác
**Situation:** Một switch mạng bị rớt, làm 50 VMs không kết nối được. Thay vì nhận 1 alert "Rớt mạng", bạn nhận được hàng trăm alerts "App down", "DB down", "Node down".
**How to approach:** Sử dụng Alertmanager features.
**Model Answer:**
Em sẽ tinh chỉnh lại cấu hình Alertmanager:
1. **Grouping:** Group các alert theo `datacenter` hoặc `rack` để gộp 100 email thành 1 email tổng.
2. **Inhibition:** Viết luật: nếu có alert `NetworkSwitchDown`, hãy suppress (im lặng) tất cả các alert `NodeDown` có cùng label vùng mạng đó.

## 10. Troubleshooting Exercises

### Problem 1: Prometheus bị lỡ dữ liệu (Gaps in graphs)
**Symptoms:** Biểu đồ Grafana thỉnh thoảng bị đứt đoạn, có những khoảng trống không có dữ liệu.
**Root Cause:** Thời gian cào dữ liệu (scrape_timeout) vượt quá giới hạn hoặc quá trình cào mất quá nhiều thời gian do app xử lý endpoint `/metrics` chậm; hoặc Prometheus Server bị thắt cổ chai CPU/Disk I/O.
**Solution:**
- Kiểm tra metric `scrape_duration_seconds` để xem target nào trả dữ liệu chậm. Tối ưu `/metrics` endpoint của app.
- Nếu do Prometheus Disk I/O chậm, chuyển thư mục TSDB sang ổ cứng SSD tốc độ cao.
- Kiểm tra xem target có bị down tạm thời không.

## 11. Key Takeaways
- Prometheus dùng mô hình Pull.
- Không đưa thông tin động có tập hợp cực lớn (như user_id) vào Labels.
- Phân biệt `rate` (dùng cảnh báo) và `irate` (dùng xem graph nhanh).
- Kết hợp Thanos hoặc VictoriaMetrics để giải bài toán lưu trữ dài hạn (Long-term storage).

## 12. Quick Reference
| Component | Chức năng |
|---|---|
| Prometheus Server | Cào dữ liệu, lưu TSDB, query engine |
| Node Exporter | Lấy metric hệ điều hành (Linux/Windows) |
| Pushgateway | Đệm dữ liệu cho short-lived batch jobs |
| Alertmanager | Routing, grouping, silencing alert |
| Blackbox Exporter| Ping, HTTP check xem dịch vụ sống hay chết |
