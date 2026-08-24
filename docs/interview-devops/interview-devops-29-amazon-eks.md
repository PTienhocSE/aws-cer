# Amazon EKS (Elastic Kubernetes Service) - Exhaustive Interview Preparation Guide

## 1. Mục tiêu học
- Hiểu sâu về kiến trúc, vận hành và troubleshooting Amazon EKS ở mức độ Enterprise.
- Nắm vững sự khác biệt giữa EKS và self-hosted Kubernetes (kubeadm, RKE).
- Sẵn sàng trả lời các câu hỏi phỏng vấn từ mức độ cơ bản đến System Design và Production Troubleshooting.

## 2. Kiến thức nền cần biết
- Kiến trúc Kubernetes cơ bản (Control Plane, Worker Nodes, Pods, Services, Ingress).
- AWS Networking (VPC, Subnets, Security Groups, IAM).
- Containerization (Docker, containerd).
- Các khái niệm về High Availability (HA) và Disaster Recovery (DR).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context)
- **Enterprise Context:** Amazon EKS là dịch vụ managed K8s giúp doanh nghiệp dễ dàng chạy và scale ứng dụng container mà không cần quản lý Control Plane. Nó tích hợp chặt chẽ với hệ sinh thái AWS (IAM, VPC, CloudWatch, ALB/NLB).
- **Enterprise Context (Doanh nghiệp Enterprise):** Với JD 60% System + 40% DevOps, EKS đóng vai trò nền tảng để hiện đại hóa hạ tầng (microservices) từ hệ thống truyền thống. Việc hiểu EKS giúp tự động hóa quy trình triển khai các ứng dụng Core Enterprise System của cảng, đảm bảo uptime 99.99%.
- **Candidate CV Alignment:** Bạn có kinh nghiệm với AWS, EKS, Docker, K8s, Terraform, ArgoCD. Đây là điểm cộng lớn. Cần thể hiện khả năng dùng Terraform để provision EKS cluster, cấu hình ArgoCD để làm GitOps deploy lên EKS.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams)
```text
+-------------------------------------------------------------+
|                       AWS Cloud                             |
|  +-------------------------------------------------------+  |
|  |                EKS Control Plane (AWS Managed)        |  |
|  |  [ API Server ]  [ etcd (HA across 3 AZs) ]           |  |
|  |  [ Controller Manager ]  [ Scheduler ]                |  |
|  +--------------------------^----------------------------+  |
|                             | (ENI - Cross Account VPC)     |
|  +--------------------------v----------------------------+  |
|  |                Customer VPC                           |  |
|  |  +-------------------+      +-------------------+     |  |
|  |  | Private Subnet A  |      | Private Subnet B  |     |  |
|  |  | [ Worker Node ]   |      | [ Worker Node ]   |     |  |
|  |  |   - Kubelet       |      |   - Kubelet       |     |  |
|  |  |   - Kube-proxy    |      |   - Kube-proxy    |     |  |
|  |  |   - Pods          |      |   - Pods          |     |  |
|  |  +-------------------+      +-------------------+     |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## 5. Các thành phần quan trọng (Components, failure modes)
- **EKS Control Plane:** AWS quản lý, HA qua 3 AZs. *Failure mode:* Rất hiếm khi sập toàn bộ, nhưng API Server có thể bị timeout nếu quá tải requests (API throttling).
- **Worker Nodes (EC2 / Fargate):** *Failure mode:* Node NotReady do OOM, Disk Full, hoặc mất kết nối mạng với Control Plane.
- **VPC CNI (Amazon VPC CNI plugin cho K8s):** Cấp phát native VPC IP cho Pods. *Failure mode:* Hết IP trong Subnet (IP Exhaustion).
- **CoreDNS:** Phân giải tên miền nội bộ. *Failure mode:* DNS timeout do Node quá tải hoặc cấu hình sai.
- **Kube-proxy:** Quản lý network routing cho Services. *Failure mode:* iptables rules quá nhiều gây nghẽn.

## 6. Các concept quan trọng
- **Cơ bản:** Pod, Deployment, Service (ClusterIP, NodePort, LoadBalancer), Ingress.
- **Trung cấp:** IRSA (IAM Roles for Service Accounts), Managed Node Groups vs Self-managed Nodes vs Fargate, Cluster Autoscaler / Karpenter.
- **Nâng cao:** Custom Networking (CNI), OIDC Identity Provider, VPC CNI ENI Trunking, Security Groups cho Pods.

## 7. Ví dụ thực tế
- **Dev:** Dùng Spot Instances trong Managed Node Group để tiết kiệm chi phí, Single AZ.
- **Prod:** Multi-AZ EC2 On-Demand Nodes, Karpenter để auto-scaling nhanh, AWS Load Balancer Controller cho Ingress/Service.
- **Enterprise/Multi-DC:** EKS Multi-Region, dùng Route53 kết hợp Global Accelerator để failover traffic giữa 2 EKS Clusters ở 2 Region khác nhau.

## 8. Command / Tool cần biết
- **kubectl:** `kubectl get nodes -o wide`, `kubectl top pods`, `kubectl describe pod <name>`, `kubectl logs -f <pod>`, `kubectl exec -it <pod> -- sh`.
- **eksctl:** Tool để tạo và quản lý cluster nhanh (`eksctl create cluster`).
- **aws-cli:** `aws eks update-kubeconfig --name <cluster_name> --region <region>`.
- **Linux Tools trên Node:** `journalctl -u kubelet`, `crictl ps`, `crictl logs`.

## 9. Log (locations, interpretation, correlation)
- **Control Plane Logs:** Phải bật trong cấu hình EKS (Gửi về CloudWatch Logs). Bao gồm API server, audit, authenticator, controller manager, scheduler logs.
- **Kubelet Logs:** Trên Worker Node, xem bằng `journalctl -u kubelet`. Hữu ích khi Node chuyển sang trạng thái NotReady.
- **Container Logs:** Lưu tại `/var/log/containers/` hoặc `/var/log/pods/` trên Node.
- **Correlation:** Dùng CloudWatch Container Insights hoặc ELK/Fluent-bit để gom log và trace theo Trace ID (ví dụ: dùng OpenTelemetry).

## 10. Metric (CPU, RAM, Disk I/O, Load Average, Inodes, Swap)
- Khuyến nghị dùng **Prometheus + Grafana** hoặc **Container Insights**.
- **Metrics cần monitor:** Node CPU/Memory Utilization, Pod CPU/Memory, Kube-state-metrics (số lượng Pods PENDING/CRASHLOOPBACKOFF), API Server Request Latency.
- **Inodes / Disk:** Theo dõi Ephemeral storage của Pod để tránh Eviction do hết Disk (DiskPressure).

## 11. Configuration (Sample configs)
```yaml
# Ví dụ cấu hình IRSA (IAM Roles for Service Accounts)
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
  namespace: my-namespace
  annotations:
    # Gắn IAM Role vào Pod thông qua Service Account (OIDC)
    eks.amazonaws.com/role-arn: arn:aws:iam::111122223333:role/my-iam-role
