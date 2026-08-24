# Computer System Fundamentals — Cẩm nang phỏng vấn

# 1. Mục tiêu học
CPU, memory hierarchy, processes, syscalls, filesystems, boot và virtualization; liên hệ concept với vận hành, failure mode và quyết định production.

# 2. Kiến thức nền cần có
Linux, networking, storage, identity, scripting, observability và change management.

# 3. Tổng quan kiến trúc
Mô tả control plane, data plane, state, dependency, traffic flow và failure domain của Computer System Fundamentals.

# 4. Cách hoạt động
Mô tả lifecycle từ request/config đến execution, persistence, response, audit và metric.

# 5. Thành phần và failure mode
Computer System Fundamentals có thể gặp resource exhaustion, network partition, stale state, permission error, disk failure hoặc bad change; xác định impact của từng lỗi.

# 6. Concepts quan trọng
Availability, durability, consistency, latency, throughput, capacity, timeout, retry, idempotency và least privilege.

# 7. Ví dụ thực tế
Triển khai theo môi trường, version-control config, baseline metric, health check, backup và rollback.

# 8. Command / Tool cần biết
lscpu, free, vmstat, iostat, ps, strace

# 9. Log và cách đọc
Correlate timestamp, host/component, request ID, version và user. Giữ evidence trước khi restart hoặc xóa state.

# 10. Metrics
CPU, memory, disk/inode, network, latency, error rate, queue/connection, replication/lag và SLO.

# 11. Configuration mẫu
Config phải review, có timeout/limit, secret ngoài source, permission tối thiểu, health check và rollback.

# 12. Troubleshooting methodology
Xác định scope; kiểm tra first bad timestamp và recent change; thu logs/metrics; lập hypothesis; mitigation reversible; verify; RCA.

# 13. Năm production incidents
1. Service unavailable: kiểm tra process/listener/health check/dependency.
2. Latency tăng: kiểm tra saturation, queue, storage và network.
3. Disk đầy: tìm consumer, cleanup theo policy và mở rộng an toàn.
4. Permission/TLS lỗi: kiểm tra identity, expiry, chain và recent rotation.
5. Replication/cluster lỗi: xác định quorum, lag, fencing và failover plan.

# 14. So sánh
Managed giảm vận hành control plane nhưng giảm tùy biến; active-active tăng availability nhưng khó consistency; cache tăng latency tốt nhưng cần invalidation; snapshot nhanh nhưng không thay thế backup.

# 15. Common mistakes
Không có baseline; alert quá rộng; retry vô hạn; quyền admin; backup chưa restore test; sửa nhiều biến cùng lúc; bỏ qua change record.

# 16. Knowledge check
Giải thích flow, failure domain, metric quan trọng, cách khoanh vùng và tiêu chí rollback của Computer System Fundamentals.

# 17. Câu hỏi phỏng vấn
Thiết kế HA; debug outage; bảo mật access; capacity planning; backup/restore; patch/upgrade; monitoring và RCA.

# 18. Đáp án phỏng vấn mẫu
Nêu assumption, scope, evidence, hypothesis, mitigation, verification và trade-off; tách rõ kinh nghiệm production và lab.

# 19. Follow-up question tree
Lỗi đơn lẻ hay toàn hệ thống? Có recent change? Component nào chung? Resource/permission/dependency nào bất thường? Action nào an toàn để giảm impact?

# 20. Checklist sau khi học
- [ ] Vẽ architecture và dependency.
- [ ] Chạy được command cơ bản.
- [ ] Viết runbook incident và rollback.
- [ ] Có backup/restore hoặc recovery test.

# 21. Flashcards
SLI là phép đo; SLO là mục tiêu; RTO là thời gian phục hồi; RPO là dữ liệu mất; p99 là tail latency; quorum tránh split-brain; health check quyết định failover; least privilege giảm blast radius; idempotency an toàn khi retry; RCA cần prevention.

# 22. Phải hiểu và phải nhớ
Hiểu causal chain và trade-off; nhớ lifecycle, trạng thái, command, log, metric và escalation.

# 23. Phân biệt “phải nhớ” và “phải hiểu”
Nhớ cú pháp không đủ; phải hiểu tác động của workload, baseline, failure domain và dependency.

# 24. Liên hệ với JD
Map vào system administration, platform operations, cloud, monitoring, security, incident và change management.

# 25. Liên hệ với CV
Nêu rõ quy mô, vai trò, metric trước/sau, công cụ và bài học; không biến lab thành production claim.

# 26. Enterprise / data center scenario
Thiết kế HA theo failure domain, access/audit tập trung, backup immutable, DR site, break-glass và vendor escalation.

# 27. Hands-on lab
Tạo workload lab, ghi baseline, gây lỗi có kiểm soát, thu evidence, khắc phục, kiểm tra recovery và viết RCA.

# 28. Troubleshooting decision tree
Alert → scope → process/config → network/dependency → resource/storage → state/replication → mitigation → verify → prevention.

# 29. Production readiness review
SLO, dashboard, alert, capacity, security, ownership, runbook, backup/restore, rollback, patch plan và game day.

# 30. Self-assessment
Beginner: giải thích concept. Intermediate: vận hành và debug. Advanced: thiết kế HA/DR, cost, security và migration.

# 31. Interview priority
Architecture → lifecycle → command/evidence → failure mode → mitigation → trade-off → security/DR.

# 32. Final checklist
- [ ] Trình bày được cơ chế đúng chủ đề Computer System Fundamentals.
- [ ] Debug được incident theo evidence.
- [ ] Nêu được HA, backup, security, rollback và prevention.

