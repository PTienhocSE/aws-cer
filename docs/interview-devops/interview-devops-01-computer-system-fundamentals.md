# Interview Preparation: Computer System Fundamentals (OS, CPU, RAM, Disk)

## 1. Mục tiêu học 🔴
- Nắm vững kiến thức cốt lõi về Hệ thống Máy tính (Computer Systems) và Hệ điều hành Linux.
- Hiểu sâu cách OS quản lý tài nguyên (CPU, RAM, Disk I/O).
- Xây dựng tư duy Troubleshooting từ dưới lên (Bottom-up) trong môi trường Enterprise, đặc biệt áp dụng vào hệ thống hạ tầng lõi Enterprise tại Enterprise System.

## 2. Kiến thức nền cần biết 🟠
- Kiến trúc máy tính Von Neumann cơ bản.
- Khái niệm cơ bản về Hệ điều hành (Kernel, User Space).
- Các lệnh Linux cơ bản (bash, file system navigation).

## 3. Tổng quan (Enterprise & Doanh nghiệp Enterprise Enterprise Context) 🔴
Tại Tổng công ty Enterprise System, hệ thống hạ tầng lõi Enterprise (TOS - Core Enterprise System) là trái tim của hoạt động Logistics, phục vụ hàng nghìn lượng lớn request và tàu ra vào mỗi ngày. Một máy chủ bị "treo" do cạn RAM hoặc nghẽn I/O Disk có thể làm gián đoạn việc giao nhận, gây thiệt hại hàng tỷ đồng và kẹt xe toàn tuyến Primary DC. Việc thấu hiểu System Fundamentals giúp kỹ sư DevOps/SRE tối ưu hóa các máy chủ Database, Worker Nodes (EKS) và đảm bảo High Availability cho hạ tầng Hybrid Cloud (On-premise & AWS).

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🔴
```text
+---------------------------------------------------+
|                  User Space                       |
|  +---------+  +----------+  +------------------+  |
|  | TOS App |  | Database |  | Docker Container |  |
|  +---------+  +----------+  +------------------+  |
+-------|-------------|-----------------|-----------+
        | System Calls (syscalls)       |
+-------v-------------v-----------------v-----------+
|                  Kernel Space                     |
|  +-----------+ +-----------+ +-----------------+  |
|  | Scheduler | | VFS / I/O | | Memory Manager  |  |
|  +-----------+ +-----------+ +-----------------+  |
|  +---------------------------------------------+  |
|  |               Device Drivers                |  |
|  +---------------------------------------------+  |
+-------|-------------|-----------------|-----------+
        |             |                 |
+-------v-------------v-----------------v-----------+
|                     Hardware                      |
|      [ CPU ]      [ RAM ]      [ Disk / SSD ]     |
+---------------------------------------------------+
```

## 5. Các thành phần quan trọng (Components, failure modes, impact) 🔴
- **CPU (Central Processing Unit)**
  - *Failure mode*: High Load Average, Context Switching quá cao, CPU Throttling.
  - *Impact*: Ứng dụng phản hồi chậm, Timeout liên tục, rớt kết nối.
- **RAM (Random Access Memory)**
  - *Failure mode*: OOM (Out of Memory), Swap trashing.
  - *Impact*: Process bị Linux OOM Killer "bắn chết", dịch vụ crash đột ngột (thường gặp với Java Spring Boot hoặc EKS Pods).
- **Disk I/O & Storage**
  - *Failure mode*: 100% I/O Wait, No space left on device, Inodes exhaustion.
  - *Impact*: Database không thể ghi dữ liệu, hệ thống tê liệt không thể tạo file log hoặc temporary files.
- **Network Interfaces (NIC)**
  - *Failure mode*: Packet drop, Network saturation.
  - *Impact*: Đứt gãy kết nối giữa các microservices hoặc giữa On-prem và AWS.

