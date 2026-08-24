# 10. High Availability (HA)

## 1. Why This Matters
Hệ thống quản lý hệ thống Enterprise (TOS) tại Enterprise vận hành luồng hàng hóa trị giá tỷ đô liên tục 24/7. Nếu phần mềm dừng 1 phút, hàng chục lượng lớn request sẽ bị kẹt ở cổng cảng, tàu biển chậm xuất bến, gây thiệt hại khổng lồ và "phá vỡ" chuỗi cung ứng logistics. HA (High Availability) là triết lý thiết kế và vận hành sống còn (Must Know) đối với System/DevOps Engineer để loại bỏ điểm mù (Single Point of Failure - SPOF) ở mọi tầng: Network, Server, Storage, DB, Application.

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **What candidate already knows:** Bạn đã làm AWS, nên quen thuộc với việc triển khai ALB/NLB để cân bằng tải, cấu hình RDS Multi-AZ cho Database, EKS Multi-AZ cho Kubernetes cluster.
- **What interviewer will likely ask:** AWS che giấu sự phức tạp của HA. Bạn sẽ bị hỏi cách tự triển khai HA on-premise (VD: Keepalived + HAProxy, cấu hình Nginx làm Load Balancer, PostgreSQL Streaming Replication) thay vì chỉ click chọn Multi-AZ.
- **Skill gap to address:** Áp dụng nguyên lý HA từ Cloud xuống hạ tầng vật lý (Physical/VM). Hiểu khái niệm Split-brain, Quorum, Active-Active, Active-Passive.

## 4. Prerequisites
- Kiến thức về mạng cơ bản (IP, Load Balancer).
- Kiến thức về Database (PostgreSQL/MySQL cơ bản).
- Hiểu kiến trúc Web 3-tiers.

## 5. Core Concepts

### 5.1 SLA, SLO và The "Nines"
- **SLA (Service Level Agreement):** Cam kết dịch vụ với khách hàng. (VD: Cam kết Uptime 99.9%).
- **Five Nines (99.999%):** Tiêu chuẩn vàng của HA. Nghĩa là hệ thống chỉ được phép downtime khoảng 5.26 phút/năm.

### 5.2 SPOF (Single Point of Failure)
#### Definition
Một thành phần trong hệ thống mà nếu nó hỏng, toàn bộ hệ thống ngừng hoạt động. HA là quá trình đi tìm và loại bỏ các SPOF.

#### How to eliminate
Nguyên tắc: "Dự phòng" (Redundancy). Mọi thứ phải có ít nhất 2 (N+1 hoặc 2N).
- Mạng: 2 card mạng (NIC Teaming), 2 Switch (Stacking/VPC).
- Lưu trữ: RAID, SAN MPIO.
- Server: Cluster nhiều Nodes (VMware HA, Kubernetes worker nodes).
- Cân bằng tải: 2 con Load Balancer chạy VRRP (Keepalived).
- Database: Master-Slave Replication.

### 5.3 Active-Active vs Active-Passive
#### Definition
- **Active-Active:** Nhiều nodes cùng chạy và cùng phục vụ traffic (VD: Các Web Servers sau Load Balancer, EKS Pods). Cân bằng tải tốt, hiệu năng cao.
- **Active-Passive (hoặc Active-Standby):** Một node chính chạy phục vụ traffic. Node phụ ở trạng thái chờ (Standby) nhận data đồng bộ. Khi node chính chết, node phụ được promote lên làm chính (VD: Database Failover, Keepalived Virtual IP).

#### Real-world Example
Hệ thống PostgreSQL cho dịch vụ E-Port. Khó cấu hình Active-Active Write (Multi-master). Do đó thiết kế chuẩn là PostgreSQL Active-Passive: 1 Master nhận Read/Write, 1 Replica liên tục nhận WAL (Write-Ahead Logs). Khi Master chết, Patroni (hoặc repmgr) tự động promote Replica thành Master và trỏ Virtual IP sang.

