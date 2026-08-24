# Cẩm nang Phỏng vấn & Thực chiến: NGINX

## 1. Mục tiêu học 🔴
- Nắm vững kiến trúc Event-driven của NGINX.
- Thiết lập, tối ưu NGINX như một Web Server và Reverse Proxy / Load Balancer hiệu năng cao.
- Có khả năng cấu hình bảo mật, SSL/TLS, và xử lý log/troubleshoot.

## 2. Kiến thức nền cần biết 🟠
- Kiến thức mạng TCP/IP, OSI model, HTTP/HTTPS.
- Khái niệm về Socket, File Descriptor, Proxy, Load Balancing.
- Các status codes của HTTP (2xx, 3xx, 4xx, 5xx).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context) 🔴
Trong môi trường doanh nghiệp hiện đại, NGINX được sử dụng làm API Gateway, Ingress Controller (trong Kubernetes), hoặc Load Balancer L7. Tại Enterprise, khi chuyển đổi số các hệ thống hướng tới Microservices, NGINX đóng vai trò tiếp nhận traffic public, thực thi SSL Termination, và chia tải về các backend cluster nội bộ.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams) 🟠
NGINX sử dụng kiến trúc **Master-Worker** dựa trên **Event-Driven, Asynchronous & Non-blocking**.

```
+-----------------------------------------------------+
|                     Master Process                  |
|  (Đọc cấu hình, quản lý ports, sinh Worker process) |
+--------------------------+--------------------------+
                           |
       +-------------------+-------------------+
       |                   |                   |
+------v------+     +------v------+     +------v------+
|Worker Proc 1|     |Worker Proc 2|     |Worker Proc 3|
| (epoll/kqueue)    | (epoll/kqueue)    | (epoll/kqueue)    
+-------------+     +-------------+     +-------------+
       |                   |                   |
  +----+----+         +----+----+         +----+----+
  | 10,000  |         | 10,000  |         | 10,000  |
  | Conns   |         | Conns   |         | Conns   |
  +---------+         +---------+         +---------+
```

## 5. Các thành phần quan trọng (Failure modes, impact) 🔴
- **nginx.conf**: File cấu hình lõi. *Failure*: Sai cú pháp làm NGINX không thể reload/restart.
- **Worker connections**: Giới hạn kết nối mỗi worker. *Failure*: Đặt quá thấp làm rớt request lúc cao điểm (lỗi "worker_connections are not enough").
- **Upstream**: Định nghĩa backend. *Failure*: Backend sập, NGINX trả về 502 Bad Gateway.
- **Access / Error Logs**: *Failure*: Không rotate log làm đầy ổ cứng.

## 6. Concepts 🔴
- **Cơ bản**: Server block (Virtual host), Location block, Listen port, Root vs Alias.
- **Trung cấp**: Reverse Proxy, Load Balancing (Round-Robin, IP Hash, Least Conn), SSL Termination.
- **Nâng cao**: Caching, Rate Limiting, gzip/brotli compression, Lua script (OpenResty), Tuning kernel parameters.

## 7. Ví dụ thực tế (Dev, Prod, Enterprise/Multi-DC) 🟠
- **Dev**: Dùng Docker container chạy NGINX để proxy frontend và backend API trên máy local.
- **Prod**: NGINX xử lý TLS/SSL và gỡ bỏ mã hóa (SSL offloading), đẩy HTTP vào web farm phía sau để giảm tải CPU cho các web server.
- **Enterprise**: Sử dụng NGINX Plus hoặc cluster NGINX đồng bộ session, tích hợp WAF (ModSecurity/App Protect) chặn SQL Injection.

## 8. Command / Tool cần biết 🔴
- `nginx -t` (Test file cấu hình).
- `nginx -s reload` (Reload cấu hình không gây downtime/rớt connection).
- `systemctl status nginx`, `journalctl -u nginx`.
- `tail -f /var/log/nginx/access.log`.

## 9. Log 🔴
- **Access log**: Mỗi dòng là 1 request.
  ```text
  192.168.1.100 - - [24/Aug/2026:10:00:00 +0700] "GET /api/status HTTP/1.1" 200 1500 "-" "Mozilla/5.0"
  ```
- **Error log**: Nơi xem lỗi như 502, timeout, SSL handshake failure.
- **Mẹo**: Cấu hình log format để thêm cột `$request_time` (đo độ trễ NGINX) và `$upstream_response_time` (đo độ trễ backend trả về).

## 10. Metric 🟠
- Trạng thái basic qua trang `stub_status` (Active connections, accepts, handled, requests).
- Dùng Prometheus + `nginx-prometheus-exporter` để vẽ biểu đồ trên Grafana.

