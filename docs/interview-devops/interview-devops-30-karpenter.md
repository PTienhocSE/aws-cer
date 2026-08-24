# [30] KARPENTER AUTOSCALING

> **Phase:** 4 — Cloud & Data
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** EKS, EC2, IAM, Kubernetes scheduling, PodDisruptionBudget

# 1. 🎯 MỤC TIÊU HỌC

Hiểu Karpenter quan sát unschedulable Pod, chọn instance qua NodePool/NodeClass, launch node, expire/consolidate node; thiết kế disruption an toàn và troubleshoot provisioning, IAM, subnet, capacity và consolidation.

# 2. 🧠 KIẾN THỨC NỀN

Cần nắm Kubernetes requests/limits, taint/toleration, affinity, PDB, EC2 instance/AZ/AMI, IAM, subnet/security group, Spot và EKS node lifecycle.

# 3. 📚 TỔNG QUAN

Karpenter tạo node theo nhu cầu Pod thay vì chỉ tăng replica của một ASG cố định. Nó không sửa requests sai và không đảm bảo AWS luôn có instance; scheduling constraints, quota, subnet và capacity vẫn quyết định kết quả.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Pending Pod -> Karpenter observes -> NodePool constraints
             -> EC2NodeClass (AMI/subnet/SG/IAM)
             -> EC2 launch -> kubelet joins cluster -> Pod schedules
             -> expiration/consolidation -> drain/replace node
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Karpenter controller, NodePool, EC2NodeClass, NodeClaim, AMI, subnet/security group selectors, instance type/capacity type, interruption handler, taint, PDB và disruption budget.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

NodePool mô tả constraint và policy; EC2NodeClass mô tả AWS launch details. `capacity-type` có thể là on-demand/spot. Consolidation tận dụng node thừa nhưng có thể gây disruption nếu PDB/termination grace không đúng.

# 7. 🌍 VÍ DỤ THỰC TẾ

Production dùng NodePool riêng cho critical on-demand, batch Spot và GPU; giới hạn instance/AZ, đặt `limits`, dùng topology spread và PDB. Không để một NodePool quá rộng làm workload chạy nhầm loại máy/cost.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl get nodepool,nodeclaim,ec2nodeclass
kubectl describe nodeclaim <name>
kubectl logs -n karpenter deploy/karpenter
kubectl get pods --field-selector=status.phase=Pending -A
kubectl describe pod <pod> -n <ns>
aws ec2 describe-instances --filters Name=tag:karpenter.sh/nodepool,Values=<pool>
aws ec2 describe-spot-instance-requests
```

# 9. 📝 LOG

Đọc Karpenter controller log, NodeClaim conditions, Pod Events, EC2 launch/system log, CloudTrail RunInstances, IAM denial, subnet/SG selection và interruption event. Lưu NodePool/NodeClaim/instance ID.

# 10. 📊 METRIC

Pending duration, provisioning latency, NodeClaim launch failure, node count/cost, consolidation events, interruption/termination, CPU/memory headroom, unschedulable Pod và Spot interruption rate.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: critical
spec:
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 10m
  template:
    spec:
      nodeClassRef:
        group: eks.amazonaws.com
        kind: EC2NodeClass
        name: default
      requirements:
        - key: kubernetes.io/arch
          operator: In
          values: [amd64]
        - key: karpenter.sh/capacity-type
          operator: In
          values: [on-demand]
  limits:
    cpu: "1000"
```

Version API/field phải theo Karpenter đang dùng; luôn validate manifest trước apply.

# 12. 🔧 TROUBLESHOOTING

```text
Pod Pending -> requirements/requests/taint/PDB
NodeClaim không tạo -> NodePool/NodeClass/limits
EC2 launch fail -> IAM/subnet/SG/AMI/quota/capacity
Node không join -> bootstrap/role/network/API endpoint
Consolidation gây lỗi -> PDB/grace/anti-affinity/budget
```

# 13. 🚨 PRODUCTION INCIDENT

### Pending nhưng Karpenter không tạo node

Đọc Pod Events và controller log, kiểm tra NodePool requirement mâu thuẫn, taint, quota và limits.

### EC2 launch AccessDenied

Đối chiếu instance profile, trust policy, CloudTrail và Karpenter role; sửa least privilege rồi retry có kiểm soát.

### Node launch nhưng không join

Kiểm tra AMI bootstrap, user data, node role, DNS/route/security group và API endpoint; cordon instance lỗi.

### Spot interruption

Kiểm tra interruption event, PDB, drain và replica spread; workload critical không phụ thuộc duy nhất Spot.

### Consolidation làm giảm availability

