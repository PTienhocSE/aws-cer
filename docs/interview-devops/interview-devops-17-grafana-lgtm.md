# 17. Grafana LGTM Stack

## 1. Why This Matters
LGTM Stack (Loki, Grafana, Tempo, Mimir) là bộ tứ hoàn hảo được Grafana Labs phát triển để cung cấp giải pháp Observability toàn diện. So với việc kết hợp các công cụ rời rạc, LGTM tích hợp trơn tru, chia sẻ chung hệ sinh thái Labels giống như Prometheus. Với định hướng hiện đại hóa hệ thống tại Enterprise, thay vì phải mua license đắt đỏ của Datadog/Dynatrace, LGTM là giải pháp Open-source tối ưu chi phí và mở rộng cực tốt cho các cụm K8s.

## 2. Interview Priority
> 🟠 HIGH

## 3. CV Connection
- **Bạn đã biết (từ CV):** Đã làm Prometheus, Grafana.
- **Phỏng vấn có thể hỏi:** Cần log tập trung thì dùng ELK hay Loki? Distributed Tracing em đã làm chưa? Điểm yếu của Prometheus là gì và Mimir khắc phục thế nào?
- **Khoảng trống cần bù đắp:** Hiểu hệ sinh thái mở rộng của Grafana, đặc biệt là Loki (Logs) và Tempo (Traces) để trả lời bức tranh toàn cảnh về Observability 3 pillars.

## 4. Prerequisites
- Kiến thức về Monitoring & Observability (Chương 14).
- Kiến thức về Prometheus (Chương 15).

## 5. Core Concepts

### 5.1 LGTM là gì?

- **L (Loki):** Hệ thống tổng hợp Log, hoạt động như Prometheus (dùng labels thay vì index toàn bộ text).
- **G (Grafana):** UI hiển thị và query.
- **T (Tempo):** Hệ thống lưu trữ Distributed Tracing quy mô lớn.
- **M (Mimir):** Hệ thống lưu trữ metrics dài hạn (TSDB), kế thừa từ Cortex, khắc phục điểm yếu lưu trữ của Prometheus.

### 5.2 Loki (Logs)

#### Definition
Được ví như "Prometheus, but for logs". Các agent (Promtail hoặc Fluent-bit) thu thập log, gắn label (như `app=frontend`, `cluster=hcm`) và gửi về Loki.

#### Why It Exists / Vs ELK
ELK/EFK stack (Elasticsearch) sẽ lập chỉ mục (index) toàn bộ nội dung của mọi dòng log, dẫn đến hao tốn RAM/Disk cực kỳ khủng khiếp. Loki ngược lại, CHỈ index các LABELS, nội dung log được nén lại lưu ra Object Storage (S3). Do đó Loki rẻ hơn, tốn ít tài nguyên hơn, và dễ vận hành hơn ELK.

#### LogQL
Ngôn ngữ truy vấn tương tự PromQL.
Ví dụ: `{app="frontend"} |= "error" | json | latency > 200`
(Tìm log của frontend có chứa chữ "error", parse dạng json và lọc latency > 200).

### 5.3 Tempo (Traces)

#### Definition
Hệ thống lưu trữ các dấu vết (Traces) dựa trên Object Storage. Nó lấy các Spans (từ Jaeger, OpenTelemetry), đánh index theo Trace ID và lưu trữ.

#### How It Works
Khi có cảnh báo lỗi, bạn tìm được Trace ID trong Log, nhập Trace ID vào Tempo để xem một biểu đồ thác (Waterfall) biểu diễn Request đó mất bao nhiêu mili-giây tại API Gateway, bao nhiêu mili-giây ở Database.

### 5.4 Mimir (Metrics)

#### Definition
Prometheus server gốc không thiết kế cho High Availability tuyệt đối và lưu trữ lâu dài. Mimir (tên cũ Cortex) nhận metrics đẩy lên từ nhiều Prometheus server, giải quyết bài toán: Clustering ngang, Multi-tenancy (nhiều tổ chức dùng chung), và lưu trữ chục năm trên S3.

## 6. Architecture (Sự Tương Quan)

Hành trình xử lý sự cố chuẩn (Exemplars / Correlations):
1. **Mimir/Prometheus:** Bắn Alert "Tỷ lệ lỗi 5xx cao". User click vào Dashboard Grafana.
2. Trên biểu đồ metrics (Grafana), tính năng Exemplars gắn sẵn một link tới Trace ID tương ứng tại thời điểm lỗi.
3. **Tempo:** User click vào Trace ID, mở ra biểu đồ Waterfall, phát hiện `PaymentService` bị timeout.
4. Từ màn hình Tempo, có nút "Logs for this span" tự động nhảy sang **Loki**.
5. **Loki:** Hiển thị chính xác dòng log của `PaymentService` tại đúng milli-giây đó: `"DB Connection Refused"`.

