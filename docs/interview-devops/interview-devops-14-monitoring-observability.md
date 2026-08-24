# 14. Monitoring & Observability

## 1. Why This Matters
Tại Doanh nghiệp Enterprise quy mô lớn, hệ thống logistics doanh nghiệp lớn và Multi-DC cần hoạt động 24/7 với độ trễ tối thiểu. Bất kỳ sự cố nào xảy ra (ví dụ: chậm trễ trong xử lý thủ tục, rớt mạng giữa các DC) đều ảnh hưởng lớn đến chuỗi cung ứng. Monitoring & Observability không chỉ giúp phát hiện lỗi mà còn cung cấp khả năng hiểu rõ nội tại hệ thống (Observability) để phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA), dự báo tải trọng và tối ưu hóa chi phí vận hành.

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **Bạn đã biết (từ CV):** Prometheus, Grafana, triển khai giám sát trên nền tảng AWS EKS bằng Helm, thu thập telemetry cho 23 microservices.
- **Phỏng vấn có thể hỏi:** Cách thiết kế kiến trúc monitoring cho môi trường Hybrid/Multi-DC. Giải thích các chiến lược alert, đo lường SLI/SLO cho hệ thống E-Commerce của bạn.
- **Khoảng trống cần bù đắp:** Hiểu biết sâu sắc về các khái niệm lý thuyết như RED/USE method, Error budgets, và cách apply vào bài toán Multi-DC của Enterprise.

## 4. Prerequisites
- Kiến thức cơ bản về Server (Linux/Windows).
- Kiến thức về kiến trúc Microservices và Network.
- Khái niệm về các thành phần IT (CPU, RAM, Disk I/O, Network Throughput).

## 5. Core Concepts

### 5.1 Monitoring vs Observability

#### Definition
- **Monitoring (Giám sát):** Quá trình thu thập, phân tích và hiển thị thông tin để trả lời câu hỏi *"Hệ thống có đang hoạt động tốt không? Sự cố nào đang xảy ra?"* (Thiên về Known unknowns).
- **Observability (Khả năng quan sát):** Khả năng hiểu được trạng thái nội tại của hệ thống từ bên ngoài dựa trên dữ liệu telemetry (Metrics, Logs, Traces) để trả lời câu hỏi *"Tại sao hệ thống lại xảy ra sự cố này?"* (Thiên về Unknown unknowns).

#### Why It Exists
Hệ thống microservices và phân tán tạo ra độ phức tạp khổng lồ. Việc chỉ biết "hệ thống bị sập" là chưa đủ, ta cần biết request đi qua các service nào và kẹt ở đâu.

#### How It Works
- Giám sát tập trung vào việc tạo Alert (Cảnh báo) và Dashboard.
- Khả năng quan sát đi sâu vào Tracing (Theo dõi phân tán), gom nhóm Log và tương quan Metrics.

#### Real-world Example
Tại Enterprise, hệ thống khai báo hải quan điện tử bị chậm. Monitoring báo lỗi "High Latency". Observability cho phép trace từ API Gateway qua 5 microservices để tìm ra một query DB chậm gây nghẽn.

#### Production Example
Sử dụng Prometheus để Monitoring (cảnh báo CPU > 80%) và sử dụng Grafana Tempo + Loki để Observability (Trace request có ID X để xem log tương ứng).

#### Interview Answer Template
"Monitoring giúp em biết được HỆ THỐNG ĐANG LỖI (What), còn Observability giúp em tìm ra TẠI SAO LỖI (Why) bằng cách tương quan Metrics, Logs và Traces."

### 5.2 Three Pillars of Observability

#### Definition
- **Metrics (Chỉ số đo lường):** Dữ liệu định lượng dạng chuỗi thời gian (time-series). VD: CPU usage 80%.
- **Logs (Bản ghi sự kiện):** Dữ liệu văn bản ghi lại một sự kiện tại một thời điểm. VD: User X login failed.
- **Traces (Dấu vết):** Biểu diễn đường đi của một request xuyên suốt qua hệ thống phân tán.

#### Why It Exists
Cung cấp cái nhìn toàn diện 360 độ về hệ thống.

