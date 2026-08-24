# Interview Preparation: Networking (TCP/IP, DNS, Load Balancing, VPN)

## 1. Mục tiêu học 🔴
- Xây dựng kiến thức vững chắc về mạng máy tính ở cả tầng Network (L3/L4) và Application (L7).
- Hiểu và áp dụng kiến thức vào việc thiết kế mạng VPC trên AWS và mạng nội bộ Doanh nghiệp.
- Nắm vững quy trình xử lý sự cố mạng cho các hệ thống yêu cầu độ trễ cực thấp (Low Latency) và tính sẵn sàng cao (High Availability) tại Enterprise System.

## 2. Kiến thức nền cần biết 🟠
- Mô hình OSI (7 layers) và TCP/IP (4 layers).
- Khái niệm về IP Address (IPv4, IPv6), Subnet Mask, Default Gateway.
- Cơ chế hoạt động của Web (HTTP, HTTPS, SSL/TLS).

## 3. Tổng quan (Enterprise & Doanh nghiệp Enterprise Enterprise Context) 🔴
Trong môi trường Logistics tại Enterprise, hệ thống mạng đóng vai trò huyết mạch. Dữ liệu từ các cẩu trục (QC), xe nâng (RTG), và thiết bị cầm tay (Handheld) của nhân viên bãi phải truyền về Data Center trong thời gian thực (Real-time). Kiến trúc lai (Hybrid Network) sử dụng AWS Site-to-Site VPN hoặc AWS Direct Connect để kết nối Data Center On-premise với AWS VPC. Hiểu biết sâu sắc về Routing, Load Balancing, và DNS là yếu tố sống còn để định tuyến luồng traffic của tài xế vào hệ thống E-port (Cổng điện tử) một cách mượt mà và an toàn.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🔴
```text
[ Internet / Khách hàng E-port ]
            | (HTTPS / Port 443)
      [ Route 53 (DNS) ]
            |
    [ AWS WAF & Shield ]
            |
  [ Application Load Balancer (ALB) - Layer 7 ]
      /             \
[ EKS Node 1 ]   [ EKS Node 2 ] (Web / App Services)
      \             /
   [ AWS Transit Gateway ]
            | (IPsec VPN / Direct Connect)
---------------------------------------------
        (On-Premise Data Center)
            |
      [ Core Switch ]
            |
  [ Oracle / Core Database Bare Metal ]
```

## 5. Các thành phần quan trọng (Components, failure modes, impact) 🔴
- **DNS (Domain Name System)**
  - *Failure mode*: DNS Outage, TTL quá dài khi failover.
  - *Impact*: Người dùng không thể truy cập website bằng tên miền dù server vẫn sống.
- **Load Balancer (L4/L7)**
  - *Failure mode*: Health check failed hàng loạt, cạn kiệt Port (SNAT Port Exhaustion).
  - *Impact*: Request bị drop 502/504, thắt cổ chai toàn hệ thống.
- **VPN / Direct Connect**
  - *Failure mode*: BGP Session down, Đứt cáp quang.
  - *Impact*: Mất kết nối giữa môi trường Cloud (Web/App) và On-premise (Database), toàn bộ giao dịch bị ngưng trệ.
- **Firewall / Security Group (SG)**
  - *Failure mode*: Rule cấu hình sai chặn nhầm traffic hợp lệ (False positive).
  - *Impact*: Dịch vụ báo "Connection Timed Out".

