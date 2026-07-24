import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'AWS Certification Study Platform',
  description: 'Nền tảng luyện thi chứng chỉ AWS với Spaced Repetition, Mock Exam và Note thông minh.',
  icons: {
    icon: '/amazon-web-services-logo.png',
    shortcut: '/amazon-web-services-logo.png',
    apple: '/amazon-web-services-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 min-h-screen text-slate-800 antialiased flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
