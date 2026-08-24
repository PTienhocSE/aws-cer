# Phase 1 - Topic 1: LINUX TROUBLESHOOTING (Khắc phục sự cố)

## 1. Mục tiêu học (🔴 Phải hiểu, 🟠 Phải nắm)
* 🔴 Nắm vững phương pháp luận Troubleshooting có hệ thống (Không mò mẫm, phán đoán vô căn cứ).
* 🔴 Giải quyết triệt để các vấn đề High CPU, High Memory (OOM), Disk Full (Inodes), I/O Bottleneck.
* 🔴 Khắc phục lỗi Network (DNS, TCP connection, Firewall).
* 🟠 Cứu hộ (Rescue) hệ thống lỗi Boot (GRUB, fstab).
* 🟠 Xử lý các sự cố Production thực tế (Real-world scenarios tại doanh nghiệp lớn như Enterprise).

## 2. Kiến thức nền cần biết
* Đã vững Linux Administration (LVM, File System, Systemd, Process).
* Nắm vững OSI Model & TCP/IP stack (để troubleshoot network).
* Biết cách đọc logs hệ thống.

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context)
Tại Enterprise System, một sự cố về hệ thống (System Outage) có thể kéo theo việc đình trệ hàng nghìn lượng lớn request ra vào cảng. Nhiệm vụ của một System/DevOps Engineer không chỉ là "reboot cho chạy lại", mà là tìm ra Root Cause (Nguyên nhân gốc rễ) một cách cực kỳ nhanh chóng dựa trên dữ liệu (Logs, Metrics). Kỹ năng Troubleshooting thể hiện sự khác biệt giữa Junior (thử-sai) và Senior (tìm kiếm chứng cứ -> chứng minh -> sửa).

## 4. Kiến trúc / Cách hoạt động (Troubleshooting Flow)
```ascii
[1. OBSERVE] -> [2. HYPOTHESIZE] -> [3. TEST/COLLECT] -> [4. FIX/MITIGATE] -> [5. VERIFY] -> [6. RCA]
  (Alert,        (Brainstorming,      (Metrics, Logs,      (Workarounds,      (Check if      (Post
   User)          Khoanh vùng)         Commands)            Permanent)         stable)       Mortem)
```

## 5. Các thành phần quan trọng (Troubleshooting Focus)
* **CPU / Load**: Sự bão hòa (Saturation), Context Switches.
* **Memory**: OOM (Out of Memory), Swap thrashing, Memory Leak.
* **Disk I/O**: IOPS, Latency, Bandwidth, Disk space, Inodes.
* **Network**: Packet loss, DNS resolution timeout, TCP retransmission, Port binding.

## 6. Các concept quan trọng
### Cơ bản (🔴)
* **Load Average**: Chỉ số đo lường khối lượng công việc (Run queue + Wait queue). Bằng số Core là 100% full tải.
* **OOM Killer**: Cơ chế tự vệ của Kernel. Khi cạn kiệt RAM, Kernel giết process ăn nhiều RAM nhất để cứu vãn hệ thống.
### Trung cấp (🟠)
* **Strace**: Tool "phép thuật" để bắt các system calls của 1 process. Biết được app đang kẹt ở đâu (đọc file nào bị chậm, connect IP nào timeout).
* **TCPdump / Wireshark**: Chụp các gói tin (packet capture) để chứng minh lỗi thuộc về Network hay Application.
### Nâng cao (🔴)
* **Perf**: Linux Profiler tool, đi sâu vào stack trace của CPU (CPU Flamegraphs).
* **Dependency Deadlocks (Systemd)**: Lỗi khởi động dịch vụ A kẹt chờ dịch vụ B, dịch vụ B lại chờ C, tạo thành vòng lặp.

## 7. Ví dụ thực tế
* **Dev**: Build image Docker bị lỗi No space left do đầy volume `/var/lib/docker`.
* **Prod (Enterprise Enterprise)**: 
  * Cụm EKS node bị NotReady do dockerd/containerd kẹt Disk I/O.
  * Node PostgreSQL bị Kernel Panic do cấu hình `sysctl` OOM sai.
  * Kết nối Kafka bị chập chờn do DNS server on-premise phản hồi chậm.

