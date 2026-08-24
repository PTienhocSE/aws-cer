# [40] SECRET MANAGEMENT & EXTERNAL SECRETS

> **Phase:** 3 — DevOps Core
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** IAM/RBAC, TLS, Kubernetes, KMS, Vault/Secrets Manager, CI/CD

# 1. 🎯 MỤC TIÊU HỌC

Thiết kế secret lifecycle: create, access, inject, rotate, revoke, audit, backup và recovery; dùng Kubernetes Secret, AWS Secrets Manager/Parameter Store, Vault/External Secrets; tránh leak qua Git/log/image/process.

# 2. 🧠 KIẾN THỨC NỀN

Ôn encryption at rest/in transit, IAM/RBAC, ServiceAccount/OIDC, TLS certificate, environment variable/file mount, Git history, CI masking và application reload.

# 3. 📚 TỔNG QUAN

Secret management không chỉ là mã hóa một giá trị. Cần kiểm soát ai đọc được, secret tồn tại bao lâu, được rotate/revoke thế nào, app nhận version nào và evidence access ở đâu.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Operator/automation -> secret manager (KMS/encryption/audit)
                    -> External Secrets/CSI/SDK
                    -> Kubernetes Secret or app runtime
                    -> workload uses credential -> rotation/reload
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Secret manager, KMS/key policy, IAM/OIDC, ExternalSecret/SecretStore, Kubernetes Secret, CSI Secret Store, Vault agent, rotation function, audit log, admission/secret scanner và application reload.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** base64 không phải encryption; Secret object cần encryption at rest/RBAC.  
**Trung cấp:** secret external source, sync interval/version, file vs env injection, rotation/reload và least privilege.  
**Nâng cao:** dynamic database credential, short-lived token, envelope encryption, break-glass, multi-region replication và secret zeroization.

# 7. 🌍 VÍ DỤ THỰC TẾ

App dùng ServiceAccount/IRSA đọc một secret path trong Secrets Manager; External Secrets sync thành K8s Secret; Deployment restart/reload khi version đổi; audit KMS/secret access gửi SIEM.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Kiểm tra bằng `kubectl get/describe secret`, `kubectl auth can-i get secrets`, `aws secretsmanager get-secret-value`, `aws kms describe-key`, `vault token lookup`, secret scanner, `git log -S`, `kubectl describe externalsecret` và controller logs. Không in giá trị secret.

# 9. 📝 LOG

Audit secret manager/KMS, IAM access, External Secrets sync, rotation event và application auth failure. Log actor/path/version/result, không log payload. Correlate bằng request ID và secret version.

# 10. 📊 METRIC

Access denied, sync failure/lag, rotation age, expired certificate, secret version mismatch, auth failure, controller health, dynamic credential issuance và unauthorized access alert.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: orders-db
  namespace: orders
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets
    kind: ClusterSecretStore
  target:
    name: orders-db
    creationPolicy: Owner
  data:
    - secretKey: username
      remoteRef:
        key: prod/orders/database
        property: username
