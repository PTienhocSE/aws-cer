# CV-based Interview — Cẩm nang phỏng vấn

# 1. Mục tiêu học
Tập trung vào biến từng bullet CV thành evidence, scope, metric, trade-off và bài học; trả lời được bằng cơ chế, evidence và trade-off thay vì khẩu hiệu.

# 2. Kiến thức nền cần có
Linux, network, HTTP/TLS, storage, observability, cloud, security và giao tiếp incident.

# 3. Tổng quan kiến trúc
Luôn mô tả actor, request/data flow, stateful components, dependency, failure domain, SLO và ownership.

# 4. Cách hoạt động
Bắt đầu từ trigger, đi qua control/data plane, queue hoặc persistence, rồi kết thúc bằng response, metric và audit trail.

# 5. Thành phần và failure mode
Client, service, state store, network, identity và deployment đều có thể là điểm lỗi; phân tích timeout, overload, stale data, corruption và dependency failure.

# 6. Concepts quan trọng
Scope, blast radius, hypothesis, mitigation, rollback, recovery, prevention, idempotency, backpressure, capacity và error budget.

# 7. Ví dụ thực tế
Dùng change timeline, correlation ID, dashboard và runbook để xử lý production; bảo vệ dữ liệu nhạy cảm và ghi lại quyết định.

# 8. Command / Tool cần biết
CV STAR matrix, architecture sketch, incident timeline

# 9. Log và cách đọc
Correlate timestamp, request ID, host/pod, version và principal. Không restart trước khi thu evidence đủ để so sánh trước/sau.

# 10. Metrics
Request rate, p95/p99 latency, error rate, saturation, queue/lag, availability, resource pressure và SLO burn rate.

# 11. Configuration mẫu
Mọi config phải review, version-control, có default an toàn, timeout/limit rõ ràng, secret ngoài source và rollback path.

# 12. Troubleshooting methodology
Xác nhận symptom và scope; tìm first bad timestamp; lập hypothesis; thu logs/metrics/traces; chọn mitigation reversible; verify; RCA và prevention.

# 13. Năm production scenarios
1. Error rate tăng sau deploy: canary/rollback và so sánh version.
2. Latency tăng: xác định saturation hay dependency.
3. Capacity cạn: giảm load, scale, bảo vệ critical path.
4. Data inconsistency: dừng ghi nguy hiểm, kiểm tra replication và recovery.
5. Alert storm: nhóm theo incident, sửa noise sau khi ổn định.

# 14. So sánh
Mitigation giảm impact nhưng chưa sửa root cause; rollback nhanh nhưng có thể mất feature; failover tăng availability nhưng có thể tạo stale data. Nêu trade-off theo RTO/RPO.

# 15. Common mistakes
Chẩn đoán theo cảm giác; thay đổi nhiều thứ cùng lúc; retry vô hạn; đổ lỗi cá nhân; không thông báo stakeholder; không test restore/rollback.

# 16. Knowledge check
Giải thích SLO/error budget, difference giữa symptom và root cause, khi nào rollback, cách chứng minh recovery và cách ngăn tái diễn.

# 17. Câu hỏi phỏng vấn
Nếu production down bạn làm gì? Thiết kế HA ra sao? Xử lý change lỗi thế nào? Đo thành công bằng metric nào? Escalate khi nào?

# 18. Đáp án phỏng vấn mẫu
Nêu assumption và impact trước, sau đó evidence, hypothesis, mitigation, verification, communication và follow-up RCA. Không khẳng định điều chưa kiểm chứng.

# 19. Follow-up question tree
Scope rộng hay hẹp? Có recent change không? Dependency nào chung? Có mitigation an toàn không? RTO/RPO nào bị đe dọa? Ai cần được cập nhật?

# 20. Checklist sau khi học
- [ ] Viết timeline cho một incident.
- [ ] Vẽ flow và failure domain.
- [ ] Viết rollback và verification.
- [ ] Nêu prevention có owner và deadline.

# 21. Flashcards
SLO là mục tiêu; SLI là phép đo; RTO là thời gian phục hồi; RPO là dữ liệu mất tối đa; p99 là tail latency; canary giảm blast radius; RCA tìm cause; postmortem tạo prevention; runbook hướng dẫn action; error budget điều chỉnh tốc độ change.

# 22. Phải hiểu và phải nhớ
Hiểu causal chain, trade-off và ownership; nhớ command, escalation, severity, rollback và communication template.

# 23. Phân biệt “phải nhớ” và “phải hiểu”
Phải nhớ cú pháp và checklist; phải hiểu khi nào evidence đủ, tại sao metric thay đổi và action nào có thể làm xấu sự cố.

# 24. Liên hệ với JD
Map vào operations, reliability, platform engineering, release, security, customer communication và continuous improvement.

# 25. Liên hệ với CV
Mỗi claim cần scope, scale, role, metric trước/sau, công cụ, trade-off và bài học; phân biệt production với lab.

# 26. Enterprise / data center scenario
Thiết kế ownership rõ, on-call, multi-AZ, audit, break-glass, backup, DR, vendor escalation và communication khi outage.

# 27. Hands-on lab
Tạo một lỗi có kiểm soát, ghi baseline, thu evidence, áp dụng mitigation, đo recovery, viết postmortem và action items.

# 28. Troubleshooting decision tree
Alert → scope → first bad timestamp → recent change → saturation/dependency/data → mitigation → verify SLO → RCA/prevention.

# 29. Production readiness review
Có SLO, dashboard, alert, capacity, access review, security, backup/restore, rollback, runbook, owner và game day.

# 30. Self-assessment
Beginner: mô tả flow. Intermediate: debug bằng evidence. Advanced: thiết kế HA/DR, trade-off cost và dẫn dắt incident.

# 31. Interview priority
Ưu tiên communication rõ → evidence → technical depth → risk/trade-off → prevention và ownership.

# 32. Final checklist
- [ ] Trả lời được topic CV-based Interview bằng ví dụ cụ thể.
- [ ] Đưa ra được evidence, mitigation và verification.
- [ ] Nêu được trade-off, rollback, RCA và prevention.

