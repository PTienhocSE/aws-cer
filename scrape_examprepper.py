"""
────────────────────────────────────────────────────────────────────────────
CÀI ĐẶT (đã được cấu hình trong môi trường .venv trên ổ D):
    .\run_scrape.bat
    hoặc:
    .venv\\Scripts\\python.exe scrape_examprepper.py

Lần đầu để HEADLESS=False. Nếu checkpoint không tự qua, script sẽ dừng chờ
bạn tự giải trong cửa sổ Chrome rồi bấm ENTER. Sau khi giải 1 lần, cookie
được lưu trong .pw_profile nên các trang sau chạy trơn tru.
────────────────────────────────────────────────────────────────────────────
"""

import os
import sys
import json
import time
import random
from pathlib import Path

# Đảm bảo print luôn flush ngay lập tức
sys.stdout.reconfigure(line_buffering=True)

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ─────────────────────────── CẤU HÌNH FONT (HỖ TRỢ TIẾNG VIỆT) ───────────────────────────
FONT_REGULAR = "Helvetica"
FONT_BOLD = "Helvetica-Bold"

windir = os.environ.get("WINDIR", "C:\\Windows")
arial_path = os.path.join(windir, "Fonts", "arial.ttf")
arial_bd_path = os.path.join(windir, "Fonts", "arialbd.ttf")

if os.path.exists(arial_path):
    try:
        pdfmetrics.registerFont(TTFont("Arial", arial_path))
        FONT_REGULAR = "Arial"
    except Exception:
        pass

if os.path.exists(arial_bd_path):
    try:
        pdfmetrics.registerFont(TTFont("Arial-Bold", arial_bd_path))
        FONT_BOLD = "Arial-Bold"
    except Exception:
        pass

# ─────────────────────────── CẤU HÌNH ───────────────────────────
EXAM_ID       = 32
BASE_URL      = "https://www.examprepper.co/exam/{exam}/{page}"
PER_PAGE      = 5
START_PAGE    = 1
END_PAGE      = None        # None = tự xác định từ numberOfQuestions của trang 1

HEADLESS      = False       # PHẢI False để vượt Security Checkpoint
PAGE_DELAY    = 4.0         # nghỉ cơ bản giữa các trang (giây) — tăng để tránh 429
PAGE_JITTER   = 3.0         # cộng ngẫu nhiên 0..JITTER giây cho tự nhiên hơn
CHALLENGE_WAIT = 120        # giây tối đa chờ vượt thử thách JS

# Xử lý 429 (Too Many Requests): đợi rồi thử lại, đợi tăng dần.
MAX_RETRIES     = 5
BACKOFF_BASE    = 30        # lần chờ đầu khi gặp 429 (giây): 30, 60, 120, ...
RESUME          = True      # True = chạy tiếp từ JSON đã lưu, bỏ qua câu đã có

INCLUDE_EXPLANATION = True  # kèm phần giải thích (answer_description) nếu có
INCLUDE_COMMUNITY   = True  # kèm tỉ lệ vote cộng đồng (answers_community)

USER_DATA_DIR = Path(__file__).parent / ".pw_profile"
OUT_DIR   = Path(__file__).parent
JSON_PATH = OUT_DIR / f"examprepper_{EXAM_ID}_questions.json"
PDF_PATH  = OUT_DIR / f"examprepper_{EXAM_ID}_questions.pdf"


# ─────────── TRÍCH XUẤT CÂU HỎI TỪ JSON __NEXT_DATA__ ───────────
def parse_next_data(html):
    """Trả về (questions_list, total_questions) từ 1 trang."""
    soup = BeautifulSoup(html, "html.parser")
    tag = soup.find("script", id="__NEXT_DATA__")
    if not tag or not tag.string:
        return [], None
    try:
        data = json.loads(tag.string)
    except Exception:
        return [], None
        
    pp = data.get("props", {}).get("pageProps", {})
    raw = pp.get("questions", []) or []
    total = (pp.get("exam", {}) or {}).get("numberOfQuestions")

    out = []
    for q in raw:
        choices = q.get("choices", {}) or {}
        out.append({
            "question_id": q.get("question_id"),
            "question": (q.get("question_text") or "").strip(),
            "choices": {k: (choices[k] or "").strip() for k in sorted(choices)},
            "answer": q.get("answer") or q.get("answer_ET") or "",
            "answer_description": (q.get("answer_description") or "").strip(),
            "answers_community": q.get("answers_community") or [],
            "topic": q.get("topic"),
        })
    return out, total


# ──────────────── VƯỢT VERCEL SECURITY CHECKPOINT ────────────────
def is_checkpoint(page):
    try:
        title = (page.title() or "").lower()
    except Exception:
        title = ""
    if "security checkpoint" in title or "verifying" in title:
        return True
    # Vượt được khi __NEXT_DATA__ đã có mặt
    try:
        return page.query_selector("script#__NEXT_DATA__") is None
    except Exception:
        return True


