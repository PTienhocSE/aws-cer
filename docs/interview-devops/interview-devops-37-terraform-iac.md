# Terraform Infrastructure as Code - Exhaustive Interview Preparation Guide

## 1. Mục tiêu học
- Hiểu sâu về nguyên lý hoạt động của Terraform (State, Provider, Plan/Apply lifecycle).
- Nắm vững best practices quản lý IaC cho Enterprise/Multi-Environment.
- Giải quyết được các tình huống sự cố thực tế trên Production.

## 2. Kiến thức nền cần biết
- Kiến trúc Cloud (AWS/Azure/GCP).
- Khái niệm về Infrastructure as Code (IaC), Declarative vs Imperative.
- Version Control Systems (Git), CI/CD (GitOps).

## 3. Tổng quan (Enterprise & Tan Cang Sai Gon Enterprise Context)
- **Enterprise Context:** Quản lý hạ tầng quy mô lớn, tái sử dụng code qua Module, kiểm soát rủi ro bằng Terraform State và State Locking.
- **Enterprise Context:** Chuyển đổi từ cấu hình hạ tầng thủ công sang tự động hoá hoàn toàn (Provision EKS, Kafka, RDS). Terraform là cốt lõi để chuẩn hoá và versioning hạ tầng cho TOS. 
- **Candidate CV Alignment:** Sử dụng Terraform để build AWS EKS, RDS, MSK. 

## 4. Kiến trúc / Cách hoạt động (ASCII Diagrams)
```text
[ Terraform CLI ] ---> (Reads .tf files & tfvars)
       |
       v
[ Core Engine ] -----> (Compares Code vs Current State in terraform.tfstate)
       |
       v
[ AWS Provider ] ----> (Makes API calls to AWS)
       |
       v
[ AWS Cloud (VPC, EC2, EKS) ]
```

## 5. Các thành phần quan trọng (Components, failure modes)
- **State File (.tfstate):** *Failure mode:* Corrupted state, mâu thuẫn state (State out of sync).
- **Backend (S3 + DynamoDB):** *Failure mode:* Quên lock state dẫn đến Race condition khi nhiều người cùng chạy `apply`.
- **Providers:** *Failure mode:* Lỗi version hoặc API limits (Rate throttling).
- **Modules:** *Failure mode:* Breaking changes khi update version module con.

## 6. Các concept quan trọng
- **Cơ bản:** resource, data source, variables, outputs.
- **Trung cấp:** remote backend, state locking, modules, workspaces.
- **Nâng cao:** count vs for_each, dynamic blocks, import state, taints, lifecycle (create_before_destroy).

