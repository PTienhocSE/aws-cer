import { Metadata } from 'next';
import CheatSheetFlashcardsClient from '@/components/CheatSheetFlashcardsClient';

export const metadata: Metadata = {
  title: 'Flashcard & Test Kiến Thức Cheat Sheet SAA-C03 | AWS Study Platform',
  description:
    'Học thuộc nhanh và làm bài test trắc nghiệm trực tiếp từ nội dung Cheat Sheet 244 dịch vụ AWS SAA-C03. Hỗ trợ lọc theo chuyên đề, service tag và học mượt trên điện thoại.',
};

export default function FlashcardsPage() {
  return <CheatSheetFlashcardsClient />;
}
