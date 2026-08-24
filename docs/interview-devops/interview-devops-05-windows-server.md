# Cẩm nang Phỏng vấn & Thực chiến: Windows Server

## 1. Mục tiêu học 🔴
- Nắm vững kiến trúc, quản trị và vận hành hệ điều hành Windows Server trong môi trường Enterprise.
- Hiểu cách tối ưu hóa, giám sát và xử lý sự cố (troubleshooting) trên hệ thống Windows Server tại các doanh nghiệp quy mô lớn.
- Biết cách sử dụng PowerShell để tự động hóa các tác vụ quản trị.

## 2. Kiến thức nền cần biết 🟠
- Kiến thức cơ bản về hệ điều hành, quản lý bộ nhớ, CPU, disk I/O.
- Cơ bản về mạng (TCP/IP, DNS, DHCP, SMB).
- Phân quyền file system (NTFS, ReFS).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
Trong môi trường doanh nghiệp lớn quy mô lớn như Enterprise System, hệ thống Windows Server thường đóng vai trò xương sống cho:
- **Active Directory / Identity Management**: Quản lý hàng ngàn user và thiết bị.
- **Core Enterprise System**: Một số ứng dụng lõi quản lý container và bãi có thể chạy hoặc tích hợp qua Windows.
- **File & Print Services**: Phục vụ các phòng ban nội bộ, hải quan.
- **IIS & .NET Applications**: Host các hệ thống web portal nội bộ.
Đòi hỏi tính sẵn sàng cao (High Availability - HA), bảo mật nghiêm ngặt và khả năng scale.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🟠
```
+-----------------------------------------------------------+
|                      User Mode                            |
|  +-------------+  +-------------+  +-------------------+  |
|  | System Apps |  | Service Apps|  | User Applications |  |
|  +-------------+  +-------------+  +-------------------+  |
|         |                |                   |            |
|       +-----------------------------------------+         |
|       |       Environment Subsystems            |         |
|       |       (Win32, POSIX, etc.)              |         |
|       +-----------------------------------------+         |
+--------------------------|--------------------------------+
                           | System Calls
+--------------------------|--------------------------------+
|                     Kernel Mode                           |
|       +-----------------------------------------+         |
|       |           Executive Services            |         |
|       | (I/O Mgr, Object Mgr, Security, etc.)   |         |
|       +-----------------------------------------+         |
|                           |                               |
|       +-----------------------------------------+         |
|       |                 Kernel                  |         |
|       +-----------------------------------------+         |
|                           |                               |
|       +-----------------------------------------+         |
|       |      Hardware Abstraction Layer (HAL)   |         |
|       +-----------------------------------------+         |
+-----------------------------------------------------------+
```

## 5. Các thành phần quan trọng (Components, failure modes) 🔴
- **Registry**: Lưu cấu hình hệ thống. *Failure mode*: Corrupted registry làm sập boot hoặc ứng dụng lỗi.
- **Services (services.msc)**: Chạy ngầm. *Failure mode*: Service treo làm ứng dụng downtime.
- **Event Log**: Ghi log lỗi. *Failure mode*: Đầy log hoặc bị overwrite làm mất dấu vết troubleshoot.
- **NTFS/ReFS**: Hệ thống file. *Failure mode*: Bad sectors, file locked, permission borked.

## 6. Các concept quan trọng 🔴
- **Cơ bản**: Roles & Features, Server Manager, RDP.
- **Trung cấp**: Group Policy (GPO), PowerShell Remoting, Windows Server Failover Cluster (WSFC).
- **Nâng cao**: Storage Spaces Direct (S2D), Hyper-V networking, Nano Server, Core Server.

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Cài Windows Server Desktop Experience để dev test ứng dụng .NET.
- **Prod**: Chạy Windows Server Core để giảm attack surface và tiết kiệm tài nguyên.
- **Enterprise/Multi-DC**: Triển khai Failover Cluster cho SQL Server AlwaysOn giữa 2 Data Center (Ví dụ Primary DC và Hiệp Phước).

## 8. Command / Tool cần biết 🔴
- `Get-Process`, `Get-Service`, `Restart-Service` (PowerShell)
- `tasklist`, `taskkill`
- `ipconfig`, `netstat`, `Test-NetConnection`
- `nslookup`, `ping`, `tracert`
- `chkdsk`, `sfc /scannow`, `dism`
- **Sysinternals Suite**: `Process Explorer`, `Process Monitor` (ProcMon), `TCPView`.

