# Cẩm nang Phỏng vấn & Thực chiến: VMware vSphere / ESXi

## 1. Mục tiêu học 🔴
- Nắm vững kiến trúc ảo hóa nền tảng (Hypervisor Type 1) của VMware.
- Hiểu cách quản lý tài nguyên (CPU, RAM, Storage, Network) và các tính năng High Availability (HA), vMotion.
- Biết cách quản trị thông qua vCenter và troubleshoot hiệu năng các máy ảo (VM) trong Data Center lớn.

## 2. Kiến thức nền cần biết 🟠
- Kiến trúc máy tính (CPU instruction sets, bộ nhớ ảo).
- Networking (VLAN, Trunking, LACP).
- SAN/NAS Storage (iSCSI, Fiber Channel, NFS).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
VMware vSphere là chuẩn công nghiệp tại các Enterprise truyền thống lớn. Ở Enterprise, hầu hết mọi hệ thống Core (TOS, ERP, Databases, AD) đều được ảo hóa trên nền tảng VMware. Hệ thống này bao gồm nhiều cụm Cluster đặt tại các Data Center khác nhau để đảm bảo dự phòng thảm họa (Disaster Recovery).

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🟠
```
+-----------------------------------------------------------+
|                      vCenter Server                       |
| (Quản lý tập trung, HA, vMotion, DRS, Templates, Clones)  |
+------------------------------+----------------------------+
                               | (Quản lý)
      +------------------------+------------------------+
      |                        |                        |
+-----v---------+      +-------v-------+      +---------v-----+
|   ESXi Host 1 |      |   ESXi Host 2 |      |   ESXi Host 3 |
| +----+ +----+ |      | +----+ +----+ |      | +----+ +----+ |
| | VM1| | VM2| |      | | VM3| | VM4| |      | | VM5| | VM6| |
| +----+ +----+ |      | +----+ +----+ |      | +----+ +----+ |
|  Hypervisor   |      |  Hypervisor   |      |  Hypervisor   |
+---------------+      +---------------+      +---------------+
      |                        |                        |
+-----v------------------------v------------------------v-----+
|                   Shared Storage (SAN / NAS)                |
|                    (Datastore: VMFS / NFS)                  |
+-------------------------------------------------------------+
```

## 5. Các thành phần quan trọng (Failure modes, impact) 🔴
- **ESXi Hypervisor (VMkernel)**: OS chạy trực tiếp trên bare-metal. *Failure*: PSOD (Purple Screen of Death) do lỗi RAM/driver làm toàn bộ VM trên Host chết.
- **vCenter Server (vCSA)**: Quản lý toàn bộ cluster. *Failure*: Không thể vMotion, DRS, hay clone VM, nhưng các VM đang chạy vẫn hoạt động bình thường.
- **vSphere HA**: Tính năng tự động restart VM sang Host khác khi 1 Host sập. *Failure*: Lỗi mạng heartbeat dẫn đến Split-brain hoặc không thể restart.
- **Datastore (VMFS)**: Nơi chứa file `vmdk` của VM. *Failure*: Mất kết nối (APD/PDL) làm mọi VM bị treo I/O cứng.

## 6. Concepts 🔴
- **Cơ bản**: VMDK, Snapshot, vSwitch, Port Group.
- **Trung cấp**: vMotion (Live migration VM giữa các host), Storage vMotion, Distributed Switch (vDS), DRS (Distributed Resource Scheduler).
- **Nâng cao**: CPU Scheduling (NUMA nodes), Transparent Page Sharing (TPS), vSAN, NSX (SDN).

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Dùng VMware Workstation (Type 2).
- **Prod**: 1 Cluster 3 Hosts ESXi kết nối chung vào 1 con SAN. Kích hoạt HA, nếu Host 1 cháy nguồn, VM tự bật lại ở Host 2.
- **Enterprise**: Cluster lớn với vSAN hoặc Fiber Channel SAN cao cấp. vCenter Linked Mode giữa 2 site để quản lý chung qua 1 màn hình.

## 8. Command / Tool cần biết 🔴
- **esxcli**: Công cụ chính (`esxcli network`, `esxcli storage`).
- **esxtop**: Giám sát performance thời gian thực (giống `top` trên Linux nhưng cho ESXi).
- **vmkfstools**: Quản lý file VMFS.
- **PowerCLI**: Module PowerShell tự động hóa VMware.

## 9. Log 🔴
- **hostd.log**: Log chính của service quản lý ESXi (vị trí `/var/log/hostd.log`).
- **vpxa.log**: Log agent giao tiếp với vCenter.
- **vmkernel.log**: Log của core OS (driver lỗi, I/O errors, iSCSI drops).
- **vmware.log**: Nằm trong thư mục của mỗi VM, lưu lịch sử boot/snapshot của VM đó.

## 10. Metric 🟠
Dùng **esxtop**:
- **CPU**: `%RDY` (CPU Ready - Thời gian VM phải đợi CPU thực), nếu > 10% là bị CPU Contention (nghẽn).
- **RAM**: Ký hiệu `SWP` (Swap), `MEM`.
- **Storage**: `DAVG` (Device Average Latency), `KAVG` (Kernel Average Latency). Nếu DAVG > 20ms là Storage đang quá tải.

