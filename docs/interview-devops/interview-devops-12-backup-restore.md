# 12. Backup & Restore

## 1. Why This Matters
Trong môi trường doanh nghiệp quy mô lớn như Doanh nghiệp Enterprise, dữ liệu (thông tin container, lịch tàu chạy, chứng từ tài chính) là tài sản sống còn. Dù hệ thống có chạy HA (High Availability) đến đâu, HA cũng không bảo vệ bạn khỏi các thảm họa như: Admin vô tình DROP TABLE, Virus Ransomware mã hóa dữ liệu, hoặc cháy nổ Data Center. Backup là phòng tuyến cuối cùng.

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **What candidate already knows:** AWS Backup, tự động tạo EBS Snapshots, RDS Automated Backup, S3 Versioning, đẩy dữ liệu lên S3 Glacier (Cold Storage).
- **What interviewer will likely ask:** Quy trình 3-2-1 backup on-premise là gì? Dùng các công cụ (Veeam, Commvault) để backup VMware VMDK, hoặc dùng rsync/tar cho file level, pg_dump cho PostgreSQL. Bạn có từng Test Restore chưa?
- **Skill gap to address:** Backup vật lý on-premise không chỉ là "Click bật tự động" như Cloud. Nó liên quan đến mua thêm NAS/SAN cho vùng backup, quản lý băng thông mạng để backup không làm chậm server (LAN-free backup), và lập lịch Full/Incremental.

## 4. Prerequisites
- Hiểu Storage (NAS, SAN, S3).
- Hiểu kiến trúc Database (PostgreSQL).

## 5. Core Concepts

### 5.1 RPO & RTO
- **RPO (Recovery Point Objective):** Chấp nhận mất bao nhiêu dữ liệu (tính bằng thời gian). VD: RPO = 1 giờ nghĩa là phải backup ít nhất mỗi giờ 1 lần.
- **RTO (Recovery Time Objective):** Mất bao lâu để hệ thống chạy lại được. VD: RTO = 4 giờ nghĩa là từ lúc hỏng đến lúc restore xong, chạy app lại phải dưới 4 tiếng.

### 5.2 Backup Types
- **Full Backup:** Sao lưu toàn bộ dữ liệu. File lớn nhất, mất nhiều thời gian nhất, nhưng Restore nhanh nhất.
- **Incremental Backup:** Chỉ sao lưu những dữ liệu thay đổi kể từ lần backup gần nhất (Full hoặc Incremental). Backup nhanh, tốn ít dung lượng. Nhưng Restore chậm vì phải ghép Full + Incremental 1 + Incremental 2...
- **Differential Backup:** Sao lưu những dữ liệu thay đổi kể từ lần Full Backup gần nhất. Cân bằng giữa tốc độ Backup và Restore.

### 5.3 The 3-2-1 Rule
Chiến lược tiêu chuẩn cho ngành CNTT:
- Có ít nhất **3** bản sao của dữ liệu (1 bản chính đang chạy + 2 bản backup).
- Lưu trên **2** định dạng lưu trữ (media) khác nhau (VD: Disk NAS và Tape, hoặc Disk và Cloud Object Storage).
- Để **1** bản ở vị trí vật lý khác (Offsite - ở DC khác hoặc lên AWS S3) để phòng cháy nổ toàn bộ tòa nhà.

### 5.4 Application-Consistent vs Crash-Consistent
- **Crash-Consistent:** Backup giống như bạn rút điện server ngay lập tức. Dữ liệu đang trên RAM chưa ghi xuống đĩa sẽ bị mất. DB có thể bị lỗi corruption khi bật lại (VMware Snapshot bình thường là dạng này).
- **Application-Consistent:** Công cụ backup sẽ gọi OS (qua VMware Tools / VSS trên Windows) yêu cầu Database "Tạm dừng ghi mới, xả hết RAM xuống đĩa đi (Quiesce)", sau đó mới chụp Snapshot. Khi restore, DB bật lên chạy ngay, không bị lỗi.

## 6. Architecture (Veeam Backup for VMware & K8s)
```
[ Production VMware Cluster ]           [ Kubernetes (Tanzu/EKS) ]
         | (VM Snapshots)                    | (Velero CSI Snapshots)
         V                                   V
[ Backup Server (Veeam Backup & Replication / Velero) ]
         |
         +--> [ Local NAS Storage (Bản sao thứ 1 - Restore siêu tốc) ]
         |
         +--> [ AWS S3 Object Lock (Bản sao Offsite - Chống Ransomware) ]
```

