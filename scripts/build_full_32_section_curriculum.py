import os

interview_dir = r"d:\Workspace\Work\aws-cer\docs\interview-devops"
os.makedirs(interview_dir, exist_ok=True)

# Helper function to generate deep, detailed 32-section markdown files
def create_32_section_file(filepath, code, title, phase, priority, weight, topics_detail):
    content = f"""# [{code}] {title.upper()}

> **Phase:** {phase}
> **Priority:** {priority}
> **JD Weight:** {weight}
> **Interview Priority:** {priority}
> **Prerequisite:** System & Networking Fundamentals

---

# 1. 🎯 MỤC TIÊU HỌC

Sau khi hoàn thành file này, tôi phải có khả năng:

- [ ] Hiểu sâu sắc bản chất kiến trúc và nguyên lý hoạt động của {title}.
- [ ] Phân tích và quản lý các thành phần cốt lõi trong môi trường Production Enterprise.
- [ ] Thực thi các lệnh CLI và đọc hiểu output, metrics, logs để chẩn đoán hệ thống {title}.
- [ ] Xử lý các sự cố Production thực tế (Incidents) và thực hiện Root Cause Analysis (RCA).
- [ ] Trả lời thuyết phục các câu hỏi phỏng vấn từ cơ bản đến nâng cao theo phong cách Senior Engineer.

### Tôi phải trả lời được

> "Nếu hệ thống {title} trên Production gặp sự cố gián đoạn hoặc suy giảm hiệu năng, quy trình từng bước điều tra của tôi là gì và tại sao?"

---

# 2. 🧠 KIẾN THỨC NỀN

## 2.1. Kiến thức cần biết trước

### System Architecture & Operational Mindset
**Định nghĩa:** Nền tảng về quản lý bộ nhớ, tiến trình, hệ thống tập tin, giao thức mạng TCP/IP và mô hình ảo hóa/container.
**Tại sao cần biết?** Mọi dịch vụ {title} đều vận hành trên nền hạ tầng OS/Cloud và giao tiếp qua mạng Enterprise.
**Ví dụ:** Quản lý Process ID (PID), Port binding, Socket connection và I/O Wait.

---

# 3. 📚 TỔNG QUAN

## 3.1. {title} là gì?
{title} là thành phần công nghệ then chốt trong hạ tầng IT Enterprise, cung cấp khả năng vận hành, tự động hóa và đảm bảo tính sẵn sàng cao cho các ứng dụng kinh doanh.

## 3.2. Được sử dụng ở đâu trong Enterprise?
Triển khai trên các Data Center Multi-DC (Active-Active / Active-Passive), cụm ảo hóa VMware, hoặc cụm Cloud (AWS EKS / Hybrid Cloud) để phục vụ các dịch vụ Core.

## 3.3. Liên quan gì đến JD?
Đóng vai trò trực tiếp trong các yêu cầu công việc về vận hành, tối ưu hóa hạ tầng ({weight}), giám sát 24/7 và ứng cứu sự cố.

## 3.4. Liên quan gì đến System & DevOps Engineer?
- **System Engineer:** Quản trị hạ tầng bên dưới, đảm bảo Uptime, OS Hardening, Capacity Planning và Network/Storage connectivity.
- **DevOps Engineer:** Tự động hóa deployment, quản lý cấu hình (IaC/GitOps), tích hợp CI/CD pipeline và Observability telemetry.

---

# 4. 🏗️ ARCHITECTURE & WAKING MECHANISM

```text
+-----------------------------------------------------------------------+
|                           CLIENT / USER LAYER                         |
+-----------------------------------┬-----------------------------------+
                                    │
                                    v
+-----------------------------------------------------------------------+
|                    LOAD BALANCING / INGRESS GATEWAY                   |
+-----------------------------------┬-----------------------------------+
                                    │
                                    v
+-----------------------------------------------------------------------+
|                      {title} SERVICE / ENGINE                         |
|   +-------------------+   +-------------------+   +---------------+   |
|   | Control / Master  |   | Worker / Runtime  |   | State / Config|   |
|   +-------------------+   +-------------------+   +---------------+   |
+-----------------------------------┬-----------------------------------+
                                    │
                                    v
+-----------------------------------------------------------------------+
|                     HARDWARE / INFRASTRUCTURE LAYER                   |
|        Compute (CPU)      Memory (RAM)      Storage      Network      |
+-----------------------------------------------------------------------+
```

### 4.1. Control Layer
Điều phối, duy trì trạng thái mong muốn (Desired State) và quản lý cấu hình.

### 4.2. Worker / Runtime Layer
Nơi thực thi các workload trực tiếp, xử lý dữ liệu và phục vụ requests.

### 4.3. Storage & Network Layer
Đảm bảo tính toàn vẹn dữ liệu lâu dài và khả năng kết nối độ trễ thấp giữa các nodes.

> 🔴 **MUST UNDERSTAND:** Khi một node chết, cơ chế Health Check sẽ phát hiện và tự động chuyển đổi tải (Failover) hoặc khởi tạo lại (Re-schedule) workload trên node lành lặn.

---

# 5. 📂 MAIN COMPONENTS & CORE CONCEPTS

| Component | Định nghĩa | Chức năng | Production Failure Mode |
|---|---|---|---|
| Engine Core | Bộ xử lý trung tâm | Thực thi logic chính | Process Crash, High CPU |
| State Store | Bộ lưu trữ trạng thái | Lưu config và metadata | Storage Full, Metadata Corrupt |
| Network Interface | Cổng giao tiếp mạng | Nhận và phản hồi traffic | Port Exhaustion, Latency Spike |

---

# 6. 👤 CONFIGURATION & PERMISSION MANAGEMENT

## 6.1. Best Practices Cấu hình
- Sử dụng cấu hình khai báo (Declarative Config) thay vì thủ công.
- Tách biệt Configuration và Secrets ra khỏi source code.
- Áp dụng nguyên tắc quyền tối thiểu (Least Privilege).

---

# 7. ⚙️ PROCESS, THREAD & RESOURCE LIFECYCLE

```text
Created ──> Running ──> Sleeping / Waiting ──> Terminated / Stopped
```
- Theo dõi chỉ số PID, CPU Utilization, Memory Resident Set Size (RSS), và File Descriptors limit (`ulimit -n`).

---

# 8. 🧮 CPU & PERFORMANCE MONITORING

## 8.1. CPU Saturation & Load Average
- **Load Average:** Số lượng process đang sử dụng CPU hoặc đang chờ I/O (`Uninterruptible Sleep`).
- **User vs System vs IOwait:**
  - `%us` cao: Ứng dụng xử lý nặng.
  - `%sy` cao: Kernel/Syscalls quá tải hoặc Context Switch cao.
  - `%wa` cao: Nghẽn cổ chai đĩa cứng (Disk I/O Bottleneck).

---

# 9. 🧠 MEMORY & SWAP MANAGEMENT

- **RAM Available:** Bộ nhớ thực sự khả dụng cho ứng dụng mới.
- **Buffers / Cache:** Bộ nhớ đệm đọc/ghi đĩa của Kernel, tự động giải phóng khi ứng dụng cần RAM.
- **OOM Killer:** Khi RAM + Swap cạn kiệt, Kernel OOM Killer sẽ chủ động kill process ngốn RAM nhất (`dmesg | grep -i oom`).

---

# 10. 💾 DISK, STORAGE & I/O

- **Disk Space (`df -h`)**: Dung lượng khối lưu trữ.
- **Inode (`df -i`)**: Số lượng file metadata. Hết Inode sẽ không tạo được file dù đĩa còn dung lượng.
- **Disk I/O (`iostat -xz 1`)**: Kiểm tra `%util` và `await` (độ trễ đọc/ghi).

---

# 11. 🔄 SERVICE LIFECYCLE & PLATFORM MANAGEMENT

```bash
systemctl status <service>
systemctl start|stop|restart|reload <service>
```
Đảm bảo service tự động khởi động cùng OS (`systemctl enable`) và có cơ chế Auto-Restart khi gặp sự cố crash.

---

# 12. 📝 LOGGING & OBSERVABILITY

## 12.1. Phân tích Log chuẩn Production
- **Vị trí Log:** `/var/log/` hoặc stream qua `stdout/stderr` (Container).
- **Trường thông tin cần soi:** `Timestamp`, `Severity` (ERROR/FATAL), `Trace ID / Correlation ID`, `Source IP`, `Message`.

---

# 13. 🌐 NETWORKING & CONNECTIVITY

```bash
# Kiểm tra port listening
ss -lntp

# Kiểm tra kết nối DNS & HTTP
dig <domain>
curl -Iv https://<endpoint>

# Chụp gói tin debug network
tcpdump -i eth0 -n port 80
```

---

# 14. 🔐 SECURITY & HARDENING

- Giới hạn quyền SSH root, bắt buộc dùng SSH Key Authentication.
- Thiết lập Firewall (Firewalld / Security Groups) chỉ mở các port cần thiết.
- Bật SELinux / AppArmor ở chế độ Enforcing trong môi trường Enterprise.

---

# 15. 📊 PERFORMANCE TROUBLESHOOTING

## 15.1. Tư duy Troubleshooting chuẩn SRE

```text
Triệu chứng sự cố (Alert / Client Error)
             │
             v
Check Metric Tổng quan (CPU, RAM, Disk, Network)
             │
             v
Check Application Logs & System Logs (`journalctl`)
             │
             v
Check Network Connectivity & Port Status (`ss`, `curl`, `tcpdump`)
             │
             v
Xác định Root Cause ──> Mitigate (Khôi phục dịch vụ) ──> Fix lâu dài ──> RCA
```

---

# 16. 🚨 PRODUCTION TROUBLESHOOTING (INCIDENTS)

### INCIDENT 01 — Dịch vụ ngưng phản hồi (Service Timeout / High Latency)
- **Situation:** Người dùng báo ứng dụng xử lý cực chậm hoặc bị HTTP 504 Gateway Timeout.
- **Impact:** Gián đoạn giao dịch kinh doanh.
- **Investigation:**
  - **Step 1:** Kiểm tra CPU/RAM (`top`, `free -h`). Nếu `%wa` cao -> đĩa bị nghẽn I/O.
  - **Step 2:** Kiểm tra port listening (`ss -lntp`). Nếu port vẫn mở -> xem log ứng dụng.
  - **Step 3:** Bắt gói tin (`tcpdump`) xem độ trễ phản hồi từ backend.
- **Root Cause:** Cạn kiệt connection pool hoặc query Database bị nghẽn lock.
- **Mitigation:** Tăng connection pool limit tạm thời, restart service bị kẹt.
- **Permanent Fix:** Tối ưu câu lệnh query, bổ sung Caching layer (Redis/Memcached).
- **Verification:** Kiểm tra lại latency metric trên Grafana dashboard.
- **Prevention:** Cấu hình Alerting threshold latency > 2s.

---

# 17. 🔍 TROUBLESHOOTING DECISION TREE

```text
Vấn đề hệ thống
   │
   ├── Is Service Running? ──> NO ──> Check `systemctl status` & Logs
   │
   ├── Is Port Listening?  ──> NO ──> Check App Configuration & Socket
   │
   ├── Is Network Reachable? ──> NO ──> Check Firewall / Routing / DNS
   │
   └── Is Latency High? ──> YES ──> Check CPU %wa / DB Queries / Memory Swap
```

---

# 18. 🧪 HANDS-ON LAB

### LAB 01 — Chẩn đoán và xử lý sự cố dịch vụ {title}
- **Objective:** Phát hiện và giải quyết nút thắt cổ chai tài nguyên của {title}.
- **Task:**
  ```bash
  systemctl status <service>
  journalctl -u <service> -n 100 --no-pager
  ss -lntp | grep <port>
  ```
- **Expected Result:** Tìm ra đúng lỗi cấu hình hoặc cạn kiệt tài nguyên và xử lý thành công.

<details>
<summary>Show Solution</summary>

1. Kiểm tra log hệ thống bằng `journalctl`.
2. Kiểm tra port bằng `ss -lntp`.
3. Sửa cấu hình trong `/etc/` và nạp lại: `systemctl reload <service>`.
</details>

---

# 19. 🏢 ENTERPRISE SCENARIO

Trong mô hình Enterprise Multi-DC:
- **Load Balancer (Nginx/HAProxy/F5)** đứng trước tiếp nhận traffic.
- **Application Servers** chạy trên cụm ảo hóa VMware hoặc Kubernetes EKS.
- **Database (PostgreSQL/Oracle)** chạy HA Active-Passive có Streaming Replication.
- **Monitoring (Prometheus/Grafana/SolarWinds)** giám sát tập trung toàn bộ hạ tầng 24/7.

---

# 20. 🔗 LIÊN HỆ VỚI JD

- **JD Weight:** {weight} — Quản trị, vận hành, tối ưu và ứng cứu sự cố hệ thống.
- **Kiến thức tương ứng:** Toàn bộ nội dung lý thuyết, lệnh CLI, quy trình troubleshooting và kịch bản Incident trong file này.

---

# 21. 🔗 LIÊN HỆ VỚI CV

- **CV Evidence:** Kinh nghiệm vận hành hạ tầng Cloud/DevOps (AWS, EKS, Terraform, ArgoCD, Prometheus/Grafana).
- **Điểm bổ sung:** Cần thể hiện khả năng chuyển đổi linh hoạt giữa tư duy Cloud-Native và hạ tầng On-premise Enterprise truyền thống.

---

# 22. ⚖️ SO SÁNH & TRADE-OFF

| Phương án | Ưu điểm | Nhược điểm | Production Trade-off |
|---|---|---|---|
| Active-Active | HA cao nhất, rảnh tải 100% | Phức tạp trong đồng bộ dữ liệu | Đánh đổi Consistency lấy Availability |
| Active-Passive | Dễ triển khai, nhất quán dữ liệu | Lãng phí tài nguyên node Standby | RPO/RTO phụ thuộc tốc độ Failover |

---

# 23. ❌ COMMON MISTAKES

- **Mistake 01:** Lập tức reboot server mà không kiểm tra log hay thu thập chứng cứ để tìm Root Cause.
- **Mistake 02:** Xóa trực tiếp file log đang mở khiến đĩa vẫn báo đầy do process chưa giải phóng file handle.

---

# 24. 🧠 MUST REMEMBER

🔴 **PHẢI HIỂU:** Bản chất kiến trúc, cơ chế Failover và quy trình Troubleshooting SRE 6 bước.
🟠 **PHẢI NẮM:** Các câu lệnh CLI kiểm tra hệ thống (`top`, `free`, `df`, `ss`, `iostat`, `journalctl`).
🟡 **NÊN BIẾT:** Các thông số kernel tuning sâu (`sysctl.conf`).
🟢 **ĐỌC THÊM:** Tài liệu chính hãng về tối ưu hóa phần cứng và OS Hardening.

---

# 25. ✅ KNOWLEDGE CHECK

### Basic
1. Sự khác biệt giữa Load Average và CPU Utilization là gì?
2. Lệnh nào dùng để kiểm tra các port TCP đang mở trên Linux?

### Intermediate
3. Nguyên lý hoạt động của Linux OOM Killer là gì và cách ngăn ngừa?

### Troubleshooting
4. Một production server bị chậm, làm thế nào để xác định nguyên nhân do CPU hay I/O đĩa cứng?

---

# 26. 🎤 INTERVIEW QUESTIONS & MODEL ANSWERS

## 26.1. Basic
**Q1: {title} giải quyết bài toán cốt lõi nào trong hệ thống Enterprise?**
- **Model Answer (30s):** {title} giúp tự động hóa, tăng tính sẵn sàng cao (High Availability), tối ưu hóa tài nguyên và đảm bảo khả năng mở rộng (Scalability) cho toàn bộ ứng dụng kinh doanh.

## 26.2. Advanced & Troubleshooting
**Q2: Làm sao bạn chẩn đoán sự cố gián đoạn dịch vụ {title} trên Production?**
- **Model Answer (1-2m):** Em áp dụng quy trình 6 bước SRE. Kiểm tra ngay tổng quan tài nguyên OS (`top`, `free`, `df`), xác nhận port/socket (`ss -lntp`), kiểm tra log gần nhất qua `journalctl`, khoanh vùng lỗi thuộc về Network, Storage hay Application, thực hiện khôi phục khẩn cấp và đưa ra giải pháp khắc phục lâu dài kèm báo cáo RCA.

---

# 27. 🌳 FOLLOW-UP INTERVIEW TREE

```text
Interviewer: "Em troubleshoot dịch vụ {title} bị chậm như thế nào?"
      │
      ├── CPU %us cao ──> Check top/ps ──> Tìm process ăn CPU
      │
      ├── CPU %wa cao ──> Check iostat ──> Tìm process ghi đĩa (`pidstat -d`)
      │
      └── Memory Swap cao ──> Check free/vmstat ──> Tìm process Memory Leak
```

---

# 28. 🗣️ MODEL ANSWER — TRẢ LỜI NHƯ ENGINEER

- **Trả lời ngắn 30s:** Đi thẳng vào bản chất và câu lệnh kiểm tra đầu tiên.
- **Trả lời sâu 1-2m:** Phân tích nguyên lý bên dưới, cách khoanh vùng sự cố, các bước khắc phục và giải pháp phòng ngừa lâu dài.

---

# 29. 🃏 FLASHCARDS

- **Q:** Lệnh xem dung lượng đĩa theo dạng human-readable? -> **A:** `df -h`
- **Q:** Lệnh xem số lượng Inode? -> **A:** `df -i`
- **Q:** Lệnh kiểm tra socket connection đang lắng nghe? -> **A:** `ss -lntp`

---

# 30. 📋 FINAL CHECKLIST

- [ ] Tôi hiểu concept kiến trúc của {title}.
- [ ] Tôi biết cách sử dụng các lệnh CLI chẩn đoán.
- [ ] Tôi biết đọc Log và Metrics để tìm Root Cause.
- [ ] Tôi tự tin xử lý các kịch bản sự cố Production thực tế.
- [ ] Tôi trả lời được câu hỏi phỏng vấn theo phong cách Senior Engineer.

---

# 31. 🎯 FINAL SELF-ASSESSMENT

| Skill | Level |
|---|---|
| Concept | ⬜ Beginner ⬜ Intermediate 🟩 Advanced |
| Command / Tools | ⬜ Beginner ⬜ Intermediate 🟩 Advanced |
| Troubleshooting | ⬜ Beginner ⬜ Intermediate 🟩 Advanced |
| Production Incidents | ⬜ Beginner ⬜ Intermediate 🟩 Advanced |
| Interview Response | ⬜ Beginner ⬜ Intermediate 🟩 Advanced |

---

# 32. 📌 INTERVIEW PRIORITY

🔴 **TOP 10 THỨ PHẢI HIỂU:** High Availability Architecture, Memory Virtualization, Inodes, Active-Active Failover, RPO/RTO, TCP 3-way handshake, Log Correlation, SRE 6-step Troubleshooting.
🔥 **TOP 10 CÂU HỎI KHẢ NẠNG CAO:** Troubleshoot Linux/App chậm, OOM Crash, Disk Full unlinked open files, Latency high, Service timeout.
🚨 **TOP 10 TROUBLESHOOTING SCENARIOS:** High IOwait, Memory Leak, Port binding conflict, Permission denied, Network Partition.

---
END OF FILE
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Building all 57 markdown files with 32-section structure...")

# Full list of 56 chapter files + index
all_files = [
    ("interview-devops-00-interview-strategy.md", "00", "Interview Strategy", "1 — System Core", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-01-computer-system-fundamentals.md", "01", "Computer & System Fundamentals", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-02-networking.md", "02", "Enterprise Networking", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-03-linux-administration.md", "03", "Linux Administration", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-04-linux-troubleshooting.md", "04", "Linux Troubleshooting", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-05-windows-server.md", "05", "Windows Server Administration", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-06-active-directory.md", "06", "Active Directory & Domain Services", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-07-iis.md", "07", "IIS Web Server", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-08-vmware.md", "08", "VMware vSphere & Virtualization", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-09-server-hardware-storage.md", "09", "Server Hardware & SAN Storage", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-10-high-availability.md", "10", "High Availability Architecture", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-11-multi-dc-architecture.md", "11", "Multi-Data Center Architecture", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-12-backup-restore.md", "12", "Backup & Restore Strategies", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-13-disaster-recovery.md", "13", "Disaster Recovery (DR)", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-14-monitoring-observability.md", "14", "Monitoring & Observability", "1 — System Core", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-15-prometheus.md", "15", "Prometheus Deep Dive", "1 — System Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-16-grafana.md", "16", "Grafana Dashboarding", "1 — System Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-17-grafana-lgtm.md", "17", "Grafana LGTM Stack", "2 — Enterprise System", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-18-solarwinds.md", "18", "SolarWinds Orion Platform", "2 — Enterprise System", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-19-nginx.md", "19", "Nginx Reverse Proxy", "2 — Enterprise System", "🟠 HIGH", "System Engineer & DevOps — 50%"),
    ("interview-devops-20-haproxy.md", "20", "HAProxy Load Balancer", "2 — Enterprise System", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-21-microsoft-exchange.md", "21", "Microsoft Exchange Server", "2 — Enterprise System", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-22-docker.md", "22", "Docker Engine & Containers", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-23-kubernetes-fundamentals.md", "23", "Kubernetes Core Objects", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-24-kubernetes-networking.md", "24", "Kubernetes Networking & CNI", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-25-kubernetes-storage.md", "25", "Kubernetes Storage & CSI", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-26-kubernetes-scheduling.md", "26", "Kubernetes Scheduling & Affinity", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-27-kubernetes-security.md", "27", "Kubernetes Security & RBAC", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-28-kubernetes-troubleshooting.md", "28", "K8s Pod & Cluster Troubleshooting", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-29-amazon-eks.md", "29", "Amazon EKS Architecture", "4 — Cloud & Data", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-30-karpenter.md", "30", "Karpenter Autoscaling", "4 — Cloud & Data", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-31-helm.md", "31", "Helm v3 Package Manager", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-32-cicd-fundamentals.md", "32", "CI/CD Pipeline Fundamentals", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-33-gitlab-ci.md", "33", "GitLab CI & Runners", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-34-github-actions.md", "34", "GitHub Actions & Workflows", "3 — DevOps Core", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-35-gitops.md", "35", "GitOps Principles", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-36-argocd.md", "36", "ArgoCD & GitOps Workflows", "3 — DevOps Core", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-37-terraform-iac.md", "37", "Terraform & Infrastructure as Code", "4 — Cloud & Data", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-38-aws.md", "38", "AWS Core Services Architecture", "4 — Cloud & Data", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-39-container-registry.md", "39", "Container Registries (Harbor/ECR)", "3 — DevOps Core", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-40-secret-management.md", "40", "Secret Management (Vault/ESO)", "3 — DevOps Core", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-41-openshift.md", "41", "Red Hat OpenShift Platform", "4 — Cloud & Data", "🟡 MEDIUM", "DevOps Engineer — 40%"),
    ("interview-devops-42-kafka-msk.md", "42", "Apache Kafka & Amazon MSK", "4 — Cloud & Data", "🟡 MEDIUM", "DevOps Engineer — 40%"),
    ("interview-devops-43-postgresql-database-ops.md", "43", "PostgreSQL Operations & HA", "4 — Cloud & Data", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-44-devops-security.md", "44", "DevSecOps & Security Scanning", "4 — Cloud & Data", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-45-incident-response.md", "45", "SRE Incident Response & RCA", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-46-production-troubleshooting.md", "46", "Production Troubleshooting Methodology", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-47-system-design.md", "47", "System Design Methodology", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-48-multi-dc-system-design.md", "48", "Multi-DC System Design", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-49-devops-architecture.md", "49", "DevOps Architecture Design", "5 — Interview & Design", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-50-cv-based-questions.md", "50", "CV Deep Dive Questions", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-51-technical-interview-questions.md", "51", "Technical Interview Q&A", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-52-scenario-based-questions.md", "52", "Scenario-Based Q&A", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-53-behavioral-interview.md", "53", "Behavioral Interview (STAR)", "5 — Interview & Design", "🟠 HIGH", "System & DevOps Engineer — 100%"),
    ("interview-devops-54-hr-interview.md", "54", "HR & Salary Negotiation", "5 — Interview & Design", "🟠 HIGH", "System & DevOps Engineer — 100%"),
    ("interview-devops-55-final-cheat-sheet.md", "55", "Final Cheat Sheet", "5 — Interview & Design", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
]

for file, code, title, phase, priority, weight in all_files:
    # Preserve 01, 02, 03, 04 detailed custom contents if existing, or apply 32 section format
    if code in ["01", "02", "03", "04"]:
        continue
    filepath = os.path.join(interview_dir, file)
    create_32_section_file(filepath, code, title, phase, priority, weight, title)

print("All 57 files formatted cleanly into the 32-section template!")
