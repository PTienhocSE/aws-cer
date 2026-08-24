# [28] KUBERNETES TROUBLESHOOTING & INCIDENT RESPONSE

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Kubernetes fundamentals, Linux, networking, observability, containers

# 1. 🎯 MỤC TIÊU HỌC

Xử lý Kubernetes incident theo evidence: xác định impact, phân biệt control plane/node/workload/network/storage failure, dùng command/log/metric đúng, mitigation có rollback, recovery và RCA.

# 2. 🧠 KIẾN THỨC NỀN

Nắm Pod lifecycle, Deployment/StatefulSet, scheduler, Service/CNI, PV/CSI, probes, requests/limits, Events, container runtime và API object state. Troubleshooting bắt đầu từ symptom chứ không bắt đầu bằng restart.

# 3. 📚 TỔNG QUAN

Một incident Kubernetes có thể xuất hiện ở client/Ingress, Service/CNI, Pod/container, node/runtime, control plane, storage hoặc dependency. Mỗi lớp có evidence khác nhau; cần khoanh vùng blast radius trước khi thay đổi.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Alert/user report
 -> edge/Ingress -> Service/Endpoint -> Pod/probe
 -> node/kubelet/runtime -> CNI/CSI
 -> API server/controller/scheduler/etcd
 -> external dependency/database/cloud API
```

Desired state nằm trong API; controller reconcile; scheduler đặt Pod; kubelet thực thi; dataplane phục vụ traffic. Sự khác nhau giữa desired/current state là evidence quan trọng.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Client, LoadBalancer/Ingress, Service/EndpointSlice, Deployment/ReplicaSet, Pod/container, node/kubelet/runtime, CNI/CSI, API server/controller/scheduler, metrics/logging và dependency.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

`Pending` thường là scheduling/resource/volume; `ContainerCreating` thường là image/network/volume; `CrashLoopBackOff` là container start rồi exit; `ImagePullBackOff` là registry/auth/tag/network; `Ready` không đồng nghĩa application không lỗi.

## 6.2. Trung cấp

Probe failure làm Pod không nhận traffic hoặc restart. OOMKilled liên quan limit/cgroup hoặc memory pressure. `kubectl describe` Events thường cho biết bước thất bại; log app cho biết nguyên nhân bên trong.

## 6.3. Nâng cao

Tách mitigation khỏi root cause, tránh thay đổi đồng thời nhiều biến, dùng canary/rollback, giữ timeline và kiểm tra correlation với deploy/config/traffic/dependency.

# 7. 🌍 VÍ DỤ THỰC TẾ

- **Dev:** tạo CrashLoop/ImagePull/Probe failure trong namespace test.
- **Prod:** rollout làm latency tăng; giữ revision cũ, rollback nếu impact tăng, sau đó phân tích revision/config.
- **Enterprise:** node/AZ failure cần xem replica spread, PDB, capacity và dependency failover.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl get pods -A -o wide
kubectl describe pod <pod> -n <ns>
kubectl logs <pod> -n <ns> --all-containers --previous
kubectl get events -A --sort-by=.lastTimestamp
kubectl get deploy,rs,svc,endpointslice -n <ns>
kubectl rollout history deploy/<name> -n <ns>
kubectl rollout undo deploy/<name> -n <ns>
kubectl top pods,nodes
kubectl get nodes; kubectl describe node <node>
kubectl get --raw='/readyz?verbose'
```

# 9. 📝 LOG

Thu thập alert/event trước, rồi Pod log/current và previous, kubelet/runtime, CNI/CSI, Ingress, controller/scheduler/API audit. Lưu namespace, UID, node, image digest, revision, timestamp UTC và request ID.

# 10. 📊 METRIC

SLO/error/latency/traffic; restart/OOM/readiness; pending/startup duration; node CPU/memory/disk pressure; API server latency/error; scheduler unschedulable; CNI/CSI failure; dependency health.

# 11. ⚙️ CONFIGURATION

Production workload cần requests/limits, readiness/liveness/startup probe phù hợp, rolling strategy, PDB, topology spread, termination grace period, revision history và observability labels. Không dùng probe quá ngắn làm false restart.

# 12. 🔧 TROUBLESHOOTING

```text
1. Xác nhận symptom và impact
2. Xác định phạm vi: một Pod, namespace, node, AZ hay toàn cluster
3. Kiểm tra recent change/deploy
4. Đọc Events -> metric -> logs -> network/storage/dependency
5. Mitigate có rollback và thông báo owner
6. Verify bằng SLO/traffic/log
7. RCA và prevention
```

# 13. 🚨 PRODUCTION INCIDENT

### CrashLoopBackOff

Đọc current/previous log, exit code, probe, config/Secret và OOM. Rollback revision hoặc tắt traffic có kiểm soát; sửa startup/config rồi verify restart count và readiness.

### ImagePullBackOff

Kiểm tra image tag/digest, registry DNS/network, imagePullSecret, IAM và registry quota. Không đổi sang `latest` để bypass; dùng immutable digest.

### Pending

Đọc Events, resource requests, taint/affinity/topology/quota/PVC. Sửa constraint hoặc bổ sung capacity dựa trên evidence.

### OOMKilled / node pressure

Đối chiếu container limit, working set, leak, node memory/disk/inode pressure và eviction. Mitigate bằng scale/rollback/tăng limit có sizing; sửa memory behavior và alert.