def wait_for_clearance(page):
    deadline = time.time() + CHALLENGE_WAIT
    while time.time() < deadline:
        if not is_checkpoint(page):
            return True
        time.sleep(1.5)
    return not is_checkpoint(page)


def _is_429(page, resp):
    if resp is not None:
        try:
            if resp.status == 429:
                return True
        except Exception:
            pass
    try:
        body = page.inner_text("body", timeout=1500).lower()
        return "too many requests" in body or "429" in body
    except Exception:
        return False


def load_page(page, url):
    # Vòng lặp thử lại khi gặp 429 (Too Many Requests)
    for attempt in range(MAX_RETRIES + 1):
        resp = None
        try:
            resp = page.goto(url, wait_until="networkidle", timeout=60000)
        except Exception:
            try:
                resp = page.goto(url, wait_until="domcontentloaded", timeout=60000)
            except Exception as e:
                print(f"   ! Không tải được: {e}")
                return None

        if _is_429(page, resp):
            if attempt >= MAX_RETRIES:
                print(f"   ! Vẫn 429 sau {MAX_RETRIES} lần thử — dừng để tránh bị chặn.")
                return None
            wait = BACKOFF_BASE * (2 ** attempt)
            print(f"   ⏳ Bị 429 (Too Many Requests). Đợi {wait}s rồi thử lại "
                  f"(lần {attempt + 1}/{MAX_RETRIES})...")
            time.sleep(wait)
            continue
        break  # không phải 429 → tiếp tục xử lý

    if not wait_for_clearance(page):
        if not HEADLESS:
            print("   ! Checkpoint chưa tự qua. Đang chờ bạn xác minh trên cửa sổ Chrome (tối đa 120s)...")
            for _ in range(60):
                time.sleep(2)
                if not is_checkpoint(page):
                    print("   ✓ Đã vượt qua Checkpoint thành công!")
                    return page.content()
            print("   ! Vẫn là checkpoint — bỏ qua trang này.")
            return None
        else:
            print("   ! Kẹt checkpoint (hãy chạy với HEADLESS=False).")
            return None
    return page.content()


