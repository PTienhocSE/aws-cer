# [27] KUBERNETES SECURITY & RBAC

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Kubernetes API, Linux permissions, IAM, TLS, NetworkPolicy, container security

# 1. 🎯 MỤC TIÊU HỌC

Hiểu security boundary của Kubernetes: identity, authentication, authorization, RBAC, ServiceAccount, Secret, Pod Security, admission, image provenance, network policy, audit và runtime hardening. Có thể điều tra `Forbidden`, secret exposure, privileged Pod và credential misuse.

# 2. 🧠 KIẾN THỨC NỀN

Ôn TLS/certificate, JWT/OIDC, Linux UID/GID/capabilities, container namespace/cgroup, least privilege, IAM và network segmentation. Kubernetes authorization không thay thế cloud IAM hay application authorization.

# 3. 📚 TỔNG QUAN

Kubernetes Security là defense-in-depth: bảo vệ API/control plane, workload identity, admission policy, image supply chain, Pod runtime, network, secret và audit. Mọi quyền nên ngắn hạn, giới hạn namespace/resource/verb và có log để truy vết.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
User/Workload -> TLS/OIDC/ServiceAccount token -> API Server
                                               -> Authentication
                                               -> Authorization (RBAC)
                                               -> Admission (policy/mutation)
                                               -> Object persistence (etcd)
                                               -> controller/scheduler/kubelet
```

RBAC quyết định request được phép làm gì. Admission có thể reject hoặc mutate object trước khi lưu. Pod Security và policy engine kiểm tra securityContext, host access, capability, volume và privilege.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

| Thành phần | Vai trò | Failure/Risk |
|---|---|---|
| User/Group/OIDC | identity người dùng | token/issuer misconfig |
| ServiceAccount | identity workload | token quá rộng/lộ secret |
| Role/ClusterRole | quyền resource/verb | wildcard privilege |
| RoleBinding | gắn quyền trong namespace | bind nhầm ServiceAccount |
| Admission | policy/mutation | bypass hoặc deny nhầm |
| Secret | dữ liệu nhạy cảm | log/Git/RBAC exposure |
| Audit log | evidence request | thiếu retention/correlation |
| Pod Security | chặn workload nguy hiểm | privileged/hostPath |

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

`Role` chỉ trong namespace; `ClusterRole` có thể dùng cluster-wide. `RoleBinding` bind trong namespace; `ClusterRoleBinding` có phạm vi toàn cluster. `get/list/watch` khác `create/update/delete/exec`; không cấp wildcard nếu không cần.

## 6.2. Trung cấp

ServiceAccount token nên dùng projected short-lived token và cloud identity federation thay vì long-lived secret. Pod security phải tắt privileged, hostNetwork, hostPID, hostPath và thêm Linux capabilities tối thiểu.

## 6.3. Nâng cao

Admission policy cần enforce image registry/digest, resource limits, non-root, signed image, namespace label và deny privilege escalation. Audit phải đủ để truy ngược actor, source IP, verb, resource, response code và user agent.

# 7. 🌍 VÍ DỤ THỰC TẾ

- **Dev:** namespace riêng, Role read-only, image từ registry test.
- **Prod:** workload ServiceAccount chỉ đọc Secret cần thiết; CI không dùng cluster-admin; admission bắt non-root/signed image.
- **Enterprise:** OIDC/SSO, audit tập trung, namespace ownership, NetworkPolicy default deny, cloud IAM per workload và quy trình break-glass có approval.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl auth can-i get secrets -n orders --as=system:serviceaccount:orders:api
kubectl auth can-i --list --as=user@example.com -n orders
kubectl get role,rolebinding,serviceaccount -A
kubectl describe rolebinding <name> -n <ns>
kubectl get pod <pod> -o yaml
kubectl get secret <name> -o jsonpath='{.data.key}' | base64 -d
kubectl get events -A --sort-by=.lastTimestamp
```

Không paste Secret value vào terminal log/chat; kiểm tra audit/admission/runtime tool theo quyền được cấp.

# 9. 📝 LOG

