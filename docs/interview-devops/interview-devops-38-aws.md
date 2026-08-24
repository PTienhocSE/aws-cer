# [38] AWS CORE SERVICES & OPERATIONS

> **Phase:** 4 — Cloud & Data
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Networking, Linux, IAM, cloud fundamentals, containers

# 1. 🎯 MỤC TIÊU HỌC

Thiết kế và vận hành AWS workload với VPC, IAM, EC2, ALB, EKS, RDS, S3, MSK, KMS, CloudWatch; hiểu HA, security, cost, backup/DR và troubleshoot theo account/region/resource.

# 2. 🧠 KIẾN THỨC NỀN

TCP/IP, subnet/route/NAT, DNS/TLS, Linux, containers, distributed systems, IAM policy evaluation, encryption, monitoring và infrastructure lifecycle.

# 3. 📚 TỔNG QUAN

AWS cung cấp managed primitives nhưng customer vẫn chịu trách nhiệm cấu hình, identity, data, network, cost và workload reliability. Thiết kế phải xác định region/AZ, trust boundary, failure domain và recovery objective.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Route53 -> WAF/CloudFront -> ALB/NLB -> EKS/EC2
                              |             |
                              +-> RDS      +-> S3/MSK
VPC: public/private subnet, route, SG/NACL, endpoints, IAM/KMS/CloudWatch
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Account/Organization, Region/AZ, VPC/subnet/route, SG/NACL, IAM/STS, KMS, EC2/ASG, ALB/NLB, EKS, RDS, S3, MSK, CloudWatch, CloudTrail, Backup và Cost Explorer.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** region/AZ, public/private, SG stateful/NACL stateless, IAM role/policy, managed vs self-managed.  
**Trung cấp:** multi-AZ, private endpoint/NAT, encryption, autoscaling, backup, quotas và tagging.  
**Nâng cao:** multi-account landing zone, cross-region DR, least privilege, blast radius, cost allocation, eventual consistency và service limits.

# 7. 🌍 VÍ DỤ THỰC TẾ

Production dùng multi-AZ private workload, ALB public edge, RDS Multi-AZ, S3 encrypted/versioned, MSK private, EKS node spread, VPC endpoints, CloudTrail/CloudWatch và centralized security account.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Kiểm tra bằng AWS CLI: `sts get-caller-identity`, `ec2 describe-subnets/route-tables/security-groups`, `iam simulate-principal-policy`, `eks describe-cluster`, `elbv2 describe-target-health`, `rds describe-db-instances`, `s3api head-object`, `cloudtrail lookup-events`, `ce get-cost-and-usage`.

# 9. 📝 LOG

CloudTrail là audit nền tảng; VPC Flow Logs cho network; ALB access log, RDS/error log, EKS audit, application log và CloudWatch log group cho runtime. Lưu account, region, resource ARN, principal, request ID và timestamp.

# 10. 📊 METRIC

Availability/latency/error, ALB target health, EC2 CPU/status, RDS connections/CPU/storage/replica lag, MSK broker/consumer lag, S3 4xx/5xx, EKS/API/node, NAT bytes, quota và cost anomaly.

# 11. ⚙️ CONFIGURATION

Mọi resource cần encryption, tags (`owner`, `environment`, `cost-center`), private subnet khi phù hợp, IAM role thay access key, CloudTrail, backup policy, alarms, deletion protection cho data và IaC ownership.

# 12. 🔧 TROUBLESHOOTING

```text
Request fail -> DNS/TLS/ALB/SG/NACL/route
AWS API denied -> caller identity/trust/policy/SCP/permission boundary
Resource unhealthy -> service health/AZ/quota/dependency
Data issue -> encryption/key/backup/replication/consistency
Cost spike -> usage/tag/NAT/log/idle resource
```

# 13. 🚨 PRODUCTION INCIDENT

1. **IAM AccessDenied:** xác định principal/action/resource, CloudTrail, SCP/boundary/trust; cấp đúng quyền rồi test lại.  
2. **ALB 5xx:** target health, SG/NACL, listener/rule, backend readiness và dependency.  
3. **RDS storage/connection full:** metric/slow query/connection pool, scale/kill safe connection, tối ưu và mở rộng có plan.  
4. **AZ outage:** kiểm tra multi-AZ failover/capacity/DNS/traffic và data consistency.  
5. **Cost anomaly:** xác định service/region/account/tag, stop resource không cần, kiểm tra compromise/NAT/log retention và tạo budget alert.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| Managed service | ít ops | giới hạn control/cost |
| EC2 self-managed | linh hoạt | patch/HA chịu trách nhiệm |
| Multi-AZ | HA lỗi AZ | cost/latency |
| Multi-region | DR lớn | consistency/cost/complexity |
| NAT Gateway | dễ private egress | cost theo byte |
| VPC endpoint | private/cost control | service-specific config |