# ─────────────────────────── SCRAPE ───────────────────────────
def scrape():
    all_q = []
    seen = set()

    # RESUME: nạp lại JSON đã lưu để chạy tiếp, không cào lại câu đã có
    resume_from = START_PAGE
    if RESUME and JSON_PATH.exists():
        try:
            all_q = json.loads(JSON_PATH.read_text(encoding="utf-8"))
            for q in all_q:
                seen.add(q.get("question_id") or q.get("question", "")[:60])
            # 5 câu/trang → suy ra trang tiếp theo cần lấy
            resume_from = max(START_PAGE, (len(all_q) // PER_PAGE) + 1)
            print(f"↻ RESUME: đã có {len(all_q)} câu, chạy tiếp từ trang {resume_from}\n")
        except Exception as e:
            print(f"(Không đọc được JSON cũ, bắt đầu lại: {e})")
            all_q, seen, resume_from = [], set(), START_PAGE

    with sync_playwright() as p:
        launch_kwargs = dict(
            user_data_dir=str(USER_DATA_DIR),
            headless=HEADLESS,
            viewport={"width": 1280, "height": 900},
            locale="en-US",
            args=["--disable-blink-features=AutomationControlled",
                  "--disable-infobars"],
            ignore_default_args=["--enable-automation"],
        )
        try:
            context = p.chromium.launch_persistent_context(
                channel="chrome", **launch_kwargs)
        except Exception:
            print("(Không tìm thấy Chrome thật — dùng Chromium mặc định)")
            context = p.chromium.launch_persistent_context(**launch_kwargs)

        page = context.pages[0] if context.pages else context.new_page()
        page.add_init_script(
            "Object.defineProperty(navigator,'webdriver',{get:()=>undefined});")

        # Trang 1: lấy dữ liệu + tổng số câu để tính số trang
        first_url = BASE_URL.format(exam=EXAM_ID, page=START_PAGE)
        print(f"[{START_PAGE}] {first_url}")
        html = load_page(page, first_url)
        if not html:
            context.close()
            return []
        qs, total = parse_next_data(html)
        end_page = END_PAGE
        if end_page is None:
            n = total or len(qs) * 204
            end_page = (n + PER_PAGE - 1) // PER_PAGE
        print(f"   Tổng số câu (site báo): {total} → {end_page} trang")

        def add(qs):
            c = 0
            for q in qs:
                key = q["question_id"] or q["question"][:60]
                if key in seen:
                    continue
                seen.add(key)
                all_q.append(q)
                c += 1
            return c

        print(f"   + {add(qs)} câu (tổng: {len(all_q)})")
        JSON_PATH.write_text(json.dumps(all_q, ensure_ascii=False, indent=2),
                             encoding="utf-8")

        loop_start = max(START_PAGE + 1, resume_from)
        for page_num in range(loop_start, end_page + 1):
            url = BASE_URL.format(exam=EXAM_ID, page=page_num)
            print(f"[{page_num}/{end_page}] {url}")
            html = load_page(page, url)
            if not html:
                print(f"   !! Dừng ở trang {page_num}. Chạy lại script để tiếp tục "
                      f"từ đây (RESUME=True).")
                break
            qs, _ = parse_next_data(html)
            n = add(qs)
            print(f"   + {n} câu (tổng: {len(all_q)})")
            JSON_PATH.write_text(json.dumps(all_q, ensure_ascii=False, indent=2),
                                 encoding="utf-8")
            if n == 0:
                print("   (Không có câu mới trên trang này)")
            time.sleep(PAGE_DELAY + random.uniform(0, PAGE_JITTER))

        context.close()

    return all_q


# ─────────────────────────── XUẤT PDF ───────────────────────────
def esc(s):
    return (str(s or "")).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_pdf(questions):
    styles = getSampleStyleSheet()
    q_style = ParagraphStyle("Q", parent=styles["Normal"], fontSize=11,
                             leading=15, spaceAfter=6, alignment=TA_LEFT,
                             fontName=FONT_BOLD)
    opt_style = ParagraphStyle("Opt", parent=styles["Normal"], fontSize=10,
                               leading=14, leftIndent=14, spaceAfter=2,
                               fontName=FONT_REGULAR)
    opt_correct = ParagraphStyle("OptC", parent=opt_style,
                                 textColor=colors.HexColor("#0a7d29"),
                                 fontName=FONT_BOLD)
    ans_style = ParagraphStyle("Ans", parent=styles["Normal"], fontSize=10,
                               leading=14, spaceBefore=4, spaceAfter=4,
                               textColor=colors.HexColor("#0a7d29"),
                               fontName=FONT_BOLD)
    exp_style = ParagraphStyle("Exp", parent=styles["Normal"], fontSize=9.5,
                               leading=13, textColor=colors.HexColor("#444444"),
                               spaceAfter=4, leftIndent=6,
                               fontName=FONT_REGULAR)
    meta_style = ParagraphStyle("Meta", parent=styles["Normal"], fontSize=8.5,
                                leading=12, textColor=colors.HexColor("#888888"),
                                spaceAfter=8,
                                fontName=FONT_REGULAR)

    doc = SimpleDocTemplate(str(PDF_PATH), pagesize=A4,
                            leftMargin=1.8*cm, rightMargin=1.8*cm,
                            topMargin=1.8*cm, bottomMargin=1.8*cm,
                            title=f"ExamPrepper Exam {EXAM_ID}")
    story = []
    title_style = ParagraphStyle("T", parent=styles["Title"], fontSize=18,
                                 spaceAfter=6, fontName=FONT_BOLD)
    story.append(Paragraph(f"ExamPrepper — Exam {EXAM_ID}", title_style))
    story.append(Paragraph(f"Tổng số câu: {len(questions)}", opt_style))
    story.append(Spacer(1, 12))

    for i, q in enumerate(questions, 1):
        ans = (q.get("answer") or "").strip()
        story.append(Paragraph(f"Câu {i}. {esc(q['question'])}", q_style))
        for letter, text in q.get("choices", {}).items():
            style = opt_correct if letter == ans else opt_style
            mark = " ✓" if letter == ans else ""
            story.append(Paragraph(f"{esc(letter)}. {esc(text)}{mark}", style))
        if ans:
            story.append(Paragraph(f"✅ Đáp án đúng: {esc(ans)}", ans_style))
        if INCLUDE_COMMUNITY and q.get("answers_community"):
            comm = ", ".join(str(x) for x in q["answers_community"])
            story.append(Paragraph(f"Cộng đồng: {esc(comm)}", meta_style))
        if INCLUDE_EXPLANATION and q.get("answer_description"):
            story.append(Paragraph(f"Giải thích: {esc(q['answer_description'])}",
                                   exp_style))
        story.append(HRFlowable(width="100%", thickness=0.5,
                                color=colors.HexColor("#dddddd"),
                                spaceBefore=4, spaceAfter=10))

    doc.build(story)
    print(f"\n✔ Đã tạo PDF: {PDF_PATH}  ({len(questions)} câu)")


# ─────────────────────────── MAIN ───────────────────────────
if __name__ == "__main__":
    print(f"Scrape exam {EXAM_ID} (parse JSON __NEXT_DATA__)\n")
    data = scrape()
    print(f"\nTổng cộng lấy được {len(data)} câu hỏi.")
    if data:
        build_pdf(data)
    else:
        print("Không lấy được câu nào — kiểm tra lại checkpoint/kết nối.")
