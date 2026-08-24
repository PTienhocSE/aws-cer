# Cẩm nang Phỏng vấn & Thực chiến: IIS (Internet Information Services)

## 1. Mục tiêu học 🔴
- Nắm vững kiến trúc và cách hoạt động của Web Server IIS trên Windows.
- Biết cách deploy, cấu hình Application Pool, quản lý SSL/TLS và chứng chỉ (Certificate).
- Troubleshoot các lỗi HTTP (500, 502, 503) và tối ưu hóa hiệu năng ứng dụng .NET.

## 2. Kiến thức nền cần biết 🟠
- Giao thức HTTP/HTTPS, khái niệm về Web Server, Reverse Proxy.
- Hiểu biết về kiến trúc ứng dụng .NET Framework / .NET Core.
- Cơ bản về DNS, Load Balancing.

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
Trong môi trường doanh nghiệp như Enterprise, IIS được dùng để host rất nhiều portal nội bộ, hệ thống điều hành quản lý bãi (với backend .NET), và các API giao tiếp với đối tác vận tải. IIS cần được thiết kế High Availability, bảo mật với WAF (Web Application Firewall), và tối ưu hóa cho hằng ngàn request song song trong giờ cao điểm điều hành cảng.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🟠
```
+-------------------------------------------------------------+
|                        Internet / LAN                       |
+------------------------------+------------------------------+
                               | HTTP/HTTPS (Port 80/443)
+------------------------------v------------------------------+
|                        HTTP.SYS (Kernel Mode)               |
|  - Lắng nghe request, queue vào Application Pool tương ứng  |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
|                  IIS Worker Process (w3wp.exe)              |
|  +-------------------------------------------------------+  |
|  |                   Application Pool                    |  |
|  | +------------------+ +------------------------------+ |  |
|  | | ISAPI Extensions | | Managed Pipeline (.NET)      | |  |
|  | +------------------+ +------------------------------+ |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

## 5. Các thành phần quan trọng (Failure modes, impact) 🔴
- **HTTP.SYS**: Listener ở tầng Kernel. *Failure*: Bị tấn công DoS dẫn đến sập toàn bộ request tới server.
- **Application Pool**: Khu vực cách ly bộ nhớ cho web app. *Failure*: App Pool bị stop (Crash liên tục) -> Lỗi 503 Service Unavailable.
- **Worker Process (w3wp.exe)**: Process thực thi code. *Failure*: High CPU / High Memory gây chậm web (latency cao).
- **Web.config**: File cấu hình. *Failure*: Cấu hình sai syntax -> Lỗi 500.19 Internal Server Error.

## 6. Concepts 🔴
- **Cơ bản**: Sites, Bindings (IP, Port, Hostname), Virtual Directory.
- **Trung cấp**: App Pool Identity (Tài khoản chạy w3wp), Recycling, SSL Binding, SNI (Server Name Indication).
- **Nâng cao**: ARR (Application Request Routing) làm Reverse Proxy, Web Farm, Shared Configuration.

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Dev dùng IIS Express hoặc IIS local để test web form.
- **Prod**: Web Server chạy IIS, tách biệt Database server. App Pool cấu hình tự động Recycle vào 3h sáng để giải phóng bộ nhớ (memory leak nếu có).
- **Enterprise**: Sử dụng F5 BIG-IP đứng trước làm Load Balancer, trỏ traffic về 4 máy chủ IIS (Web Farm) cấu hình giống hệt nhau (Shared Config trên file server).

## 8. Command / Tool cần biết 🔴
- **Tool GUI**: `inetmgr` (IIS Manager).
- **Command Line**: `appcmd.exe` (quản lý IIS qua cmd).
- **PowerShell**: `Get-WebSite`, `Start-WebAppPool`, `Import-Module WebAdministration`.
- **Troubleshooting Tool**: `DebugDiag` (phân tích memory leak), `LogParser`.

## 9. Log 🔴
- **Vị trí**: `%SystemDrive%\inetpub\logs\LogFiles\W3SVC...`
- **Phân tích**: IIS log ghi lại Source IP, Method (GET/POST), URI, HTTP Status (200, 404, 500), Time Taken (đo độ trễ). Có thể dùng tool LogParser hoặc đẩy lên ELK/Splunk.
- **HTTP.SYS log**: `%SystemRoot%\System32\LogFiles\HTTPERR` (Ghi nhận request bị drop trước khi tới Worker process).

## 10. Metric 🟠
- **Perfmon**: 
  - `\W3SVC_W3WP(*)\Requests/Sec`
  - `\Process(w3wp)\% Processor Time`
  - `\Process(w3wp)\Private Bytes` (Kiểm tra Memory Leak).
  - `\APP_POOL_WAS(*)\Current Application Pool State`

## 11. Configuration 🟠
Ví dụ chỉnh AppCmd thêm binding HTTPS:
```cmd
appcmd set site /site.name:"Default Web Site" /+bindings.[protocol='https',bindingInformation='*:443:www.snp.com.vn']
```

## 12. Troubleshooting Methodology 🔴
1. **Người dùng báo lỗi**: Xác định mã lỗi HTTP (Ví dụ 503).
2. **Kiểm tra App Pool**: Vào `inetmgr` xem App Pool có đang bị Stop không.
3. **Kiểm tra Event Viewer**: Xem Windows Logs -> Application. Tìm log từ `WAS` hoặc `.NET Runtime` xem lý do crash.
4. **Kiểm tra File Log**: Đọc IIS log xem lỗi xảy ra trên 1 URL cụ thể hay toàn bộ site.
5. Kiểm tra quyền (Permissions): w3wp.exe có quyền đọc/ghi thư mục chứa code không?

## 13. Production Incident 🔴
**Scenario: 503 Service Unavailable (Rapid-Fail Protection)**
- **Symptoms**: Toàn bộ web portal báo 503, IIS log không ghi nhận request, HTTPERR log báo "AppOffline".
- **Impact**: Khách hàng không thể tra cứu container.
- **Root Cause**: Có lỗi nghiêm trọng trong code làm tiến trình `w3wp.exe` crash liên tục. IIS có cơ chế *Rapid-Fail Protection* (Mặc định: crash 5 lần trong 5 phút sẽ stop luôn App Pool).
- **Fix**: Restart App Pool. Dùng `DebugDiag` để capture crash dump khi lỗi lặp lại. Phân tích dump file gửi cho team Dev sửa code.

## 14. So sánh 🟠
- **IIS vs Nginx**: IIS chạy tự nhiên trên Windows, tích hợp sâu .NET, dùng GUI. Nginx mạnh mẽ trên Linux, event-driven, cấu hình qua text file, hiệu năng làm reverse proxy nhỉnh hơn.
- **In-process vs Out-of-process (.NET Core)**: In-process chạy chung w3wp, nhanh hơn. Out-of-process chạy tiến trình `dotnet.exe` riêng, IIS chỉ làm proxy, dễ scale hơn cho microservices.

## 15. Common Mistakes 🟠
- Chạy App Pool bằng tài khoản `LocalSystem` (rủi ro bảo mật lớn). Nên dùng `ApplicationPoolIdentity`.
- Quên gán quyền (Read/Write) thư mục code cho tài khoản App Pool Identity (`IIS AppPool\TênPool`).
- Không cấu hình tự động gia hạn SSL (Let's Encrypt), để chứng chỉ hết hạn làm sập web.

## 16. Knowledge Check 🔴
- Làm thế nào xem lỗi 500 chi tiết trên IIS? (Bật Custom Errors = Off trong web.config).
- Mặc định App Pool recycle sau bao lâu? (1740 phút - 29 tiếng).

## 17. Câu hỏi phỏng vấn 🔴
- **Cơ bản**: Phân biệt HTTP 401 và 403? (401 là chưa xác thực/sai pass. 403 là đã xác thực nhưng bị cấm quyền).
- **Kiến trúc**: HTTP.SYS là gì và tại sao lại đặt ở Kernel Mode? (Để tăng tốc độ bắt request và caching trả về trực tiếp mà không cần context-switch sang User Mode).
- **Troubleshooting**: Web server ăn RAM liên tục không giảm. Cách xử lý?

## 18. Đáp án phỏng vấn 🟠
- **Trả lời tốt cho câu Troubleshooting RAM**: "Đó là dấu hiệu Memory Leak. Em sẽ cấu hình App Pool Recycle memory threshold để tạm thời workaround, ngăn sập app. Sau đó, em dùng ProcDump capture memory khi RAM đạt 90%, và dùng WinDbg hoặc DebugDiag phân tích xem object nào trong .NET đang giữ RAM, rồi đưa báo cáo cho Dev."

## 19. Cách trả lời như Engineer 🔴
"Khi thiết kế hệ thống IIS public ra ngoài, em luôn tách biệt: lớp ngoài cùng là WAF, sau đó là Reverse proxy/Load balancer, cuối cùng mới là IIS Backend không có IP Public. Ngoài ra em cấu hình gỡ bỏ HTTP Header `Server: Microsoft-IIS` để giấu thông tin phiên bản khỏi attacker."

## 20. Follow-up Question Tree 🟠
- Q: Lỗi 502 Bad Gateway trên IIS nghĩa là gì? -> A: Thường IIS đang làm proxy (dùng ARR) và backend server không phản hồi. -> Q: Cách check backend? -> A: Ping, check port, check IIS log ở backend server.

## 21. Checklist sau khi học 🟠
- [ ] Cài đặt IIS, deploy 1 web tĩnh.
- [ ] Cấu hình SSL tự cấp (Self-signed certificate) cho HTTPS.
- [ ] Cố tình chỉnh sai file web.config để xem lỗi 500.19.

## 22. Flashcards 🟠
- **Q**: SNI là gì?
- **A**: Server Name Indication, cho phép host nhiều chứng chỉ SSL trên cùng 1 IP và Port 443.

## 23. Đánh dấu 🔴 Phải hiểu, 🟠 Phải nắm.
*(Đã tích hợp)*
