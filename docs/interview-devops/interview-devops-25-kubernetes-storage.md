# [25] KUBERNETES STORAGE & CSI

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Linux filesystem, container lifecycle, Kubernetes fundamentals, cloud block/file storage

---

# 1. 🎯 MỤC TIÊU HỌC

Sau khi học xong, tôi phải có thể giải thích PV, PVC, StorageClass, CSI, access mode, topology, reclaim policy, snapshot/backup; thiết kế storage cho Stateful workload; và troubleshoot `Pending PVC`, `FailedMount`, `Multi-Attach`, filesystem full và restore failure.

### Tôi phải trả lời được

> “Một Pod dùng PVC bị `Pending` hoặc mount thất bại trong Production. Tôi kiểm tra từ đâu, đọc object/event/log nào, và làm sao chứng minh nguyên nhân nằm ở Kubernetes, CSI, cloud API hay storage backend?”

# 2. 🧠 KIẾN THỨC NỀN

- **Block storage:** volume được format thành filesystem, phù hợp database và workload cần latency thấp.
- **File storage:** nhiều node mount chung qua NFS/SMB hoặc protocol tương tự; cần kiểm tra locking và throughput.
- **Object storage:** truy cập qua API, phù hợp backup/artifact, không thay thế POSIX filesystem.
- Linux cần biết `lsblk`, `findmnt`, `mount`, `df`, inode, permission, `dmesg` và device path.

# 3. 📚 TỔNG QUAN

Kubernetes Storage là lớp trừu tượng hóa lifecycle của dữ liệu cho workload. Pod có thể bị reschedule sang node khác nhưng dữ liệu phải được giữ lại và mount đúng. Storage không tự động biến database thành HA; replication, consistency, backup và failover vẫn phải thiết kế riêng.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
PVC -> StorageClass -> CSI Controller -> Storage backend
 |                         |
 v                         v
Pod -> kubelet -> CSI Node Plugin -> attach / stage / format / mount
```

PVC yêu cầu dung lượng và access mode. Provisioner tạo volume và PV, scheduler xét topology, CSI controller attach volume, sau đó kubelet gọi CSI node plugin để stage/format/mount. Khi Pod chuyển node, detach/unmount phải hoàn tất trước khi attach lại.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

| Thành phần | Vai trò | Failure |
|---|---|---|
| PVC | Request của workload | sai class/size/access mode |
| PV | Đại diện volume đã provision | Released/Failed/sai volume handle |
| StorageClass | Policy dynamic provisioning | sai provisioner/parameter/topology |
| CSI Controller | provision, attach, resize, snapshot | API timeout/RBAC/throttle |
| CSI Node Plugin | stage/mount trên node | permission/filesystem/mount error |
| VolumeAttachment | Theo dõi attach tới node | stale attachment/multi-attach |

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

`emptyDir` mất khi Pod bị xóa; `hostPath` phụ thuộc node và không phù hợp database Production. Pod dùng PVC thay vì tham chiếu provider-specific volume trực tiếp.

## 6.2. Trung cấp

`WaitForFirstConsumer` trì hoãn provisioning để volume phù hợp topology. `Retain` giữ backend volume sau khi xóa claim; `Delete` tự xóa volume. `allowVolumeExpansion` chỉ hỗ trợ tăng size khi driver/filesystem cho phép; shrink thường không hỗ trợ.

## 6.3. Nâng cao

`ReadWriteOnce` thường là read-write trên một node, không nhất thiết chỉ một Pod. `ReadWriteMany` cần backend shared filesystem. StatefulSet nên dùng `volumeClaimTemplates` để mỗi replica có PVC riêng; không dùng một PVC RWO chung cho nhiều replica ở nhiều node.

# 7. 🌍 VÍ DỤ THỰC TẾ

- **Development:** `local-path` để test lifecycle, không dùng làm bằng chứng durability Production.
- **AWS Production:** EBS CSI cho block volume RWO; EFS CSI cho shared filesystem; bật encryption, IAM và `WaitForFirstConsumer`.
- **Enterprise:** CSI tích hợp SAN/vSphere; cần kiểm tra zoning, multipath, datastore capacity, failure domain và quy trình restore độc lập cluster.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl get pvc,pv,sc
kubectl describe pvc <pvc> -n <ns>
kubectl describe pod <pod> -n <ns>
kubectl get volumeattachment
kubectl get events -n <ns> --sort-by=.lastTimestamp
kubectl logs -n kube-system deploy/<csi-controller> -c csi-provisioner
kubectl logs -n kube-system ds/<csi-node> -c csi-node
kubectl exec -n <ns> <pod> -- df -h /data
kubectl exec -n <ns> <pod> -- df -i /data
```

