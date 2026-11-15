import csv
import json
import io

TAB_METADATA = [
    {
        'id': 'compute',
        'title': 'Compute',
        'vietnameseTitle': 'Máy chủ & Điện toán',
        'icon': 'Server',
        'color': 'amber',
        'badge': '19 dịch vụ',
        'description': 'Amazon EC2, Instance Families, Spot, RI, Savings Plans, Placement Groups, ASG, Lambda, Beanstalk, Batch, App Runner, Outposts, v.v.'
    },
    {
        'id': 'containers',
        'title': 'Containers',
        'vietnameseTitle': 'Container & Điều phối',
        'icon': 'Box',
        'color': 'blue',
        'badge': '9 dịch vụ',
        'description': 'ECS, EKS, Fargate, ECR, Node Types, ECS/EKS Anywhere, App Runner, Bảng chọn nhanh container'
    },
    {
        'id': 'storage',
        'title': 'Storage',
        'vietnameseTitle': 'Lưu trữ dữ liệu',
        'icon': 'HardDrive',
        'color': 'emerald',
        'badge': '25 dịch vụ',
        'description': 'S3 Storage Classes, Lifecycle, Object Lock, Replication, EBS Types, Snapshots, EFS, FSx các loại, Storage Gateway, Backup'
    },
    {
        'id': 'database',
        'title': 'Database',
        'vietnameseTitle': 'Cơ sở dữ liệu',
        'icon': 'Database',
        'color': 'indigo',
        'badge': '23 dịch vụ',
        'description': 'RDS Multi-AZ, Read Replicas, Aurora, Serverless v2, DynamoDB, DAX, Streams, ElastiCache, Redshift, DocumentDB, Neptune, Timestream'
    },
    {
        'id': 'networking',
        'title': 'Networking & Content',
        'vietnameseTitle': 'Mạng & Phân phối nội dung',
        'icon': 'Network',
        'color': 'cyan',
        'badge': '27 dịch vụ',
        'description': 'VPC, Subnet, IGW, NAT GW, SG vs NACL, Peering, PrivateLink, Transit Gateway, VPN, Direct Connect, ALB, NLB, CloudFront, Route 53'
    },
    {
        'id': 'security',
        'title': 'Security & IAM',
        'vietnameseTitle': 'Bảo mật & Phân quyền',
        'icon': 'ShieldCheck',
        'color': 'rose',
        'badge': '23 dịch vụ',
        'description': 'IAM Roles/Policies, SCP, Organizations, Cognito, KMS, Secrets Manager vs Parameter Store, WAF, Shield, GuardDuty, Inspector, Macie'
    },
    {
        'id': 'app-integration',
        'title': 'App Integration',
        'vietnameseTitle': 'Tích hợp ứng dụng & Queue',
        'icon': 'Layers',
        'color': 'violet',
        'badge': '13 dịch vụ',
        'description': 'SQS Standard vs FIFO, SNS, Fan-out pattern, EventBridge, Step Functions, Amazon MQ, AppFlow, AppSync'
    },
    {
        'id': 'analytics',
        'title': 'Analytics & Big Data',
        'vietnameseTitle': 'Phân tích & Big Data',
        'icon': 'BarChart3',
        'color': 'sky',
        'badge': '14 dịch vụ',
        'description': 'Athena, Kinesis Data Streams, Data Firehose, Flink, MSK (Kafka), EMR, Glue, Lake Formation, OpenSearch, QuickSight'
    },
    {
        'id': 'migration',
        'title': 'Migration & Transfer',
        'vietnameseTitle': 'Di chuyển hạ tầng & Dữ liệu',
        'icon': 'ArrowRightLeft',
        'color': 'teal',
        'badge': '14 dịch vụ',
        'description': 'Chiến lược 7Rs, Application Discovery, MGN (Rehost), DMS, SCT, DataSync, Transfer Family, Snow Family, DRS'
    },
    {
        'id': 'management',
        'title': 'Management & Governance',
        'vietnameseTitle': 'Quản trị & Giám sát',
        'icon': 'Sliders',
        'color': 'orange',
        'badge': '17 dịch vụ',
        'description': 'CloudWatch Metrics/Alarms/Logs, CloudTrail, AWS Config, CloudFormation, Systems Manager (SSM), Control Tower, Compute Optimizer'
    },
    {
        'id': 'cost',
        'title': 'Cost Management',
        'vietnameseTitle': 'Quản lý & Tối ưu chi phí',
        'icon': 'Coins',
        'color': 'yellow',
        'badge': '10 dịch vụ',
        'description': 'Cost Explorer, Budgets, CUR, Cost Allocation Tags, Cost Anomaly Detection, Tối ưu hóa Data Transfer và Compute'
    },
    {
        'id': 'ml-ai',
        'title': 'Machine Learning & AI',
        'vietnameseTitle': 'Học máy & Trí tuệ nhân tạo',
        'icon': 'Brain',
        'color': 'fuchsia',
        'badge': '15 dịch vụ',
        'description': 'SageMaker, Bedrock, Rekognition, Textract, Comprehend, Transcribe, Polly, Translate, Lex, Kendra, Personalize'
    },
    {
        'id': 'media',
        'title': 'Media Services',
        'vietnameseTitle': 'Truyền thông & Xử lý Video',
        'icon': 'Video',
        'color': 'purple',
        'badge': '7 dịch vụ',
        'description': 'Elastic Transcoder, MediaConvert, Kinesis Video Streams, IVS, MediaLive, MediaPackage, Các kiến trúc Video đề SAA'
    },
    {
        'id': 'frontend-mobile',
        'title': 'Frontend & Mobile',
        'vietnameseTitle': 'Web & Thiết bị di động',
        'icon': 'Smartphone',
        'color': 'pink',
        'badge': '6 dịch vụ',
        'description': 'AWS Amplify, AppSync GraphQL, Device Farm test thiết bị thật, Location Service, Pinpoint'
    },
    {
        'id': 'dev-tools',
        'title': 'Developer Tools',
        'vietnameseTitle': 'Công cụ lập trình & CI/CD',
        'icon': 'Terminal',
        'color': 'slate',
        'badge': '10 dịch vụ',
        'description': 'X-Ray Tracing, CodePipeline, CodeBuild, CodeDeploy, CodeCommit, CodeArtifact, CloudShell, CDK & SAM'
    },
    {
        'id': 'serverless',
        'title': 'Serverless',
        'vietnameseTitle': 'Kiến trúc Serverless',
        'icon': 'Zap',
        'color': 'amber',
        'badge': '12 dịch vụ',
        'description': 'Đặc trưng serverless, Lambda, Fargate, API GW, DynamoDB, S3, EventBridge, Kiến trúc & Giới hạn serverless cần nhớ'
    }
]

