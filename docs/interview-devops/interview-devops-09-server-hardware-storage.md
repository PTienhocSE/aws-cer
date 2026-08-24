# 9. Server Hardware & Storage

## 1. Why This Matters
Với 60% công việc của vị trí tại Enterprise tập trung vào System Engineer on-premise, bạn phải làm việc trực tiếp với hệ thống phần cứng cực kỳ đồ sộ từ các hãng Dell-EMC, HPE, Hitachi. Việc hiểu rõ Server Architecture (CPU, RAM ECC, HBA cards) và Storage Area Network (SAN), RAID là kỹ năng sinh tồn. Tại các doanh nghiệp lớn, độ trễ và khả năng phục hồi dữ liệu phải được tính bằng mili-giây và megabyte; hỏng hóc phần cứng là chuyện xảy ra hàng ngày và bạn phải biết cách chẩn đoán và thay thế.

## 2. Interview Priority
> 🟠 HIGH

## 3. CV Connection
- **What candidate already knows:** Bạn đã quen dùng AWS (EBS, S3, EFS), quen với khái niệm IOPS, Throughput, Block Storage, Object Storage.
- **What interviewer will likely ask:** Sự khác biệt giữa cấu hình RAID cứng (Hardware RAID) và làm thế nào để cấu hình SAN Storage (LUN, Zoning) cho ESXi? So sánh EBS với SAN LUN.
- **Skill gap to address:** AWS giấu toàn bộ phần cứng (underlying hardware). Bạn cần phải học về form factor (Rack, Blade), Management Interface (iDRAC, iLO), các chuẩn kết nối lưu trữ (Fibre Channel, SAS), và khái niệm RAID vật lý.

## 4. Prerequisites
- Kiến thức cơ bản về máy tính.
- Hiểu biết cơ bản về Network (IP, Switch).
- Đã đọc Chapter 8 (VMware) vì Storage thường được map vào ESXi.

## 5. Core Concepts

### 5.1 Server Hardware Components & Form Factors

#### Definition
- **Rack Server:** Máy chủ dạng thanh, gắn vào tủ Rack (đo bằng U - Unit, VD: 1U, 2U). Phổ biến nhất.
- **Blade Server:** Máy chủ dạng phiến mỏng, cắm vào một Chassis chung. Dùng chung nguồn, quạt, network switch ảo. Tiết kiệm không gian và cáp.
- **Components:** CPU (Xeon, EPYC), RAM ECC (Tự sửa lỗi), NIC (Network Interface Card), HBA (Host Bus Adapter - Card quang để nối với SAN storage).

#### Why It Exists
Để cung cấp năng lực tính toán vật lý, ổn định cao (Redundant Power Supply, Redundant Fans).

#### Real-world Example
Dell PowerEdge R740 (Rack 2U) thường được dùng làm ESXi host tại các Data Center của Enterprise. HP Synergy (Blade) được dùng ở lõi hệ thống nơi cần mật độ ảo hóa cao.

### 5.2 Out-of-Band Management (iDRAC / iLO)

#### Definition
- **iDRAC (Dell) / iLO (HPE):** Là một chip độc lập gắn trên mainboard máy chủ, có cổng mạng riêng. Nó hoạt động ngay cả khi server đang tắt (chỉ cần cắm nguồn).
- Chức năng: Cho phép quản trị viên bật/tắt máy từ xa, xem màn hình Console (Virtual Console), map ổ đĩa ảo (Virtual Media để cài OS), theo dõi nhiệt độ, lỗi phần cứng.

#### Interview Answer Template
"iDRAC và iLO là Out-of-Band management. Nhờ nó, em có thể ngồi ở văn phòng kiểm tra log lỗi RAM, cài đặt hệ điều hành thông qua file ISO từ xa, hoặc ép khởi động lại server bị treo mà không cần phải chạy xuống tận phòng máy lạnh Data Center."

### 5.3 Storage Types: DAS, NAS, SAN

