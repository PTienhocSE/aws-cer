# Phase 1 - Topic 1: LINUX ADMINISTRATION (System Administration)

## 1. Mục tiêu học (🔴 Phải hiểu, 🟠 Phải nắm)
* 🔴 Hiểu sâu sắc về Linux Architecture (Kernel vs User Space, Syscalls).
* 🔴 Nắm vững hệ thống File System (ext4/XFS), Permission (ACL, SUID/SGID) và LVM (Logical Volume Management).
* 🔴 Quản lý Process, Systemd, User/Group, Network và Package (RPM/DEB).
* 🟠 Thành thạo các command CLI và biết cách phân tích tài nguyên (CPU, RAM, Disk I/O).
* 🟠 Nắm được các best practices về Enterprise Hardening (SELinux) và Kernel Tuning cho môi trường Cảng Enterprise System.

## 2. Kiến thức nền cần biết
* Cơ bản về Operating System (Memory Management, Process Scheduling, I/O Subsystem).
* Kiến thức cơ bản về Networking (TCP/IP, Ports).
* Hiểu biết về phần cứng server (CPU, RAM, HDD/SSD/NVMe).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context)
Enterprise System vận hành hệ thống Core Enterprise System 24/7/365, đòi hỏi tính sẵn sàng cực cao (High Availability). Trong môi trường Multi-DC của Enterprise (ví dụ: Primary DC, Secondary DC, HICT), Linux server đóng vai trò là xương sống chạy các workload từ Database (Oracle, PostgreSQL), Middleware (Kafka, RabbitMQ) đến Container Platform (EKS, K8s). Một lỗi nhỏ về file descriptor hay disk I/O có thể làm chậm trễ hàng nghìn dữ liệu giao dịch. Quản trị Linux ở Enterprise không chỉ là cài đặt, mà là đảm bảo tính bền bỉ, an toàn và tối ưu hóa hệ thống cho hàng nghìn request/giây.

## 4. Kiến trúc / Cách hoạt động
```ascii
+-------------------------------------------------------------+
|                      USER SPACE                             |
|  +--------+   +----------+   +----------+   +------------+  |
|  |  Bash  |   | Systemd  |   |  Nginx   |   | Kubernetes |  |
|  +--------+   +----------+   +----------+   +------------+  |
|        \             |             |             /          |
|         \            v             v            /           |
|          +-------------------------------------+            |
|          |         Glibc (C Library)           |            |
|          +-------------------------------------+            |
+---------------------------+---------------------------------+
|                           | System Calls Interface (SCI)    |
|                      +----v----+                            |
|                      | KERNEL  |                            |
|  +---------------+   +---------+   +-------------------+    |
|  | Process Mngt  |                 | Network Stack     |    |
|  +---------------+                 +-------------------+    |
|  | Memory Mngt   |                 | VFS (File System) |    |
|  +---------------+                 +-------------------+    |
|  | Device Drivers|                 | Security (SELinux)|    |
|  +---------------+                 +-------------------+    |
+-------------------------------------------------------------+
|                      HARDWARE                               |
|       CPU      RAM       Disk/NVMe       NIC (Network)      |
+-------------------------------------------------------------+
```
* **User Space**: Nơi các ứng dụng và tiến trình của người dùng chạy.
* **Kernel Space**: Cốt lõi của OS, giao tiếp trực tiếp với phần cứng. Chạy ở chế độ đặc quyền (privileged mode).
* **Syscalls**: Cầu nối để User Space yêu cầu Kernel thực hiện các tác vụ (ví dụ: đọc file `read()`, mở network port `bind()`).

