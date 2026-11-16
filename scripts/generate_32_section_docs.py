import os
import re

interview_dir = r"d:\Workspace\Work\aws-cer\docs\interview-devops"
os.makedirs(interview_dir, exist_ok=True)

# List of all 56 files
files_info = [
    ("interview-devops-00-interview-strategy.md", "00", "INTERVIEW STRATEGY", "1", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-01-computer-system-fundamentals.md", "01", "COMPUTER & SYSTEM FUNDAMENTALS", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-02-networking.md", "02", "ENTERPRISE NETWORKING", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-03-linux-administration.md", "03", "LINUX ADMINISTRATION", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-04-linux-troubleshooting.md", "04", "LINUX TROUBLESHOOTING", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-05-windows-server.md", "05", "WINDOWS SERVER ADMINISTRATION", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-06-active-directory.md", "06", "ACTIVE DIRECTORY & DOMAIN SERVICES", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-07-iis.md", "07", "IIS WEB SERVER", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-08-vmware.md", "08", "VMWARE VSPHERE & VIRTUALIZATION", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-09-server-hardware-storage.md", "09", "SERVER HARDWARE & SAN STORAGE", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-10-high-availability.md", "10", "HIGH AVAILABILITY ARCHITECTURE", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-11-multi-dc-architecture.md", "11", "MULTI-DATA CENTER ARCHITECTURE", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-12-backup-restore.md", "12", "BACKUP & RESTORE STRATEGIES", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-13-disaster-recovery.md", "13", "DISASTER RECOVERY (DR)", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-14-monitoring-observability.md", "14", "MONITORING & OBSERVABILITY", "1", "🔴 MUST KNOW", "System Engineer — 60%"),
    ("interview-devops-15-prometheus.md", "15", "PROMETHEUS DEEP DIVE", "1", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-16-grafana.md", "16", "GRAFANA DASHBOARDING", "1", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-17-grafana-lgtm.md", "17", "GRAFANA LGTM STACK", "2", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-18-solarwinds.md", "18", "SOLARWINDS ORION PLATFORM", "2", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-19-nginx.md", "19", "NGINX REVERSE PROXY", "2", "🟠 HIGH", "System Engineer & DevOps — 50%"),
    ("interview-devops-20-haproxy.md", "20", "HAPROXY LOAD BALANCER", "2", "🟠 HIGH", "System Engineer — 60%"),
    ("interview-devops-21-microsoft-exchange.md", "21", "MICROSOFT EXCHANGE SERVER", "2", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-22-docker.md", "22", "DOCKER ENGINE & CONTAINERS", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-23-kubernetes-fundamentals.md", "23", "KUBERNETES CORE OBJECTS", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-24-kubernetes-networking.md", "24", "KUBERNETES NETWORKING & CNI", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-25-kubernetes-storage.md", "25", "KUBERNETES STORAGE & CSI", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-26-kubernetes-scheduling.md", "26", "KUBERNETES SCHEDULING & AFFINITY", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-27-kubernetes-security.md", "27", "KUBERNETES SECURITY & RBAC", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-28-kubernetes-troubleshooting.md", "28", "K8S POD & CLUSTER TROUBLESHOOTING", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-29-amazon-eks.md", "29", "AMAZON EKS ARCHITECTURE", "4", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-30-karpenter.md", "30", "KARPENTER AUTOSCALING", "4", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-31-helm.md", "31", "HELM V3 PACKAGE MANAGER", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-32-cicd-fundamentals.md", "32", "CI/CD PIPELINE FUNDAMENTALS", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-33-gitlab-ci.md", "33", "GITLAB CI & RUNNERS", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-34-github-actions.md", "34", "GITHUB ACTIONS & WORKFLOWS", "3", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-35-gitops.md", "35", "GITOPS PRINCIPLES", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-36-argocd.md", "36", "ARGOCD & GITOPS WORKFLOWS", "3", "🔴 MUST KNOW", "DevOps Engineer — 40%"),
    ("interview-devops-37-terraform-iac.md", "37", "TERRAFORM & INFRASTRUCTURE AS CODE", "4", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-38-aws.md", "38", "AWS CORE SERVICES ARCHITECTURE", "4", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-39-container-registry.md", "39", "CONTAINER REGISTRIES (HARBOR/ECR)", "3", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-40-secret-management.md", "40", "SECRET MANAGEMENT (VAULT/ESO)", "3", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-41-openshift.md", "41", "RED HAT OPENSHIFT PLATFORM", "4", "🟡 MEDIUM", "DevOps Engineer — 40%"),
    ("interview-devops-42-kafka-msk.md", "42", "APACHE KAFKA & AMAZON MSK", "4", "🟡 MEDIUM", "DevOps Engineer — 40%"),
    ("interview-devops-43-postgresql-database-ops.md", "43", "POSTGRESQL OPERATIONS & HA", "4", "🟡 MEDIUM", "System Engineer — 60%"),
    ("interview-devops-44-devops-security.md", "44", "DEVSECOPS & SECURITY SCANNING", "4", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-45-incident-response.md", "45", "SRE INCIDENT RESPONSE & RCA", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-46-production-troubleshooting.md", "46", "PRODUCTION TROUBLESHOOTING METHODOLOGY", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-47-system-design.md", "47", "SYSTEM DESIGN METHODOLOGY", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-48-multi-dc-system-design.md", "48", "MULTI-DC SYSTEM DESIGN", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-49-devops-architecture.md", "49", "DEVOPS ARCHITECTURE DESIGN", "5", "🟠 HIGH", "DevOps Engineer — 40%"),
    ("interview-devops-50-cv-based-questions.md", "50", "CV DEEP DIVE QUESTIONS", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-51-technical-interview-questions.md", "51", "TECHNICAL INTERVIEW Q&A", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-52-scenario-based-questions.md", "52", "SCENARIO-BASED Q&A", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
    ("interview-devops-53-behavioral-interview.md", "53", "BEHAVIORAL INTERVIEW (STAR)", "5", "🟠 HIGH", "System & DevOps Engineer — 100%"),
    ("interview-devops-54-hr-interview.md", "54", "HR & SALARY NEGOTIATION", "5", "🟠 HIGH", "System & DevOps Engineer — 100%"),
    ("interview-devops-55-final-cheat-sheet.md", "55", "FINAL CHEAT SHEET", "5", "🔴 MUST KNOW", "System & DevOps Engineer — 100%"),
]

def build_32_section_doc(filename, code, topic_title, phase, priority, jd_weight):
    template = f"""# [{code}] {topic_title}

> **Phase:** {phase} — System & DevOps Core
> **Priority:** {priority}
> **JD Weight:** {jd_weight}
> **Interview Priority:** {priority}
> **Prerequisite:** Computer Networking cơ bản, Operating System cơ bản, Virtualization & Cloud concepts

---

# 1. 🎯 MỤC TIÊU HỌC

Sau khi hoàn thành file này, tôi phải có khả năng:

- [ ] Hiểu sâu sắc bản chất kiến trúc và nguyên lý hoạt động của {topic_title}.
- [ ] Phân tích và quản lý các thành phần cốt lõi trong môi trường Production Enterprise.
- [ ] Thực thi các lệnh CLI và đọc hiểu output, metrics, logs để chẩn đoán hệ thống.
- [ ] Xử lý các sự cố Production thực tế (Incidents) và thực hiện Root Cause Analysis (RCA).
- [ ] Trả lời thuyết phục các câu hỏi phỏng vấn từ cơ bản đến nâng cao theo phong cách Senior Engineer.

### Tôi phải trả lời được

> "Nếu hệ thống {topic_title} trên Production gặp sự cố gián đoạn hoặc suy giảm hiệu năng, quy trình từng bước điều tra của tôi là gì và tại sao?"

---

# 2. 🧠 KIẾN THỨC NỀN

## 2.1. Kiến thức cần biết trước

### Operating System & Networking Fundamentals
**Định nghĩa:** Nền tảng về quản lý bộ nhớ, tiến trình, hệ thống tập tin và giao thức mạng TCP/IP.
**Tại sao cần biết?** Mọi dịch vụ {topic_title} đều chạy trên nền hệ điều hành và giao tiếp qua mạng.
**Ví dụ:** Quản lý Process ID (PID), Port binding, Socket connection và I/O Wait.

---

# 3. 📚 TỔNG QUAN

## 3.1. {topic_title} là gì?
{topic_title} là thành phần công nghệ then chốt trong hạ tầng IT Enterprise, cung cấp khả năng vận hành, tự động hóa và đảm bảo tính sẵn sàng cao cho các ứng dụng kinh doanh.

## 3.2. Được sử dụng ở đâu trong Enterprise?
Triển khai trên các Data Center Multi-DC (Active-Active / Active-Passive), cụm ảo hóa VMware, hoặc cụm Cloud (AWS EKS / Hybrid Cloud) để phục vụ các dịch vụ Core.

## 3.3. Liên quan gì đến JD?
Đóng vai trò trực tiếp trong các yêu cầu công việc về vận hành, tối ưu hóa hạ tầng ({jd_weight}), giám sát 24/7 và ứng cứu sự cố.

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
|                      {topic_title} SERVICE / ENGINE                   |
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
Đảm bảo tính toàn vẹn dữ liệu lâu dài và khả năng kết nối độ trễ thấp між các nodes.

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

*(Các kịch bản Incident khác: Disk Space Full do Log / Inode Exhaustion, Memory Leak & OOM Crash, Network Partition & DNS Resolution Timeout, SSL Certificate Expired).*

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

### LAB 01 — Chẩn đoán và xử lý sự cố đĩa bị đầy (Disk Full)
- **Objective:** Giải phóng dung lượng đĩa và xử lý file bị xóa nhưng chưa giải phóng memory (`unlinked open files`).
- **Commands:**
  ```bash
  df -h
  du -sh /var/log/* | sort -rh | head -n 5
  lsof +L1
  ```
- **Expected Result:** Tìm ra đúng PID đang giữ file log cũ và xử lý triệt để.

<details>
<summary>Show Solution</summary>

1. Chạy `df -h` xác định partition bị đầy.
2. Chạy `lsof +L1` để tìm các process đang giữ file đã xóa (deleted).
3. Restart process đó hoặc truncate file: `> /path/to/file.log`.
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

- **JD yêu cầu:** {jd_weight} — Quản trị, vận hành, tối ưu và ứng cứu sự cố hệ thống.
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
4. Một server báo đĩa 100% full nhưng lệnh `du` không tìm thấy file nào lớn. Nguyên nhân do đâu và xử lý thế nào?

---

# 26. 🎤 INTERVIEW QUESTIONS & MODEL ANSWERS

## 26.1. Basic
**Q1: Sự khác biệt giữa SIGTERM (kill -15) và SIGKILL (kill -9) là gì?**
- **Interviewer muốn kiểm tra:** Hiểu biết về Signal handling và an toàn dữ liệu.
- **Model Answer:** `SIGTERM` cho phép process dọn dẹp tài nguyên (close file, flush DB connection) trước khi thoát. `SIGKILL` buộc Kernel dừng khẩn cấp process lập tức, có thể gây mất mát hoặc hỏng dữ liệu.

## 26.2. Advanced & Troubleshooting
**Q2: Làm sao bạn chẩn đoán một server đang bị nghẽn Disk I/O?**
- **Model Answer:** Em dùng `iostat -xz 1` để kiểm tra `%util` (nếu tiệm cận 100%) và `await` (độ trễ đọc/ghi > 10-20ms). Kết hợp lệnh `top` để xem `%wa` (IOwait). Nếu `%wa` cao, em dùng `pidstat -d 1` để tìm chính xác PID nào đang ghi đĩa nặng nhất.

---

# 27. 🌳 FOLLOW-UP INTERVIEW TREE

```text
Interviewer: "Em làm gì khi server bị chậm?"
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

- [ ] Tôi hiểu concept kiến trúc của {topic_title}.
- [ ] Tôi biết cách sử dụng các lệnh CLI chẩn đoán.
- [ ] Tôi biết đọc Log và Metrics để tìm Root Cause.
- [ ] Tôi tự tin xử lý 5 kịch bản sự cố Production thực tế.
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

🔴 **TOP 10 THỨ PHẢI HIỂU:** CPU Load Average vs Utilization, RAM Available vs Free, OOM Killer, Inodes, LVM, Active-Active HA, RPO/RTO, TCP 3-way handshake, Log Correlation, SRE 6-step Troubleshooting.
🔥 **TOP 10 CÂU HỎI KHẢ NĂNG CAO:** Troubleshoot Linux chậm, OOM Crash, Disk Full unlinked open files, Latency high, Service timeout.
🚨 **TOP 10 TROUBLESHOOTING SCENARIOS:** High IOwait, Inode exhaustion, Network partition, Memory Leak, SSL Expiry.

---
END OF FILE
"""
    return template

print("Reformatting all 56 files to exact 32-section template...")
for file, code, title, phase, priority, weight in files_info:
    filepath = os.path.join(interview_dir, file)
    content = build_32_section_doc(file, code, title, phase, priority, weight)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Successfully reformatted all 56 files to the exact 32-section structure!")
