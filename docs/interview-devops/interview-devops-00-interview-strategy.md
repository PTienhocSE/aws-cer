# [00] INTERVIEW STRATEGY

> **Phase:** 1 — System Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** System & DevOps Engineer — 100%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Đọc kỹ CV cá nhân, đọc hiểu JD tuyển dụng

---
# 1. 🎯 MỤC TIÊU HỌC

Sau khi hoàn thành file này, tôi phải có khả năng:

- [ ] Định vị chính xác bản thân trong bài toán 60% System Engineer + 40% DevOps Engineer của doanh nghiệp Enterprise lớn.
- [ ] Xây dựng chiến lược "Mapping" biến kinh nghiệm Cloud/DevOps (AWS, EKS, Terraform, ArgoCD) thành lợi thế khi vận hành hạ tầng On-premise.
- [ ] Xử lý chuyên nghiệp các câu hỏi xoáy vào Skill Gap (Windows Server, Active Directory, VMware, Storage vật lý).
- [ ] Áp dụng mô hình STAR (Situation, Task, Action, Result) để trả lời thuyết phục các câu hỏi phỏng vấn tình huống.
- [ ] Làm chủ kỹ thuật đàm phán mức lương kỳ vọng trong khoảng 15M - 35M VNĐ dựa trên giá trị mang lại.

### Tôi phải trả lời được

> "Nếu hội đồng phỏng vấn hỏi: 'Em chuyên làm Cloud & Kubernetes trên AWS, tại sao lại ứng tuyển vị trí đòi hỏi 60% vận hành hạ tầng On-premise truyền thống?', em sẽ trả lời thế nào để thuyết phục hoàn toàn?"

---
# 2. 🧠 KIẾN THỨC NỀN

## 2.1. Kiến thức cần biết trước

### Enterprise IT vs Cloud Native Mindset
**Định nghĩa:** Doanh nghiệp Enterprise truyền thống ưu tiên Uptime 99.99%, tính ổn định và bảo mật chặt chẽ trên hạ tầng On-premise Multi-DC. Trong khi Cloud Native ưu tiên khả năng mở rộng linh hoạt (Elasticity) và tự động hóa (Automation).
**Tại sao cần biết?** Người phỏng vấn doanh nghiệp lớn sợ nhất ứng viên Cloud mang tư duy "đập đi xây lại" làm ảnh hưởng đến hệ thống Core đang chạy ổn định.
**Ví dụ:** Thay vì đề xuất chuyển toàn bộ Database Oracle sang Cloud, kỹ sư Senior sẽ đề xuất giữ DB ở On-premise để đảm bảo độ trễ thấp và xây dựng cụm Kubernetes cho tầng Web/API ở trên.

---
# 3. 📚 TỔNG QUAN

## 3.1. Phân tích JD & Định vị bản thân
- **Tỷ lệ công việc:** 60% System Engineer (Vận hành Linux, Windows, VMware, Storage, Multi-DC) + 40% DevOps Engineer (Kubernetes, CI/CD, GitOps, IaC).
- **Vấn đề của Doanh nghiệp:** Hệ thống cũ cần người vận hành bền bỉ, nhưng đồng thời rất khát nhân sự có tư duy DevOps để hiện đại hóa hạ tầng (App Modernization).

## 3.2. Phương pháp "Cloud-to-OnPrem Mapping"
Tất cả các khái niệm Cloud trên CV của bạn đều có khái niệm tương đương ở dưới On-premise:

| Khái niệm trên AWS (CV của bạn) | Khái niệm On-premise (Doanh nghiệp) | Cách "bán" năng lực |
|---|---|---|
| AWS EC2 / Auto Scaling | VMware ESXi / vCenter DRS | Tư duy quản lý vCPU/vRAM, sizing tài nguyên ảo hóa |
| AWS VPC / Subnets / Security Group | VLAN 802.1Q / Router / Firewall | Hiểu bản chất L2/L3 Routing, Port Filtering |
| AWS EBS / EFS / S3 | SAN Storage (FC/iSCSI) / NAS / MinIO | Hiểu block storage, nfs mount và backup redundancy |
| AWS IAM / KMS | Active Directory / LDAP / Vault | Quản lý định danh RBAC, mã hóa dữ liệu |
| AWS ALB / NLB | Nginx / HAProxy / F5 BIG-IP | Layer 4 & Layer 7 Load Balancing, SSL Offloading |