## 5. Các thành phần quan trọng
* **Boot Loader (GRUB2)**: Load kernel vào RAM. *Failure mode: Cấu hình sai grub dẫn đến Kernel Panic.*
* **Init System (Systemd)**: Quản lý dịch vụ, khởi động các target. *Failure mode: Dependency loop, service failed to start.*
* **VFS (Virtual File System)**: Lớp trừu tượng hóa giúp ứng dụng gọi `read()` mà không cần quan tâm đang đọc ext4, XFS hay NFS.
* **LVM (Logical Volume Manager)**: Quản lý dung lượng đĩa linh hoạt. *Failure mode: Full VG, corrupt LV metadata.*

## 6. Các concept quan trọng
### Cơ bản (🔴)
* **File Permissions & Ownership**: `chmod`, `chown`. Quyền r, w, x cho User (u), Group (g), Others (o).
* **Process Management**: PID, PPID. Phân biệt `kill -15` (SIGTERM - an toàn) và `kill -9` (SIGKILL - ép buộc).
### Trung cấp (🟠)
* **Inodes**: Cấu trúc dữ liệu chứa metadata của file (kích thước, quyền, vị trí block trên disk). Nếu hết inode (dù còn dung lượng đĩa), không thể tạo file mới.
* **Special Permissions**: 
  * SUID (Set User ID): Chạy file với quyền của owner (ví dụ `/usr/bin/passwd`).
  * SGID (Set Group ID): File chạy với quyền group, hoặc thư mục mới kế thừa group.
  * Sticky bit: Chỉ owner mới được xóa file trong thư mục đó (ví dụ `/tmp`).
### Nâng cao (🔴)
* **LVM (Logical Volume Management)**: Physical Volume (PV) -> Volume Group (VG) -> Logical Volume (LV). Cho phép resize disk online không downtime.
* **SELinux (Security-Enhanced Linux)**: MAC (Mandatory Access Control). Các mode: Enforcing, Permissive, Disabled. Quản lý qua Context và Booleans.

## 7. Ví dụ thực tế
* **Dev**: Tạo các user tạm, cấp quyền sudo giới hạn, cấu hình NFS mount.
* **Prod (Enterprise Enterprise)**: Mở rộng ổ cứng online cho server PostgreSQL (LVM lvextend + xfs_growfs) mà không làm gián đoạn TOS. Cấu hình Firewalld chỉ allow IP của load balancer. Kernel tuning để chịu tải số lượng connection lớn.

## 8. Command / Tool cần biết
* `ps aux` / `top` / `htop`: Theo dõi process.
* `free -h`: Xem RAM, swap, buff/cache.
* `df -hT` (dung lượng) / `df -i` (inodes): Giám sát ổ cứng.
* `lsblk` / `fdisk -l`: Liệt kê block devices.
* `iostat -xz 1` / `vmstat 1`: Phân tích Disk I/O và system load theo realtime.
* `ss -tulpn` / `netstat -tulpn`: Xem các port đang mở (TCP/UDP, Listening, Process).
* `lsof -i :80` / `lsof +L1`: Xem file nào đang mở bởi process, hoặc tìm unlinked file (xóa rồi nhưng chưa release disk).
* `journalctl -xeu <service>`: Xem log của systemd service.
* `systemctl daemon-reload`: Cập nhật cấu hình service systemd.

## 9. Log
* `/var/log/messages` (RHEL/CentOS) / `/var/log/syslog` (Ubuntu): Log hệ thống chung.
* `/var/log/secure` (RHEL) / `/var/log/auth.log` (Ubuntu): Log xác thực, SSH, sudo.
* `/var/log/dmesg`: Log từ Kernel buffer ring (rất quan trọng khi check hardware issues, OOM killer).
* **Correlation**: Kết hợp log ứng dụng (ví dụ `/var/log/nginx/error.log`) với `/var/log/messages` để xem liệu Nginx crash là do lỗi code hay do OOM Killer của kernel dập.

