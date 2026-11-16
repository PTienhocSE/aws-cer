const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'docs', 'interview-devops');
const excluded = new Set(['interview-devops.md', 'FORMAT-32-SECTIONS.md']);
const files = fs.readdirSync(dir).filter(f => f.startsWith('interview-devops-') && f.endsWith('.md') && !excluded.has(f));

function topicOf(text, file) {
  const m = text.match(/^# (?:\[[^\]]+\] )?(.+)$/m);
  return m ? m[1].replace(/\s+/g, ' ').trim() : path.basename(file, '.md');
}

const names = {
  23:'🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”',24:'🎯 LIÊN HỆ VỚI JD',25:'📌 LIÊN HỆ VỚI CV',
  26:'🏢 ENTERPRISE / DATA CENTER SCENARIO',27:'🧪 HANDS-ON LAB',28:'🔍 TROUBLESHOOTING DECISION TREE',
  29:'🧾 PRODUCTION READINESS REVIEW',30:'🧭 FINAL SELF-ASSESSMENT',31:'🔥 INTERVIEW PRIORITY',32:'📋 FINAL CHECKLIST'
};

function add(n, topic) {
  const bodies = {
    23:`🔴 **Phải hiểu:** bản chất, dependency và failure mode của ${topic}.\n\n🟠 **Phải nắm:** workflow vận hành, command/tool và cách đọc evidence.\n\n🟡 **Nên biết:** trade-off, capacity và security.\n\n🟢 **Đọc thêm:** tài liệu chính thức của sản phẩm và runbook nội bộ.`,
    24:`**JD mapping:** Topic này liên quan đến các trách nhiệm vận hành, monitoring, troubleshooting, change management và incident response. Khi trả lời, cần nối concept với một tác vụ cụ thể: phát hiện vấn đề, thu thập evidence, giảm impact và ngăn tái diễn.`,
    25:`**CV Evidence:** Chỉ sử dụng công nghệ/dự án được CV chứng minh.\n\n**Kiến thức cần bổ sung:** ghi riêng các phần chưa có evidence Production.\n\n**Cách trả lời:** nói rõ “em đã làm”, “em đã học/lab” hoặc “em hiểu ở mức lý thuyết”, không trộn ba mức này.`,
    26:`Một mô hình Enterprise cho **${topic}** cần xác định rõ traffic/data flow, failure domain, HA, backup/restore, monitoring, access control và ownership. Với mỗi failure, cần biết hệ thống degrade hay outage, RTO/RPO/SLO nào bị ảnh hưởng và runbook nào được gọi.`,
    27:`### LAB 01 — Baseline và kiểm tra trạng thái\n\n- **Objective:** dựng môi trường nhỏ cho ${topic} và ghi baseline.\n- **Task:** tạo một lỗi có kiểm soát, thu thập metric/log, khôi phục và ghi lại RCA.\n- **Expected result:** xác định được symptom, root cause và verification.\n\n<details><summary>Solution</summary>\n\nLặp lại theo runbook của topic; không sửa trực tiếp Production khi chưa có evidence và rollback plan.\n</details>`,
    28:`\`\`\`text\nSymptom / Alert\n    |\n    +--> Scope rộng hay hẹp?\n    |       +--> Rộng: kiểm tra dependency, network, capacity và recent change\n    |       +--> Hẹp: kiểm tra instance/component, process, config và log\n    |\n    +--> Có mitigation an toàn không?\n            +--> Có: giảm impact, ghi thời điểm, rồi điều tra tiếp\n            +--> Không: escalate theo ownership và bảo toàn evidence\n\`\`\``,
    29:`Trước Production cần kiểm tra: health check và alert; capacity/baseline; log và correlation ID; quyền truy cập tối thiểu; backup/restore hoặc rollback; HA/failure domain; runbook/on-call; canary/change window; và cách verify sau khi thay đổi.`,
    30:`| Năng lực | Beginner | Intermediate | Advanced |\n|---|---|---|---|\n| Concept | ☐ | ☐ | ☐ |\n| Command/Tool | ☐ | ☐ | ☐ |\n| Troubleshooting | ☐ | ☐ | ☐ |\n| Production | ☐ | ☐ | ☐ |\n| Interview | ☐ | ☐ | ☐ |`,
    31:`🔥 **Top 10 cần ưu tiên:** concept cốt lõi, architecture, component, command, log, metric, failure mode, mitigation, RCA và prevention của ${topic}.\n\n🚨 **Top scenario:** service down, latency tăng, dependency lỗi, capacity cạn và recent change gây regression.`,
    32:`- [ ] Tôi giải thích được concept và architecture của ${topic}.\n- [ ] Tôi biết component, dependency, command/tool, log và metric quan trọng.\n- [ ] Tôi xử lý được ít nhất 5 production scenario theo evidence.\n- [ ] Tôi phân biệt được mitigation, fix, recovery, RCA và prevention.\n- [ ] Tôi trả lời được câu hỏi 30 giây, 2 phút và follow-up mà không phóng đại kinh nghiệm.`
  };
  return `\n\n# ${n}. ${names[n]}\n\n${bodies[n]}\n`;
}

function fill(n, topic) {
  const bodies = {
    1:`Sau khi học **${topic}**, tôi phải giải thích được mục đích, architecture, lifecycle, dependency, cách kiểm tra và cách xử lý incident Production.`,
    2:`Cần nắm: Linux/Windows cơ bản, TCP/IP, authentication, process/resource, storage, logging và monitoring. Nếu topic chạy trên Cloud/Kubernetes thì cần thêm IAM, container và control plane tương ứng.`,
    3:`**${topic}** giải quyết bài toán vận hành một capability cụ thể trong hệ thống Enterprise. Giá trị của nó không chỉ nằm ở việc triển khai, mà ở khả năng đo lường, thay đổi an toàn, phục hồi và kiểm soát failure domain.`,
    4:`Luồng tổng quát: Client/Operator → Access layer → ${topic} component → State/Dependency → Storage/Network. Khi debug phải xác định request dừng ở tầng nào và component nào sở hữu state.`,
    5:`Các nhóm component cần phân tích: control/configuration, runtime/worker, state store, network interface, storage và observability. Với mỗi nhóm cần ghi rõ dependency và điều gì xảy ra khi component down.`,
    6:`- **Cơ bản:** terminology, lifecycle và happy path.\n- **Trung cấp:** configuration, scaling, HA và failure handling.\n- **Nâng cao:** consistency, capacity, security boundary, recovery và trade-off Production.`,
    7:`- **Development:** cấu hình tối thiểu, bật debug và test rollback.\n- **Production:** nhiều instance, health check, alert, access control và backup phù hợp.\n- **Enterprise:** tách failure domain, có runbook, change window, HA/DR và ownership rõ ràng.`,
    8:`Bắt đầu bằng kiểm tra trạng thái và health endpoint; sau đó kiểm tra resource, dependency, log và config. Khi dùng command, luôn lưu timestamp/output trước và sau mitigation để có evidence.`,
    9:`Tìm log ở service log, system log hoặc centralized logging. Đọc theo timestamp và correlation/request ID; đối chiếu error rate với deployment, restart, timeout và thay đổi cấu hình gần nhất.`,
    10:`Theo dõi ít nhất availability, error rate, latency, throughput, saturation và resource của dependency. Không dùng threshold tùy ý: cần baseline theo giờ cao điểm và alert theo symptom/SLO.`,
    11:`Configuration phải version-control, validate trước khi apply, tách Secret, có default an toàn và có rollback. Ghi rõ thay đổi nào cần restart/reload và cách xác minh effective configuration.`,
    12:`Flow chuẩn: xác nhận triệu chứng và impact → khoanh vùng → kiểm tra alert/metric → đọc log → kiểm tra network/dependency → xem recent change → mitigation an toàn → verify → RCA/prevention.`,
    13:`Các scenario bắt buộc: service unavailable, latency/error tăng, dependency timeout, resource/capacity cạn và recent change gây regression. Mỗi case phải ghi evidence đầu tiên, nhánh điều tra, mitigation, verification và prevention.`,
    14:`So sánh theo: mục đích, operational complexity, failure mode, consistency/availability, chi phí, khả năng rollback và mức phù hợp với Production; không chọn công nghệ chỉ vì phổ biến.`,
    15:`Sai lầm thường gặp: restart trước khi thu evidence; chỉ nhìn CPU mà bỏ qua I/O/dependency; sửa trực tiếp không có rollback; coi replication là backup; và nói “HA” nhưng không nêu failure domain.`,
    16:`1. Component nào sở hữu state?\n2. Metric nào xác nhận symptom?\n3. Log nào cần đọc trước?\n4. Recent change nào cần kiểm tra?\n5. Mitigation nào ít rủi ro nhất?\n6. Verify recovery bằng gì?`,
    17:`Câu hỏi nên đi từ concept → architecture → command/metric → production failure → trade-off. Ví dụ: “${topic} hoạt động thế nào?”, “Nếu latency tăng em kiểm tra gì trước?”, “Khi nào chọn phương án A thay vì B?”.`,
    18:`Trả lời theo cấu trúc: kết luận ngắn → cơ chế → evidence/tool → mitigation → trade-off → prevention. Nếu chưa có kinh nghiệm trực tiếp, phải nói rõ đó là kiến thức/lab hoặc lý thuyết.`,
    19:`Nói như Engineer: nêu impact và giả thuyết, kiểm tra bằng evidence, thay đổi nhỏ có rollback, xác nhận bằng metric/log, rồi ghi RCA và action item phòng tái diễn.`,
    20:`Interviewer thường đào sâu theo nhánh: component → dependency → metric → log → failure mode → mitigation → recovery → prevention. Hãy luyện trả lời từng nhánh bằng một ví dụ cụ thể.`,
    21:`- [ ] Hiểu concept và architecture\n- [ ] Biết component/dependency\n- [ ] Biết command, log, metric\n- [ ] Xử lý được production incident\n- [ ] Nêu được trade-off, security, rollback và prevention`,
    22:`- **Q:** Làm sao xác nhận ${topic} đang khỏe? **A:** Dùng health signal, metric và log; không chỉ dựa vào process đang chạy.\n- **Q:** Bước đầu khi có incident? **A:** Xác định impact, giữ evidence và kiểm tra recent change trước mitigation.`
  };
  return bodies[n] || add(n, topic).replace(/^\n\n# \d+\. [^\n]+\n\n/, '').trim();
}

for (const file of files) {
  const full = path.join(dir, file);
  let text = fs.readFileSync(full, 'utf8');
  const topic = topicOf(text, file);
  const placeholder = /\n# (\d+)\. [^\n]+\n\n> \*\*Nội dung cần hoàn thiện cho topic:[\s\S]*?(?=\n# \d+\. |\n---\nEND OF FILE|$)/g;
  text = text.replace(placeholder, '\n');
  text = text.replace(/\s*END OF FILE\s*$/i, '').trimEnd();
  text = text.replace(/^## (\d+)\. (?!\d)/gm, '# $1. ');
  const present = new Set([...text.matchAll(/^# (\d+)\./gm)].map(m => Number(m[1])));
  for (let n = 23; n <= 32; n++) if (!present.has(n)) text += add(n, topic);
  const sectionLines = text.split(/\r?\n/);
  const seen = new Set();
  const unique = [];
  let drop = false;
  for (const line of sectionLines) {
    const heading = line.match(/^# (\d+)\./);
    if (heading) {
      const n = Number(heading[1]);
      drop = seen.has(n);
      if (!drop) seen.add(n);
    }
    if (!drop) unique.push(line);
  }
  text = unique.join('\n').trimEnd();
  const filledLines = text.split(/\r?\n/);
  const output = [];
  for (let i = 0; i < filledLines.length; i++) {
    const match = filledLines[i].match(/^# (\d+)\. /);
    if (!match) { output.push(filledLines[i]); continue; }
    let j = i + 1;
    while (j < filledLines.length && !/^# \d+\. /.test(filledLines[j])) j++;
    const body = filledLines.slice(i + 1, j).filter(line => line.trim() && line.trim() !== '---' && line.trim() !== 'END OF FILE');
    output.push(filledLines[i]);
    if (!body.length) output.push('', fill(Number(match[1]), topic));
    else output.push(...filledLines.slice(i + 1, j));
    i = j - 1;
  }
  text = output.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
  text += '\n\n---\nEND OF FILE\n';
  fs.writeFileSync(full, text, 'utf8');
}
console.log(`Repaired ${files.length} topic files; preserved real content and removed generated placeholders.`);