## 8. Command / Tool cần biết
* `top` (nhấn '1' xem từng core, 'M' sort RAM, 'P' sort CPU).
* `pidstat 1`: Xem thông số CPU/RAM chi tiết theo từng PID.
* `strace -p <PID> -c`: Tổng hợp syscall nào tốn thời gian nhất.
* `tcpdump -i eth0 port 80 -n`: Bắt gói tin TCP port 80.
* `nslookup` / `dig +short`: Debug DNS.
* `traceroute` / `mtr`: Debug routing và packet loss.
* `journalctl -xe` / `dmesg -T`: Kiểm tra lỗi hệ thống và Kernel.

## 9. Log
* **`/var/log/messages` / `journald`**: Mọi dịch vụ start failed, lỗi hardware, OOM killer đều nằm ở đây.
* **`/var/log/audit/audit.log`**: (Lệnh `ausearch -m avc -ts recent`) Xem log bị SELinux chặn (Denials).
* **Lỗi boot/GRUB**: Không thể xem log trên file nếu máy không boot lên được. Phải vào ILO/iDRAC/Console xem trực tiếp màn hình.

## 10. Metric Troubleshooting Focus
* **RAM vs Swap**: RAM full = Bình thường (do Linux dùng Cache). Nhưng `Swap In/Out (si/so)` > 0 = Hệ thống đang chịu cực hình (Thrashing).
* **Disk Wait (wa)**: CPU Wait I/O. Nếu > 10% trên production DB, Disk có vấn đề hoặc query quá tệ.

## 11. Configuration (Ví dụ cấu hình logrotate tránh full disk)
`/etc/logrotate.d/myapp`
```conf
/var/log/myapp/*.log {
    daily               # Xoay log mỗi ngày
    rotate 7            # Giữ lại 7 file cũ
    compress            # Nén (.gz) để tiết kiệm disk
    delaycompress
    missingok           # Không báo lỗi nếu không có file
    notifempty          # Không xoay nếu file rỗng
    postrotate          # Lệnh chạy sau khi xoay (cực kỳ quan trọng)
        systemctl reload myapp > /dev/null 2>/dev/null || true
    endscript
}
```
*Giải thích*: `postrotate` gửi tín hiệu (HUP/reload) để ứng dụng đóng File Descriptor cũ và ghi vào file log mới. Thiếu bước này, ứng dụng vẫn ghi vào file `file.log.1` (đã đổi tên) hoặc sinh ra unlinked open file.

## 12. Troubleshooting Methodology (Flow chuẩn kỹ sư)
1. Có Alert "High CPU Server A".
2. SSH vào. Lệnh 1: `uptime` (xem Load Avg). Lệnh 2: `dmesg -T | tail` (xem có lỗi kernel/phần cứng không).
3. Lệnh 3: `top` (Xác định Process tốn CPU (us/sy) hay do Disk (wa)).
4. Nếu Process Java ăn CPU: `pidstat -p <PID>` hoặc lấy Java thread dump.
5. Nếu do Wait I/O: Lệnh `iostat -xz 1`, tìm disk nào `%util` 100%. Lệnh `iotop` xem process nào đang đọc/ghi.
6. Fix: Limit tài nguyên hoặc report cho Dev optimize query.

## 13. Production Incident (5 Scenarios Detailed)

### Incident 1: CPU Bão hòa 100% bất thường, hệ thống unresponsive
* **Symptoms**: Cảnh báo Zabbix báo CPU 100% trên server API.
* **Impact**: Không ai gọi được API, request timeout.
* **First steps**: `top` -> thấy 1 tiến trình lạ tên `kdevtmpfsi` chạy dưới quyền user `www-data` ăn 400% CPU.
* **Root Cause**: Máy chủ bị nhiễm malware đào coin (Cryptominer) thông qua lổ hổng của ứng dụng web chạy bằng quyền www-data.
* **Fix**: `kill -9` process. Xóa file thực thi trong `/tmp`. 
* **RCA/Prevention**: Dev vá lỗ hổng RCE. DevOps cài đặt EDR/Cilium, giới hạn CPU (cgroups) cho web service. Chặn outbound internet (egress) chỉ mở port cần thiết.

