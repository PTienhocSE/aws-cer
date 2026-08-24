# 20. HAPROXY
## 1. Why This Matters
For the System & DevOps Engineer role at Enterprise Data Center, high availability (HA) and efficient load balancing across multiple datacenters are paramount. HAProxy is an industry-standard, high-performance TCP/HTTP load balancer. While Nginx is excellent as a web server and reverse proxy, HAProxy is often preferred for pure load balancing, active health checking, and TCP-level routing (e.g., load balancing PostgreSQL clusters or RabbitMQ). Understanding HAProxy is crucial for on-premises infrastructure modernization.

## 2. Interview Priority
> 🟠 HIGH

## 3. CV Connection
- **Your background:** You have experience with AWS ALB, Kubernetes (EKS), and modern microservices architecture.
- **What they will ask:** "How would you load balance a database cluster on-premises? How does HAProxy compare to Nginx or AWS ALB? Explain how to set up active-passive HAProxy instances."
- **Skill gap:** Transitioning from managed cloud load balancers (ALB, NLB) to configuring and maintaining on-premises HAProxy, understanding ACLs, frontend/backend separation, and TCP load balancing.

## 4. Prerequisites
- TCP/IP networking (OSI layers 4 and 7).
- Understanding of load balancing concepts (Round-Robin, sticky sessions).
- Linux system administration.

## 5. Core Concepts

### 5.1 HAProxy Architecture
#### Definition
HAProxy (High Availability Proxy) is a free, very fast, and reliable solution offering high availability, load balancing, and proxying for TCP and HTTP-based applications.
#### How It Works
HAProxy uses a single-process, event-driven model (though modern versions support multi-threading). It operates primarily using three main sections:
- **Frontend:** Defines how requests are received (IP, port, SSL termination).
- **Backend:** Defines a pool of servers to which requests are forwarded, including load balancing algorithms and health checks.
- **Listen:** A combined frontend and backend (often used for simple TCP services or the stats page).
#### Real-world Example
At a port terminal, you have a fleet of IoT devices sending raw TCP metrics (not HTTP). HAProxy can listen on TCP port 5000 and distribute this raw TCP traffic across 5 backend processing servers using the `leastconn` algorithm. Nginx is generally less optimized for pure, massive TCP load balancing compared to HAProxy.

### 5.2 HAProxy vs Nginx vs AWS ALB
#### Interview Answer Template
"AWS ALB is a managed Layer 7 load balancer, great for cloud but unavailable on-premises. Nginx is a fantastic web server and HTTP reverse proxy with caching capabilities. HAProxy is a dedicated load balancer. I prefer HAProxy when I need to load balance databases (TCP Layer 4), require highly customizable active health checks, or need a centralized, high-performance ingress point for an on-premises datacenter. HAProxy's ACL system is also incredibly powerful for complex routing."

### 5.3 ACLs (Access Control Lists)
#### Definition
ACLs extract data from requests (IP, headers, URL paths) and apply conditions to route traffic or block requests.
#### How It Works
ACLs test conditions (e.g., `path_beg /api`) and then actions are taken based on the result (e.g., `use_backend api_cluster if is_api`).
#### Example
```haproxy
acl is_api path_beg /api
use_backend api_servers if is_api
default_backend web_servers
```

### 5.4 Health Checks
#### Definition
HAProxy can actively probe backend servers to ensure they are alive before sending traffic.
#### How It Works
Unlike open-source Nginx which uses passive checks, HAProxy uses active checks.
- **TCP Check:** Attempts a TCP connection.
- **HTTP Check:** Sends an HTTP request and expects a 2xx or 3xx status code.
- **Custom Check:** Can execute scripts or check specific database ports (e.g., `option pgsql-check`).

### 5.5 High Availability with Keepalived
#### Definition
A single HAProxy node is a single point of failure (SPOF). Keepalived uses VRRP (Virtual Router Redundancy Protocol) to float a Virtual IP (VIP) between two HAProxy servers (Active/Passive).
#### How It Works
If the active HAProxy node crashes, Keepalived detects the failure and immediately moves the VIP to the passive node. Clients connect to the VIP, completely unaware of the failover.

## 6. Architecture
```text
                       [ Internet ]
                             |
                      (Virtual IP: 10.0.0.100)
                             |
             +---------------+---------------+ (Keepalived / VRRP)
             |                               |
      [ HAProxy 1 (Active) ]         [ HAProxy 2 (Passive) ]
             |                               |
             +---------------+---------------+
                             |
              +--------------+--------------+
              |              |              |
         [Web Node 1]   [Web Node 2]   [Web Node 3]
```

