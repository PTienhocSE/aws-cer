# [34] GITHUB ACTIONS & WORKFLOWS

> **Phase:** 3 — DevOps Core
> **Priority:** 🟠 HIGH
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** GitHub, Git, CI/CD, Docker, OIDC, Kubernetes basics

# 1. 🎯 MỤC TIÊU HỌC

Thiết kế workflow GitHub Actions an toàn với event, job, matrix, reusable workflow, artifact, cache, environment approval, self-hosted runner, OIDC và deployment rollback.

# 2. 🧠 KIẾN THỨC NỀN

Git ref/commit/tag, YAML, Docker/registry, GitHub permissions, branch protection, cloud IAM/OIDC, Kubernetes rollout và supply-chain security.

# 3. 📚 TỔNG QUAN

Workflow được kích hoạt bởi event như pull request, push, tag hoặc schedule. Job chạy trên runner; `needs` tạo dependency; artifact/cache truyền dữ liệu; environment bảo vệ Production.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Event -> workflow permissions -> runner -> jobs/steps
      -> test/build/scan -> artifact/registry
      -> protected environment -> deploy -> verify/rollback
```

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

Workflow, event, job, step, action, matrix, `needs`, artifact, cache, environment, secrets/variables, GitHub-hosted/self-hosted runner, reusable workflow và deployment status.

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

**Cơ bản:** event/job/step, `uses` action, `run` command, `needs` dependency.  
**Trung cấp:** matrix, concurrency, reusable workflow, artifact, protected environment.  
**Nâng cao:** OIDC, pin action SHA, provenance/SBOM, self-hosted runner isolation và least-privilege `permissions`.

# 7. 🌍 VÍ DỤ THỰC TẾ

Pull request chạy test/scan; merge main build image theo commit SHA; staging deploy tự động; Production environment cần reviewer; tag release promote image digest và tạo release note.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

Kiểm tra workflow bằng actionlint; `gh run list`, `gh run view --log-failed`, `gh api repos/<org>/<repo>/actions/runs`; kiểm tra artifact, job summary, deployment status, Docker digest và `kubectl rollout status`.

# 9. 📝 LOG

Job log phải có run ID, commit SHA, runner, action version, artifact/digest, actor, environment và exit code. Không echo `${{ secrets.* }}`; audit GitHub ghi workflow/permission/environment changes.

# 10. 📊 METRIC

Run success/failure, queue/job duration, runner utilization, cache hit, flaky tests, artifact size, deployment frequency, lead time, change failure rate và rollback.

# 11. ⚙️ CONFIGURATION

Workflow phải đặt `permissions` tối thiểu, pin third-party action theo SHA, dùng environment protection, concurrency cancel stale deploy, timeout, OIDC và không lưu long-lived cloud key trong repository secret.

# 12. 🔧 TROUBLESHOOTING

Workflow không trigger → event/branch/path/rules; job không chạy → `if`/`needs`; queue → runner label/capacity; action fail → version/input/permission; artifact fail → path/retention; deploy fail → OIDC/manifest/cluster; app fail → rollout/health.

# 13. 🚨 PRODUCTION INCIDENT

1. **Workflow không chạy trên tag:** kiểm tra event/ref filter và branch protection.  
2. **OIDC AccessDenied:** kiểm tra `permissions.id-token`, IAM trust condition repo/ref/environment và CloudTrail.  
3. **Self-hosted runner bị compromise:** disable runner, revoke token, isolate host, audit jobs và rebuild clean runner.  
4. **Deploy sai environment:** kiểm tra environment mapping/approval/ref, stop rollout và rollback digest đúng.  
5. **Action bên thứ ba bị supply-chain issue:** disable/pin SHA, kiểm tra workflow/artifact và thay bằng action đã review.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Mạnh | Trade-off |
|---|---|---|
| GitHub-hosted runner | ephemeral/ít ops | giới hạn network/custom tool |
| Self-hosted runner | private network/custom | isolation/patching trách nhiệm mình |
| Composite action | reuse step | khó version boundary |
| Reusable workflow | chuẩn hóa job/policy | input/permission phức tạp |
| OIDC | short-lived | trust condition cần chính xác |

# 15. ❌ COMMON MISTAKES

Dùng `write-all` permissions; action tag mutable; self-hosted runner dùng chung trust zone; Secret trong log; không protected environment; thiếu concurrency/deploy lock; dùng `pull_request_target` không an toàn.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

Event/job/step khác nhau? `needs` dùng gì? Artifact khác cache? OIDC trust điều kiện nào? Self-hosted runner rủi ro gì? Environment approval bảo vệ gì? Pin action SHA vì sao?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

Thiết kế workflow multi-env; bảo mật OIDC; self-hosted runner; matrix/reusable workflow; artifact promotion; deploy Kubernetes; xử lý action compromise và rollback.

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

Em giới hạn event/permissions, pin action, dùng ephemeral hoặc runner trust zone phù hợp, OIDC với trust condition theo repository/ref/environment, build artifact một lần, protected Production environment và deployment health/rollback. Mọi run có audit và trace tới commit/digest.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Nêu cả GitHub control plane, runner boundary, cloud trust và cluster deployment; không coi workflow YAML là toàn bộ security model.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Job fail?
 -> event/if/needs?
 -> runner/action/input?
 -> permissions/secret/OIDC?
 -> artifact/deploy?
 -> health/rollback/audit?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Viết workflow event/job/needs/matrix.
- [ ] Dùng permissions tối thiểu và pin action.
- [ ] Dùng OIDC/environment approval.
- [ ] Quản lý runner/artifact/cache.
- [ ] Deploy có verify/rollback.

# 22. 🃏 FLASHCARDS

**Q:** `needs` là gì? **A:** Dependency giữa các job.  
**Q:** OIDC dùng gì? **A:** Cấp cloud credential ngắn hạn theo trust policy.  
**Q:** Artifact khác cache? **A:** Artifact là output cần trace; cache chỉ tăng tốc và có thể bỏ.  
**Q:** Environment protection? **A:** Approval/rule bảo vệ deployment nhạy cảm.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Hiểu workflow/runner/cloud trust/deploy boundary.  
🟠 Nắm event, `needs`, permissions, artifact, environment.  
🟡 Biết reusable workflow, provenance và runner hardening.

# 24. 🎯 LIÊN HỆ VỚI JD

GitHub Actions phục vụ CI/CD, image build, IaC, Kubernetes deployment và automation trong DevOps.

# 25. 📌 LIÊN HỆ VỚI CV

Ghi rõ workflow thật, runner, OIDC, artifact, environment, deployment và incident; không chỉ ghi “GitHub Actions”.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

PR policy, branch protection, reusable workflow chuẩn hóa, private runner cho network nội bộ, OIDC cloud, private registry, protected Production environment và audit.

# 27. 🧪 HANDS-ON LAB

Tạo PR test; matrix runtime; build/push digest; deploy staging; OIDC AWS test; protected Production approval; cố ý fail action/rollout để debug và rollback.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

Event → condition/needs → runner → action/input → permission/OIDC → artifact → deploy → health/rollback.

# 29. 🧾 PRODUCTION READINESS REVIEW

Review workflow permissions, action pinning, OIDC trust, runner isolation, secret masking, environment approval, artifact retention, concurrency, audit và rollback.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Workflow | ☐ | ☐ | ☐ |
| Runner/security | ☐ | ☐ | ☐ |
| OIDC/artifact | ☐ | ☐ | ☐ |
| Deployment | ☐ | ☐ | ☐ |
| Incident | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: workflow event, `needs`, runner, permissions, action pinning, OIDC, environment, artifact, deploy và supply-chain incident.

# 32. 📋 FINAL CHECKLIST

- [ ] Viết workflow có event/rules/dependency rõ.
- [ ] Runner và action an toàn.
- [ ] OIDC/permissions tối thiểu.
- [ ] Artifact traceable và deploy protected.
- [ ] Có health verification, rollback và audit.

---
END OF FILE