## 10. Metric
* **Load Average**: (ví dụ: `1.50, 2.10, 3.05` cho 1, 5, 15 phút). Đại diện cho số lượng process đang chờ CPU hoặc đang chờ Disk I/O (Uninterruptible sleep - D state).
* **CPU (us, sy, id, wa)**: `us` (User), `sy` (System/Kernel), `id` (Idle), `wa` (Wait I/O). Nếu `wa` cao, vấn đề nằm ở ổ cứng.
* **Swap In/Out (si/so)**: Nếu `si/so` lớn hơn 0 liên tục trong `vmstat`, server đang thiếu RAM nghiêm trọng (Thrashing).

## 11. Configuration
**File `/etc/sysctl.conf` (Kernel Tuning cho Database Server tại Enterprise)**
```ini
# Tăng số lượng file descriptor tối đa hệ thống có thể mở
fs.file-max = 2097152

# Giảm khả năng kernel sử dụng swap (ưu tiên dùng RAM), mặc định là 60
vm.swappiness = 10

# Tăng kích thước backlog cho các connection chờ được accept
net.core.somaxconn = 65535

# Tối ưu hóa TCP Keepalive để giải phóng connection chết nhanh hơn
net.ipv4.tcp_keepalive_time = 300
net.ipv4.tcp_keepalive_probes = 5
net.ipv4.tcp_keepalive_intvl = 15
```
*Giải thích*: Cấu hình này cực kỳ quan trọng cho server chạy Kafka hoặc Oracle DB, nơi có hàng nghìn TCP connection và file được mở. Áp dụng bằng `sysctl -p`.

## 12. Troubleshooting Methodology
1. **Observe**: Xem thông báo lỗi, báo cáo từ user, cảnh báo Prometheus/Zabbix.
2. **Hypothesize**: Khoanh vùng (Network? CPU? Disk I/O? Permission?).
3. **Test**: Dùng lệnh (`ping`, `df`, `top`) để xác minh giả thuyết.
4. **Fix**: Khắc phục tạm thời (Mitigation) và lâu dài (Root Cause Fix).
5. **Verify**: Kiểm tra lại, đảm bảo hệ thống đã phục hồi.
6. **RCA (Root Cause Analysis)**: Ghi tài liệu, thêm rule cảnh báo.

## 13. Production Incident (5 Scenarios)

### Incident 1: "No space left on device" mặc dù `df -h` báo còn 50%
* **Symptoms**: App không thể tạo file mới, báo No space left.
* **Impact**: Hệ thống báo cáo của Enterprise không xuất được file PDF cho khách hàng.
* **First steps**: Chạy `df -h` (còn dư 100GB). Chạy `df -i`.
* **Commands**: `df -i` -> /dev/mapper/centos-root 100% IUse.
* **Root Cause**: Ứng dụng tạo ra hàng triệu file session nhỏ xíu (0KB) trong `/var/lib/php/session`, làm cạn kiệt Inode của ext4.
* **Mitigation**: Xóa các file cũ: `find /var/lib/php/session -type f -mmin +120 -delete`.
* **Fix & Prevention**: Thêm cronjob dọn file rác, cấu hình log rotate. Set alert trên Inode usage (>=80%) thay vì chỉ capacity.

### Incident 2: High Load Average (100+) nhưng CPU usage (us) rất thấp
* **Symptoms**: Server phản hồi cực kỳ chậm, SSH mất 30s mới vào được.
* **Impact**: Hệ thống TOS API timeout.
* **First steps**: Chạy `top`, `vmstat 1`.
* **Commands**: `top` thấy `wa` (Wait I/O) = 90%. `ps aux | awk '{if ($8 == "D") print $0}'` (Tìm process ở state D - Uninterruptible Sleep).
* **Root Cause**: Ổ cứng SAN bị nghẽn (latency cao), các tiến trình ghi log bị kẹt ở trạng thái D (chờ I/O), đẩy Load Average lên cao.
* **Mitigation**: Báo team Storage kiểm tra SAN. Stop bớt các tiến trình batch processing không cần thiết.
* **Prevention**: Đổi ổ cứng sang SSD/NVMe cho DB. Tách log disk và data disk.