## 7. Hands-on / Configuration Concepts
- **Veeam:** Phần mềm cực kỳ phổ biến để backup VMware. Nó nói chuyện trực tiếp với vCenter API, lấy VMDK và nén lại.
- **Velero:** Backup chuyên dụng cho Kubernetes (Yaml manifests + Persistent Volumes). Lệnh: `velero backup create my-app-backup --include-namespaces prod`.
- **Database (PostgreSQL):** 
  - Logical Backup: `pg_dump` ra file SQL. Tốt để migrate đổi phiên bản.
  - Physical Backup: `pg_basebackup` copy binary files, kết hợp WAL archiving (Point-in-Time Recovery - PITR). Rất quan trọng cho enterprise.

## 8. Common Interview Questions

### Q1: Chiến lược 3-2-1 là gì? Bạn áp dụng thế nào cho hạ tầng VMware?
**Model Answer:** 3-2-1 là 3 bản copy, 2 loại media, 1 bản offsite. Với VMware, em sẽ dùng phần mềm Veeam.
1. Bản chính đang chạy trên SAN Storage của VMware (Bản 1).
2. Veeam backup các VM hàng đêm và lưu xuống một ổ NAS cứng cục bộ (Bản 2 - khác loại Media, dùng Disk rẽ tiền).
3. Hàng tuần, Veeam tự đồng bộ (Backup Copy Job) file backup đó lên AWS S3 hoặc chuyển ra băng từ (Tape) mang sang tòa nhà khác (Bản 3 - Offsite, chống cháy và ransomware).

### Q2: Sự khác biệt giữa Snapshot (trên Storage/VMware) và Backup?
**Model Answer:** "Snapshot không phải là Backup".
- Snapshot: Lưu lại trạng thái của ổ đĩa tại 1 thời điểm, nhưng nó vẫn nằm trên cùng ổ đĩa cứng vật lý (SAN) đó. Nếu SAN hỏng (cháy), mất cả bản chính lẫn Snapshot. Snapshot chỉ dùng để Rollback nhanh trước khi cập nhật phần mềm (RTO cực nhanh). 
- Backup: Sao chép hẳn dữ liệu sang một thiết bị lưu trữ vật lý độc lập khác, thậm chí khác vị trí địa lý. An toàn hơn Snapshot nhưng Restore tốn thời gian chuyển mạng (copy data ngược lại).

### Q3: Nếu hệ thống bị dính mã độc tống tiền (Ransomware), bản Backup trên NAS mạng của bạn cũng bị nó mã hóa thì sao?
**Model Answer:** Đây là vấn đề thực tế. Để chống Ransomware mã hóa lây lan sang cả ổ chứa Backup, em thiết kế "Immutable Backup" (Backup không thể xóa/sửa). Có thể dùng tính năng S3 Object Lock trên AWS S3, hoặc dùng công nghệ WORM (Write Once Read Many) trên thiết bị Storage chuyên dụng. Kẻ tấn công dù chiếm quyền Admin cũng không thể ra lệnh xóa hay sửa file backup trong thời gian Retention (vd: 30 ngày).

### Q4: Point-in-Time Recovery (PITR) cho DB là gì?
**Model Answer:** Trong PostgreSQL hoặc MySQL, nếu lỡ tay DROP TABLE lúc 10h15 sáng, bản Full backup đêm qua (1h sáng) không cứu được dữ liệu từ 1h đến 10h. PITR kết hợp Full Backup cơ sở và các Transaction Logs (WAL) liên tục sinh ra. Khi restore, em lấy bản Full 1h sáng, sau đó "replay" (phát lại) toàn bộ các logs tới đúng thời điểm 10h14'59s, cứu được 100% dữ liệu trước khi tai nạn xảy ra.

## 9. Scenario-Based Questions

### Scenario 1: Tối ưu hóa quá trình Backup
**Situation:** Job Backup hệ thống DB dung lượng 5TB chạy tốn hơn 12 tiếng, lấn sang giờ làm việc ban ngày gây chậm ứng dụng (I/O overload).
**Model Answer:** Em sẽ:
1. Đổi chiến lược từ Full Backup hàng ngày sang Incremental. Chỉ làm Full vào cuối tuần.
2. Ứng dụng công nghệ CBT (Changed Block Tracking) của VMware. Công cụ chỉ đọc các block thay đổi thay vì quét toàn ổ cứng.
3. Thiết lập LAN-free backup (Direct SAN Access): Chuyển traffic backup đi trực tiếp qua cáp quang SAN FC thay vì đi qua mạng LAN nội bộ, tránh nghẽn cổ chai.

## 10. Key Takeaways
- Snapshot ≠ Backup.
- Luôn luôn phải Test Restore. "Schrödinger's Backup: The condition of any backup is unknown until you try to restore from it".
- Crash-consistent tốt cho File, Application-consistent bắt buộc cho Database.
- RTO (thời gian chết), RPO (mức độ mất data). Hạ thấp RPO/RTO thì tốn nhiều tiền.
