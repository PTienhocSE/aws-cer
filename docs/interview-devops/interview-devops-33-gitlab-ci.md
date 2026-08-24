# [33] GITLAB CI/CD & RUNNERS

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** Git, CI/CD fundamentals, Docker, registry, Kubernetes

# 1. 🎯 MỤC TIÊU HỌC

Viết `.gitlab-ci.yml` có stages, rules, variables, artifacts, cache, environments, protected variables, runner tags, child pipeline, deployment và rollback an toàn.

# 2. 🧠 KIẾN THỨC NỀN

Ôn Git commit/branch/MR, YAML, Docker executor, artifact/registry, OIDC, Kubernetes rollout và shell scripting.

# 3. 📚 TỔNG QUAN

GitLab CI tạo pipeline từ YAML. Runner nhận job theo tag/capacity/executor. Artifact truyền output giữa job; cache tăng tốc dependency nhưng không thay artifact và không được chứa secret.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Push/MR -> GitLab pipeline rules -> Runner picks job
       -> build/test/scan -> artifacts/registry
       -> environment deploy -> approval/health -> rollback
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Pipeline, stage/job, `rules`, runner/executor/tag, artifact, cache, variable, protected environment, registry, child pipeline, environment/deployment và pipeline audit.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

`rules` quyết định job chạy khi nào; `needs` tạo DAG và giảm thời gian; artifact có expiry/download; cache có key/fallback; protected variables chỉ xuất hiện trong context được phép.

# 7. 🌍 VÍ DỤ THỰC TẾ

MR chạy test/scan; main build image digest; staging deploy tự động; Production protected environment yêu cầu approval; release tag promote cùng digest.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Các thao tác quan trọng: `gitlab-runner verify`, `gitlab-runner list`, `gitlab-runner exec` trong lab, kiểm tra job trace, artifact browser, pipeline graph, `docker inspect`, `kubectl rollout status` và GitLab API audit.

# 9. 📝 LOG

Job trace cần có commit SHA, runner, image, command, exit code và artifact link nhưng phải mask variable. Runner log cho biết executor/polling/network; GitLab audit cho biết variable/deployment/permission change.

# 10. 📊 METRIC

Runner queue time, job duration, concurrency, success/failure, flaky rate, artifact size/retention, cache hit, deployment frequency, lead time và runner utilization.

# 11. ⚙️ CONFIGURATION

```yaml
stages: [validate, test, build, deploy]

default:
  image: alpine:3.20
  interruptible: true

validate:
  stage: validate
  script: ["./scripts/validate.sh"]
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

build-image:
  stage: build
  needs: [validate]
  script: ["./scripts/build-and-push.sh $CI_COMMIT_SHA"]
  artifacts:
    reports:
      dotenv: image.env
```

Pin image/action, dùng `rules` thay `only/except` legacy, protected variables và OIDC thay long-lived cloud key.

# 12. 🔧 TROUBLESHOOTING

Pipeline không chạy → rules/workflow; job pending → runner tag/capacity; job fail → trace/exit code; artifact mất → needs/expiry/path; deploy fail → credential/manifest/cluster; secret không có → protected context/variable scope.

# 13. 🚨 PRODUCTION INCIDENT

1. **Job Pending:** kiểm tra runner online/tag/concurrency/quota rồi scale runner.  
2. **Protected variable rỗng:** xác minh branch/environment protection, không in Secret để debug.  
3. **Artifact expired:** dừng release, rebuild từ commit hoặc restore registry artifact; sửa retention.  
4. **Runner bị lộ credential:** revoke token/key, audit job, isolate runner và chuyển OIDC/ephemeral.  
5. **Deploy job xanh nhưng app lỗi:** lấy deployed digest/config, rollback environment và bổ sung health gate.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| Shell runner | đơn giản | pollution/security |
| Docker runner | reproducible | Docker socket risk |
| Kubernetes runner | elastic | cluster dependency |
| Cache | nhanh | stale/corrupt risk |
| Artifact | traceable | storage/retention cost |
| DAG `needs` | giảm time | dependency phức tạp |

