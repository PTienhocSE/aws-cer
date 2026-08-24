# 0. Interview Strategy

## 1. Why This Matters
Chiến lược phỏng vấn đóng vai trò quyết định trong việc thành công ứng tuyển vào vị trí System & DevOps Engineer tại Doanh nghiệp Enterprise quy mô lớn. Enterprise là doanh nghiệp doanh nghiệp lớn lớn nhất Việt Nam, mang đặc thù của một hệ thống Enterprise truyền thống đang trong quá trình chuyển đổi số. Hệ thống tại Enterprise yêu cầu tính khả dụng (High Availability - HA) cực kỳ cao vì hoạt động logistic/doanh nghiệp lớn diễn ra 24/7, mọi gián đoạn đều gây thiệt hại hàng tỷ đồng. 

Vị trí này đòi hỏi 60% System Engineer (vận hành hạ tầng On-premise, Windows/Linux, Multi-DC, VMware) và 40% DevOps (Kubernetes, CI/CD, GitOps). Việc thấu hiểu chiến lược sẽ giúp bạn "bán" được thế mạnh Cloud/DevOps hiện tại và khỏa lấp những khoảng trống về System Engineer truyền thống.

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **What candidate already knows (from CV):** Nền tảng rất mạnh về AWS (VPC, EC2, EKS, v.v.), Terraform, Kubernetes, GitOps (ArgoCD), CI/CD (GitHub Actions), Monitoring (Prometheus, Grafana). Bạn mang tư duy hiện đại của Cloud Native.
- **What interviewer will likely ask:** Làm sao bạn áp dụng kinh nghiệm AWS vào hệ thống On-premise? Bạn xử lý thế nào với Windows Server, Active Directory, VMware khi chưa có nhiều kinh nghiệm? Cách bạn monitor phần cứng vật lý ra sao?
- **Skill gap to address:** Cần chuyển đổi khái niệm từ Cloud sang On-premise (VD: AWS VPC -> VLAN/Switches, AWS EC2 -> VMware, AWS ALB -> HAProxy/F5). Bạn cần thể hiện khả năng học hỏi nhanh các hệ thống truyền thống như Windows, AD, Storage vật lý.

## 4. Prerequisites
- Hiểu rõ CV của bản thân.
- Tìm hiểu cơ bản về mô hình hoạt động của hệ thống doanh nghiệp lớn (TOS - Core Enterprise System).
- Tâm lý vững vàng để đối mặt với hội đồng phỏng vấn (thường từ 3-5 người trong môi trường Enterprise).

## 5. Core Concepts

### 5.1 Phân tích JD & Định vị bản thân

#### Definition
Định vị bản thân là việc biến profile DevOps/Cloud của bạn thành "mảnh ghép hoàn hảo" mà Enterprise đang cần cho quá trình chuyển đổi số, thay vì bị nhìn nhận là "thiếu kinh nghiệm System On-premise".

#### Why It Exists
Doanh nghiệp truyền thống cần người vận hành hệ thống cũ (60% System), nhưng cũng cực kỳ khát nhân sự modernize hệ thống (40% DevOps).

#### How It Works
Sử dụng chiến thuật "Mapping":
- **Cloud to On-Prem:** AWS EBS/EFS -> SAN/NAS Storage. AWS IAM -> Active Directory/LDAP. AWS RDS -> On-prem PostgreSQL/Oracle.
- **DevOps to System:** Thay vì cấu hình tay Windows/Linux, bạn đề xuất dùng Ansible/Terraform (Infrastructure as Code). 

#### Real-world Example
Enterprise có hệ thống Core Enterprise System đang chạy trên On-premise cần HA cao giữa 2 Data Center. Bạn có thể đề xuất dùng kiến thức Kubernetes và Load Balancer để thiết kế lại mô hình triển khai thay vì chạy trên các VM rời rạc.

#### Production Example
Khi được hỏi về việc quản lý 100 con Windows Server, bạn không nói về việc RDP vào từng con, mà nói về việc thiết lập Active Directory Group Policy, hoặc dùng Ansible WinRM để automation.

#### Interview Answer Template
"Mặc dù kinh nghiệm của em tập trung nhiều ở AWS và Kubernetes, nhưng bản chất kiến trúc hạ tầng là giống nhau. Ở AWS em quản lý VPC thì dưới On-premise là mạng VLAN/Switch. Điểm mạnh của em là có thể mang tư duy tự động hóa (Automation/IaC) và GitOps vào quản trị hệ thống System truyền thống, giúp giảm thiểu human error trong vận hành."