## 6. Các concept quan trọng 🔴
### Cơ bản
- **TCP 3-way Handshake**: SYN -> SYN-ACK -> ACK. Quá trình thiết lập kết nối tin cậy.
- **TCP Teardown**: FIN -> ACK -> FIN -> ACK (hoặc RST để đóng đột ngột).
- **Public IP vs Private IP (RFC 1918)**: Các dải IP nội bộ không định tuyến được ngoài Internet (10.x.x.x, 172.16.x.x, 192.168.x.x).
### Trung cấp
- **NAT (Network Address Translation)**: Giúp nhiều máy Private truy cập Internet qua 1 IP Public.
- **Subnetting (CIDR Notation)**: VD: /24 có 256 IP, /16 có 65536 IP. AWS VPC luôn dự trữ 5 IP đầu/cuối của Subnet.
### Nâng cao
- **L4 vs L7 Load Balancing**: L4 (TCP/UDP) nhanh, truyền thẳng traffic (pass-through). L7 (HTTP/HTTPS) có thể giải mã SSL, đọc Header và route theo path (vd: `/api` qua service A).
- **BGP (Border Gateway Protocol)**: Giao thức định tuyến giữa các mạng lớn (AS). Dùng trong AWS Direct Connect.
- **MTU (Maximum Transmission Unit)**: Kích thước gói tin lớn nhất. Khớp MTU (thường 1500) là bắt buộc, sai lệch gây rớt mạng bí ẩn (Black hole connection).

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Dùng Docker bridge network để các container nói chuyện với nhau qua DNS của Docker.
- **Prod**: Cấu hình VPC Peering giữa các môi trường Prod và Staging trên AWS, đảm bảo CIDR block không bị overlap (chồng chéo).
- **Enterprise (Enterprise)**: Xây dựng AWS Transit Gateway làm Hub-and-Spoke kết nối 5 VPC khác nhau và 2 Data Center vật lý thông qua 2 đường truyền vật lý (Active/Active) chạy giao thức định tuyến động BGP.

## 8. Command / Tool cần biết 🔴
- `ping`: Kiểm tra kết nối ICMP (Có thể bị chặn bởi Firewall).
- `telnet <IP> <PORT>` / `nc -zv <IP> <PORT>`: Kiểm tra xem một Port TCP có đang mở và lắng nghe hay không (Rất quan trọng).
- `curl -vI https://domain.com`: Xem chi tiết quá trình bắt tay SSL và HTTP Headers.
- `traceroute` / `mtr`: Truy vết đường đi của gói tin qua các router, tìm điểm gây độ trễ (latency).
- `dig <domain>` / `nslookup`: Truy vấn thông tin DNS (A record, CNAME).
- `ss -tulpn` / `netstat -tulpn`: Liệt kê các port đang mở trên server hiện tại.
- `tcpdump -i any port 80`: Bắt gói tin (Packet Sniffing) ở tầng thấp để phân tích lỗi.

## 9. Log (vị trí, đọc log, keywords) 🟠
- **AWS VPC Flow Logs**: Nơi lưu lại mọi IP/Port được ACCEPT hay REJECT trong VPC.
- **ALB Access Logs**: Ghi nhận mã HTTP, thời gian xử lý (target_processing_time) của từng request.
- **Keywords**: `Connection reset by peer`, `Timeout`, `No route to host`, `502 Bad Gateway`, `504 Gateway Timeout`.

## 10. Metric (nhãn, chỉ số, threshold) 🔴
- **Active Connections**: Số kết nối đang mở. Tăng đột biến có thể do DDoS hoặc service kẹt không đóng kết nối.
- **Network In/Out (Bytes/s)**: Băng thông đang dùng. Đụng trần card mạng (Vd: 1Gbps) sẽ gây drop packets.
- **TCP Retransmission Rate**: Số gói tin phải gửi lại do mất mát. > 2% là mạng chập chờn, > 5% là thảm họa.
- **DNS Resolution Time**: Thời gian phân giải DNS (> 50ms là bất thường cho nội bộ).

