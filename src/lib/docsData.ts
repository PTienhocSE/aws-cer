export interface DocItem {
  slug: string;
  title: string;
  filename: string;
  categoryTitle: string;
}

export interface DocCategory {
  id: string;
  title: string;
  icon: string;
  items: DocItem[];
}

export const AWS_DOC_TREE: DocCategory[] = [
  {
    id: 'intro',
    title: '📌 Giới thiệu',
    icon: '📌',
    items: [
      { slug: 'README', title: 'Hướng dẫn sử dụng (README)', filename: '00-huong-dan-su-dung.md', categoryTitle: 'Giới thiệu' },
      { slug: '00-tong-quan-overview', title: 'Tổng quan SAA-C03', filename: '00-tong-quan-overview.md', categoryTitle: 'Giới thiệu' },
      { slug: 'SUMMARY', title: 'Tóm tắt tài liệu', filename: 'SUMMARY.md', categoryTitle: 'Giới thiệu' },
    ],
  },
  {
    id: 'services',
    title: '☁️ Dịch vụ AWS',
    icon: '☁️',
    items: [
      { slug: '01-compute-services', title: '01 · Compute Services', filename: '01-compute-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '02-storage-services', title: '02 · Storage Services', filename: '02-storage-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '03-database-services', title: '03 · Database Services', filename: '03-database-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '04-networking-services', title: '04 · Networking Services', filename: '04-networking-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '05-security-services', title: '05 · Security Services', filename: '05-security-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '06-management-governance', title: '06 · Management & Governance', filename: '06-management-governance.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '07-application-integration', title: '07 · Application Integration', filename: '07-application-integration.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '08-developer-tools', title: '08 · Developer Tools', filename: '08-developer-tools.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '09-analytics-bigdata', title: '09 · Analytics & Big Data', filename: '09-analytics-bigdata.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '10-migration-transfer', title: '10 · Migration & Transfer', filename: '10-migration-transfer.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '11-api-integration', title: '11 · API Integration', filename: '11-api-integration.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '12-ml-ai', title: '12 · ML & AI', filename: '12-ml-ai.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '13-other-services', title: '13 · Other Services', filename: '13-other-services.md', categoryTitle: 'Dịch vụ AWS' },
      { slug: '14-so-sanh-services', title: '14 · So sánh Services', filename: '14-so-sanh-services.md', categoryTitle: 'Dịch vụ AWS' },
    ],
  },
  {
    id: 'architecture',
    title: '🏗️ Kiến trúc',
    icon: '🏗️',
    items: [
      { slug: 'A-nen-tang-kien-truc', title: 'A · Nền tảng kiến trúc', filename: 'A-nen-tang-kien-truc.md', categoryTitle: 'Kiến trúc' },
      { slug: 'B-bao-mat-compliance', title: 'B · Bảo mật & Compliance', filename: 'B-bao-mat-compliance.md', categoryTitle: 'Kiến trúc' },
      { slug: 'C-kien-truc-web-app', title: 'C · Kiến trúc Web App', filename: 'C-kien-truc-web-app.md', categoryTitle: 'Kiến trúc' },
      { slug: 'D-kien-truc-luu-tru', title: 'D · Kiến trúc Lưu trữ', filename: 'D-kien-truc-luu-tru.md', categoryTitle: 'Kiến trúc' },
      { slug: 'E-kien-truc-database', title: 'E · Kiến trúc Database', filename: 'E-kien-truc-database.md', categoryTitle: 'Kiến trúc' },
    ],
  },
  {
    id: 'exam-prep',
    title: '🎯 Luyện thi',
    icon: '🎯',
    items: [
      { slug: 'K-kich-ban-thi', title: 'K · Kịch bản thi', filename: 'K-kich-ban-thi.md', categoryTitle: 'Luyện thi' },
      { slug: 'L-quyet-dinh-nhanh', title: 'L · Quyết định nhanh', filename: 'L-quyet-dinh-nhanh.md', categoryTitle: 'Luyện thi' },
      { slug: 'M-keywords-mapping', title: 'M · Keywords Mapping', filename: 'M-keywords-mapping.md', categoryTitle: 'Luyện thi' },
      { slug: 'P-architecture-diagrams', title: 'P · Architecture Diagrams', filename: 'P-architecture-diagrams.md', categoryTitle: 'Luyện thi' },
      { slug: 'Q-service-comparisons', title: 'Q · Service Comparisons', filename: 'Q-service-comparisons.md', categoryTitle: 'Luyện thi' },
      { slug: 'R-performance-benchmarks', title: 'R · Performance Benchmarks', filename: 'R-performance-benchmarks.md', categoryTitle: 'Luyện thi' },
      { slug: 'S-practice-exam', title: 'S · Practice Exam', filename: 'S-practice-exam.md', categoryTitle: 'Luyện thi' },
      { slug: 'T-hands-on-labs', title: 'T · Hands-on Labs', filename: 'T-hands-on-labs.md', categoryTitle: 'Luyện thi' },
    ],
  },
];