with open('scripts/raw_cheatsheet.csv', 'r', encoding='utf-8') as f:
    text = f.read()

sections = text.split('STT,Tên service,Dùng để làm gì,Dùng trong scenario nào,Note')
categories = []
global_id = 1

for idx, sec in enumerate(sections[1:]):
    meta = TAB_METADATA[idx]
    reader = csv.reader(io.StringIO(sec.strip()))
    items = []
    for row in reader:
        if not row or not any(row):
            continue
        try:
            stt = int(row[0].strip())
        except:
            stt = len(items) + 1
        name = row[1].strip() if len(row) > 1 else ''
        purpose = row[2].strip() if len(row) > 2 else ''
        scenario = row[3].strip() if len(row) > 3 else ''
        note = row[4].strip() if len(row) > 4 else ''
        is_quick_pick = name.lower().startswith('bảng chọn nhanh') or 'so sánh' in name.lower() or 'pattern' in name.lower() or 'chiến lược' in name.lower() or 'giới hạn' in name.lower() or 'ước tính' in name.lower()

        items.append({
            'id': f"{meta['id']}-{stt}",
            'globalId': global_id,
            'stt': stt,
            'name': name,
            'purpose': purpose,
            'scenario': scenario,
            'note': note,
            'categoryId': meta['id'],
            'categoryTitle': meta['title'],
            'isQuickPick': is_quick_pick
        })
        global_id += 1

    categories.append({
        **meta,
        'itemCount': len(items),
        'items': items
    })

ts_content = f"""// AWS SAA-C03 Cheat Sheet Dataset
// Generated automatically from verified exam syllabus dataset

export interface CheatSheetItem {{
  id: string;
  globalId: number;
  stt: number;
  name: string;
  purpose: string;
  scenario: string;
  note: string;
  categoryId: string;
  categoryTitle: string;
  isQuickPick: boolean;
}}

export interface CheatSheetCategory {{
  id: string;
  title: string;
  vietnameseTitle: string;
  icon: string;
  color: string;
  badge: string;
  description: string;
  itemCount: number;
  items: CheatSheetItem[];
}}

export const CHEATSHEET_CATEGORIES: CheatSheetCategory[] = {json.dumps(categories, ensure_ascii=False, indent=2)};

export function getAllCheatSheetItems(): CheatSheetItem[] {{
  return CHEATSHEET_CATEGORIES.flatMap((c) => c.items);
}}

export function getCheatSheetCategory(id: string): CheatSheetCategory | undefined {{
  return CHEATSHEET_CATEGORIES.find((c) => c.id === id);
}}
"""

with open('src/lib/cheatSheetData.ts', 'w', encoding='utf-8') as out:
    out.write(ts_content)

print(f"Successfully generated src/lib/cheatSheetData.ts with {len(categories)} categories and {global_id - 1} items.")
