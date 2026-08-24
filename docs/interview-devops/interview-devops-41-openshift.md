# OpenShift — Cẩm nang phỏng vấn vận hành

# 1. Mục tiêu học
Hiểu OpenShift như Kubernetes distribution enterprise với security, networking, registry, console và lifecycle tích hợp.

# 2. Kiến thức nền cần có
Kubernetes API, container image, Linux/RHEL, OAuth/RBAC, DNS, TLS, storage và GitOps.

# 3. Tổng quan kiến trúc
Control plane gồm API server, etcd, scheduler, controller; worker chạy kubelet và CRI-O. OpenShift thêm CVO, MCO, Ingress, OAuth, Image Registry và monitoring.

# 4. Cách hoạt động
Developer tạo resource trong Project. Admission kiểm tra RBAC/SCC, scheduler chọn node, kubelet tạo pod, Service/Route đưa traffic vào workload. Operator reconcile desired state.

# 5. Thành phần và failure mode
etcd mất quorum làm control plane không ghi được; router lỗi gây 503; CRI-O hoặc registry lỗi gây ImagePullBackOff; MCO rollout sai có thể làm node không sẵn sàng.

# 6. Concepts quan trọng
Project là namespace có quota, limit range và policy. Route là lớp HTTP/TLS trên Service. SCC kiểm soát UID, capabilities, host networking và volume; RBAC kiểm soát API action.

# 7. Ví dụ thực tế
Tách project theo team/môi trường, dùng ResourceQuota, LimitRange, NetworkPolicy, Route re-encrypt và image promotion từ staging sang production.

# 8. Command / Tool cần biết
oc whoami; oc get co; oc get nodes; oc get pods -o wide; oc describe pod; oc logs; oc adm top; oc get events --sort-by=.lastTimestamp; oc adm must-gather.

# 9. Log và cách đọc
Correlate events, pod logs, router logs và application request ID theo timestamp. Node dùng journalctl -u kubelet và journalctl -u crio; cluster evidence dùng must-gather.

# 10. Metrics
Theo dõi API latency/error, etcd fsync/DB size, node CPU/memory/disk, pod restarts, router 4xx/5xx, pending pods và operator conditions. Không kết luận outage từ CPU đơn lẻ.

# 11. Configuration mẫu
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    persistentvolumeclaims: "20"

# 12. Troubleshooting methodology
Xác định scope và recent change; kiểm tra operator, node, namespace, events, endpoints và Route; phân biệt scheduling, image pull, readiness, network và application error; mitigation rồi verify và RCA.

# 13. Năm production incidents
1. Route 503: kiểm tra Route → Service → Endpoints → readiness, rollback deployment nếu cần.
2. Pod Pending: xem quota, taint/toleration, affinity và PVC.
3. ImagePullBackOff: kiểm tra digest, pull secret, registry TLS và egress.
4. Operator Degraded: đọc conditions/logs và thu must-gather, không xóa CR tùy tiện.
5. Node NotReady: kiểm tra kubelet/CRI-O, pressure, network và MCO rollout.

# 14. So sánh
OpenShift tích hợp SCC, OAuth, Operators, Console, Route và lifecycle; Kubernetes upstream linh hoạt hơn nhưng cần tự chọn và vận hành các lớp này.

# 15. Common mistakes
Không gán SCC privileged rộng; không sửa trực tiếp node do MCO quản lý; không bỏ qua quota; không expose Route trước khi probe và TLS được kiểm thử.

# 16. Knowledge check
Vì sao etcd cần quorum? Route khác Ingress thế nào? SCC kiểm soát gì? Degraded biểu thị điều gì? Vì sao readiness fail làm 503? Mỗi câu phải trả lời bằng cơ chế và evidence.

# 17. Câu hỏi phỏng vấn
Thiết kế project multi-tenant; giải thích SCC; xử lý operator degraded; nâng version cluster; điều tra Route 503; bảo vệ image supply chain.

# 18. Đáp án phỏng vấn mẫu
“Tôi bắt đầu từ symptom và scope, lấy conditions/events/metrics trước khi sửa. Với 503, tôi kiểm tra Route, Service, Endpoints và readiness; mitigation là rollback/canary, rồi xác nhận error rate và ghi RCA.”

# 19. Follow-up question tree
503 → Endpoints rỗng? → pod ready chưa? → router/backend TLS đúng? → recent deployment/config change? Nếu cluster-wide → kiểm tra Ingress Operator, DNS và node.

# 20. Checklist sau khi học
- [ ] Tạo project có quota, RBAC và NetworkPolicy.
- [ ] Deploy app, expose Route TLS và rollback.
- [ ] Đọc được operator conditions, events và must-gather.

# 21. Flashcards
oc là CLI; co là ClusterOperator; SCC bảo vệ pod; Route expose HTTP; CRI-O chạy container; MCO quản lý node config; CVO quản lý release; etcd lưu state; Project là namespace có policy; must-gather thu evidence.

# 22. Phải hiểu và phải nhớ
Phải hiểu reconcile loop, admission, SCC/RBAC, Route flow, quorum và operator conditions. Phải nhớ lệnh điều tra, trạng thái pod/operator và quy trình rollback.

# 23. Phân biệt “phải nhớ” và “phải hiểu”
Phải nhớ cú pháp oc; phải hiểu vì sao sửa Deployment không chữa được lỗi DNS, quota, TLS hoặc backend không ready.

# 24. Liên hệ với JD
Map vào cluster administration, platform support, incident response, patching, access control, monitoring và capacity planning.

# 25. Liên hệ với CV
Nói rõ phần đã vận hành EKS/Kubernetes và phần lab OpenShift; quy đổi skill bằng concept chung, không nhận production nếu thiếu evidence.

# 26. Enterprise / data center scenario
Dùng 3 control-plane node trên failure domain khác nhau, worker pool theo workload, registry HA, external identity, private API, egress control, etcd backup và DR runbook.

# 27. Hands-on lab
Tạo project, quota, Deployment, Service và Route; cố ý làm sai readiness; dùng events/logs/endpoints tìm nguyên nhân; sửa và chứng minh recovery bằng curl cùng metric.

# 28. Troubleshooting decision tree
oc get co degraded? → cluster-level. Không? oc get pods → Pending/CrashLoop/NotReady. Pod ready? → Service endpoints. Endpoints có? → Route/DNS/TLS. Mọi lớp healthy? → application trace.

# 29. Production readiness review
Kiểm tra SCC tối thiểu, RBAC, quota, probes, PDB, topology spread, image digest/signature, Route TLS, NetworkPolicy, alert, backup, upgrade path và rollback.

# 30. Self-assessment
Beginner: deploy/debug pod. Intermediate: Route, SCC, quota, operator. Advanced: upgrade, multi-AZ, registry security, capacity và DR.

# 31. Interview priority
Ưu tiên architecture → Project/RBAC/SCC → Route/network → operators/lifecycle → node/runtime → incident evidence → security và DR.

# 32. Final checklist
- [ ] Giải thích được điểm khác biệt enterprise của OpenShift.
- [ ] Debug được pod, Route, node và ClusterOperator.
- [ ] Đưa ra được mitigation, verification, RCA và prevention.

