import { Metadata } from 'next';
import CheatSheetClient from '@/components/CheatSheetClient';

export const metadata: Metadata = {
  title: 'AWS SAA-C03 Cheat Sheet | Bảng Tra Cứu Toàn Diện Dịch Vụ AWS',
  description:
    'Bảng tra cứu và so sánh 244 dịch vụ AWS theo 16 chuyên đề chính thức của kỳ thi AWS Certified Solutions Architect - Associate (SAA-C03). Tra cứu scenario đề thi, khi nào chọn và mẹo phân biệt đáp án.',
  keywords: [
    'AWS Cheat Sheet',
    'SAA-C03 Cheat Sheet',
    'Tra cứu dịch vụ AWS',
    'AWS Certified Solutions Architect Associate',
    'So sánh dịch vụ AWS',
    'Mẹo thi SAA-C03',
  ],
};

export default function CheatSeatSaaPage() {
  return <CheatSheetClient />;
}