Kiểm tra PDB/termination grace/topology và consolidation event; tạm disable policy hoặc tăng budget, sau đó sửa disruption design.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Ưu điểm | Trade-off |
|---|---|---|
| Karpenter | instance linh hoạt, scale nhanh | policy/disruption phức tạp |
| Cluster Autoscaler | quen thuộc với ASG | scale theo node group, kém linh hoạt |
| On-demand | ổn định | cost cao |
| Spot | tiết kiệm | interruption/capacity risk |
| Consolidation | giảm cost | eviction/disruption |

# 15. ❌ COMMON MISTAKES

- Không giới hạn NodePool nên launch instance đắt.
- Không có PDB/topology spread.
- Dùng Spot cho workload stateful/critical không có chiến lược.
- Nhầm Karpenter sửa resource request.
- Quên node role/bootstrap/private endpoint.
- Không kiểm tra API version sau upgrade.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Karpenter khác Cluster Autoscaler thế nào?
2. NodePool và EC2NodeClass khác gì?
3. Vì sao Pod Pending nhưng Karpenter không tạo node?
4. Consolidation có rủi ro gì?
5. Spot interruption xử lý thế nào?
6. PDB liên quan gì đến node replacement?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Thiết kế NodePool cho critical/batch/Spot.
- Debug NodeClaim launch failure.
- Karpenter chọn instance type thế nào?
- Làm sao kiểm soát cost?
- Làm sao tránh consolidation gây outage?
- So sánh Karpenter với Cluster Autoscaler.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Karpenter phù hợp khi workload đa dạng và cần scale node nhanh. Em tách NodePool theo reliability/capacity type, giới hạn instance/cost, dùng PDB/topology spread, kiểm soát interruption/consolidation và theo dõi NodeClaim/CloudTrail. Autoscaling chỉ an toàn khi requests đúng và workload có đủ replica.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Đừng chỉ nói “Karpenter tự scale”. Hãy nêu Pod constraint, AWS capacity, IAM/bootstrap, disruption budget, cost và verification.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Pod Pending?
 -> Karpenter thấy chưa?
 -> NodePool requirement?
 -> NodeClass/IAM/subnet/AMI?
 -> EC2 quota/capacity?
 -> Node join/PDB/consolidation?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu Pod-to-NodeClaim-to-EC2 flow.
- [ ] Cấu hình NodePool/NodeClass đúng version.
- [ ] Debug IAM, subnet, AMI, quota và capacity.
- [ ] Thiết kế Spot/consolidation an toàn.
- [ ] Theo dõi cost và disruption.

# 22. 🃏 FLASHCARDS

**Q:** NodePool là gì? **A:** Constraint và policy cho node Karpenter tạo.  
**Q:** NodeClaim là gì? **A:** Request/state của một node cụ thể.  
**Q:** Consolidation là gì? **A:** Gom/loại node thừa để tối ưu cost.  
**Q:** Pending không tạo node vì sao? **A:** Constraint, limit, IAM, quota hoặc capacity không phù hợp.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: provisioning, constraints, disruption và AWS capacity.  
🟠 Phải nắm: NodePool, NodeClaim, NodeClass, logs và CloudTrail.  
🟡 Nên biết: Spot allocation, consolidation algorithm và cost model.

# 24. 🎯 LIÊN HỆ VỚI JD

Karpenter liên quan trực tiếp autoscaling, capacity, cost optimization, EKS operations và production availability.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi Karpenter, cần chứng minh NodePool design, disruption, Spot và incident; không chỉ nói đã cài Helm chart.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Critical workloads chạy on-demand đa AZ; batch dùng Spot với checkpoint; GPU có NodePool riêng; limits/cost alert; PDB, spread, interruption handler và runbook thay node.

# 27. 🧪 HANDS-ON LAB

1. Tạo NodePool on-demand có instance constraint.
2. Tạo Pod Pending để quan sát NodeClaim.
3. Cấu hình Spot workload với interruption handler.
4. Thử consolidation trong cluster test.
5. Cố ý sai IAM/AMI và điều tra launch failure.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Pending → Pod constraints → NodePool → NodeClass → IAM/subnet/AMI → quota/capacity → node join → PDB/consolidation.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review limits/cost, IAM, AMI, subnet/IP, security group, AZ diversity, PDB, drain/grace, interruption, controller HA, version compatibility và rollback.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Provisioning | ☐ | ☐ | ☐ |
| AWS integration | ☐ | ☐ | ☐ |
| Disruption | ☐ | ☐ | ☐ |
| Cost/HA | ☐ | ☐ | ☐ |
| Troubleshooting | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: NodePool/NodeClass, Pending, IAM/bootstrap, Spot, consolidation, PDB, topology, cost và Cluster Autoscaler trade-off.

# 32. 📋 FINAL CHECKLIST

- [ ] Thiết kế NodePool theo workload.
- [ ] Debug được NodeClaim/EC2 launch/join.
- [ ] Có Spot/consolidation safety plan.
- [ ] Kiểm soát cost và capacity.
- [ ] Verify replacement không gây outage.

---
END OF FILE