export const INTERVIEW_DOC_TREE: DocCategory[] = [
  {
    id: 'interview-intro',
    title: '🎯 Phỏng vấn: Tổng quan & Nền tảng',
    icon: '🎯',
    items: [
      { slug: 'interview-devops', title: 'Mục lục giáo trình phỏng vấn', filename: 'interview-devops/interview-devops.md', categoryTitle: 'Tổng quan & Nền tảng' },
      { slug: 'interview-devops-00-interview-strategy', title: '00 · Chiến lược phỏng vấn System & DevOps', filename: 'interview-devops/interview-devops-00-interview-strategy.md', categoryTitle: 'Tổng quan & Nền tảng' },
      { slug: 'interview-devops-01-computer-system-fundamentals', title: '01 · Computer & System Fundamentals', filename: 'interview-devops/interview-devops-01-computer-system-fundamentals.md', categoryTitle: 'Tổng quan & Nền tảng' },
      { slug: 'interview-devops-02-networking', title: '02 · Enterprise Networking', filename: 'interview-devops/interview-devops-02-networking.md', categoryTitle: 'Tổng quan & Nền tảng' },
    ],
  },
  {
    id: 'interview-sysadmin',
    title: '🐧 Phỏng vấn: Linux & Windows Admin',
    icon: '🐧',
    items: [
      { slug: 'interview-devops-03-linux-administration', title: '03 · Linux Administration', filename: 'interview-devops/interview-devops-03-linux-administration.md', categoryTitle: 'Linux & Windows Admin' },
      { slug: 'interview-devops-04-linux-troubleshooting', title: '04 · Linux Troubleshooting', filename: 'interview-devops/interview-devops-04-linux-troubleshooting.md', categoryTitle: 'Linux & Windows Admin' },
      { slug: 'interview-devops-05-windows-server', title: '05 · Windows Server Administration', filename: 'interview-devops/interview-devops-05-windows-server.md', categoryTitle: 'Linux & Windows Admin' },
      { slug: 'interview-devops-06-active-directory', title: '06 · Active Directory & Domain Services', filename: 'interview-devops/interview-devops-06-active-directory.md', categoryTitle: 'Linux & Windows Admin' },
      { slug: 'interview-devops-07-iis', title: '07 · IIS Web Server', filename: 'interview-devops/interview-devops-07-iis.md', categoryTitle: 'Linux & Windows Admin' },
    ],
  },
  {
    id: 'interview-infra',
    title: '🏗️ Phỏng vấn: Infra, Storage & HA/DR',
    icon: '🏗️',
    items: [
      { slug: 'interview-devops-08-vmware', title: '08 · VMware vSphere & Virtualization', filename: 'interview-devops/interview-devops-08-vmware.md', categoryTitle: 'Infra, Storage & HA/DR' },
      { slug: 'interview-devops-09-server-hardware-storage', title: '09 · Hardware & SAN Storage', filename: 'interview-devops/interview-devops-09-server-hardware-storage.md', categoryTitle: 'Infra, Storage & HA/DR' },
      { slug: 'interview-devops-10-high-availability', title: '10 · High Availability Architecture', filename: 'interview-devops/interview-devops-10-high-availability.md', categoryTitle: 'Infra, Storage & HA/DR' },
      { slug: 'interview-devops-11-multi-dc-architecture', title: '11 · Multi-Data Center Architecture', filename: 'interview-devops/interview-devops-11-multi-dc-architecture.md', categoryTitle: 'Infra, Storage & HA/DR' },
      { slug: 'interview-devops-12-backup-restore', title: '12 · Backup & Restore Strategies', filename: 'interview-devops/interview-devops-12-backup-restore.md', categoryTitle: 'Infra, Storage & HA/DR' },
      { slug: 'interview-devops-13-disaster-recovery', title: '13 · Disaster Recovery (DR)', filename: 'interview-devops/interview-devops-13-disaster-recovery.md', categoryTitle: 'Infra, Storage & HA/DR' },
    ],
  },
  {
    id: 'interview-monitoring',
    title: '📊 Phỏng vấn: Observability & Web/Mail',
    icon: '📊',
    items: [
      { slug: 'interview-devops-14-monitoring-observability', title: '14 · Monitoring & Observability', filename: 'interview-devops/interview-devops-14-monitoring-observability.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-15-prometheus', title: '15 · Prometheus Deep Dive', filename: 'interview-devops/interview-devops-15-prometheus.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-16-grafana', title: '16 · Grafana Dashboarding', filename: 'interview-devops/interview-devops-16-grafana.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-17-grafana-lgtm', title: '17 · Grafana LGTM Stack', filename: 'interview-devops/interview-devops-17-grafana-lgtm.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-18-solarwinds', title: '18 · SolarWinds Orion Platform', filename: 'interview-devops/interview-devops-18-solarwinds.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-19-nginx', title: '19 · Nginx Reverse Proxy', filename: 'interview-devops/interview-devops-19-nginx.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-20-haproxy', title: '20 · HAProxy Load Balancer', filename: 'interview-devops/interview-devops-20-haproxy.md', categoryTitle: 'Observability & Web/Mail' },
      { slug: 'interview-devops-21-microsoft-exchange', title: '21 · Microsoft Exchange Server', filename: 'interview-devops/interview-devops-21-microsoft-exchange.md', categoryTitle: 'Observability & Web/Mail' },
    ],
  },
  {
    id: 'interview-k8s',
    title: '🐳 Phỏng vấn: Docker & Kubernetes',
    icon: '🐳',
    items: [
      { slug: 'interview-devops-22-docker', title: '22 · Docker Engine & Containers', filename: 'interview-devops/interview-devops-22-docker.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-23-kubernetes-fundamentals', title: '23 · Kubernetes Core Objects', filename: 'interview-devops/interview-devops-23-kubernetes-fundamentals.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-24-kubernetes-networking', title: '24 · Kubernetes Networking & CNI', filename: 'interview-devops/interview-devops-24-kubernetes-networking.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-25-kubernetes-storage', title: '25 · Kubernetes Storage & CSI', filename: 'interview-devops/interview-devops-25-kubernetes-storage.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-26-kubernetes-scheduling', title: '26 · Kubernetes Scheduling & Affinity', filename: 'interview-devops/interview-devops-26-kubernetes-scheduling.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-27-kubernetes-security', title: '27 · Kubernetes Security & RBAC', filename: 'interview-devops/interview-devops-27-kubernetes-security.md', categoryTitle: 'Docker & Kubernetes' },
      { slug: 'interview-devops-28-kubernetes-troubleshooting', title: '28 · K8s Pod & Cluster Troubleshooting', filename: 'interview-devops/interview-devops-28-kubernetes-troubleshooting.md', categoryTitle: 'Docker & Kubernetes' },
    ],
  },
  {
    id: 'interview-devops-cicd',
    title: '🔄 Phỏng vấn: CI/CD, GitOps & Registry',
    icon: '🔄',
    items: [
      { slug: 'interview-devops-29-amazon-eks', title: '29 · Amazon EKS Architecture', filename: 'interview-devops/interview-devops-29-amazon-eks.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-30-karpenter', title: '30 · Karpenter Autoscaling', filename: 'interview-devops/interview-devops-30-karpenter.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-31-helm', title: '31 · Helm v3 Package Manager', filename: 'interview-devops/interview-devops-31-helm.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-32-cicd-fundamentals', title: '32 · CI/CD Pipeline Fundamentals', filename: 'interview-devops/interview-devops-32-cicd-fundamentals.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-33-gitlab-ci', title: '33 · GitLab CI & Runners', filename: 'interview-devops/interview-devops-33-gitlab-ci.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-34-github-actions', title: '34 · GitHub Actions & Workflows', filename: 'interview-devops/interview-devops-34-github-actions.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-35-gitops', title: '35 · GitOps Principles', filename: 'interview-devops/interview-devops-35-gitops.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-36-argocd', title: '36 · ArgoCD & GitOps Workflows', filename: 'interview-devops/interview-devops-36-argocd.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-37-terraform-iac', title: '37 · Terraform & Infrastructure as Code', filename: 'interview-devops/interview-devops-37-terraform-iac.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-38-aws', title: '38 · AWS Core Services Architecture', filename: 'interview-devops/interview-devops-38-aws.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-39-container-registry', title: '39 · Container Registries (Harbor/ECR)', filename: 'interview-devops/interview-devops-39-container-registry.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-40-secret-management', title: '40 · Secret Management (Vault/ESO)', filename: 'interview-devops/interview-devops-40-secret-management.md', categoryTitle: 'CI/CD, GitOps & Registry' },
      { slug: 'interview-devops-41-openshift', title: '41 · Red Hat OpenShift Platform', filename: 'interview-devops/interview-devops-41-openshift.md', categoryTitle: 'CI/CD, GitOps & Registry' },
    ],
  },
  {
    id: 'interview-data-sec',
    title: '💾 Phỏng vấn: Data, Security & Incident',
    icon: '💾',
    items: [
      { slug: 'interview-devops-42-kafka-msk', title: '42 · Apache Kafka & Amazon MSK', filename: 'interview-devops/interview-devops-42-kafka-msk.md', categoryTitle: 'Data, Security & Incident' },
      { slug: 'interview-devops-43-postgresql-database-ops', title: '43 · PostgreSQL Operations & HA', filename: 'interview-devops/interview-devops-43-postgresql-database-ops.md', categoryTitle: 'Data, Security & Incident' },
      { slug: 'interview-devops-44-devops-security', title: '44 · DevSecOps & Security Scanning', filename: 'interview-devops/interview-devops-44-devops-security.md', categoryTitle: 'Data, Security & Incident' },
      { slug: 'interview-devops-45-incident-response', title: '45 · SRE Incident Response & RCA', filename: 'interview-devops/interview-devops-45-incident-response.md', categoryTitle: 'Data, Security & Incident' },
      { slug: 'interview-devops-46-production-troubleshooting', title: '46 · Production Troubleshooting', filename: 'interview-devops/interview-devops-46-production-troubleshooting.md', categoryTitle: 'Data, Security & Incident' },
    ],
  },
  {
    id: 'interview-design-mock',
    title: '🎤 Phỏng vấn: System Design & Q&A',
    icon: '🎤',
    items: [
      { slug: 'interview-devops-47-system-design', title: '47 · System Design Methodology', filename: 'interview-devops/interview-devops-47-system-design.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-48-multi-dc-system-design', title: '48 · Multi-DC System Design', filename: 'interview-devops/interview-devops-48-multi-dc-system-design.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-49-devops-architecture', title: '49 · DevOps Architecture Design', filename: 'interview-devops/interview-devops-49-devops-architecture.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-50-cv-based-questions', title: '50 · CV Deep Dive Questions', filename: 'interview-devops/interview-devops-50-cv-based-questions.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-51-technical-interview-questions', title: '51 · Technical Interview Q&A', filename: 'interview-devops/interview-devops-51-technical-interview-questions.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-52-scenario-based-questions', title: '52 · Scenario-Based Q&A', filename: 'interview-devops/interview-devops-52-scenario-based-questions.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-53-behavioral-interview', title: '53 · Behavioral Interview (STAR)', filename: 'interview-devops/interview-devops-53-behavioral-interview.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-54-hr-interview', title: '54 · HR & Salary Negotiation', filename: 'interview-devops/interview-devops-54-hr-interview.md', categoryTitle: 'System Design & Q&A' },
      { slug: 'interview-devops-55-final-cheat-sheet', title: '55 · Final Cheat Sheet', filename: 'interview-devops/interview-devops-55-final-cheat-sheet.md', categoryTitle: 'System Design & Q&A' },
    ],
  },
];