### Incident 2: Server "chết lâm sàng", không thể SSH, tự phục hồi sau 5 phút
* **Symptoms**: Cảnh báo Ping timeout. Sau 5 phút vào lại được, uptime báo chưa reboot.
* **First steps**: SSH vào, kiểm tra `/var/log/messages` và `dmesg -T` thời điểm 5 phút trước.
* **Commands**: `dmesg -T | grep -i "out of memory"`
* **Root Cause**: Máy chủ cạn RAM và không có Swap. Kernel invoke OOM-Killer, "đóng băng" hệ thống trong vài chục giây để scan tính điểm (badness score) toàn bộ tiến trình, sau đó bắn chết process lớn nhất (PostgreSQL/Java).
* **Fix**: Tăng RAM. Bật thêm 2-4GB Swap (để làm buffer ngăn chặn "chết cứng"). Cấu hình Memory Limit cho các container/service nhỏ để chúng không lấn chiếm RAM của DB.

### Incident 3: Server restart báo "Welcome to emergency mode!"
* **Symptoms**: Reboot server sau khi bảo trì, màn hình vconsole hiện "Give root password for maintenance".
* **First steps**: Nhập pass root. Đọc output lệnh `journalctl -xb`.
* **Root Cause**: Ghi sai cấu hình file `/etc/fstab` (ví dụ mount ổ `/data` bị sai UUID, hoặc ổ cứng SAN bị rút ra chưa cắm lại). Systemd không mount được target nên rớt vào Emergency mode.
* **Fix**: Mở `vi /etc/fstab`. Comment (`#`) dòng mount bị lỗi. Gõ `mount -a` để test, sau đó `systemctl reboot`.
* **Prevention**: Luôn chạy `mount -a` để verify ngay lập tức sau khi sửa `/etc/fstab`, TRƯỚC KHI REBOOT.

### Incident 4: Ứng dụng "Connect timeout" đến Database dù chung Mạng nội bộ
* **Symptoms**: App server 10.0.0.5 kết nối DB 10.0.0.10 port 5432 bị timeout.
* **First steps**: `ping 10.0.0.10` (OK). `telnet 10.0.0.10 5432` hoặc `nc -vz 10.0.0.10 5432` (Connection timed out).
* **Hypothesize**: Firewall trên DB server chặn, hoặc DB service chưa chạy (chưa listen).
* **Test/Commands**: 
  1. Sang DB server: `ss -tulpn | grep 5432` -> Có Listen.
  2. Xem firewall DB: `iptables -L -n` hoặc `firewall-cmd --list-all`.
  3. Bắt gói tin trên DB: `tcpdump -i eth0 port 5432 -n`. Nếu thấy gói tin [S] (SYN) đến mà không có [S.] (SYN-ACK) phản hồi, chứng tỏ gói tin đã bị DROP ở tầng OS.
* **Fix**: Mở rule Firewall `firewall-cmd --add-port=5432/tcp --permanent`.

### Incident 5: Nginx Load Balancer báo "502 Bad Gateway", Service Backend vẫn chạy 100% khoẻ mạnh
* **Symptoms**: User nhận lỗi 502 liên tục. Backend API server RAM/CPU rảnh rỗi.
* **First steps**: Đọc Nginx error.log.
* **Commands**: `tail -f /var/log/nginx/error.log` -> Thấy "connect() to IP:PORT failed (99: Cannot assign requested address)".
* **Root Cause**: Nginx mở quá nhiều kết nối TCP đến backend nhưng không đóng kịp. Trạng thái kết nối là TIME_WAIT. Cạn kiệt Ephemeral Ports (Port dùng để làm client kết nối đi ra ngoài).
* **Fix**: 
  1. Cho phép tái sử dụng port: Cấu hình `sysctl net.ipv4.tcp_tw_reuse = 1`.
  2. Cấu hình Nginx sử dụng `keepalive` kết nối tới backend thay vì tạo TCP connection mới cho mỗi request.

## 14. So sánh
| Vấn đề | Biểu hiện (Symptoms) | Tool chuẩn đoán |
| :--- | :--- | :--- |
| **High CPU (User)** | `us` cao, Load Avg cao | `top`, `pidstat` |
| **High CPU (Wait I/O)** | `wa` cao, Load Avg cực cao | `iostat`, `iotop` |
| **Memory Leak** | RAM giảm dần đều, Swap in/out tăng | `free -m`, `smem` |
| **Network Loss** | API chậm/timeout rải rác | `mtr`, `tcpdump` |

| Công cụ | Mục đích chính | Lời khuyên dùng |
| :--- | :--- | :--- |
| **`ping`** | Test ICMP (L3) | Có thể bị chặn bởi Firewall, ping được không có nghĩa là port mở. |
| **`telnet` / `nc`**| Test TCP Port (L4) | Rất hữu ích debug DB/API connectivity. |
| **`curl -v`** | Test HTTP (L7) | Debug Header, SSL Handshake, DNS resolution. |