Audit log cần có user/UID, groups, source IP, verb, resource, namespace/name, response code và authorization decision. Đọc admission denial, API audit, image scanner, runtime alert, cloud IAM và application log; correlate bằng request URI/audit ID.

# 10. 📊 METRIC

Theo dõi API 401/403/429/5xx, audit drop, admission reject, privileged workload count, image vulnerability/signature failure, Secret access, service account token usage và policy violation.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: api-read-config
  namespace: orders
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    resourceNames: ["api-config"]
    verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: api-read-config
  namespace: orders
subjects:
  - kind: ServiceAccount
    name: api
    namespace: orders
roleRef:
  kind: Role
  name: api-read-config
  apiGroup: rbac.authorization.k8s.io
```

Review mọi `ClusterRoleBinding`, wildcard verb/resource, `secrets` access, `pods/exec`, `nodes/proxy` và ServiceAccount có `automountServiceAccountToken` không cần thiết.

# 12. 🔧 TROUBLESHOOTING

```text
403 Forbidden
 -> identity là ai?
 -> authn/OIDC/token còn hạn?
 -> authz: kubectl auth can-i?
 -> Role/Binding đúng namespace/subject/roleRef?
 -> admission/policy deny hay RBAC deny?

Pod security failure
 -> securityContext/capability/host access/image policy/ServiceAccount
