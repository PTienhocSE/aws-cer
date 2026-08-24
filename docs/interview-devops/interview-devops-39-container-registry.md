# [39] CONTAINER REGISTRY & IMAGE SUPPLY CHAIN

> **Phase:** 3 — DevOps Core
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Docker, OCI image, CI/CD, Kubernetes, IAM, vulnerability scanning

# 1. 🎯 MỤC TIÊU HỌC

Hiểu OCI image/layer/tag/digest, private registry/ECR/Harbor, authentication, retention, scanning, signing, SBOM, promotion, pull-through cache, replication và incident response.

# 2. 🧠 KIẾN THỨC NỀN

Dockerfile/layer/cache, HTTP registry API, IAM, TLS, imagePullSecret, Kubernetes deployment, CI artifact và software supply-chain risk.

# 3. 📚 TỔNG QUAN

Registry lưu image/package để runtime pull. Tag là mutable pointer; digest là immutable content identity. Production nên deploy digest, scan/sign image và kiểm soát ai push/pull/delete.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Source -> CI build -> scan/SBOM/sign -> private registry
      -> promote digest -> Kubernetes/EC2 pull
      -> admission verifies registry/signature/policy
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Registry endpoint, repository, tag/digest, manifest/index, layer/blob store, auth/token, TLS, scanner, signer/attestation, replication, retention/GC và audit.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

Image manifest trỏ đến config/layers; multi-arch image dùng manifest index. Tag có thể bị overwrite; digest không đổi. Scan lúc build chưa thay runtime risk; cần policy/admission và base image update.

# 7. 🌍 VÍ DỤ THỰC TẾ

CI push ECR image bằng commit tag, lấy digest, scan/SBOM/sign, cập nhật GitOps repo bằng digest. Cluster private pull qua VPC endpoint và node/Pod identity tối thiểu.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Các lệnh: `docker build`, `docker inspect`, `docker history`, `docker manifest inspect`, `docker push/pull`, `crane digest`, `skopeo inspect`, `trivy image`, `cosign verify`, `aws ecr describe-images`, `aws ecr batch-delete-image` và `kubectl describe pod`.

# 9. 📝 LOG

Audit push/pull/delete, auth/token failure, scan/sign result, image digest, repository, actor, source IP, workload/node và registry latency. Không log credential hoặc registry token.

# 10. 📊 METRIC

Pull/push success, latency, 401/403/429/5xx, cache hit, storage growth, scan backlog, vulnerable image count, stale tag, replication lag và failed deployment due image.

# 11. ⚙️ CONFIGURATION

Private repo, TLS, immutable tag policy, encryption/KMS, retention, scan-on-push, signed digest requirement, cross-account pull role, VPC endpoint, lifecycle policy và backup/replication.

# 12. 🔧 TROUBLESHOOTING

`ImagePullBackOff` → image/tag/digest → registry DNS/TLS/network → auth/imagePullSecret/IAM → architecture mismatch → quota/rate limit → node runtime/cache.

# 13. 🚨 PRODUCTION INCIDENT

1. **ImagePullBackOff:** đọc Pod Events, kiểm tra digest/tag, registry/auth/network và architecture.  
2. **Registry 429:** xem rate limit/cache/pull storm, bật pull-through cache hoặc scale registry.  
3. **Critical CVE:** identify deployed digest, block promotion, patch/rebuild base image và rollout.  
4. **Tag bị overwrite:** xác định digest đã chạy, lock immutable tags và chuyển deployment sang digest.  
5. **Registry mất region:** dùng replica/cache/DR registry, verify artifact provenance và pull quyền cross-region.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| ECR managed | tích hợp AWS/IAM | phụ thuộc region/cost |
| Harbor | control/scanning/replication | vận hành chính mình |
| Public registry | dễ dùng | rate/security/supply-chain |
| Tag | human-friendly | mutable |
| Digest | immutable/traceable | khó đọc |
| Pull-through cache | giảm latency/rate | stale/cache policy |

# 15. ❌ COMMON MISTAKES

Deploy `latest`; không scan/sign; registry public; image chạy root; Dockerfile secret; retention xóa image đang dùng; không pin base image/digest; pull bằng shared admin credential.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

Tag khác digest? Layer/manifest là gì? Vì sao imagePull fail? Scan/sign/SBOM khác nhau thế nào? ECR pull cần quyền gì? Registry outage giảm impact ra sao? GC có rủi ro gì?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế registry private; image promotion; ECR/Harbor; digest/signature; CVE response; ImagePullBackOff; retention/replication; supply-chain security.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em build một lần, scan/SBOM/sign, push private registry và promote bằng digest. Runtime pull qua identity tối thiểu/private endpoint; admission chỉ cho registry/digest hợp lệ. Khi pull fail em kiểm tra Events, digest, auth, network, node runtime rồi verify rollout.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Luôn nói image nào, digest nào, actor nào, registry nào và supply-chain evidence nào; không chỉ nói “đã push Docker image”.

# 20. 🌳 FOLLOW-UP QUESTION TREE

Image pull fail → tag/digest → DNS/TLS/network → auth/IAM → architecture/quota → node runtime/cache → rollback.

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu tag/digest/layer/manifest.
- [ ] Push/pull/scanning/signing.
- [ ] Cấu hình IAM/private registry/retention.
- [ ] Debug ImagePullBackOff.
- [ ] Có CVE/registry outage runbook.

# 22. 🃏 FLASHCARDS

**Q:** Digest là gì? **A:** Identity bất biến của content.  
**Q:** Tag có bất biến không? **A:** Không, nếu registry không enforce immutable tag.  
**Q:** ImagePullBackOff kiểm tra gì? **A:** Events, image, auth, network, quota và runtime.  
**Q:** SBOM? **A:** Danh sách thành phần/phụ thuộc trong image.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu digest/supply chain/registry trust.  
🟠 Nắm push/pull/scan/sign/auth/retention.  
🟡 Biết OCI index, replication, cache và provenance.

# 24. 🎯 LIÊN HỆ VỚI JD

Registry là nền tảng container delivery, Kubernetes runtime, security scan và release traceability.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu registry, auth, scan, digest, promotion và incident thật; không coi build image local là registry operation.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Private registry theo team, signed image, scan-on-push, ECR/Harbor replication, VPC endpoint, least-privilege pull role, lifecycle policy và DR artifact.

# 27. 🧪 HANDS-ON LAB

Build image; inspect layers/digest; push private repo; scan/sign; deploy digest; test bad credential/tag; test retention/replication và rollback.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Pod event → image/digest → registry DNS/TLS → auth/IAM → network/rate/quota → architecture → node runtime/cache.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review TLS/encryption, IAM, immutable tags, digest deployment, scan/sign/admission, retention/GC, replication, cache, audit, backup và CVE response.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Image/OCI | ☐ | ☐ | ☐ |
| Registry ops | ☐ | ☐ | ☐ |
| Scan/sign | ☐ | ☐ | ☐ |
| Runtime pull | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: tag/digest, ImagePullBackOff, auth/IAM, private registry, scan/SBOM/sign, retention, replication và CVE response.

# 32. 📋 FINAL CHECKLIST

- [ ] Deploy bằng immutable digest.
- [ ] Registry private và IAM tối thiểu.
- [ ] Scan/sign/admission policy.
- [ ] Có retention/replication/backup.
- [ ] Debug được pull và supply-chain incident.

---
END OF FILE
