# [29] AMAZON EKS OPERATIONS

> **Phase:** 4 — Cloud & Data
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Kubernetes, AWS VPC/IAM, EC2, Load Balancer, CloudWatch

# 1. 🎯 MỤC TIÊU HỌC

Hiểu EKS control plane/data plane, VPC CNI, IAM/OIDC, managed node group, add-ons, ALB/NLB, upgrade, autoscaling, observability, security và incident response.

# 2. 🧠 KIẾN THỨC NỀN

Cần nắm Kubernetes API/scheduler/kubelet, AWS VPC/subnet/route/security group, IAM policy/role, EC2/ASG, ECR, CloudWatch, KMS và multi-AZ design.

# 3. 📚 TỔNG QUAN

EKS quản lý control plane AWS; customer vẫn chịu trách nhiệm node, Pod, add-ons, IAM, network, workload, data và cost. Managed control plane không có nghĩa cluster tự vận hành an toàn.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
User/CI -> IAM/OIDC -> EKS API endpoint -> AWS managed control plane
                                      |
VPC CNI -> EC2 nodes/managed node groups/Karpenter -> Pods
                                      |
ALB/NLB -> Ingress/Service -> workload -> RDS/S3/MSK
```

EKS API xác thực IAM rồi map access entry/RBAC. VPC CNI cấp Pod IP từ subnet/ENI. Add-ons như CoreDNS, kube-proxy, VPC CNI, EBS/ALB CSI nối Kubernetes với AWS.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Control plane, API endpoint, VPC/subnets, security groups, VPC CNI, node group/EC2, IAM/OIDC, ECR, Load Balancer Controller, EBS/EFS CSI, CoreDNS, kube-proxy, CloudWatch/Prometheus và KMS.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

EKS control plane nằm ngoài account data plane nhưng API access phụ thuộc endpoint/public-private network. Node role khác Pod role; không dùng node IAM role để cấp quyền cho mọi Pod.

## 6.2. Trung cấp

IRSA/EKS Pod Identity cấp IAM riêng cho workload. VPC CNI tiêu thụ ENI/IP subnet; thiếu IP có thể làm Pod Pending dù EC2 còn CPU. Managed node group hỗ trợ lifecycle nhưng vẫn cần drain/PDB/upgrade plan.

## 6.3. Nâng cao

Private endpoint, cross-account ECR, KMS encryption, subnet IP planning, add-on version skew, upgrade sequencing và multi-AZ failure domain quyết định độ ổn định Production.

# 7. 🌍 VÍ DỤ THỰC TẾ

Dev dùng public endpoint có allowlist. Prod dùng private endpoint, private subnet, NAT/VPC endpoints, ALB public ở edge, workload private, IRSA, encrypted EBS và node spread theo AZ.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
aws eks describe-cluster --name <cluster>
aws eks update-kubeconfig --name <cluster> --region <region>
kubectl get nodes -o wide
kubectl get pods -A
kubectl get addon -n kube-system
kubectl describe node <node>
kubectl get aws-auth -n kube-system
kubectl auth can-i --list
aws ec2 describe-network-interfaces --filters Name=tag:cluster-name,Values=<cluster>
aws eks describe-addon --cluster-name <cluster> --addon-name vpc-cni
```

# 9. 📝 LOG

Đọc EKS control plane audit/authenticator log, CloudTrail, VPC Flow Logs, VPC CNI/kubelet logs, ALB access log, controller log và CloudWatch node log. Correlate cluster, account, region, node, ENI, Pod IP và IAM principal.

# 10. 📊 METRIC