### 5.2 Xử lý Skill Gaps (Windows, VMware, AD, Storage)

#### Definition
Phương pháp trả lời các câu hỏi về công nghệ bạn chưa từng làm hoặc mới chỉ biết lý thuyết.

#### Why It Exists
Không ai đáp ứng 100% JD, đặc biệt là JD mix giữa System và DevOps.

#### How It Works
Áp dụng công thức: Thừa nhận thiếu sót + Nêu kiến thức lý thuyết tương đương + Đưa ra phương án học hỏi + Dẫn chứng khả năng học công nghệ trong quá khứ.

#### Interview Answer Template
"Thực tế em chưa quản trị hệ thống VMware vSphere/vCenter trên production. Tuy nhiên, em hiểu nguyên lý cấp phát tài nguyên Hypervisor và HA/DR của nó tương tự như cách em thiết kế Auto Scaling và Multi-AZ trên AWS. Ở dự án trước, em từng phải tự học và triển khai Kafka/MSK từ con số 0 trong vòng 1 tuần, nên em hoàn toàn tự tin có thể master VMware trong tháng đầu tiên on-board."

### 5.3 Kỹ thuật trả lời bằng STAR Method

#### Definition
S - Situation (Tình huống), T - Task (Nhiệm vụ), A - Action (Hành động), R - Result (Kết quả).

#### How It Works
Khi được hỏi về kinh nghiệm, luôn bắt đầu bằng ngữ cảnh dự án, vấn đề gặp phải, chi tiết các bước kỹ thuật bạn đã làm (dùng công cụ gì, lệnh gì) và kết quả có thể đo lường (giảm % downtime, tăng tốc độ deploy).

## 6. Architecture
Không áp dụng trực tiếp Architecture kỹ thuật ở phần này, nhưng đây là "Kiến trúc" của một buổi phỏng vấn thành công:
```
[Giới thiệu bản thân: Nhấn mạnh kinh nghiệm DevOps/K8s]
      |
      v
[Mapping kinh nghiệm: AWS -> On-premise, Cloud Native -> Enterprise]
      |
      v
[Xử lý câu hỏi kỹ thuật: Dùng STAR Method, tập trung vào Troubleshooting]
      |
      v
[Chốt lại: Đặt câu hỏi ngược lại cho NTD về định hướng chuyển đổi số của cty]
```

## 7. Hands-on Commands / Configuration
- Trong quá trình phỏng vấn, nếu có bảng trắng hoặc share screen, hãy vẽ kiến trúc hệ thống (Ví dụ vẽ mô hình Multi-DC có Load Balancer).
- Thay vì nói chung chung, hãy đề cập đến các metrics cụ thể: "Em thường dùng PromQL để query CPU Load thay vì chỉ dùng top command".

## 8. Common Interview Questions

### Q1: Tại sao bạn ứng tuyển vào Enterprise trong khi profile của bạn mạnh về Cloud/AWS?
**Model Answer:** 
"Em nhận thấy xu hướng Hybrid Cloud và App Modernization đang rất mạnh mẽ ở các doanh nghiệp lớn như Enterprise. Với background 60% System và 40% DevOps của vị trí này, đây là cơ hội tuyệt vời để em áp dụng quy trình CI/CD, GitOps, Kubernetes từ kinh nghiệm AWS của em để hiện đại hóa hạ tầng On-premise của công ty. Đồng thời em cũng mong muốn được học hỏi sâu hơn về vận hành Data Center vật lý, Storage và Hardware để trở thành một kỹ sư toàn diện."

### Q2: Bạn chưa có nhiều kinh nghiệm quản trị Storage/Hardware (Dell/HP), bạn sẽ làm thế nào?
**Model Answer:**
"Storage vật lý (như SAN/NAS) ở mức khái niệm cũng chia sẻ chung kiến trúc với Cloud Storage (Block Storage - EBS, File Storage - EFS, Object - S3). Em hiểu về IOPS, Throughput, RAID. Về cách cấu hình cụ thể của Dell hay HP, em có kỹ năng đọc document và phân tích log tốt. Em sẽ làm việc chặt chẽ với vendor support hoặc các anh senior trong team để nắm bắt quy trình vận hành nhanh nhất."