## 7. Hands-on Commands / Configuration

### Installation & Management
```bash
# Ubuntu
apt update && apt install haproxy keepalived
# RHEL
yum install haproxy keepalived

systemctl enable --now haproxy
haproxy -c -f /etc/haproxy/haproxy.cfg # Test configuration
systemctl reload haproxy
```

### Basic HTTP Load Balancing (haproxy.cfg)
```haproxy
global
    log /dev/log local0
    maxconn 4000
    user haproxy
    group haproxy
    daemon

defaults
    log global
    mode http
    option httplog
    option dontlognull
    timeout connect 5000
    timeout client  50000
    timeout server  50000

frontend http_front
    bind *:80
    
    # ACL for routing
    acl url_api path_beg /api
    use_backend api_back if url_api
    
    default_backend web_back

backend web_back
    balance roundrobin
    cookie SERVERID insert indirect nocache # Sticky sessions
    server web1 10.0.1.10:80 check cookie web1
    server web2 10.0.1.11:80 check cookie web2

backend api_back
    balance leastconn
    option httpchk GET /health
    http-check expect status 200
    server api1 10.0.1.20:8080 check inter 2s rise 2 fall 3
    server api2 10.0.1.21:8080 check inter 2s rise 2 fall 3
```

### TCP Load Balancing (e.g., PostgreSQL)
```haproxy
listen postgres_cluster
    bind *:5432
    mode tcp
    balance leastconn
    option pgsql-check user haproxy
    server pg1 10.0.2.10:5432 check
    server pg2 10.0.2.11:5432 check
```

### Enable Statistics Page
```haproxy
listen stats
    bind *:8404
    mode http
    stats enable
    stats uri /haproxy_stats
    stats auth admin:P@ssw0rd!
```

## 8. Common Interview Questions

### Q1: What is the difference between TCP mode and HTTP mode in HAProxy?
**Model Answer:**
In `mode tcp` (Layer 4), HAProxy simply forwards two-way traffic between the client and server without inspecting the contents. This is extremely fast and used for databases (PostgreSQL, MySQL) or raw protocols. In `mode http` (Layer 7), HAProxy parses the HTTP protocol. This allows HAProxy to analyze headers, apply ACLs based on URLs, insert cookies for sticky sessions, and log HTTP status codes.

### Q2: How do you achieve High Availability for HAProxy itself?
**Model Answer:**
Because HAProxy is a single point of failure, we deploy at least two HAProxy instances and use Keepalived. Keepalived implements VRRP (Virtual Router Redundancy Protocol). We configure a Virtual IP (VIP). The primary Keepalived holds the VIP. If the primary HAProxy goes down, Keepalived transfers the VIP to the secondary instance.

### Q3: Explain HAProxy Load Balancing algorithms.
**Model Answer:**
- `roundrobin`: Requests are distributed sequentially. Good for stateless HTTP servers.
- `leastconn`: Forwards to the server with the lowest number of active connections. Excellent for long-lived connections (like databases, websockets, or slow API calls).
- `source`: Hashes the client IP to ensure the same client always hits the same backend (useful for strict stickiness without cookies).
- `uri`: Hashes the URI so requests for the same file always go to the same cache server, optimizing cache hit rates.

### Q4: How do active health checks work in HAProxy?
**Model Answer:**
By adding the `check` keyword to a `server` line, HAProxy periodically connects to the backend. We can customize this. For example, `option httpchk GET /health` makes HAProxy send an HTTP request. We configure `inter 2s rise 2 fall 3`, meaning it checks every 2 seconds, requires 2 successful checks to mark a server UP, and 3 failed checks to mark it DOWN.

### Q5: How do you configure sticky sessions in HAProxy?
**Model Answer:**
For HTTP traffic, the best method is cookie-based stickiness. In the backend, I use `cookie SERVERID insert indirect nocache`. Then on each server line, I add `cookie <server_name>`. HAProxy will insert a cookie into the client's first response, and subsequent requests with that cookie will be routed to the correct server.

### Q6: How does HAProxy perform SSL/TLS Offloading?
**Model Answer:**
HAProxy handles SSL termination at the frontend. You configure `bind *:443 ssl crt /etc/ssl/certs/haproxy.pem`. The `.pem` file must contain both the certificate and the private key. HAProxy decrypts the traffic and forwards it as plain HTTP to the backends, which saves CPU cycles on the backend servers and centralizes certificate management.