## 7. Ví dụ thực tế
- **Dev:** Dùng local state hoặc một workspace riêng, apply trực tiếp từ máy cá nhân.
- **Prod:** Bắt buộc dùng CI/CD (như Atlantis, GitHub Actions) để chạy `plan` -> Approve -> `apply`.
- **Enterprise/Multi-DC:** Tổ chức thư mục theo môi trường và region (e.g., `prod/us-east-1/eks/`), dùng Terragrunt để DRY (Don't Repeat Yourself).

## 8. Command / Tool cần biết
- `terraform init, plan, apply, destroy`
- `terraform state list`, `terraform state rm`, `terraform import`
- `terraform fmt`, `terraform validate`
- **Tools:** `tflint`, `tfsec` (Security scan), `infracost` (Tính chi phí), `terragrunt`.

## 9. Log (locations, interpretation, correlation)
- Terraform log không lưu ra file mặc định. 
- Cấu hình biến môi trường `TF_LOG=DEBUG` (hoặc TRACE, INFO, WARN, ERROR) và `TF_LOG_PATH=terraform.log` để debug khi có lỗi API hoặc Provider không mong muốn.

## 10. Metric
- Thời gian chạy pipeline (Plan/Apply duration).
- Số lượng tài nguyên thay đổi (Add/Change/Destroy). (Cảnh báo nếu Destroy > 0 trên Prod).

## 11. Configuration (Sample configs)
```hcl
# Cấu hình Remote Backend an toàn
terraform {
  backend "s3" {
    bucket         = "snp-terraform-state-prod"
    key            = "eks/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "snp-terraform-lock" # Chống Race condition
    encrypt        = true
  }
}
```

## 12. Troubleshooting Methodology
1. Đọc kĩ output của `terraform plan` hoặc lỗi của `apply`.
2. Kiểm tra lại thông tin credentials và IAM permissions.
3. Nếu lỗi là do tài nguyên đã bị xóa tay trên Cloud: Dùng `terraform refresh` (hoặc plan).
4. Nếu State bị lệch do đổi tên resource: Dùng `terraform state mv` thay vì xóa/tạo lại.
5. Kiểm tra version của Provider và Terraform.

## 13. Production Incident (5 Detailed Scenarios)
- **Scenario 1: Race Condition mất State**
  - *Symptom:* Hai kỹ sư cùng apply, file state bị ghi đè gây hỏng hạ tầng.
  - *Fix/Prevention:* Luôn dùng Remote Backend có cơ chế Locking (như S3 + DynamoDB).
- **Scenario 2: Manual Changes (Drift Configuration)**
  - *Symptom:* Một ai đó đổi Security Group thủ công trên AWS console. `terraform plan` báo cần revert.
  - *Fix:* Cập nhật code Terraform cho khớp với thực tế hoặc apply để đưa hạ tầng về chuẩn.
- **Scenario 3: API Rate Limiting**
  - *Symptom:* `apply` lỗi với mã 429 Too Many Requests (đặc biệt khi tạo hàng loạt IAM rules).
  - *Fix:* Cấu hình `max_retries` trong provider hoặc giảm concurrency (chạy ít resource đồng thời).
- **Scenario 4: Lỗi phá hủy DB (Accidental Deletion)**
  - *Symptom:* Đổi tên resource RDS, Terraform tính toán là Destroy & Recreate.
  - *Fix:* Dùng `lifecycle { prevent_destroy = true }`. Dùng `terraform state mv` để đổi tên trong state.
- **Scenario 5: Circular Dependency**
  - *Symptom:* Lỗi "Cycle: ...". Hai resource A và B phụ thuộc nhau.
  - *Fix:* Tách các attribute ra hoặc thiết kế lại cấu trúc module.

## 14. So sánh
| Feature | Terraform | AWS CloudFormation | Ansible |
| --- | --- | --- | --- |
| Paradigm | Declarative (Stateful) | Declarative (AWS Native) | Procedural (thường dùng cho Config Mgmt) |
| Multi-Cloud | Tốt (AWS, Azure, GCP, on-prem) | Chỉ AWS | Tốt |

## 15. Common Mistakes
- Hardcode secret (AWS Keys, Passwords) vào code Terraform.
- Dùng `count` khi thay đổi danh sách ở giữa (gây ra shift index và destroy/recreate hàng loạt). Nên dùng `for_each`.
- Không khóa version của Provider, dẫn đến lỗi bất ngờ khi có bản cập nhật mới.

## 16. Interview Knowledge Check
- **Basic:** `terraform init` làm gì? So sánh `count` và `for_each`.
- **Deep:** Cấu trúc file `.tfstate`? Giải thích state locking.
- **Troubleshooting:** Làm gì khi tài nguyên bị đổi tên bằng tay trên Console?

## 17. Câu hỏi phỏng vấn
- **Basic:** Terraform là gì và tại sao lại sử dụng nó thay vì script bash?
- **Intermediate:** Làm sao để chia sẻ data giữa các module hoặc workspace khác nhau? (Dùng `terraform_remote_state` hoặc Data sources).
- **Advanced:** Làm sao để tái cấu trúc (Refactor) code Terraform đang có sẵn trên Prod mà không làm downtime tài nguyên?
- **Production:** Làm sao để quản lý bí mật (Secrets) trong Terraform an toàn?

## 18. Đáp án phỏng vấn
- **Short:** Để tránh recreation khi refactor, em dùng `moved` block (từ TF 1.1) hoặc lệnh `terraform state mv` để di chuyển resource trong state mà không đụng tới hạ tầng thật.
- **Engineer Style:** Trên production, em không bao giờ chạy apply thủ công. Em tích hợp với GitHub Actions + Atlantis. Atlantis sẽ chạy `plan` tự động khi có Pull Request, review xong có approve mới được `apply`. Khi thiết kế module, em ưu tiên dùng `for_each` thay vì `count` vì `count` phụ thuộc vào index của mảng, rất rủi ro khi thay đổi vị trí phần tử.

## 19. Follow-up Question Tree
- *Q: Làm sao import hạ tầng có sẵn vào Terraform?* -> *A: Dùng `terraform import <resource> <id>`.*
  - *Q: Việc import bằng tay tốn thời gian, có cách nào nhanh hơn?* -> *A: Dùng `import` block (Terraform 1.5+) hoặc các tool như Terraformer.*

## 20. Checklist sau khi học
- [ ] Tự tạo module VPC, EC2 hoàn chỉnh bằng Terraform.
- [ ] Thiết lập được backend S3 + DynamoDB.
- [ ] Refactor thành công code cũ dùng `moved` block.

## 21. Flashcards (25+ Q&A pairs)
- **Q:** Tại sao dùng DynamoDB cho backend? -> **A:** Để cung cấp tính năng State Locking (ngăn đồng thời sửa file state).
- **Q:** `terraform taint` dùng làm gì? -> **A:** Đánh dấu 1 resource là bị lỗi/cần tạo lại ở lần apply tiếp theo (Từ TF 1.1+, khuyên dùng `-replace` cờ thay cho taint).

## 22. Phân biệt "Phải hiểu" (🔴) và "Phải nắm" (🟠)
- 🔴 **Phải hiểu:** State management, Remote backend, Plan/Apply lifecycle, Lifecycle meta-arguments.
- 🟠 **Phải nắm:** Các syntax phức tạp (dynamic blocks, for expressions), công cụ CI/CD.
