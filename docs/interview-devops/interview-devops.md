# 📘 BỘ GIÁO TRÌNH PHỎNG VẤN SYSTEM & DEVOPS ENGINEER (56 CHƯƠNG)

> **Format chuẩn:** Mỗi topic được mở rộng theo [template 32 phần](FORMAT-32-SECTIONS.md). Các file hiện có được giữ nguyên nội dung chuyên môn; việc bổ sung thực hiện tuần tự theo phase để tránh trùng lặp và không biến tài liệu thành danh sách câu hỏi.

> **Mô hình đào tạo:** 60% System Operations + 40% DevOps Engineer
> **Cấu trúc chuẩn hóa:** 32 Phần thực chiến trên từng chương (Kiến thức ➔ Architecture ➔ Commands ➔ Logs/Metrics ➔ Troubleshooting ➔ 5 Production Incidents ➔ Decision Tree ➔ Hands-on Labs ➔ Knowledge Check ➔ Q&A ➔ Follow-up Tree ➔ Flashcards)

---

## 🗺️ LỘ TRÌNH THỜI GIAN & PHÂN CHIA 5 PHASES

```text
               ┌─────────────────────────────────────────────────────────┐
               │    LỘ TRÌNH ÔN THI SYSTEM & DEVOPS ENGINEER (4 TUẦN)    │
               └────────────────────────────┬────────────────────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         │                                  │                                  │
┌────────▼─────────┐              ┌─────────▼────────┐              ┌──────────▼────────┐
│ PHASE 1: SYSTEM  │              │ PHASE 2: ENTER-  │              │ PHASE 3: DEVOPS  │
│ CORE & NETWORKING│              │ PRISE SYSTEM     │              │ CORE & CONTAINER │
│ (11 Chương - 🔴)  │              │ (8 Chương - 🟠)   │              │ (15 Chương - 🔴) │
└────────┬─────────┘              └─────────┬────────┘              └──────────┬────────┘
         │                                  │                                  │
         └──────────────────────────────────┼──────────────────────────────────┘
                                            │
                         ┌──────────────────┴──────────────────┐
                         │                                     │
                ┌────────▼─────────┐                  ┌────────▼─────────┐
                │ PHASE 4: CLOUD & │                  │ PHASE 5: DESIGN  │
                │ DATA INFRA       │                  │ & MOCK INTERVIEW │
                │ (11 Chương - 🟠)  │                  │ (11 Chương - 🔴) │
                └──────────────────┘                  └──────────────────┘
```

---

## 🔴 PHASE 1: SYSTEM CORE & NETWORKING (Nền tảng Quản trị & Mạng)
- **[00] Interview Strategy**: [/docs/interview-devops-00-interview-strategy](/docs/interview-devops-00-interview-strategy)
- **[01] Computer & System Fundamentals**: [/docs/interview-devops-01-computer-system-fundamentals](/docs/interview-devops-01-computer-system-fundamentals)
- **[02] Enterprise Networking**: [/docs/interview-devops-02-networking](/docs/interview-devops-02-networking)
- **[03] Linux Administration**: [/docs/interview-devops-03-linux-administration](/docs/interview-devops-03-linux-administration)
- **[04] Linux Troubleshooting**: [/docs/interview-devops-04-linux-troubleshooting](/docs/interview-devops-04-linux-troubleshooting)
- **[10] High Availability Architecture**: [/docs/interview-devops-10-high-availability](/docs/interview-devops-10-high-availability)
- **[11] Multi-Data Center Architecture**: [/docs/interview-devops-11-multi-dc-architecture](/docs/interview-devops-11-multi-dc-architecture)
- **[12] Backup & Restore Strategies**: [/docs/interview-devops-12-backup-restore](/docs/interview-devops-12-backup-restore)
- **[13] Disaster Recovery (DR)**: [/docs/interview-devops-13-disaster-recovery](/docs/interview-devops-13-disaster-recovery)
- **[14] Monitoring & Observability**: [/docs/interview-devops-14-monitoring-observability](/docs/interview-devops-14-monitoring-observability)
- **[15] Prometheus Deep Dive**: [/docs/interview-devops-15-prometheus](/docs/interview-devops-15-prometheus)

---

## 🟠 PHASE 2: ENTERPRISE SYSTEM & INFRASTRUCTURE (Bù Skill Gap On-Premise)
- **[05] Windows Server Administration**: [/docs/interview-devops-05-windows-server](/docs/interview-devops-05-windows-server)
- **[06] Active Directory & Domain Services**: [/docs/interview-devops-06-active-directory](/docs/interview-devops-06-active-directory)
- **[07] IIS Web Server**: [/docs/interview-devops-07-iis](/docs/interview-devops-07-iis)
- **[08] VMware vSphere & Virtualization**: [/docs/interview-devops-08-vmware](/docs/interview-devops-08-vmware)
- **[09] Server Hardware & SAN Storage**: [/docs/interview-devops-09-server-hardware-storage](/docs/interview-devops-09-server-hardware-storage)
- **[16] Grafana Dashboarding**: [/docs/interview-devops-16-grafana](/docs/interview-devops-16-grafana)
- **[17] Grafana LGTM Stack**: [/docs/interview-devops-17-grafana-lgtm](/docs/interview-devops-17-grafana-lgtm)
- **[18] SolarWinds Orion Platform**: [/docs/interview-devops-18-solarwinds](/docs/interview-devops-18-solarwinds)
- **[19] Nginx Reverse Proxy**: [/docs/interview-devops-19-nginx](/docs/interview-devops-19-nginx)
- **[20] HAProxy Load Balancer**: [/docs/interview-devops-20-haproxy](/docs/interview-devops-20-haproxy)
- **[21] Microsoft Exchange Server**: [/docs/interview-devops-21-microsoft-exchange](/docs/interview-devops-21-microsoft-exchange)

