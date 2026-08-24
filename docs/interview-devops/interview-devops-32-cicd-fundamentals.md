# [32] CI/CD PIPELINE FUNDAMENTALS

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Git, Linux, Docker, registry, Kubernetes/AWS basics

# 1. 🎯 MỤC TIÊU HỌC

Thiết kế pipeline từ commit đến Production; phân biệt CI/CD/GitOps; quản lý artifact, runner, secret, test, approval, rollback, quality gate và DORA metrics.

# 2. 🧠 KIẾN THỨC NỀN

Git commit/tag, semantic version, image/package registry, test pyramid, environment separation, IAM/OIDC, Kubernetes rollout và change management.

# 3. 📚 TỔNG QUAN

CI tự động build/test mỗi thay đổi. CD đưa artifact đã kiểm chứng tới environment. Nên build một lần rồi promote cùng image/package digest; không build lại khác nhau cho staging và Production.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

`Commit/PR → lint/unit → build → scan → publish artifact → integration/e2e → approval → deploy/canary → health verification → promote/rollback`.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Trigger, runner, build environment, cache, test service, registry, scanner, OIDC/secret, deploy controller, approval, notification và audit.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** stage/job/step, artifact khác log, variable khác secret, commit SHA truy được tới digest.  
**Trung cấp:** parallel/matrix, cache không chứa secret, protected branch/environment, promotion và rollback.  
**Nâng cao:** progressive delivery, SBOM, provenance, policy-as-code, ephemeral runner và separation of duties.

# 7. 🌍 VÍ DỤ THỰC TẾ

PR chạy lint/unit/security; merge main build image digest và publish ECR; staging tự deploy; smoke/e2e pass mới approval Production; canary rồi rollback nếu SLO/error budget xấu.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Các lệnh quan trọng: `git diff --check`, `git rev-parse HEAD`, `docker build`, `docker inspect`, `docker push @digest`, `trivy image`, `helm template`, `kubectl rollout status` và `kubectl rollout undo`. Mỗi lệnh phải gắn với một evidence cụ thể.

# 9. 📝 LOG

Giữ job log, commit SHA, runner ID, image/package digest, test/scan report, approval actor, deployment revision và rollback reason. Mask secret nhưng giữ audit evidence.

# 10. 📊 METRIC

Deployment frequency, lead time, change failure rate, MTTR, queue/job duration, flaky test rate, cache hit, deployment latency và rollback count.

# 11. ⚙️ CONFIGURATION

Pipeline phải tách build/test/deploy permission, pin base image/action, có timeout/retry giới hạn, concurrency, protected environment, approval và artifact retention.

# 12. 🔧 TROUBLESHOOTING

Pipeline fail → stage/job/exit code → runner/dependency/cache → test/scan → registry/auth → manifest/RBAC/admission → rollout/probe/config → health/rollback.

# 13. 🚨 PRODUCTION INCIDENT

1. **Artifact sai digest:** đối chiếu commit/registry/deployed digest, dừng promotion và rollback artifact đúng.  
2. **Runner bị compromise:** disable runner/token, rotate credential, kiểm tra audit/artifact và chuyển ephemeral runner.  
3. **Pipeline xanh nhưng Production lỗi:** so sánh env/config/secret/dependency, rollback rồi bổ sung parity/smoke test.  
4. **Queue quá lâu:** kiểm tra runner capacity/concurrency/quota/cache, không tăng timeout vô hạn.  
5. **Rollback không cứu data:** tách code rollback khỏi schema/data migration, dùng backward-compatible migration hoặc PITR.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| Trunk-based | feedback nhanh | cần test/feature flag |
| GitFlow | release branch rõ | merge chậm |
| Build một lần promote | traceability | cần config separation |
| Long-lived runner | dễ setup | contamination/security |
| Ephemeral runner | isolation | startup/cost |

# 15. ❌ COMMON MISTAKES

Dùng `latest`; build lại khi promote; Secret trong log/YAML; pipeline có cluster-admin; bỏ qua flaky test; không health verify/rollback; quên data migration.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

CI khác CD thế nào? Vì sao build một lần promote? Digest dùng làm gì? Runner cần cô lập ra sao? OIDC tốt hơn long-lived key ở đâu? Rollback code khác data thế nào? DORA metrics gồm gì?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế pipeline microservice; deploy không downtime; xử lý flaky test/scan; bảo mật runner; canary fail; CI/CD khác GitOps; rollback migration.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em build artifact immutable từ commit, test/scan/quality gate, publish digest, deploy staging rồi promote cùng digest qua approval/canary. Credential dùng OIDC ngắn hạn, runner hạn quyền. Khi lỗi, rollback release và kiểm tra riêng schema/data migration, sau đó verify SLO.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu trigger, evidence, gate, ownership, security, health verification và rollback; pipeline xanh không đồng nghĩa runtime khỏe.

# 20. 🌳 FOLLOW-UP QUESTION TREE

Pipeline xanh nhưng deploy lỗi → artifact/digest → config/secret → RBAC/admission → Pod/probe/dependency → rollback/data migration.

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Thiết kế build-test-scan-publish-deploy.
- [ ] Truy commit tới artifact/deployment.
- [ ] Quản lý runner/secret/approval.
- [ ] Có canary, verification và rollback.
- [ ] Đo DORA/failure rate.

# 22. 🃏 FLASHCARDS

**Q:** Artifact immutable? **A:** Không đổi sau publish, nhận diện bằng digest.  
**Q:** CI? **A:** Tích hợp code và kiểm tra tự động.  
**Q:** CD? **A:** Đưa artifact đã kiểm chứng tới environment.  
**Q:** OIDC? **A:** Credential ngắn hạn theo workflow.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu artifact flow, gate, promotion, rollback/runtime verification.  
🟠 Nắm Git/registry/runner/scan/deploy.  
🟡 Biết SLSA, SBOM, DORA và progressive delivery.

# 24. 🎯 LIÊN HỆ VỚI JD

CI/CD là năng lực DevOps cốt lõi: tự động delivery nhưng vẫn bảo đảm security, reliability, audit và rollback.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu pipeline stages, runner, registry, deploy target, approval, rollback và metric thật; không chỉ ghi “biết CI/CD”.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Protected branch, isolated runner, private registry, OIDC, SBOM/scan, staging gate, canary Production, audit và change approval.

# 27. 🧪 HANDS-ON LAB

Tạo pipeline lint/test/build image; push digest; deploy staging; cố ý probe fail để rollback; thêm scan/SBOM/approval và promotion.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Trigger → runner → dependency/cache → test/scan → registry/auth → manifest/RBAC → rollout/probe → SLO/rollback.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review permission separation, OIDC, runner isolation, immutable artifact, scan, approval, environment protection, retry, observability, rollback và migration.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Pipeline | ☐ | ☐ | ☐ |
| Artifact/security | ☐ | ☐ | ☐ |
| Deploy/rollback | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Immutable artifact, runner security, quality gate, promotion, OIDC, canary, rollback, DORA và data migration.

# 32. 📋 FINAL CHECKLIST

- [ ] Pipeline có gate và audit.
- [ ] Build một lần, promote bằng digest.
- [ ] Credential/runner cô lập.
- [ ] Deploy có health verification/rollback.
- [ ] Xử lý được pipeline và Production incident.

---
END OF FILE