### Incident 3: Không thể start Nginx service (Permission Denied)
* **Symptoms**: Cấu hình đổi port Nginx sang 8080. `systemctl restart nginx` báo Failed.
* **First steps**: Xem log `journalctl -xeu nginx`.
* **Commands**: Log báo "bind() to 0.0.0.0:8080 failed (13: Permission denied)".
* **Root Cause**: SELinux đang ở chế độ Enforcing và chặn Nginx bind vào port 8080 (không thuộc type http_port_t).
* **Fix**: Cho phép port 8080 với SELinux: `semanage port -a -t http_port_t -p tcp 8080`. Restart service.
* **Prevention**: Nắm vững rule SELinux khi đổi default port. Dùng `ausearch -m avc` để debug.

### Incident 4: Ứng dụng OOM Killed liên tục lúc nửa đêm
* **Symptoms**: Service Java (EKS Worker node) bị restart bất ngờ lúc 2:00 AM.
* **First steps**: Check uptime, check `/var/log/messages` và `dmesg`.
* **Commands**: `dmesg -T | grep -i oom-killer`.
* **Root Cause**: Crontab chạy script backup nén (tar/gzip) file log vài chục GB trên cùng node, ăn hết RAM (Page Cache ko xả kịp), Kernel OOM Killer chọn process dùng nhiều RAM nhất (Java) để kill.
* **Fix**: Thêm `nice -n 19` và `ionice -c 3` vào cron backup. Limit memory cho process backup (dùng systemd-run hoặc cgroup).
* **Prevention**: Tách cron job nặng ra máy khác, hoặc limit tài nguyên.

### Incident 5: LVM Disk Full - Resize online không downtime
* **Symptoms**: Cảnh báo Disk của `/var/lib/pgsql` (PostgreSQL) đạt 95%.
* **Impact**: Nguy cơ DB ngừng hoạt động (read-only mode).
* **Commands**:
  1. Thêm disk vật lý (sdb).
  2. `pvcreate /dev/sdb` (Tạo PV).
  3. `vgextend data_vg /dev/sdb` (Thêm PV vào VG).
  4. `lvextend -l +100%FREE /dev/mapper/data_vg-pgsql_lv` (Mở rộng LV).
  5. `xfs_growfs /var/lib/pgsql` (hoặc `resize2fs` nếu ext4) (Mở rộng File System).
* **Verification**: `df -hT` thấy dung lượng tăng mà DB không bị gián đoạn.

## 14. So sánh
| Feature | ext4 | XFS |
| :--- | :--- | :--- |
| **Type** | Journaling file system | High-performance 64-bit journaling FS |
| **Max File Size**| 16 TB | 8 EB (Exabytes) |
| **Resize** | Grow & Shrink (`resize2fs`) | Chỉ Grow (`xfs_growfs`), không thể thu nhỏ online |
| **Use case** | Phổ thông, boot partition | CSDL lớn, file cực lớn, Enterprise RHEL default |

| Concept | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | Một chương trình đang chạy độc lập. | Một "luồng" thực thi bên trong một Process. |
| **Memory** | Có vùng nhớ riêng (Memory space độc lập). | Chia sẻ chung vùng nhớ của Process cha. |
| **Overhead** | Context switch nặng. | Context switch nhẹ hơn (ít tốn resource). |

## 15. Common Mistakes
1. Dùng `chmod 777` bừa bãi khi gặp lỗi Permission Denied thay vì tìm hiểu SUID/Group hoặc SELinux.
2. Xóa file đang được ứng dụng mở (deleted unlinked file). Disk space KHÔNG được giải phóng. Phải restart ứng dụng hoặc làm rỗng file (`> file.log`).
3. Khởi động lại (reboot) server để giải phóng RAM/Cache mà không tìm hiểu tại sao RAM cao.

