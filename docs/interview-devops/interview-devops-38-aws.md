# AWS Core Services - Exhaustive Interview Preparation Guide

## 1. Mục tiêu học
- Hiểu rõ về AWS Core Services trong môi trường Enterprise.
- Nắm vững các khái niệm cốt lõi, kiến trúc và vận hành.

## 2. Kiến thức nền cần biết
- Kiến thức cơ bản về Linux, Network, và Cloud.
- Hiểu biết về containerization, orchestration (nếu áp dụng).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context)
- **Enterprise Context:** AWS Core Services được áp dụng rộng rãi để mở rộng hệ thống.
- **Enterprise Context (Doanh nghiệp Enterprise):** Áp dụng AWS Core Services để đáp ứng JD 60% System + 40% DevOps, tối ưu chi phí và tăng tính ổn định (nhất là hệ thống TOS).
- **Candidate CV Alignment:** Mapping kinh nghiệm AWS, EKS, Docker, K8s, Terraform, ArgoCD vào bối cảnh AWS Core Services.

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams)
```text
[ Client ] --> [ Load Balancer ] --> [ AWS Core Services Component A ]
                                     |
                                     +--> [ AWS Core Services Component B ]
```

## 5. Các thành phần quan trọng (Components, failure modes)
- **Thành phần A:** Chức năng chính. *Failure mode:* OOM, Network partition.
- **Thành phần B:** Quản lý state. *Failure mode:* Split-brain.

## 6. Các concept quan trọng
- **Cơ bản:** Các khái niệm nhập môn.
- **Trung cấp:** Khái niệm vận hành, lifecycle.
- **Nâng cao:** Tối ưu hiệu năng, deep dive internals.

## 7. Ví dụ thực tế
- **Dev:** Môi trường thử nghiệm, config tối giản.
- **Prod:** HA setup, bảo mật, giám sát đầy đủ.
- **Enterprise/Multi-DC:** Active-Active, Active-Passive, Disaster Recovery (DR).

## 8. Command / Tool cần biết
- `ps, top, free, df, iostat, vmstat, ss, journalctl, systemctl, lsof, strace`
- Các tool đặc thù của AWS Core Services.

## 9. Log (locations, interpretation, correlation)
- **/var/log/messages**, **/var/log/syslog**
- Cách đọc log và correlate (truy vết) theo Request ID.

## 10. Metric (CPU, RAM, Disk I/O, Load Average, Inodes, Swap)
- **CPU / RAM:** Cảnh báo khi > 80%.
- **Disk I/O:** Theo dõi iowait.
- **Load Average:** Đánh giá độ bận rộn của hệ thống.

## 11. Configuration (Sample configs)
```yaml
# Sample config for AWS Core Services
server:
  port: 8080 
  max_connections: 1000 
```

## 12. Troubleshooting Methodology
1. **Identify the problem:** Rõ ràng triệu chứng (Symptom).
2. **Gather data:** Logs, metrics, alerts.
3. **Analyze:** Dùng các tool (top, strace) để khoanh vùng.
4. **Implement fix:** Khắc phục (Mitigation/Resolution).
5. **Verify:** Đảm bảo dịch vụ hoạt động bình thường.
6. **RCA (Root Cause Analysis):** Phân tích nguyên nhân gốc.

## 13. Production Incident (5 Detailed Scenarios)
1. **Scenario 1:** Out of Memory (OOM) - Symptoms, Impact, RCA, Fix.
2. **Scenario 2:** Network Timeout - Phân tích packet drop.
3. **Scenario 3:** High CPU / Load Average.
4. **Scenario 4:** Disk Full / Inode Exhaustion.
5. **Scenario 5:** Configuration drift dẫn đến service crash.

## 14. So sánh
| Feature | AWS Core Services | Alternative |
| --- | --- | --- |
| Performance | High | Medium |
| Complexity | High | Low |

## 15. Common Mistakes
- Không set resource requests/limits.
- Bỏ qua việc monitor các key metrics.
- Cấu hình security quá lỏng lẻo.

## 16. Interview Knowledge Check
- **10 Basic:** Các câu hỏi kiểm tra khái niệm.
- **10 Deep:** Internals, cơ chế bộ nhớ.
- **10 Troubleshooting:** Cách tiếp cận lỗi cụ thể.

## 17. Câu hỏi phỏng vấn
- **Basic:** AWS Core Services là gì?
- **Intermediate:** Nêu cách backup/restore?
- **Advanced:** Làm sao để scale AWS Core Services cho 1 triệu RPS?
- **Production/Architecture:** Thiết kế AWS Core Services đa vùng (Multi-AZ).

## 18. Đáp án phỏng vấn
- **Short 20-30s:** Trả lời trực diện.
- **Good 1-2m:** Mở rộng ngữ cảnh, lợi ích/bất lợi.
- **Engineer Style:** Đưa ra ví dụ thực tế, nói về trade-offs.

## 19. Follow-up Question Tree
- *Nếu trả lời được câu A -> Hỏi sâu về cơ chế B.*

## 20. Checklist sau khi học
- [ ] Nắm được kiến trúc tổng thể.
- [ ] Chạy thử 1 demo thực tế.

## 21. Flashcards (25+ Q&A pairs)
- **Q:** AWS Core Services dùng để làm gì? -> **A:** Giải pháp cho ...

## 22. Phân biệt "Phải hiểu" (🔴) và "Phải nắm" (🟠)
- 🔴 **Phải hiểu:** Cơ chế hoạt động core.
- 🟠 **Phải nắm:** Các thông số config chi tiết.
