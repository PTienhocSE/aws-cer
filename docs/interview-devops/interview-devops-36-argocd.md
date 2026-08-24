# [36] ARGOCD & GITOPS OPERATIONS

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** GitOps, Kubernetes, Helm/Kustomize, RBAC, Git repositories

# 1. 🎯 MỤC TIÊU HỌC

Hiểu ArgoCD components, Application/ApplicationSet, repo credential, project/RBAC, sync/health, automated sync, prune/self-heal, hooks/waves, multi-cluster, notifications và rollback.

# 2. 🧠 KIẾN THỨC NỀN

Ôn Kubernetes API/RBAC, Git refs, Helm/Kustomize rendering, GitOps desired state, network/TLS/SSH, Secret management và deployment health.

# 3. 📚 TỔNG QUAN

ArgoCD là pull-based GitOps controller. Nó render manifests từ Git/Helm/Kustomize, so sánh desired với live state, báo OutOfSync/Degraded và sync theo policy. ArgoCD không tự sửa lỗi application hoặc database migration.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Git repo -> repo-server/render -> application-controller -> Kubernetes API
                                   |                    -> live resources
                                   +-> diff/sync/health/notifications
API/UI/CLI -> argocd-server -> RBAC/project
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

argocd-server, repo-server, application-controller, Redis/cache, Application, ApplicationSet, AppProject, repository credential, cluster credential, sync/health/custom resource health và notification.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

`OutOfSync` là desired/live khác; `Degraded` là health không đạt. Automated sync có thể prune/self-heal; sync wave/hook điều phối thứ tự. AppProject giới hạn source repo, destination cluster/namespace và resource kind.

# 7. 🌍 VÍ DỤ THỰC TẾ

Một Application trỏ env repo/Helm values staging; ApplicationSet tạo app cho nhiều cluster; Production auto-sync chỉ sau PR approval, prune có guardrail, health custom cho workload và notification tới on-call.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
argocd login <server>
argocd app list
argocd app get <app>
argocd app diff <app>
argocd app sync <app> --dry-run
argocd app sync <app> --prune
argocd app history <app>
argocd app rollback <app> <id>
argocd app manifests <app>
kubectl get app,appproject,applicationset -n argocd
```

# 9. 📝 LOG

Đọc application-controller sync log, repo-server render/auth log, argocd-server audit, Kubernetes Events và workload log. Correlate app name, Git revision, sync operation ID, cluster/server và resource UID.

# 10. 📊 METRIC

App sync/health status, reconciliation lag, render/error count, API latency, queue depth, repo fetch failure, controller restart, drift count, deployment/rollback duration và notification failure.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: orders-staging
  namespace: argocd
spec:
  project: platform
  source:
    repoURL: https://github.com/example/platform-config.git
    targetRevision: main
    path: apps/orders/overlays/staging
  destination:
    server: https://kubernetes.default.svc
    namespace: orders
  syncPolicy:
    automated:
      selfHeal: true
      prune: false
    syncOptions:
      - CreateNamespace=true
```

Production nên tách project/permission và cân nhắc prune/self-heal theo resource risk.

# 12. 🔧 TROUBLESHOOTING

```text
App Unknown -> repo-server/repo credential/network
InvalidSpec -> path/Helm values/Kustomize/render
OutOfSync -> diff/ignore rule/manual drift
Sync failed -> API/RBAC/admission/immutable field
Synced but Degraded -> health/probe/dependency
Auto-sync loop -> operator/field manager/mutating webhook
```

# 13. 🚨 PRODUCTION INCIDENT

1. **Render failed:** xem repo-server log, commit/path/dependency/values và revert commit nếu cần.  
2. **Sync rejected:** đọc resource error/RBAC/admission, không retry mù.  
3. **Bad auto-sync:** suspend automation hoặc revert Git, verify health và audit resource impact.  
4. **OutOfSync loop:** tìm manual actor/operator/webhook/ignore rule và xác định source owner.  
5. **Controller unavailable:** cluster giữ state hiện tại nhưng delivery dừng; khôi phục repo-server/controller, kiểm tra queue rồi sync có kiểm soát.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Cơ chế | Mạnh | Trade-off |
|---|---|---|
| Manual sync | kiểm soát cao | chậm, human error |
| Auto-sync | feedback nhanh | bad commit blast radius |
| Self-heal | sửa drift | can conflict with legitimate emergency change |
| Prune | cleanup desired | xóa resource nguy hiểm |
| ApplicationSet | multi-cluster/app scale | template/ownership complexity |
| Sync wave | thứ tự deploy | hook/wave deadlock |

