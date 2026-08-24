# [24] KUBERNETES NETWORKING & CNI

> **Phase:** 3 — DevOps Core
> **Priority:** 🔴 MUST KNOW
> **JD Weight:** DevOps Engineer — 40%
> **Interview Priority:** 🔴 Very High
> **Prerequisite:** TCP/IP, Linux network namespace, Docker networking, Kubernetes fundamentals

---

# 1. 🎯 MỤC TIÊU HỌC

Hiểu Pod network, Service, kube-proxy, CNI, DNS, Ingress, NetworkPolicy; mô tả được traffic từ client đến Pod; và debug được DNS, Service không có Endpoint, NetworkPolicy deny, CNI/node failure và cross-node packet loss.

# 2. 🧠 KIẾN THỨC NỀN

Ôn IP/route/port, TCP/UDP, conntrack, NAT, Linux network namespace/veth/bridge, DNS và load balancing. Cần phân biệt control-plane object với dataplane packet path.

# 3. 📚 TỔNG QUAN

Kubernetes networking bảo đảm mỗi Pod có IP riêng, Pod-to-Pod có thể kết nối, Service cung cấp virtual IP ổn định và NetworkPolicy giới hạn traffic. Kubernetes không tự tạo dataplane; CNI và kube-proxy/implementation thực hiện phần lớn công việc trên node.

# 4. 🏗️ KIẾN TRÚC / CÁCH HOẠT ĐỘNG

```text
Client -> LoadBalancer/Ingress -> Service ClusterIP
                                  -> EndpointSlice
                                  -> Pod IP -> veth/CNI -> node route/overlay
```

Traffic trong cluster thường đi qua Service virtual IP rồi được chọn đến EndpointSlice. CNI tạo interface, IPAM và route; kube-proxy hoặc eBPF dataplane xử lý service translation. DNS của CoreDNS chuyển service name thành ClusterIP hoặc headless records.

# 5. 🧩 CÁC THÀNH PHẦN QUAN TRỌNG

| Thành phần | Vai trò | Failure |
|---|---|---|
| CNI plugin | IPAM, interface, route, policy | Pod không có IP/cross-node fail |
| kube-proxy/eBPF | Service dataplane | ClusterIP không forward |
| Service | Virtual endpoint | selector sai/no endpoints |
| EndpointSlice | Backend Pod list | stale/empty endpoints |
| CoreDNS | Service discovery | DNS timeout/SERVFAIL |
| Ingress/Gateway | North-south routing | 404/502/TLS/rule sai |
| NetworkPolicy | L3/L4 isolation | traffic bị deny |

# 6. 📖 CÁC CONCEPT QUAN TRỌNG

## 6.1. Cơ bản

Pod IP không nên được dùng làm endpoint lâu dài; Service chọn Pod qua selector. `ClusterIP` nội bộ, `NodePort` mở port trên node, `LoadBalancer` tích hợp external LB, còn headless Service trả về Pod IP trực tiếp.

## 6.2. Trung cấp

DNS name thường có dạng `<service>.<namespace>.svc.cluster.local`. Readiness quyết định Pod có vào EndpointSlice hay không. NetworkPolicy là default deny/allow theo namespace, pod selector, namespace selector và port; nó không tự bảo vệ traffic nếu CNI không hỗ trợ policy.

## 6.3. Nâng cao

Overlay giảm yêu cầu mạng underlay nhưng thêm encapsulation/MTU overhead. eBPF có thể thay kube-proxy và cung cấp visibility tốt hơn, nhưng cần hiểu kernel compatibility, upgrade và policy semantics.

# 7. 🌍 VÍ DỤ THỰC TẾ

- **Dev:** kiểm tra Pod-to-Pod và Service bằng BusyBox/curl.
- **Prod:** Ingress terminate TLS, Service route đến nhiều Deployment, NetworkPolicy default deny.
- **Multi-AZ:** CNI phải xử lý route/ENI/overlay giữa node và có alert packet drop, MTU, IP exhaustion.

# 8. 🛠️ COMMAND / TOOL CẦN BIẾT

```bash
kubectl get pods -A -o wide
kubectl get svc,endpointslice -A
kubectl describe svc <svc> -n <ns>
kubectl exec -n <ns> <pod> -- nslookup <svc>.<ns>.svc
kubectl exec -n <ns> <pod> -- curl -sv http://<svc>:<port>
kubectl get networkpolicy -A
kubectl logs -n kube-system deploy/coredns
kubectl logs -n kube-system ds/<cni-daemonset>
kubectl get nodes -o wide
```

Trên node dùng `ip addr`, `ip route`, `ip link`, `ss`, `conntrack`, `tcpdump` và kiểm tra CNI config/route khi được phép.

# 9. 📝 LOG

Đọc CoreDNS log cho NXDOMAIN/SERVFAIL/timeout; CNI log cho IPAM/route/attach; kube-proxy/eBPF log cho Service; Ingress access/error log cho status, upstream và request ID. Luôn xác định namespace, node, Pod IP, Service IP và thời điểm.

