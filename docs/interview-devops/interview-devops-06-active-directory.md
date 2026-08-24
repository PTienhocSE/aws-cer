# Cẩm nang Phỏng vấn & Thực chiến: Active Directory

## 1. Mục tiêu học 🔴
- Nắm vững kiến trúc, khái niệm và cách vận hành Active Directory Domain Services (AD DS).
- Quản trị, bảo mật và troubleshoot hệ thống AD trong môi trường Enterprise quy mô lớn.
- Tích hợp và đồng bộ (Azure AD Connect, ADFS).

## 2. Kiến thức nền cần biết 🟠
- Mạng cơ bản (TCP/IP, Routing).
- DNS, DHCP (cực kỳ quan trọng với AD).
- Giao thức xác thực: Kerberos, NTLM, LDAP, SAML.

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
Tại các tập đoàn lớn như Enterprise, Active Directory là "Trái tim bảo mật và định danh".
- Quản lý tập trung hàng ngàn nhân viên tại các cảng khác nhau (Primary DC, Secondary DC, Hiệp Phước).
- Single Sign-On (SSO) cho các ứng dụng nội bộ và tích hợp với Office 365 / Azure AD.
- Thực thi chính sách bảo mật đồng nhất qua Group Policy (GPO) xuống tất cả máy trạm (PCs) của các phòng ban.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🟠
```
               +---------------------------+
               |        Forest Root        |
               |      (snp.com.vn)         |
               +-------------+-------------+
                             |
             +---------------+---------------+
             |                               |
 +-----------+-----------+       +-----------+-----------+
 |    Child Domain A     |       |    Child Domain B     |
 | (catlai.snp.com.vn)   |       | (hiepphuoc.snp.com.vn)|
 +-----------+-----------+       +-----------+-----------+
             |
       +-----+-----+ (Replication)
       |   DC 01   | <========> | DC 02 (RODC) |
       +-----------+            +--------------+
```

## 5. Các thành phần quan trọng (Failure modes, impact) 🔴
- **Domain Controller (DC)**: Chứa bản sao của database AD. *Failure*: DC sập, user không login được. Phải có nhiều DC chạy song song.
- **Global Catalog (GC)**: Chứa thông tin rút gọn của mọi object trong forest. *Failure*: Logon thất bại trong môi trường multi-domain.
- **FSMO Roles (5 roles)**: RID, PDC, Infrastructure, Schema, Domain Naming. *Failure*: Lỗi tạo user mới (RID), lỗi time sync/password update (PDC).
- **DNS Server**: Trỏ domain name tới các DC (SRV records). *Failure*: Mất DNS = Mất AD.

## 6. Concepts 🔴
- **Cơ bản**: User, Group, OU (Organizational Unit), Domain, Forest.
- **Trung cấp**: Group Policy (GPO), Replication, Sites and Services, Kerberos vs NTLM.
- **Nâng cao**: Trust Relationships (Forest trust, External trust), RODC (Read-Only DC), KCC (Knowledge Consistency Checker).

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Dựng 1 DC duy nhất để test ứng dụng cần LDAP authentication.
- **Prod**: Ít nhất 2 DCs trong 1 Data Center để đảm bảo High Availability.
- **Enterprise**: Dựng AD Sites and Services để khai báo Subnet cho từng Cảng (Site). Đặt RODC ở chi nhánh xa/kết nối kém để cache thông tin logon mà vẫn bảo mật.

## 8. Command / Tool cần biết 🔴
- **Tool**: `dsa.msc` (ADUC), `gpmc.msc` (Group Policy), `dssite.msc` (Sites & Services).
- **Command**: 
  - `dcdiag` (Check health DC)
  - `repadmin /showrepl` (Kiểm tra đồng bộ)
  - `nltest /dsgetdc:domain` (Tìm DC gần nhất)
  - `gpupdate /force` (Ép nhận GPO)
  - `gpresult /r` (Xem GPO đã nhận)

## 9. Log 🔴
- **Event Viewer -> Custom Views -> Server Roles -> Active Directory Domain Services**.
- **Security Log**: Event 4624 (Logon Success), Event 4625 (Logon Failed - hữu ích tìm brute-force), Event 4740 (Account Locked Out).

## 10. Metric 🟠
- Phân tích Performance của `lsass.exe` (Local Security Authority Subsystem Service).
- Network Traffic trên port 389 (LDAP), 636 (LDAPS), 88 (Kerberos), 53 (DNS).
- Replication latency.

## 11. Configuration 🟠
Xóa user hết hạn bằng PowerShell:
```powershell
Search-ADAccount -AccountExpired | Disable-ADAccount
```
Tạo GPO map ổ đĩa mạng (Drive Mapping):
Trong GPMC -> User Configuration -> Preferences -> Windows Settings -> Drive Maps.