---

## 🔴 PHASE 3: DEVOPS CORE & CONTAINER PLATFORM (Chủ lực Container & CI/CD)
- **[22] Docker Engine & Containers**: [/docs/interview-devops-22-docker](/docs/interview-devops-22-docker)
- **[23] Kubernetes Core Objects**: [/docs/interview-devops-23-kubernetes-fundamentals](/docs/interview-devops-23-kubernetes-fundamentals)
- **[24] Kubernetes Networking & CNI**: [/docs/interview-devops-24-kubernetes-networking](/docs/interview-devops-24-kubernetes-networking)
- **[25] Kubernetes Storage & CSI**: [/docs/interview-devops-25-kubernetes-storage](/docs/interview-devops-25-kubernetes-storage)
- **[26] Kubernetes Scheduling & Affinity**: [/docs/interview-devops-26-kubernetes-scheduling](/docs/interview-devops-26-kubernetes-scheduling)
- **[27] Kubernetes Security & RBAC**: [/docs/interview-devops-27-kubernetes-security](/docs/interview-devops-27-kubernetes-security)
- **[28] K8s Pod & Cluster Debugging**: [/docs/interview-devops-28-kubernetes-troubleshooting](/docs/interview-devops-28-kubernetes-troubleshooting)
- **[31] Helm v3 Package Manager**: [/docs/interview-devops-31-helm](/docs/interview-devops-31-helm)
- **[32] CI/CD Pipeline Fundamentals**: [/docs/interview-devops-32-cicd-fundamentals](/docs/interview-devops-32-cicd-fundamentals)
- **[33] GitLab CI & Runners**: [/docs/interview-devops-33-gitlab-ci](/docs/interview-devops-33-gitlab-ci)
- **[34] GitHub Actions & Workflows**: [/docs/interview-devops-34-github-actions](/docs/interview-devops-34-github-actions)
- **[35] GitOps Principles**: [/docs/interview-devops-35-gitops](/docs/interview-devops-35-gitops)
- **[36] ArgoCD & GitOps Workflows**: [/docs/interview-devops-36-argocd](/docs/interview-devops-36-argocd)
- **[39] Container Registries**: [/docs/interview-devops-39-container-registry](/docs/interview-devops-39-container-registry)
- **[40] Secret Management**: [/docs/interview-devops-40-secret-management](/docs/interview-devops-40-secret-management)

---

## ☁️ PHASE 4: CLOUD, DATA INFRASTRUCTURE & SECURITY
- **[29] Amazon EKS Architecture**: [/docs/interview-devops-29-amazon-eks](/docs/interview-devops-29-amazon-eks)
- **[30] Karpenter Autoscaling**: [/docs/interview-devops-30-karpenter](/docs/interview-devops-30-karpenter)
- **[37] Terraform & IaC**: [/docs/interview-devops-37-terraform-iac](/docs/interview-devops-37-terraform-iac)
- **[38] AWS Core Services Architecture**: [/docs/interview-devops-38-aws](/docs/interview-devops-38-aws)
- **[41] Red Hat OpenShift Platform**: [/docs/interview-devops-41-openshift](/docs/interview-devops-41-openshift)
- **[42] Apache Kafka & Amazon MSK**: [/docs/interview-devops-42-kafka-msk](/docs/interview-devops-42-kafka-msk)
- **[43] PostgreSQL Operations & HA**: [/docs/interview-devops-43-postgresql-database-ops](/docs/interview-devops-43-postgresql-database-ops)
- **[44] DevSecOps & Security Scanning**: [/docs/interview-devops-44-devops-security](/docs/interview-devops-44-devops-security)

---

## 🎤 PHASE 5: SYSTEM DESIGN, TROUBLESHOOTING & MOCK INTERVIEW
- **[45] SRE Incident Response & RCA**: [/docs/interview-devops-45-incident-response](/docs/interview-devops-45-incident-response)
- **[46] Production Troubleshooting**: [/docs/interview-devops-46-production-troubleshooting](/docs/interview-devops-46-production-troubleshooting)
- **[47] System Design Methodology**: [/docs/interview-devops-47-system-design](/docs/interview-devops-47-system-design)
- **[48] Multi-DC System Design**: [/docs/interview-devops-48-multi-dc-system-design](/docs/interview-devops-48-multi-dc-system-design)
- **[49] DevOps Architecture Design**: [/docs/interview-devops-49-devops-architecture](/docs/interview-devops-49-devops-architecture)
- **[50] CV Deep Dive Questions**: [/docs/interview-devops-50-cv-based-questions](/docs/interview-devops-50-cv-based-questions)
- **[51] Technical Interview Q&A**: [/docs/interview-devops-51-technical-interview-questions](/docs/interview-devops-51-technical-interview-questions)
- **[52] Scenario-Based Q&A**: [/docs/interview-devops-52-scenario-based-questions](/docs/interview-devops-52-scenario-based-questions)
- **[53] Behavioral Interview (STAR)**: [/docs/interview-devops-53-behavioral-interview](/docs/interview-devops-53-behavioral-interview)
- **[54] HR & Salary Negotiation**: [/docs/interview-devops-54-hr-interview](/docs/interview-devops-54-hr-interview)
- **[55] Final Cheat Sheet**: [/docs/interview-devops-55-final-cheat-sheet](/docs/interview-devops-55-final-cheat-sheet)

---
END OF INDEX FILE
