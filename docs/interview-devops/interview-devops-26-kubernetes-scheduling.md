# [26] KUBERNETES SCHEDULING & PLACEMENT

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Kubernetes fundamentals, Linux resources, zones/nodes, containers

# 1. 🎯 MỤC TIÊU HỌC

Hiểu scheduler chọn node thế nào; dùng requests/limits, taint/toleration, node/pod affinity, topology spread và priority; thiết kế placement HA; troubleshoot Pod `Pending`, preemption, resource pressure và topology conflict.

# 2. 🧠 KIẾN THỨC NỀN

Cần hiểu CPU/memory requests, cgroups, node labels/taints, zones, capacity/allocatable, Pod lifecycle và replica placement. Scheduler quyết định placement; kubelet mới thực thi container trên node.

# 3. 📚 TỔNG QUAN

Kubernetes scheduler tìm node phù hợp với constraints rồi ghi `spec.nodeName`. Nó không “tạo thêm tài nguyên”; nếu requests không vừa capacity hoặc constraint mâu thuẫn, Pod sẽ `Pending`.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Pod created -> scheduler queue -> filter feasible nodes
            -> score candidates -> bind Pod -> kubelet starts Pod
```

Filter loại node không phù hợp vì taint, resource, affinity, volume topology. Score xếp hạng node còn lại. Priority/preemption có thể evict Pod ưu tiên thấp nếu policy cho phép.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

| Thành phần | Tác dụng |
|---|---|
| requests/limits | scheduling và runtime resource boundary |
| nodeSelector/affinity | chọn node theo label |
| taint/toleration | giữ workload khỏi node hoặc cho phép ngoại lệ |
| topology spread | phân tán replica theo zone/hostname |
| PriorityClass | thứ tự quan trọng/preemption |
| ResourceQuota | giới hạn namespace |
| LimitRange | default/constraint resource |

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

Scheduler xét `requests`, không xét giới hạn CPU/memory còn trống theo cảm tính. `nodeSelector` là điều kiện cứng. Taint `NoSchedule` chặn Pod mới nếu không có toleration.

## 6.2. Trung cấp

Preferred affinity là ưu tiên, required affinity là bắt buộc. `topologySpreadConstraints` giúp replica không dồn vào một zone/node. `podAntiAffinity` phù hợp chống đặt hai replica cùng host nhưng có thể làm Pod Pending nếu cluster nhỏ.

## 6.3. Nâng cao

Preemption có thể gây disruption; PriorityClass phải đi cùng PDB và capacity headroom. Với volume RWO, scheduler còn phải xét topology của volume; với GPU/hugepages cần resource name và device plugin.

# 7. 🌍 VÍ DỤ THỰC TẾ

Dev dùng nodeSelector để test. Production phân tán API replicas theo zone, dành node tainted cho workload đặc biệt, dùng requests sát thực tế và giữ headroom cho failover. Batch job dùng priority thấp hơn traffic production.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl describe pod <pod> -n <ns>
kubectl get nodes --show-labels
kubectl describe node <node>
kubectl get priorityclass
kubectl get resourcequota,limitrange -n <ns>
kubectl get events -A --sort-by=.lastTimestamp
kubectl top nodes
kubectl logs -n kube-system deploy/kube-scheduler
```

# 9. 📝 LOG

Đọc Pod events trước: `Insufficient cpu`, `untolerated taint`, affinity mismatch, topology conflict. Scheduler log cần dùng khi event không đủ; đối chiếu node labels, allocatable, request và recent node change.

# 10. 📊 METRIC

Theo dõi scheduler pending duration, scheduling attempts/unschedulable, node allocatable-vs-requested, CPU/memory pressure, preemption count, Pod startup latency và topology imbalance.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  template:
    metadata:
      labels: {app: api}
    spec:
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels: {app: api}
      containers:
        - name: api
          image: example/api:1.0
          resources:
            requests: {cpu: "250m", memory: "512Mi"}
            limits: {cpu: "1", memory: "1Gi"}
```

# 12. 🔧 TROUBLESHOOTING

```text
Pending -> describe/events
  -> request có vừa allocatable không?
  -> taint có toleration không?
  -> affinity/selector/topology có mâu thuẫn không?
  -> quota/LimitRange/PVC topology có chặn không?
  -> scheduler/node health có vấn đề không?