# 15. ❌ COMMON MISTAKES

Dùng privileged Docker socket; variable secret không protected; cache chứa credential; job chạy trên mọi branch; không pin image; artifact expiry quá ngắn; deploy không có environment approval.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

`rules` khác `needs` thế nào? Artifact khác cache? Runner tag dùng làm gì? Protected variable bảo vệ gì? Job Pending debug ra sao? Vì sao Docker socket nguy hiểm? OIDC dùng thế nào?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế GitLab pipeline multi-environment; tối ưu runner; cache/artifact; bảo mật variable; child pipeline; deploy Kubernetes; rollback; xử lý pipeline queue.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em tách validate/test/build/deploy, dùng `rules` cho MR/main/tag, `needs` để tạo DAG, artifact/digest immutable, protected environment cho Production và OIDC cho cloud. Runner được tag/isolate, cache không chứa secret, deploy có health check và rollback.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu pipeline graph, runner boundary, artifact traceability, secret scope, approval và failure recovery; không chỉ đọc YAML.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Job Pending -> runner/tag/concurrency
Job fail -> trace/exit code/dependency
Artifact fail -> path/needs/expiry
Deploy fail -> token/manifest/cluster
Secret fail -> protection/scope/OIDC
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Viết được pipeline YAML có rules/needs.
- [ ] Phân biệt artifact/cache.
- [ ] Quản lý runner/variable/protected env.
- [ ] Deploy/rollback được workload.
- [ ] Đo runner và pipeline health.

# 22. 🃏 FLASHCARDS

**Q:** Artifact là gì? **A:** Output được lưu/chuyển giữa job hoặc release.  
**Q:** Cache là gì? **A:** Dữ liệu tăng tốc, có thể bỏ và có thể stale.  
**Q:** Runner tag? **A:** Chọn runner phù hợp job.  
**Q:** `needs`? **A:** Khai báo dependency DAG giữa jobs.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu runner/job/artifact/security boundary.  
🟠 Nắm rules/needs/cache/variables/environments.  
🟡 Biết child pipeline, DAG, OIDC và executor trade-off.

# 24. 🎯 LIÊN HỆ VỚI JD

GitLab CI là kỹ năng trực tiếp để tự động hóa test/build/deploy và vận hành delivery an toàn.

# 25. 📌 LIÊN HỆ VỚI CV

Nêu rõ runner/executor, pipeline stages, artifact, registry, environment protection, OIDC và incident đã làm.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

GitLab self-managed dùng runner private theo trust zone, registry private, protected branch/environment, approval, SBOM/scan, audit và deploy qua GitOps hoặc controlled CD.

# 27. 🧪 HANDS-ON LAB

Tạo pipeline MR/main/tag; thêm cache/artifact; dùng runner tag; deploy staging; cố ý fail protected variable/rollout rồi xử lý; thêm OIDC và scan.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Pipeline trigger → rules; queue → runner; job → trace; output → artifact/cache; deploy → auth/manifest/cluster; secret → protection/OIDC.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review runner isolation, Docker socket, protected variables, OIDC, artifact retention, cache policy, approval, job timeout/retry, audit, rollback và cost.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| YAML pipeline | ☐ | ☐ | ☐ |
| Runner | ☐ | ☐ | ☐ |
| Artifact/security | ☐ | ☐ | ☐ |
| Deploy/rollback | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: `rules`, `needs`, runner, artifact/cache, protected variable, OIDC, environment, deployment và runner incident.

# 32. 📋 FINAL CHECKLIST

- [ ] Viết pipeline GitLab có rules/needs.
- [ ] Dùng artifact/cache đúng mục đích.
- [ ] Bảo vệ runner/variable/environment.
- [ ] Deploy có approval/health/rollback.
- [ ] Debug được job pending/fail và Production deploy.

---
END OF FILE