# 10. 📊 METRIC

Theo dõi DNS request/error/latency, Pod IP allocation, node interface errors, packet drop/retransmit, conntrack usage, Service request/error/latency, Ingress 4xx/5xx và CNI agent health.

# 11. ⚙️ CONFIGURATION

```yaml
apiVersion: v1
kind: Service
metadata:
  name: orders
spec:
  selector:
    app: orders
  ports:
    - port: 80
      targetPort: 8080
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: orders-ingress
spec:
  podSelector:
    matchLabels:
      app: orders
  policyTypes: [Ingress]
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: gateway
      ports:
        - protocol: TCP
          port: 8080
```

Selector phải khớp label thật; NetworkPolicy cần test cả allow path và deny path.

# 12. 🔧 TROUBLESHOOTING

```text
Không truy cập Service
 -> Service selector có khớp Pod không?
 -> EndpointSlice có endpoint ready không?
 -> Pod listen đúng targetPort không?
 -> DNS resolve đúng ClusterIP không?
 -> NetworkPolicy/CNI có deny không?
 -> kube-proxy/eBPF, route, conntrack, firewall và MTU?
```

Phân biệt `connection refused` (đã đến host nhưng không listen), `timeout` (route/firewall/policy/packet loss) và HTTP 5xx (upstream/app).

# 13. 🚨 PRODUCTION INCIDENT

### Incident 01 — Service không có Endpoint

Kiểm tra selector, label, Pod readiness và EndpointSlice. Nếu Pod chạy nhưng chưa ready, sửa probe/app; không restart Service vì Service chỉ là object điều phối.

### Incident 02 — DNS timeout

Kiểm tra CoreDNS Pod/service, endpoint, CPU/memory, upstream resolver, kube-dns service IP và network policy cho UDP/TCP 53.

### Incident 03 — Cross-node packet loss

So sánh cùng-node/cross-node, kiểm tra CNI log, route, MTU, node interface errors, underlay ACL và packet capture. Mitigate bằng drain node lỗi nếu cần và có capacity.

### Incident 04 — NetworkPolicy làm outage

Xác định policy mới qua Git/change log, test từ namespace nguồn đến port đích, rollback policy có kiểm soát và bổ sung regression test cho allow path.

### Incident 05 — Ingress 502

Kiểm tra Ingress rule/class/TLS, Service port-targetPort, EndpointSlice, upstream reset/timeout và application log; không kết luận do Ingress trước khi curl trực tiếp Service.

# 14. ⚖️ SO SÁNH & TRADE-OFF

| Lựa chọn | Ưu điểm | Trade-off |
|---|---|---|
| kube-proxy iptables | phổ biến, dễ hiểu | rule scale và debugging khó khi lớn |
| IPVS | dataplane chuyên dụng | thêm complexity/module |
| eBPF | visibility/performance/policy mạnh | phụ thuộc kernel/implementation |
| Overlay | đơn giản underlay | MTU/encapsulation overhead |
| Direct routing | hiệu năng tốt | yêu cầu route underlay |
| ClusterIP | ổn định nội bộ | không public trực tiếp |
| Ingress/Gateway | routing/TLS tập trung | thêm control/data plane |

# 15. ❌ COMMON MISTAKES

- Test bằng Pod IP rồi kết luận Service đúng.
- Nghĩ Pod `Running` nghĩa là đã nhận traffic; phải kiểm tra readiness/EndpointSlice.
- Quên DNS dùng cả UDP và TCP 53.
- Dùng NetworkPolicy nhưng CNI không hỗ trợ hoặc không test deny path.
- Bỏ qua MTU khi dùng overlay.
- Dùng `ping` làm bằng chứng duy nhất cho HTTP/TCP health.

# 16. ✅ INTERVIEW KNOWLEDGE CHECK

1. Pod IP, ClusterIP và NodePort khác nhau thế nào?
2. Service chọn Pod bằng cơ chế nào?
3. EndpointSlice rỗng nghĩa là gì?
4. CoreDNS resolve service ra sao?
5. `connection refused` khác `timeout` thế nào?
6. NetworkPolicy cần CNI hỗ trợ không?
7. Vì sao overlay gây MTU issue?
8. Ingress 502 debug từ đâu?

# 17. 🎤 CÂU HỎI PHỎNG VẤN

- Mô tả traffic từ Internet đến Pod.
- CNI, kube-proxy và CoreDNS làm gì?
- Khi Service không truy cập được, bạn kiểm tra theo thứ tự nào?
- ClusterIP khác headless Service ra sao?
- Làm sao thiết kế default-deny NetworkPolicy?
- Khi nào chọn overlay, direct routing hoặc eBPF?

# 18. 🗣️ ĐÁP ÁN PHỎNG VẤN

**Service không truy cập được:** Em kiểm tra selector và EndpointSlice trước, vì Service không có backend thì dataplane không thể route. Sau đó em curl trực tiếp Pod/Service, kiểm tra port listen, readiness, DNS, NetworkPolicy, kube-proxy/eBPF, route và CNI. Em phân biệt timeout/refused/HTTP error, giảm impact bằng rollback policy hoặc chuyển traffic có kiểm soát, rồi verify bằng request metric và log.