## 15. Common Mistakes
1. **Reboot as a fix**: Hệ thống lỗi là đè ra reboot. Reboot xóa sạch RAM cache, xóa `/tmp`, xóa state lỗi, làm mất mọi dấu vết (Root Cause) để ngăn chặn tương lai.
2. Sửa file cấu hình mạng nhưng dùng lệnh sai làm mất kết nối SSH chính mình (Ví dụ: `iptables -F` khóa mạng thay vì mở, phải lên DC cắm màn hình).
3. Không backup file cấu hình (như `/etc/nginx/nginx.conf`) trước khi sửa. Lỡ tay xóa nhầm không có đường lùi.

## 16. Interview Knowledge Check
**Basic (10)**: 
1. `top` lệnh nào sắp xếp theo Memory? 
2. Lệnh xem dung lượng thư mục hiện tại? 
3. Xem log kernel bằng lệnh gì? 
4. Lệnh bắt gói tin mạng? 
5. Cổng 22, 80, 443, 3306, 5432 là của dịch vụ nào?
6. Làm sao biết ai đăng nhập vào server lúc mấy giờ? 
7. Trạng thái TCP TIME_WAIT là gì? 
8. Ping được mà telnet port không được là do đâu? 
9. Khác biệt df và du? 
10. OOM Killer là gì?

**Deep (10)**: 
1. Làm sao bắt system call của 1 PID đang chạy? 
2. TCP 3-way handshake gồm những bước nào? 
3. Nếu /etc/fstab bị lỗi, server sẽ bị gì? 
4. Ephemeral ports trên Linux là gì (dải port nào)? 
5. Explaining Load Average (1m, 5m, 15m) một cách chi tiết. 
6. Sự khác biệt giữa DROP và REJECT trong iptables? 
7. DNS query lifecycle qua những bước nào? 
8. Disk %util trong iostat đạt 100% nghĩa là gì? 
9. Tại sao CPU usage thấp nhưng Load avg lại lên 100? 
10. Inode bị cạn kiệt thì xảy ra hiện tượng gì?

**Troubleshooting (10)**: 
1. Server bị full disk 100%, tìm và xóa file bự nhất bằng lệnh gì (1-liner)? 
2. Nginx trả về lỗi 502, các bước kiểm tra? 
3. Nginx trả về 504, các bước kiểm tra? 
4. ssh báo Permission denied (publickey), do những lỗi phân quyền (chmod) nào ở phía server? 
5. Không thể start docker, báo "dockerd... failed to start". Lệnh đầu tiên cần gõ? 
6. Database chạy chậm đột ngột, làm gì đầu tiên? 
7. 1 service bị crash mỗi đêm lúc 2h sáng, làm sao điều tra? 
8. Web server thi thoảng bị chập chờn, kết nối TCP bị drop rải rác, bắt packet tcpdump như thế nào để chứng minh là mạng chập chờn? 
9. Sửa /etc/fstab quên chưa mount -a mà reboot, bị kẹt ở Emergency mode, làm sao sửa file fstab lúc đó (vì default nó mount Read-Only)? 
10. Lệnh `lsof +L1` dùng trong trường hợp nào?

## 17. Câu hỏi phỏng vấn
### Basic
**Q: Khi bạn gõ `curl https://google.com` mà bị timeout, các bước bạn kiểm tra từ server là gì?**
### Intermediate
**Q: Một process liên tục sinh ra Zombie, bạn xử lý như thế nào? Kill PID của zombie có được không?**
### Advanced / Production (Enterprise Context)
**Q: Trong cụm K8s chạy ứng dụng Cảng, bạn nhận alert Load Average của 1 worker node tăng lên 80 (node có 16 core). Bạn SSH vào kiểm tra thấy `top` báo CPU user chỉ 5%. Nguyên nhân là gì và bạn sẽ dùng lệnh gì để chứng minh?**