API latency/error/throttle, node readiness, Pod IP allocation, ENI/IP exhaustion, CoreDNS latency, ALB target health/5xx, EBS attach latency, CPU/memory, cost và upgrade health.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app
  namespace: orders
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/orders-app
```

IAM role phải trust đúng OIDC provider, namespace và ServiceAccount; policy chỉ cấp resource/action cần thiết. VPC subnet cần tag đúng cho load balancer/controller.

# 12. 🔧 TROUBLESHOOTING

```text
kubectl/API không vào -> kubeconfig/IAM/endpoint/route/security group
Node NotReady -> EC2/status/kubelet/VPC CNI/IP/disk
Pod Pending -> scheduler/CPU/memory/IP/PVC
ALB lỗi -> tags/Ingress/controller/subnet/SG/target health
AWS API denied -> CloudTrail/IAM role/trust/policy
```

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — Pod Pending vì hết IP

Kiểm tra CNI/IP metrics, subnet free IP, ENI limits và node type. Mở rộng subnet/đổi prefix mode hoặc node capacity; không chỉ scale workload.

### Incident 02 — Node NotReady

Kiểm tra EC2 status, kubelet, disk/memory, security group, route và CNI. Cordon/drain nếu an toàn, thay node, rồi xác minh replica/PDB.

### Incident 03 — ALB 503/target unhealthy

Kiểm tra controller events, subnet tags, security group, target type, Service/EndpointSlice, readiness và health check path.

### Incident 04 — Pod bị AWS AccessDenied

Xác định role thực tế, trust policy/OIDC, CloudTrail và action/resource denied. Sửa Pod identity tối thiểu, không cấp admin cho node role.

### Incident 05 — Upgrade EKS lỗi

Kiểm tra version skew, add-on compatibility, PDB/capacity, deprecated API và node drain. Dừng rollout khi error tăng, restore capacity và rollback phần node/add-on có thể rollback.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| Managed node group | lifecycle đơn giản | ít linh hoạt hơn |
| Karpenter | scale nhanh/đa dạng instance | cần policy/disruption kỹ |
| Public API endpoint | dễ truy cập | attack surface |
| Private endpoint | bảo mật | cần network path/VPN/bastion |
| IRSA/Pod identity | least privilege | thêm IAM/OIDC complexity |
| Fargate | ít node ops | giới hạn workload/storage/cost |

# 15. ❌ COMMON MISTAKES

- Dùng node role cho mọi Pod.
- Không quy hoạch subnet IP cho VPC CNI.
- Upgrade control plane nhưng bỏ quên add-on/API deprecation.
- Public API không allowlist.
- Thiếu PDB/capacity khi drain node.
- Không tag subnet/security group đúng cho Load Balancer Controller.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. EKS quản lý phần nào, customer quản lý phần nào?
2. VPC CNI cấp Pod IP thế nào?
3. IRSA khác node IAM role ra sao?
4. Vì sao Pod Pending dù node còn CPU?
5. Debug ALB target unhealthy thế nào?
6. Upgrade EKS theo thứ tự nào?
7. Private endpoint cần network gì?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Thiết kế EKS production multi-AZ.
- Xử lý Pod Pending do IP exhaustion.
- Bảo vệ workload bằng IRSA/Pod Identity.
- Chọn managed node group, Karpenter hay Fargate?
- Quy trình upgrade EKS không downtime?
- Debug ALB 502/503 thế nào?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**EKS Production:** Em tách trách nhiệm control plane/data plane, dùng private subnets và API access có kiểm soát, spread node/workload theo AZ, VPC CNI có IP capacity, Pod identity least privilege, encrypted storage, controller/add-on version management, observability và upgrade/rollback runbook.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Luôn phân biệt Kubernetes symptom với AWS resource symptom. Một Pod Pending có thể do scheduler, IP, IAM, AZ hoặc storage; phải chỉ ra evidence từ cả `kubectl`, CloudTrail, VPC và CloudWatch.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Pod Pending?
 -> resource hay Pod IP?
 -> subnet/ENI limit?
 -> scheduler/PVC/topology?
 -> IAM/AWS API?
ALB lỗi?
 -> controller -> subnet/SG -> target health -> Service/Pod
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu EKS control/data plane.
- [ ] Debug được IAM, endpoint, VPC CNI, node và ALB.
- [ ] Biết Pod identity và subnet IP planning.
- [ ] Có upgrade/rollback và node drain plan.
- [ ] Hiểu cost và failure domain.

# 22. 🃏 FLASHCARDS

**Q:** EKS control plane do ai vận hành? **A:** AWS quản lý, customer vẫn chịu trách nhiệm cluster/workload config.  
**Q:** VPC CNI làm gì? **A:** Cấp network interface/IP cho Pod.  
**Q:** IRSA dùng để làm gì? **A:** Cấp IAM role riêng cho ServiceAccount.  
**Q:** Pod Pending vì IP kiểm tra gì? **A:** Subnet free IP, ENI/IP limit và CNI log.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: EKS ownership, VPC CNI, IAM identity và failure domains.  
🟠 Phải nắm: node/add-on/ALB commands, CloudTrail và VPC logs.  
🟡 Nên biết: private endpoint, prefix delegation, Fargate và upgrade skew.

# 24. 🎯 LIÊN HỆ VỚI JD

EKS là nền tảng trực tiếp cho Kubernetes operations, IAM, networking, scaling, monitoring, deployment và incident response trên AWS.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi EKS/AWS, cần nêu rõ cluster creation, add-on, IAM, networking, node lifecycle và incident đã trực tiếp làm; không gộp mọi việc thành “managed EKS”.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Thiết kế EKS private multi-AZ: ALB public edge, workload private, NAT/VPC endpoints, ECR/KMS, IRSA, managed node groups, Karpenter, Prometheus/Grafana, CloudTrail/VPC Flow Logs và backup cluster state/data.

# 27. 🧪 HANDS-ON LAB

1. Tạo EKS test cluster và private/public endpoint policy.
2. Cấu hình ServiceAccount IAM tối thiểu.
3. Gây Pod IP exhaustion giả lập và đọc CNI metrics.
4. Deploy ALB Ingress và debug target health.
5. Thực hiện node drain/upgrade trong cluster test.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

API → IAM/kubeconfig/endpoint/network; Node → EC2/kubelet/CNI/disk; Pod → scheduler/IP/PVC; ALB → tags/SG/controller/target; AWS API → CloudTrail/IAM/quota.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review private access, subnet IP headroom, IAM least privilege, add-on compatibility, node upgrade, PDB, multi-AZ, ALB health, audit, cost, backup và runbook.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| EKS architecture | ☐ | ☐ | ☐ |
| IAM/network | ☐ | ☐ | ☐ |
| Node/add-on ops | ☐ | ☐ | ☐ |
| Incident debug | ☐ | ☐ | ☐ |
| Upgrade/design | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: control/data plane, VPC CNI/IP, IAM/IRSA, private endpoint, node groups, add-ons, ALB, upgrade, multi-AZ và cost.

# 32. 📋 FINAL CHECKLIST

- [ ] Thiết kế được EKS private multi-AZ.
- [ ] Debug được IAM, IP exhaustion, node và ALB.
- [ ] Có Pod identity least privilege.
- [ ] Có upgrade/rollback/drain plan.
- [ ] Có audit, monitoring, backup và cost control.

---
END OF FILE