### Q3: Mức lương mong muốn của bạn là bao nhiêu? (Salary Negotiation)
**Model Answer:**
"Dựa trên yêu cầu công việc đòi hỏi kết hợp cả System Operation cường độ cao (đảm bảo uptime 24/7 cho cảng) và DevOps Modernization, cùng với kinh nghiệm đã triển khai K8s và GitOps trên AWS, mức lương mong muốn của em nằm trong khoảng [Điền khoảng, vd: 25-30 triệu VNĐ]. Tuy nhiên em quan tâm nhiều hơn đến cơ hội được build hệ thống Multi-DC lớn và team culture ở Enterprise."

## 9. Scenario-Based Questions

### Scenario 1: Đánh giá tư duy System vs DevOps
**Situation:** Hệ thống của Enterprise cần deploy một phiên bản TOS mới. Team Dev đưa cho bạn file war/jar và bảo deploy lên Windows Server / Tomcat.
**How to approach:** Đừng trả lời bằng cách RDP vào server và copy file.
**Model Answer:** 
"Mặc dù có thể làm manual, nhưng với tư duy DevOps, em sẽ đề xuất đưa ứng dụng này vào quy trình CI/CD. Nếu chưa thể Dockerize ngay, em sẽ viết GitLab CI pipeline kết hợp Ansible để tự động đẩy file lên server, restart service và check health. Về lâu dài, em sẽ đề xuất đóng gói thành Docker image và chạy trên Kubernetes (OpenShift/EKS) để tận dụng khả năng Auto-healing và Zero-downtime deployment (Rolling update)."

### Scenario 2: Xử lý gián đoạn dịch vụ
**Situation:** Nửa đêm, hệ thống hạ tầng lõi Enterprise không thể kết nối đến Database. Bạn là on-call engineer.
**How to approach:** Quy trình Incident Response.
**Model Answer:**
1. Acknowledge the alert (từ SolarWinds/Grafana).
2. Triage: Xác định phạm vi ảnh hưởng (Network, App, DB, OS). Dùng ping, telnet, kiểm tra DB process.
3. Mitigation: Nếu là do chết node vật lý, kích hoạt failover sang node standby (HA). 
4. Root Cause Analysis: Sau khi hệ thống up, phân tích log để tìm nguyên nhân gốc.
5. Post-mortem: Đưa ra action item (VD: thêm alert cho memory utilization) để tránh lặp lại.

## 10. Troubleshooting Exercises
*(Phần này tập trung vào tư duy troubleshooting chung)*

### Problem 1: Troubleshooting Methodology
**Symptoms:** Ứng dụng web truy cập rất chậm.
**Root Cause:** Tư duy phân lớp OSI.
**Solution:**
- Lớp 1-3: Ping/Traceroute kiểm tra mạng có drop packet không.
- Lớp 4: Telnet kiểm tra port có mở / có firewall block hoặc connection tracking bị full không.
- OS/System: Dùng `htop`, `iostat` kiểm tra CPU/RAM/Disk IO.
- App/DB: Xem log ứng dụng, xem slow query log của DB.
**Prevention:** Thiết lập Prometheus/Grafana dashboard với RED metrics (Rate, Errors, Duration) và USE metrics (Utilization, Saturation, Errors).

## 11. Key Takeaways
- Hãy tự tin vào bộ kỹ năng Cloud Native của mình, đó là lợi thế cạnh tranh.
- Luôn "map" kiến thức Cloud xuống On-premise để chứng minh bạn hiểu bản chất vấn đề.
- Áp dụng triệt để STAR method khi kể về các dự án đã làm (nhất là dự án E-Commerce 23 microservices).
- Luôn thể hiện tinh thần Automation (tự động hóa) trong mọi câu trả lời về System Administration.

## 12. Quick Reference
| Vấn đề | On-premise / System | Cloud / DevOps Tương đương |
|---|---|---|
| Networking | VLAN, Switch, Router Cisco | VPC, Subnets, Route Tables, Transit Gateway |
| Compute | VMware vSphere, KVM, Bare-metal | EC2, Auto Scaling Groups, EKS |
| Storage | SAN, NAS, RAID, Dell/EMC | EBS, EFS, S3 |
| Cấu hình | Cài tay, Group Policy, Shell script | Terraform, Ansible, GitOps (ArgoCD) |
| Giám sát | SolarWinds, Zabbix, PRTG | Prometheus, Grafana, CloudWatch |
| Load Balancing | F5, HAProxy, Nginx | ALB, NLB |
| Identity | Active Directory, LDAP | AWS IAM, OIDC |
