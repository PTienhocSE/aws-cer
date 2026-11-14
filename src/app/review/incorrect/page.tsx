'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IncorrectAnswersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/review?status=INCORRECT');
  }, [router]);

  return (
    <div className="py-24 text-center text-slate-500 font-bold text-sm">
      Đang chuyển đến danh sách câu hỏi làm sai...
    </div>
  );
}