## 16. Interview Knowledge Check
**Basic (10)**: 
1. Lệnh nào xem process đang chạy? 
2. Ý nghĩa PID 1 là gì? 
3. Phân biệt `su` và `sudo`? 
4. Lệnh kiểm tra ổ cứng? 
5. Quyền 644 nghĩa là gì? 
6. File /etc/passwd chứa gì? 
7. Cách xem địa chỉ IP? 
8. Reboot server bằng lệnh nào? 
9. `grep` dùng để làm gì? 
10. SUID là gì?

**Deep (10)**: 
1. Load average 5.0 trên máy 4 core nghĩa là gì? 
2. Trạng thái process 'Z' (Zombie) là gì, làm sao xóa? 
3. Soft link và Hard link khác nhau chỗ nào? 
4. Inode là gì? 
5. Swappiness bằng 0 có ý nghĩa gì? 
6. Trình bày các bước tạo LVM. 
7. Kernel space và User space khác nhau sao? 
8. Syscall là gì? 
9. File descriptor là gì? 
10. Quá trình boot của Linux từ lúc nhấn nút nguồn?

**Troubleshooting (10)**: 
1. Server bị full disk dù tổng size các file nhỏ hơn disk size? 
2. Process ăn 100% CPU, debug bằng gì? 
3. Lệnh gì tìm các file lớn hơn 1GB? 
4. `df` và `du` lệch nhau, vì sao? 
5. ssh vào server báo connection refused, các bước kiểm tra? 
6. Dịch vụ systemd cứ start là báo failed, check ở đâu? 
7. Làm sao biết port 80 đang bị process nào chiếm? 
8. Server hết RAM, ứng dụng bị crash (OOM). 
9. Ping ra internet được nhưng không resolve tên miền được? 
10. Làm sao kill 1 cách an toàn các process đang treo?

## 17. Câu hỏi phỏng vấn
### Basic
**Q: Trình bày sự khác nhau giữa lệnh `kill -15` và `kill -9`?**
### Intermediate
**Q: Giải thích khái niệm Load Average trên Linux. Con số 2.0 trên CPU 2 core có nghĩa là gì?**
### Advanced / Architecture
**Q: So sánh Soft link và Hard link. Nếu xóa file gốc thì 2 link này sẽ ra sao? Có thể tạo Hard link cho thư mục không?**
### Production / Troubleshooting (Enterprise Context)
**Q: Đang trực ca tại Enterprise, hệ thống cảnh báo ổ đĩa chứa DB PostgreSQL bị Full (100%). Em đã rm xóa file log dung lượng 50GB, dùng `ls` thì không thấy file log đó nữa, nhưng `df -h` vẫn báo full 100%. Tại sao và cách xử lý nhanh nhất mà không reboot DB?**

## 18. Đáp án phỏng vấn
**Q: `kill -15` vs `kill -9`?**
* **Short (20-30s)**: `-15` (SIGTERM) là yêu cầu ứng dụng dừng lại một cách duyên dáng (lưu data, đóng kết nối). `-9` (SIGKILL) là ra lệnh cho Kernel ép buộc ngắt process ngay lập tức, ứng dụng không kịp làm gì.
* **Good (1-2m)**: Giải thích thêm là luôn nên dùng `kill -15` trước, chờ vài giây, nếu process bị treo (hung) thì mới dùng tới `kill -9`. Dùng -9 có nguy cơ bị corrupt data (ví dụ Database đang ghi transaction).
* **Answer like an Engineer**: "Trong môi trường K8s tại Enterprise, Pod Terminating sẽ gửi SIGTERM trước (mặc định 30s grace period). Nếu app không bắt signal này để shutdown graceful, K8s sẽ gửi SIGKILL. Do đó, code app phải luôn handle SIGTERM."

