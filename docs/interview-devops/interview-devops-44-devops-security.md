# DevSecOps và Security — Cẩm nang phỏng vấn

# 1. Mục tiêu học
DevSecOps đưa threat modeling, kiểm tra dependency/source/IaC/image, secret control, signing, runtime policy và incident response vào từng stage. Nắm được cách thiết kế, vận hành, quan sát và xử lý sự cố.

# 2. Kiến thức nền cần có
Linux, networking, TLS, storage, distributed systems, SQL và CI/CD; học theo least privilege và evidence.

# 3. Tổng quan kiến trúc
Xác định client, control plane, data plane, state store, identity, observability và failure domain. Mỗi thành phần có owner, SLO và runbook.

# 4. Cách hoạt động
Request đi qua authentication, authorization, validation, execution và persistence; response chỉ thành công khi dependency và durability đạt điều kiện.

# 5. Thành phần và failure mode
Data node có thể đầy disk; network timeout; credential hết hạn; controller lag; retry sai tạo storm hoặc duplicate. Luôn phân tích blast radius.

# 6. Concepts quan trọng
Phân biệt availability, durability, consistency, throughput, latency, backpressure, idempotency, retry budget và blast radius.

# 7. Ví dụ thực tế
Production nên tách workload theo tenant, giới hạn tài nguyên, encryption in transit/at rest, backup đã test restore và dashboard theo SLO.

# 8. Command / Tool cần biết
git diff, trivy, grype, syft, semgrep, gitleaks, tfsec/checkov, cosign, kubectl auth can-i và IAM audit logs.

# 9. Log và cách đọc
Correlate timestamp, request ID, principal, resource và deployment version. Giữ log client/server, audit event, retry và dependency response trước khi restart.

# 10. Metrics
Đo request rate, p50/p95/p99 latency, error rate, saturation, queue/lag, connection count, disk/WAL growth, retry rate và SLO burn rate.

# 11. Configuration mẫu
Cấu hình phải version-control, review, immutable ở production; secret lấy từ secret manager, không commit plaintext. Đặt timeout, limit, retention và alert theo mục tiêu vận hành.

# 12. Troubleshooting methodology
Xác định scope và first bad timestamp; kiểm tra recent change; phân biệt client, network, service, storage và data; mitigation reversible; verify bằng metric và test; viết RCA.

# 13. Năm production incidents
1. Latency tăng: kiểm tra saturation, queue, dependency và recent deploy.
2. Error tăng: group theo code, endpoint, principal và version, rồi rollback/circuit break.
3. Disk đầy: tìm top consumer, retention/WAL/log và mở rộng có kiểm soát.
4. Credential/TLS hết hạn: kiểm tra chain, clock, secret version và rotation.
5. Data lag hoặc duplicate: kiểm tra offset/transaction/retry/idempotency và replay plan.

# 14. So sánh
Managed giảm toil control plane nhưng không xóa trách nhiệm data contract, access, observability và cost. Strong consistency, eventual consistency và cache đều có trade-off.

# 15. Common mistakes
Alert theo ngưỡng tùy ý; retry vô hạn; tăng timeout để che latency; cấp quyền admin; backup chưa restore test; sửa production không có rollback; log secret hoặc payload nhạy cảm.

# 16. Knowledge check
Giải thích failure domain, backpressure, idempotency, least privilege và cách phân biệt symptom với root cause bằng metric.

# 17. Câu hỏi phỏng vấn
Thiết kế HA; xử lý lag/lock/queue; chọn retry; bảo vệ secret; rollout an toàn; đáp ứng audit; tính capacity và DR.

# 18. Đáp án phỏng vấn mẫu
Nêu assumption, SLO/RPO/RTO, flow dữ liệu, failure mode, metric, mitigation và trade-off; phân biệt kinh nghiệm có evidence với lab.

# 19. Follow-up question tree
Lỗi có toàn hệ thống không? Có cùng first bad timestamp không? Dependency nào thay đổi? Queue/connection/disk có đầy không? Mitigation nào reversible và verification nào chứng minh phục hồi?

# 20. Checklist sau khi học
- [ ] Vẽ data flow và failure domain.
- [ ] Viết runbook cho một incident.
- [ ] Có dashboard, alert, backup/restore hoặc rollback test.
- [ ] Kiểm tra quyền và secret exposure.

# 21. Flashcards
SLO là mục tiêu dịch vụ; RPO là dữ liệu mất tối đa; RTO là thời gian phục hồi; p99 phản ánh tail latency; backpressure bảo vệ hệ thống; idempotency an toàn khi retry; log là evidence; least privilege giảm blast radius; canary giảm rủi ro; RCA cần prevention.

# 22. Phải hiểu và phải nhớ
Hiểu causal chain và trade-off; nhớ command, metric, trạng thái, escalation và tiêu chí rollback.

# 23. Phân biệt “phải nhớ” và “phải hiểu”
Không học thuộc threshold tách rời context; baseline, workload và failure mode quyết định ngưỡng.

# 24. Liên hệ với JD
Map vào reliability, platform operations, release engineering, security, compliance, monitoring và incident response.

# 25. Liên hệ với CV
Tách rõ hệ thống đã vận hành, quy mô, vai trò, metric trước/sau và phần kiến thức tự học.

# 26. Enterprise / data center scenario
Thiết kế multi-AZ, private connectivity, identity federation, centralized audit, encryption keys, backup vault, DR region và quyền break-glass có audit.

# 27. Hands-on lab
Tạo workload, đặt baseline, gây một lỗi có kiểm soát, thu logs/metrics/audit, mitigation, test recovery và ghi timeline/RCA.

# 28. Troubleshooting decision tree
Error/latency? → scope → recent change → saturation/queue → dependency/network → data/lock/credential → rollback hoặc failover → verify SLO.

# 29. Production readiness review
Có threat model, ownership, SLO, capacity, alert, runbook, access review, encryption, backup restore, rollback, audit trail và game day.

# 30. Self-assessment
Beginner: giải thích flow và lệnh. Intermediate: debug incident và viết config an toàn. Advanced: thiết kế HA/DR, cost, security và migration.

# 31. Interview priority
Architecture → failure modes → evidence → mitigation → trade-off → security → DR → communication.

# 32. Final checklist
- [ ] Trình bày được cơ chế đúng chủ đề DevSecOps và Security.
- [ ] Debug được một incident từ symptom đến verification.
- [ ] Đưa ra được security, capacity, rollback và prevention.