#### How It Works
- Metrics dùng để Alerting (nhẹ, nhanh).
- Khi có Alert, kỹ sư dùng Traces để xác định Service lỗi.
- Cuối cùng dùng Logs của Service đó để tìm nguyên nhân cụ thể.

### 5.3 SLA, SLO, SLI

#### Definition
- **SLI (Service Level Indicator):** Chỉ số đo lường thực tế. VD: 99.5% request HTTP thành công.
- **SLO (Service Level Objective):** Mục tiêu nội bộ đặt ra. VD: Yêu cầu 99.9% request thành công.
- **SLA (Service Level Agreement):** Cam kết pháp lý với khách hàng. VD: Nếu uptime < 99.9%, sẽ bồi thường 10% phí.

### 5.4 RED & USE Methods

#### Definition
- **RED Method (Dành cho Application/Services):**
  - **Rate:** Số lượng request mỗi giây.
  - **Errors:** Tỉ lệ request lỗi.
  - **Duration:** Thời gian xử lý request (Latency).
- **USE Method (Dành cho Infrastructure/Resources):**
  - **Utilization:** Phần trăm thời gian tài nguyên bận (VD: CPU 90%).
  - **Saturation:** Mức độ công việc phải chờ (VD: Run queue length).
  - **Errors:** Số lượng lỗi xảy ra trên tài nguyên (VD: Disk I/O errors).

## 6. Architecture

Kiến trúc giám sát Multi-DC:
```text
[DC 1 - Primary DC]            [DC 2 - Hiệp Phước]
+-----------------+         +-----------------+
| Services/Apps   |         | Services/Apps   |
| Node Exporters  |         | Node Exporters  |
| Prom (Local)    |         | Prom (Local)    |
+--------+--------+         +--------+--------+
         |                           |
         +-------------+-------------+
                       |
            [Centralized Monitoring DC]
            +-------------------------+
            | Thanos / VictoriaMetrics|
            | Grafana LGTM            |
            | Alertmanager -> Email/Tele|
            +-------------------------+
```

## 7. Hands-on Commands / Configuration

Prometheus Alert Rule example cho RED Method (Latency):
```yaml
groups:
- name: API_Alerts
  rules:
  - alert: HighLatency
    expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High Latency on {{ $labels.instance }}"
      description: "95th percentile latency is greater than 2s for 5m."
```

## 8. Common Interview Questions

### Q1: Phân biệt Monitoring và Observability?
**Model Answer:**
Monitoring giúp ta trả lời câu hỏi "Hệ thống có đang lỗi không?" bằng cách thu thập các metrics biết trước để tạo alert. Observability cao cấp hơn, giúp trả lời câu hỏi "Tại sao hệ thống lỗi?" thông qua việc kết hợp Metrics, Logs và Traces để điều tra các vấn đề chưa lường trước được (unknown unknowns).

### Q2: Em thiết kế cảnh báo (Alert) như thế nào để tránh tình trạng "Alert Fatigue" (mệt mỏi vì quá nhiều cảnh báo)?
**Model Answer:**
Em sẽ tuân thủ nguyên tắc:
1. Chỉ alert những vấn đề thực sự ảnh hưởng đến user hoặc hệ thống (Actionable alerts).
2. Phân loại severity (Critical: gọi điện ban đêm, Warning: gửi email xem vào giờ hành chính).
3. Sử dụng Grouping và Inhibition trong Alertmanager (ví dụ mạng rớt thì không báo lỗi DB).
4. Alert dựa trên triệu chứng (Symptom-based, VD: Web lỗi 500) thay vì nguyên nhân (Cause-based, VD: CPU 80%).

### Q3: Áp dụng RED và USE method như thế nào?
**Model Answer:**
USE method em dùng cho hạ tầng (Node Exporter): đo CPU/RAM Utilization, độ bão hòa Disk I/O, và lỗi phần cứng. RED method em dùng cho Microservices: đo số lượng Request/giây (Rate), tỷ lệ lỗi 5xx (Errors) và độ trễ response (Duration).