```
*Giải thích:* Thay vì gán IAM role cho toàn bộ EC2 Node, IRSA giúp cấp quyền AWS (VD: access S3) chính xác cho từng Pod dựa trên ServiceAccount, tăng cường bảo mật (Least Privilege).

## 12. Troubleshooting Methodology
1. **Identify:** Nhận alert "App X down" hoặc "Node NotReady".
2. **Gather data:** Chạy `kubectl get events --sort-by='.metadata.creationTimestamp'`, kiểm tra `kubectl describe pod`.
3. **Analyze:**
   - Nếu Pod Pending -> Kiểm tra resource (CPU/RAM) hoặc lỗi PVC/Taints/Tolerations.
   - Nếu CrashLoopBackOff -> Đọc `kubectl logs --previous`.
   - Nếu Node NotReady -> SSH/SSM vào Node, xem `journalctl -u kubelet`.
4. **Fix:** Scale up nodes, tăng resource limit, hoặc restart pod.
5. **Verify:** `kubectl get pods -w` đợi đến khi RUNNING (1/1).
6. **RCA:** Viết báo cáo nguyên nhân (do leak memory app hay do hết IP trong subnet) và cập nhật rules/alerts.

## 13. Production Incident (5 Detailed Scenarios)
- **Scenario 1: IP Exhaustion (Hết IP trong Subnet)**
  - *Symptoms:* Pod mới bị kẹt ở trạng thái ContainerCreating, event báo `Failed to allocate IP`.
  - *Root Cause:* Amazon VPC CNI gán IP từ VPC trực tiếp cho Pod. Subnet quá nhỏ (/24) và bị dùng hết.
  - *Fix:* Bật Prefix Delegation (CNI) hoặc gắn thêm Subnet mới vào VPC (Custom Networking).
- **Scenario 2: Node NotReady do DiskPressure**
  - *Symptoms:* Node NotReady, các Pod trên Node bị Evicted.
  - *Root Cause:* Một Pod viết log ra stdout/disk quá lớn làm đầy Root volume của EC2.
  - *Fix:* Clear log, cấu hình log rotation trong containerd, tăng kích thước EBS volume, set limits cho Ephemeral storage.
- **Scenario 3: OOMKilled Pods**
  - *Symptoms:* Pod restart liên tục (CrashLoopBackOff), Exit Code 137.
  - *Root Cause:* Ứng dụng dùng quá Memory Limit đã set trong Deployment.
  - *Fix:* Profile lại ứng dụng, tăng Memory Limit tạm thời, phân tích memory leak trong code.
- **Scenario 4: API Server Throttling**
  - *Symptoms:* Lệnh kubectl phản hồi chậm, timeout. Cluster Autoscaler không scale được.
  - *Root Cause:* Có quá nhiều calls từ các controller hoặc CI/CD pipeline dội vào API Server.
  - *Fix:* Tối ưu hóa CI/CD, dùng Informers/Caches trong custom controllers thay vì poll liên tục.
- **Scenario 5: CoreDNS DNS resolution timeout**
  - *Symptoms:* Các microservices không gọi được nhau qua service name.
  - *Root Cause:* CoreDNS pods bị quá tải CPU hoặc nghẽn mạng do iptables/conntrack table đầy.
  - *Fix:* Scale up replicas của CoreDNS, dùng NodeLocal DNSCache.

## 14. So sánh
| Feature | Amazon EKS | Kubeadm (Self-hosted trên EC2) |
| --- | --- | --- |
| **Control Plane** | AWS quản lý, HA sẵn, tự động backup | Tự quản lý etcd, api-server, rất phức tạp |
| **Upgrades** | Bấm nút hoặc dùng Terraform update version | Phải tự upgrade cẩn thận (dễ downtime) |
| **Chi phí** | $0.10/giờ/cluster + Tiền EC2 | Chỉ trả tiền EC2 |
| **Tích hợp AWS** | Native (VPC CNI, IAM, ALB) | Phải tự cài đặt và cấu hình nhiều components |

## 15. Common Mistakes
- **Dùng public endpoint không giới hạn IP:** Dễ bị tấn công vào API Server.
- **Quên update EKS version:** K8s ra version mới liên tục, dùng bản cũ hết support sẽ bị AWS tự động upgrade (có thể gây lỗi nếu API deprecated).
- **Không dùng Cluster Autoscaler / Karpenter:** Lãng phí tài nguyên Node lúc rảnh rỗi hoặc thiếu tài nguyên khi peak traffic.

## 16. Interview Knowledge Check
- **10 Basic:** Cấu trúc 1 EKS cluster? VPC CNI là gì?
- **10 Deep:** Luồng hoạt động của IRSA? Làm sao Kube-proxy map Service IP thành Pod IP?
- **10 Troubleshooting:** Cách fix lỗi CrashLoopBackOff? Cách debug Node NotReady?

## 17. Câu hỏi phỏng vấn
- **Basic:** Tại sao nên dùng EKS thay vì ECS?
- **Intermediate:** Phân biệt Managed Node Group, Self-managed Node và Fargate trong EKS?
- **Advanced:** VPC CNI của AWS có nhược điểm gì so với Calico/Cilium? Làm thế nào để bypass giới hạn số lượng Pod trên mỗi EC2 instance type?
- **Architecture:** Thiết kế EKS cluster cho hệ thống TOS của cảng Enterprise, đảm bảo High Availability nếu 1 AZ bị sập.

## 18. Đáp án phỏng vấn
- **Short (Bypass limit pod):** Bật Prefix Delegation trên AWS VPC CNI.
- **Engineer Style:** CNI plugin mặc định cấp 1 IP thứ cấp (secondary IP) từ ENI cho mỗi Pod. Vì số lượng ENI và secondary IP trên mỗi loại EC2 (VD: t3.medium) bị giới hạn cứng bởi AWS, ta sẽ bị limit số Pod. Để giải quyết, em sẽ enable `ENABLE_PREFIX_DELEGATION=true` trong môi trường CNI, giúp gán cả block /28 thay vì 1 IP duy nhất cho ENI, tăng mạnh mật độ Pod.

## 19. Follow-up Question Tree
- *Q: Làm sao để expose service ra ngoài cho user truy cập?* -> *A: Dùng AWS Load Balancer Controller (Ingress).*
  - *Q: Khác biệt giữa ALB Ingress và NLB Service (LoadBalancer)?* -> *A: ALB là L7 (HTTP/S, routing theo path/host), NLB là L4 (TCP/UDP, performance siêu cao).*

## 20. Checklist sau khi học
- [ ] Dùng Terraform tạo thành công 1 EKS cluster.
- [ ] Deploy thử 1 app Nginx qua Helm.
- [ ] Hiểu cách authenticate vào EKS bằng IAM Role (`aws-auth` ConfigMap / EKS Access Entries).

## 21. Flashcards (25+ Q&A pairs)
- **Q:** NodePort default range? -> **A:** 30000-32767.
- **Q:** Lệnh để xem resource của Pod? -> **A:** `kubectl top pods`.
- **Q:** IRSA là viết tắt của gì? -> **A:** IAM Roles for Service Accounts.

## 22. Phân biệt "Phải hiểu" (🔴) và "Phải nắm" (🟠)
- 🔴 **Phải hiểu:** VPC CNI networking, IRSA, phân tích Log/Event để troubleshoot.
- 🟠 **Phải nắm:** Các thông số Terraform tạo cluster, cấu hình kubectl.