### Q7: How would you monitor HAProxy?
**Model Answer:**
First, I enable the built-in stats page using `listen stats` with `stats enable`. For modern monitoring, I use the HAProxy Prometheus Exporter. It scrapes the stats page and exposes them as metrics. I then build Grafana dashboards (which aligns with my CV experience) to visualize connections, 5xx error rates, and backend server status.

### Q8: What does `maxconn` do and where should it be set?
**Model Answer:**
`maxconn` limits the maximum number of concurrent connections. It should be set in the `global` section to protect the HAProxy server itself from running out of memory or file descriptors, and it can also be set on individual `frontend` or `server` lines to protect backend servers from being overwhelmed.

## 9. Scenario-Based Questions

### Scenario 1: Preventing Server Overload
**Situation:** A legacy logistics application crashes if it receives more than 100 concurrent connections. How do you protect it?
**How to approach:** Use HAProxy's connection queueing.
**Model Answer:**
I would configure HAProxy to act as a buffer. In the backend configuration for that specific legacy app, I would set `maxconn 100` on the `server` line. When connection 101 arrives, HAProxy won't drop it; instead, it will hold it in a queue (configurable with `timeout queue`) until a slot opens up on the backend server.

### Scenario 2: Zero Downtime Maintenance
**Situation:** You need to patch one of the backend servers during peak hours without impacting user traffic.
**How to approach:** Drain the connections gracefully.
**Model Answer:**
I would use the HAProxy Runtime API (socat) or the Stats GUI to set the specific server to `MAINT` (maintenance) mode. HAProxy will immediately stop sending *new* requests to this server but will allow existing, established connections (like file uploads) to finish. Once the connection count drops to zero, I can safely patch and reboot the server, then bring it back online in HAProxy.

### Scenario 3: DDoS Mitigation
**Situation:** The port's public portal is being hit by a flood of HTTP requests from specific IPs.
**How to approach:** Rate limiting using stick tables.
**Model Answer:**
I would implement HAProxy stick tables to track connection rates per IP.
```haproxy
backend per_ip_rates
    stick-table type ip size 1m expire 10m store http_req_rate(10s)

frontend public_web
    tcp-request connection track-sc0 src table per_ip_rates
    # Block if more than 50 requests in 10 seconds
    tcp-request connection reject if { sc0_http_req_rate() gt 50 }
```
This tracks the request rate and instantly drops connections from abusive IPs at the load balancer level before they reach the web servers.

## 10. Troubleshooting Exercises

### Problem 1: 503 Service Unavailable Error
**Symptoms:** Users randomly get 503 errors, but backend servers seem fine.
**Root Cause:** HAProxy is marking servers as DOWN due to failed health checks, or the connection queue is full.
**Solution:**
1. Check the HAProxy stats page to see if servers are flapping (going UP and DOWN).
2. If using `httpchk`, ensure the backend health endpoint (e.g., `/health`) is returning a 200 OK fast enough. If the backend is slow, HAProxy's `timeout check` might be killing the check, marking the server down. Increase the timeout or fix the slow endpoint.

### Problem 2: Source IP is 127.0.0.1 in backend logs
**Symptoms:** The backend Apache/Nginx logs show all traffic coming from the HAProxy IP instead of the user's IP.
**Root Cause:** Standard reverse proxy behavior.
**Solution:**
In HAProxy `defaults` or `backend`, add `option forwardfor`. This tells HAProxy to append the user's real IP to the `X-Forwarded-For` HTTP header. Then configure the backend (Nginx/Apache) to log the `X-Forwarded-For` header instead of the connecting IP.

## 11. Key Takeaways
- HAProxy excels at TCP load balancing and advanced HTTP routing via ACLs.
- Active health checks are a major advantage over open-source Nginx.
- Understand how Keepalived provides HA for the load balancer itself to avoid a SPOF.
- Be able to explain `roundrobin` vs `leastconn`.
- Stick-tables are powerful tools for rate limiting and security.

## 12. Quick Reference

| Feature | Configuration Snippet |
|---|---|
| HTTP Health Check | `option httpchk GET /health` |
| Sticky Session | `cookie SERVERID insert indirect nocache` |
| IP Logging | `option forwardfor` |
| SSL Termination | `bind *:443 ssl crt /etc/haproxy/certs.pem` |
| Connection Limit | `server web1 10.0.0.1:80 maxconn 100` |
| ACL Path Match | `acl is_api path_beg /api` |