#### Definition
- **DAS (Direct Attached Storage):** Ổ cứng cắm trực tiếp vào server (VD: ổ đĩa C:, D: trên máy tính).
- **NAS (Network Attached Storage):** Lưu trữ chia sẻ qua mạng LAN, truy cập qua File-level protocols (NFS, SMB/CIFS).
- **SAN (Storage Area Network):** Mạng lưu trữ chuyên biệt (thường dùng cáp quang Fibre Channel - FC hoặc iSCSI). Cung cấp Block-level storage. Server nhận storage từ SAN và thấy nó như một ổ đĩa cắm trực tiếp (LUN).

#### How It Works (SAN)
Storage Array (như hệ thống của Hitachi/Dell EMC) tạo ra các LUNs (Logical Unit Numbers). Server kết nối tới SAN Switch qua card HBA. Admin cấu hình Zoning trên SAN Switch và Masking trên Storage Array để quyết định Server nào được thấy LUN nào.

### 5.4 RAID (Redundant Array of Independent Disks)

#### Definition
Gom nhiều ổ cứng vật lý thành một ổ ảo (Logical volume) để tăng tốc độ (Performance) và/hoặc tăng tính sẵn sàng, chịu lỗi (Redundancy).
- **RAID 0 (Striping):** Cần ≥ 2 ổ. Tốc độ rất cao. Hỏng 1 ổ mất sạch data. KHÔNG có redundancy.
- **RAID 1 (Mirroring):** Cần ≥ 2 ổ. Dữ liệu ghi giống hệt nhau lên cả 2 ổ. Hỏng 1 ổ không sao. Dung lượng thực = 1/2.
- **RAID 5 (Striping with Parity):** Cần ≥ 3 ổ. Phân tán dữ liệu và mã kiểm tra (parity). Hỏng 1 ổ vẫn khôi phục được. Phổ biến vì cân bằng chi phí và an toàn.
- **RAID 6:** Giống RAID 5 nhưng 2 lớp parity. Cần ≥ 4 ổ. Chịu hỏng 2 ổ cùng lúc.
- **RAID 10 (1+0):** Kết hợp RAID 1 và RAID 0. Cần ≥ 4 ổ. Tốc độ cao của 0 và an toàn của 1. Đắt tiền nhất.

#### Interview Answer Template
"Đối với hệ thống Database, em sẽ chọn RAID 10 vì nó cho IOPS cao nhất và an toàn. Đối với File Server lưu file dung lượng lớn không cần tốc độ đọc ghi IOPS quá cao, em sẽ chọn RAID 5 hoặc RAID 6 để tối ưu chi phí."

## 6. Architecture (SAN Storage with ESXi)
```
[ ESXi Host 1 ]        [ ESXi Host 2 ]
  | HBA 1 | HBA 2        | HBA 1 | HBA 2
  +---+---+              +---+---+
      |      Multi-path      |
    [ FC SAN Switch (Zoning) ]
             |
   [ Storage Array (Hitachi / Dell EMC) ]
   ( LUN 1 - LUN 2 - LUN 3 ) <-- Masking
```

## 7. Hands-on / Configuration Concepts
- **WWN (World Wide Name):** Địa chỉ MAC của card quang HBA. Cần biết WWN để cấu hình Zoning.
- **Zoning:** Cấu hình trên SAN Switch. Giống như ACL, cho phép port này giao tiếp với port kia.
- **LUN Masking:** Cấu hình trên Storage Array. Chỉ định WWN nào được phép truy cập vào LUN nào.
- **MPIO (Multi-Path I/O):** Server cắm 2 dây quang qua 2 Switch khác nhau về Storage. Nếu đứt 1 dây, dữ liệu đi dây còn lại, không gián đoạn.

## 8. Common Interview Questions

### Q1: Phân biệt NAS và SAN? Khi nào dùng cái nào?
**Model Answer:** NAS giao tiếp ở mức File-level (NFS/SMB), phù hợp để làm file server chia sẻ tài liệu chung. SAN giao tiếp ở mức Block-level (FC/iSCSI), server nhận diện SAN như ổ cứng vật lý cục bộ, phù hợp cho Database hoặc làm Datastore cho ESXi VMware vì yêu cầu tốc độ và truy cập low-level cực nhanh.