```

Phân biệt `401` (chưa xác thực/sai token), `403` (đã xác thực nhưng không có quyền), admission reject và application-level deny.

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — ServiceAccount bị cấp cluster-admin

Xác định binding và actor qua audit, revoke binding, rotate credential nếu đã sử dụng, rồi kiểm tra resources đã bị đọc/sửa. Prevention là Role namespace-scoped và CI policy kiểm tra RBAC.

### Incident 02 — Pod privileged chạy ngoài ý muốn

Chặn rollout bằng admission, isolate namespace/workload, kiểm tra host access/capability và image. Không chỉ xóa Pod mà phải tìm manifest/Helm source gây lỗi.

### Incident 03 — Ứng dụng 403 Secret

Kiểm tra ServiceAccount thực tế, RoleBinding, resource name/namespace và audit. Cấp đúng quyền đọc Secret cụ thể, không cấp `get secrets` toàn namespace nếu không cần.

### Incident 04 — Token/Secret lộ trong Git/log

Revoke/rotate ngay, tìm scope sử dụng và audit access, xóa khỏi history theo quy trình. Chuyển sang external secret/short-lived identity và secret scanning.

### Incident 05 — Admission policy chặn deployment

Đọc reason/object path, kiểm tra policy version và change gần nhất. Nếu cần rollback policy có approval, không tạo bypass lâu dài bằng label/namespace đặc quyền.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Ưu điểm | Trade-off |
|---|---|---|
| Role | scope nhỏ | phải tạo nhiều binding |
| ClusterRole | reuse/cluster resource | dễ over-privilege |
| OIDC user | SSO/audit tốt | phụ thuộc IdP |
| SA token | machine identity | phải quản lý rotation/scope |
| Admission | enforce policy | có thể block release |
| NetworkPolicy | giảm lateral movement | cần CNI/test flow |
| Secret native | tích hợp API | encryption/rotation phải thiết kế |

# 15. ❌ COMMON MISTAKES

- Dùng `cluster-admin` cho CI hoặc application.
- Cho phép `verbs: ["*"]`, `resources: ["*"]` vì tiện.
- Lưu Secret plaintext trong Git/manifest/log.
- Chỉ dựa vào image scan nhưng không kiểm soát runtime.
- Dùng `privileged`, `hostNetwork`, `hostPath` không có lý do.
- Không bật audit hoặc không kiểm tra 403/Secret access.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Role khác ClusterRole thế nào?
2. RoleBinding khác ClusterRoleBinding ra sao?
3. 401 khác 403 thế nào?
4. Vì sao ServiceAccount không nên dùng cluster-admin?
5. Admission khác authorization thế nào?
6. Tại sao phải rotate Secret sau khi lộ?
7. NetworkPolicy có thay RBAC không?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Thiết kế RBAC cho CI deploy một namespace.
- Debug 403 khi Pod đọc Secret.
- Hardening Pod Production gồm gì?
- Bảo vệ supply chain image thế nào?
- Điều tra nghi ngờ ServiceAccount bị lạm dụng ra sao?
- Break-glass access nên kiểm soát thế nào?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**Thiết kế RBAC:** Em bắt đầu từ identity và tác vụ tối thiểu, dùng Role theo namespace, bind đúng ServiceAccount, giới hạn resource/verb/resourceNames và kiểm tra bằng `kubectl auth can-i`. Em tách quyền build khỏi quyền deploy, không dùng cluster-admin, bật audit và có quy trình revoke/rotation.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Security answer phải có scope, evidence, blast radius, mitigation và prevention. Không nói “đã bật RBAC là an toàn”; phải chỉ ra ai được làm gì và audit kiểm chứng ra sao.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
403?
 -> identity/token?
 -> authn hay authz?
 -> can-i/RBAC binding?
 -> admission policy?
 -> audit và recent change?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Thiết kế được namespace-scoped RBAC.
- [ ] Biết debug 401/403/admission denial.
- [ ] Hardening được Pod và image.
- [ ] Kiểm soát Secret/token/audit.
- [ ] Có incident response cho credential exposure.

# 22. 🃏 FLASHCARDS

**Q:** Role scope ở đâu? **A:** Trong namespace.  
**Q:** `kubectl auth can-i` dùng làm gì? **A:** Xác minh quyền của identity cụ thể.  
**Q:** Admission làm gì? **A:** Reject hoặc mutate object trước khi lưu.  
**Q:** 403 nghĩa là gì? **A:** Đã xác thực nhưng không được phép.  
**Q:** Sau khi Secret lộ phải làm gì? **A:** Revoke/rotate, điều tra access và sửa source.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: identity, authentication, authorization, admission và blast radius.  
🟠 Phải nắm: RBAC, ServiceAccount, Secret, audit và securityContext.  
🟡 Nên biết: OPA/Gatekeeper/Kyverno, image signing và runtime detection.

# 24. 🎯 LIÊN HỆ VỚI JD

Đây là nền tảng cho DevSecOps, cluster operation, least privilege, audit và xử lý security incident.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi IAM/EKS/Secrets, cần nói rõ phạm vi đã triển khai, rotation, audit và cloud identity; không nhận đã thiết kế policy Production nếu chưa có evidence.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Dùng OIDC cho user, namespace ownership, Role cho workload, cloud IAM federation, encrypted secret store, default-deny network, admission enforce non-root/signed image và audit chuyển về SIEM.

# 27. 🧪 HANDS-ON LAB

1. Tạo Role chỉ đọc một ConfigMap và test `can-i`.
2. Cố ý bind sai namespace để debug 403.
3. Tạo Pod privileged và chặn bằng Pod Security/admission.
4. Rotate Secret, kiểm tra app reload và audit.
5. Viết policy cấm image tag mutable hoặc privileged container.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

`401` → token/issuer/clock → `403` → Role/Binding/subject/namespace → admission deny → policy/image/securityContext → runtime/audit.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review RBAC diff, wildcard permission, ServiceAccount token, secret encryption/rotation, admission policy, image provenance, network policy, audit retention, break-glass và rollback.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| RBAC | ☐ | ☐ | ☐ |
| Pod hardening | ☐ | ☐ | ☐ |
| Secret/supply chain | ☐ | ☐ | ☐ |
| Incident response | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: RBAC scope, ServiceAccount, 401/403, admission, Pod Security, Secret rotation, image trust, NetworkPolicy và audit.

# 32. 📋 FINAL CHECKLIST

- [ ] Cấp quyền tối thiểu theo identity và namespace.
- [ ] Debug được 401/403 và admission denial.
- [ ] Không dùng cluster-admin/privileged tùy tiện.
- [ ] Có rotation, audit và incident plan cho Secret.
- [ ] Kiểm soát image, runtime và network.

---
END OF FILE