## 6. Các concept quan trọng 🔴
### Cơ bản
- **Process vs Thread**: Process có không gian bộ nhớ riêng (Heavyweight). Thread chia sẻ bộ nhớ trong cùng Process (Lightweight).
- **Virtual Memory & Paging**: OS dùng bộ nhớ ảo để cấp phát nhiều hơn RAM vật lý. Paging chia memory thành các pages (thường 4KB).
### Trung cấp
- **Context Switch**: Quá trình CPU chuyển từ Thread/Process này sang Thread/Process khác. Quá nhiều Context Switch làm hao phí CPU.
- **User Mode vs Kernel Mode**: Ứng dụng chạy ở User Mode, khi cần ghi file/mạng phải gọi Syscall để chuyển sang Kernel Mode.
### Nâng cao
- **Cgroups & Namespaces**: Nền tảng của Docker/K8s. Cgroups giới hạn tài nguyên (CPU, RAM). Namespaces cô lập môi trường (PID, Network).
- **Page Cache & Buffer Cache**: Linux tận dụng RAM trống để làm cache cho Disk I/O. Khi thiếu RAM, Page Cache sẽ tự động nhả ra (evicted).

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Chạy một Java app trên máy local, giới hạn RAM JVM `-Xmx512m` để tránh treo máy.
- **Prod**: Node trong AWS EKS bị CPU Throttling do cấu hình `resources.limits.cpu` quá thấp, dù Node vật lý vẫn trống tài nguyên.
- **Enterprise (Enterprise)**: Database Server vật lý (Bare Metal) xử lý giao dịch điều hành cảng liên tục bị *I/O Wait* cao. Thay vì tăng CPU, Kỹ sư đổi sang dùng ổ cứng NVMe SSD RAID 10 và tinh chỉnh tham số `swappiness = 1` để ưu tiên RAM thật.

## 8. Command / Tool cần biết 🔴
- `top` / `htop`: Xem tổng quan CPU, RAM, Load Average. (Phím tắt: `1` để xem từng core).
- `vmstat 1`: Monitor CPU, RAM, Swap, I/O theo mỗi giây.
- `iostat -xz 1`: Xem chi tiết hoạt động đọc ghi của từng ổ cứng (cột `%util`).
- `free -m` / `free -h`: Kiểm tra RAM thật, Swap và Page Cache.
- `df -h` / `df -i`: Kiểm tra dung lượng ổ cứng và Inodes.
- `lsof`: Liệt kê các file/socket đang được mở bởi process.
- `strace -p <PID>`: Debug xem một process đang kẹt ở Syscall nào.
- `dmesg -T`: Đọc log từ Kernel (Rất hữu ích để tìm log OOM Killer).

## 9. Log (vị trí, đọc log, keywords) 🟠
- **Vị trí**: `/var/log/messages`, `/var/log/syslog`, `dmesg`.
- **Keywords**: `Out of memory`, `Killed process`, `Hardware Error`, `I/O error`, `Kernel panic`.
- **Cách đọc**: Dùng `grep -i "out of memory" /var/log/messages` để truy vết ứng dụng bị crash do RAM.

## 10. Metric (nhãn, chỉ số, threshold) 🔴
- **Load Average (1m, 5m, 15m)**: Số lượng process đang chạy hoặc đợi CPU/Disk. Threshold: Tốt nhất <= Số lượng CPU Cores.
- **CPU Usage (%)**: user (us), system (sy), iowait (wa), steal (st). Nếu `wa` > 20%, hệ thống đang kẹt ổ cứng. Nếu `st` cao trên cloud, nhà cung cấp đang tranh giành CPU của bạn.
- **Memory**: Chú ý thông số `available` (RAM sẵn sàng cho app) thay vì `free` (do RAM trống bị lấy làm Page Cache).
- **Disk %util**: Ngưỡng > 80% là dấu hiệu nghẽn cổ chai ổ cứng.

## 11. Configuration (mẫu config + giải thích) 🟠
```bash
# /etc/sysctl.conf (Kernel parameters tuning cho Database/High-load Server)

# Giảm xu hướng dùng Swap của Linux (Mặc định 60, rất chậm cho DB)
vm.swappiness = 1

# Tăng số lượng file tối đa hệ thống có thể mở (Giúp hệ thống chịu tải cao)
fs.file-max = 2097152

# Tăng kích thước backlog cho TCP (Tránh rớt kết nối mạng)
net.core.somaxconn = 65535
```

## 12. Troubleshooting Methodology 🔴
**The USE Method (Brendan Gregg)**: Đối với mọi tài nguyên (CPU, RAM, Disk, Network), luôn kiểm tra:
1. **Utilization**: Tài nguyên đang bận rộn mức nào? (Ví dụ: CPU 90%).
2. **Saturation**: Khối lượng công việc đang xếp hàng chờ tài nguyên này là bao nhiêu? (Ví dụ: Load Average = 20 trên máy 4 cores).
3. **Errors**: Có lỗi phần cứng hay phần mềm nào đang xảy ra không? (Ví dụ: Disk I/O errors trong dmesg).