export const DOC_TREE: DocCategory[] = [...AWS_DOC_TREE, ...INTERVIEW_DOC_TREE];

// Flatten list of items for sequential navigation
export const AWS_DOC_ITEMS: DocItem[] = AWS_DOC_TREE.flatMap((cat) => cat.items);
export const INTERVIEW_DOC_ITEMS: DocItem[] = INTERVIEW_DOC_TREE.flatMap((cat) => cat.items);
export const ALL_DOC_ITEMS: DocItem[] = [...AWS_DOC_ITEMS, ...INTERVIEW_DOC_ITEMS];

export function getDocBySlug(slug: string): {
  docItem: DocItem | undefined;
  prevDoc: DocItem | undefined;
  nextDoc: DocItem | undefined;
} {
  const isInterview = slug.toLowerCase().startsWith('interview-devops');
  const targetList = isInterview ? INTERVIEW_DOC_ITEMS : AWS_DOC_ITEMS;

  const index = targetList.findIndex((item) => item.slug.toLowerCase() === slug.toLowerCase());
  if (index === -1) {
    // Fallback search in all items if not found in specific list
    const globalIndex = ALL_DOC_ITEMS.findIndex((item) => item.slug.toLowerCase() === slug.toLowerCase());
    if (globalIndex === -1) {
      return { docItem: undefined, prevDoc: undefined, nextDoc: undefined };
    }
    return {
      docItem: ALL_DOC_ITEMS[globalIndex],
      prevDoc: globalIndex > 0 ? ALL_DOC_ITEMS[globalIndex - 1] : undefined,
      nextDoc: globalIndex < ALL_DOC_ITEMS.length - 1 ? ALL_DOC_ITEMS[globalIndex + 1] : undefined,
    };
  }

  return {
    docItem: targetList[index],
    prevDoc: index > 0 ? targetList[index - 1] : undefined,
    nextDoc: index < targetList.length - 1 ? targetList[index + 1] : undefined,
  };
}