## 9. Log (Locations, interpretation, correlation) 🔴
- **Event Viewer**: Application, Security, Setup, System.
- **Log location mặc định**: `%SystemRoot%\System32\Winevt\Logs\`
- Phân tích: Tìm Event ID (vd: 41 Kernel-Power, 4624 Successful Logon). Correlation giữa System log (lỗi service) và Application log (app crash).

## 10. Metric (CPU, RAM, Disk I/O, vv.) 🟠
- **Task Manager / Resource Monitor** để xem nhanh.
- **Performance Monitor (Perfmon)**:
  - `\Processor(_Total)\% Processor Time`
  - `\Memory\Available MBytes`
  - `\LogicalDisk(C:)\Avg. Disk Queue Length`
  - `\Network Interface(*)\Bytes Total/sec`

## 11. Configuration 🟠
Mẫu script cấu hình Network qua PowerShell:
```powershell
# Đặt IP tĩnh
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1
# Đặt DNS
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("8.8.8.8","8.8.4.4")
# Đổi tên máy và restart
Rename-Computer -NewName "Enterprise-APP-01" -Restart
```

## 12. Troubleshooting Methodology 🔴
1. Xác định lỗi (User report, Alert).
2. Kiểm tra Event Viewer tại thời điểm xảy ra sự cố.
3. Check tài nguyên (CPU, RAM, Disk) qua Task Manager / Perfmon.
4. Check Network (ping, telnet/Test-NetConnection).
5. Sử dụng ProcMon nếu là lỗi mức ứng dụng không rõ nguyên nhân.
6. Check cấu hình / Windows Updates gần đây.

## 13. Production Incident 🔴
**Scenario 1: 100% CPU do Windows Update**
- **Symptoms**: Máy chủ phản hồi chậm, ứng dụng timeout.
- **Impact**: Downtime cho người dùng cuối.
- **Command**: `tasklist` -> thấy `TiWorker.exe` hoặc `svchost.exe` ngốn CPU.
- **Fix tạm thời**: Stop service `wuauserv`.
- **RCA/Prevention**: Cấu hình WSUS hoặc chỉnh policy không tự động update trong giờ hành chính.

## 14. So sánh 🟠
- **Windows Server Core vs Desktop Experience**: Core nhẹ hơn, ít lỗi bảo mật hơn, quản lý qua PowerShell/Windows Admin Center. Desktop có GUI, dễ dùng cho ng mới, nặng hơn.
- **NTFS vs ReFS**: NTFS phổ biến, hỗ trợ nén/mã hóa. ReFS tốt cho dữ liệu lớn, Hyper-V, chống lỗi data corruption tự động.

## 15. Common Mistakes 🟠
- Chạy mọi thứ dưới quyền Administrator.
- Mở port RDP (3389) ra public Internet.
- Không cấu hình Pagefile phù hợp.
- Cài quá nhiều ứng dụng bên thứ 3 lên máy chủ production.

## 16. Interview Knowledge Check 🔴
- 10 cơ bản: Cách xem IP? Cách mở port Firewall?
- 10 hiểu bản chất: Service ngầm chạy bằng tài khoản nào? (Local System, Network Service).
- 10 troubleshooting: Làm gì khi máy chủ bị BSOD (Blue Screen of Death)? (Đọc file minidump).

## 17. Câu hỏi phỏng vấn 🔴
- **Cơ bản**: Kể tên 3 tool bạn dùng để troubleshoot mạng trên Windows?
- **Nâng cao**: Giải thích kiến trúc của Windows Server Failover Cluster (Quorum là gì?)
- **Troubleshooting**: Ứng dụng .NET báo lỗi cấp phát bộ nhớ, dù RAM trống còn nhiều, bạn kiểm tra gì? (Check Pagefile, check 32-bit vs 64-bit app process limit).

## 18. Đáp án phỏng vấn 🟠
- **Trả lời ngắn 20-30s**: Tập trung vào tool và action (VD: "Em sẽ check Event Viewer và Perfmon").
- **Trả lời sâu 1-2m**: Nêu quy trình 6 bước troubleshooting, lấy ví dụ thực tế đã gặp.
- **Bẫy cần tránh**: Không vội vàng "Restart server" mà chưa thu thập log/dump.

## 19. Cách trả lời như Engineer 🔴
"Khi nhận cảnh báo máy chủ CPU 100%, em không vội kill process. Em vào Task Manager/Resource Monitor xác định process, sau đó dùng ProcDump để lấy dump file phân tích offline, và check Event Viewer tìm các system/app errors liên quan. Sau đó mới tính đến việc restart service để giảm tải."

## 20. Follow-up Question Tree 🟠
- Q: Bạn làm gì khi RDP vào server không được? -> Trả lời: Check ping, check port 3389 qua telnet/Test-NetConnection -> Q tiếp: Nếu ping được, port open mà vẫn lỗi "CredSSP encryption oracle remediation" thì sao? -> Trả lời: Update client hoặc chỉnh GPO.

## 21. Checklist sau khi học 🟠
- [ ] Tự build 1 VM Windows Server Core.
- [ ] Viết script PowerShell tự động cài IIS.
- [ ] Đọc hiểu Event log của 1 lỗi dịch vụ cơ bản.

## 22. Flashcards 🟠
- **Q**: Process Monitor (ProcMon) dùng để làm gì?
- **A**: Theo dõi File system, Registry, Network, và Process activity trong thời gian thực.
- **Q**: Lệnh xem file đang bị process nào lock?
- **A**: Dùng Handle.exe (Sysinternals) hoặc Resource Monitor.

## 23. Đánh dấu 🔴 Phải hiểu, 🟠 Phải nắm.
*(Đã được tích hợp vào các tiêu đề)*