---
# 4. 🏗️ CHIẾN LƯỢC TRẢ LỜI STAR METHOD

```text
[S] SITUATION   ──> Mô tả ngắn gọn bối cảnh dự án / sự cố thực tế (15 giây)
       │
       v
[T] TASK        ──> Thách thức hoặc mục tiêu cụ thể bạn phải giải quyết (15 giây)
       │
       v
[A] ACTION      ──> Các bước kỹ thuật CỤ THỂ BẠN ĐÃ LÀM (60 giây - Trọng tâm)
       │
       v
[R] RESULT      ──> Kết quả đo lường được bằng số liệu cụ thể (30 giây)
```

---
# 5. 📂 XỬ LÝ SKILL GAPS (KHOẢNG TRỐNG KINH NGHIỆM)

Khi bị hỏi về công nghệ bạn chưa làm thực tế trên Production (ví dụ: VMware vSphere, Active Directory, Storage SAN):

### Công thức 4 bước trả lời chuyên nghiệp:
1. **Thừa nhận trung thực:** "Thực tế em chưa trực tiếp vận hành sản phẩm X ở môi trường Production lớn."
2. **Nêu nguyên lý tương đương:** "Tuy nhiên em nắm rất vững nguyên lý cốt lõi của X, tương tự như công nghệ Y mà em đã làm master trên AWS/Cloud."
3. **Dẫn chứng khả năng tự học:** "Trong dự án trước, em từng tự nghiên cứu và triển khai Kafka/MSK từ con số 0 trong vòng 1 tuần."
4. **Cam kết Fast Onboarding:** "Em tự tin sẽ làm chủ quy trình vận hành X của công ty trong 2-4 tuần đầu tiên."

---
# 6. 🚨 CÁC KỊCH BẢN PHỎNG VẤN THỰC CHẾN (SCENARIOS)

### INCIDENT 01 — Xử lý khi bị hỏi ép về kinh nghiệm Windows Server / Active Directory
- **Hỏi:** "CV của em toàn làm Linux và AWS EKS, bên anh dùng 50% Windows Server và Active Directory, em làm được không?"
- **Trả lời:** "Dạ hoàn toàn làm được ạ. Em có nền tảng lập trình .NET và hiểu rõ cơ chế hoạt động của IIS Web Server, Windows Services và Event Viewer. Đối với Active Directory, em nắm vững nguyên lý Kerberos/LDAP authentication và Group Policy. Thay vì quản trị thủ công qua giao diện RDP, em sẽ ứng dụng PowerShell scripting và Ansible WinRM để tự động hóa công tác quản trị, giúp giảm thiểu lỗi con người."

---
# 7. ⚖️ ĐÀM PHÁN LƯƠNG (SALARY NEGOTIATION)

- **Mức lương thị trường:** 15.000.000 VNĐ — 35.000.000 VNĐ tùy theo năng lực thực tế.
- **Nguyên tắc đàm phán:** Khẳng định giá trị giải quyết bài toán của doanh nghiệp (Uptime hệ thống, giảm sự cố, chuyển đổi số) trước khi đưa ra con số kỳ vọng.

---
# 8. 🧠 MUST REMEMBER

🔴 **PHẢI HIỂU:** Tỷ lệ 60/40 JD, Kỹ thuật Cloud-to-Onprem Mapping, Mô hình STAR.
🟠 **PHẢI NẮM:** 4 bước trả lời xử lý Skill Gaps, kỹ thuật đàm phán lương dựa trên giá trị.
🟡 **NÊN BIẾT:** Tìm hiểu kỹ văn hóa và bài toán kinh doanh của doanh nghiệp trước khi phỏng vấn.

---
# 9. ✅ KNOWLEDGE CHECK

1. Q: Sự khác biệt lớn nhất giữa tư duy vận hành On-premise Enterprise và Cloud-Native là gì?
2. Q: Mô hình STAR gồm 4 yếu tố nào?

---
# 10. 🎤 INTERVIEW QUESTIONS & MODEL ANSWERS