## 11. Configuration (mẫu config + giải thích) 🟠
```nginx
# Nginx Load Balancer Layer 7 (Reverse Proxy)
upstream backend_servers {
    # Thuật toán Round Robin (mặc định)
    server 10.0.1.10:8080 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:8080 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name eport.saigonnewport.com.vn;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header X-Real-IP $remote_addr; # Chuyển IP thật của Client cho Backend
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 12. Troubleshooting Methodology 🔴
Dùng mô hình OSI từ dưới lên (Bottom-up) hoặc từ trên xuống (Top-down). Thường dùng **Bottom-up**:
1. **Layer 1 (Physical/Cable)**: Có cắm dây chưa? / AWS Subnet có IGW/NAT chưa?
2. **Layer 2 (Data Link)**: Lỗi MAC, VLAN config sai.
3. **Layer 3 (Network - IP)**: Ping IP có thông không? Bảng định tuyến (Route Table) đúng không?
4. **Layer 4 (Transport - TCP/UDP)**: Telnet vào Port có mở không? Security Group/Firewall có block không?
5. **Layer 7 (Application - HTTP/DNS)**: DNS phân giải đúng IP không? Lỗi 500 do Code hay Server? Dùng `curl` để test.

## 13. Production Incident (5 kịch bản chi tiết) 🔴

### Incident 1: 504 Gateway Timeout khi query Database
- **Symptoms**: Website Load Balancer trả về 504 ngẫu nhiên.
- **Impact**: Khách hàng tra cứu container bị lỗi xoay vòng.
- **First steps**: Check ALB Access Logs, thấy `target_processing_time` cao > 60s.
- **Root Cause**: Backend nhận request nhưng Database chạy Query quá chậm (kẹt lock). Load Balancer đứt nhẫn chờ (Idle timeout mặc định 60s của ALB) nên ngắt kết nối và trả về 504.
- **Mitigation**: Tăng Idle Timeout của Load Balancer lên 120s tạm thời.
- **Fix**: Dev tối ưu Index của Database query.

### Incident 2: Connection Timed Out sau khi Deploy VPC mới
- **Symptoms**: EC2 ở Private Subnet không thể `curl https://google.com`, gọi API bên thứ 3 thất bại.
- **Root Cause**: Private Subnet chưa được gắn NAT Gateway trong Route Table.
- **Commands**: `ping 8.8.8.8` (Rớt), `traceroute 8.8.8.8` (Chỉ đi đến dòng 1 rồi tịt).
- **Fix**: Tạo NAT Gateway ở Public Subnet, thêm rule `0.0.0.0/0` trỏ ra NAT Gateway trong Route Table của Private Subnet.

### Incident 3: Tên miền mới đổi IP nhưng User vẫn truy cập Server cũ
- **Symptoms**: Đã trỏ A record sang Load Balancer ở Site dự phòng (B), nhưng khách hàng báo vẫn thấy dữ liệu cũ ở Site A.
- **Root Cause**: DNS Caching ở các nhà mạng (VNPT, Viettel) hoặc trình duyệt chưa hết hạn TTL (Time-To-Live). Trước đó TTL được set là 24h.
- **Mitigation**: Hướng dẫn user flush DNS cục bộ (`ipconfig /flushdns`).
- **Fix/Prevention**: 24-48 tiếng trước đợt bảo trì hoặc DR, phải hạ TTL của DNS xuống 60 giây.

### Incident 4: Mạng nội bộ On-premise và AWS không thông nhau
- **Symptoms**: EC2 trên AWS ping IP `10.10.1.5` dưới On-premise không được, dù Site-to-Site VPN báo "UP".
- **Root Cause**: Xung đột dải mạng (CIDR Overlap). Cả VPC trên AWS và Data Center On-prem đều đang dùng chung dải `10.10.0.0/16`. Gói tin đi không biết về đâu.
- **Fix**: Re-IP (Đổi dải mạng) 1 trong 2 bên. Đây là lỗi thiết kế cực kỳ nghiêm trọng. Luôn phải quy hoạch IP doanh nghiệp chuẩn ngay từ đầu.

### Incident 5: Nginx trả về lỗi Too Many Open Files do SYN Flood
- **Symptoms**: Số lượng connection trạng thái `SYN_RECV` tăng vọt, server không nhận thêm request hợp lệ.
- **Commands**: `netstat -an | grep SYN_RECV | wc -l` (thấy hàng chục ngàn kết nối).
- **Root Cause**: Bị tấn công DDoS (SYN Flood). Kẻ tấn công gửi SYN nhưng không gửi ACK cuối cùng, làm cạn kiệt Connection Queue của Kernel.
- **Mitigation**: Bật `tcp_syncookies = 1` trong sysctl. Chặn IP tấn công bằng iptables/AWS WAF.
- **Prevention**: Đặt dịch vụ sau AWS Shield hoặc Cloudflare.

## 14. So sánh 🟠
| Tiêu chí | TCP | UDP |
|---|---|---|
| Độ tin cậy | Cao (Đảm bảo tới nơi và đúng thứ tự) | Thấp (Gửi xong là quên - Fire and forget) |
| Tốc độ | Chậm hơn (Có overhead bắt tay) | Cực nhanh |
| Use case | HTTP, SSH, Database, FTP | DNS, Video Streaming, Voice (VoIP), Game |