Trên node: `findmnt`, `lsblk`, `blkid`, `dmesg -T`, `journalctl -u kubelet`. Luôn lưu namespace, PVC/PV, volume handle, node, timestamp UTC và driver version.

# 9. 📝 LOG

Đọc PVC events trước, sau đó Pod events (`FailedAttachVolume`, `FailedMount`), CSI controller, CSI node/kubelet và cloud/SAN audit log. Correlate bằng volume handle, node name và timestamp; không chỉ đọc application log.

# 10. 📊 METRIC

Theo dõi PVC/PV theo trạng thái, attach/mount error và duration, filesystem/inode usage, backend latency/IOPS/throughput, CSI restart/workqueue/API throttle, snapshot/backup success và restore duration.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp3-encrypted
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
reclaimPolicy: Retain
parameters:
  type: gp3
  encrypted: "true"
  fsType: ext4
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: orders-data
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: gp3-encrypted
  resources:
    requests:
      storage: 100Gi
```

`Retain` bảo vệ dữ liệu nhưng cần cleanup process. Không format volume cũ và không đổi access mode tùy tiện trên PVC đang chứa dữ liệu.

# 12. 🔧 TROUBLESHOOTING

```text
PVC Pending -> describe/events -> StorageClass/CSI/quota/topology/access mode
PVC Bound + Pod lỗi -> phân biệt FailedAttach và FailedMount
FailedAttach -> VolumeAttachment/backend/AZ/stale node
FailedMount -> CSI node/kubelet/device/filesystem/permission
I/O error -> dmesg/backend health/latency
Data mất -> reclaim policy/backup/restore/RCA
```

Không xóa PVC/PV để “thử lại” trước khi kiểm tra reclaim policy.

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — PVC Pending

Kiểm tra event, StorageClass, CSI controller, quota và topology. Sửa provisioner/parameter hoặc quota; không tạo PV trỏ nhầm volume để bypass.

### Incident 02 — FailedMount

Đối chiếu `fsType`, device path, kubelet/CSI node log và `dmesg`. Không format nếu volume có dữ liệu.

### Incident 03 — Multi-Attach

Xác nhận Pod cũ đã terminate và volume đã detach. Chỉ force detach khi chắc chắn node cũ không còn ghi dữ liệu vì có thể gây corruption.

### Incident 04 — Filesystem full

Kiểm tra `df -h`, `df -i`, file lớn và deleted-open files. Mở rộng PVC nếu được hỗ trợ, verify filesystem trong Pod và sửa retention/cleanup.

### Incident 05 — Restore snapshot không nhất quán

Kiểm tra `readyToUse`, driver compatibility và application consistency. Với database, dùng application-aware backup/PITR hoặc flush trước snapshot; verify checksum/query sau restore.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Phù hợp | Trade-off |
|---|---|---|
| Block/EBS | database, latency thấp | thường RWO, phụ thuộc AZ |
| File/EFS | nhiều node cần shared path | locking/latency/cost |
| Object/S3 | backup, artifact | không phải POSIX filesystem |
| Snapshot | clone/rollback nhanh | không luôn application-consistent |
| Backup | DR và long-term recovery | restore chậm hơn, phải test |
| Retain | dữ liệu quan trọng | volume orphan nếu thiếu cleanup |

# 15. ❌ COMMON MISTAKES

- Dùng `hostPath` cho database Production.
- Nghĩ `RWO` nghĩa là chỉ một Pod được dùng volume.
- Dùng snapshot thay backup đã kiểm thử restore.
- Xóa PVC/PV khi chưa xem reclaim policy.
- Bỏ qua topology trong multi-AZ.
- Chỉ monitor capacity mà bỏ qua inode, latency, attach error và backup age.
- Dùng một PVC RWO cho nhiều StatefulSet replica.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. PVC khác PV và StorageClass thế nào?
2. Vì sao cần `WaitForFirstConsumer`?
3. `FailedAttachVolume` khác `FailedMount` ra sao?
4. Khi gặp `Multi-Attach` cần bảo vệ điều gì?
5. Snapshot khác backup như thế nào?
6. Khi nào dùng `Retain`?
7. Vì sao replication không thay backup?
8. Vì sao volume không thể shrink tùy ý?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Mô tả lifecycle PVC dynamic provisioning.
- CSI controller và CSI node plugin làm gì?
- Thiết kế storage cho PostgreSQL trên Kubernetes thế nào?
- EBS, EFS và S3 khác nhau ra sao?
- Pod chuyển node nhưng volume không attach được, bạn debug thế nào?
- Bảo vệ dữ liệu khi Helm uninstall hoặc xóa namespace ra sao?
- Thiết kế backup với RPO 15 phút thế nào?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**PVC Bound nhưng Pod không mount được:** Em xem `describe pod` và events để phân biệt attach với mount failure, kiểm tra `VolumeAttachment`, CSI controller/node, kubelet và backend state. Nếu là stale attachment, em xác nhận node cũ không còn ghi trước khi detach. Nếu là filesystem/permission, em kiểm tra device, `fsType`, mount option và `dmesg`. Sau mitigation em verify I/O, metric và dữ liệu rồi ghi RCA.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Không nói “Kubernetes tự lo storage”. Kubernetes điều phối lifecycle; durability, replication, consistency và restore phụ thuộc backend/application. Luôn nêu impact dữ liệu, evidence, rollback và cách verify.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
PVC Pending?
 -> StorageClass/provisioner?
 -> CSI controller/API/quota?
 -> topology/access mode?
PVC Bound nhưng FailedMount?
 -> FailedAttach hay FailedMount?
 -> VolumeAttachment/node/kubelet/CSI node/backend?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu PV/PVC/StorageClass/CSI.
- [ ] Hiểu attach, stage, format, mount và unmount.
- [ ] Đọc được events, CSI log, kubelet log và backend state.
- [ ] Xử lý được Pending, FailedMount, Multi-Attach và filesystem full.
- [ ] Có kế hoạch backup/restore và verification.

# 22. 🃏 FLASHCARDS

**Q:** PVC là gì? **A:** Request khai báo dung lượng, access mode và StorageClass.  
**Q:** CSI Node Plugin làm gì? **A:** Stage/mount volume trên node.  
**Q:** `Retain` là gì? **A:** Giữ volume backend sau khi claim bị xóa.  
**Q:** `WaitForFirstConsumer` giải quyết gì? **A:** Chọn topology phù hợp Pod trước khi provision.  
**Q:** Snapshot có thay backup không? **A:** Không; phải có backup và restore test.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: lifecycle PV/PVC/CSI, access mode, topology, attach/mount.  
🟠 Phải nắm: events, CSI logs, reclaim policy và restore flow.  
🟡 Nên biết: snapshot consistency, encryption, expansion và migration.

# 24. 🎯 LIÊN HỆ VỚI JD

Topic phục vụ trực tiếp việc vận hành Kubernetes, Stateful workload, backup/restore và Production incident. Điểm quan trọng là biết giới hạn của Kubernetes thay vì chỉ nhớ YAML.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV có EKS/Kubernetes nhưng chưa chứng minh storage operation, phải ghi rõ đã làm Production, đã lab hay chỉ hiểu lý thuyết. Không khẳng định đã xử lý data recovery nếu CV không có evidence.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Thiết kế cluster chạy PostgreSQL với block storage RWO, shared file storage cho upload, object storage cho backup, encryption, monitoring và restore test hàng quý. Tách failure domain theo AZ/DC và ghi RPO/RTO cho từng loại dữ liệu.

# 27. 🧪 HANDS-ON LAB

1. Tạo StorageClass/PVC và kiểm tra dynamic provisioning.
2. Ghi dữ liệu, reschedule Pod và xác minh dữ liệu còn nguyên.
3. Cố ý dùng StorageClass sai để tạo `Pending`, rồi điều tra events.
4. Tạo snapshot/restore và kiểm tra checksum.
5. Mô phỏng filesystem full, mở rộng PVC và verify trong Pod.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

```text
Pending -> events -> StorageClass/CSI/quota/topology
Bound + Pending Pod -> scheduler/node topology
FailedAttach -> VolumeAttachment/backend/AZ/stale node
FailedMount -> CSI node/kubelet/device/filesystem/permission
I/O error -> dmesg/backend health/latency
Data loss -> reclaim policy/backup/restore/RCA
```

# 29. 🧾 PRODUCTION READINESS REVIEW

Phải có StorageClass policy, encryption, reclaim policy được review, capacity alert, backup/restore test, CSI upgrade plan, topology/failure-domain design, runbook và owner chịu trách nhiệm dữ liệu.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| PV/PVC/CSI | ☐ | ☐ | ☐ |
| Provision/attach/mount debug | ☐ | ☐ | ☐ |
| Backup/restore | ☐ | ☐ | ☐ |
| Production design | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: PV/PVC/StorageClass, CSI lifecycle, access mode, topology, reclaim policy, Pending, FailedMount, Multi-Attach, snapshot-vs-backup và database consistency.

# 32. 📋 FINAL CHECKLIST

- [ ] Giải thích được flow PVC đến filesystem trong Pod.
- [ ] Phân biệt provisioning, attach và mount failure.
- [ ] Thiết kế storage theo workload và failure domain.
- [ ] Có kế hoạch backup, restore, encryption và rollback.
- [ ] Xử lý incident mà không làm mất dữ liệu.

---
END OF FILE