## 11. Configuration 🟠
Xóa 1 snapshot bị kẹt qua command:
```bash
vim-cmd vmsvc/getallvms # Lấy Vmid
vim-cmd vmsvc/snapshot.get [Vmid]
vim-cmd vmsvc/snapshot.removeall [Vmid]
```

## 12. Troubleshooting Methodology 🔴
1. **VM chạy chậm**: Xác định do CPU, RAM hay Disk I/O bằng cách soi esxtop hoặc Performance chart trên vCenter.
2. **ESXi Host bị Disconnect**: Xem có ping được host không. Nếu ping được mà vCenter báo đỏ, restart management agents (`services.sh restart`).
3. **VM bị treo**: Xem log của VM (`vmware.log`), kiểm tra xem có đang consolidate snapshot không, kiểm tra Datastore có bị đầy không.

## 13. Production Incident 🔴
**Scenario: Snapshot Consolidation Issue làm treo máy chủ Database**
- **Symptoms**: VM chứa DB Oracle thỉnh thoảng bị treo đơ (freeze) vài giây. Datastore cảnh báo sắp hết dung lượng.
- **Impact**: Ứng dụng timeout, user phàn nàn.
- **Root Cause**: Phần mềm Backup chạy qua đêm tạo Snapshot, nhưng khi xóa (consolidate) thì file Delta đã quá lớn. ESXi phải stun (tạm dừng) VM một lúc để merge data từ snapshot vào disk gốc.
- **Fix**: Cho chạy consolidation ngoài giờ hành chính. 
- **Prevention**: Xóa snapshot trong vòng 72h, không để lưu snapshot quá lâu.

## 14. So sánh 🟠
- **Thick Provision Lazy Zeroed vs Eager Zeroed vs Thin Provision**: 
  - *Thin*: Dùng bao nhiêu cấp bấy nhiêu (tiết kiệm, nhưng rủi ro over-provision).
  - *Thick Lazy*: Chiếm sẵn dung lượng nhưng chưa zero out data cũ, tốc độ tạo nhanh.
  - *Thick Eager*: Chiếm sẵn và zero out toàn bộ (tốn thời gian tạo, tốc độ I/O nhanh nhất, thường dùng cho DB/Cluster).
- **Standard vSwitch vs Distributed vSwitch**: Standard cấu hình trên từng host. Distributed cấu hình 1 lần trên vCenter, đẩy xuống mọi host, hỗ trợ LACP, NetFlow.

## 15. Common Mistakes 🟠
- Over-allocate CPU (cấp quá nhiều vCPU cho 1 VM) làm tăng chỉ số %RDY, khiến VM chạy chậm hơn so với khi ít vCPU.
- Quên gỡ đĩa CD/ISO sau khi cài xong OS.
- Tạo máy ảo xong không cài VMware Tools.

## 16. Knowledge Check 🔴
- vMotion khác Storage vMotion chỗ nào? (vMotion chuyển RAM/CPU giữa 2 host, Storage vMotion chuyển dữ liệu `vmdk` giữa 2 Datastore).
- DRS dùng làm gì? (Cân bằng tải tài nguyên VM tự động giữa các host trong cluster).

## 17. Câu hỏi phỏng vấn 🔴
- **Cơ bản**: Ping đến VM bị rớt, làm sao check từ ESXi? (Check vmnic status, check Port Group có đúng VLAN ID không).
- **Nâng cao**: Hiện tượng CPU Ready Time cao là gì? Cách khắc phục?
- **Troubleshooting**: Máy chủ ESXi bị PSOD (màn hình tím). Em sẽ xử lý thế nào? (Chụp ảnh màn hình lấy mã lỗi, reboot host để VM khởi động lại trên host khác nhờ HA, sau đó mở log file phân tích, update driver/firmware hoặc gọi vendor).

## 18. Đáp án phỏng vấn 🟠
- **Trả lời "cấp vCPU"**: "Không phải cứ cấp nhiều vCPU là nhanh. ESXi dùng co-scheduling, nếu cấp 8 vCPU thì ESXi phải tìm đủ 8 core vật lý rảnh rỗi mới cho VM chạy, gây ra %RDY cao. Nên bắt đầu từ 2 vCPU và scale-up dần nếu thực sự cần."

## 19. Cách trả lời như Engineer 🔴
"Đối với hệ thống quan trọng, em không bao giờ bỏ qua cảnh báo Snapshot. Hầu hết các lỗi sập Datastore và treo ứng dụng mà em gặp đều do Snapshot để quên hoặc phình to. Em luôn có script PowerCLI chạy hàng ngày để report các snapshot tồn tại quá 3 ngày và alert qua email."

## 20. Follow-up Question Tree 🟠
- Q: Tính năng HA làm sao biết 1 host bị chết? -> A: Dùng Heartbeat qua Management Network và Datastore (Datastore heartbeating).

## 21. Checklist sau khi học 🟠
- [ ] Dựng ESXi lồng (Nested ESXi) trong VMware Workstation.
- [ ] Cài đặt vCenter (vCSA).
- [ ] Thực hiện vMotion thử.

## 22. Flashcards 🟠
- **Q**: Lệnh restart Management agents trên ESXi?
- **A**: `services.sh restart` (qua SSH hoặc DCUI).

## 23. Đánh dấu 🔴 Phải hiểu, 🟠 Phải nắm.
*(Đã tích hợp)*