### Q4: Trình bày quy trình xử lý sự cố (Incident Response) khi nhận được một Critical Alert.
**Model Answer:**
1. **Acknowledge:** Xác nhận đã nhận thông báo trên kênh On-call.
2. **Triage:** Đánh giá mức độ ảnh hưởng bằng cách xem Dashboard tổng quan (SLI đang rớt bao nhiêu).
3. **Investigate:** Áp dụng Observability: xem Trace để xác định service gây chậm, sau đó kiểm tra Log của service đó.
4. **Mitigate/Resolve:** Áp dụng giải pháp tạm thời (Rollback, Restart, Scale up) để khôi phục dịch vụ nhanh nhất có thể.
5. **Post-mortem:** Viết báo cáo RCA (Root Cause Analysis) và đề xuất phương án phòng ngừa.

### Q5: Error Budget là gì?
**Model Answer:**
Error Budget là "ngân sách" lỗi mà hệ thống được phép có mà không vi phạm SLO. Ví dụ SLO là 99.9% uptime, thì Error Budget là 0.1% downtime (khoảng 43 phút mỗi tháng). Nếu tiêu hết Error Budget, team dev phải dừng deploy tính năng mới để tập trung cải thiện độ ổn định.

## 9. Scenario-Based Questions

### Scenario 1: Giám sát Multi-DC
**Situation:** Enterprise có 2 Data Center. Làm sao để có 1 dashboard duy nhất giám sát cả 2 nơi nhưng lỡ mạng giữa 2 DC đứt, từng DC vẫn phải tự cảnh báo được?
**How to approach:** Sử dụng kiến trúc Edge-Central.
**Model Answer:**
Em sẽ cài đặt mỗi DC một cụm Prometheus/Alertmanager cục bộ (Edge) để tự động thu thập và đánh giá rule alert. Dù đứt mạng liên DC, hệ thống nội bộ DC đó vẫn phát alert. Ở trung tâm, em dùng Thanos Query hoặc cấu hình Prometheus Federation để tổng hợp data từ 2 DC lên 1 Grafana Dashboard duy nhất.

### Scenario 2: Phân tích hệ thống chậm
**Situation:** Users report website chậm. Dashboard CPU/RAM vẫn ở mức 30-40%. Em điều tra thế nào?
**How to approach:** Sử dụng Observability pillars và RED method.
**Model Answer:**
1. Em kiểm tra Dashboard về RED method để xác nhận SLI độ trễ (Duration) có tăng hay không.
2. Kiểm tra Logs hoặc Distributed Traces (Tempo/Jaeger) để xem request đang chờ ở service nào (Ví dụ: chờ query Database).
3. Kiểm tra DB metrics (Connection pool, Lock, Slow queries) hoặc network latency.

## 10. Troubleshooting Exercises

### Problem 1: Khách hàng kêu lag, nhưng hệ thống không có cảnh báo
**Symptoms:** User phàn nàn trên Facebook là app lag, nhưng PagerDuty không kêu.
**Root Cause:** Alert đang cấu hình dựa trên giá trị trung bình (Average latency) thay vì Percentile (p95, p99), làm ẩn đi các request bị lag cục bộ, hoặc ngưỡng cảnh báo quá cao.
**Solution:** Thay đổi PromQL để alert theo p95/p99 (histogram_quantile) để bắt được các trải nghiệm xấu nhất của user.
**Prevention:** Định kỳ rà soát và điều chỉnh lại SLI/SLO cho sát với trải nghiệm người dùng thực tế.

## 11. Key Takeaways
- **Monitoring vs Observability:** Monitoring báo cái gì hỏng, Observability giải thích tại sao.
- **Pillars:** Metrics, Logs, Traces.
- **Methods:** USE cho Infrastructure, RED cho Application.
- **Alerting:** Không alert "tiếng ồn", thiết kế cảnh báo actionable, có phân loại mức độ.

## 12. Quick Reference
| Khái niệm | Định nghĩa nhanh | Áp dụng |
|---|---|---|
| SLI | Con số thực tế hệ thống đạt được | Metrics đo được (VD: 99.5%) |
| SLO | Mục tiêu hướng tới | Mức kỳ vọng nội bộ (VD: 99.9%) |
| SLA | Hợp đồng cam kết với khách hàng | Kèm theo hình phạt tài chính |
| RED | Rate, Errors, Duration | Dùng cho microservices |
| USE | Utilization, Saturation, Errors | Dùng cho host/VM/network |
