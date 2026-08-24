# 11. Multi-Data Center Architecture

## 1. Why This Matters
Doanh nghiệp Enterprise quản lý nhiều cảng lớn ở nhiều vị trí địa lý khác nhau (Cảng Primary DC, Secondary DC, Branch DC, v.v.). Hệ thống CNTT không thể đặt rải rác mà thiếu liên kết, hoặc chỉ đặt tại một chỗ (Single DC) gây nguy cơ thảm họa cục bộ. Multi-DC Architecture cho phép phân tán tải (load distribution), tăng tốc độ truy cập cho người dùng ở các khu vực khác nhau và đảm bảo Business Continuity tuyệt đối (Nếu DC Primary DC sập, DC Secondary DC phải gánh được).

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **What candidate already knows:** Trong AWS, bạn cấu hình Multi-AZ (cách nhau khoảng 10-100km, độ trễ < 1ms) hoặc Multi-Region (khác châu lục, độ trễ cao). Bạn dùng Route53 cho DNS Routing.
- **What interviewer will likely ask:** AWS xử lý cáp ngầm, độ trễ mạng giữa các Region. Khi tự làm Multi-DC ở on-premise, bạn phải làm gì? Cách replicate Database qua mạng WAN bị chậm?
- **Skill gap to address:** AWS Route53 tương đương với F5 GTM (Global Traffic Manager) on-prem. Bạn cần nắm khái niệm SD-WAN, Dark Fiber, Sync/Async Replication trong môi trường vật lý.

## 4. Prerequisites
- Hiểu HA (Chương 10) tại mức Single DC.
- Mạng cơ bản (BGP, DNS, VPN).

## 5. Core Concepts

### 5.1 The Network Foundation (WAN, MPLS, SD-WAN)
- Để kết nối nhiều Data Center, các doanh nghiệp thường thuê kênh truyền riêng (Leased Line), MPLS từ ISP (VNPT/Viettel) để có độ trễ (latency) ổn định và băng thông cam kết (SLA).
- **Dark Fiber:** Thuê cáp quang vật lý riêng, cho tốc độ cực cao, độ trễ cực thấp (phù hợp cho DC ở gần nhau).
- **SD-WAN (Software-Defined WAN):** Công nghệ hiện đại tự động chọn đường đi tối ưu giữa nhiều link (Internet/MPLS/4G) nối các DC lại với nhau.

### 5.2 Active-Active vs Active-Passive Multi-DC
- **Active-Active:** Cả 2 DC đều xử lý traffic của khách hàng. Yêu cầu kiến trúc ứng dụng phức tạp, database phải phân tán cực tốt, độ trễ giữa 2 DC phải rất nhỏ để không xảy ra xung đột dữ liệu.
- **Active-Passive (Disaster Recovery site):** Mọi traffic vào DC1 (Primary). Dữ liệu được đồng bộ sang DC2 (Standby). Khi DC1 chết, toàn bộ traffic chuyển sang DC2. Rẻ hơn, dễ cấu hình hơn, nhưng lãng phí tài nguyên ở DC2.

### 5.3 Global Server Load Balancing (GSLB)
Làm sao để biết người dùng ở Branch DC nên trỏ vào DC Branch DC, còn người dùng ở HCM trỏ vào DC Primary DC? GSLB (thường dùng qua DNS thông minh) sẽ giải bài toán này (tương tự AWS Route 53 Latency/Geolocation routing). Khi phân giải tên miền (VD: `tos.saigonnewport.com.vn`), GSLB sẽ trả về IP của DC gần người dùng nhất hoặc DC đang khỏe mạnh.

### 5.4 Sync vs Async Replication (Storage & Database)
Đồng bộ dữ liệu giữa 2 DC là bài toán khó nhất do **Network Latency (độ trễ mạng)** và định lý CAP.
- **Synchronous (Sync):** Ứng dụng ghi vào DB ở DC1, DB DC1 bắt buộc phải gửi dữ liệu sang DB DC2 thành công thì mới báo cho ứng dụng là "Ghi xong". 
  - **Ưu:** Dữ liệu an toàn tuyệt đối, RPO = 0.
  - **Nhược:** Quá chậm nếu DC cách xa nhau (Latency cao). Chỉ dùng khi khoảng cách 2 DC < 100km (giống Multi-AZ của AWS).