### Service/Ingress 5xx

Kiểm tra endpoint/readiness/port, DNS/CNI/policy, Ingress upstream timeout và app/dependency log. Curl từng hop để xác định boundary.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Biện pháp | Khi dùng | Rủi ro |
|---|---|---|
| Restart Pod | process transient | mất evidence/state |
| Rollback | recent deploy/config | quay lại bug cũ |
| Scale out | capacity/traffic | dependency có thể quá tải |
| Tăng limit | thiếu sizing | che memory leak/cost |
| Drain node | node failure | cần PDB/capacity |
| Disable policy | emergency rất hạn chế | tăng blast radius/security risk |

# 15. ❌ COMMON MISTAKES

- Restart trước khi lấy log/events.
- Chỉ nhìn Pod status mà không xem Endpoint/readiness.
- Xóa Pod/namespace làm mất evidence.
- Kết luận OOM chỉ vì memory cao mà không xem limit/cgroup.
- Rollback nhưng không verify traffic và dependency.
- Không ghi timeline, impact và owner.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Pending, CrashLoop và ImagePull khác nhau thế nào?
2. Đọc `--previous` khi nào?
3. Readiness khác liveness ra sao?
4. Debug 5xx theo hop thế nào?
5. Khi nào rollback, khi nào scale?
6. Vì sao cần Events trước log app?
7. Node pressure ảnh hưởng Pod ra sao?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Một deployment rollout làm 5xx tăng, bạn làm gì trong 10 phút đầu?
- Debug CrashLoopBackOff theo trình tự nào?
- Pod Pending nhưng cluster còn node, vì sao?
- Xử lý node NotReady thế nào?
- Phân biệt application failure và platform failure ra sao?
- Sau incident bạn viết RCA và prevention thế nào?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**Incident rollout:** Em xác nhận SLO/impact và phạm vi, kiểm tra deploy revision/events/metrics/log, so sánh Pod mới-cũ. Nếu tương quan rõ và rollback an toàn, em rollback để giảm impact, verify error/latency/recovery rồi mới điều tra root cause qua diff/config/dependency. Em ghi timeline, quyết định và action prevention.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Câu trả lời tốt phải có thứ tự, lý do của từng bước, evidence và nhánh A/B. Không đọc danh sách command; hãy nói command trả lời giả thuyết nào.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Pod lỗi?
 -> status/events?
 -> logs/previous/exit code?
 -> probe/config/secret/image?
 -> node/CNI/CSI/dependency?
 -> recent change?
 -> mitigation/verification/RCA?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Khoanh vùng impact trước khi sửa.
- [ ] Biết dùng Events, logs, metrics và audit.
- [ ] Debug được 5 failure state phổ biến.
- [ ] Có rollback/mitigation/verification.
- [ ] Viết được RCA và prevention.

# 22. 🃏 FLASHCARDS

**Q:** `CrashLoopBackOff` nghĩa là gì? **A:** Container liên tục start rồi exit, backoff restart.  
**Q:** `Pending` kiểm tra gì? **A:** Events, resource, taint, affinity, quota, PVC.  
**Q:** `--previous` dùng khi nào? **A:** Khi container đã restart và cần log lần chạy trước.  
**Q:** Rollback cần verify gì? **A:** SLO, traffic, readiness, error và dependency health.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: scope, evidence, control/data plane và failure state.  
🟠 Phải nắm: Events, logs, metrics, rollback và drain.  
🟡 Nên biết: profiling, eBPF, scheduler/controller internals.

# 24. 🎯 LIÊN HỆ VỚI JD

Đây là năng lực trực tiếp của DevOps/SRE: xử lý alert, production incident, rollout, capacity và service reliability.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi Kubernetes/EKS, cần phân biệt đã trực tiếp on-call/troubleshoot hay chỉ triển khai manifest/lab.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Cluster có multi-AZ, ingress, database, queue và monitoring. Khi một revision lỗi, rollback application nhưng vẫn kiểm tra migration/schema compatibility, queue backlog, DB connection và customer impact.

# 27. 🧪 HANDS-ON LAB

Tạo và xử lý lần lượt CrashLoop, ImagePull, Pending, OOM, Service 503 và node pressure. Mỗi lab phải ghi hypothesis, command, evidence, mitigation, verification và RCA.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

`Alert` → impact/scope → recent change → object/events → metrics → logs → network/storage/dependency → mitigation → verify → RCA.

# 29. 🧾 PRODUCTION READINESS REVIEW

Có alert/SLO, runbook, log/metric/tracing, rollback, PDB, capacity, access control, change audit, backup/restore, on-call và post-incident action owner.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Pod/workload debug | ☐ | ☐ | ☐ |
| Node/platform debug | ☐ | ☐ | ☐ |
| Incident response | ☐ | ☐ | ☐ |
| Rollback/RCA | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: CrashLoopBackOff, Pending, ImagePullBackOff, OOMKilled, probes, Service/Ingress 5xx, node pressure, rollback, evidence và RCA.

# 32. 📋 FINAL CHECKLIST

- [ ] Xác định được impact và failure boundary.
- [ ] Dùng đúng Events/logs/metrics/commands.
- [ ] Mitigate/rollback mà không phá evidence.
- [ ] Verify recovery bằng SLO và dependency health.
- [ ] Hoàn thành RCA/prevention.

---
END OF FILE
