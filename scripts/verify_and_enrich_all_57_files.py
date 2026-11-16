import os
import glob

interview_dir = r"d:\Workspace\Work\aws-cer\docs\interview-devops"
files = glob.glob(os.path.join(interview_dir, "*.md"))

print(f"Total markdown files in {interview_dir}: {len(files)}")
for f in sorted(files):
    name = os.path.basename(f)
    size = os.path.getsize(f)
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        has_32 = any("# 32." in line or "# 30." in line for line in lines)
    print(f"- {name}: {size} bytes, lines: {len(lines)}")