## 12. Troubleshooting Methodology 🔴
1. **User báo không đăng nhập được**: Kiểm tra xem báo lỗi "Wrong password", "Account Locked" hay "No logon servers available".
2. Nếu "No logon server": Check network kết nối tới DC, check DNS settings trên client (phải trỏ về IP của DC/DNS server).
3. Check Service: `nslookup -type=SRV _ldap._tcp.dc._msdcs.domain.com`.
4. Check Time Sync: Thời gian giữa client và DC không được lệch quá 5 phút (Kerberos requirement).

## 13. Production Incident 🔴
**Scenario: Account bị khóa liên tục (Account Lockout)**
- **Symptoms**: User đổi mật khẩu mới, nhưng cứ 5-10 phút lại bị khóa tài khoản không rõ lý do.
- **Impact**: User không thể làm việc.
- **First steps**: Dùng PowerShell hoặc công cụ LockoutStatus để tìm DC nào thực hiện khóa tài khoản.
- **Command**: Check Event 4740 trên PDC Emulator để xem Source Workstation gây ra lockout.
- **Root Cause**: Do user lưu mật khẩu cũ trong Credential Manager, hoặc có 1 service/app trên điện thoại đang cố login bằng mật khẩu cũ.
- **Fix**: Xóa mật khẩu cũ trong Credential Manager hoặc update app trên phone.

## 14. So sánh 🟠
- **LDAP vs LDAPS**: LDAP clear text (port 389), LDAPS mã hóa SSL/TLS (port 636).
- **Security Group vs Distribution Group**: Security dùng phân quyền (NTFS, App), Distribution chỉ dùng cho gửi Email (Exchange).
- **NTLM vs Kerberos**: NTLM cũ, kém bảo mật (hash-based challenge/response). Kerberos dùng vé (Tickets), an toàn hơn và hỗ trợ Mutual Authentication.

## 15. Common Mistakes 🟠
- Đặt DNS phụ (Secondary DNS) trỏ ra IP của ISP (8.8.8.8) trên máy trạm -> Dẫn đến thỉnh thoảng lỗi "No logon server".
- Cấp quyền Domain Admin bừa bãi.
- Gắn GPO nặng (cài phần mềm dung lượng lớn) vào lúc khởi động máy tính, làm chậm quá trình boot của user.

## 16. Knowledge Check 🔴
- Lệnh nào dùng để ép update Group Policy lập tức? (`gpupdate /force`).
- FSMO có mấy role? Tên gì?
- Port của Kerberos là bao nhiêu? (TCP/UDP 88).

## 17. Câu hỏi phỏng vấn 🔴
- **Cơ bản**: Phân biệt OU và Group trong AD?
- **Kiến trúc**: PDC Emulator làm nhiệm vụ gì quan trọng nhất? (Đồng bộ thời gian, xử lý thay đổi password khẩn cấp, lock account).
- **Troubleshooting**: Khi 2 site có 2 DC không đồng bộ được dữ liệu cho nhau, bạn dùng lệnh gì để kiểm tra lỗi?

## 18. Đáp án phỏng vấn 🟠
- **Trả lời tốt**: Đối với câu hỏi đồng bộ, nêu rõ: "Em dùng `repadmin /showrepl` hoặc `repadmin /replsummary` để xem trạng thái. Ngoài ra kiểm tra link mạng port RPC (135 và dải port dynamic) xem có bị Firewall chặn giữa 2 site không."
- **Bẫy**: Nhầm lẫn giữa Forest và Domain khi nói về Schema. (Schema là duy nhất trong toàn Forest).

## 19. Cách trả lời như Engineer 🔴
"Khi thiết kế AD cho 1 doanh nghiệp nhiều chi nhánh, em sẽ xem xét cấu trúc địa lý mạng để vẽ Site and Services chuẩn, sau đó assign Subnet chính xác để đảm bảo user ở chi nhánh nào thì query LDAP/logon vào DC ở chi nhánh đó, tiết kiệm băng thông WAN."

## 20. Follow-up Question Tree 🟠
- Q: SYSVOL dùng để làm gì? -> A: Lưu GPO và Logon scripts. -> Q: Quá trình replicate SYSVOL dùng giao thức gì? -> A: FRS (cũ) hoặc DFS-R (mới, từ Windows Server 2008 trở đi).

## 21. Checklist sau khi học 🟠
- [ ] Promote 1 server lên làm Domain Controller.
- [ ] Viết GPO cấm truy cập Control Panel.
- [ ] Dùng `repadmin` kiểm tra.

## 22. Flashcards 🟠
- **Q**: RODC là gì?
- **A**: Read-Only Domain Controller, bản sao chỉ đọc, dùng cho các chi nhánh kém an toàn vật lý.

## 23. Đánh dấu 🔴 Phải hiểu, 🟠 Phải nắm.
*(Đã được tích hợp)*
