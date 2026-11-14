@echo off
cd /d "%~dp0"
set PYTHONUNBUFFERED=1
echo ============================================================
echo   ExamPrepper Question Scraper (Exam 32)
echo ============================================================
echo.
echo Dang khoi dong trinh cao du lieu voi Playwright...
echo Luu y: Neu trinh duyet Chrome mo len va yeu cau xac minh Vercel Checkpoint,
echo ban hay tich chon tren trinh duyet va doi trang tai xong, sau do quay lai
echo cua so nay go ENTER neu duoc hoi.
echo.
".venv\Scripts\python.exe" -u scrape_examprepper.py
echo.
pause