## 13. Production Incident (5 kịch bản chi tiết) 🔴

### Incident 1: Hệ thống TOS crash đột ngột lúc nửa đêm
- **Symptoms**: Java Backend EKS Pods liên tục bị restart (CrashLoopBackOff). API Timeout.
- **Impact**: Tạm ngưng xử lý thủ tục xe ra vào cổng.
- **First steps**: Check Kubernetes events (`kubectl describe pod`). Thấy `Reason: OOMKilled`.
- **Commands**: `dmesg -T | grep -i oom`, `free -m`.
- **Root Cause**: Memory Leak trong xử lý batch export file Excel, hoặc JVM Heap size config vượt quá EKS Pod Limit.
- **Mitigation**: Tăng giới hạn RAM tạm thời cho Pod. Cấu hình `-XX:+HeapDumpOnOutOfMemoryError` để lấy dump.
- **Fix**: Dev sửa logic export data (dùng stream thay vì load toàn bộ vào RAM).
- **Prevention**: Setup Prometheus Alert khi Memory Usage của Pod > 85%.

### Incident 2: Server "Treo", Load Average > 100
- **Symptoms**: SSH vào máy chủ rất chậm, gõ một phím mất 5 giây mới hiện chữ. CPU Usage tổng (us) thấp nhưng Load Average cực cao.
- **Impact**: Toàn bộ dịch vụ chạy trên Node bị gián đoạn.
- **First steps**: Chạy lệnh `top`, nhìn vào trạng thái Process (cột `S` - State) thấy nhiều process ở trạng thái `D` (Uninterruptible Sleep - đang chờ Disk I/O).
- **Commands**: `iostat -xz 1`, `iotop`.
- **Root Cause**: Ổ cứng SAN Storage bị rớt mạng hoặc Ổ SSD bị lỗi phần cứng làm quá trình đọc ghi bị treo, kéo theo toàn bộ process gọi I/O bị block.
- **Mitigation**: Failover hệ thống sang Node dự phòng (Enterprise Multi-DC Active-Passive).
- **Fix**: Khởi động lại hệ thống, thay thế phần cứng ổ cứng.
- **Prevention**: Alert khi `%wa` (I/O wait) > 30% trong vòng 3 phút.

### Incident 3: Không thể tạo file mới (No space left on device) dù df báo trống 50%
- **Symptoms**: Service log báo lỗi `No space left on device`.
- **Impact**: Service ngừng hoạt động do không thể ghi log hoặc temp file.
- **Commands**: `df -h` (thấy / trống 50%), `df -i` (thấy IUse = 100%).
- **Root Cause**: Ổ cứng cạn kiệt Inodes. Nguyên nhân do ứng dụng tạo ra hàng triệu file siêu nhỏ (thường là PHP session files hoặc cache data) không bao giờ bị xóa.
- **Fix**: Dùng lệnh `find /path/to/cache -type f -mtime +7 -delete` để dọn rác.
- **Prevention**: Setup cronjob xóa file cũ định kỳ, giám sát Inodes Metric trên Grafana.

### Incident 4: Hệ thống tự động xóa log đang được ghi làm full disk ngầm
- **Symptoms**: Ổ cứng báo đầy (100%), nhưng khi chạy `du -sh /*` cộng lại thì mới chiếm 30%.
- **Root Cause**: Một file log lớn (vd 100GB) đã bị xóa bằng lệnh `rm` trong khi ứng dụng (hoặc Docker) VẪN đang giữ file descriptor mở (giữ pointer). Linux không thực sự giải phóng dung lượng cho đến khi process đó dừng lại.
- **Commands**: `lsof +L1` (Tìm các file đã bị xóa nhưng vẫn còn open).
- **Mitigation**: `kill -HUP <PID>` hoặc restart service đang chiếm file.
- **Fix**: Dùng tính năng log rotation chuẩn mực (truncate file thay vì rm: `> /var/log/app.log` hoặc `logrotate` với cờ `copytruncate`).