| L4 Load Balancer (Network) | L7 Load Balancer (Application) |
|---|---|
| Chỉ hiểu IP và Port. | Hiểu HTTP, URL path, Headers, Cookies. |
| Rất nhẹ, thông lượng (throughput) khổng lồ. | Nặng CPU (giải mã SSL), thông minh. |
| AWS NLB, HAProxy (TCP mode). | AWS ALB, Nginx, Traefik. |

## 15. Common Mistakes 🟠
- **Lầm tưởng `ping` rớt là máy chủ chết**: Ping dùng giao thức ICMP, rất hay bị Firewall/Security Group chặn. Telnet/curl TCP port chính xác hơn.
- **Quên forward X-Forwarded-For (XFF)**: Ứng dụng Backend log toàn bộ IP người truy cập là IP của Load Balancer, không thấy IP thật của khách hàng, gây khó khăn cho việc phân tích và block IP xấu.
- **Gắn Elastic IP (Public IP) thẳng vào Database**: Lỗ hổng bảo mật chết người. Database luôn phải nằm ở Private Subnet.

## 16. Interview Knowledge Check 🔴
### 10 Câu hỏi Cơ bản
1. Phân biệt Public IP và Private IP?
2. DNS hoạt động như thế nào khi bạn gõ "google.com" vào trình duyệt?
3. DHCP là gì?
4. MAC Address là gì? Nó khác gì so với IP Address?
5. Port mặc định của HTTP, HTTPS, SSH, DNS là gì?
6. Trình bày mô hình 3-way handshake của TCP.
7. Subnet Mask `/24` nghĩa là gì?
8. VPN là gì? Khác gì với Proxy?
9. Default Gateway là gì?
10. Tường lửa (Firewall) lớp 3 khác lớp 7 chỗ nào?

### 10 Câu hỏi Hiểu bản chất
1. Nếu 2 máy tính nằm chung 1 Switch nội bộ nhưng khác dải Subnet (ví dụ 10.0.0.5/24 và 10.0.1.5/24), chúng có ping được nhau không? (Không, cần Router).
2. Tại sao người ta chuộng dùng UDP cho Livestreaming dù nó không tin cậy?
3. Trình bày khái niệm SNI (Server Name Indication) trong SSL/TLS. Tại sao nó quan trọng khi host nhiều domain trên 1 IP?
4. Tại sao Load Balancer L7 lại tốn CPU hơn L4?
5. Giao thức BGP giải quyết vấn đề gì trong mạng Internet?

### 10 Câu hỏi Troubleshooting
1. Server A gọi API qua Server B chậm bất thường (mất 5s). Gõ lệnh gì để biết mạng kẹt ở đâu?
2. Bạn đổi DNS record nhưng ping vẫn ra IP cũ. Làm gì tiếp theo?
3. Security Group trên AWS đã mở port 3306, nhưng không thể kết nối tới MySQL. Bạn sẽ check thêm những bước nào? (Network ACL, MySQL bind-address 0.0.0.0).
4. Khách hàng báo lỗi 502 Bad Gateway. Lỗi này sinh ra từ đâu và có ý nghĩa gì?
5. Trong môi trường Kubernetes, Service báo rớt kết nối. Bạn dùng tool gì để bắt packet bên trong Container? (`tcpdump` hoặc ephemeral debug container).

## 17. Câu hỏi phỏng vấn (Phân loại theo Level) 🔴
- **Basic**: Sự khác nhau giữa TCP và UDP.
- **Intermediate**: Giải thích cách hoạt động của NAT. Cấu hình NAT Gateway trên AWS tốn tiền, có cách nào thay thế không? (Dùng NAT Instance).
- **Advanced**: Trình bày luồng đi của gói tin từ Browser của User đi xuyên qua ALB vào 1 EKS Pod (CNI network).
- **Troubleshooting**: Lỗi "Connection Reset by Peer" là gì? Nguyên nhân do đâu?
- **Architecture**: Thiết kế kiến trúc mạng Multi-VPC cho 1 công ty có 10 phòng ban, các phòng ban cần bảo mật không nhìn thấy nhau nhưng cùng phải chọc về 1 VPC chứa Central Database. (Sử dụng Transit Gateway hoặc Shared VPC).

