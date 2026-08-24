# 13. Disaster Recovery (DR)

## 1. Why This Matters
Tại các doanh nghiệp hạ tầng lõi quốc gia như Enterprise, DR (Phục hồi sau thảm họa) không chỉ là kĩ thuật, nó là quy định tuân thủ (Compliance). Điều gì xảy ra khi hỏa hoạn, động đất, hoặc bão lụt phá hủy toàn bộ Data Center chính? Disaster Recovery là kế hoạch kinh doanh và kĩ thuật để đưa toàn bộ hoạt động của công ty lên chạy tạm ở một Data Center dự phòng (DR Site).

## 2. Interview Priority
> 🔴 MUST KNOW

## 3. CV Connection
- **What candidate already knows:** Trong CV bạn dùng AWS. AWS vốn là một môi trường tuyệt vời làm DR Site cho hệ thống On-premise (Cloud DR).
- **What interviewer will likely ask:** Kế hoạch DR gồm những bước nào? Làm sao biết khi nào thì nên kích hoạt DR? (Failover button). Phân biệt DR và HA.
- **Skill gap to address:** Ở góc độ System Engineer, bạn cần nắm DR Framework, BIA (Business Impact Analysis), Runbook, và các mô hình DR vật lý (Pilot Light, Warm Standby) bên cạnh chỉ kĩ thuật thuần túy.

## 4. Prerequisites
- Chương 10 (HA), 11 (Multi-DC), 12 (Backup). DR là tập hợp của 3 chương này.

## 5. Core Concepts

### 5.1 HA vs Backup vs DR
- **HA:** Chịu lỗi các thành phần nhỏ (chết 1 server, đứt 1 cáp mạng). Xử lý tức thì tự động (tính bằng giây).
- **Backup:** Lấy lại dữ liệu bị mất hoặc xóa nhầm. (Tính bằng giờ).
- **DR:** Phục hồi toàn bộ hệ thống khi môi trường chính (Primary DC) không còn tồn tại hoặc tê liệt hoàn toàn. Là sự kết hợp của kiến trúc dự phòng và quy trình con người (tính bằng giờ/ngày). Không kích hoạt tự động (phải do GĐ CNTT hoặc Ban Giám Đốc bấm nút).

### 5.2 DR Strategies
Tùy thuộc vào RTO (Recovery Time) và Ngân sách, có 4 mô hình:
1. **Backup and Restore:** Rẻ nhất, chậm nhất. Chép file backup ra băng từ, thuê một DC mới, mua máy chủ, ráp vào cài lại từ đầu. RTO = Vài ngày.
2. **Pilot Light (Đốm lửa nhỏ):** Môi trường DR luôn bật sẵn các cấu phần cốt lõi (Network, DB Replicate ngầm), nhưng tắt các Web Servers/App Servers. Khi có biến, mới khởi động các VM này lên và chạy. (Giống bếp gas mồi sẵn). RTO = Vài giờ.
3. **Warm Standby:** Chạy một phiên bản thu nhỏ (Scale-down) của hệ thống chính. Nó luôn bật và nhận lượng traffic nhỏ. Khi biến cố xảy ra, ta "Scale out" hệ thống này to lên để gánh tải. RTO = Vài chục phút.
4. **Hot Site (Multi-Site Active-Active):** 2 Data Center cùng to bằng nhau, cùng gánh tải. Mất 1 cái không sao. Đắt đỏ nhất. RTO = Vài giây.

### 5.3 Failover & Failback
- **Failover:** Quá trình chuyển hướng toàn bộ traffic và hệ thống sang DR Site khi DC chính sập.
- **Failback:** Khó khăn hơn nhiều. Khi DC chính sửa xong (sau hỏa hoạn), phải đồng bộ ngược dữ liệu mới sinh ra ở DC DR về lại DC chính, sau đó cắt traffic trả về DC chính.

### 5.4 DR Testing
Một kế hoạch DR chưa được test thì coi như vô giá trị.
- **Tabletop Exercise:** Ngồi bàn tròn thảo luận lý thuyết. (Ai gọi điện cho ai, ai bấm nút gì).
- **Simulation:** Bật DR lên chạy thử song song, nhưng không can thiệp production.
- **Full Interruption Test:** (Có tính phá hoại). Chủ động ngắt mạng Data Center chính vào sáng Chủ Nhật để xem hệ thống DR có tự gánh được không.

