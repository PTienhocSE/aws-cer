# AWS Certification Study Platform

Nền tảng luyện thi chứng chỉ AWS với hệ thống SRS (Spaced Repetition System) tích hợp.

## Tính năng chính

- 📚 **Ngân hàng câu hỏi** — Duyệt, lọc và tìm kiếm câu hỏi theo domain/difficulty
- 🎯 **Luyện tập SRS** — Hệ thống ôn tập thông minh theo thuật toán SM-2, tự động lên lịch câu hỏi cần ôn
- 📝 **Thi thử** — Đề thi mô phỏng với đếm giờ ngược, palette câu hỏi và tính điểm chi tiết
- 🔖 **Bookmark & Highlight** — Đánh dấu câu hỏi và tô màu từ khóa quan trọng
- 📓 **Ghi chú cá nhân** — Ghi chú riêng tự động lưu theo từng câu hỏi
- 👤 **Trang cá nhân** — Theo dõi tiến độ học tập, chuỗi ngày học (streak), các môn đang học
- 📊 **Dashboard** — Biểu đồ thống kê, lịch học và tiến độ toàn diện

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite + Prisma ORM
- **State Management**: Zustand + TanStack Query
- **Auth**: JWT (cookie-based)
- **Language**: TypeScript

## Cài đặt

```bash
# Cài dependencies
npm install

# Chạy migration database
npx prisma migrate dev

# Seed dữ liệu mẫu (nếu có)
npx prisma db seed

# Chạy dev server
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000)

## Cấu trúc dự án

```
src/
├── app/
│   ├── api/           # API Routes (Next.js Route Handlers)
│   ├── exam/          # Trang thi thử
│   ├── practice/      # Trang luyện tập SRS
│   ├── profile/       # Trang cá nhân
│   ├── questions/     # Ngân hàng câu hỏi
│   └── review/        # Ôn tập SRS
├── components/        # React components dùng chung
├── lib/               # Utilities (prisma, auth, ...)
└── store/             # Zustand stores
prisma/
├── schema.prisma      # Database schema
└── migrations/        # Migration history
```

## Biến môi trường

Tạo file `.env.local`:

```env
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=file:./dev.db
```