# 15. ❌ COMMON MISTAKES

Auto-prune Production không guardrail; ArgoCD có cluster-admin; dùng `argocd app sync` thay PR; ignore diff che lỗi; repo credential long-lived; không backup repo/Argo config; rollback code nhưng quên data migration.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

ArgoCD so sánh desired/live thế nào? OutOfSync khác Degraded? Repo-server làm gì? AppProject bảo vệ gì? Self-heal/prune rủi ro gì? Sync wave/hook dùng khi nào? Controller down ảnh hưởng gì?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế ArgoCD multi-cluster; phân quyền Project; xử lý OutOfSync; auto-sync/prune; render failure; sync wave; rollback; controller outage; secret integration.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em tách repo/project/cluster permission, render/diff trước sync, giới hạn source/destination/resource, dùng auto-sync phù hợp và health check. Khi lỗi em phân biệt render, sync và runtime health; revert desired state/rollback, verify SLO và điều tra drift/actor thay vì retry mù.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu rõ Git revision, rendered manifest, live object, sync operation và health evidence. ArgoCD chỉ điều phối desired state; application/data reliability vẫn cần runbook riêng.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
OutOfSync?
 -> diff thực tế?
 -> manual/operator/webhook?
 -> render/repo?
Sync fail?
 -> API/RBAC/admission/immutable?
Synced nhưng Degraded?
 -> Pod/probe/dependency/health custom?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu ArgoCD components/Application/Project.
- [ ] Debug render, sync, drift và health.
- [ ] Cấu hình repo/cluster/RBAC an toàn.
- [ ] Dùng auto-sync/prune/self-heal có policy.
- [ ] Có rollback/controller outage runbook.

# 22. 🃏 FLASHCARDS

**Q:** `OutOfSync` là gì? **A:** Desired state khác live state.  
**Q:** `Degraded` là gì? **A:** Resource health không đạt.  
**Q:** Repo-server làm gì? **A:** Fetch/render manifests.  
**Q:** Self-heal? **A:** Reconcile live drift về desired state.  
**Q:** Prune? **A:** Xóa resource không còn trong desired state.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu desired/live diff, render/sync/health.  
🟠 Nắm Application, Project, ApplicationSet, CLI/log.  
🟡 Biết waves/hooks, custom health, notifications và multi-cluster.

# 24. 🎯 LIÊN HỆ VỚI JD

ArgoCD là kỹ năng GitOps delivery, deployment audit, drift control và Kubernetes operations.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu rõ app/project/repo model, sync strategy, secret, rollback, multi-cluster và incident đã làm.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

ArgoCD HA trong management cluster, AppProject theo team, ApplicationSet multi-cluster, private repo, external Secret, protected Production promotion, notifications và audit.

# 27. 🧪 HANDS-ON LAB

Tạo App từ Kustomize/Helm; test diff/sync; cố ý manual drift; bật self-heal; test prune an toàn; tạo render/sync failure; rollback revision và test ApplicationSet.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Repo/auth/render → Application spec → diff → API/RBAC/admission → sync waves/hooks → resource health → drift/actor → rollback.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review controller HA, repo/cluster credential, Project RBAC, source/destination restriction, prune/self-heal, health, sync window, audit, notification, backup và rollback.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Application/Project | ☐ | ☐ | ☐ |
| Render/sync | ☐ | ☐ | ☐ |
| Drift/health | ☐ | ☐ | ☐ |
| Multi-cluster/security | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: OutOfSync/Degraded, repo-server, Application/Project, RBAC, auto-sync/prune/self-heal, hooks/waves, rollback và controller outage.

# 32. 📋 FINAL CHECKLIST

- [ ] Mô tả ArgoCD reconciliation.
- [ ] Debug render/sync/health/drift.
- [ ] Giới hạn project/source/destination/quyền.
- [ ] Dùng auto-sync/prune/self-heal an toàn.
- [ ] Có rollback, audit và controller recovery.

---
END OF FILE