### Incident 5: AWS EC2 Instance giật lag ngẫu nhiên
- **Symptoms**: Hiệu năng ứng dụng thỉnh thoảng trồi sụt không rõ nguyên nhân. CPU (us) không cao.
- **Root Cause**: Chạy trên AWS EC2 loại Bursting (T-series, vd t3.medium) và đã cạn kiệt CPU Credits, dẫn đến CPU bị throttle cứng ở mức base line (vd 20%). Chỉ số `st` (Steal time) trong lệnh `top` nhảy cao.
- **Mitigation**: Đổi type instance (Scale up sang C-series hoặc M-series) hoặc bật tính năng T3 Unlimited.
- **Prevention**: Monitor chỉ số `CPUCreditBalance` trên CloudWatch.

## 14. So sánh 🟠
| Tiêu chí | Process | Thread | Goroutine / Coroutine |
|---|---|---|---|
| Tài nguyên | Nặng, không gian nhớ độc lập | Nhẹ, chia sẻ không gian nhớ | Cực kỳ nhẹ, chạy trên User space |
| Cách ly | Cao (crash process này không ảnh hưởng process khác) | Thấp (1 thread lỗi OOM có thể kéo sập toàn bộ process) | Do runtime của ngôn ngữ quản lý |
| Use case | Nginx workers, Postgres workers | Java Tomcat, MySQL workers | Go HTTP server, Python AsyncIO |

## 15. Common Mistakes 🟠
- **Dùng lệnh `free` thấy "free" ít rồi vội kết luận thiếu RAM**: Cần nhìn vào cột `available` và hiểu rằng Linux cache I/O vào RAM rảnh.
- **Restart bừa bãi khi lỗi**: Không thu thập `dmesg`, `strace`, `heap dump` trước khi restart sẽ làm mất dấu Root Cause (rất hay gặp).
- **Setup OOM Killer vô tội vạ**: Thiết lập ưu tiên OOM sai cách khiến OS kill mất database thay vì kill ứng dụng gây lỗi.

## 16. Interview Knowledge Check 🔴
### 10 Câu hỏi Cơ bản
1. Phân biệt User space và Kernel space?
2. Linux OOM Killer là gì? Nó hoạt động khi nào?
3. Inode là gì?
4. Ý nghĩa 3 con số Load Average 1m, 5m, 15m?
5. Swapping (Swap memory) là gì?
6. Phân biệt TCP và UDP ở mức độ hệ điều hành? (Socket)
7. Context Switching là gì?
8. Kể tên 3 công cụ monitor tài nguyên hệ thống?
9. File descriptor là gì? Giới hạn của nó ra sao?
10. Zombie process là gì?

### 10 Câu hỏi Hiểu bản chất
1. Tại sao Load Average có thể cao hơn rất nhiều so với phần trăm CPU Usage?
2. Băng thông ổ cứng (MB/s) lớn có đảm bảo xử lý database nhanh không? (Khái niệm IOPS vs Throughput).
3. Tại sao trong môi trường Docker, dùng lệnh `free` hoặc `top` đôi khi ra RAM của Host thay vì RAM của Container? (Gợi ý: Cgroups limitations & Lxcfs).
4. Tham số `vm.swappiness` ảnh hưởng thế nào đến hiệu năng của một Database server?
5. Page Cache hoạt động như thế nào khi bạn đọc một file lớn hơn dung lượng RAM vật lý?

### 10 Câu hỏi Troubleshooting
1. Khi có cảnh báo CPU Usage 100%, bạn sẽ gõ những lệnh gì đầu tiên để cô lập vấn đề?
2. Ứng dụng thi thoảng bị chậm 5-10 giây, sau đó bình thường. Bạn nghi ngờ điều gì? (Gợi ý: GC pause, CPU Steal, I/O spike).
3. Đang xử lý sự cố, gõ `df -h` hệ thống bị treo cứng không phản hồi. Chuyện gì đang xảy ra? (Gợi ý: NFS mount bị timeout).
4. Bạn vô tình lỡ tay xóa một file log đang ghi dở của Nginx. Làm sao để khôi phục lại không? (Gợi ý: Dùng lsof & copy file descriptor từ /proc).
5. Bạn setup 1 Web server báo lỗi "Too many open files", bạn xử lý thế nào?