### 5.4 Split-Brain & Quorum
#### Definition
**Split-Brain:** Hội chứng phân liệt não. Xảy ra trong cụm Active-Passive khi kết nối mạng giữa 2 nodes bị đứt nhưng cả 2 node đều còn sống. Khi đó, mỗi node đều nghĩ node kia đã chết và tự nhận mình là Master -> Dẫn đến xung đột dữ liệu (data corruption).
**Quorum:** Cơ chế bỏ phiếu để chống Split-brain. Cụm thường cần số node lẻ (3, 5). Để một node tự phong làm Master, nó phải nhận được đa số phiếu (VD: >= 2 phiếu trong cụm 3 node).

### 5.5 Load Balancing cho HA (HAProxy, Nginx)
Để ứng dụng có HA, traffic không bao giờ chọc thẳng IP của 1 server. Thay vào đó, IP được trỏ về Load Balancer. Load Balancer phân phát request xuống N server ở dưới và thực hiện Health Check. Nếu 1 server chết, Load Balancer loại nó ra khỏi pool.

## 6. Architecture (On-Premise Full HA Stack)
```
[ User ]
   | (Internet / WAN)
   V
+--[ Floating IP / Virtual IP (VIP) ]----------------+
|          (Managed by Keepalived / VRRP)            |
|                                                    |
|  [ Nginx/HAProxy (Active) ]   [ Nginx (Passive) ]  |
+---------|--------------------------|---------------+
          | (Load Balancing)         |
          V                          V
  [ Web App VM 1 ]  [ Web App VM 2 ]  [ Web App VM 3 ]
          |                          |
          V                          V
+--[ Database Cluster (Patroni / Pacemaker) ]--------+
|                                                    |
|  [ DB Master ] ===(Replication)==> [ DB Replica ]  |
+----------------------------------------------------+
```

## 7. Hands-on / Configuration
- **Keepalived (Linux):** Dùng để chia sẻ 1 IP ảo (VIP) giữa 2 VM.
  - Cấu hình file `/etc/keepalived/keepalived.conf`.
  - Node 1 set priority 100, Node 2 set priority 90. IP sẽ nằm ở Node 1. Khi Node 1 chết, Keepalived gửi gói tin báo hiệu, IP tự chuyển sang Node 2.
- **Kubernetes HA:** Đã chạy K8s thì mặc định ứng dụng có HA. Dùng Deployment (Replicas > 1), Pod Anti-Affinity (ép 2 pod không nằm chung 1 Worker Node), và thiết lập Readiness/Liveness Probes.

## 8. Common Interview Questions

### Q1: Bạn hiểu thế nào về SPOF và làm sao để phát hiện nó?
**Model Answer:** SPOF (Single Point of Failure) là điểm chết người trong hệ thống. Để phát hiện, em thường vẽ Data Flow hoặc Architecture Diagram và đặt câu hỏi "What if": Điều gì xảy ra nếu con Switch này sập? Nếu cái Cáp mạng đứt? Nếu 1 ổ cứng hỏng? Nếu VM bị reboot? Nếu câu trả lời là "Hệ thống ngừng hoạt động", thì đó là SPOF. Giải pháp là thiết kế Redundancy (dự phòng) ở mọi tầng từ Network, Storage đến DB và App.

### Q2: (Từ CV) Trong AWS bạn dùng ALB, vậy ở on-premise làm sao để Load Balancer không bị SPOF?
**Model Answer:** ALB trên AWS là dịch vụ managed, AWS tự scale ngầm nhiều nodes. Ở on-prem, nếu dựng 1 máy ảo cài Nginx/HAProxy làm Load Balancer, nó sẽ trở thành SPOF. Để giải quyết, em phải dựng 2 máy Nginx (1 Active, 1 Passive). Sử dụng Keepalived chạy giao thức VRRP để cấu hình một Virtual IP (VIP). Domain Name sẽ trỏ về VIP này. Bình thường VIP gắn vào Nginx 1, khi Nginx 1 sập, VIP tự động nhảy sang Nginx 2 gần như tức thì, đảm bảo HA cho lớp Load Balancing.

