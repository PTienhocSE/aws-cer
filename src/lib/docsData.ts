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

export const DOC_TREE: DocCategory[] = [
  {
    id: 'intro',
    title: '📌 Giới thiệu',
    icon: '📌',
    items: [
      { slug: 'README', title: 'Hướng dẫn sử dụng (README)', filename: 'README.md', categoryTitle: 'Giới thiệu' },
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

// Flatten list of items for sequential navigation
export const ALL_DOC_ITEMS: DocItem[] = DOC_TREE.flatMap((cat) => cat.items);

export function getDocBySlug(slug: string): {
  docItem: DocItem | undefined;
  prevDoc: DocItem | undefined;
  nextDoc: DocItem | undefined;
} {
  const index = ALL_DOC_ITEMS.findIndex((item) => item.slug.toLowerCase() === slug.toLowerCase());
  if (index === -1) {
    return { docItem: undefined, prevDoc: undefined, nextDoc: undefined };
  }
  return {
    docItem: ALL_DOC_ITEMS[index],
    prevDoc: index > 0 ? ALL_DOC_ITEMS[index - 1] : undefined,
    nextDoc: index < ALL_DOC_ITEMS.length - 1 ? ALL_DOC_ITEMS[index + 1] : undefined,
  };
}
