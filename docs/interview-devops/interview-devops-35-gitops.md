# [35] GITOPS PRINCIPLES

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Git, Kubernetes, CI/CD, Helm/Kustomize, RBAC

# 1. 🎯 MỤC TIÊU HỌC

Hiểu Git là source of truth, pull/reconciliation model, desired/current state, drift, promotion, rollback, secret, multi-environment, access control và incident response của GitOps.

# 2. 🧠 KIẾN THỨC NỀN

Git branch/PR/tag, Kubernetes declarative API/controller, Helm/Kustomize, container image digest, RBAC, CI build và observability.

# 3. 📚 TỔNG QUAN

GitOps lưu desired state trong Git; agent trong cluster pull và reconcile. CI build/test/publish artifact, còn CD/GitOps thay đổi manifest và agent áp dụng. GitOps cung cấp audit/revert nhưng không tự giải quyết Secret, migration hay bad desired state.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Developer PR -> review/checks -> Git desired state
                           -> GitOps agent pull
                           -> render/apply/reconcile
                           -> cluster current state
                           -> health/alert/drift
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Application repo, environment/config repo, Git review/protection, renderer, GitOps agent, API server, secret provider, image updater, health check, sync status và audit.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** desired/current state, pull model, declarative manifest, PR audit.  
**Trung cấp:** environment promotion, overlays, drift/self-heal, sync waves, rollback Git commit.  
**Nâng cao:** multi-cluster tenancy, progressive delivery, policy-as-code, image digest automation, disaster recovery của GitOps control plane.

# 7. 🌍 VÍ DỤ THỰC TẾ

CI build image `sha256`, cập nhật digest trong environment repo bằng PR, GitOps sync staging, smoke test, promote commit sang Production; manual kubectl change bị phát hiện drift và reconcile.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Các thao tác: `git diff`, `git log`, `git revert`, `helm template`, `kustomize build`, `kubectl diff -f`, `kubectl get events`, xem sync/health/drift trên GitOps controller và audit Git.

# 9. 📝 LOG

Correlate commit SHA, PR, renderer output, sync operation, API audit, controller log, deployment revision và health check. Lưu actor/approval và phân biệt manual drift với controller failure.

# 10. 📊 METRIC

Sync success/failure, reconciliation lag, drift count, deployment lead time, rollback/change failure, health status, controller queue, API error/throttle và time-to-recovery.

# 11. ⚙️ CONFIGURATION

Repo phải tách base/overlay hoặc values theo environment, pin image digest, validate schema/policy, không lưu Secret plaintext, protected branch, CODEOWNERS, required checks và promotion bằng commit.

# 12. 🔧 TROUBLESHOOTING

Desired sai → kiểm tra PR/render/policy; agent không sync → repo/auth/network/controller; sync fail → API/RBAC/admission/immutable field; sync xong app lỗi → Pod/config/dependency; drift lặp → manual actor/operator/field manager.

# 13. 🚨 PRODUCTION INCIDENT

1. **Bad manifest sync:** stop auto-sync nếu cần, revert commit, verify health và audit impact.  
2. **Drift liên tục:** tìm manual change/operator/field conflict, xác định owner và sửa source of truth.  
3. **GitOps agent mất kết nối:** kiểm tra repo credential/network/API/controller; cluster giữ current state nhưng không nhận update mới.  
4. **Secret commit vào repo:** revoke/rotate, audit clone/log, rewrite history theo quy trình và chuyển external secret.  
5. **Promotion nhầm Production:** khóa branch/environment, rollback commit/digest và sửa approval/path rule.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Mô hình | Mạnh | Trade-off |
|---|---|---|
| Push CD | feedback trực tiếp | pipeline giữ cluster credential |
| Pull GitOps | audit/reconcile, ít inbound quyền | agent/repo availability |
| Monorepo | discoverability | blast radius/ownership |
| Env repo riêng | isolation/approval | promotion coordination |
| Helm | package/template | values complexity |
| Kustomize | patch rõ | overlay discipline |

# 15. ❌ COMMON MISTAKES

Gọi GitOps chỉ là lưu YAML; để CI có cluster-admin; manual kubectl là workflow thường xuyên; image tag mutable; Secret plaintext; không test rollback; auto-sync bad commit không có guardrail.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

GitOps khác CI/CD push thế nào? Desired/current state là gì? Drift xử lý ra sao? Agent mất kết nối ảnh hưởng gì? Secret quản lý thế nào? Promotion/rollback bằng gì? Bad manifest đã sync thì làm gì?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế repo multi-env; GitOps security; drift/self-heal; promotion; rollback; Secret; multi-cluster; image digest automation; agent outage.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

CI tạo artifact immutable; GitOps chỉ thay desired state bằng PR có review/policy. Agent pull, render và reconcile; health/sync/drift được monitor. Khi bad commit, revert Git để agent converge, verify runtime và xử lý riêng data migration/Secret.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu rõ source of truth, quyền nào nằm ở đâu, cách tránh drift, cách rollback và behavior khi GitOps agent/repo/API unavailable.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
App lỗi sau sync?
 -> commit/render?
 -> sync/health?
 -> Pod/config/secret/dependency?
 -> revert/rollback?
 -> drift/prevention?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Phân biệt CI build và GitOps delivery.
- [ ] Hiểu pull/reconcile/drift.
- [ ] Thiết kế repo/promotion/multi-env.
- [ ] Quản lý Secret/image digest.
- [ ] Rollback và xử lý agent outage.

# 22. 🃏 FLASHCARDS

**Q:** Source of truth là gì? **A:** Desired state được review trong Git.  
**Q:** Drift là gì? **A:** Current state khác desired state.  
**Q:** Pull model? **A:** Agent trong cluster lấy thay đổi từ Git.  
**Q:** Rollback GitOps? **A:** Revert desired-state commit và verify convergence.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu desired/current state, reconcile, drift và ownership.  
🟠 Nắm PR/promotion/render/sync/rollback.  
🟡 Biết policy, progressive delivery và multi-cluster.

# 24. 🎯 LIÊN HỆ VỚI JD

GitOps liên quan trực tiếp deployment reliability, audit, change control, Kubernetes operation và automation.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu repo model, promotion, agent, policy, secret và rollback thật; không gọi mọi pipeline deploy là GitOps.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

App source tách env repo, CODEOWNERS theo team, PR policy, private registry, external Secret, ArgoCD per cluster, progressive delivery và audit/SIEM.

# 27. 🧪 HANDS-ON LAB

Tạo app repo/env repo; build image digest; PR thay manifest; sync cluster test; tạo manual drift; revert bad commit; test Secret rotation và agent outage.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Repo/PR → render/policy → agent/repo auth/network → API/RBAC/admission → sync/health → workload/dependency → revert/verify.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review branch/approval, repo credential, agent RBAC, Secret, image digest, policy, sync window, health, drift, rollback, Git backup và controller HA.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| GitOps concept | ☐ | ☐ | ☐ |
| Repo/promotion | ☐ | ☐ | ☐ |
| Sync/drift | ☐ | ☐ | ☐ |
| Security/Secret | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: pull/reconcile, desired/current, drift, repo/promotion, Secret, image digest, agent outage, bad sync và rollback.

# 32. 📋 FINAL CHECKLIST

- [ ] Mô tả GitOps pull/reconciliation.
- [ ] Thiết kế repo/env/promotion.
- [ ] Kiểm soát Secret, permission và image.
- [ ] Debug sync/drift/agent/API.
- [ ] Rollback bằng Git và verify runtime.

---
END OF FILE