## 18. Đáp án phỏng vấn 🔴
*Câu hỏi: Nếu một server backend sập, làm sao Load Balancer biết để ngừng gửi traffic vào đó?*
- **Trả lời ngắn (20s)**: Load Balancer liên tục thực hiện Health Check (vd gửi HTTP GET /health) theo chu kỳ. Nếu backend không trả lời 200 OK quá số lần quy định, nó sẽ bị đánh dấu là Unhealthy và loại khỏi pool.
- **Trả lời sâu (1m)**: Nêu chi tiết thuật toán. "Ví dụ em config ALB, health check interval 10s, Unhealthy Threshold = 3. Nếu ứng dụng chết, phải mất 30s ALB mới ngừng gửi request. Trong 30s đó, một số User sẽ bị lỗi 502. Để giảm rủi ro, em phải kết hợp Graceful Shutdown trên ứng dụng và PreStop Hook trong K8s để thông báo cho ALB cắt traffic trước khi app thực sự tắt".
- **Bẫy cần tránh**: Chỉ nói chung chung "Load Balancer tự biết", không hiểu bản chất quá trình Active Polling của Health Check và độ trễ (delay) trong failover.

## 19. Cách trả lời như Engineer 🔴
"Đối với mạng Enterprise, em luôn tiếp cận theo hướng Defense in Depth (Phòng thủ chiều sâu). Em quy hoạch mạng VPC theo tier: Public cho Load Balancer, Private cho App, và Isolated Private cho Database. Database không bao giờ có đường ra Internet. Khi troubleshooot lỗi mạng, nguyên tắc của em là không đoán mò, luôn dùng tcpdump để chứng minh 'Packet lies neither to you nor to me'."

## 20. Follow-up Question Tree 🟠
- **Q**: Dùng `curl` không được do timeout -> **A**: Kiểm tra Security Group (Firewall).
  - *Follow-up*: Security Group đã mở, route table đã đúng, nhưng vẫn timeout?
  - *Answer*: Em sẽ kiểm tra Network ACL (vì nó là Stateless, phải mở cả Inbound và Outbound port cao >1024). Tiếp theo check OS Firewall (`iptables`/`ufw`). Cuối cùng xem ứng dụng có thực sự đang listen trên `0.0.0.0` hay chỉ listen trên `127.0.0.1`.

## 21. Checklist sau khi học 🟠
- [ ] Tự tạo VPC từ con số 0 trên AWS (Không dùng wizard), gồm Public/Private Subnet, IGW, NAT Gateway, Route Tables.
- [ ] Dùng Wireshark hoặc `tcpdump` bắt gói tin 1 quá trình truy cập website bằng HTTP để nhìn thấy 3-way handshake.
- [ ] Setup Nginx làm Reverse Proxy và Load Balancer trỏ xuống 2 docker container nginx phụ.

## 22. Flashcards (Q&A) 🟠
- **Q**: Mã HTTP 4xx và 5xx khác nhau cơ bản thế nào? -> **A**: 4xx là lỗi từ phía Client (User sai). 5xx là lỗi hệ thống (Server sai).
- **Q**: Lệnh `netstat` không có sẵn trên Ubuntu mới, dùng lệnh gì thay thế? -> **A**: `ss` (Socket Statistics).
- **Q**: Ephemeral Ports là gì? -> **A**: Các cổng ngẫu nhiên (thường từ 32768 đến 60999) hệ điều hành dùng làm Source Port khi mở kết nối ra ngoài. Phải mở dải cổng này trên Network ACL để có thể nhận phản hồi.
- **Q**: X-Forwarded-For dùng để làm gì? -> **A**: HTTP Header chứa danh sách IP thật của người dùng truyền qua các lớp Proxy/Load Balancer.
- **Q**: Chữ "S" trong HTTPS là gì? Dùng port mấy? -> **A**: Secure (Bảo mật bằng SSL/TLS). Dùng Port 443.