- **Asynchronous (Async):** Ứng dụng ghi vào DB ở DC1, DB báo "Ghi xong" ngay. Ở backend, DB tự đồng bộ ngầm sang DC2.
  - **Ưu:** Nhanh, không làm chậm ứng dụng. Phù hợp Multi-Region/khoảng cách xa.
  - **Nhược:** Nếu DC1 cháy bất ngờ trước khi kịp đồng bộ, sẽ mất lượng dữ liệu nhỏ (RPO > 0).

## 6. Architecture (Multi-DC Active-Passive)
```
          [ Users / Container Trucks ]
                   |
            [ DNS / GSLB ]  <-- Trả về IP của DC đang Active
                   |
     +-------------+-------------+
     |                           |
[ DC Primary DC (Active) ]     [ DC Secondary DC (Standby) ]
  [ Load Balancer ]           [ Load Balancer ]
          |                           |
     [ Web App ]                 [ Web App ]
          |                           |
    [ DB Master ] ===(Async)==> [ DB Replica ]
    [ SAN Storage ]             [ SAN Storage ]
```

## 7. Common Interview Questions

### Q1: Sự khác biệt giữa Multi-AZ trên AWS và Multi-DC on-premise?
**Model Answer:** 
Về mặt logic chúng giống nhau. Tuy nhiên ở AWS Multi-AZ, Amazon sở hữu đường mạng cáp quang siêu tốc giữa các AZ nên cấu hình Database thường là Synchronous replication (đảm bảo không mất data). Khi làm Multi-DC on-prem (Ví dụ từ SG ra Branch DC), mạng WAN có độ trễ lớn, bắt buộc phải thiết kế Database theo kiểu Asynchronous replication, chấp nhận rủi ro RPO (mất dữ liệu mili-giây cuối cùng) để không làm giảm trải nghiệm người dùng.

### Q2: Ứng dụng triển khai trên 2 DC theo mô hình Active-Active. Làm sao giải quyết bài toán Data Conflict (ghi cùng 1 dữ liệu ở 2 nơi)?
**Model Answer:** Thiết kế DB Active-Active cực kỳ khó.
1. Cách 1: Chia vùng dữ liệu (Data Sharding). Khách hàng miền Nam ghi vào DC miền Nam, khách miền Bắc ghi vào DC Bắc, không can thiệp nhau.
2. Cách 2: Sử dụng các DB phân tán sinh ra cho Multi-DC như Cassandra, CockroachDB hỗ trợ Conflict Resolution.
3. Cách 3: Ứng dụng Active-Active ở 2 DC, nhưng toàn bộ kết nối DB trỏ về 1 DC (1 DB Master duy nhất). DC còn lại chấp nhận độ trễ (latency penalty) khi ghi dữ liệu.

### Q3: (Thiết kế thực tế) Nếu Enterprise mở một cảng mới tại Secondary DC, làm sao để kết nối hệ thống hiện tại ở Primary DC sang?
**Model Answer:**
Về mạng: Thuê 2 đường truyền (1 chính từ VNPT MPLS, 1 phụ SD-WAN hoặc Internet VPN) nối 2 DC lại thành mạng nội bộ mở rộng (WAN). 
Về ứng dụng: Em sẽ đề xuất mô hình Active-Passive ban đầu để tiết kiệm chi phí. App ở Secondary DC sẽ chạy độc lập và dữ liệu sẽ được cấu hình PostgreSQL Streaming Replication (hoặc Storage Array Replication) theo định kỳ hoặc realtime Async về Primary DC để Backup/DR.

## 8. Key Takeaways
- Mạng liên kết: MPLS, Leased Line, SD-WAN.
- Traffic Routing: Dùng GSLB (DNS-based) để chia tải giữa các DC.
- Sync Replication: Chậm, RPO = 0, cần DC gần nhau (khoảng cách ngắn).
- Async Replication: Nhanh, RPO > 0, cho DC cách xa (khoảng cách dài).
- Định lý CAP: Không thể vừa có Consistency (nhất quán) và Availability (HA) nếu có chia cắt mạng (Partition Tolerance). Multi-DC phải thỏa hiệp (trade-off).
