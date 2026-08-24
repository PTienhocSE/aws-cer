# [31] HELM PACKAGE MANAGEMENT

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Kubernetes manifests, YAML, templating, Git, CI/CD

# 1. 🎯 MỤC TIÊU HỌC

Hiểu chart/repository/release, values/template/rendering, dependency, hooks, upgrade/rollback, schema, security và cách đưa Helm vào CI/CD/GitOps mà không tạo drift.

# 2. 🧠 KIẾN THỨC NỀN

Ôn Kubernetes object/apiVersion, YAML merge, labels/annotations, immutable image, namespaces, RBAC, Git diff và release lifecycle.

# 3. 📚 TỔNG QUAN

Helm đóng gói Kubernetes manifests thành chart và quản lý release state. Helm không thay Kubernetes controller, không phải secret manager và không tự kiểm tra application health ngoài readiness/rollback strategy được cấu hình.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Chart + values + release name
          -> helm template/render
          -> Kubernetes manifests
          -> API Server
          -> release state (Secret/ConfigMap)
          -> controller rollout -> Pods/Services
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Chart.yaml, values.yaml, templates, `_helpers.tpl`, schema, dependencies, repository/OCI registry, release Secret, hooks, `helm upgrade`, `helm rollback` và diff plugin.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

Chart là package; release là một installation instance; values là input. `helm template` render local, `helm install/upgrade` gửi object đến API server. Template phải tạo resource hợp lệ và deterministic.

## 6.2. Trung cấp

Dùng `values.schema.json`, named templates, dependency pinning, environment values riêng và `--atomic --wait` khi phù hợp. Không đặt Secret plaintext trong chart repository.

## 6.3. Nâng cao

Helm upgrade có thể thay đổi immutable field, hook gây timeout, CRD lifecycle không giống resource thường, và `--reuse-values` có thể giữ config cũ ngoài ý muốn. GitOps nên render/diff trước sync.

# 7. 🌍 VÍ DỤ THỰC TẾ

Dev dùng chart local với `helm lint/template`. Prod pin chart/app version, values qua Git, image digest, schema validation, canary/rollback và release history. Shared chart phải có compatibility matrix.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
helm lint ./chart
helm dependency build ./chart
helm template orders ./chart -f values-prod.yaml --debug
helm diff upgrade orders ./chart -n orders -f values-prod.yaml
helm upgrade --install orders ./chart -n orders --create-namespace --atomic --wait
helm list -A
helm history orders -n orders
helm rollback orders <revision> -n orders --wait
helm get manifest/values/status orders -n orders
```

# 9. 📝 LOG

Helm client output/release history chỉ cho biết operation; cần đọc Kubernetes Events, Deployment/Pod logs, admission rejection và Git/ArgoCD sync log để biết rollout thực tế.

# 10. 📊 METRIC

Release success/failure, upgrade duration, rollback count, rollout readiness, Pod restart/error/latency, hook duration, sync drift và API/admission errors.

# 11. ⚙️ CONFIGURATION

```yaml
# values-prod.yaml
image:
  repository: 123456789012.dkr.ecr.ap-southeast-1.amazonaws.com/orders
  digest: sha256:...
replicaCount: 3
resources:
  requests: {cpu: 250m, memory: 512Mi}
  limits: {cpu: "1", memory: 1Gi}