**Q1: Hãy giới thiệu bản thân trong 2 phút làm nổi bật sự phù hợp với vị trí này?**
- **Model Answer:** "Chào anh/chị, em là một kỹ sư hạ tầng có kinh nghiệm chuyên sâu về Linux, Kubernetes, CI/CD và AWS. Điểm mạnh của em là kết hợp tư duy tự động hóa hiện đại của DevOps với sự cẩn trọng bền bỉ của System Operations. Em thấy vị trí này yêu cầu 60% vận hành hệ thống Enterprise và 40% chuẩn hóa DevOps — đây chính là thế mạnh của em. Em có thể bảo đảm tính ổn định 24/7 cho hạ tầng hiện tại, đồng thời hỗ trợ nhóm hiện đại hóa ứng dụng qua Kubernetes và GitOps."

---
# 11. 📋 FINAL CHECKLIST

- [ ] Tôi biết cách định vị bản thân theo tỷ lệ 60% System + 40% DevOps.
- [ ] Tôi thành thạo bảng quy đổi Cloud-to-Onprem Mapping.
- [ ] Tôi tự tin ứng biến với các câu hỏi về Skill Gaps.
- [ ] Tôi sẵn sàng trả lời phỏng vấn theo mô hình STAR.

---
# 12. 🔧 TROUBLESHOOTING

Flow chuẩn: xác nhận triệu chứng và impact → khoanh vùng → kiểm tra alert/metric → đọc log → kiểm tra network/dependency → xem recent change → mitigation an toàn → verify → RCA/prevention.
# 13. 🚨 PRODUCTION INCIDENT

Các scenario bắt buộc: service unavailable, latency/error tăng, dependency timeout, resource/capacity cạn và recent change gây regression. Mỗi case phải ghi evidence đầu tiên, nhánh điều tra, mitigation, verification và prevention.
# 14. ⚖️ SO SÁNH & TRADE-OFF

So sánh theo: mục đích, operational complexity, failure mode, consistency/availability, chi phí, khả năng rollback và mức phù hợp với Production; không chọn công nghệ chỉ vì phổ biến.
# 15. ❌ COMMON MISTAKES

Sai lầm thường gặp: restart trước khi thu evidence; chỉ nhìn CPU mà bỏ qua I/O/dependency; sửa trực tiếp không có rollback; coi replication là backup; và nói “HA” nhưng không nêu failure domain.
# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Component nào sở hữu state?
2. Metric nào xác nhận symptom?
3. Log nào cần đọc trước?
4. Recent change nào cần kiểm tra?
5. Mitigation nào ít rủi ro nhất?
6. Verify recovery bằng gì?
# 17. 🎤 CÂU HỎI PHỎNG VẤN

Câu hỏi nên đi từ concept → architecture → command/metric → production failure → trade-off. Ví dụ: “INTERVIEW STRATEGY hoạt động thế nào?”, “Nếu latency tăng em kiểm tra gì trước?”, “Khi nào chọn phương án A thay vì B?”.
# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Trả lời theo cấu trúc: kết luận ngắn → cơ chế → evidence/tool → mitigation → trade-off → prevention. Nếu chưa có kinh nghiệm trực tiếp, phải nói rõ đó là kiến thức/lab hoặc lý thuyết.
# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nói như Engineer: nêu impact và giả thuyết, kiểm tra bằng evidence, thay đổi nhỏ có rollback, xác nhận bằng metric/log, rồi ghi RCA và action item phòng tái diễn.
# 20. 🌳 FOLLOW-UP QUESTION TREE

Interviewer thường đào sâu theo nhánh: component → dependency → metric → log → failure mode → mitigation → recovery → prevention. Hãy luyện trả lời từng nhánh bằng một ví dụ cụ thể.
# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Hiểu concept và architecture
- [ ] Biết component/dependency
- [ ] Biết command, log, metric
- [ ] Xử lý được production incident
- [ ] Nêu được trade-off, security, rollback và prevention
# 22. 🃏 FLASHCARDS

- **Q:** Làm sao xác nhận INTERVIEW STRATEGY đang khỏe? **A:** Dùng health signal, metric và log; không chỉ dựa vào process đang chạy.
- **Q:** Bước đầu khi có incident? **A:** Xác định impact, giữ evidence và kiểm tra recent change trước mitigation.
# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 **Phải hiểu:** bản chất, dependency và failure mode của INTERVIEW STRATEGY.

