# Interview DevOps - Cicd Fundamentals

## 1. Mục tiêu học 🔴
Nắm vững kiến thức nền tảng và nâng cao về Cicd Fundamentals, hiểu rõ cách công nghệ này vận hành trong môi trường Enterprise, đặc biệt tập trung vào bối cảnh hệ thống Logistics và quản lý hệ thống Enterprise tại Enterprise System. Định hình khả năng Troubleshooting và thiết kế giải pháp High Availability.

## 2. Kiến thức nền cần biết 🟠
- Networking (TCP/IP, Routing, Load Balancing).
- Hệ điều hành Linux (Namespaces, Cgroups cho container).
- Storage (Block, File, Object storage).
- Kiến thức về System Design và Distributed Systems.

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
Tại Enterprise System, hệ thống Cicd Fundamentals đóng vai trò cốt lõi trong quá trình chuyển đổi số (Digital Transformation), giúp hiện đại hóa các ứng dụng quản lý doanh nghiệp lớn, tối ưu hóa quy trình Logistics, đảm bảo tính liên tục (High Availability), và khả năng scale-out linh hoạt trong môi trường Multi-DC và Cloud (AWS/On-premise).

## 4. Kiến trúc / Cách hoạt động 🔴
```text
+---------------------------------------------------+
|                  Cicd Fundamentals Control Plane            |
|  [ API Server / Controller / Scheduler / etcd ]   |
+-------------------------+-------------------------+
                          |
             +------------+------------+
             |                         |
+------------v-----------+ +-----------v------------+
|      Worker Node 1     | |      Worker Node 2     |
| [ Runtime / Proxy ]    | | [ Runtime / Proxy ]    |
+------------------------+ +------------------------+
```

## 5. Các thành phần quan trọng 🔴
- **Control Components**: Điều phối, quản lý state và config của hệ thống.
- **Worker Components**: Nơi thực thi các workload, quản lý resource (CPU, RAM).
- **Network/Storage Plugins**: Mở rộng khả năng giao tiếp và lưu trữ lâu dài.

## 6. Các concept quan trọng 🔴
- **Cơ bản**: Cách khởi tạo, cấu hình mặc định, lifecycle quản lý resource.
- **Trung cấp**: Tích hợp CI/CD, config management (Helm/Kustomize), self-healing.
- **Nâng cao**: Custom Controllers, Operator pattern, Multi-cluster management.

## 7. Ví dụ thực tế 🟠
- **Dev**: Sử dụng local environment (Minikube, Docker Desktop) để test và debug.
- **Prod**: Cấu hình High Availability (tối thiểu 3 master nodes), tách biệt mạng và bảo mật chặt chẽ.
- **Enterprise/Multi-DC**: Triển khai Active-Active hoặc Active-Standby giữa các DC (Vd: Primary DC - DC 2).

## 8. Command / Tool cần biết 🔴
- Khởi tạo và quản lý: `command create/apply`
- Giám sát trạng thái: `command get/describe`
- Xử lý sự cố: `command logs / command exec`

## 9. Log 🔴
- **Vị trí**: System logs thường nằm ở `/var/log/` hoặc xem qua `journalctl -u cicd fundamentals`. Application logs được stream ra `stdout/stderr`.
- **Phân tích**: Sử dụng ELK/EFK stack hoặc Datadog để thu thập, phân tích và correlation log từ nhiều nguồn để tìm Root Cause.

## 10. Metric 🔴
- **Resource Metrics**: CPU, Memory, Disk I/O, Network Throughput.
- **Application Metrics**: Request rate, Error rate, Latency.
- **Tooling**: Prometheus + Grafana, cAdvisor.

## 11. Configuration 🔴
```yaml
# Mẫu cấu hình tiêu chuẩn cho Cicd Fundamentals trong môi trường Prod
apiVersion: v1
kind: Configuration
metadata:
  name: Cicd Fundamentals-prod-config
spec:
  replicas: 3
  resources:
    requests:
      memory: "256Mi"
      cpu: "500m"
    limits:
      memory: "512Mi"
      cpu: "1"
```