# 19. 🧑‍💻 CÁCH TRẢ LỜI NHƯ ENGINEER

Không nói “Kubernetes tự route traffic”. Hãy nêu rõ control object và dataplane, điểm quan sát, failure domain, evidence và giới hạn của từng test.

# 20. 🌳 FOLLOW-UP QUESTION TREE

```text
Service không truy cập?
 -> selector/EndpointSlice?
 -> Pod readiness/targetPort?
 -> DNS?
 -> NetworkPolicy?
 -> kube-proxy/eBPF/CNI/route/MTU?
 -> Ingress/upstream/application?
```

# 21. 📋 CHECKLIST SAU KHI HỌC

- [ ] Giải thích được Pod/Service/CNI/CoreDNS path.
- [ ] Debug được selector, EndpointSlice, port và readiness.
- [ ] Debug được DNS, NetworkPolicy, route, MTU và packet loss.
- [ ] Biết đọc CNI/CoreDNS/kube-proxy/Ingress log.
- [ ] Có runbook cho 5 production incident.

# 22. 🃏 FLASHCARDS

**Q:** EndpointSlice rỗng vì sao? **A:** Selector sai, Pod thiếu label hoặc Pod chưa ready.  
**Q:** ClusterIP là gì? **A:** Virtual IP ổn định cho Service nội bộ.  
**Q:** CoreDNS dùng port nào? **A:** UDP/TCP 53.  
**Q:** Timeout nói lên điều gì? **A:** Cần điều tra route, firewall, policy, packet loss hoặc backend treo.  
**Q:** NetworkPolicy có tự hoạt động không? **A:** Cần CNI hỗ trợ enforcement.

# 23. 🧠 PHÂN BIỆT “PHẢI NHỚ” VÀ “PHẢI HIỂU”

🔴 Phải hiểu: packet path, selector, EndpointSlice, DNS và CNI.  
🟠 Phải nắm: command, status code, policy và packet capture.  
🟡 Nên biết: eBPF, IPVS, overlay/direct routing và MTU.

# 24. 🎯 LIÊN HỆ VỚI JD

Đây là năng lực cốt lõi cho vận hành Kubernetes, Ingress, service discovery, security policy và production troubleshooting.

# 25. 📌 LIÊN HỆ VỚI CV

Nếu CV có EKS/Kubernetes, cần phân biệt rõ đã vận hành CNI/Ingress/NetworkPolicy Production hay chỉ deploy manifest.

# 26. 🏢 ENTERPRISE / DATA CENTER SCENARIO

Thiết kế multi-AZ cluster với CNI IPAM có capacity alert, private ingress, internal Service, CoreDNS redundancy, default-deny policy, flow log và runbook khi mất một node/AZ.

# 27. 🧪 HANDS-ON LAB

1. Tạo Deployment/Service và test Pod-to-Service.
2. Cố ý sai selector, tìm nguyên nhân EndpointSlice rỗng.
3. Tạo default-deny rồi thêm allow DNS/HTTP.
4. Mô phỏng MTU hoặc node CNI failure trong lab.
5. Debug Ingress 502 từ edge đến application.

# 28. 🔍 TROUBLESHOOTING DECISION TREE

```text
DNS fail -> CoreDNS/service/policy/upstream
Service fail -> selector/endpoints/port/readiness
Cross-node fail -> CNI/route/MTU/underlay
Ingress fail -> rule/TLS/service/upstream
Policy fail -> source/destination/port/CNI enforcement
```

# 29. 🧾 PRODUCTION READINESS REVIEW

Phải có IP capacity, CNI upgrade/rollback plan, DNS redundancy, policy test, ingress timeout/TLS policy, flow logs, packet-drop alert, node drain runbook và kiểm thử cross-AZ.

# 30. 🧭 FINAL SELF-ASSESSMENT

| Skill | Beginner | Intermediate | Advanced |
|---|---:|---:|---:|
| Service/DNS | ☐ | ☐ | ☐ |
| CNI/dataplane | ☐ | ☐ | ☐ |
| NetworkPolicy | ☐ | ☐ | ☐ |
| Incident debug | ☐ | ☐ | ☐ |
| Architecture | ☐ | ☐ | ☐ |

# 31. 🔥 INTERVIEW PRIORITY

Ưu tiên: Service/EndpointSlice, DNS, CNI, kube-proxy/eBPF, NetworkPolicy, Ingress, timeout/refused, MTU và cross-node troubleshooting.

# 32. 📋 FINAL CHECKLIST

- [ ] Mô tả được traffic Internet-to-Pod.
- [ ] Debug được Service, DNS, Ingress và NetworkPolicy.
- [ ] Biết phân biệt application, dataplane, CNI và underlay failure.
- [ ] Có command, metric, log và rollback plan.
- [ ] Xử lý được production network incident theo evidence.

---
END OF FILE