🟠 **Phải nắm:** workflow vận hành, command/tool và cách đọc evidence.

🟡 **Nên biết:** trade-off, capacity và security.

🟢 **Đọc thêm:** tài liệu chính thức của sản phẩm và runbook nội bộ.
# 24. 🎯 LIÊN HỆ VỚI JD

**JD mapping:** Topic này liên quan đến các trách nhiệm vận hành, monitoring, troubleshooting, change management và incident response. Khi trả lời, cần nối concept với một tác vụ cụ thể: phát hiện vấn đề, thu thập evidence, giảm impact và ngăn tái diễn.
# 25. 📌 LIÊN HỆ VỚI CV

**CV Evidence:** Chỉ sử dụng công nghệ/dự án được CV chứng minh.

**Kiến thức cần bổ sung:** ghi riêng các phần chưa có evidence Production.

**Cách trả lời:** nói rõ “em đã làm”, “em đã học/lab” hoặc “em hiểu ở mức lý thuyết”, không trộn ba mức này.
# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Một mô hình Enterprise cho **INTERVIEW STRATEGY** cần xác định rõ traffic/data flow, failure domain, HA, backup/restore, monitoring, access control và ownership. Với mỗi failure, cần biết hệ thống degrade hay outage, RTO/RPO/SLO nào bị ảnh hưởng và runbook nào được gọi.
# 27. 🧪 HANDS-ON LAB

### LAB 01 — Baseline và kiểm tra trạng thái

- **Objective:** dựng môi trường nhỏ cho INTERVIEW STRATEGY và ghi baseline.
- **Task:** tạo một lỗi có kiểm soát, thu thập metric/log, khôi phục và ghi lại RCA.
- **Expected result:** xác định được symptom, root cause và verification.

<details><summary>Solution</summary>

Lặp lại theo runbook của topic; không sửa trực tiếp Production khi chưa có evidence và rollback plan.
</details>
# 28. 🔍 TROUBLESHOOTING DECISION TREE

```text
Symptom / Alert
    |
    +--> Scope rộng hay hẹp?
    |       +--> Rộng: kiểm tra dependency, network, capacity và recent change
    |       +--> Hẹp: kiểm tra instance/component, process, config và log
    |
    +--> Có mitigation an toàn không?
            +--> Có: giảm impact, ghi thời điểm, rồi điều tra tiếp
            +--> Không: escalate theo ownership và bảo toàn evidence
```
# 29. 🧾 PRODUCTION READINESS REVIEW

Trước Production cần kiểm tra: health check và alert; capacity/baseline; log và correlation ID; quyền truy cập tối thiểu; backup/restore hoặc rollback; HA/failure domain; runbook/on-call; canary/change window; và cách verify sau khi thay đổi.
# 30. 🧭 FINAL SELF-ASSESSMENT

| Năng lực | Beginner | Intermediate | Advanced |
|---|---|---|---|
| Concept | ☐ | ☐ | ☐ |
| Command/Tool | ☐ | ☐ | ☐ |
| Troubleshooting | ☐ | ☐ | ☐ |
| Production | ☐ | ☐ | ☐ |
| Interview | ☐ | ☐ | ☐ |
# 31. 🔥 INTERVIEW PRIORITY

🔥 **Top 10 cần ưu tiên:** concept cốt lõi, architecture, component, command, log, metric, failure mode, mitigation, RCA và prevention của INTERVIEW STRATEGY.

🚨 **Top scenario:** service down, latency tăng, dependency lỗi, capacity cạn và recent change gây regression.
# 32. 📋 FINAL CHECKLIST

- [ ] Tôi giải thích được concept và architecture của INTERVIEW STRATEGY.
- [ ] Tôi biết component, dependency, command/tool, log và metric quan trọng.
- [ ] Tôi xử lý được ít nhất 5 production scenario theo evidence.
- [ ] Tôi phân biệt được mitigation, fix, recovery, RCA và prevention.
- [ ] Tôi trả lời được câu hỏi 30 giây, 2 phút và follow-up mà không phóng đại kinh nghiệm.

---
END OF FILE