```

Đừng tăng node hoặc xóa Pod trước khi biết constraint nào làm Pod không schedulable.

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — Insufficient CPU

Đọc request thực tế, allocatable và Pod priority; scale node hoặc điều chỉnh request dựa trên metric, không hạ request mù quáng.

### Incident 02 — Taint sau node failure

Kiểm tra node condition/taint, workload toleration và capacity zone khác. Drain/replace node theo PDB rồi verify replica distribution.

### Incident 03 — Replica dồn một zone

Kiểm tra topology labels/spread policy và node capacity. Bổ sung constraint/capacity trước khi rollout để không tự tạo outage.

### Incident 04 — Preemption làm mất traffic

Đối chiếu PriorityClass, PDB và eviction timeline. Hạ priority batch hoặc tăng headroom; không tắt preemption nếu production vẫn cần bảo vệ workload critical.

### Incident 05 — PVC làm Pod Pending

Kiểm tra volume topology, StorageClass `WaitForFirstConsumer` và node zone. Không bind volume sai zone để ép scheduler.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Cơ chế | Mạnh | Trade-off |
|---|---|---|
| nodeSelector | đơn giản | ít linh hoạt |
| node affinity | biểu đạt tốt | dễ tạo constraint khó debug |
| taint/toleration | cô lập node | toleration quá rộng làm mất isolation |
| anti-affinity | HA rõ | cần đủ node/capacity |
| topology spread | cân zone | `DoNotSchedule` có thể Pending |
| preemption | bảo vệ workload cao | eviction/disruption |

# 15. ❌ COMMON MISTAKES

- Không đặt requests rồi ngạc nhiên khi placement sai.
- Dùng required affinity quá chặt trong cluster nhỏ.
- Toleration `operator: Exists` quá rộng.
- Nghĩ `topologySpread` tạo thêm node.
- Bỏ qua allocatable, system reservation và DaemonSet overhead.
- Dùng preemption thay cho capacity planning.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Scheduler dùng requests hay limits để filter node?
2. Taint khác affinity thế nào?
3. Khi nào Pod bị preempt?
4. `DoNotSchedule` khác `ScheduleAnyway` ra sao?
5. Vì sao Pod Pending dù node nhìn còn CPU?
6. Requests ảnh hưởng QoS class thế nào?
7. PDB có ngăn mọi eviction không?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Mô tả scheduler filter/score/bind.
- Debug Pod Pending thế nào?
- Thiết kế 3 replicas trải đều multi-AZ ra sao?
- Khi nào dùng taint/toleration?
- Preemption có rủi ro gì?
- Volume topology ảnh hưởng scheduling thế nào?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**Pod Pending:** Em bắt đầu bằng `kubectl describe pod` và Events để lấy constraint cụ thể, sau đó so request với node allocatable, kiểm tra taint/toleration, affinity, topology, quota và PVC. Em không xóa Pod hay giảm request ngay; em xác định impact, chọn mitigation ít rủi ro, rồi verify placement/replica distribution bằng metrics và events.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Luôn nói cả hai mặt: placement tốt cần HA và capacity, nhưng constraint quá chặt sẽ làm giảm khả năng phục hồi. Nêu rõ request được đo từ workload, không copy số tùy ý.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Pod Pending?
 -> request/allocatable?
 -> taint/toleration?
 -> selector/affinity?
 -> topology/PVC?
 -> quota/priority/preemption?
 -> scheduler/node health?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu filter/score/bind.
- [ ] Đọc được events và node allocatable.
- [ ] Dùng đúng requests/limits, affinity, taint và spread.
- [ ] Thiết kế HA multi-zone.
- [ ] Debug được Pending, preemption và topology conflict.

# 22. 🃏 FLASHCARDS

**Q:** Scheduler xét gì? **A:** Requests và constraints của Pod/node.  
**Q:** Taint `NoSchedule` là gì? **A:** Chặn Pod mới không có toleration.  
**Q:** `DoNotSchedule` làm gì? **A:** Giữ constraint phân tán và để Pod Pending nếu không đạt.  
**Q:** Preemption là gì? **A:** Evict workload ưu tiên thấp để schedule workload ưu tiên cao.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: requests, filter/score, topology, taint và preemption.  
🟠 Phải nắm: events, allocatable, affinity và capacity.  
🟡 Nên biết: scheduler profile, device plugin và NUMA/hugepages.

# 24. 🎯 LIÊN HỆ VỚI JD

Scheduling quyết định resource utilization, HA, rollout và khả năng phục hồi của cluster; đây là năng lực vận hành Kubernetes Production trực tiếp.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV ghi autoscaling/EKS/Kubernetes, cần phân biệt đã thiết kế placement/requests hay chỉ deploy workload.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Cluster multi-AZ có node group riêng cho system, application và batch; taint node đặc biệt, spread API theo zone, quota theo team, PDB cho critical service và headroom khi mất một AZ.

# 27. 🧪 HANDS-ON LAB

1. Tạo Pod Pending vì thiếu CPU và đọc Events.
2. Thêm taint/toleration, kiểm tra placement.
3. Dùng topology spread trên 3 node/zone.
4. Tạo PriorityClass thấp/cao và quan sát preemption trong lab.
5. Kết hợp PVC topology với scheduler.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

`Pending` → Events → resource → taint → affinity → topology/PVC → quota/priority → scheduler/node health.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review request dựa trên metric, zone capacity, system reservation, PDB, spread policy, priority, autoscaler interaction, drain/upgrade plan và cảnh báo unschedulable duration.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Scheduling concept | ☐ | ☐ | ☐ |
| Placement config | ☐ | ☐ | ☐ |
| Pending debug | ☐ | ☐ | ☐ |
| HA/capacity design | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: Pod Pending, requests/limits, allocatable, taint/toleration, affinity, topology spread, PDB, PriorityClass, preemption và volume topology.

# 32. 📋 FINAL CHECKLIST

- [ ] Giải thích được scheduler flow.
- [ ] Debug được Pod Pending theo evidence.
- [ ] Thiết kế placement HA và multi-zone.
- [ ] Hiểu trade-off của constraint/preemption.
- [ ] Biết kiểm tra capacity trước rollout.

---
END OF FILE
