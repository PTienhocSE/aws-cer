# 18. SolarWinds

## 1. Why This Matters
Doanh nghiệp Enterprise sở hữu một hệ thống hybrid khổng lồ với các thiết bị vật lý truyền thống (Server Dell, HPE, Switch Cisco, SAN Storage Hitachi) và các ứng dụng Enterprise cũ (Windows Server, IIS, Exchange, Active Directory). SolarWinds là giải pháp giám sát thương mại (Commercial) hàng đầu cho môi trường IT truyền thống này. Việc một System/DevOps Engineer thành thạo cả nền tảng Modern Cloud (Prometheus/Grafana) và Traditional (SolarWinds) sẽ chứng tỏ sự toàn diện, đáp ứng hoàn hảo yêu cầu JD kết nối cũ-mới (App Modernization).

## 2. Interview Priority
> 🟡 MEDIUM

## 3. CV Connection
- **Bạn đã biết (từ CV):** Mạnh về Prometheus/Grafana (Cloud-native).
- **Phỏng vấn có thể hỏi:** Nếu cty đang dùng SolarWinds cho Network/Storage vật lý, em làm quen và tích hợp thế nào? So sánh giám sát bằng SNMP (SolarWinds) và Pull Metrics (Prometheus).
- **Khoảng trống cần bù đắp:** Kiến thức về SolarWinds Orion Platform, các module chính và giao thức SNMP, WMI.

## 4. Prerequisites
- Kiến thức cơ bản về Networking (Switch, Router, SNMP).
- Quản trị Windows Server (WMI).

## 5. Core Concepts

### 5.1 SolarWinds Orion Platform

#### Definition
Nền tảng tập trung (Suite) bao gồm nhiều module khác nhau do SolarWinds cung cấp để giám sát toàn diện mạng, máy chủ, ảo hóa, lưu trữ và cơ sở dữ liệu.

#### Why It Exists
Cung cấp giải pháp All-in-One "out-of-the-box" cho doanh nghiệp, cài đặt là chạy, có sẵn hàng ngàn template chuẩn (không phải cấu hình yaml mệt mỏi như mã nguồn mở) cùng tính năng support enterprise (có người đền/hỗ trợ khi lỗi).

### 5.2 Key Modules

1. **NPM (Network Performance Monitor):**
   - Chuyên giám sát phần cứng mạng (Router, Switch, Firewall).
   - Sử dụng giao thức **SNMP** (Simple Network Management Protocol) và ICMP.
   - Tính năng nổi bật: NetPath (vẽ đường đi từ source đến destination qua từng hop), vẽ Topology map tự động.

2. **SAM (Server & Application Monitor):**
   - Giám sát trạng thái máy chủ vật lý và ứng dụng (IIS, Exchange, Active Directory, SQL Server).
   - Sử dụng **WMI** (Windows Management Instrumentation) cho Windows hoặc SNMP cho Linux.
   - Có AppInsight (bộ dashboard chi tiết sâu vào cấu trúc bên trong của AD hoặc SQL).

3. **VMAN (Virtualization Manager):**
   - Gắn vào vCenter (VMware) hoặc Hyper-V để theo dõi tình trạng ảo hóa (VM sprawl, CPU ready time, storage IOPS).

4. **SRM (Storage Resource Monitor):**
   - Cắm thẳng vào các bộ SAN Storage (Dell-EMC, Hitachi) qua API hoặc SMI-S để xem LUNs, phân bổ dung lượng RAID, IOPS vật lý.

### 5.3 Giám sát qua SNMP & WMI

- **SNMP:** Giao thức chuẩn mạng. Các thiết bị mạng đóng vai trò SNMP Agent, chứa dữ liệu dạng OID (Object Identifiers). SolarWinds đóng vai trò SNMP Manager để đi GET dữ liệu. Gồm 3 phiên bản: v1, v2c (cộng đồng/plain text) và v3 (Mã hóa, khuyên dùng).
- **WMI:** Giao thức độc quyền của Microsoft để lấy thông số (CPU, RAM, Event Logs, Services) trực tiếp từ hệ điều hành Windows mà không cần cài thêm Agent.

## 6. Architecture so với Prometheus

| Đặc điểm | SolarWinds | Prometheus |
|---|---|---|
| **Đích nhắm** | Traditional IT, Hardware, Windows, Network | Cloud-native, K8s, Microservices, Linux |
| **Giao thức thu thập**| SNMP, WMI, ICMP (Ping), API, RPC | HTTP (Pull method), /metrics endpoint |
| **Cấu hình** | UI-driven, Next->Next->Finish, Templates | Code-driven (YAML, PromQL) |
| **Chi phí** | Commercial, License tính theo Node/Interface | Open-source (Miễn phí) |
| **Time-to-value**| Nhanh (Cài vào là có sẵn Dashboard đẹp) | Chậm hơn (Phải build dashboard, set rules) |

