# [37] TERRAFORM & INFRASTRUCTURE AS CODE

> **Phase:** 4 — Cloud & Data
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Terraform HCL, AWS/IAM, Git, networking, state management

# 1. 🎯 MỤC TIÊU HỌC

Hiểu provider/state/backend/module/variable/output, plan/apply/destroy, dependency, drift, locking, import, secret handling, policy, workspace/environment và safe change/rollback.

# 2. 🧠 KIẾN THỨC NỀN

Ôn cloud resource lifecycle, Git review, IAM, networking, JSON/YAML, remote state, CI/OIDC và blast radius của infrastructure change.

# 3. 📚 TỔNG QUAN

Terraform mô tả desired infrastructure và tạo execution plan để provider thực hiện. State là mapping giữa resource code và object thật; mất/hỏng/đọc lộ state có thể gây outage hoặc lộ secret.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
HCL modules/variables -> init/provider -> refresh state
                       -> plan (diff) -> approval
                       -> apply -> cloud resources/state lock
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Root module, child module, provider, resource/data source, variable/local/output, backend, state lock, plan file, registry, policy/check và CI runner.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** resource/data, variable/output, dependency và lifecycle.  
**Trung cấp:** remote backend, locking, module version, `for_each`/`count`, import, moved block và drift.  
**Nâng cao:** state partition, policy-as-code, plan signing, OIDC, zero-downtime replacement, `create_before_destroy` và migration.

# 7. 🌍 VÍ DỤ THỰC TẾ

Một account/region có network module, EKS module, RDS/S3/IAM module; mỗi environment có backend/key riêng; PR chạy fmt/validate/plan/policy, apply chỉ từ protected pipeline.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Các lệnh: `terraform fmt -check`, `terraform init`, `terraform validate`, `terraform plan -out=tfplan`, `terraform show`, `terraform apply tfplan`, `terraform state list/show`, `terraform import`, `terraform refresh` và `terraform providers`.

# 9. 📝 LOG

Lưu plan summary, commit, Terraform/provider version, backend key, actor, approval, resource address và cloud audit ID. Không upload state/plan chứa secret vào artifact công khai.

# 10. 📊 METRIC

Plan/apply duration, changed resource count, failure/rollback rate, drift count, state lock wait, module reuse, infrastructure lead time, cost delta và policy violation.

# 11. ⚙️ CONFIGURATION

Backend remote phải encryption, versioning, access log và lock. Provider/module pin version; secret lấy từ secret manager; CI dùng OIDC; resource tags bắt buộc owner/environment/cost center.

# 12. 🔧 TROUBLESHOOTING

Init fail → backend/provider/network/credential; plan fail → syntax/data/provider/permission; apply fail → quota/dependency/immutable/API; lock fail → active job/stale lock; drift → manual change/import/moved/resource lifecycle.

# 13. 🚨 PRODUCTION INCIDENT

1. **State lock bị treo:** xác định job đang chạy trước khi unlock, không xóa lock mù.  
2. **Plan muốn destroy sai:** stop apply, review address/for_each/key/provider/account và restore code/state mapping.  
3. **State backend lộ:** revoke access, rotate secret, kiểm tra version/audit và migrate protected backend.  
4. **Apply giữa chừng:** đọc error, kiểm tra resource/cloud state, chạy plan mới trước retry; không chạy apply song song.  
5. **Drift do console:** import/reconcile hoặc revert manual change, bổ sung permission/policy chặn sửa ngoài IaC.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Cách làm | Mạnh | Trade-off |
|---|---|---|
| Shared remote state | lock/audit tập trung | backend dependency |
| State per env | blast radius nhỏ | quản lý nhiều backend |
| Module | reuse/standard | abstraction/debug complexity |
| `count` | đơn giản | index shift |
| `for_each` | key ổn định | key migration cần cẩn thận |
| Workspace | cùng code | dễ nhầm env/state |

# 15. ❌ COMMON MISTAKES

Commit state/secret; apply local không review; dùng `-auto-approve` Production; unlock state mù; module/provider không pin; share state toàn công ty; destroy không có backup/approval.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

State có vai trò gì? Backend lock vì sao? Plan khác apply? Drift xử lý ra sao? Module/version pin? `for_each` khác `count`? Import dùng khi nào? Terraform có rollback tự động không?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế Terraform repo/multi-env; state security; module; zero-downtime; drift; import; apply failure; OIDC CI; policy/cost control.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em tách state theo blast radius/environment, dùng remote encrypted backend và locking, pin provider/module, review plan trong PR, apply protected pipeline bằng OIDC. Khi plan destroy bất thường em dừng, kiểm tra address/state/provider/account; Terraform không thay thế backup hay rollback data.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu code → plan → approval → apply → cloud audit → verification. Luôn nói rủi ro state, lock, secret, dependency và recovery.

# 20. 🌳 FOLLOW-UP QUESTION TREE

Plan destroy?
→ address/key/provider/state?
→ drift/import/moved?
→ backup/approval/rollback?
Apply fail?
→ cloud state/quota/dependency/lock?

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu state/backend/lock.
- [ ] Viết module/variable/output có version.
- [ ] Review plan và drift.
- [ ] Quản lý secret/OIDC.
- [ ] Xử lý lock/apply/import/recovery.

# 22. 🃏 FLASHCARDS

**Q:** State là gì? **A:** Mapping code resource với object thực.  
**Q:** Plan dùng làm gì? **A:** Xem diff trước apply.  
**Q:** Lock? **A:** Ngăn apply concurrent làm hỏng state.  
**Q:** Drift? **A:** Cloud state khác code/state mong muốn.  
**Q:** Terraform rollback? **A:** Revert code/plan có kiểm soát, không tự phục hồi data.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu state/plan/apply/dependency/drift.  
🟠 Nắm backend/lock/module/import/policy.  
🟡 Biết state migration, plan security và cost governance.

# 24. 🎯 LIÊN HỆ VỚI JD

Terraform phục vụ IaC, repeatable provisioning, change review, cloud operations, DR và cost/permission governance.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu module, backend, resource, pipeline, policy và incident thực tế; không nhận đã quản lý state Production nếu chỉ viết resource local.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Tách state network/security/data/compute, backend có lock/versioning, account/region guardrail, tag/cost policy, PR plan và break-glass audit.

# 27. 🧪 HANDS-ON LAB

Tạo VPC module; remote backend/lock; đổi resource; tạo drift console; import object; mô phỏng lock/apply fail; kiểm tra plan và recovery.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Init → backend/provider/auth; plan → code/data/permission/drift; apply → dependency/quota/API; lock → active/stale job; recovery → state backup/plan/import.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review backend encryption/versioning/lock, state access, provider/module pin, plan approval, OIDC, policy, tags/cost, backup, destroy protection và recovery.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| HCL/module | ☐ | ☐ | ☐ |
| State/backend | ☐ | ☐ | ☐ |
| Plan/apply/drift | ☐ | ☐ | ☐ |
| Security/policy | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: state/lock, module, plan/apply, drift/import, secret/OIDC, dependency, zero-downtime, policy và recovery.

# 32. 📋 FINAL CHECKLIST

- [ ] State được bảo vệ và lock đúng.
- [ ] Module/provider pin version.
- [ ] Mọi apply đi qua plan/approval.
- [ ] Có drift, failure và recovery runbook.
- [ ] Kiểm soát IAM, cost, tags và secret.

---
END OF FILE