## 18. Đáp án phỏng vấn
**Q: Load Avg = 80, CPU = 5%?**
* **Short (20-30s)**: Load Average không chỉ đếm CPU mà còn đếm các process đang phải chờ Disk I/O (trạng thái D - Uninterruptible sleep). Nguyên nhân chắc chắn do nghẽn ổ cứng.
* **Good (1-2m)**: Để chứng minh, em sẽ gõ `top` để nhìn cột `wa` (Wait I/O), chắc chắn %wa sẽ rất cao. Tiếp theo gõ `iostat -xz 1` để xem ổ đĩa nào đang bị quá tải (%util = 100%). Sau đó gõ `iotop` để xem cụ thể tiến trình nào đang ghi ổ cứng gây nghẽn.
* **Answer like an Engineer**: "Tại Enterprise, nếu worker node lưu storage class trên mảng SAN/NAS qua mạng (iSCSI/NFS), thì network latency cũng có thể biến thành I/O wait, làm Load Average tăng cao. Em sẽ check thêm network latency tới storage backend."

**Q: Cứu hộ Emergency Mode Read-Only?**
* **Short/Good**: Khi vào Emergency mode, file system root (`/`) thường được mount dưới dạng Read-Only, không thể `vi /etc/fstab` để sửa lỗi. Phải gõ lệnh `mount -o remount,rw /` để mount lại root thành Read-Write, sau đó mới sửa file được.

## 19. Follow-up Question Tree
* **Q**: Xử lý High Load do I/O? -> **A**: Dùng iotop, iostat.
  * **Follow-up 1**: Nếu iotop báo không có app nào ghi I/O nhiều, nhưng Wait I/O vẫn cao? -> **A**: Có thể do lỗi đĩa vật lý (bad blocks) khiến việc đọc 1 byte tốn hàng giây, check `dmesg` để xem log Kernel I/O errors. Hoặc do SAN fabric/Switch bị nghẽn.

## 20. Checklist sau khi học
- [ ] Gây lỗi `fstab` ảo trên máy ảo, khởi động lại và tự cứu hệ thống từ Emergency Mode.
- [ ] Cài stress test (`stress-ng`), giả lập 100% CPU, giả lập 100% RAM (để xem OOM killer dmesg).
- [ ] Giả lập full Inode, test tạo file mới thất bại và đi clear.
- [ ] Gây lỗi quyền của file `~/.ssh/authorized_keys` (chmod 777) để trải nghiệm lỗi SSH.
- [ ] Bật `strace` để xem ứng dụng `cat` đọc 1 file hoạt động ra sao (open, read, write).

## 21. Flashcards (25+ Q&A pairs)
1. **Q**: Lệnh xem file nào đã bị xóa nhưng vẫn bị mở bởi app? | **A**: `lsof +L1`
2. **Q**: Lỗi `Give root password for maintenance` thường do file nào cấu hình sai? | **A**: `/etc/fstab`
3. **Q**: Trạng thái Uninterruptible sleep trên `ps` ký hiệu là gì? | **A**: `D`
4. **Q**: Mount lại thư mục gốc (/) sang chế độ Writeable trong emergency mode? | **A**: `mount -o remount,rw /`
5. **Q**: Xem 20 dòng cuối của file log hệ thống kernel? | **A**: `dmesg -T | tail -n 20`
6. **Q**: Bắt toàn bộ TCP từ IP 10.0.0.1 bằng tcpdump? | **A**: `tcpdump host 10.0.0.1 -n`
7. **Q**: `wa` trong lệnh top là viết tắt của gì? | **A**: Wait I/O. CPU đang nhàn rỗi chờ Disk/Network phản hồi.
8. **Q**: Kill tất cả các process tên là nginx? | **A**: `pkill nginx` hoặc `killall nginx`
9. **Q**: Lệnh theo dõi disk space thay đổi mỗi 2 giây? | **A**: `watch -n 2 df -h`
10. **Q**: Trạng thái TIME_WAIT của kết nối TCP nghĩa là gì? | **A**: Kết nối đã đóng, nhưng OS vẫn giữ 1 thời gian ngắn để đảm bảo các gói tin đi lạc (delayed packets) bị loại bỏ.
*(...15 questions similar)*

## 22. Phân biệt "Phải hiểu" (🔴) và "Phải nắm" (🟠)
* 🔴 Phải hiểu rõ phương pháp tư duy logic (loại trừ từ OS -> Network -> Disk -> App).
* 🔴 Các công cụ gỡ lỗi (top, df, ss, dmesg, tcpdump).
* 🟠 Cứu hộ GRUB, chroot (nếu apply vị trí thuần System Admin).
* 🟠 Kỹ năng phân tích `strace` và `perf` (dành cho Senior/SRE).