### Q2: (Liên hệ CV) So sánh SAN LUN với AWS EBS?
**Model Answer:** Bản chất chúng giống nhau: đều là Block Storage kết nối qua mạng (Network-attached block storage). AWS EBS thực chất là một dịch vụ SAN khổng lồ do AWS ẩn giấu đi.
- SAN LUN on-prem: Phải thiết kế hardware RAID, mua SAN Switch, kéo cáp quang (Fibre Channel), tự cấu hình LUN masking, MPIO.
- AWS EBS: Chỉ cần vài click API, AWS lo hết phần cứng phía dưới, tự động replicate dữ liệu trong AZ để đảm bảo an toàn.

### Q3: Giải thích RAID 10? Tại sao không dùng RAID 5 cho Database?
**Model Answer:** RAID 10 là kết hợp giữa Mirroring (RAID 1) và Striping (RAID 0). Nó đòi hỏi tối thiểu 4 ổ. Database (như SQL Server/PostgreSQL) sinh ra rất nhiều Random Write I/O. Ở RAID 5, mỗi lần Write hệ thống phải đọc và tính toán lại Parity (Write Penalty rất lớn). Ở RAID 10 không có Write Penalty của Parity nên Write cực nhanh và an toàn (chịu hỏng 1 ổ mỗi nhánh).

### Q4: Máy chủ đang chạy không vào được mạng, ping rớt. Khi chạy xuống DC thấy đèn báo lỗi màu cam (Amber light). Bạn xử lý thế nào?
**Model Answer:**
1. Em sẽ truy cập vào iDRAC (Dell) hoặc iLO (HP) qua mạng Management tĩnh để kiểm tra System Event Log (SEL).
2. Kiểm tra xem lỗi báo là gì (VD: Lỗi RAM, hỏng nguồn, hay nhiệt độ cao).
3. Nếu là máy chủ VMware, em sẽ vào vCenter chuyển host đó sang Maintenance Mode để vMotion các VM đi nhằm cách ly ảnh hưởng (nếu host chưa hoàn toàn sập).
4. Gọi hỗ trợ bảo hành hãng (Support Vendor) để mang linh kiện dự phòng (part replacement) đến thay.

## 9. Scenario-Based Questions

### Scenario 1: Mở rộng Datastore
**Situation:** Ổ cứng (Datastore) của ESXi host báo đầy, bạn được cấp thêm 1 TB từ Hitachi Storage. Quá trình cấu hình như thế nào?
**Model Answer:**
Bên Storage Admin sẽ tạo LUN 1TB và mask cho các WWN của ESXi hosts. Trên vCenter, em sẽ rescan Storage Adapter trên ESXi để nó nhận diện LUN mới. Sau đó có thể chọn "Add Storage" để format thành VMFS Datastore mới, hoặc chọn Datastore cũ và "Increase Datastore Capacity" để ghép dung lượng mới vào (Extent).

### Scenario 2: Cảnh báo Predictive Failure
**Situation:** Hệ thống iDRAC báo lỗi "Predictive Failure" trên một ổ cứng thuộc RAID 5. Ổ cứng vẫn hoạt động và đèn màu xanh nhấp nháy.
**Model Answer:** "Predictive Failure" nghĩa là hệ thống chẩn đoán SMART thấy ổ cứng sắp hỏng (sắp bad sector) nhưng chưa chết hẳn.
Hành động: KHÔNG ĐỢI NÓ CHẾT. Chuẩn bị ổ đĩa mới chuẩn loại. Thông thường có thể dùng tính năng "Offline" ổ cứng lỗi (ép nó rớt khỏi RAID) qua phần mềm quản lý RAID. Sau đó rút ổ cứng cũ ra (Hot-swap), cắm ổ cứng mới vào. Card RAID sẽ tự động rebuild dữ liệu từ các ổ cứng còn lại sang ổ mới.

## 10. Key Takeaways
- iLO/iDRAC là OOB management, cực quan trọng cho System Admin on-premise.
- Block Storage (SAN) dùng Fibre Channel/iSCSI, File Storage (NAS) dùng NFS/SMB.
- RAID 10 nhanh và an toàn cho DB (write penalty thấp), RAID 5/6 tiết kiệm dung lượng, dùng cho Data chung.
- Multi-Path (MPIO) bắt buộc phải cấu hình trên server để đảm bảo kết nối SAN không bị Single Point of Failure.