## 6. Architecture (Cloud DR cho On-premise)
Dùng AWS làm DR Site cho Data Center Enterprise (Hybrid Cloud).
```
[ Enterprise Primary DC (On-premise) ] =========(VPN / Direct Connect)==========> [ AWS Region (DR Site) ]
                                            Replication Traffic
- Web Servers (VMware) -----------------(AWS Application Migration Service)-->  Tắt (Sẵn sàng boot thành EC2)
- PostgreSQL Database  -----------------(Asynchronous Streaming Replication)->  Bật (RDS/EC2 size nhỏ)
- File Storage (NAS)   -----------------(AWS DataSync)----------------------->  S3 / EFS
```

## 7. Common Interview Questions

### Q1: Trình bày sự khác biệt giữa HA và DR?
**Model Answer:** HA nhắm đến việc duy trì uptime khi có sự cố đơn lẻ (SPOF) như một server hoặc một switch bị cháy; nó diễn ra tự động và người dùng không nhận ra. DR xử lý thảm họa diện rộng (ví dụ DC mất điện toàn bộ do bão); nó liên quan đến việc chuyển dịch hoạt động sang một Data Center khác. DR thường phải làm thủ công có chỉ đạo vì quá trình "Failback" (trở về) rất tốn kém và nguy hiểm.

### Q2: BIA (Business Impact Analysis) là gì trong lập kế hoạch DR?
**Model Answer:** Kĩ sư IT không tự quyết định DR. BIA là làm việc với các phòng ban kinh doanh (Biz) để phân loại hệ thống. Ví dụ: Phần mềm vận hành cẩu container tại Primary DC là Tier 1 (Cần Hot Site, RPO/RTO = 0). Phần mềm tính lương nội bộ HR là Tier 3 (Chỉ cần Backup & Restore, RTO = 3 ngày). Dựa vào BIA, IT mới thiết kế kiến trúc và phân bổ ngân sách phù hợp, tránh lãng phí.

### Q3: Nếu bạn là kỹ sư phụ trách, quy trình DR Failover của bạn gồm những bước nào?
**Model Answer:** (Có thể dùng tư duy Runbook)
1. **Declare Disaster:** Ban GĐ chính thức xác nhận đây là thảm họa (DC sập và không lên lại được trong 4 tiếng).
2. **DNS Switch:** Cập nhật DNS Global (GSLB hoặc Route53) trỏ Domain về DR Site IP.
3. **DB Promotion:** Dừng mọi tác vụ Write ảo tưởng (chống split-brain), Promote Standby Database ở DR site lên làm Master.
4. **Boot App:** Khởi động các VM/Pods (Web, App) ở DR Site, cho kết nối vào DB Master mới.
5. **Verify:** Chạy scripts tự động health-check kiểm tra các luồng nghiệp vụ chính.
6. **Communicate:** Gửi email/thông báo cho khách hàng hệ thống đã hoạt động ở chế độ DR.

## 8. Scenario-Based Questions

### Scenario 1: Hệ thống DR bị sai dữ liệu (Data Corruption)
**Situation:** Một Admin lỡ tay chạy lệnh DROP DATABASE. Hệ thống Sync Replication ngay lập tức đồng bộ lệnh DROP này sang DR Site. Toàn bộ 2 Data Center đều mất dữ liệu. DR không cứu được bạn.
**Model Answer:** Tình huống này chứng minh "Replication/DR không thay thế được Backup". DR chỉ bảo vệ hạ tầng vật lý, không chống được lỗi con người (Logical Error). Để cứu hệ thống, em buộc phải sử dụng Point-in-Time Recovery (PITR) từ hệ thống Backup độc lập ở Chương 12 (ví dụ: dùng bản Backup 1 giờ trước + Replay WAL logs) để khôi phục lại DB, sau đó đồng bộ ngược DB đã cứu sang cả DC chính và DR.

## 9. Key Takeaways
- DR là quy trình kinh doanh, không chỉ kĩ thuật (BIA, RTO, RPO).
- Không tự động Failover sang DR trừ khi đã cân nhắc cực kĩ (Split-brain nguy hiểm).
- Các mức DR: Backup/Restore -> Pilot Light -> Warm Standby -> Multi-Site Active/Active.
- Failback thường khó gấp 10 lần Failover.
- Hệ thống DR trên Cloud (AWS) đang là xu hướng vì tiết kiệm chi phí phần cứng nhàn rỗi.