## 11. Configuration 🟠
Mẫu cấu hình Reverse Proxy & Rate Limiting:
```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

upstream backend_servers {
    server 10.0.0.10:8080 weight=3;
    server 10.0.0.11:8080 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name api.snp.com.vn;

    location / {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 12. Troubleshooting Methodology 🔴
1. **Lỗi báo từ user**: Xác định mã lỗi (502, 504, 404).
2. **Check log NGINX**: Bật `tail -f error.log`.
3. **Phân tích nguyên nhân**:
   - 502: NGINX tới được backend nhưng kết nối bị từ chối/backend sập.
   - 504: NGINX tới được backend nhưng backend xử lý quá lâu (Gateway Timeout).
   - 413: Request Entity Too Large (Thường do upload file lớn, cần tăng `client_max_body_size`).
4. **Test kết nối backend**: Từ server NGINX, dùng `curl -v http://backend_ip:port` để xác thực backend sống hay chết.

## 13. Production Incident 🔴
**Scenario: Backend timeout gây hiệu ứng domino**
- **Symptoms**: NGINX bắt đầu trả về 504 Gateway Timeout cho user, RAM/CPU của server NGINX vẫn thấp nhưng số lượng kết nối (Active Connections) tăng vọt (hàng ngàn).
- **Impact**: Không ai truy cập được dịch vụ.
- **Root Cause**: Database chậm làm Backend (Node.js/Java) xử lý chậm. NGINX là asynchronous nên có thể giữ hàng vạn connection rất nhẹ nhàng, nhưng Backend thì cạn kiệt tài nguyên (Thread pool hệt). NGINX tiếp tục đẩy request vào làm Backend sập hẳn.
- **Fix/Mitigation**: Chỉnh `proxy_read_timeout` trên NGINX thấp xuống (vd: 10s thay vì 60s) để fail fast (cắt đuôi request sớm). Bật cơ chế Cache tạm thời để giảm tải backend.

## 14. So sánh 🟠
- **Apache (Prefork) vs NGINX**: Apache tạo một thread/process mới cho mỗi request (tốn RAM và CPU context switch, dễ nghẽn khi traffic cao). NGINX dùng 1 thread xử lý hàng ngàn request qua event loop (epoll), tốn cực ít RAM, phù hợp làm proxy.
- **HAProxy vs NGINX**: HAProxy chuyên biệt và cực mạnh về Load Balancing L4/L7 (TCP/HTTP), có bảng dashboard tốt hơn bản NGINX free. NGINX đa năng hơn vì vừa làm web server tĩnh, cache, proxy.

## 15. Common Mistakes 🟠
- Sửa file config và restart NGINX (`systemctl restart nginx`) gây rớt kết nối đang chạy. Luôn phải dùng `nginx -s reload`.
- Không tăng `worker_connections` và limit file descriptor (`ulimit -n`) của OS.
- Quên truyền IP thật của client xuống backend qua header `X-Forwarded-For`, làm backend tưởng mọi traffic xuất phát từ 1 IP của NGINX.

## 16. Knowledge Check 🔴
- Lệnh nào dùng để check cú pháp config NGINX?
- `root` và `alias` khác nhau thế nào trong cấu hình location?
- NGINX đóng vai trò Ingress trong Kubernetes làm gì?

## 17. Câu hỏi phỏng vấn 🔴
- **Cơ bản**: Lỗi 502 và 504 khác nhau thế nào?
- **Nâng cao**: Cơ chế "graceful reload" (`nginx -s reload`) hoạt động ra sao ở mức process? (Master process spawn ra Worker process mới, cấu hình mới. Worker cũ không nhận kết nối mới nữa và tự chết khi xử lý xong các request hiện tại).
- **Troubleshooting**: User upload file bị lỗi. Em check cấu hình nào? (`client_max_body_size`).

## 18. Đáp án phỏng vấn 🟠
- **Trả lời "Reverse Proxy vs Forward Proxy"**: Forward proxy đại diện cho client đi ra Internet (giấu mặt client). Reverse proxy đại diện cho server (giấu mặt server), phân phối tải cho server.

## 19. Cách trả lời như Engineer 🔴
"Khi dùng NGINX làm load balancer, ngoài thuật toán round-robin, em thường xét đến IP Hash cho các hệ thống cũ cần session stickiness. Em luôn cấu hình biến `$upstream_response_time` vào log để có bằng chứng rõ ràng khi cãi nhau với team Dev xem ứng dụng chậm là do mạng hay do code."

## 20. Follow-up Question Tree 🟠
- Q: NGINX xử lý được 10,000 connection một lúc, tại sao? -> A: Do dùng mô hình Asynchronous, Non-blocking I/O (epoll). -> Q: Vậy nếu một request đòi hỏi việc đọc 1 file dung lượng rất lớn từ đĩa thì NGINX có bị block worker đó không? -> A: Có thể. Từ bản mới NGINX hỗ trợ Thread Pools để xử lý disk I/O nặng không làm nghẽn worker chính.

## 21. Checklist sau khi học 🟠
- [ ] Cài đặt NGINX trên Linux.
- [ ] Cấu hình load balance qua 2 container Docker chạy backend đơn giản.
- [ ] Bật log tùy biến (custom log format).

## 22. Flashcards 🟠
- **Q**: Lệnh reload NGINX?
- **A**: `nginx -s reload`

## 23. Đánh dấu 🔴 Phải hiểu, 🟠 Phải nắm.
*(Đã tích hợp)*
