# TEMPLATE CHUẨN — SYSTEM & DEVOPS INTERVIEW

> Dùng template này cho từng topic. Nội dung phải được viết để học trước, sau đó mới kiểm tra bằng câu hỏi phỏng vấn.

## Quy tắc sử dụng

- Viết phần giải thích chính bằng tiếng Việt; giữ nguyên technical terms bằng English khi cần.
- Không chỉ liệt kê câu hỏi, command hoặc component. Mỗi mục phải nêu mục đích, cách hoạt động, output/log/metric cần đọc và failure mode.
- Với topic không có một mục phù hợp, ghi `Không áp dụng` và giải thích ngắn; không tự ý xóa mục.
- Production incident phải trình bày theo chuỗi: xác nhận → khoanh vùng → thu thập evidence → mitigation → recovery → RCA → prevention.
- Không suy diễn kinh nghiệm từ CV. Phân biệt rõ `CV Evidence`, `Kiến thức cần bổ sung` và `Có thể bị hỏi ở mức lý thuyết`.
- Chỉ tạo interview questions sau khi phần kiến thức, troubleshooting và production scenario đã hoàn thành.

## Metadata đầu file

```markdown
# [NN] TOPIC TITLE

> **Phase:** N — Tên phase
> **Priority:** 🔴 MUST KNOW / 🟠 HIGH / 🟡 MEDIUM
> **JD Weight:** System Engineer — 60% / DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High / 🟠 High / 🟡 Medium
> **Prerequisite:** ...
```

## Cấu trúc bắt buộc

```markdown
# 1. 🎯 MỤC TIÊU HỌC
# 2. 🧠 KIẾN THỨC NỀN
# 3. 📚 TỔNG QUAN
# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG
# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG
# 6. 📖 CÁC CONCEPT QUAN TRỌNG
## 6.1. Cơ bản
## 6.2. Trung cấp
## 6.3. Nâng cao
# 7. 🌍 VÍ DỤ THỰC TẾ
# 8. 🛠️ COMMAND / TOOL CẦN BIẾT
# 9. 📝 LOG
# 10. 📊 METRIC
# 11. ⚙️ CONFIGURATION
# 12. 🔧 TROUBLESHOOTING
# 13. 🚨 PRODUCTION INCIDENT
# 14. ⚖️ SO SÁNH & TRADE-OFF
# 15. ❌ COMMON MISTAKES
# 16. ✅ INTERVIEW KNOWLEDGE CHECK
# 17. 🎤 CÂU HỎI PHỎNG VẤN
## 17.1. Cơ bản — 10 câu
## 17.2. Trung cấp — 15 câu
## 17.3. Nâng cao — 15 câu
## 17.4. Production — 15 câu
## 17.5. Troubleshooting — 15 câu
## 17.6. Architecture — 10 câu
# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN
# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER
# 20. 🌳 FOLLOW-UP QUESTION TREE
# 21. 📋 CHECKLIST SAU KHI HỌC
# 22. 🃏 FLASHCARDS
# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”
# 24. 🎯 LIÊN HỆ VỚI JD
# 25. 📌 LIÊN HỆ VỚI CV
# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO
# 27. 🧪 HANDS-ON LAB
# 28. 🔍 TROUBLESHOOTING DECISION TREE
# 29. 🧾 PRODUCTION READINESS REVIEW
# 30. 🧭 FINAL SELF-ASSESSMENT
# 31. 🔥 INTERVIEW PRIORITY
# 32. 📋 FINAL CHECKLIST
```

## Nội dung tối thiểu của các mục quan trọng

### Command / Tool

Mỗi command cần có: mục đích, khi nào dùng, output cần chú ý, ví dụ thực tế và câu hỏi follow-up có thể gặp.

### Log và Metric

Phải chỉ ra nơi tìm dữ liệu, timestamp, severity, PID/request ID/correlation ID, metric liên quan, hướng tăng/giảm có ý nghĩa gì và ngưỡng cần điều tra.

### Production Incident

Mỗi topic có tối thiểu 5 incident. Mỗi incident gồm: tình huống, triệu chứng, impact, evidence nhìn thấy, bước kiểm tra đầu tiên và lý do, command/tool, các nhánh kết quả A/B, root cause có thể có, mitigation, fix, verification, RCA và prevention.

### Interview Answer

Với câu hỏi trọng tâm, ghi rõ: mục tiêu interviewer, câu trả lời 20–30 giây, câu trả lời 1–2 phút, follow-up, điểm dễ trả lời sai và trade-off.

## Thứ tự học

```text
Kiến thức nền → Giải thích → Ví dụ → Command/Tool → Log/Metric
→ Troubleshooting → Production Incident → Knowledge Check
→ Interview Questions → Model Answers → Follow-up → Checklist
```

Không đảo thành `Question → Answer → vài dòng lý thuyết`.