## 7. Common Interview Questions

### Q1: Tại sao em lại chọn Loki thay vì ELK/Elasticsearch cho Kubernetes logs?
**Model Answer:**
Trong Kubernetes, môi trường có số lượng pod thay đổi liên tục. ELK tạo full-text search index, dẫn đến index phình to rất nhanh, tốn kém chi phí phần cứng (RAM/Storage) và đòi hỏi chuyên môn quản trị JVM/Elasticsearch cao.
Loki chỉ đánh index các labels (giống Prometheus) và lưu log raw nén trong S3/Object Storage. Do đó, Loki vận hành rất nhẹ, rẻ hơn đáng kể, và có sự tương thích tự nhiên: em có thể dùng chung một cấu trúc label (như namespace, pod name) cho cả Prometheus và Loki, giúp việc cross-query cực kỳ liền mạch trên Grafana.

### Q2: OpenTelemetry là gì và nó liên quan gì đến LGTM?
**Model Answer:**
OpenTelemetry (OTel) là một chuẩn công nghiệp để thống nhất việc tạo và thu thập cả 3 trụ cột (Metrics, Logs, Traces). Nó cung cấp bộ SDK cho dev để gắn mã vào app. OTel Collector sau khi nhận telemetry từ app sẽ phân phối: Logs gửi về Loki, Metrics gửi về Mimir, Traces gửi về Tempo. Nó giúp tránh việc bị khóa (vendor-lockin) vào một agent cụ thể.

### Q3: Mimir giải quyết vấn đề gì của Prometheus?
**Model Answer:**
Prometheus local lưu dữ liệu trên đĩa cứng tĩnh, khó scale up theo chiều ngang khi dữ liệu phình to và không có tính năng Multi-tenant. Mimir cung cấp:
- Mở rộng ngang vô hạn nhờ lưu trữ state ra Object Storage (S3).
- Global View: tổng hợp metrics từ nhiều cụm K8s khác nhau.
- Hỗ trợ Multi-tenancy cứng (cách ly dữ liệu giữa các team/khách hàng).

### Q4: Nêu ý tưởng thiết kế Observability cho 1 ứng dụng Microservices mới?
**Model Answer:**
1. Code app: Tích hợp OpenTelemetry SDK để sinh ra Metrics và Traces. Viết Logs ra stdout dạng JSON.
2. Collection: Cài OTel Collector và Promtail/Fluent-bit dưới dạng DaemonSet trên K8s.
3. Storage: Deploy LGTM stack.
4. Visualize: Tạo các Grafana Dashboard tương quan giữa RED metrics, logs có chứa trace_id.

## 8. Scenario-Based Questions

### Scenario 1: Debug lỗi chậm chập chờn
**Situation:** Một API lâu lâu bị delay trên 5 giây, nhưng tải hệ thống không cao. Logs không có lỗi (200 OK). ELK không báo lỗi.
**How to approach:** Tracing với Tempo.
**Model Answer:**
Trường hợp này Logs và Metrics không đủ. Em cần Distributed Tracing. Em sẽ xem P99 latency metric trên Grafana, tìm các Trace có thời gian > 5s và mở trong Tempo. Tempo sẽ cho thấy "thác thời gian", có thể 4.9s đã bị kẹt ở việc DNS lookup nội bộ hoặc chờ call 1 API external nào đó (như cổng thanh toán của ngân hàng).

## 9. Key Takeaways
- LGTM (Loki, Grafana, Tempo, Mimir) là bộ công cụ Observability mã nguồn mở toàn diện.
- Loki rẻ và nhẹ nhờ không lập chỉ mục toàn bộ nội dung.
- Sự kết hợp liền mạch qua lại (Correlation) nhờ dùng chung kiến trúc Label là sức mạnh lớn nhất của stack này.

## 10. Quick Reference
| Công cụ | Chức năng | Phù hợp với |
|---|---|---|
| Loki | Logs | Lưu log phân tán giá rẻ |
| Tempo | Traces | Theo dõi request chéo microservices |
| Mimir | Metrics dài hạn | Hệ thống nhiều cụm K8s khổng lồ |
| Grafana | UI | Trực quan hóa tất cả ở 1 nơi |