**Q: DB Full disk, xóa file nhưng vẫn full?**
* **Short**: Do file vẫn đang được mở (open file descriptor) bởi tiến trình PostgreSQL. Phải truncate file hoặc reload ứng dụng.
* **Good**: Khi chạy `rm`, Linux chỉ xóa reference trong thư mục. Nhưng Inode và Disk block vẫn bị giữ bởi process đang giữ File Descriptor. Lệnh `lsof +L1` sẽ liệt kê các file này. Cách xử lý: không dùng `rm` mà dùng `> file.log` (truncate) để làm rỗng file online.
* **Deep dive**: Nếu lỡ `rm` rồi, có thể giải phóng bằng cách tìm PID của tiến trình qua `lsof`, sau đó dùng lệnh: `> /proc/<PID>/fd/<FD_number>`. Điều này cứu nguy hệ thống mà không cần restart PostgreSQL.

## 19. Follow-up Question Tree
* **Q**: Xóa file mà disk không giảm? -> **A**: Do process đang giữ FD.
  * **Follow-up 1**: Nếu không được truncate file, có cách nào khác không? -> **A**: Restart service (giải phóng toàn bộ RAM và FD).
  * **Follow-up 2**: Tại sao ext4 có khái niệm deleted state mà lại giữ dung lượng? -> **A**: Cơ chế của VFS, khi reference count (link count) = 0 NHƯNG open file count > 0 thì kernel chưa dọn dẹp data blocks.

## 20. Checklist sau khi học
- [ ] Tự cài 1 máy ảo AlmaLinux / Ubuntu Server.
- [ ] Tạo LVM, thêm disk, resize LV online.
- [ ] Thực hành phân quyền SUID, cấu hình sticky bit.
- [ ] Mở 1 port trên Firewalld/iptables.
- [ ] Viết 1 file systemd unit chạy một script shell tự viết.
- [ ] Giả lập tình huống unlinked open file và fix bằng lsof/proc.

## 21. Flashcards (25+ Q&A pairs)
1. **Q**: Lệnh xem PID của tiến trình chạy cổng 8080? | **A**: `netstat -tulpn | grep 8080` hoặc `lsof -i :8080`
2. **Q**: Lệnh theo dõi disk I/O realtime? | **A**: `iostat -xz 1`
3. **Q**: Ký hiệu D trong status top/ps? | **A**: Uninterruptible sleep (thường do chờ Disk/Network I/O).
4. **Q**: Z status là gì? | **A**: Zombie process. Process con chết nhưng cha chưa dọn dẹp.
5. **Q**: Tắt Zombie process bằng cách nào? | **A**: Không thể kill bằng -9. Phải kill Process cha (PPID).
6. **Q**: Chuyển quyền thư mục đệ quy? | **A**: `chown -R user:group /dir/`
7. **Q**: Lệnh reload cấu hình kernel? | **A**: `sysctl -p`
8. **Q**: File cấu hình DNS resolver? | **A**: `/etc/resolv.conf`
9. **Q**: Lệnh xem file nào đang ăn dung lượng nhất trong thư mục? | **A**: `du -sh * | sort -h`
10. **Q**: `chattr +i file` có tác dụng gì? | **A**: Biến file thành immutable (ngay cả root cũng không thể xóa/sửa).
11. **Q**: XFS có shrink (thu nhỏ) online được không? | **A**: Không.
*(...14 questions similar)*

## 22. Phân biệt "Phải hiểu" (🔴) và "Phải nắm" (🟠)
* 🔴 Kiến trúc LVM và ext4/XFS (Rất hay hỏi khi phỏng vấn Senior/DevOps).
* 🔴 Process state, đặc biệt là state D (chờ I/O) và Zombie (Z). Cơ chế Kill signal.
* 🟠 Thuộc lòng các parameter của `top`, `free`, `df`, `ss` để phản xạ nhanh khi có sự cố.
* 🟠 Khái niệm Cgroups và Namespaces (nền tảng của Docker/K8s sau này).