### Q3: Hiện tượng Split-brain là gì và cách phòng tránh?
**Model Answer:** Split-brain xảy ra trong cụm HA (đặc biệt là DB Cluster) khi mạng kết nối giữa các node bị lỗi, các node không thấy nhau nhưng vẫn chạy. Node nào cũng tưởng node kia chết nên tự lên làm Master, gây ghi đè/xung đột dữ liệu.
Cách phòng tránh:
- Sử dụng số node lẻ (3 node trở lên) và cơ chế Quorum (bỏ phiếu) như ZooKeeper, etcd.
- STONITH (Shoot The Other Node In The Head): Một cơ chế (như tự động gọi API vCenter hoặc iDRAC) để "bắn chết" (khởi động lại/ngắt nguồn điện) node kia một cách chắc chắn trước khi tự lên làm Master.

### Q4: Trình bày cách bạn thiết kế HA cho một ứng dụng Stateful (như PostgreSQL) và Stateless (như Web Frontend)?
**Model Answer:**
- Stateless Web: Em cài đặt dưới dạng Active-Active. Đặt các Web server sau 1 Load Balancer (Nginx/HAProxy). Vì không lưu trạng thái (session lưu ở Redis, file lưu ở S3/NFS/MinIO), có thể scale out N nodes ngang hàng thoải mái.
- Stateful DB: Khó làm Active-Active vì xung đột ghi. Em thiết kế Active-Passive. Dựng 1 Master DB để Read/Write, và 1-2 Replica DB liên tục Sync dữ liệu (Streaming Replication). Phía trên dùng 1 công cụ cluster manager (như Patroni hoặc HAProxy) để tự động Failover Master sang Replica khi có sự cố.

## 9. Scenario-Based Questions

### Scenario 1: Pod chạy nhưng không phục vụ được Request
**Situation:** Trong Kubernetes, Pod (ứng dụng Node.js) đang báo trạng thái "Running", nhưng khi request tới thì bị treo hoặc timeout. Load Balancer vẫn liên tục đẩy traffic vào Pod đó (gây lỗi cho user). Lỗi HA ở đây là gì?
**How to approach:** Pod "Running" chỉ nghĩa là tiến trình chưa crash, không có nghĩa là ứng dụng đã sẵn sàng (có thể DB connection bị treo).
**Model Answer:** Lớp HA đang thiếu Health Check ở mức ứng dụng. Để khắc phục, em phải cấu hình Liveness Probe và Readiness Probe trong Deployment của Kubernetes.
- Readiness Probe (gọi API `/health` của app): Nếu trả về 500, K8s sẽ gỡ Pod này khỏi Endpoints (Load Balancer không đẩy traffic vào nữa).
- Liveness Probe: Nếu ứng dụng kẹt quá lâu, K8s sẽ tự động gửi SIGTERM restart Pod đó để khôi phục.

### Scenario 2: Network Partition
**Situation:** Bạn cấu hình 1 cụm RabbitMQ 2 nodes. Sáng nay Switch quang trung tâm bị lỗi, 2 node không giao tiếp được với nhau (Network Partition). Client vẫn đang kết nối tới cả 2 node.
**Model Answer:** Đây chính là rủi ro Split-brain. Với RabbitMQ (hoặc Kafka/DB), không bao giờ nên deploy cụm 2 nodes. Em sẽ thiết kế lại cụm có tối thiểu 3 nodes. Khi đứt mạng, cụm bị chia làm 2 mảnh: mảnh 2 nodes và mảnh 1 node. Mảnh 2 nodes có đủ Quorum (đa số) sẽ tiếp tục phục vụ (nhận Write). Mảnh 1 node sẽ tự động chuyển sang read-only hoặc block client để bảo vệ tính toàn vẹn dữ liệu.

## 10. Key Takeaways
- HA = Khả năng phục hồi (Resilience) + Không có điểm mù (No SPOF).
- Redundancy mọi tầng lớp: Network (Teaming), Hardware (RAID), Hypervisor (VM HA), App (Load Balancer), DB (Replication).
- On-prem LB HA thường dùng Keepalived (VRRP) + Nginx/HAProxy.
- Chống Split-brain phải dùng Quorum (cụm số lẻ).
- Cloud che giấu Multi-AZ, On-prem Admin phải tự thiết kế Active-Active hoặc Failover tự động.