```

IAM role của controller/workload chỉ được đọc path cần thiết; KMS key policy không mở rộng hơn data access.

# 12. 🔧 TROUBLESHOOTING

Secret không sync → SecretStore/provider/role/trust/network/version; Pod không start → key/name/namespace/permission; app auth fail → version/format/rotation/reload; leak → revoke/rotate/audit/contain.

# 13. 🚨 PRODUCTION INCIDENT

1. **ExternalSecret sync fail:** đọc status/events/controller/IAM/secret path và giữ secret version cũ nếu còn hợp lệ.  
2. **Credential hết hạn:** xác định app reload/rotation, tạo credential mới, chuyển traffic rồi revoke cũ.  
3. **Secret lộ Git/log:** revoke/rotate ngay, audit access, remove history theo quy trình và scan toàn repo/artifact.  
4. **KMS AccessDenied:** kiểm tra caller/trust/key policy/SCP/region; không bypass bằng key admin.  
5. **Rotation làm outage:** giữ phiên bản cũ trong grace period, rollback secret version, sửa reload/connection pool rồi retry.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| K8s Secret | tích hợp native | cần encryption/RBAC/rotation |
| Secrets Manager | rotation/audit/managed | cost/provider lock-in |
| Vault | dynamic secret/multi-cloud | vận hành HA/unseal |
| Env var | dễ dùng | leak dump/log/process |
| File/CSI | permission/reload tốt | app phải đọc/reload |
| External sync | Git không chứa secret | sync lag/controller dependency |

# 15. ❌ COMMON MISTAKES

Base64 bị coi là encryption; Secret trong Git/Docker image/log; cluster-admin cho external controller; không rotate; không audit; mount secret rộng; đổi secret nhưng app không reload; không test revoke/restore.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

Base64 có an toàn không? Secret native bảo vệ thế nào? ExternalSecret flow? Env vs file? Rotation không downtime ra sao? KMS/IAM khác gì? Khi leak secret làm gì trước?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế secret cho EKS; Vault vs Secrets Manager; External Secrets; rotation database/TLS; RBAC/KMS; secret leak; dynamic credential; disaster recovery.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em giữ secret ngoài Git, mã hóa bằng KMS/Vault, cấp quyền qua workload identity tối thiểu, sync bằng External Secrets hoặc CSI, audit access và có rotation/reload. Khi lộ, em revoke/rotate trước, xác định blast radius/audit rồi mới cleanup và prevention.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu lifecycle và blast radius, không chỉ nói “dùng Secret”. Hãy nói version, access policy, rotation, reload, audit và recovery.

# 20. 🌳 FOLLOW-UP QUESTION TREE

App auth fail → secret version/path → sync/controller → IAM/KMS → rotation/reload → rollback/revoke/audit.

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Không lưu plaintext secret trong Git/image/log.
- [ ] Thiết kế source/access/rotation/revoke.
- [ ] Debug ExternalSecret/KMS/IAM.
- [ ] App reload secret không downtime.
- [ ] Có leak/backup/recovery runbook.

# 22. 🃏 FLASHCARDS

**Q:** Base64 có mã hóa không? **A:** Không, chỉ encoding.  
**Q:** Rotation? **A:** Thay credential trước khi hết hạn và revoke credential cũ.  
**Q:** ExternalSecret? **A:** Đồng bộ secret từ external provider vào cluster.  
**Q:** Sau leak? **A:** Revoke/rotate, audit blast radius, cleanup và prevention.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu identity/encryption/lifecycle/blast radius.  
🟠 Nắm KMS/IAM/RBAC/ExternalSecret/rotation.  
🟡 Biết dynamic credential, Vault HA và secret zeroization.

# 24. 🎯 LIÊN HỆ VỚI JD

Secret management là phần bắt buộc của DevOps security, CI/CD, Kubernetes runtime, cloud IAM và incident response.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu cụ thể provider, integration, IAM/OIDC, rotation và incident đã làm; không nhận kinh nghiệm secret Production chỉ vì từng dùng Kubernetes Secret.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Central secret manager, KMS key separation, namespace/workload identity, External Secrets, dynamic DB credential, certificate rotation, SIEM audit và break-glass approval.

# 27. 🧪 HANDS-ON LAB

Tạo secret manager/KMS test; ExternalSecret sync; test RBAC deny; rotate credential; verify app reload; cố ý leak vào branch và thực hành revoke/audit.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Source/path/version → controller/sync → IAM/KMS/network → K8s Secret/RBAC → app reload/format → auth/rotation/revoke.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review encryption, key policy, workload identity, namespace scope, sync/refresh, rotation/reload, audit/alert, backup, revoke, break-glass và secret scanner.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Secret lifecycle | ☐ | ☐ | ☐ |
| IAM/KMS/RBAC | ☐ | ☐ | ☐ |
| External sync | ☐ | ☐ | ☐ |
| Rotation/recovery | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: base64/encryption, KMS/IAM/RBAC, External Secrets, rotation/reload, leak response, dynamic credential, audit và recovery.

# 32. 📋 FINAL CHECKLIST

- [ ] Secret không nằm trong Git/image/log.
- [ ] Access least privilege và encrypted.
- [ ] Có rotation/reload/revoke.
- [ ] Audit và alert đầy đủ.
- [ ] Xử lý được leak, sync fail và KMS/IAM incident.

---
END OF FILE