## 17. Câu hỏi phỏng vấn (Phân loại theo Level) 🔴
- **Basic**: Trình bày quá trình boot của một hệ điều hành Linux.
- **Intermediate**: Giải thích The USE Method. Làm sao để áp dụng nó vào hệ thống.
- **Advanced**: Bạn thiết kế kiến trúc cho cụm worker phân tích dữ liệu kho bãi Enterprise. Bạn chọn EC2 Compute Optimized hay Memory Optimized? Tại sao?
- **Troubleshooting**: Khách hàng báo API phản hồi quá chậm (30s). Hệ thống có Load Balancer -> Backend -> Database. Mô tả quy trình tìm ra nguyên nhân.
- **Architecture**: So sánh việc chạy Database trên Bare Metal (Physical server) và chạy trên Kubernetes (StatefulSet) dưới góc nhìn của OS Resource allocation.

## 18. Đáp án phỏng vấn 🔴
*Câu hỏi: Giải thích Load Average và so sánh với CPU Percentage.*
- **Trả lời ngắn (20-30s)**: Load Average là trung bình số lượng các process đang cần tài nguyên CPU hoặc Disk I/O trong 1 khoảng thời gian. CPU Percentage chỉ đo phần trăm thời gian CPU bận xử lý.
- **Trả lời sâu (1-2m)**: Nhấn mạnh vào chữ "Disk I/O". Nhiều người lầm tưởng Load Average cao là do CPU. Ở Linux, Load Average đếm cả các process đang nằm trong queue chờ CPU (Runnable) và các process đang chờ đĩa cứng (Uninterruptible Sleep - D state). Do đó CPU có thể 5% nhưng Load = 100 do ổ cứng nghẽn.
- **Bẫy cần tránh**: Trả lời "Load Average là % sử dụng CPU chia cho thời gian". Sai hoàn toàn bản chất hàng đợi (queue length).

## 19. Cách trả lời như Engineer 🔴
"Khi thiết lập cảnh báo (Alert) cho hệ thống tại Enterprise, em không bao giờ chỉ nhìn vào CPU %. Em thường tạo bảng dashboard trên Grafana kết hợp biểu đồ CPU Usage và Load Average cạnh nhau, kèm theo biểu đồ I/O Wait (iostat). Việc nhìn thấy sự tương quan (correlation) giữa sự gia tăng I/O Wait và việc API Timeout sẽ giúp em kết luận nhanh chóng vấn đề đến từ Storage chứ không phải do thiếu CPU, từ đó tránh việc scale out node vô ích."

## 20. Follow-up Question Tree 🟠
- **Q**: Load cao do IO Wait -> **A**: Dùng iostat, iotop tìm process.
  - *Follow-up*: Làm sao để hạn chế process đó chiếm quá nhiều I/O?
  - *Answer*: Dùng Cgroups (blkio) để thiết lập IOPS limit (Throttle) cho process hoặc container đó, hoặc đẩy job xử lý sang off-peak hours (ban đêm).

## 21. Checklist sau khi học 🟠
- [ ] SSH vào 1 máy Linux, thành thạo các phím tắt của lệnh `htop`.
- [ ] Dùng lệnh `dd` tạo file ảo 10GB để mô phỏng 100% I/O Wait và quan sát Load Average.
- [ ] Dùng Docker giới hạn bộ nhớ (`--memory=100m`) chạy ứng dụng nặng để quan sát OOM Killer trên `dmesg`.

## 22. Flashcards (Q&A) 🟠
- **Q**: Tiến trình ở trạng thái `D` trong htop nghĩa là gì? -> **A**: Uninterruptible Sleep (Thường là chờ Disk/Network I/O, không thể dùng `kill -9` để tắt ngay).
- **Q**: Lệnh gì để xem process nào đang dùng port 8080? -> **A**: `lsof -i :8080` hoặc `netstat -tulpn | grep 8080` / `ss -tulpn | grep 8080`.
- **Q**: `kill -9` khác gì `kill -15`? -> **A**: `-15 (SIGTERM)` cho phép process dọn dẹp sạch sẽ trước khi tắt (Graceful shutdown). `-9 (SIGKILL)` ép hệ điều hành tiêu diệt process ngay lập tức.
- **Q**: Inode lưu gì? -> **A**: Metadata của file (quyền, chủ sở hữu, kích thước, vị trí trên disk), NGOẠI TRỪ tên file. Tên file được lưu ở Directory dentry.
- **Q**: Zombie process tốn tài nguyên gì nhất? -> **A**: Chỉ tốn 1 Process ID (PID) trong bảng tiến trình, không tốn RAM/CPU. Nhưng nếu bảng PID đầy, hệ thống không thể chạy lệnh mới. Dọn dẹp bằng cách kill process CHA của zombie.