# 15. ❌ COMMON MISTAKES

Access key trong code; public subnet mọi thứ; SG mở `0.0.0.0/0`; không tag; không kiểm quota/cost; nhầm AZ với region; backup chưa restore test; CloudTrail/log không retention.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

Region khác AZ? SG khác NACL? IAM policy evaluation? Private subnet ra Internet thế nào? Multi-AZ khác multi-region? CloudTrail/VPC Flow Logs dùng gì? Vì sao cần KMS/tag/backup?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế AWS EKS/RDS production; IAM least privilege; private VPC; HA/DR; troubleshoot AccessDenied/ALB/RDS; cost optimization; security audit.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em bắt đầu từ failure domain và data criticality, tách public/private, least-privilege IAM, encryption/KMS, multi-AZ cho service stateful, backup/restore, observability/audit và cost tags. Incident được khoanh vùng theo account/region/resource rồi mới thay đổi.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu trade-off và shared responsibility; không nói “AWS tự HA”. Luôn chỉ ra customer-configured risk, evidence từ CLI/CloudTrail/metrics và recovery.

# 20. 🌳 FOLLOW-UP QUESTION TREE

AWS request fail → caller/IAM → network/DNS/TLS → resource health/quota → dependency/data → mitigation → audit/cost/security.

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Thiết kế VPC/private workload/multi-AZ.
- [ ] Debug IAM/network/ALB/data service.
- [ ] Dùng KMS/backup/audit/tags.
- [ ] Hiểu quota/cost/shared responsibility.
- [ ] Có HA/DR và incident runbook.

# 22. 🃏 FLASHCARDS

**Q:** AZ là gì? **A:** Failure domain độc lập trong Region.  
**Q:** CloudTrail? **A:** Audit API/control-plane action.  
**Q:** SG? **A:** Stateful virtual firewall.  
**Q:** IAM role tốt hơn access key? **A:** Credential temporary/assumable và dễ scope/rotate.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu region/AZ/network/IAM/shared responsibility.  
🟠 Nắm CLI, CloudTrail, metrics, backup và quota.  
🟡 Biết multi-account, multi-region, FinOps và landing zone.

# 24. 🎯 LIÊN HỆ VỚI JD

AWS là nền tảng cho cloud operations, EKS, IaC, security, observability, data infrastructure và DR.

# 25. 📌 LIÊN HỆ VỚI CV

Map rõ service đã trực tiếp dùng, account/region/IAM/network/incident; không phóng đại kinh nghiệm Production từ kiến thức lý thuyết.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Multi-account organization, shared networking/security log, private EKS/RDS/MSK, S3 backup, KMS key separation, CloudTrail, GuardDuty/Config, budget và DR region.

# 27. 🧪 HANDS-ON LAB

Tạo private VPC; IAM role policy test; ALB/EKS/RDS test; bật CloudTrail/VPC Flow; mô phỏng SG/IAM failure; kiểm tra backup/restore và cost tags.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Identity → network → resource/AZ/quota → dependency/data → service health → mitigation → CloudTrail/RCA/cost prevention.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review account boundary, private network, IAM, KMS, logging/audit, backup/restore, HA/DR, quotas, tags/budget, alarms, deletion protection và incident ownership.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| AWS architecture | ☐ | ☐ | ☐ |
| IAM/network | ☐ | ☐ | ☐ |
| Data/HA/DR | ☐ | ☐ | ☐ |
| Security/cost | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: VPC/IAM, Region/AZ, private networking, ALB/EKS/RDS/S3/MSK, KMS, CloudTrail, HA/DR, quota và cost.

# 32. 📋 FINAL CHECKLIST

- [ ] Thiết kế được AWS workload private multi-AZ.
- [ ] Debug được IAM/network/service/data issue.
- [ ] Có encryption, audit, backup/restore.
- [ ] Kiểm soát quota, tags và cost.
- [ ] Hiểu shared responsibility và recovery.

---
END OF FILE