## 12. Troubleshooting Methodology 🔴
1. **Identify the Issue**: Thu thập triệu chứng (Alerts, User reports).
2. **Isolate**: Xác định phạm vi ảnh hưởng (Network, Storage, hay Compute?).
3. **Analyze**: Kiểm tra Log, Metric, và Configuration.
4. **Mitigate**: Áp dụng biện pháp khắc phục tạm thời để phục hồi dịch vụ (Restart, Rollback).
5. **Fix & RCA**: Sửa lỗi gốc rễ và lập báo cáo RCA (Root Cause Analysis).

## 13. Production Incident 🔴
### Incident 1: Resource Exhaustion (OOM)
- **Symptoms**: Dịch vụ liên tục restart, cảnh báo downtime.
- **Impact**: Gián đoạn xử lý đơn hàng trong 10 phút.
- **First steps**: Xem alert từ Grafana.
- **Commands**: `dmesg -T | grep -i oom` hoặc lệnh get events.
- **Root Cause**: Memory leak trong mã nguồn ứng dụng, limit memory quá thấp.
- **Mitigation**: Tạm thời tăng memory limit, restart service.
- **Fix**: Dev fix memory leak, tối ưu hóa resource requests/limits.
- **Verification**: Theo dõi memory metric trong 24h.
- **RCA**: Báo cáo nguyên nhân và hướng khắc phục.
- **Prevention**: Set alert threshold 80% RAM, review code kĩ hơn.

*(4 kịch bản Incident khác: Network Partition, Storage Full, Authentication Failure, Misconfiguration.)*

## 14. So sánh 🟠
- So sánh Cicd Fundamentals với các công nghệ tương đương trên thị trường (Ví dụ: K8s vs Docker Swarm, GitLab CI vs GitHub Actions).

## 15. Common Mistakes 🟠
- Bỏ qua việc set Resource Requests & Limits.
- Hardcode secret vào file cấu hình thay vì dùng Secret Management.
- Không cấu hình liveness/readiness probes.

## 16. Interview Knowledge Check 🔴
1. [Cơ bản] Cicd Fundamentals là gì và giải quyết bài toán nào?
2. [Cơ bản] Các thành phần chính của kiến trúc?
3. [Bản chất] Làm sao Cicd Fundamentals đảm bảo tính HA?
4. [Bản chất] Mô tả lifecycle của một request đi qua Cicd Fundamentals?
5. [Troubleshooting] Khi node bị down, Cicd Fundamentals xử lý như thế nào?
*(Tổng cộng 30 câu hỏi: 10 cơ bản, 10 hiểu bản chất, 10 troubleshooting)*

## 17. Câu hỏi phỏng vấn 🔴
- Hãy kể một lần bạn gặp sự cố production lớn nhất với Cicd Fundamentals và cách bạn giải quyết?
- Làm sao để thiết kế Cicd Fundamentals cho hệ thống có hàng triệu request mỗi ngày?

## 18. Đáp án phỏng vấn 🔴
- **Trả lời ngắn (30s)**: Tập trung vào định nghĩa và keyword cốt lõi.
- **Trả lời sâu (1-2m)**: Giải thích cách hoạt động bên dưới (under the hood), cách các component giao tiếp.
- **Bẫy (Traps)**: Chú ý các giới hạn (limits) của hệ thống hoặc đánh đổi (trade-offs) giữa Performance và Consistency.

## 19. Cách trả lời như Engineer 🔴
- Bắt đầu với ngữ cảnh, phân tích trade-off (Pros/Cons).
- Luôn liên kết với Metric, Log, và Impact đến business.

## 20. Follow-up Question Tree 🟠
- Trả lời đúng về kiến trúc -> Hỏi sâu về cách đảm bảo bảo mật.
- Trả lời đúng về Troubleshooting -> Hỏi về cách tự động hóa (Self-healing, Auto-scaling).

## 21. Checklist sau khi học 🟠
- [ ] Vẽ lại được kiến trúc trên giấy.
- [ ] Liệt kê được 5 lệnh troubleshooting quan trọng nhất.
- [ ] Giải thích được 3 production incidents.

## 22. Flashcards (20+ Q&A) 🟠
- **Q**: Port mặc định của Cicd Fundamentals là gì? -> **A**: ...
- **Q**: Lệnh xem log của Cicd Fundamentals? -> **A**: ...