## 7. Common Interview Questions

### Q1: SolarWinds lấy dữ liệu từ một con Switch Cisco bằng cách nào?
**Model Answer:**
SolarWinds NPM sử dụng giao thức SNMP để poll thông tin định kỳ. Em cần cấu hình SNMP Community String (đối với v2c) hoặc Username/Password/Mã hóa (với v3) trên Switch Cisco. Sau đó trên SolarWinds Add Node bằng IP của switch và cung cấp thông tin xác thực SNMP. Nó sẽ tự lấy được CPU, RAM, băng thông các port (Interfaces) và trạng thái up/down.

### Q2: Để giám sát Domain Controller (Active Directory) toàn diện, em dùng công cụ gì của SolarWinds?
**Model Answer:**
Em dùng module SAM (Server & Application Monitor) tích hợp tính năng AppInsight for Active Directory. Nó dùng giao thức WMI để kết nối vào Windows Server và trích xuất chuyên sâu về: Trạng thái đồng bộ hóa (Replication status) giữa các DC, lỗi xác thực, kích thước database NTDS.dit, và trạng thái dịch vụ DNS, thay vì chỉ giám sát CPU/RAM đơn thuần.

### Q3: Ưu nhược điểm giữa việc dùng SolarWinds và Prometheus/Grafana?
**Model Answer:**
- **SolarWinds:** Ưu điểm là giám sát phần cứng, mạng thiết bị vật lý cực tốt, tích hợp sẵn, phù hợp quản lý hạ tầng kế thừa (Legacy). Nhược điểm là License đắt, kiến trúc nguyên khối nặng nề, không linh hoạt trong môi trường CI/CD và K8s.
- **Prometheus:** Ưu điểm là nhẹ, scale mạnh cho Microservices, miễn phí, hỗ trợ tốt GitOps. Nhược điểm là khó dùng để giám sát chuyên sâu Switch, SAN Storage cũ vì cấu hình MIBs/SNMP exporter khá phức tạp.
=> Ở Enterprise, em đề xuất dùng kết hợp: SolarWinds cho Infrastructure tầng dưới, Prometheus cho Platform/App layer ở trên.

### Q4: Môi trường Hybrid cần gom chung cảnh báo từ SolarWinds và Prometheus, em làm thế nào?
**Model Answer:**
Em có thể setup Webhook. SolarWinds có thể gửi Alert ra ngoài qua HTTP API, còn Prometheus Alertmanager cũng nhận và đẩy đi được. Hoặc tốt nhất là dùng công cụ gom nhóm Alert thứ 3 (như PagerDuty, Opsgenie, hoặc đẩy vào kênh Microsoft Teams/Slack chung) để nhóm vận hành có một kênh duy nhất theo dõi tình trạng sự cố (Single Pane of Glass).

## 8. Scenario-Based Questions

### Scenario 1: Troubleshooting Ứng dụng IIS trên Windows
**Situation:** Website chạy trên IIS Server Windows bị chậm.
**How to approach:** Dùng SolarWinds SAM.
**Model Answer:**
Em sẽ kiểm tra SolarWinds SAM để xem các chỉ số WMI của server đó. Cụ thể kiểm tra "AppInsight for IIS" để xem các Application Pool nào đang ăn CPU cao, số lượng connection bị rớt, và bộ nhớ được cấp phát. Nếu hạ tầng ảo hóa bên dưới chậm, em sẽ mở VMAN xem CPU Ready time của máy ảo đó trên VMware.

## 9. Key Takeaways
- SolarWinds là "vua" trong mảng giám sát thiết bị vật lý và Windows truyền thống.
- Sử dụng SNMP (Mạng/Linux) và WMI (Windows).
- Cần biết cách đối chiếu và phối hợp giữa SolarWinds (hạ tầng cũ) và Prometheus (hạ tầng K8s mới) cho các bài toán App Modernization.

## 10. Quick Reference
| Thuật ngữ | Ý nghĩa |
|---|---|
| NPM | Mạng (Router/Switch/Băng thông) |
| SAM | Ứng dụng & Server (OS, IIS, SQL) |
| VMAN | Ảo hóa (VMware/Hyper-V) |
| SNMP | Giao thức giám sát mạng chuẩn |
| WMI | Giao thức quản lý của Windows |