```

Template dùng `required` cho giá trị bắt buộc, schema để validate type/range và không in Secret vào rendered manifest/log.

# 12. 🔧 TROUBLESHOOTING

```text
Render lỗi -> helm lint/template/schema/dependency
Apply lỗi -> API version/RBAC/admission/immutable field
Rollout treo -> describe/events/probe/image/config/dependency
Release sai -> helm diff/get values/history/Git commit
Rollback -> chọn revision, kiểm tra CRD/schema/data migration rồi verify
```

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — Upgrade tạo Pod không Ready

Đọc diff, revision, Events/probe/log/config. Nếu impact tăng, rollback atomic/revision cũ; kiểm tra migration và backward compatibility trước khi retry.

### Incident 02 — Values production bị ghi đè

Xác định source/precedence `-f`/`--set`, commit và release values. Freeze deploy, rollback config, rồi tách values/environment và schema.

### Incident 03 — Hook timeout

Kiểm tra hook Pod/log/deadline/RBAC và side effect. Xóa/re-run chỉ khi idempotent; tránh hook migration không có backup/rollback.

### Incident 04 — CRD/API version không tương thích

Kiểm tra cluster version, CRD schema và rendered manifest. Migrate CRD theo tài liệu, không để Helm uninstall xóa CRD production ngoài chủ ý.

### Incident 05 — Release drift ngoài Git

So sánh `helm get manifest`/live object với Git/desired state, xác định manual change, reconcile có approval và bổ sung policy ngăn sửa trực tiếp.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Ưu điểm | Trade-off |
|---|---|---|
| Helm | package/release/rollback | template complexity |
| Kustomize | patch rõ, ít template | package/dependency yếu hơn |
| Helm trực tiếp CD | đơn giản | quyền cluster nằm ở pipeline |
| Helm qua GitOps | audit/reconcile | cần xử lý drift/secret |
| `--atomic` | rollback khi timeout | không cứu data migration |
| `--reuse-values` | tiện upgrade | giữ config cũ ngoài ý muốn |

# 15. ❌ COMMON MISTAKES

- Dùng `helm upgrade` mà không render/diff.
- Đặt Secret plaintext trong values.
- Không pin dependency/image digest.
- Dùng hook không idempotent.
- Nghĩ rollback app luôn rollback database schema.
- Xóa CRD/data khi uninstall chart.
- Dùng `--set` quá nhiều làm mất auditability.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Chart khác release thế nào?
2. `helm template` khác `helm upgrade` ra sao?
3. Values precedence gồm gì?
4. `--atomic --wait` có giới hạn nào?
5. Hook có rủi ro gì?
6. Helm rollback có rollback database không?
7. Vì sao cần schema/diff?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Thiết kế chart production-ready.
- Debug upgrade bị timeout.
- Quản lý values cho dev/staging/prod thế nào?
- Helm và GitOps phối hợp ra sao?
- Xử lý CRD/dependency upgrade thế nào?
- Làm sao tránh Secret leak?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em luôn render và diff trước upgrade, validate schema/dependency, pin image/chart, dùng `--atomic --wait` phù hợp, theo dõi rollout và giữ release history. Nếu lỗi, em phân biệt manifest/config/app/data migration; rollback chỉ là một phần mitigation, sau đó phải verify và RCA.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nói về input → rendered output → API apply → controller rollout → health verification. Không mô tả Helm như một runtime hoặc service discovery platform.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Upgrade fail?
 -> render/schema/dependency?
 -> API/RBAC/admission?
 -> rollout/probe/image/config?
 -> hook/CRD/migration?
 -> rollback/verify/drift?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Tạo chart có schema và helper.
- [ ] Render/diff được theo environment.
- [ ] Debug upgrade/rollback/hook/CRD.
- [ ] Quản lý Secret và dependency an toàn.
- [ ] Kết nối được Helm với GitOps.

# 22. 🃏 FLASHCARDS

**Q:** Release là gì? **A:** Một instance của chart trong cluster.  
**Q:** `helm template` dùng làm gì? **A:** Render manifest mà chưa apply.  
**Q:** `--atomic` làm gì? **A:** Rollback khi upgrade thất bại/timeout theo điều kiện wait.  
**Q:** Helm rollback có sửa DB không? **A:** Không đảm bảo; migration cần chiến lược riêng.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: render/apply/reconcile, values precedence, release và rollback.  
🟠 Phải nắm: lint/template/diff/history/get/status.  
🟡 Nên biết: hooks, CRD, OCI registry, schema và GitOps drift.

# 24. 🎯 LIÊN HỆ VỚI JD

Helm là kỹ năng đóng gói/deploy/rollback phổ biến trong Kubernetes CI/CD và GitOps.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi Helm, cần nói được chart structure, values, release, rollback và một incident; không chỉ “biết viết YAML”.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Monorepo chart được version/pin dependency, values production review qua PR, CI lint/render/security scan, ArgoCD sync, secret external và rollback runbook.

# 27. 🧪 HANDS-ON LAB

1. Viết chart Deployment/Service với schema.
2. Render dev/prod và review diff.
3. Cố ý sai value/probe để tạo failed rollout.
4. Test rollback và release history.
5. Thử dependency/CRD upgrade trong cluster test.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Render → schema/dependency; apply → API/RBAC/admission; rollout → Pod/probe/image/config; release → values/history/Git drift; rollback → data/CRD compatibility.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review chart lint/schema, immutable image, values/Secret, dependency pin, diff approval, resource/probe/PDB, hook idempotency, CRD lifecycle, rollback và release ownership.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Chart/template | ☐ | ☐ | ☐ |
| Values/schema | ☐ | ☐ | ☐ |
| Release/rollback | ☐ | ☐ | ☐ |
| GitOps integration | ☐ | ☐ | ☐ |
| Incident debug | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: chart/release, values, render/diff, `--atomic`, rollback, hooks, CRD, Secret, dependency và GitOps drift.

# 32. 📋 FINAL CHECKLIST

- [ ] Viết được chart có schema và values rõ ràng.
- [ ] Render/diff trước deploy.
- [ ] Upgrade/rollback an toàn.
- [ ] Không leak Secret và không phá CRD/data.
- [ ] Debug được failed release theo evidence.

---
END OF FILE
