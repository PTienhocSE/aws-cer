# AWS Exam - Merged Question Bank

Total questions: 390

## Question 1

A company is developing an application in the AWS Cloud. The application's HTTP API contains critical information that is published in Amazon API Gateway. The critical information must be accessible from only a limited set of trusted IP addresses that belong to the company's internal network.
Which solution will meet these requirements?

- **A.** Modify the security group that is attached to API Gateway to allow inbound traffic from only the trusted IP addresses.
- **B.** Set up an API Gateway private integration to restrict access to a predefined set of IP addresses.
- **C.** Create a resource policy for the API that denies access to any IP address that is not specifically allowed. ✅
- **D.** Directly deploy the API in a private subnet. Create a network ACL. Set up rules to allow the traffic from specific IP addresses.

**Answer:** C

**Explanation:**

Correct Answer:Create a resource policy for the API that denies access to any IP address that is not specifically allowed.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a resource policy for the API that denies access to any IP address that is not specifically allowed. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Modify the security group that is attached to API Gateway to allow inbound traffic from only the trusted IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an API Gateway private integration to restrict access to a predefined set of IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Directly deploy the API in a private subnet. Create a network ACL. Set up rules to allow the traffic from specific IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 2

A company needs to give a globally distributed development team secure access to the company's AWS resources in a way that complies with security policies.
The company currently uses an on-premises Active Directory for internal authentication. The company uses AWS Organizations to manage multiple AWS accounts that support multiple projects.
The company needs a solution to integrate with the existing infrastructure to provide centralized identity management and access control.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use Amazon Cognito to deploy an identity federation solution. Integrate the identity federation solution with the on-premises Active Directory. Use Amazon Cognito to provide access tokens for developers to access AWS accounts and resources.
- **B.** Set up AWS Directory Service to create an AWS managed Microsoft Active Directory on AWS. Establish a trust relationship with the on-premises Active Directory. Use IAM rotes that are assigned to Active Directory groups to access AWS resources within the company's AWS accounts.
- **C.** Create an IAM user for each developer. Manually manage permissions for each IAM user based on each user's involvement with each project. Enforce multi-factor authentication (MFA) as an additional layer of security.
- **D.** Use AD Connector in AWS Directory Service to connect to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Configure permissions sets to give each AD group access to specific AWS accounts and resources. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AD Connector in AWS Directory Service to connect to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Configure permissions sets to give each AD group access to specific AWS accounts and resources.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AD Connector in AWS Directory Service to connect to the on-premises Active Directory. Integrate AD Connector with AWS IAM Identity Center. Configure permissions sets to give each AD group access to specific AWS accounts and resources. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Cognito to deploy an identity federation solution. Integrate the identity federation solution with the on-premises Active Directory. Use Amazon Cognito to provide access tokens for developers to access AWS accounts and resources. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS Directory Service to create an AWS managed Microsoft Active Directory on AWS. Establish a trust relationship with the on-premises Active Directory. Use IAM rotes that are assigned to Active Directory groups to access AWS resources within the company's AWS accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM user for each developer. Manually manage permissions for each IAM user based on each user's involvement with each project. Enforce multi-factor authentication (MFA) as an additional layer of security. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 3

A company is hosting a website behind multiple Application Load Balancers. The company has different distribution rights for its content around the world. A solutions architect needs to ensure that users are served the correct content without violating distribution rights.
Which configuration should the solutions architect choose to meet these requirements?

- **A.** Configure Amazon CloudFront with AWS WAF.
- **B.** Configure Application Load Balancers with AWS WAF
- **C.** Configure Amazon Route 53 with a geoproximity routing policy
- **D.** Configure Amazon Route 53 with a geolocation policy ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure Amazon Route 53 with a geolocation policy

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Route 53 with a geolocation policy - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon CloudFront with AWS WAF. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Application Load Balancers with AWS WAF - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Route 53 with a geoproximity routing policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 4

A company runs an application in a private subnet behind an Application Load Balancer (ALB) in a VPC. The VPC has a NAT gateway and an internet gateway. The application calls the Amazon S3 API to store objects.
According to the company's security policy, traffic from the application must not travel across the internet.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure an S3 gateway endpoint. Update the VPC route table to use the endpoint. ✅
- **B.** Configure an S3 interface endpoint. Create a security group that allows outbound traffic to Amazon S3.
- **C.** Create a second NAT gateway in the same subnet where the legacy application is deployed. Update the VPC route table to use the second NAT gateway.
- **D.** Configure an S3 bucket policy to allow traffic from the Elastic IP address that is assigned to the NAT gateway.

**Answer:** A

**Explanation:**

Correct Answer:Configure an S3 gateway endpoint. Update the VPC route table to use the endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an S3 gateway endpoint. Update the VPC route table to use the endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an S3 interface endpoint. Create a security group that allows outbound traffic to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a second NAT gateway in the same subnet where the legacy application is deployed. Update the VPC route table to use the second NAT gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an S3 bucket policy to allow traffic from the Elastic IP address that is assigned to the NAT gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 5

A company's image-hosting website gives users around the world the ability to up load, view, and download images from their mobile devices. The company currently hosts the static website in an Amazon S3 bucket.
Because of the website's growing popularity, the website's performance has decreased. Users have reported latency issues when they upload and download images.
The company must improve the performance of the website.
Which solution will meet these requirements with the LEAST implementation effort?

- **A.** Configure an Amazon CloudFront distribution for the S3 bucket to improve the download performance. Enable S3 Transfer Acceleration to improve the upload performance. ✅
- **B.** Configure AWS Global Accelerator for the S3 bucket to improve network performance. Create an endpoint for the application to use Global Accelerator instead of the S3 bucket.
- **C.** Configure Amazon EC2 instances of the right sizes in multiple AWS Regions. Migrate the application to the EC2 instances. Use an Application Load Balancer to distribute the website traffic equally among the EC2 instances. Configure AWS Global Accelerator to address global demand with low latency.
- **D.** Configure an Amazon CloudFront distribution that uses the S3 bucket as an origin to improve the download performance. Configure the application to use CloudFront to upload images to improve the upload performance. Create S3 buckets in multiple AWS Regions. Configure replication rules for the buckets to replicate users' data based on the users' location. Redirect downloads to the S3 bucket that is closest to each user's location.

**Answer:** A

**Explanation:**

Correct Answer:Configure an Amazon CloudFront distribution for the S3 bucket to improve the download performance. Enable S3 Transfer Acceleration to improve the upload performance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon CloudFront distribution for the S3 bucket to improve the download performance. Enable S3 Transfer Acceleration to improve the upload performance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Global Accelerator for the S3 bucket to improve network performance. Create an endpoint for the application to use Global Accelerator instead of the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon EC2 instances of the right sizes in multiple AWS Regions. Migrate the application to the EC2 instances. Use an Application Load Balancer to distribute the website traffic equally among the EC2 instances. Configure AWS Global Accelerator to address global demand with low latency. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon CloudFront distribution that uses the S3 bucket as an origin to improve the download performance. Configure the application to use CloudFront to upload images to improve the upload performance. Create S3 buckets in multiple AWS Regions. Configure replication rules for the buckets to replicate users' data based on the users' location. Redirect downloads to the S3 bucket that is closest to each user's location. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 6

A digital image processing company wants to migrate its on-premises monolithic application to the AWS Cloud. The company processes thousands of images and generates large files as part of the processing workflow.
The company needs a solution to manage the growing number of image processing jobs. The solution must also reduce the manual tasks in the image processing workflow. The company does not want to manage the underlying infrastructure of the solution.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Deploy a group of Amazon EC2 instances to process the images. Use AWS Step Functions to orchestrate the workflow. Store the processed files in an Amazon Elastic Block Store (Amazon EBS) volume.
- **B.** Use Amazon Elastic Container Service (Amazon ECS) with Amazon EC2 Spot Instances to process the images. Configure Amazon Simple Queue Service (Amazon SQS) to orchestrate the workflow. Store the processed files in Amazon Elastic File System (Amazon EFS).
- **C.** Use AWS Batch jobs to process the images. Use AWS Step Functions to orchestrate the workflow. Store the processed files in an Amazon S3 bucket. ✅
- **D.** Use AWS Lambda functions and Amazon EC2 Spot Instances to process the images. Store the processed files in Amazon FSx.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Batch jobs to process the images. Use AWS Step Functions to orchestrate the workflow. Store the processed files in an Amazon S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Batch jobs to process the images. Use AWS Step Functions to orchestrate the workflow. Store the processed files in an Amazon S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy a group of Amazon EC2 instances to process the images. Use AWS Step Functions to orchestrate the workflow. Store the processed files in an Amazon Elastic Block Store (Amazon EBS) volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Container Service (Amazon ECS) with Amazon EC2 Spot Instances to process the images. Configure Amazon Simple Queue Service (Amazon SQS) to orchestrate the workflow. Store the processed files in Amazon Elastic File System (Amazon EFS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Lambda functions and Amazon EC2 Spot Instances to process the images. Store the processed files in Amazon FSx. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 7

A company wants to provide users with access to AWS resources. The company has 1,500 users and manages their access to on-premises resources through Active Directory user groups on the corporate network. However, the company does not want users to have to maintain another identity to access the resources. A solutions architect must manage user access to the AWS resources while preserving access to the on-premises resources.
What should the solutions architect do to meet these requirements?

- **A.** Configure Security Assertion Markup Language (SAML) 2.0-based federation. Create roles with the appropriate policies attached. Map the roles to the Active Directory groups. ✅
- **B.** Define cross-account roles with the appropriate policies attached. Map the roles to the Active Directory groups.
- **C.** Use Amazon Cognito with an Active Directory user pool. Create roles with the appropriate policies attached.
- **D.** Create an IAM user for each user in the company. Attach the appropriate policies to each user.

**Answer:** A

**Explanation:**

Correct Answer:Configure Security Assertion Markup Language (SAML) 2.0-based federation. Create roles with the appropriate policies attached. Map the roles to the Active Directory groups.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Security Assertion Markup Language (SAML) 2.0-based federation. Create roles with the appropriate policies attached. Map the roles to the Active Directory groups. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Define cross-account roles with the appropriate policies attached. Map the roles to the Active Directory groups. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Cognito with an Active Directory user pool. Create roles with the appropriate policies attached. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM user for each user in the company. Attach the appropriate policies to each user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 8

A company has a three-tier web application that processes orders from customers. The web tier consists of Amazon EC2 instances behind an Application Load Balancer. The processing tier consists of EC2 instances. The company decoupled the web tier and processing tier by using Amazon Simple Queue Service (Amazon SQS). The storage layer uses Amazon DynamoDB.
At peak times, some users report order processing delays and halls. The company has noticed that during these delays, the EC2 instances are running at 100% CPU usage, and the SQS queue fills up. The peak times are variable and unpredictable.
The company needs to improve the performance of the application.
Which solution will meet these requirements?

- **A.** Use Amazon ElastiCache for Redis in front of the DynamoDB backend tier. Use target utilization as a metric to determine when to scale.
- **B.** Use scheduled scaling for Amazon EC2 Auto Scaling to scale out the processing tier instances for the duration of peak usage times. Use the CPU Utilization metric to determine when to scale.
- **C.** Add an Amazon CloudFront distribution to cache the responses for the web tier. Use HTTP latency as a metric to determine when to scale.
- **D.** Use an Amazon EC2 Auto Scaling target tracking policy to scale out the processing tier instances. Use the ApproximateNumberOfMessages attribute to determine when to scale. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use an Amazon EC2 Auto Scaling target tracking policy to scale out the processing tier instances. Use the ApproximateNumberOfMessages attribute to determine when to scale.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an Amazon EC2 Auto Scaling target tracking policy to scale out the processing tier instances. Use the ApproximateNumberOfMessages attribute to determine when to scale. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon ElastiCache for Redis in front of the DynamoDB backend tier. Use target utilization as a metric to determine when to scale. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use scheduled scaling for Amazon EC2 Auto Scaling to scale out the processing tier instances for the duration of peak usage times. Use the CPU Utilization metric to determine when to scale. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add an Amazon CloudFront distribution to cache the responses for the web tier. Use HTTP latency as a metric to determine when to scale. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 9

A company hosts an application in a private subnet behind an Application Load Balancer. The company has already integrated the application with Amazon Cognito. The company uses an Amazon Cognito user pool to authenticate users.
The company needs to modify the application so the authenticated users can securely store their documents in an Amazon S3 bucket via the application.
Which combination of steps will securely integrate Amazon S3 with the application? (Choose two.)

- **A.** Use the existing Amazon Cognito user pool to generate Amazon S3 access tokens for users when they successfully log in.
- **B.** Create a NAT gateway in the VPC where the company hosts the application. Assign a policy to the S3 bucket to deny any request that is not initiated from Amazon Cognito.
- **C.** Attach a policy to the S3 bucket that allows access only from the users' IP addresses.
- **D.** Create an Amazon Cognito identity pool to generate secure Amazon S3 access tokens for users when they successfully log in. ✅
- **E.** Create an Amazon S3 VPC endpoint in the same VPC where the company hosts the application. ✅

**Answer:** D, E

**Explanation:**

Correct Answer:Create an Amazon Cognito identity pool to generate secure Amazon S3 access tokens for users when they successfully log in.; Create an Amazon S3 VPC endpoint in the same VPC where the company hosts the application.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Cognito identity pool to generate secure Amazon S3 access tokens for users when they successfully log in. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Amazon S3 VPC endpoint in the same VPC where the company hosts the application. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the existing Amazon Cognito user pool to generate Amazon S3 access tokens for users when they successfully log in. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a NAT gateway in the VPC where the company hosts the application. Assign a policy to the S3 bucket to deny any request that is not initiated from Amazon Cognito. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach a policy to the S3 bucket that allows access only from the users' IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 10

A company runs multiple workloads on virtual machines (VMs) in an on-premises data center. The company is expanding rapidly. The on-premises data center is not able to scale fast enough to meet business needs. The company wants to migrate the workloads to AWS.
The migration is time sensitive. The company wants to use a lift-and-shift strategy for non-critical workloads.
Which combination of steps will meet these requirements? (Choose three.)

- **A.** Stop all operations on the VMs. Launch a cutover instance. ✅
- **B.** Complete the initial replication of the VMs. Launch test instances to perform acceptance tests on the VMs. ✅
- **C.** Use AWS Application Migration Service. Install the AWS Replication Agent on the VMs. ✅
- **D.** Use the AWS Schema Conversion Tool (AWS SCT) to collect data about the VMs.
- **E.** Use AWS Database Migration Service (AWS DMS) to migrate the VMs.
- **F.** Use AWS App2Container (A2C) to collect data about the VMs.

**Answer:** A, B, C

**Explanation:**

Correct Answer:Stop all operations on the VMs. Launch a cutover instance.; Complete the initial replication of the VMs. Launch test instances to perform acceptance tests on the VMs.; Use AWS Application Migration Service. Install the AWS Replication Agent on the VMs.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Stop all operations on the VMs. Launch a cutover instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Complete the initial replication of the VMs. Launch test instances to perform acceptance tests on the VMs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use AWS Application Migration Service. Install the AWS Replication Agent on the VMs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the AWS Schema Conversion Tool (AWS SCT) to collect data about the VMs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS) to migrate the VMs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS App2Container (A2C) to collect data about the VMs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 11

A company runs an environment where data is stored in an Amazon S3 bucket. The objects are accessed frequently throughout the day. The company has strict data encryption requirements for data that is stored in the S3 bucket. The company currently uses AWS Key Management Service (AWS KMS) for encryption.
The company wants to optimize costs associated with encrypting S3 objects without making additional calls to AWS KMS.
Which solution will meet these requirements?

- **A.** Use client-side encryption with AWS KMS customer managed keys.
- **B.** Use server-side encryption with customer-provided keys (SSE-C) stored in AWS KMS.
- **C.** Use an S3 Bucket Key for server-side encryption with AWS KMS keys (SSE-KMS) on the new objects. ✅
- **D.** Use server-side encryption with Amazon S3 managed keys (SSE-S3).

**Answer:** C

**Explanation:**

Correct Answer:Use an S3 Bucket Key for server-side encryption with AWS KMS keys (SSE-KMS) on the new objects.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an S3 Bucket Key for server-side encryption with AWS KMS keys (SSE-KMS) on the new objects. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use client-side encryption with AWS KMS customer managed keys. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use server-side encryption with customer-provided keys (SSE-C) stored in AWS KMS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use server-side encryption with Amazon S3 managed keys (SSE-S3). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 12

A company hosts a website analytics application on a single Amazon EC2 On-Demand Instance. The analytics application is highly resilient and is designed to run in stateless mode.
The company notices that the application is showing signs of performance degradation during busy times and is presenting 5xx errors. The company needs to make the application scale seamlessly.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create an Amazon Machine Image (AMI) of the web application. Use the AMI to launch a second EC2 On-Demand Instance. Use an Application Load Balancer to distribute the load across the two EC2 instances.
- **B.** Create an Amazon Machine Image (AMI) of the web application. Use the AMI to launch a second EC2 On-Demand Instance. Use Amazon Route 53 weighted routing to distribute the load across the two EC2 instances.
- **C.** Create an Amazon Machine Image (AMI) of the web application. Apply the AMI to a launch template. Create an Auto Scaling group that includes the launch template. Configure the launch template to use a Spot Fleet. Attach an Application Load Balancer to the Auto Scaling group. ✅
- **D.** Create an AWS Lambda function to stop the EC2 instance and change the instance type. Create an Amazon CloudWatch alarm to invoke the Lambda function when CPU utilization is more than 75%.

**Answer:** C

**Explanation:**

Correct Answer:Create an Amazon Machine Image (AMI) of the web application. Apply the AMI to a launch template. Create an Auto Scaling group that includes the launch template. Configure the launch template to use a Spot Fleet. Attach an Application Load Balancer to the Auto Scaling group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Machine Image (AMI) of the web application. Apply the AMI to a launch template. Create an Auto Scaling group that includes the launch template. Configure the launch template to use a Spot Fleet. Attach an Application Load Balancer to the Auto Scaling group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Machine Image (AMI) of the web application. Use the AMI to launch a second EC2 On-Demand Instance. Use an Application Load Balancer to distribute the load across the two EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Machine Image (AMI) of the web application. Use the AMI to launch a second EC2 On-Demand Instance. Use Amazon Route 53 weighted routing to distribute the load across the two EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function to stop the EC2 instance and change the instance type. Create an Amazon CloudWatch alarm to invoke the Lambda function when CPU utilization is more than 75%. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 13

A medical company wants to perform transformations on a large amount of clinical trial data that comes from several customers. The company must extract the data from a relational database that contains the customer data. Then the company will transform the data by using a series of complex rules. The company will load the data to Amazon S3 when the transformations are complete.
All data must be encrypted where it is processed before the company stores the data in Amazon S3. All data must be encrypted by using customer-specific keys.
Which solution will meet these requirements with the LEAST amount of operational effort?

- **A.** Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses client-side encryption with a custom client-side root key (CSE-Custom) to encrypt the data.
- **B.** Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data.
- **C.** Create one AWS Glue job for each customer. Attach a security configuration to each job that uses server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the data.
- **D.** Create one AWS Glue job for each customer. Attach a security configuration to each job that uses client-side encryption with AWS KMS managed keys (CSE-KMS) to encrypt the data. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create one AWS Glue job for each customer. Attach a security configuration to each job that uses client-side encryption with AWS KMS managed keys (CSE-KMS) to encrypt the data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create one AWS Glue job for each customer. Attach a security configuration to each job that uses client-side encryption with AWS KMS managed keys (CSE-KMS) to encrypt the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses client-side encryption with a custom client-side root key (CSE-Custom) to encrypt the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create one Amazon EMR cluster for each customer. Attach a security configuration to each cluster that uses server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create one AWS Glue job for each customer. Attach a security configuration to each job that uses server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 14

A company is creating a new web application for its subscribers. The application will consist of a static single page and a persistent database layer. The application will have millions of users for 4 hours in the morning, but the application will have only a few thousand users during the rest of the day. The company's data architects have requested the ability to rapidly evolve their schema.
Which solutions will meet these requirements and provide the MOST scalability? (Choose two.)

- **A.** Deploy Amazon Aurora as the database solution. Choose the serverless DB engine mode.
- **B.** Deploy the static content into an Amazon S3 bucket. Provision an Amazon CloudFront distribution with the S3 bucket as the origin. ✅
- **C.** Deploy Amazon DynamoDB as the database solution. Provision on-demand capacity. ✅
- **D.** Deploy Amazon DynamoDB as the database solution. Ensure that DynamoDB auto scaling is enabled.
- **E.** Deploy the web servers for static content across a fleet of Amazon EC2 instances in Auto Scaling groups. Configure the instances to periodically refresh the content from an Amazon Elastic File System (Amazon EFS) volume.

**Answer:** B, C

**Explanation:**

Correct Answer:Deploy the static content into an Amazon S3 bucket. Provision an Amazon CloudFront distribution with the S3 bucket as the origin.; Deploy Amazon DynamoDB as the database solution. Provision on-demand capacity.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy the static content into an Amazon S3 bucket. Provision an Amazon CloudFront distribution with the S3 bucket as the origin. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Deploy Amazon DynamoDB as the database solution. Provision on-demand capacity. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy Amazon Aurora as the database solution. Choose the serverless DB engine mode. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy Amazon DynamoDB as the database solution. Ensure that DynamoDB auto scaling is enabled. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the web servers for static content across a fleet of Amazon EC2 instances in Auto Scaling groups. Configure the instances to periodically refresh the content from an Amazon Elastic File System (Amazon EFS) volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 15

A company tracks customer satisfaction by using surveys that the company hosts on its website. The surveys sometimes reach thousands of customers every hour. Survey results are currently sent in email messages to the company so company employees can manually review results and assess customer sentiment.
The company wants to automate the customer survey process. Survey results must be available for the previous 12 months.
Which solution will meet these requirements in the MOST scalable way?

- **A.** Send the survey results data to an Amazon API Gateway endpoint that is connected to an Amazon Simple Queue Service (Amazon SQS) queue. Create an AWS Lambda function to poll the SQS queue, call Amazon Comprehend for sentiment analysis, and save the results to an Amazon DynamoDB table. Set the TTL for all records to 365 days in the future. ✅
- **B.** Send the survey results data to an API that is running on an Amazon EC2 instance. Configure the API to store the survey results as a new record in an Amazon DynamoDB table, call Amazon Comprehend for sentiment analysis, and save the results in a second DynamoDB table. Set the TTL for all records to 365 days in the future.
- **C.** Send the survey results data to an Amazon API Gateway endpoint that is connected to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the SQS queue to invoke an AWS Lambda function that calls Amazon Lex for sentiment analysis and saves the results to an Amazon DynamoDB table. Set the TTL for all records to 365 days in the future.
- **D.** Write the survey results data to an Amazon S3 bucket. Use S3 Event Notifications to invoke an AWS Lambda function to read the data and call Amazon Rekognition for sentiment analysis. Store the sentiment analysis results in a second S3 bucket. Use S3 lifecycle policies on each bucket to expire objects after 365 days.

**Answer:** A

**Explanation:**

Correct Answer:Send the survey results data to an Amazon API Gateway endpoint that is connected to an Amazon Simple Queue Service (Amazon SQS) queue. Create an AWS Lambda function to poll the SQS queue, call Amazon Comprehend for sentiment analysis, and save the results to an Amazon DynamoDB table. Set the TTL for all records to 365 days in the future.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Send the survey results data to an Amazon API Gateway endpoint that is connected to an Amazon Simple Queue Service (Amazon SQS) queue. Create an AWS Lambda function to poll the SQS queue, call Amazon Comprehend for sentiment analysis, and save the results to an Amazon DynamoDB table. Set the TTL for all records to 365 days in the future. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Send the survey results data to an API that is running on an Amazon EC2 instance. Configure the API to store the survey results as a new record in an Amazon DynamoDB table, call Amazon Comprehend for sentiment analysis, and save the results in a second DynamoDB table. Set the TTL for all records to 365 days in the future. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Send the survey results data to an Amazon API Gateway endpoint that is connected to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the SQS queue to invoke an AWS Lambda function that calls Amazon Lex for sentiment analysis and saves the results to an Amazon DynamoDB table. Set the TTL for all records to 365 days in the future. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Write the survey results data to an Amazon S3 bucket. Use S3 Event Notifications to invoke an AWS Lambda function to read the data and call Amazon Rekognition for sentiment analysis. Store the sentiment analysis results in a second S3 bucket. Use S3 lifecycle policies on each bucket to expire objects after 365 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 16

A company hosts its enterprise resource planning (ERP) system in the us-east-1 Region. The system runs on Amazon EC2 instances. Customers use a public API that is hosted on the EC2 instances to exchange information with the ERP system. International customers report slow API response times from their data centers.
Which solution will improve response times for the international customers MOST cost-effectively?

- **A.** Create an AWS Direct Connect connection that has a public virtual interface (VIF) to provide connectivity from each customer's data center to us-east-1. Route customer API requests by using a Direct Connect gateway to the ERP system API.
- **B.** Set up an Amazon CloudFront distribution in front of the API. Configure the CachingOptimized managed cache policy to provide improved cache efficiency.
- **C.** Set up AWS Global Accelerator. Configure listeners for the necessary ports. Configure endpoint groups for the appropriate Regions to distribute traffic. Create an endpoint in the group for the API. ✅
- **D.** Use AWS Site-to-Site VPN to establish dedicated VPN tunnels between Regions and customer networks. Route traffic to the API over the VPN connections.

**Answer:** C

**Explanation:**

Correct Answer:Set up AWS Global Accelerator. Configure listeners for the necessary ports. Configure endpoint groups for the appropriate Regions to distribute traffic. Create an endpoint in the group for the API.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up AWS Global Accelerator. Configure listeners for the necessary ports. Configure endpoint groups for the appropriate Regions to distribute traffic. Create an endpoint in the group for the API. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Direct Connect connection that has a public virtual interface (VIF) to provide connectivity from each customer's data center to us-east-1. Route customer API requests by using a Direct Connect gateway to the ERP system API. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an Amazon CloudFront distribution in front of the API. Configure the CachingOptimized managed cache policy to provide improved cache efficiency. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Site-to-Site VPN to establish dedicated VPN tunnels between Regions and customer networks. Route traffic to the API over the VPN connections. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 17

A company runs its media rendering application on premises. The company wants to reduce storage costs and has moved all data to Amazon S3. The on-premises rendering application needs low-latency access to storage.
The company needs to design a storage solution for the application. The storage solution must maintain the desired application performance.
Which storage solution will meet these requirements in the MOST cost-effective way?

- **A.** Copy the data from Amazon S3 to Amazon FSx for Windows File Server. Configure an Amazon FSx File Gateway to provide storage for the on-premises application.
- **B.** Configure an on-premises file server. Use the Amazon S3 API to connect to S3 storage. Configure the application to access the storage from the on-premises file server.
- **C.** Configure an Amazon S3 File Gateway to provide storage for the on-premises application. ✅
- **D.** Use Mountpoint for Amazon S3 to access the data in Amazon S3 for the on-premises application.

**Answer:** C

**Explanation:**

Correct Answer:Configure an Amazon S3 File Gateway to provide storage for the on-premises application.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon S3 File Gateway to provide storage for the on-premises application. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Copy the data from Amazon S3 to Amazon FSx for Windows File Server. Configure an Amazon FSx File Gateway to provide storage for the on-premises application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an on-premises file server. Use the Amazon S3 API to connect to S3 storage. Configure the application to access the storage from the on-premises file server. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Mountpoint for Amazon S3 to access the data in Amazon S3 for the on-premises application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 18

An online gaming company is transitioning user data storage to Amazon DynamoDB to support the company's growing user base. The current architecture includes DynamoDB tables that contain user profiles, achievements, and in-game transactions.
The company needs to design a robust, continuously available, and resilient DynamoDB architecture to maintain a seamless gaming experience for users.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create DynamoDB tables in a single AWS Region. Use on-demand capacity mode. Use global tables to replicate data across multiple Regions.
- **B.** Use DynamoDB Accelerator (DAX) to cache frequently accessed data. Deploy tables in a single AWS Region and enable auto scaling. Configure Cross-Region Replication manually to additional Regions.
- **C.** Create DynamoDB tables in multiple AWS Regions. Use on-demand capacity mode. Use DynamoDB Streams for Cross-Region Replication between Regions.
- **D.** Use DynamoDB global tables for automatic multi-Region replication. Deploy tables in multiple AWS Regions. Use provisioned capacity mode. Enable auto scaling. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use DynamoDB global tables for automatic multi-Region replication. Deploy tables in multiple AWS Regions. Use provisioned capacity mode. Enable auto scaling.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use DynamoDB global tables for automatic multi-Region replication. Deploy tables in multiple AWS Regions. Use provisioned capacity mode. Enable auto scaling. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create DynamoDB tables in a single AWS Region. Use on-demand capacity mode. Use global tables to replicate data across multiple Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use DynamoDB Accelerator (DAX) to cache frequently accessed data. Deploy tables in a single AWS Region and enable auto scaling. Configure Cross-Region Replication manually to additional Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create DynamoDB tables in multiple AWS Regions. Use on-demand capacity mode. Use DynamoDB Streams for Cross-Region Replication between Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 19

A company operates a food delivery service. Because of recent growth, the company's order processing system is experiencing scaling problems during peak traffic hours. The current architecture includes Amazon EC2 instances in an Auto Scaling group that collect orders from an application. A second group of EC2 instances in an Auto Scaling group fulfills the orders.
The order collection process occurs quickly, but the order fulfillment process can take longer. Data must not be lost because of a scaling event.
A solutions architect must ensure that the order collection process and the order fulfillment process can both scale adequately during peak traffic hours.
Which solution will meet these requirements?

- **A.** Use Amazon CloudWatch to monitor the CPUUtilization metric for each instance in both Auto Scaling groups. Configure each Auto Scaling group's minimum capacity to meet its peak workload value.
- **B.** Use Amazon CloudWatch to monitor the CPUUtilization metric for each instance in both Auto Scaling groups. Configure a CloudWatch alarm to invoke an Amazon Simple Notification Service (Amazon SNS) topic to create additional Auto Scaling groups on demand.
- **C.** Provision two Amazon Simple Queue Service (Amazon SQS) queues. Use one SQS queue for order collection. Use the second SQS queue for order fulfillment. Configure the EC2 instances to poll their respective queues. Scale the Auto Scaling groups based on notifications that the queues send.
- **D.** Provision two Amazon Simple Queue Service (Amazon SQS) queues. Use one SQS queue for order collection. Use the second SQS queue for order fulfillment. Configure the EC2 instances to poll their respective queues. Scale the Auto Scaling groups based on the number of messages in each queue. ✅

**Answer:** D

**Explanation:**

Correct Answer:Provision two Amazon Simple Queue Service (Amazon SQS) queues. Use one SQS queue for order collection. Use the second SQS queue for order fulfillment. Configure the EC2 instances to poll their respective queues. Scale the Auto Scaling groups based on the number of messages in each queue.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision two Amazon Simple Queue Service (Amazon SQS) queues. Use one SQS queue for order collection. Use the second SQS queue for order fulfillment. Configure the EC2 instances to poll their respective queues. Scale the Auto Scaling groups based on the number of messages in each queue. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon CloudWatch to monitor the CPUUtilization metric for each instance in both Auto Scaling groups. Configure each Auto Scaling group's minimum capacity to meet its peak workload value. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon CloudWatch to monitor the CPUUtilization metric for each instance in both Auto Scaling groups. Configure a CloudWatch alarm to invoke an Amazon Simple Notification Service (Amazon SNS) topic to create additional Auto Scaling groups on demand. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision two Amazon Simple Queue Service (Amazon SQS) queues. Use one SQS queue for order collection. Use the second SQS queue for order fulfillment. Configure the EC2 instances to poll their respective queues. Scale the Auto Scaling groups based on notifications that the queues send. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 20

A company currently stores 5 TB of data in on-premises block storage systems. The company's current storage solution provides limited space for additional data. The company runs applications on premises that must be able to retrieve frequently accessed data with low latency. The company requires a cloud-based storage solution.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Use an AWS Storage Gateway Volume Gateway with stored volumes as iSCSI targets.
- **B.** Use an AWS Storage Gateway Volume Gateway with cached volumes as iSCSI targets. ✅
- **C.** Use an AWS Storage Gateway Tape Gateway. Integrate Tape Gateway with the on-premises applications to store virtual tapes in Amazon S3.
- **D.** Use Amazon S3 File Gateway. Integrate S3 File Gateway with the on-premises applications to store and directly retrieve files by using the SMB file system.

**Answer:** B

**Explanation:**

Correct Answer:Use an AWS Storage Gateway Volume Gateway with cached volumes as iSCSI targets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an AWS Storage Gateway Volume Gateway with cached volumes as iSCSI targets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS Storage Gateway Volume Gateway with stored volumes as iSCSI targets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Storage Gateway Tape Gateway. Integrate Tape Gateway with the on-premises applications to store virtual tapes in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 File Gateway. Integrate S3 File Gateway with the on-premises applications to store and directly retrieve files by using the SMB file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 21

A company is creating a prototype of an ecommerce website on AWS. The website consists of an Application Load Balancer, an Auto Scaling group of Amazon EC2 instances for web servers, and an Amazon RDS for MySQL DB instance that runs with the Single-AZ configuration.
The website is slow to respond during searches of the product catalog. The product catalog is a group of tables in the MySQL database that the company does not update frequently. A solutions architect has determined that the CPU utilization on the DB instance is high when product catalog searches occur.
What should the solutions architect recommend to improve the performance of the website during searches of the product catalog?

- **A.** Turn on the Multi-AZ configuration for the DB instance. Configure the EC2 instances to throttle the product catalog queries that are sent to the database.
- **B.** Add an additional scaling policy to the Auto Scaling group to launch additional EC2 instances when database response is slow.
- **C.** Implement an Amazon ElastiCache for Redis cluster to cache the product catalog. Use lazy loading to populate the cache. ✅
- **D.** Migrate the product catalog to an Amazon Redshift database. Use the COPY command to load the product catalog tables.

**Answer:** C

**Explanation:**

Correct Answer:Implement an Amazon ElastiCache for Redis cluster to cache the product catalog. Use lazy loading to populate the cache.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Implement an Amazon ElastiCache for Redis cluster to cache the product catalog. Use lazy loading to populate the cache. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Turn on the Multi-AZ configuration for the DB instance. Configure the EC2 instances to throttle the product catalog queries that are sent to the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add an additional scaling policy to the Auto Scaling group to launch additional EC2 instances when database response is slow. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the product catalog to an Amazon Redshift database. Use the COPY command to load the product catalog tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 22

A company runs its legacy web application on AWS. The web application server runs on an Amazon EC2 instance in the public subnet of a VPC. The web application server collects images from customers and stores the image files in a locally attached Amazon Elastic Block Store (Amazon EBS) volume. The image files are uploaded every night to an Amazon S3 bucket for backup.
A solutions architect discovers that the image files are being uploaded to Amazon S3 through the public endpoint. The solutions architect needs to ensure that traffic to Amazon S3 does not use the public endpoint.
Which solution will meet these requirements?

- **A.** Create a gateway VPC endpoint for the S3 bucket that has the necessary permissions for the VPC. Configure the subnet route table to use the gateway VPC endpoint. ✅
- **B.** Configure an AWS Direct Connect connection between the VPC that has the Amazon EC2 instance and Amazon S3 to provide a dedicated network path.
- **C.** Move the S3 bucket inside the VPC. Configure the subnet route table to access the S3 bucket through private IP addresses.
- **D.** Create an Amazon S3 access point for the Amazon EC2 instance inside the VPC. Configure the web application to upload by using the Amazon S3 access point.

**Answer:** A

**Explanation:**

Correct Answer:Create a gateway VPC endpoint for the S3 bucket that has the necessary permissions for the VPC. Configure the subnet route table to use the gateway VPC endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a gateway VPC endpoint for the S3 bucket that has the necessary permissions for the VPC. Configure the subnet route table to use the gateway VPC endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an AWS Direct Connect connection between the VPC that has the Amazon EC2 instance and Amazon S3 to provide a dedicated network path. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Move the S3 bucket inside the VPC. Configure the subnet route table to access the S3 bucket through private IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 access point for the Amazon EC2 instance inside the VPC. Configure the web application to upload by using the Amazon S3 access point. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 23

A company is launching a new application that requires a structured database to store user profiles, application settings, and transactional data. The database must be scalable with application traffic and must offer backups.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Deploy a self-managed database on Amazon EC2 instances by using open source software. Use Spot Instances for cost optimization. Configure automated backups to Amazon S3.
- **B.** Use Amazon Aurora Serverless for the database. Use serverless capacity scaling. Configure automated backups to Amazon S3. ✅
- **C.** Use Amazon RDS. Use on-demand capacity mode for the database with General Purpose SSD storage. Configure automatic backups with a retention period of 7 days.
- **D.** Deploy a self-managed NoSQL database on Amazon EC2 instances. Use Reserved Instances for cost optimization. Configure automated backups directly to Amazon S3 Glacier Flexible Retrieval.

**Answer:** B

**Explanation:**

Correct Answer:Use Amazon Aurora Serverless for the database. Use serverless capacity scaling. Configure automated backups to Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Aurora Serverless for the database. Use serverless capacity scaling. Configure automated backups to Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy a self-managed database on Amazon EC2 instances by using open source software. Use Spot Instances for cost optimization. Configure automated backups to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon RDS. Use on-demand capacity mode for the database with General Purpose SSD storage. Configure automatic backups with a retention period of 7 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy a self-managed NoSQL database on Amazon EC2 instances. Use Reserved Instances for cost optimization. Configure automated backups directly to Amazon S3 Glacier Flexible Retrieval. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 24

A company runs an on-premises application on a Kubernetes cluster. The company recently added millions of new customers. The company's existing on-premises infrastructure is unable to handle the large number of new customers. The company needs to migrate the on-premises application to the AWS Cloud.
The company will migrate to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. The company does not want to manage the underlying compute infrastructure for the new architecture on AWS.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use managed node groups with Karpenter to supply compute capacity. Deploy the application to the new EKS cluster.
- **B.** Use AWS Fargate to supply compute capacity. Create a Fargate profile. Use the Fargate profile to deploy the application. ✅
- **C.** Use a self-managed node to supply compute capacity. Deploy the application to the new EKS cluster.
- **D.** Use managed node groups to supply compute capacity. Deploy the application to the new EKS cluster.

**Answer:** B

**Explanation:**

Correct Answer:Use AWS Fargate to supply compute capacity. Create a Fargate profile. Use the Fargate profile to deploy the application.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Fargate to supply compute capacity. Create a Fargate profile. Use the Fargate profile to deploy the application. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use managed node groups with Karpenter to supply compute capacity. Deploy the application to the new EKS cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a self-managed node to supply compute capacity. Deploy the application to the new EKS cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use managed node groups to supply compute capacity. Deploy the application to the new EKS cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 25

A company has migrated an application to Amazon EC2 Linux instances. One of these EC2 instances runs several 1-hour tasks on a schedule. These tasks were written by different teams and have no common programming language. The company is concerned about performance and scalability while these tasks run on a single instance. A solutions architect needs to implement a solution to resolve these concerns.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Amazon Machine Image (AMI) of the EC2 instance that runs the tasks. Create an Auto Scaling group with the AMI to run multiple copies of the instance.
- **B.** Copy the tasks into AWS Lambda functions. Schedule the Lambda functions by using Amazon EventBridge (Amazon CloudWatch Events).
- **C.** Convert the EC2 instance to a container. Use AWS App Runner to create the container on demand to run the tasks as jobs.
- **D.** Use AWS Batch to run the tasks as jobs. Schedule the jobs by using Amazon EventBridge (Amazon CloudWatch Events). ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS Batch to run the tasks as jobs. Schedule the jobs by using Amazon EventBridge (Amazon CloudWatch Events).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Batch to run the tasks as jobs. Schedule the jobs by using Amazon EventBridge (Amazon CloudWatch Events). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Machine Image (AMI) of the EC2 instance that runs the tasks. Create an Auto Scaling group with the AMI to run multiple copies of the instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Copy the tasks into AWS Lambda functions. Schedule the Lambda functions by using Amazon EventBridge (Amazon CloudWatch Events). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Convert the EC2 instance to a container. Use AWS App Runner to create the container on demand to run the tasks as jobs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 26

A company hosts a multi-tier web application that uses an Amazon Aurora MySQL DB cluster for storage. The application tier is hosted on Amazon EC2 instances. The company's IT security guidelines mandate that the database credentials be encrypted and rotated every 14 days.
What should a solutions architect do to meet this requirement with the LEAST operational effort?

- **A.** Create a new AWS Key Management Service (AWS KMS) encryption key. Use AWS Secrets Manager to create a new secret that uses the KMS key with the appropriate credentials. Associate the secret with the Aurora DB cluster. Configure a custom rotation period of 14 days. ✅
- **B.** Create two parameters in AWS Systems Manager Parameter Store: one for the user name as a string parameter and one that uses the SecureString type for the password. Select AWS Key Management Service (AWS KMS) encryption for the password parameter, and load these parameters in the application tier. Implement an AWS Lambda function that rotates the password every 14 days.
- **C.** Store a file that contains the credentials in an AWS Key Management Service (AWS KMS) encrypted Amazon S3 bucket that the application uses to load the credentials. Download the file to the application regularly to ensure that the correct credentials are used. Implement an AWS Lambda function that rotates the Aurora credentials every 14 days and uploads these credentials to the file in the S3 bucket.
- **D.** Store a file that contains the credentials in an AWS Key Management Service (AWS KMS) encrypted Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system in all EC2 instances of the application tier. Restrict the access to the file on the file system so that the application can read the file and that only super users can modify the file. Implement an AWS Lambda function that rotates the key in Aurora every 14 days and writes new credentials into the file.

**Answer:** A

**Explanation:**

Correct Answer:Create a new AWS Key Management Service (AWS KMS) encryption key. Use AWS Secrets Manager to create a new secret that uses the KMS key with the appropriate credentials. Associate the secret with the Aurora DB cluster. Configure a custom rotation period of 14 days.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a new AWS Key Management Service (AWS KMS) encryption key. Use AWS Secrets Manager to create a new secret that uses the KMS key with the appropriate credentials. Associate the secret with the Aurora DB cluster. Configure a custom rotation period of 14 days. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create two parameters in AWS Systems Manager Parameter Store: one for the user name as a string parameter and one that uses the SecureString type for the password. Select AWS Key Management Service (AWS KMS) encryption for the password parameter, and load these parameters in the application tier. Implement an AWS Lambda function that rotates the password every 14 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store a file that contains the credentials in an AWS Key Management Service (AWS KMS) encrypted Amazon S3 bucket that the application uses to load the credentials. Download the file to the application regularly to ensure that the correct credentials are used. Implement an AWS Lambda function that rotates the Aurora credentials every 14 days and uploads these credentials to the file in the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store a file that contains the credentials in an AWS Key Management Service (AWS KMS) encrypted Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system in all EC2 instances of the application tier. Restrict the access to the file on the file system so that the application can read the file and that only super users can modify the file. Implement an AWS Lambda function that rotates the key in Aurora every 14 days and writes new credentials into the file. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 27

A solutions architect is creating an application that will handle batch processing of large amounts of data. The input data will be held in Amazon S3 and the output data will be stored in a different S3 bucket. For processing, the application will transfer the data over the network between multiple Amazon EC2 instances.
What should the solutions architect do to reduce the overall data transfer costs?

- **A.** Place all the EC2 instances in the same Availability Zone. ✅
- **B.** Place all the EC2 instances in private subnets in multiple Availability Zones.
- **C.** Place all the EC2 instances in the same AWS Region.
- **D.** Place all the EC2 instances in an Auto Scaling group.

**Answer:** A

**Explanation:**

Correct Answer:Place all the EC2 instances in the same Availability Zone.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Place all the EC2 instances in the same Availability Zone. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Place all the EC2 instances in private subnets in multiple Availability Zones. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Place all the EC2 instances in the same AWS Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Place all the EC2 instances in an Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 28

A company's software development team needs an Amazon RDS Multi-AZ cluster. The RDS cluster will serve as a backend for a desktop client that is deployed on premises. The desktop client requires direct connectivity to the RDS cluster.
The company must give the development team the ability to connect to the cluster by using the client when the team is in the office.
Which solution provides the required connectivity MOST securely?

- **A.** Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office.
- **B.** Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Create a cluster user for each developer. Use RDS security groups to allow the users to access the cluster.
- **C.** Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office. ✅
- **D.** Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use RDS security groups to allow the company's office IP ranges to access the cluster.

**Answer:** C

**Explanation:**

Correct Answer:Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Use AWS Site-to-Site VPN with a customer gateway in the company's office. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPC and two public subnets. Create the RDS cluster in the public subnets. Create a cluster user for each developer. Use RDS security groups to allow the users to access the cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPC and two private subnets. Create the RDS cluster in the private subnets. Use RDS security groups to allow the company's office IP ranges to access the cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 29

A company uses GPS trackers to document the migration patterns of thousands of sea turtles. The trackers check every 5 minutes to see if a turtle has moved more than 100 yards (91.4 meters). If a turtle has moved, its tracker sends the new coordinates to a web application running on three Amazon EC2 instances that are in multiple Availability Zones in one AWS Region.
Recently, the web application was overwhelmed while processing an unexpected volume of tracker data. Data was lost with no way to replay the events. A solutions architect must prevent this problem from happening again and needs a solution with the least operational overhead.
What should the solutions architect do to meet these requirements?

- **A.** Create an Amazon S3 bucket to store the data. Configure the application to scan for new data in the bucket for processing.
- **B.** Create an Amazon API Gateway endpoint to handle transmitted location coordinates. Use an AWS Lambda function to process each item concurrently.
- **C.** Create an Amazon Simple Queue Service (Amazon SQS) queue to store the incoming data. Configure the application to poll for new messages for processing. ✅
- **D.** Create an Amazon DynamoDB table to store transmitted location coordinates. Configure the application to query the table for new data for processing. Use TTL to remove data that has been processed.

**Answer:** C

**Explanation:**

Correct Answer:Create an Amazon Simple Queue Service (Amazon SQS) queue to store the incoming data. Configure the application to poll for new messages for processing.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Simple Queue Service (Amazon SQS) queue to store the incoming data. Configure the application to poll for new messages for processing. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon S3 bucket to store the data. Configure the application to scan for new data in the bucket for processing. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon API Gateway endpoint to handle transmitted location coordinates. Use an AWS Lambda function to process each item concurrently. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon DynamoDB table to store transmitted location coordinates. Configure the application to query the table for new data for processing. Use TTL to remove data that has been processed. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 30

A company is planning to migrate a legacy application to AWS. The application currently uses NFS to communicate to an on-premises storage solution to store application data. The application cannot be modified to use any other communication protocols other than NFS for this purpose.
Which storage solution should a solutions architect recommend for use after the migration?

- **A.** Amazon Elastic Block Store (Amazon EBS)
- **B.** AWS DataSync
- **C.** Amazon EMR File System (Amazon EMRFS)
- **D.** Amazon Elastic File System (Amazon EFS) ✅

**Answer:** D

**Explanation:**

Correct Answer:Amazon Elastic File System (Amazon EFS)

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Amazon Elastic File System (Amazon EFS) - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Amazon Elastic Block Store (Amazon EBS) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- AWS DataSync - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon EMR File System (Amazon EMRFS) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 31

A company runs database workloads on AWS that are the backend for the company's customer portals. The company runs a Multi-AZ database cluster on Amazon RDS for PostgreSQL.
The company needs to implement a 30-day backup retention policy. The company currently has both automated RDS backups and manual RDS backups. The company wants to maintain both types of existing RDS backups that are less than 30 days old.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure the RDS backup retention policy to 30 days for automated backups by using AWS Backup. Manually delete manual backups that are older than 30 days.
- **B.** Disable RDS automated backups. Delete automated backups and manual backups that are older than 30 days. Configure the RDS backup retention policy to 30 days for automated backups.
- **C.** Configure the RDS backup retention policy to 30 days for automated backups. Manually delete manual backups that are older than 30 days. ✅
- **D.** Disable RDS automated backups. Delete automated backups and manual backups that are older than 30 days automatically by using AWS CloudFormation. Configure the RDS backup retention policy to 30 days for automated backups.

**Answer:** C

**Explanation:**

Correct Answer:Configure the RDS backup retention policy to 30 days for automated backups. Manually delete manual backups that are older than 30 days.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the RDS backup retention policy to 30 days for automated backups. Manually delete manual backups that are older than 30 days. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the RDS backup retention policy to 30 days for automated backups by using AWS Backup. Manually delete manual backups that are older than 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Disable RDS automated backups. Delete automated backups and manual backups that are older than 30 days. Configure the RDS backup retention policy to 30 days for automated backups. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Disable RDS automated backups. Delete automated backups and manual backups that are older than 30 days automatically by using AWS CloudFormation. Configure the RDS backup retention policy to 30 days for automated backups. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 32

A company is designing the architecture for a new mobile app that uses the AWS Cloud. The company uses organizational units (OUs) in AWS Organizations to manage its accounts. The company wants to tag Amazon EC2 instances with data sensitivity by using values of sensitive and nonsensitive. IAM identities must not be able to delete a tag or create instances without a tag.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** In Organizations, create a new tag policy that specifies the data sensitivity tag key and the required values. Enforce the tag values for the EC2 instances. Attach the tag policy to the appropriate OU. ✅
- **B.** In Organizations, create a new service control policy (SCP) that specifies the data sensitivity tag key and the required tag values. Enforce the tag values for the EC2 instances. Attach the SCP to the appropriate OU.
- **C.** Create an AWS Config rule to check if EC2 instances use the data sensitivity tag and the specified values. Configure an AWS Lambda function to delete the resource if a noncompliant resource is found.
- **D.** Create a tag policy to deny running instances when a tag key is not specified. Create another tag policy that prevents identities from deleting tags. Attach the tag policies to the appropriate OU.
- **E.** Create a service control policy (SCP) to deny creating instances when a tag key is not specified. Create another SCP that prevents identities from deleting tags. Attach the SCPs to the appropriate OU. ✅

**Answer:** A, E

**Explanation:**

Correct Answer:In Organizations, create a new tag policy that specifies the data sensitivity tag key and the required values. Enforce the tag values for the EC2 instances. Attach the tag policy to the appropriate OU.; Create a service control policy (SCP) to deny creating instances when a tag key is not specified. Create another SCP that prevents identities from deleting tags. Attach the SCPs to the appropriate OU.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- In Organizations, create a new tag policy that specifies the data sensitivity tag key and the required values. Enforce the tag values for the EC2 instances. Attach the tag policy to the appropriate OU. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a service control policy (SCP) to deny creating instances when a tag key is not specified. Create another SCP that prevents identities from deleting tags. Attach the SCPs to the appropriate OU. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- In Organizations, create a new service control policy (SCP) that specifies the data sensitivity tag key and the required tag values. Enforce the tag values for the EC2 instances. Attach the SCP to the appropriate OU. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Config rule to check if EC2 instances use the data sensitivity tag and the specified values. Configure an AWS Lambda function to delete the resource if a noncompliant resource is found. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a tag policy to deny running instances when a tag key is not specified. Create another tag policy that prevents identities from deleting tags. Attach the tag policies to the appropriate OU. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 33

A company recently launched a new application for its customers. The application runs on multiple Amazon EC2 instances across two Availability Zones. End users use TCP to communicate with the application.
The application must be highly available and must automatically scale as the number of users increases.
Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

- **A.** Add a Network Load Balancer in front of the EC2 instances. ✅
- **B.** Add an Application Load Balancer in front of the EC2 instances.
- **C.** Configure an Auto Scaling group for the EC2 instances. ✅
- **D.** Add a Gateway Load Balancer in front of the EC2 instances.
- **E.** Manually add more EC2 instances for the application.

**Answer:** A, C

**Explanation:**

Correct Answer:Add a Network Load Balancer in front of the EC2 instances.; Configure an Auto Scaling group for the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add a Network Load Balancer in front of the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure an Auto Scaling group for the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add an Application Load Balancer in front of the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add a Gateway Load Balancer in front of the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Manually add more EC2 instances for the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 34

A company is testing an application that runs on an Amazon EC2 Linux instance. A single 500 GB Amazon Elastic Block Store (Amazon EBS) General Purpose SSO (gp2) volume is attached to the EC2 instance.
The company will deploy the application on multiple EC2 instances in an Auto Scaling group. All instances require access to the data that is stored in the EBS volume. The company needs a highly available and resilient solution that does not introduce significant changes to the application's code.
Which solution will meet these requirements?

- **A.** Provision an EC2 instance that uses NFS server software. Attach a single 500 GB gp2 EBS volume to the instance.
- **B.** Provision an Amazon FSx for Windows File Server file system. Configure the file system as an SMB file store within a single Availability Zone.
- **C.** Provision an EC2 instance with two 250 GB Provisioned IOPS SSD EBS volumes.
- **D.** Provision an Amazon Elastic File System (Amazon EFS) file system. Configure the file system to use General Purpose performance mode. ✅

**Answer:** D

**Explanation:**

Correct Answer:Provision an Amazon Elastic File System (Amazon EFS) file system. Configure the file system to use General Purpose performance mode.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision an Amazon Elastic File System (Amazon EFS) file system. Configure the file system to use General Purpose performance mode. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Provision an EC2 instance that uses NFS server software. Attach a single 500 GB gp2 EBS volume to the instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an Amazon FSx for Windows File Server file system. Configure the file system as an SMB file store within a single Availability Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an EC2 instance with two 250 GB Provisioned IOPS SSD EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 35

A company stores user data in AWS. The data is used continuously with peak usage during business hours. Access patterns vary, with some data not being used for months at a time. A solutions architect must choose a cost-effective solution that maintains the highest level of durability while maintaining high availability.
Which storage solution meets these requirements?

- **A.** Amazon S3 Standard
- **B.** Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)
- **C.** Amazon S3 Intelligent-Tiering ✅
- **D.** Amazon S3 Glacier Deep Archive

**Answer:** C

**Explanation:**

Correct Answer:Amazon S3 Intelligent-Tiering

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Amazon S3 Intelligent-Tiering - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Amazon S3 Standard - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon S3 Glacier Deep Archive - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 36

A company hosts its main public web application in one AWS Region across multiple Availability Zones. The application uses an Amazon EC2 Auto Scaling group and an Application Load Balancer (ALB).
A web development team needs a cost-optimized compute solution to improve the company’s ability to serve dynamic content globally to millions of customers.
Which solution will meet these requirements?

- **A.** Create an Amazon CloudFront distribution. Configure the existing ALB as the origin. ✅
- **B.** Use Amazon Route 53 to serve traffic to the ALB and EC2 instances based on the geographic location of each customer.
- **C.** Create an Amazon S3 bucket with public read access enabled. Migrate the web application to the S3 bucket. Configure the S3 bucket for website hosting.
- **D.** Use AWS Direct Connect to directly serve content from the web application to the location of each customer.

**Answer:** A

**Explanation:**

Correct Answer:Create an Amazon CloudFront distribution. Configure the existing ALB as the origin.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon CloudFront distribution. Configure the existing ALB as the origin. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Route 53 to serve traffic to the ALB and EC2 instances based on the geographic location of each customer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 bucket with public read access enabled. Migrate the web application to the S3 bucket. Configure the S3 bucket for website hosting. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Direct Connect to directly serve content from the web application to the location of each customer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 37

A company hosts its core network services, including directory services and DNS, in its on-premises data center. The data center is connected to the AWS Cloud using AWS Direct Connect (DX). Additional AWS accounts are planned that will require quick, cost-effective, and consistent access to these network services.
What should a solutions architect implement to meet these requirements with the LEAST amount of operational overhead?

- **A.** Configure AWS Transit Gateway between the accounts. Assign DX to the transit gateway and route network traffic to the on-premises servers. ✅
- **B.** Create a DX connection in each new account. Route the network traffic to the on-premises servers.
- **C.** Configure VPC endpoints in the DX VPC for all required services. Route the network traffic to the on-premises servers.
- **D.** Create a VPN connection between each new account and the DX VPRoute the network traffic to the on-premises servers.

**Answer:** A

**Explanation:**

Correct Answer:Configure AWS Transit Gateway between the accounts. Assign DX to the transit gateway and route network traffic to the on-premises servers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure AWS Transit Gateway between the accounts. Assign DX to the transit gateway and route network traffic to the on-premises servers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a DX connection in each new account. Route the network traffic to the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure VPC endpoints in the DX VPC for all required services. Route the network traffic to the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPN connection between each new account and the DX VPRoute the network traffic to the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 38

A company has an Amazon S3 bucket that contains sensitive data files. The company has an application that runs on virtual machines in an on-premises data center. The company currently uses AWS IAM Identity Center.
The application requires temporary access to files in the S3 bucket. The company wants to grant the application secure access to the files in the S3 bucket.
Which solution will meet these requirements?

- **A.** Create an S3 bucket policy that permits access to the bucket from the public IP address range of the company’s on-premises data center.
- **B.** Use IAM Roles Anywhere to obtain security credentials in IAM Identity Center that grant access to the S3 bucket. Configure the virtual machines to assume the role by using the AWS CLI. ✅
- **C.** Create an IAM user and policy that grants access to the bucket. Store the access key and secret key for the IAM user in AWS Secrets Manager. Configure the application to retrieve the access key and secret key at startup.
- **D.** Install the AWS CLI on the virtual machine. Configure the AWS CLI with access keys from an IAM user that has access to the bucket.

**Answer:** B

**Explanation:**

Correct Answer:Use IAM Roles Anywhere to obtain security credentials in IAM Identity Center that grant access to the S3 bucket. Configure the virtual machines to assume the role by using the AWS CLI.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use IAM Roles Anywhere to obtain security credentials in IAM Identity Center that grant access to the S3 bucket. Configure the virtual machines to assume the role by using the AWS CLI. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an S3 bucket policy that permits access to the bucket from the public IP address range of the company's on-premises data center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM user and policy that grants access to the bucket. Store the access key and secret key for the IAM user in AWS Secrets Manager. Configure the application to retrieve the access key and secret key at startup. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Install the AWS CLI on the virtual machine. Configure the AWS CLI with access keys from an IAM user that has access to the bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 39

A company is building a cloud-based application on AWS that will handle sensitive customer data. The application uses Amazon RDS for the database, Amazon S3 for object storage, and S3 Event Notifications that invoke AWS Lambda for serverless processing.
The company uses AWS IAM Identity Center to manage user credentials. The development, testing, and operations teams need secure access to Amazon RDS and Amazon S3 while ensuring the confidentiality of sensitive customer data. The solution must comply with the principle of least privilege.
Which solution meets these requirements with the LEAST operational overhead?

- **A.** Create individual IAM users for each member in all the teams with role-based permissions. Assign the IAM roles with predefined policies for RDS and S3 access to each user based on user needs. Implement IAM Access Analyzer for periodic credential evaluation.
- **B.** Use AWS Organizations to create separate accounts for each team. Implement cross-account IAM roles with least privilege. Grant specific permission for RDS and S3 access based on team roles and responsibilities.
- **C.** Enable IAM Identity Center with an Identity Center directory. Create and configure permission sets with granular access to Amazon RDS and Amazon S3. Assign all the teams to groups that have specific access with the permission sets. ✅
- **D.** Use IAM roles with least privilege to grant all the teams access. Assign IAM roles to each team with customized IAM policies defining specific permission for Amazon RDS and S3 object access based on team responsibilities.

**Answer:** C

**Explanation:**

Correct Answer:Enable IAM Identity Center with an Identity Center directory. Create and configure permission sets with granular access to Amazon RDS and Amazon S3. Assign all the teams to groups that have specific access with the permission sets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable IAM Identity Center with an Identity Center directory. Create and configure permission sets with granular access to Amazon RDS and Amazon S3. Assign all the teams to groups that have specific access with the permission sets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create individual IAM users for each member in all the teams with role-based permissions. Assign the IAM roles with predefined policies for RDS and S3 access to each user based on user needs. Implement IAM Access Analyzer for periodic credential evaluation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Organizations to create separate accounts for each team. Implement cross-account IAM roles with least privilege. Grant specific permission for RDS and S3 access based on team roles and responsibilities. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use IAM roles with least privilege to grant all the teams access. Assign IAM roles to each team with customized IAM policies defining specific permission for Amazon RDS and S3 object access based on team responsibilities. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 40

A company hosts its application on several Amazon EC2 instances inside a VPC. The company creates a dedicated Amazon S3 bucket for each customer to store their relevant information in Amazon S3.
The company wants to ensure that the application running on EC2 instances can securely access only the S3 buckets that belong to the company’s AWS account.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy to provide access to only the specific buckets that the application needs.
- **B.** Create a NAT gateway in a public subnet with a security group that allows access to only Amazon S3. Update the route tables to use the NAT Gateway.
- **C.** Create a NAT Gateway in a public subnet. Update route tables to use the NAT Gateway. Assign bucket policies for all buckets with a Deny action and the following condition key: { "StringNotEquals" : { "s3:ResourceAccount" : [ "CompanyAWSAccountNumber" ] } }
- **D.** Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy with a Deny action and the following condition key: { "StringNotEquals" : { "s3:ResourceAccount" : [ "CompanyAWSAccountNumber" ] } } ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy with a Deny action and the following condition key: { "StringNotEquals" : { "s3:ResourceAccount" : [ "CompanyAWSAccountNumber" ] } }

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy with a Deny action and the following condition key: { "StringNotEquals" : { "s3:ResourceAccount" : [ "CompanyAWSAccountNumber" ] } } - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a gateway endpoint for Amazon S3 that is attached to the VPC. Update the IAM instance profile policy to provide access to only the specific buckets that the application needs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a NAT gateway in a public subnet with a security group that allows access to only Amazon S3. Update the route tables to use the NAT Gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a NAT Gateway in a public subnet. Update route tables to use the NAT Gateway. Assign bucket policies for all buckets with a Deny action and the following condition key: { "StringNotEquals" : { "s3:ResourceAccount" : [ "CompanyAWSAccountNumber" ] } } - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 41

A company is developing a new application that uses a relational database to store user data and application configurations. The company expects the application to have steady user growth. The company expects the database usage to be variable and read-heavy, with occasional writes.
The company wants to cost-optimize the database solution. The company wants to use an AWS managed database solution that will provide the necessary performance.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Deploy the database on Amazon RDS. Use Provisioned IOPS SSD storage to ensure consistent performance for read and write operations.
- **B.** Deploy the database on Amazon Aurora Serverless to automatically scale the database capacity based on actual usage to accommodate the workload. ✅
- **C.** Deploy the database on Amazon RDS. Use magnetic storage and use read replicas to accommodate the workload.
- **D.** Deploy the database on Amazon DynamoDB. Use on-demand capacity mode to automatically scale throughput to accommodate the workload.

**Answer:** B

**Explanation:**

Correct Answer:Deploy the database on Amazon Aurora Serverless to automatically scale the database capacity based on actual usage to accommodate the workload.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy the database on Amazon Aurora Serverless to automatically scale the database capacity based on actual usage to accommodate the workload. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy the database on Amazon RDS. Use Provisioned IOPS SSD storage to ensure consistent performance for read and write operations. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the database on Amazon RDS. Use magnetic storage and use read replicas to accommodate the workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the database on Amazon DynamoDB. Use on-demand capacity mode to automatically scale throughput to accommodate the workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 42

A company is migrating its on-premises Oracle database to an Amazon RDS for Oracle database. The company needs to retain data for 90 days to meet regulatory requirements. The company must also be able to restore the database to a specific point in time for up to 14 days.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create Amazon RDS automated backups. Set the retention period to 90 days.
- **B.** Use the Amazon Aurora Clone feature for Oracle to create a point-in-time restore. Delete clones that are older than 90 days.
- **C.** Create an Amazon RDS manual snapshot every day. Delete manual snapshots that are older than 90 days.
- **D.** Create a backup plan that has a retention period of 90 days by using AWS Backup for Amazon RDS with Point In Time Recovery enabled. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a backup plan that has a retention period of 90 days by using AWS Backup for Amazon RDS with Point In Time Recovery enabled.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a backup plan that has a retention period of 90 days by using AWS Backup for Amazon RDS with Point In Time Recovery enabled. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create Amazon RDS automated backups. Set the retention period to 90 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the Amazon Aurora Clone feature for Oracle to create a point-in-time restore. Delete clones that are older than 90 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon RDS manual snapshot every day. Delete manual snapshots that are older than 90 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 43

A financial services company plans to launch a new application on AWS to handle sensitive financial transactions. The company will deploy the application on Amazon EC2 instances behind an Application Load Balancer. The company will use Amazon RDS for MySQL as the database. The company’s security policies mandate that data must be encrypted at rest and in transit.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure IPsec tunnels for encryption in transit.
- **B.** Implement third-party application-level data encryption before storing data in Amazon RDS for MySQL. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit.
- **C.** Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit. ✅
- **D.** Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure a VPN connection to enable private connectivity to encrypt data in transit.

**Answer:** C

**Explanation:**

Correct Answer:Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure IPsec tunnels for encryption in transit. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement third-party application-level data encryption before storing data in Amazon RDS for MySQL. Configure AWS Certificate Manager (ACM) SSL/TLS certificates for encryption in transit. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure encryption at rest for Amazon RDS for MySQL by using AWS KMS managed keys. Configure a VPN connection to enable private connectivity to encrypt data in transit. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 44

A company hosts its web application on AWS using seven Amazon EC2 instances. The company requires that the IP addresses of all healthy EC2 instances be returned in response to DNS queries.
Which policy should be used to meet this requirement?

- **A.** Geocation routing policy
- **B.** Latency routing policy
- **C.** Multivalue routing policy ✅
- **D.** Simple routing policy

**Answer:** C

**Explanation:**

Correct Answer:Multivalue routing policy

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Multivalue routing policy - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Geocation routing policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Latency routing policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Simple routing policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 45

A weather forecasting company collects temperature readings from various sensors on a continuous basis. An existing data ingestion process collects the readings and aggregates the readings into larger Apache Parquet files. Then the process encrypts the files by using client-side encryption with KMS managed keys (CSE-KMS). Finally, the process writes the files to an Amazon S3 bucket with separate prefixes for each calendar day.
The company wants to run occasional SQL queries on the data to take sample moving averages for a specific calendar day.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure Amazon Athena to read the encrypted files. Run SQL queries on the data directly in Amazon S3. ✅
- **B.** Configure Amazon Redshift to read the encrypted files. Use Redshift Spectrum and Redshift query editor v2 to run SQL queries on the data directly in Amazon S3.
- **C.** Use Amazon S3 Select to run SQL queries on the data directly in Amazon S3.
- **D.** Configure Amazon EMR Serverless to read the encrypted files. Use Apache SparkSQL to run SQL queries on the data directly in Amazon S3.

**Answer:** A

**Explanation:**

Correct Answer:Configure Amazon Athena to read the encrypted files. Run SQL queries on the data directly in Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Athena to read the encrypted files. Run SQL queries on the data directly in Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon Redshift to read the encrypted files. Use Redshift Spectrum and Redshift query editor v2 to run SQL queries on the data directly in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 Select to run SQL queries on the data directly in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon EMR Serverless to read the encrypted files. Use Apache SparkSQL to run SQL queries on the data directly in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 46

A company hosts an application on AWS. The application gives users the ability to upload photos and store the photos in an Amazon S3 bucket. The company wants to use Amazon CloudFront and a custom domain name to upload the photo files to the S3 bucket in the eu-west-1 Region.
Which solution will meet these requirements? (Choose two.)

- **A.** Configure Amazon S3 to allow uploads from CloudFront origin access control (OAC). ✅
- **B.** Configure Amazon S3 to allow uploads from CloudFront. Configure S3 Transfer Acceleration.
- **C.** Configure Amazon S3 to allow uploads from CloudFront. Configure an Amazon S3 website endpoint.
- **D.** Use AWS Certificate Manager (ACM) to create a public certificate in eu-west-1. Use the certificate in CloudFront.
- **E.** Use AWS Certificate Manager (ACM) to create a public certificate in the us-east-1 Region. Use the certificate in CloudFront. ✅

**Answer:** A, E

**Explanation:**

Correct Answer:Configure Amazon S3 to allow uploads from CloudFront origin access control (OAC).; Use AWS Certificate Manager (ACM) to create a public certificate in the us-east-1 Region. Use the certificate in CloudFront.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon S3 to allow uploads from CloudFront origin access control (OAC). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use AWS Certificate Manager (ACM) to create a public certificate in the us-east-1 Region. Use the certificate in CloudFront. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon S3 to allow uploads from CloudFront. Configure S3 Transfer Acceleration. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon S3 to allow uploads from CloudFront. Configure an Amazon S3 website endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Certificate Manager (ACM) to create a public certificate in eu-west-1. Use the certificate in CloudFront. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 47

A company is designing a web application with an internet-facing Application Load Balancer (ALB).
The company needs the ALB to receive HTTPS web traffic from the public internet. The ALB must send only HTTPS traffic to the web application servers hosted on the Amazon EC2 instances on port 443. The ALB must perform a health check of the web application servers over HTTPS on port 8443.
Which combination of configurations of the security group that is associated with the ALB will meet these requirements? (Choose three.)

- **A.** Allow all outbound traffic to 0.0.0.0/0 for port 443.
- **B.** Allow HTTPS outbound traffic to the web application instances for port 443. ✅
- **C.** Allow HTTPS inbound traffic from the web application instances for port 443.
- **D.** Allow HTTPS inbound traffic from 0.0.0.0/0 for port 443. ✅
- **E.** Allow HTTPS inbound traffic from the web application instances for the health check on port 8443.
- **F.** Allow HTTPS outbound traffic to the web application instances for the health check on port 8443. ✅

**Answer:** B, D, F

**Explanation:**

Correct Answer:Allow HTTPS outbound traffic to the web application instances for port 443.; Allow HTTPS inbound traffic from 0.0.0.0/0 for port 443.; Allow HTTPS outbound traffic to the web application instances for the health check on port 8443.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Allow HTTPS outbound traffic to the web application instances for port 443. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Allow HTTPS inbound traffic from 0.0.0.0/0 for port 443. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Allow HTTPS outbound traffic to the web application instances for the health check on port 8443. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Allow all outbound traffic to 0.0.0.0/0 for port 443. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Allow HTTPS inbound traffic from the web application instances for port 443. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Allow HTTPS inbound traffic from the web application instances for the health check on port 8443. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 48

An online photo-sharing company stores its photos in an Amazon S3 bucket that exists in the us-west-1 Region. The company needs to store a copy of all new photos in the us-east-1 Region.
Which solution will meet this requirement with the LEAST operational effort?

- **A.** Create a second S3 bucket in us-east-1. Configure S3 event notifications on object creation and update events to invoke an AWS Lambda function to copy photos from the existing S3 bucket to the second S3 bucket.
- **B.** Create a second S3 bucket in us-east-1 across multiple Availability Zones. Create an S3 Lifecycle rule to save photos into the second S3 bucket.
- **C.** Create a cross-origin resource sharing (CORS) configuration of the existing S3 bucket. Specify us-east-1 in the CORS rule's AllowedOrigin element.
- **D.** Create a second S3 bucket in us-east-1. Use S3 Cross-Region Replication to copy photos from the existing S3 bucket to the second S3 bucket. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a second S3 bucket in us-east-1. Use S3 Cross-Region Replication to copy photos from the existing S3 bucket to the second S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a second S3 bucket in us-east-1. Use S3 Cross-Region Replication to copy photos from the existing S3 bucket to the second S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a second S3 bucket in us-east-1. Configure S3 event notifications on object creation and update events to invoke an AWS Lambda function to copy photos from the existing S3 bucket to the second S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a second S3 bucket in us-east-1 across multiple Availability Zones. Create an S3 Lifecycle rule to save photos into the second S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a cross-origin resource sharing (CORS) configuration of the existing S3 bucket. Specify us-east-1 in the CORS rule's AllowedOrigin element. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 49

A company is planning to deploy a business-critical application in the AWS Cloud. The application requires durable storage with consistent, low-latency performance.
Which type of storage should a solutions architect recommend to meet these requirements?

- **A.** Provisioned IOPS SSD Amazon Elastic Block Store (Amazon EBS) volume ✅
- **B.** Throughput Optimized HDD Amazon Elastic Block Store (Amazon EBS) volume
- **C.** Amazon ElastiCache for Memcached cluster
- **D.** Instance store volume

**Answer:** A

**Explanation:**

Correct Answer:Provisioned IOPS SSD Amazon Elastic Block Store (Amazon EBS) volume

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provisioned IOPS SSD Amazon Elastic Block Store (Amazon EBS) volume - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Throughput Optimized HDD Amazon Elastic Block Store (Amazon EBS) volume - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon ElastiCache for Memcached cluster - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Instance store volume - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 50

A company has deployed its newest product on AWS. The product runs in an Auto Scaling group behind a Network Load Balancer. The company stores the product’s objects in an Amazon S3 bucket.
The company recently experienced malicious attacks against its systems. The company needs a solution that continuously monitors for malicious activity in the AWS account, workloads, and access patterns to the S3 bucket. The solution must also report suspicious activity and display the information on a dashboard.
Which solution will meet these requirements?"

- **A.** Configure Amazon Macie to monitor and report findings to AWS Config.
- **B.** Configure Amazon Inspector to monitor and report findings to AWS CloudTrail.
- **C.** Configure Amazon GuardDuty to monitor and report findings to AWS Security Hub. ✅
- **D.** Configure AWS Config to monitor and report findings to Amazon EventBridge.

**Answer:** C

**Explanation:**

Correct Answer:Configure Amazon GuardDuty to monitor and report findings to AWS Security Hub.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon GuardDuty to monitor and report findings to AWS Security Hub. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon Macie to monitor and report findings to AWS Config. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Inspector to monitor and report findings to AWS CloudTrail. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Config to monitor and report findings to Amazon EventBridge. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 51

A company currently runs an on-premises application that uses ASP.NET on Linux machines. The application is resource-intensive and serves customers directly.
The company wants to modernize the application to .NET. The company wants to run the application on containers and to scale based on Amazon CloudWatch metrics. The company also wants to reduce the time spent on operational maintenance activities.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS App2Container to containerize the application. Use an AWS CloudFormation template to deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. ✅
- **B.** Use AWS App2Container to containerize the application. Use an AWS CloudFormation template to deploy the application to Amazon Elastic Container Service (Amazon ECS) on Amazon EC2 instances.
- **C.** Use AWS App Runner to containerize the application. Use App Runner to deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate.
- **D.** Use AWS App Runner to containerize the application. Use App Runner to deploy the application to Amazon Elastic Kubernetes Service (Amazon EKS) on Amazon EC2 instances.

**Answer:** A

**Explanation:**

Correct Answer:Use AWS App2Container to containerize the application. Use an AWS CloudFormation template to deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS App2Container to containerize the application. Use an AWS CloudFormation template to deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS App2Container to containerize the application. Use an AWS CloudFormation template to deploy the application to Amazon Elastic Container Service (Amazon ECS) on Amazon EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS App Runner to containerize the application. Use App Runner to deploy the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS App Runner to containerize the application. Use App Runner to deploy the application to Amazon Elastic Kubernetes Service (Amazon EKS) on Amazon EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 52

A finance company uses an on-premises search application to collect streaming data from various producers. The application provides real-time updates to search and visualization features.
The company is planning to migrate to AWS and wants to use an AWS native solution.
Which solution will meet these requirements?

- **A.** Use Amazon EMR to ingest and process the data streams to Amazon Redshift for storage. Use Amazon Redshift Spectrum to search the data. Use Amazon QuickSight to create visualizations.
- **B.** Use Amazon EC2 instances to ingest and process the data streams to Amazon S3 buckets tor storage. Use Amazon Athena to search the data. Use Amazon Managed Grafana to create visualizations.
- **C.** Use Amazon Kinesis Data Streams to ingest and process the data streams to Amazon OpenSearch Service. Use OpenSearch Service to search the data. Use Amazon QuickSight to create visualizations. ✅
- **D.** Use Amazon Elastic Kubernetes Service (Amazon EKS) to ingest and process the data streams to Amazon DynamoDB for storage. Use Amazon CloudWatch to create graphical dashboards to search and visualize the data.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon Kinesis Data Streams to ingest and process the data streams to Amazon OpenSearch Service. Use OpenSearch Service to search the data. Use Amazon QuickSight to create visualizations.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Kinesis Data Streams to ingest and process the data streams to Amazon OpenSearch Service. Use OpenSearch Service to search the data. Use Amazon QuickSight to create visualizations. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon EMR to ingest and process the data streams to Amazon Redshift for storage. Use Amazon Redshift Spectrum to search the data. Use Amazon QuickSight to create visualizations. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon EC2 instances to ingest and process the data streams to Amazon S3 buckets tor storage. Use Amazon Athena to search the data. Use Amazon Managed Grafana to create visualizations. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Kubernetes Service (Amazon EKS) to ingest and process the data streams to Amazon DynamoDB for storage. Use Amazon CloudWatch to create graphical dashboards to search and visualize the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 53

A solutions architect is designing an application that helps users fill out and submit registration forms. The solutions architect plans to use a two-tier architecture that includes a web application server tier and a worker tier.
The application needs to process submitted forms quickly. The application needs to process each form exactly once. The solution must ensure that no data is lost.
Which solution will meet these requirements?

- **A.** Use an Amazon Simple Queue Service (Amazon SQS) standard queue between the web application server tier and the worker tier to store and forward form data.
- **B.** Use an Amazon API Gateway HTTP API between the web application server tier and the worker tier to store and forward form data.
- **C.** Use an Amazon Simple Queue Service (Amazon SQS) FIFO queue between the web application server tier and the worker tier to store and forward form data. ✅
- **D.** Use an AWS Step Functions workflow. Create a synchronous workflow between the web application server tier and the worker tier that stores and forwards form data.

**Answer:** C

**Explanation:**

Correct Answer:Use an Amazon Simple Queue Service (Amazon SQS) FIFO queue between the web application server tier and the worker tier to store and forward form data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an Amazon Simple Queue Service (Amazon SQS) FIFO queue between the web application server tier and the worker tier to store and forward form data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an Amazon Simple Queue Service (Amazon SQS) standard queue between the web application server tier and the worker tier to store and forward form data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an Amazon API Gateway HTTP API between the web application server tier and the worker tier to store and forward form data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Step Functions workflow. Create a synchronous workflow between the web application server tier and the worker tier that stores and forwards form data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 54

A company is building a data analysis platform on AWS by using AWS Lake Formation. The platform will ingest data from different sources such as Amazon S3 and Amazon RDS. The company needs a secure solution to prevent access to portions of the data that contain sensitive information.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an AWS Lambda function that periodically queries and removes sensitive information from Lake Formation tables.
- **B.** Create an IAM role that includes permissions to access Lake Formation tables.
- **C.** Create an AWS Lambda function that removes sensitive information before Lake Formation ingests the data.
- **D.** Create data filters to implement row-level security and cell-level security. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create data filters to implement row-level security and cell-level security.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create data filters to implement row-level security and cell-level security. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Lambda function that periodically queries and removes sensitive information from Lake Formation tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM role that includes permissions to access Lake Formation tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function that removes sensitive information before Lake Formation ingests the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 55

A company is migrating an application from an on-premises environment to AWS. The application will store sensitive data in Amazon S3. The company must encrypt the data before storing the data in Amazon S3.
Which solution will meet these requirements?

- **A.** Encrypt the data by using client-side encryption with Amazon S3 managed keys.
- **B.** Encrypt the data by using client-side encryption with customer managed keys. ✅
- **C.** Encrypt the data by using server-side encryption with AWS KMS keys (SSE-KMS).
- **D.** Encrypt the data by using server-side encryption with customer-provided keys (SSE-C).

**Answer:** B

**Explanation:**

Correct Answer:Encrypt the data by using client-side encryption with customer managed keys.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Encrypt the data by using client-side encryption with customer managed keys. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Encrypt the data by using client-side encryption with Amazon S3 managed keys. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Encrypt the data by using server-side encryption with AWS KMS keys (SSE-KMS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Encrypt the data by using server-side encryption with customer-provided keys (SSE-C). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 56

A company has several on-premises Internet Small Computer Systems Interface (ISCSI) network storage servers. The company wants to reduce the number of these servers by moving to the AWS Cloud. A solutions architect must provide low-latency access to frequently used data and reduce the dependency on on-premises servers with a minimal number of infrastructure changes.
Which solution will meet these requirements?

- **A.** Deploy an AWS Storage Gateway volume gateway that is configured with cached volumes. ✅
- **B.** Deploy an AWS Storage Gateway volume gateway that is configured with stored volumes.
- **C.** Deploy Amazon Elastic Block Store (Amazon EBS) storage with backups to Amazon S3.
- **D.** Deploy an Amazon S3 File Gateway.

**Answer:** A

**Explanation:**

Correct Answer:Deploy an AWS Storage Gateway volume gateway that is configured with cached volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an AWS Storage Gateway volume gateway that is configured with cached volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an AWS Storage Gateway volume gateway that is configured with stored volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy Amazon Elastic Block Store (Amazon EBS) storage with backups to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Amazon S3 File Gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 57

A company will migrate 10 PB of data to Amazon S3 in 6 weeks. The current data center has a 500 Mbps uplink to the internet. Other on-premises applications share the uplink. The company can use 80% of the internet bandwidth for this one-time migration task.
Which solution will meet these requirements?

- **A.** Use rsync to transfer the data directly to Amazon S3.
- **B.** Order multiple AWS Snowball devices. Copy the data to the devices. Send the devices to AWS to copy the data to Amazon S3. ✅
- **C.** Use the AWS CLI and multiple copy processes to send the data directly to Amazon S3.
- **D.** Configure AWS DataSync to migrate the data to Amazon S3 and to automatically verify the data.

**Answer:** B

**Explanation:**

Correct Answer:Order multiple AWS Snowball devices. Copy the data to the devices. Send the devices to AWS to copy the data to Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Order multiple AWS Snowball devices. Copy the data to the devices. Send the devices to AWS to copy the data to Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use rsync to transfer the data directly to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the AWS CLI and multiple copy processes to send the data directly to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS DataSync to migrate the data to Amazon S3 and to automatically verify the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 58

A company is planning to migrate a TCP-based application into the company's VPC. The application is publicly accessible on a nonstandard TCP port through a hardware appliance in the company's data center. This public endpoint can process up to 3 million requests per second with low latency. The company requires the same level of performance for the new public endpoint in AWS.
What should a solutions architect recommend to meet this requirement?

- **A.** Deploy an Amazon CloudFront distribution that listens on the TCP port that the application requires. Use an Application Load Balancer as the origin.
- **B.** Deploy an Application Load Balancer (ALB). Configure the ALB to be publicly accessible over the TCP port that the application requires.
- **C.** Deploy an Amazon API Gateway API that is configured with the TCP port that the application requires. Configure AWS Lambda functions with provisioned concurrency to process the requests.
- **D.** Deploy a Network Load Balancer (NLB). Configure the NLB to be publicly accessible over the TCP port that the application requires. ✅

**Answer:** D

**Explanation:**

Correct Answer:Deploy a Network Load Balancer (NLB). Configure the NLB to be publicly accessible over the TCP port that the application requires.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy a Network Load Balancer (NLB). Configure the NLB to be publicly accessible over the TCP port that the application requires. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an Amazon CloudFront distribution that listens on the TCP port that the application requires. Use an Application Load Balancer as the origin. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Application Load Balancer (ALB). Configure the ALB to be publicly accessible over the TCP port that the application requires. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Amazon API Gateway API that is configured with the TCP port that the application requires. Configure AWS Lambda functions with provisioned concurrency to process the requests. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 59

A company uses AWS to host its public ecommerce website. The website uses an AWS Global Accelerator accelerator for traffic from the internet. The Global Accelerator accelerator forwards the traffic to an Application Load Balancer (ALB) that is the entry point for an Auto Scaling group.
The company recently identified a DDoS attack on the website. The company needs a solution to mitigate future attacks.
Which solution will meet these requirements with the LEAST implementation effort?

- **A.** Configure an AWS Lambda function to read the ALB metrics to block attacks by updating a VPC network ACL
- **B.** Configure an AWS WAF web ACL for the Global Accelerator accelerator to block traffic by using rate-based rules
- **C.** Configure an AWS WAF web ACL on the ALB to block traffic by using rate-based rules ✅
- **D.** Configure an Amazon CloudFront distribution in front of the Global Accelerator accelerator

**Answer:** C

**Explanation:**

Correct Answer:Configure an AWS WAF web ACL on the ALB to block traffic by using rate-based rules

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an AWS WAF web ACL on the ALB to block traffic by using rate-based rules - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an AWS Lambda function to read the ALB metrics to block attacks by updating a VPC network ACL - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an AWS WAF web ACL for the Global Accelerator accelerator to block traffic by using rate-based rules - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon CloudFront distribution in front of the Global Accelerator accelerator - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 60

A consumer survey company has gathered data for several years from a specific geographic region. The company stores this data in an Amazon S3 bucket in an AWS Region.
The company has started to share this data with a marketing firm in a new geographic region. The company has granted the firm's AWS account access to the S3 bucket. The company wants to minimize the data transfer costs when the marketing firm requests data from the S3 bucket.
Which solution will meet these requirements?

- **A.** Configure AWS Resource Access Manager to share the S3 bucket with the marketing firm AWS account.
- **B.** Configure S3 Cross-Region Replication (CRR) from the company’s S3 bucket to one of the marketing firm’s S3 buckets.
- **C.** Configure the Requester Pays feature on the company’s S3 bucket. ✅
- **D.** Configure the company’s S3 bucket to use S3 Intelligent-Tiering Sync the S3 bucket to one of the marketing firm’s S3 buckets.

**Answer:** C

**Explanation:**

Correct Answer:Configure the Requester Pays feature on the company's S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the Requester Pays feature on the company's S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Resource Access Manager to share the S3 bucket with the marketing firm AWS account. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure S3 Cross-Region Replication (CRR) from the company's S3 bucket to one of the marketing firm's S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the company's S3 bucket to use S3 Intelligent-Tiering Sync the S3 bucket to one of the marketing firm's S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 61

A company has multiple Amazon RDS DB instances that run in a development AWS account. All the instances have tags to identify them as development resources. The company needs the development DB instances to run on a schedule only during business hours.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Amazon EventBridge rule that invokes AWS Lambda functions to start and stop the RDS instances.
- **B.** Create an Amazon CloudWatch alarm to identify RDS instances that need to be stopped. Create an AWS Lambda function to start and stop the RDS instances.
- **C.** Create AWS Systems Manager State Manager associations to start and stop the RDS instances. ✅
- **D.** Create an AWS Trusted Advisor report to identify RDS instances to be started and stopped. Create an AWS Lambda function to start and stop the RDS instances.

**Answer:** C

**Explanation:**

Correct Answer:Create AWS Systems Manager State Manager associations to start and stop the RDS instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create AWS Systems Manager State Manager associations to start and stop the RDS instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon EventBridge rule that invokes AWS Lambda functions to start and stop the RDS instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudWatch alarm to identify RDS instances that need to be stopped. Create an AWS Lambda function to start and stop the RDS instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Trusted Advisor report to identify RDS instances to be started and stopped. Create an AWS Lambda function to start and stop the RDS instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 62

A global ecommerce company runs its critical workloads on AWS. The workloads use an Amazon RDS for PostgreSQL DB instance that is configured for a Multi-AZ deployment.
Customers have reported application timeouts when the company undergoes database failovers. The company needs a resilient solution to reduce failover time.
Which solution will meet these requirements?

- **A.** Take regular automatic snapshots. Copy the automatic snapshots to multiple AWS Regions.
- **B.** Create an Amazon RDS Proxy. Assign the proxy to the DB instance. ✅
- **C.** Create a read replica for the DB instance. Move the read traffic to the read replica.
- **D.** Enable Performance Insights. Monitor the CPU load to identify the timeouts.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon RDS Proxy. Assign the proxy to the DB instance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon RDS Proxy. Assign the proxy to the DB instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Take regular automatic snapshots. Copy the automatic snapshots to multiple AWS Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a read replica for the DB instance. Move the read traffic to the read replica. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable Performance Insights. Monitor the CPU load to identify the timeouts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 63

A company needs to design a hybrid network architecture. The company's workloads are currently stored in the AWS Cloud and in on-premises data centers. The workloads require single-digit latencies to communicate. The company uses an AWS Transit Gateway transit gateway to connect multiple VPCs.
Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

- **A.** Associate AWS Site-to-Site VPN connections with the transit gateway that is attached to the VPCs.
- **B.** Establish an AWS Direct Connect connection. Create a transit virtual interface (VIF) to a Direct Connect gateway. ✅
- **C.** Establish an AWS Site-to-Site VPN connection to an AWS Direct Connect gateway.
- **D.** Associate an AWS Direct Connect gateway with the transit gateway that is attached to the VPCs. ✅
- **E.** Establish an AWS Site-to-Site VPN connection to each VPC.

**Answer:** B, D

**Explanation:**

Correct Answer:Establish an AWS Direct Connect connection. Create a transit virtual interface (VIF) to a Direct Connect gateway.; Associate an AWS Direct Connect gateway with the transit gateway that is attached to the VPCs.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Establish an AWS Direct Connect connection. Create a transit virtual interface (VIF) to a Direct Connect gateway. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Associate an AWS Direct Connect gateway with the transit gateway that is attached to the VPCs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Associate AWS Site-to-Site VPN connections with the transit gateway that is attached to the VPCs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Establish an AWS Site-to-Site VPN connection to an AWS Direct Connect gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Establish an AWS Site-to-Site VPN connection to each VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 64

A company is migrating its data processing application to the AWS Cloud. The application processes several short-lived batch jobs that cannot be disrupted. Data is generated after each batch job is completed. The data is accessed for 30 days and retained for 2 years.
The company wants to keep the cost of running the application in the AWS Cloud as low as possible.
Which solution will meet these requirements?

- **A.** Deploy Amazon EC2 Spot Instances to run the batch jobs. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Flexible Retrieval after 30 days. Set an expiration to delete the data after 2 years.
- **B.** Deploy Amazon EC2 On-Demand Instances to run the batch jobs. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Deep Archive after 30 days. Set an expiration to delete the data after 2 years. ✅
- **C.** Migrate the data processing application to Amazon EC2 On-Demand Instances. Store the data in Amazon S3 Glacier Instant Retrieval. Move the data to S3 Glacier Deep Archive after 30 days. Set an expiration to delete the data after 2 years.
- **D.** Migrate the data processing application to Amazon EC2 Spot Instances. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Instant. Retrieval after 30 days. Set an expiration to delete the data after 2 years.

**Answer:** B

**Explanation:**

Correct Answer:Deploy Amazon EC2 On-Demand Instances to run the batch jobs. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Deep Archive after 30 days. Set an expiration to delete the data after 2 years.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy Amazon EC2 On-Demand Instances to run the batch jobs. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Deep Archive after 30 days. Set an expiration to delete the data after 2 years. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy Amazon EC2 Spot Instances to run the batch jobs. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Flexible Retrieval after 30 days. Set an expiration to delete the data after 2 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the data processing application to Amazon EC2 On-Demand Instances. Store the data in Amazon S3 Glacier Instant Retrieval. Move the data to S3 Glacier Deep Archive after 30 days. Set an expiration to delete the data after 2 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the data processing application to Amazon EC2 Spot Instances. Store the data in Amazon S3 Standard. Move the data to Amazon S3 Glacier Instant. Retrieval after 30 days. Set an expiration to delete the data after 2 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 65

A company's applications run on Amazon EC2 instances in Auto Scaling groups. The company notices that its applications experience sudden traffic increases on random days of the week. The company wants to maintain application performance during sudden traffic increases.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use schedule scaling to change the size of the Auto Scaling group.
- **B.** Use target tracking scaling to change the size of the Auto Scaling group. ✅
- **C.** Use predictive scaling to change the size of the Auto Scaling group.
- **D.** Use manual scaling to change the size of the Auto Scaling group.

**Answer:** B

**Explanation:**

Correct Answer:Use target tracking scaling to change the size of the Auto Scaling group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use target tracking scaling to change the size of the Auto Scaling group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use schedule scaling to change the size of the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use predictive scaling to change the size of the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use manual scaling to change the size of the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 66

A solutions architect is designing an application that will allow business users to upload objects to Amazon S3. The solution needs to maximize object durability. Objects also must be readily available at any time and for any length of time. Users will access objects frequently within the first 30 days after the objects are uploaded, but users are much less likely to access objects that are older than 30 days.
Which solution meets these requirements MOST cost-effectively?

- **A.** Store all the objects in S3 Intelligent-Tiering with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days.
- **B.** Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days.
- **C.** Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days. ✅
- **D.** Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Glacier after 30 days.

**Answer:** C

**Explanation:**

Correct Answer:Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store all the objects in S3 Intelligent-Tiering with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Glacier after 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 67

A company's infrastructure consists of hundreds of Amazon EC2 instances that use Amazon Elastic Block Store (Amazon EBS) storage. A solutions architect must ensure that every EC2 instance can be recovered after a disaster.
What should the solutions architect do to meet this requirement with the LEAST amount of effort?

- **A.** Take a snapshot of the EBS storage that is attached to each EC2 instance. Create an AWS CloudFormation template to launch new EC2 instances from the EBS storage.
- **B.** Take a snapshot of the EBS storage that is attached to each EC2 instance. Use AWS Elastic Beanstalk to set the environment based on the EC2 template and attach the EBS storage.
- **C.** Create an AWS Lambda function to take a snapshot of the EBS storage that is attached to each EC2 instance and copy the Amazon Machine Images (AMIs). Create another Lambda function to perform the restores with the copied AMIs and attach the EBS storage.
- **D.** Use AWS Backup to set up a backup plan for the entire group of EC2 instances. Use the AWS Backup API or the AWS CLI to speed up the restore process for multiple EC2 instances. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS Backup to set up a backup plan for the entire group of EC2 instances. Use the AWS Backup API or the AWS CLI to speed up the restore process for multiple EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Backup to set up a backup plan for the entire group of EC2 instances. Use the AWS Backup API or the AWS CLI to speed up the restore process for multiple EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Take a snapshot of the EBS storage that is attached to each EC2 instance. Create an AWS CloudFormation template to launch new EC2 instances from the EBS storage. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Take a snapshot of the EBS storage that is attached to each EC2 instance. Use AWS Elastic Beanstalk to set the environment based on the EC2 template and attach the EBS storage. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function to take a snapshot of the EBS storage that is attached to each EC2 instance and copy the Amazon Machine Images (AMIs). Create another Lambda function to perform the restores with the copied AMIs and attach the EBS storage. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 68

A company wants to move its application to a serverless solution. The serverless solution needs to analyze existing data and new data by using SQL. The company stores the data in an Amazon S3 bucket. The data must be encrypted at rest and replicated to a different AWS Region.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Configure Cross-Region Replication (CRR) on the existing S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3). Use Amazon Athena to query the data. ✅
- **B.** Create a new S3 bucket that uses server-side encryption with AWS KMS multi-Region keys (SSE-KMS). Configure Cross-Region Replication (CRR). Load the data into the new S3 bucket. Use Amazon Athena to query the data.
- **C.** Create a new S3 bucket that uses server-side encryption with Amazon S3 managed keys (SSE-S3). Configure Cross-Region Replication (CRR). Load the data into the new S3 bucket. Use Amazon RDS to query the data.
- **D.** Configure S3 Cross-Region Replication (CRR) on the existing S3 bucket. Use server-side encryption with AWS KMS multi-Region keys (SSE-KMS). Use Amazon RDS to query the data.

**Answer:** A

**Explanation:**

Correct Answer:Configure Cross-Region Replication (CRR) on the existing S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3). Use Amazon Athena to query the data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Cross-Region Replication (CRR) on the existing S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3). Use Amazon Athena to query the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new S3 bucket that uses server-side encryption with AWS KMS multi-Region keys (SSE-KMS). Configure Cross-Region Replication (CRR). Load the data into the new S3 bucket. Use Amazon Athena to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new S3 bucket that uses server-side encryption with Amazon S3 managed keys (SSE-S3). Configure Cross-Region Replication (CRR). Load the data into the new S3 bucket. Use Amazon RDS to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure S3 Cross-Region Replication (CRR) on the existing S3 bucket. Use server-side encryption with AWS KMS multi-Region keys (SSE-KMS). Use Amazon RDS to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 69

A company has a custom application with embedded credentials that retrieves information from a database in an Amazon RDS for MySQL DB cluster. The company needs to make the application more secure with minimal programming effort. The company has created credentials on the RDS for MySQL database for the application user.
Which solution will meet these requirements?

- **A.** Store the credentials in AWS Systems Manager Parameter Store. Configure the application to load the database credentials from Parameter Store. Set up a credentials rotation schedule in the RDS for MySQL database by using Parameter Store.
- **B.** Store the credentials in AWS Secrets Manager. Configure the application to load the database credentials from Secrets Manager. Set up a credentials rotation schedule by creating an AWS Lambda function for Secrets Manager. ✅
- **C.** Store the credentials in encrypted local storage. Configure the application to load the database credentials from the local storage. Set up a credentials rotation schedule by creating a cron job.
- **D.** Store the credentials in AWS Key Management Service (AWS KMS). Create keys in AWS KMS. Configure the application to load the database credentials from AWS KMS. Enable automatic key rotation

**Answer:** B

**Explanation:**

Correct Answer:Store the credentials in AWS Secrets Manager. Configure the application to load the database credentials from Secrets Manager. Set up a credentials rotation schedule by creating an AWS Lambda function for Secrets Manager.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the credentials in AWS Secrets Manager. Configure the application to load the database credentials from Secrets Manager. Set up a credentials rotation schedule by creating an AWS Lambda function for Secrets Manager. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the credentials in AWS Systems Manager Parameter Store. Configure the application to load the database credentials from Parameter Store. Set up a credentials rotation schedule in the RDS for MySQL database by using Parameter Store. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the credentials in encrypted local storage. Configure the application to load the database credentials from the local storage. Set up a credentials rotation schedule by creating a cron job. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the credentials in AWS Key Management Service (AWS KMS). Create keys in AWS KMS. Configure the application to load the database credentials from AWS KMS. Enable automatic key rotation - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 70

A solutions architect needs to connect a company's corporate network to its VPC to allow on-premises access to its AWS resources. The solution must provide encryption of all traffic between the corporate network and the VPC at the network layer and the session layer. The solution also must provide security controls to prevent unrestricted access between AWS and the on-premises systems.
Which solution meets these requirements?

- **A.** Create an IAM policy to allow access to the AWS Management Console only from a defined set of corporate IP addresses. Restrict user access based on job responsibility by using an IAM policy and roles.
- **B.** Configure AWS Direct Connect to connect to the VPC. Configure the VPC route tables to allow and deny traffic between AWS and on premises as required.
- **C.** Configure AWS Transit Gateway to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPC. Configure instance security groups and network ACLs to allow only required traffic from on premises.
- **D.** Configure AWS Site-to-Site VPN to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPConfigure instance security groups and network ACLs to allow only required traffic from on premises. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure AWS Site-to-Site VPN to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPConfigure instance security groups and network ACLs to allow only required traffic from on premises.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure AWS Site-to-Site VPN to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPConfigure instance security groups and network ACLs to allow only required traffic from on premises. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an IAM policy to allow access to the AWS Management Console only from a defined set of corporate IP addresses. Restrict user access based on job responsibility by using an IAM policy and roles. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Direct Connect to connect to the VPC. Configure the VPC route tables to allow and deny traffic between AWS and on premises as required. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Transit Gateway to connect to the VPC. Configure route table entries to direct traffic from on premises to the VPC. Configure instance security groups and network ACLs to allow only required traffic from on premises. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 71

A company has a multi-tier web application. The application's internal service components are deployed on Amazon EC2 instances. The internal service components need to access third-party software as a service (SaaS) APIs that are hosted on AWS.
The company needs to provide secure and private connectivity from the application's internal services to the third-party SaaS application. The company needs to ensure that there is minimal public internet exposure.
Which solution will meet these requirements?

- **A.** Implement an AWS Site-to-Site VPN to establish a secure connection with the third-party SaaS provider.
- **B.** Deploy AWS Transit Gateway to manage and route traffic between the application's VPC and the third-party SaaS provider.
- **C.** Configure AWS PrivateLink to allow only outbound traffic from the VPC without enabling the third-party SaaS provider to establish.
- **D.** Use AWS PrivateLink to create a private connection between the application's VPC and the third-party SaaS provider. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS PrivateLink to create a private connection between the application's VPC and the third-party SaaS provider.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS PrivateLink to create a private connection between the application's VPC and the third-party SaaS provider. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Implement an AWS Site-to-Site VPN to establish a secure connection with the third-party SaaS provider. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy AWS Transit Gateway to manage and route traffic between the application's VPC and the third-party SaaS provider. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS PrivateLink to allow only outbound traffic from the VPC without enabling the third-party SaaS provider to establish. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 72

A company wants to replicate existing and ongoing data changes from an on-premises Oracle database to Amazon RDS for Oracle. The amount of data to replicate varies throughout each day. The company wants to use AWS Database Migration Service (AWS DMS) for data replication. The solution must allocate only the capacity that the replication instance requires.
Which solution will meet these requirements?

- **A.** Create an AWS DMS Serverless replication task to analyze and replicate the data while provisioning the required capacity. ✅
- **B.** Configure the AWS DMS replication instance with a Multi-AZ deployment to provision instances across multiple Availability Zones.
- **C.** Use Amazon EC2 Auto Scaling to scale the size of the AWS DMS replication instance up or down based on the amount of data toreplicate.
- **D.** Provision AWS DMS replication capacity by using Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type to analyze and replicate the data while provisioning the required capacity.

**Answer:** A

**Explanation:**

Correct Answer:Create an AWS DMS Serverless replication task to analyze and replicate the data while provisioning the required capacity.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS DMS Serverless replication task to analyze and replicate the data while provisioning the required capacity. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the AWS DMS replication instance with a Multi-AZ deployment to provision instances across multiple Availability Zones. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon EC2 Auto Scaling to scale the size of the AWS DMS replication instance up or down based on the amount of data toreplicate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision AWS DMS replication capacity by using Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type to analyze and replicate the data while provisioning the required capacity. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 73

A company runs a Node js function on a server in its on-premises data center. The data center stores data in a PostgreSQL database. The company stores the credentials in a connection string in an environment variable on the server. The company wants to migrate its application to AWS and to replace the Node.js application server with AWS Lambda. The company also wants to migrate to Amazon RDS for PostgreSQL and to ensure that the database credentials are securely managed.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Store the database credentials as a parameter in AWS Systems Manager Parameter Store Configure Parameter Store to automatically rotate the secrets every 30 days. Update the Lambda function to retrieve the credentials from the parameter.
- **B.** Store the database credentials as a key in AWS Key Management Service (AWS KMS). Configure automatic rotation for the key. Update the Lambda function to retneve the credentials from the KMS key.
- **C.** Store the database credentials as a secret in AWS Secrets Manager. Configure Secrets Manager to automatically rotate the credentials every 30 days. Update the Lambda function to retrieve the credentials from the secret. ✅
- **D.** Store the database credentials as an encrypted Lambda environment variable. Write a custom Lambda function to rotate the credentials. Schedule the Lambda function to run every 30 days.

**Answer:** C

**Explanation:**

Correct Answer:Store the database credentials as a secret in AWS Secrets Manager. Configure Secrets Manager to automatically rotate the credentials every 30 days. Update the Lambda function to retrieve the credentials from the secret.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the database credentials as a secret in AWS Secrets Manager. Configure Secrets Manager to automatically rotate the credentials every 30 days. Update the Lambda function to retrieve the credentials from the secret. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the database credentials as a parameter in AWS Systems Manager Parameter Store Configure Parameter Store to automatically rotate the secrets every 30 days. Update the Lambda function to retrieve the credentials from the parameter. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the database credentials as a key in AWS Key Management Service (AWS KMS). Configure automatic rotation for the key. Update the Lambda function to retneve the credentials from the KMS key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the database credentials as an encrypted Lambda environment variable. Write a custom Lambda function to rotate the credentials. Schedule the Lambda function to run every 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 74

A company runs its production workload on an Amazon Aurora MySQL DB cluster that includes six Aurora Replicas. The company wants near-real-time reporting queries from one of its departments to be automatically distributed across three of the Aurora Replicas. Those three replicas have a different compute and memory specification from the rest of the DB cluster.
Which solution meets these requirements?

- **A.** Use the reader endpoint to automatically distribute the read-only workload
- **B.** Use any of the instance endpoints for the selected three nodes
- **C.** Create a three-node cluster clone and use the reader endpoint
- **D.** Create and use a custom endpoint for the workload ✅

**Answer:** D

**Explanation:**

Correct Answer:Create and use a custom endpoint for the workload

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create and use a custom endpoint for the workload - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the reader endpoint to automatically distribute the read-only workload - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use any of the instance endpoints for the selected three nodes - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a three-node cluster clone and use the reader endpoint - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 75

An ecommerce company runs several internal applications in multiple AWS accounts. The company uses AWS Organizations to manage its AWS accounts.
A security appliance in the company's networking account must inspect interactions between applications across AWS accounts.
Which solution will meet these requirements?

- **A.** Deploy an Application Load Balancer (ALB) in the application accounts to send traffic directly to the security appliance.
- **B.** Deploy a Gateway Load Balancer (GWLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the GWLB by using an interface GWLB endpoint in the application accounts. ✅
- **C.** Deploy a Network Load Balancer (NLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the NLB by using an interface VPC endpoint in the application accounts.
- **D.** Deploy an interface VPC endpoint in the application accounts to send traffic directly to the security appliance.

**Answer:** B

**Explanation:**

Correct Answer:Deploy a Gateway Load Balancer (GWLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the GWLB by using an interface GWLB endpoint in the application accounts.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy a Gateway Load Balancer (GWLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the GWLB by using an interface GWLB endpoint in the application accounts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an Application Load Balancer (ALB) in the application accounts to send traffic directly to the security appliance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy a Network Load Balancer (NLB) in the networking account to send traffic to the security appliance. Configure the application accounts to send traffic to the NLB by using an interface VPC endpoint in the application accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an interface VPC endpoint in the application accounts to send traffic directly to the security appliance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 76

An ecommerce company is preparing to deploy a web application on AWS to ensure continuous service for customers. The architecture includes a web application that the company hosts on Amazon EC2 instances, a relational database in Amazon RDS, and static assets that the company stores in Amazon S3.
The company wants to design a robust and resilient architecture for the application.
Which solution will meet these requirements?

- **A.** Use AWS Lambda functions to serve the web application. Use Amazon Aurora Serverless v2 for the database. Store static assets in Amazon Elastic File System (Amazon EFS) One Zone-Infrequent Access (One Zone-IA).
- **B.** Deploy Amazon EC2 instances in a single Availability Zone. Deploy an RDS DB instance in the same Availability Zone. Use Amazon S3 with versioning enabled to store static assets.
- **C.** Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones. Deploy a Multi-AZ RDS DB instance. Use Amazon CloudFront to distribute static assets. ✅
- **D.** Deploy Amazon EC2 instances in a single Availability Zone. Deploy an RDS DB instance in a second Availability Zone for cross-AZ redundancy. Serve static assets directly from the EC2 instances.

**Answer:** C

**Explanation:**

Correct Answer:Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones. Deploy a Multi-AZ RDS DB instance. Use Amazon CloudFront to distribute static assets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones. Deploy a Multi-AZ RDS DB instance. Use Amazon CloudFront to distribute static assets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Lambda functions to serve the web application. Use Amazon Aurora Serverless v2 for the database. Store static assets in Amazon Elastic File System (Amazon EFS) One Zone-Infrequent Access (One Zone-IA). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy Amazon EC2 instances in a single Availability Zone. Deploy an RDS DB instance in the same Availability Zone. Use Amazon S3 with versioning enabled to store static assets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy Amazon EC2 instances in a single Availability Zone. Deploy an RDS DB instance in a second Availability Zone for cross-AZ redundancy. Serve static assets directly from the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 77

A company has migrated several applications to AWS in the past 3 months. The company wants to know the breakdown of costs for each of these applications. The company wants to receive a regular report that includes this information.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Tag all the AWS resources with a key for cost and a value of the application's name. Use the AWS Billing and Cost Management console to download bills for the past 3 months. Look up the desired information.
- **B.** Use AWS Budgets to download data for the past 3 months into a .csv file. Look up the desired information.
- **C.** Load AWS Cost and Usage Reports into an Amazon RDS DB instance. Run SQL queries to get the desired information.
- **D.** Tag all the AWS resources with a key for cost and a value of the application's name. Activate cost allocation tags. Use Cost Explorer to get the desired information. ✅

**Answer:** D

**Explanation:**

Correct Answer:Tag all the AWS resources with a key for cost and a value of the application's name. Activate cost allocation tags. Use Cost Explorer to get the desired information.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Tag all the AWS resources with a key for cost and a value of the application's name. Activate cost allocation tags. Use Cost Explorer to get the desired information. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Tag all the AWS resources with a key for cost and a value of the application's name. Use the AWS Billing and Cost Management console to download bills for the past 3 months. Look up the desired information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Budgets to download data for the past 3 months into a .csv file. Look up the desired information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Load AWS Cost and Usage Reports into an Amazon RDS DB instance. Run SQL queries to get the desired information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 78

A company regularly uploads confidential data to Amazon S3 buckets for analysis.
The company's security policies mandate that the objects must be encrypted at rest. The company must automatically rotate the encryption key every year. The company must be able to track key rotation by using AWS CloudTrail. The company also must minimize costs for the encryption key.
Which solution will meet these requirements?

- **A.** Use server-side encryption with AWS Managed KMS keys (SSE-KMS) ✅
- **B.** Use server-side encryption with Amazon S3 managed keys (SSE-S3)
- **C.** Use server-side encryption with customer managed AWS KMS keys
- **D.** Use server-side encryption with customer-provided keys (SSE-C)

**Answer:** A

**Explanation:**

Correct Answer:Use server-side encryption with AWS Managed KMS keys (SSE-KMS)

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use server-side encryption with AWS Managed KMS keys (SSE-KMS) - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use server-side encryption with Amazon S3 managed keys (SSE-S3) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use server-side encryption with customer managed AWS KMS keys - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use server-side encryption with customer-provided keys (SSE-C) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 79

A solutions architect is designing a highly available Amazon ElastiCache for Redis based solution. The solutions architect needs to ensure that failures do not result in performance degradation or loss of data locally and within an AWS Region. The solution needs to provide high availability at the node level and at the Region level.
Which solution will meet these requirements?

- **A.** Use Redis shards that contain multiple nodes with Redis append only files (AOF) turned on.
- **B.** Use Multi-AZ Redis replication groups with shards that contain multiple nodes. ✅
- **C.** Use Redis shards that contain multiple nodes with Auto Scaling turned on.
- **D.** Use a Multi-AZ Redis cluster with more than one read replica in the replication group.

**Answer:** B

**Explanation:**

Correct Answer:Use Multi-AZ Redis replication groups with shards that contain multiple nodes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Multi-AZ Redis replication groups with shards that contain multiple nodes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Redis shards that contain multiple nodes with Redis append only files (AOF) turned on. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Redis shards that contain multiple nodes with Auto Scaling turned on. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a Multi-AZ Redis cluster with more than one read replica in the replication group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 80

A company is migrating its databases to Amazon RDS for PostgreSQL. The company is migrating its applications to Amazon EC2 instances. The company wants to optimize costs for long-running workloads.
Which solution will meet this requirement MOST cost-effectively?

- **A.** Purchase Reserved Instances for a 1 year term with the Partial Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year EC2 Instance Savings Plan with the Partial Upfront option for the EC2 instances.
- **B.** Purchase Reserved Instances for a 1 year term with the No Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year EC2 Instance Savings Plan with the No Upfront option for the EC2 instances.
- **C.** Purchase Reserved Instances for a 3 year term with the All Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 3 year EC2 Instance Savings Plan with the All Upfront option for the EC2 instances. ✅
- **D.** Use On-Demand Instances for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year Compute Savings Plan with the No Upfront option for the EC2 instances.

**Answer:** C

**Explanation:**

Correct Answer:Purchase Reserved Instances for a 3 year term with the All Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 3 year EC2 Instance Savings Plan with the All Upfront option for the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Purchase Reserved Instances for a 3 year term with the All Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 3 year EC2 Instance Savings Plan with the All Upfront option for the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Purchase Reserved Instances for a 1 year term with the Partial Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year EC2 Instance Savings Plan with the Partial Upfront option for the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase Reserved Instances for a 1 year term with the No Upfront option for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year EC2 Instance Savings Plan with the No Upfront option for the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use On-Demand Instances for the Amazon RDS for PostgreSQL workloads. Purchase a 1 year Compute Savings Plan with the No Upfront option for the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 81

A company uses an Amazon RDS for MySQL instance. To prepare for end-of-year processing, the company added a read replica to accommodate extra read-only queries from the company's reporting tool. The read replica CPU usage was 60% and the primary instance CPU usage was 60%.
After end-of-year activities are complete, the read replica has a constant 25% CPU usage. The primary instance still has a constant 60% CPU usage. The company wants to rightsize the database and still provide enough performance for future growth.
Which solution will meet these requirements?

- **A.** Resize the read replica to a smaller instance size. Do not make changes to the primary instance ✅
- **B.** Delete the read replica. Do not make changes to the primary instance
- **C.** Resize the read replica to a larger instance size. Resize the primary instance to a smaller instance size
- **D.** Delete the read replica. Resize the primary instance to a larger instance

**Answer:** A

**Explanation:**

Correct Answer:Resize the read replica to a smaller instance size. Do not make changes to the primary instance

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Resize the read replica to a smaller instance size. Do not make changes to the primary instance - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Delete the read replica. Do not make changes to the primary instance - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Resize the read replica to a larger instance size. Resize the primary instance to a smaller instance size - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Delete the read replica. Resize the primary instance to a larger instance - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 82

A company is running a media store across multiple Amazon EC2 instances distributed across multiple Availability Zones in a single VPC. The company wants a high-performing solution to share data between all the EC2 instances, and prefers to keep the data within the VPC only.
What should a solutions architect recommend?

- **A.** Configure an Amazon Elastic Block Store (Amazon EBS) volume and mount it across all instances
- **B.** Configure an Amazon Elastic File System (Amazon EFS) file system and mount it across all instances ✅
- **C.** Create an Amazon S3 bucket and call the service APIs from each instance's application
- **D.** Create an Amazon S3 bucket and configure all instances to access it as a mounted volume

**Answer:** B

**Explanation:**

Correct Answer:Configure an Amazon Elastic File System (Amazon EFS) file system and mount it across all instances

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon Elastic File System (Amazon EFS) file system and mount it across all instances - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Amazon Elastic Block Store (Amazon EBS) volume and mount it across all instances - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 bucket and call the service APIs from each instance's application - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 bucket and configure all instances to access it as a mounted volume - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 83

A company has an internal application that runs on Amazon EC2 instances in an Auto Scaling group. The EC2 instances are compute optimized and use Amazon Elastic Block Store (Amazon EBS) volumes.
The company wants to identify cost optimizations across the EC2 instances, the Auto Scaling group, and the EBS volumes.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Configure AWS Compute Optimizer for cost recommendations for the EC2 instances. Create a new AWS Cost and Usage Report. Search the report for cost recommendations for the Auto Scaling group and the EBS volumes.
- **B.** Configure AWS Compute Optimizer for cost recommendations for the EC2 instances, the Auto Scaling group and the EBS volumes. ✅
- **C.** Create new Amazon CloudWatch billing alerts. Check the alert statuses for cost recommendations for the EC2 instances, the Auto Scaling group, and the EBS volumes.
- **D.** Create a new AWS Cost and Usage Report. Search the report for cost recommendations for the EC2 instances the Auto Scaling group, and the EBS volumes.

**Answer:** B

**Explanation:**

Correct Answer:Configure AWS Compute Optimizer for cost recommendations for the EC2 instances, the Auto Scaling group and the EBS volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure AWS Compute Optimizer for cost recommendations for the EC2 instances, the Auto Scaling group and the EBS volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Compute Optimizer for cost recommendations for the EC2 instances. Create a new AWS Cost and Usage Report. Search the report for cost recommendations for the Auto Scaling group and the EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create new Amazon CloudWatch billing alerts. Check the alert statuses for cost recommendations for the EC2 instances, the Auto Scaling group, and the EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new AWS Cost and Usage Report. Search the report for cost recommendations for the EC2 instances the Auto Scaling group, and the EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 84

A company runs thousands of AWS Lambda functions. The company needs a solution to securely store sensitive information that all the Lambda functions use. The solution must also manage the automatic rotation of the sensitive information.
Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose two.)

- **A.** Create HTTP security headers by using Lambda@Edge to retrieve and create sensitive information
- **B.** Create a Lambda layer that retrieves sensitive information ✅
- **C.** Store sensitive information in AWS Secrets Manager ✅
- **D.** Store sensitive information in AWS Systems Manager Parameter Store
- **E.** Create a Lambda consumer with dedicated throughput to retrieve sensitive information and create environmental variables

**Answer:** B, C

**Explanation:**

Correct Answer:Create a Lambda layer that retrieves sensitive information; Store sensitive information in AWS Secrets Manager

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a Lambda layer that retrieves sensitive information - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Store sensitive information in AWS Secrets Manager - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create HTTP security headers by using Lambda@Edge to retrieve and create sensitive information - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store sensitive information in AWS Systems Manager Parameter Store - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a Lambda consumer with dedicated throughput to retrieve sensitive information and create environmental variables - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 85

A software company needs to upgrade a critical web application. The application currently runs on a single Amazon EC2 instance that the company hosts in a public subnet. The EC2 instance runs a MySQL database. The application's DNS records are published in an Amazon Route 53 zone.
A solutions architect must reconfigure the application to be scalable and highly available. The solutions architect must also reduce MySQL read latency.
Which combination of solutions will meet these requirements? (Choose two.)

- **A.** Launch a second EC2 instance in a second AWS Region. Use a Route 53 failover routing policy to redirect the traffic to the second EC2 instance.
- **B.** Create and configure an Auto Scaling group to launch private EC2 instances in multiple Availability Zones. Add the instances to a target group behind a new Application Load Balancer. ✅
- **C.** Migrate the database to an Amazon Aurora MySQL cluster. Create the primary DB instance and reader DB instance in separate Availability Zones. ✅
- **D.** Create and configure an Auto Scaling group to launch private EC2 instances in multiple AWS Regions. Add the instances to a target group behind a new Application Load Balancer.
- **E.** Migrate the database to an Amazon Aurora MySQL cluster with cross-Region read replicas.

**Answer:** B, C

**Explanation:**

Correct Answer:Create and configure an Auto Scaling group to launch private EC2 instances in multiple Availability Zones. Add the instances to a target group behind a new Application Load Balancer.; Migrate the database to an Amazon Aurora MySQL cluster. Create the primary DB instance and reader DB instance in separate Availability Zones.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create and configure an Auto Scaling group to launch private EC2 instances in multiple Availability Zones. Add the instances to a target group behind a new Application Load Balancer. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Migrate the database to an Amazon Aurora MySQL cluster. Create the primary DB instance and reader DB instance in separate Availability Zones. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Launch a second EC2 instance in a second AWS Region. Use a Route 53 failover routing policy to redirect the traffic to the second EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create and configure an Auto Scaling group to launch private EC2 instances in multiple AWS Regions. Add the instances to a target group behind a new Application Load Balancer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to an Amazon Aurora MySQL cluster with cross-Region read replicas. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 86

A company has multiple Microsoft Windows SMB file servers and Linux NFS file servers for file sharing in an on-premises environment. As part of the company's AWS migration plan, the company wants to consolidate the file servers in the AWS Cloud.
The company needs a managed AWS storage service that supports both NFS and SMB access. The solution must be able to share between protocols. The solution must have redundancy at the Availability Zone level.
Which solution will meet these requirements?

- **A.** Use Amazon FSx for NetApp ONTAP for SMB access. Use Amazon FSx for Lustre for NFS access.
- **B.** Create two Amazon EC2 instances. Use one EC2 instance for Windows SMB file server access and one EC2 instance for Linux NFS file server access.
- **C.** Use Amazon FSx for NetApp ONTAP for storage. Configure multi-protocol access. ✅
- **D.** Use Amazon S3 storage. Access Amazon S3 through an Amazon S3 File Gateway.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon FSx for NetApp ONTAP for storage. Configure multi-protocol access.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon FSx for NetApp ONTAP for storage. Configure multi-protocol access. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon FSx for NetApp ONTAP for SMB access. Use Amazon FSx for Lustre for NFS access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create two Amazon EC2 instances. Use one EC2 instance for Windows SMB file server access and one EC2 instance for Linux NFS file server access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 storage. Access Amazon S3 through an Amazon S3 File Gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 87

A company hosts an ecommerce application that stores all data in a single Amazon RDS for MySQL DB instance that is fully managed by AWS. The company needs to mitigate the risk of a single point of failure.
Which solution will meet these requirements with the LEAST implementation effort?

- **A.** Modify the RDS DB instance to use a Multi-AZ deployment. Apply the changes during the next maintenance window. ✅
- **B.** Create a new RDS DB instance in a Multi-AZ deployment. Manually restore the data from the existing RDS DB instance from the most recent snapshot.
- **C.** Migrate the current database to a new Amazon DynamoDB Multi-AZ deployment. Use AWS Database Migration Service (AWS DMS) with a heterogeneous migration strategy to migrate the current RDS DB instance to DynamoDB tables.
- **D.** Configure the DB instance in an Amazon EC2 Auto Scaling group with a minimum group size of three. Use Amazon Route 53 simple routing to distribute requests to all DB instances.

**Answer:** A

**Explanation:**

Correct Answer:Modify the RDS DB instance to use a Multi-AZ deployment. Apply the changes during the next maintenance window.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Modify the RDS DB instance to use a Multi-AZ deployment. Apply the changes during the next maintenance window. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new RDS DB instance in a Multi-AZ deployment. Manually restore the data from the existing RDS DB instance from the most recent snapshot. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the current database to a new Amazon DynamoDB Multi-AZ deployment. Use AWS Database Migration Service (AWS DMS) with a heterogeneous migration strategy to migrate the current RDS DB instance to DynamoDB tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the DB instance in an Amazon EC2 Auto Scaling group with a minimum group size of three. Use Amazon Route 53 simple routing to distribute requests to all DB instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 88

A company uses AWS and sells access to copyrighted images. The company's global customer base needs to be able to access these images quickly. The company must deny access to users from specific countries. The company wants to minimize costs as much as possible.
Which solution will meet these requirements?

- **A.** Use Amazon S3 to store the images. Use Amazon CloudFront to distribute the images with geographic restrictions. Provide a signed URL for each customer to access the data in CloudFront. ✅
- **B.** Use Amazon EC2 instances that are behind Application Load Balancers (ALBs) to store the images. Deploy the instances only in the countries the company services. Provide customers with links to the ALBs for their specific country's instances.
- **C.** Use Amazon S3 to store the images. Create an IAM user for each customer. Add the users to a group that has permission to access the S3 bucket.
- **D.** Use Amazon S3 to store the images. Turn on multi-factor authentication (MFA) and public bucket access. Provide customers with a link to the S3 bucket.

**Answer:** A

**Explanation:**

Correct Answer:Use Amazon S3 to store the images. Use Amazon CloudFront to distribute the images with geographic restrictions. Provide a signed URL for each customer to access the data in CloudFront.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon S3 to store the images. Use Amazon CloudFront to distribute the images with geographic restrictions. Provide a signed URL for each customer to access the data in CloudFront. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon EC2 instances that are behind Application Load Balancers (ALBs) to store the images. Deploy the instances only in the countries the company services. Provide customers with links to the ALBs for their specific country's instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 to store the images. Create an IAM user for each customer. Add the users to a group that has permission to access the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 to store the images. Turn on multi-factor authentication (MFA) and public bucket access. Provide customers with a link to the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 89

A company migrated a MySQL database from the company's on-premises data center to an Amazon RDS for MySQL DB instance. The company sized the RDS DB instance to meet the company's average daily workload. Once a month, the database performs slowly when the company runs queries for a report. The company wants to have the ability to run reports and maintain the performance of the daily workloads.
Which solution will meet these requirements?

- **A.** Create a read replica of the database. Direct the queries to the read replica. ✅
- **B.** Resize the DB instance to accommodate the additional workload.
- **C.** Create a backup of the database. Restore the backup to another DB instance. Direct the queries to the new database.
- **D.** Export the data to Amazon S3. Use Amazon Athena to query the S3 bucket.

**Answer:** A

**Explanation:**

Correct Answer:Create a read replica of the database. Direct the queries to the read replica.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a read replica of the database. Direct the queries to the read replica. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Resize the DB instance to accommodate the additional workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a backup of the database. Restore the backup to another DB instance. Direct the queries to the new database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Export the data to Amazon S3. Use Amazon Athena to query the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 90

A company runs a web application on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer that has sticky sessions enabled. The web server currently hosts the user session state. The company wants to ensure high availability and avoid user session state loss in the event of a web server outage.
Which solution will meet these requirements?

- **A.** Use an Amazon ElastiCache for Memcached instance to store the session data. Update the application to use ElastiCache for Memcached to store the session state.
- **B.** Use Amazon ElastiCache for Redis to store the session state. Update the application to use ElastiCache for Redis to store the session state. ✅
- **C.** Use Amazon RDS to store the session state. Update the application to use Amazon RDS to store the session state.
- **D.** Use an AWS Storage Gateway cached volume to store session data. Update the application to use AWS Storage Gateway cached volume to store the session state.

**Answer:** B

**Explanation:**

Correct Answer:Use Amazon ElastiCache for Redis to store the session state. Update the application to use ElastiCache for Redis to store the session state.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon ElastiCache for Redis to store the session state. Update the application to use ElastiCache for Redis to store the session state. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an Amazon ElastiCache for Memcached instance to store the session data. Update the application to use ElastiCache for Memcached to store the session state. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon RDS to store the session state. Update the application to use Amazon RDS to store the session state. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Storage Gateway cached volume to store session data. Update the application to use AWS Storage Gateway cached volume to store the session state. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 91

A healthcare company is developing an AWS Lambda function that publishes notifications to an encrypted Amazon Simple Notification Service (Amazon SNS) topic. The notifications contain protected health information (PHI).
The SNS topic uses AWS Key Management Service (AWS KMS) customer managed keys for encryption. The company must ensure that the application has the necessary permissions to publish messages securely to the SNS topic.
Which combination of steps will meet these requirements? (Choose three.)

- **A.** Create a resource policy for the SNS topic that allows the Lambda function to publish messages to the topic. ✅
- **B.** Associate an Amazon API Gateway HTTP API with the SNS topic to control access to the topic by using API Gateway resource policies.
- **C.** Use server-side encryption with AWS KMS keys (SSE-KMS) for the SNS topic instead of customer managed keys.
- **D.** Configure a Lambda execution role that has the necessary IAM permissions to use a customer managed key in AWS KMS. ✅
- **E.** Create a resource policy for the encryption key that the SNS topic uses that has the necessary AWS KMS permissions. ✅
- **F.** Specify the Lambda function's Amazon Resource Name (ARN) in the SNS topic's resource policy.

**Answer:** A, D, E

**Explanation:**

Correct Answer:Create a resource policy for the SNS topic that allows the Lambda function to publish messages to the topic.; Configure a Lambda execution role that has the necessary IAM permissions to use a customer managed key in AWS KMS.; Create a resource policy for the encryption key that the SNS topic uses that has the necessary AWS KMS permissions.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a resource policy for the SNS topic that allows the Lambda function to publish messages to the topic. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure a Lambda execution role that has the necessary IAM permissions to use a customer managed key in AWS KMS. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a resource policy for the encryption key that the SNS topic uses that has the necessary AWS KMS permissions. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Associate an Amazon API Gateway HTTP API with the SNS topic to control access to the topic by using API Gateway resource policies. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use server-side encryption with AWS KMS keys (SSE-KMS) for the SNS topic instead of customer managed keys. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Specify the Lambda function's Amazon Resource Name (ARN) in the SNS topic's resource policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 92

An ecommerce company wants a disaster recovery solution for its Amazon RDS DB instances that run Microsoft SQL Server Enterprise Edition. The company's current recovery point objective (RPO) and recovery time objective (RTO) are 24 hours.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create a cross-Region read replica and promote the read replica to the primary instance.
- **B.** Use AWS Database Migration Service (AWS DMS) to create RDS cross-Region replication.
- **C.** Use cross-Region replication every 24 hours to copy native backups to an Amazon S3 bucket.
- **D.** Copy automatic snapshots to another Region every 24 hours. ✅

**Answer:** D

**Explanation:**

Correct Answer:Copy automatic snapshots to another Region every 24 hours.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Copy automatic snapshots to another Region every 24 hours. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a cross-Region read replica and promote the read replica to the primary instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS) to create RDS cross-Region replication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use cross-Region replication every 24 hours to copy native backups to an Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 93

A company is building an application in the AWS Cloud. The application is hosted on Amazon EC2 instances behind an Application Load Balancer (ALB). The company uses Amazon Route 53 for the DNS.
The company needs a managed solution with proactive engagement to detect against DDoS attacks.
Which solution will meet these requirements?

- **A.** Subscribe to AWS Shield Advanced. Configure hosted zones in Route 53. Add ALB resources as protected resources. ✅
- **B.** Store the ALB access logs in an Amazon S3 bucket. Configure Amazon GuardDuty to detect and take automated preventative actions for DDoS attacks.
- **C.** Enable AWS WAF on the ALCreate an AWS WAF web ACL with rules to detect and prevent DDoS attacks. Associate the web ACL with the ALB.
- **D.** Enable AWS Config. Configure an AWS Config managed rule that detects DDoS attacks.

**Answer:** A

**Explanation:**

Correct Answer:Subscribe to AWS Shield Advanced. Configure hosted zones in Route 53. Add ALB resources as protected resources.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Subscribe to AWS Shield Advanced. Configure hosted zones in Route 53. Add ALB resources as protected resources. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the ALB access logs in an Amazon S3 bucket. Configure Amazon GuardDuty to detect and take automated preventative actions for DDoS attacks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable AWS WAF on the ALCreate an AWS WAF web ACL with rules to detect and prevent DDoS attacks. Associate the web ACL with the ALB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable AWS Config. Configure an AWS Config managed rule that detects DDoS attacks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 94

A company runs its customer-facing web application on containers. The workload uses Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. The web application is resource intensive.
The web application needs to be available 24 hours a day, 7 days a week for customers. The company expects the application to experience short bursts of high traffic. The workload must be highly available.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure an ECS capacity provider with Fargate Spot for steady state and Fargate for burst traffic.
- **B.** Configure an ECS capacity provider with Fargate. Use AWS Compute Optimizer to rightsize the Fargate task.
- **C.** Configure an ECS capacity provider with Fargate for steady state and Fargate Spot for burst traffic. ✅
- **D.** Configure an ECS capacity provider with Fargate. Conduct load testing by using a third-party tool. Rightsize the Fargate tasks in Amazon CloudWatch.

**Answer:** C

**Explanation:**

Correct Answer:Configure an ECS capacity provider with Fargate for steady state and Fargate Spot for burst traffic.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an ECS capacity provider with Fargate for steady state and Fargate Spot for burst traffic. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an ECS capacity provider with Fargate Spot for steady state and Fargate for burst traffic. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an ECS capacity provider with Fargate. Use AWS Compute Optimizer to rightsize the Fargate task. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an ECS capacity provider with Fargate. Conduct load testing by using a third-party tool. Rightsize the Fargate tasks in Amazon CloudWatch. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 95

A company needs to implement a new data retention policy for regulatory compliance. As part of this policy, sensitive documents that are stored in an Amazon S3 bucket must be protected from deletion or modification for a fixed period of time.
Which solution will meet these requirements?

- **A.** Enable versioning on the S3 bucket. Set a lifecycle policy to delete the objects after a specified period.
- **B.** Configure an S3 Lifecycle policy to transition objects to S3 Glacier Flexible Retrieval for the retention duration.
- **C.** Activate S3 Object Lock on the required objects and enable governance mode.
- **D.** Activate S3 Object Lock on the required objects and enable compliance mode. ✅

**Answer:** D

**Explanation:**

Correct Answer:Activate S3 Object Lock on the required objects and enable compliance mode.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Activate S3 Object Lock on the required objects and enable compliance mode. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Enable versioning on the S3 bucket. Set a lifecycle policy to delete the objects after a specified period. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an S3 Lifecycle policy to transition objects to S3 Glacier Flexible Retrieval for the retention duration. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Activate S3 Object Lock on the required objects and enable governance mode. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 96

A company runs all its business applications in the AWS Cloud. The company uses AWS Organizations to manage multiple AWS accounts.
A solutions architect needs to review all permissions that are granted to IAM users to determine which IAM users have more permissions than required.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Use Network Access Analyzer to review all access permissions in the company's AWS accounts.
- **B.** Create an AWS CloudWatch alarm that activates when an IAM user creates or modifies resources in an AWS account.
- **C.** Use AWS Identity and Access Management (IAM) Access Analyzer to review all the company’s resources and accounts. ✅
- **D.** Use Amazon Inspector to find vulnerabilities in existing IAM policies.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Identity and Access Management (IAM) Access Analyzer to review all the company's resources and accounts.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Identity and Access Management (IAM) Access Analyzer to review all the company's resources and accounts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Network Access Analyzer to review all access permissions in the company's AWS accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS CloudWatch alarm that activates when an IAM user creates or modifies resources in an AWS account. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Inspector to find vulnerabilities in existing IAM policies. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 97

A company has 5 PB of archived data on physical tapes. The company needs to preserve the data on the tapes for another 10 years for compliance purposes. The company wants to migrate to AWS in the next 6 months. The data center that stores the tapes has a 1 Gbps uplink internet connectivity.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Read the data from the tapes on premises. Stage the data in a local NFS storage. Use AWS DataSync to migrate the data to Amazon S3 Glacier Flexible Retrieval.
- **B.** Use an on-premises backup application to read the data from the tapes and to write directly to Amazon S3 Glacier Deep Archive.
- **C.** Order multiple AWS Snowball devices that have Tape Gateway. Copy the physical tapes to virtual tapes in Snowball. Ship the Snowball devices to AWS. Create a lifecycle policy to move the tapes to Amazon S3 Glacier Deep Archive. ✅
- **D.** Configure an on-premises Tape Gateway. Create virtual tapes in the AWS Cloud. Use backup software to copy the physical tape to the virtual tape.

**Answer:** C

**Explanation:**

Correct Answer:Order multiple AWS Snowball devices that have Tape Gateway. Copy the physical tapes to virtual tapes in Snowball. Ship the Snowball devices to AWS. Create a lifecycle policy to move the tapes to Amazon S3 Glacier Deep Archive.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Order multiple AWS Snowball devices that have Tape Gateway. Copy the physical tapes to virtual tapes in Snowball. Ship the Snowball devices to AWS. Create a lifecycle policy to move the tapes to Amazon S3 Glacier Deep Archive. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Read the data from the tapes on premises. Stage the data in a local NFS storage. Use AWS DataSync to migrate the data to Amazon S3 Glacier Flexible Retrieval. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an on-premises backup application to read the data from the tapes and to write directly to Amazon S3 Glacier Deep Archive. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an on-premises Tape Gateway. Create virtual tapes in the AWS Cloud. Use backup software to copy the physical tape to the virtual tape. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 98

A company needs to grant a team of developers access to the company's AWS resources. The company must maintain a high level of security for the resources.
The company requires an access control solution that will prevent unauthorized access to the sensitive data.
Which solution will meet these requirements?

- **A.** Define IAM roles that have fine-grained permissions based on the principle of least privilege. Assign an IAM role to each developer. ✅
- **B.** Share the IAM user credentials for each development team member with the rest of the team to simplify access management and to streamline development workflows.
- **C.** Create an AWS Cognito user pool. Grant developers access to AWS resources by using the user pool.
- **D.** Create IAM access keys to grant programmatic access to AWS resources. Allow only developers to interact with AWS resources through API calls by using the access keys.

**Answer:** A

**Explanation:**

Correct Answer:Define IAM roles that have fine-grained permissions based on the principle of least privilege. Assign an IAM role to each developer.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Define IAM roles that have fine-grained permissions based on the principle of least privilege. Assign an IAM role to each developer. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Share the IAM user credentials for each development team member with the rest of the team to simplify access management and to streamline development workflows. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Cognito user pool. Grant developers access to AWS resources by using the user pool. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create IAM access keys to grant programmatic access to AWS resources. Allow only developers to interact with AWS resources through API calls by using the access keys. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 99

A company is deploying an application that processes large quantities of data in parallel. The company plans to use Amazon EC2 instances for the workload. The network architecture must be configurable to prevent groups of nodes from sharing the same underlying hardware.
Which networking solution meets these requirements?

- **A.** Run the EC2 instances in a spread placement group. ✅
- **B.** Group the EC2 instances in separate accounts.
- **C.** Configure the EC2 instances with shared tenancy.
- **D.** Configure the EC2 instances with dedicated tenancy.

**Answer:** A

**Explanation:**

Correct Answer:Run the EC2 instances in a spread placement group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Run the EC2 instances in a spread placement group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Group the EC2 instances in separate accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the EC2 instances with shared tenancy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the EC2 instances with dedicated tenancy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 100

A company is migrating from a monolithic architecture for a web application that is hosted on Amazon EC2 to a serverless microservices architecture. The company wants to use AWS services that support an event-driven, loosely coupled architecture. The company wants to use the publish/subscribe (pub/sub) pattern.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure an Amazon API Gateway REST API to invoke an AWS Lambda function that publishes events to an Amazon Simple Queue Service (Amazon SQS) queue. Configure one or more subscribers to read events from the SQS queue.
- **B.** Configure an Amazon API Gateway REST API to invoke an AWS Lambda function that publishes events to an Amazon Simple Notification Service (Amazon SNS) topic. Configure one or more subscribers to receive events from the SNS topic.
- **C.** Configure an Amazon API Gateway HTTP API to invoke an AWS Lambda function that publishes events to an Amazon Simple Notification Service (Amazon SNS) topic. Configure one or more subscribers to receive events from the topic. ✅
- **D.** Configure an Amazon API Gateway WebSocket API to write to a data stream in Amazon Kinesis Data Streams with enhanced fan-out. Configure one or more subscribers to receive events from the data stream.

**Answer:** C

**Explanation:**

Correct Answer:Configure an Amazon API Gateway HTTP API to invoke an AWS Lambda function that publishes events to an Amazon Simple Notification Service (Amazon SNS) topic. Configure one or more subscribers to receive events from the topic.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon API Gateway HTTP API to invoke an AWS Lambda function that publishes events to an Amazon Simple Notification Service (Amazon SNS) topic. Configure one or more subscribers to receive events from the topic. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Amazon API Gateway REST API to invoke an AWS Lambda function that publishes events to an Amazon Simple Queue Service (Amazon SQS) queue. Configure one or more subscribers to read events from the SQS queue. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon API Gateway REST API to invoke an AWS Lambda function that publishes events to an Amazon Simple Notification Service (Amazon SNS) topic. Configure one or more subscribers to receive events from the SNS topic. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon API Gateway WebSocket API to write to a data stream in Amazon Kinesis Data Streams with enhanced fan-out. Configure one or more subscribers to receive events from the data stream. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 101

A company recently performed a lift and shift migration of its on-premises Oracle database workload to run on an Amazon EC2 memory optimized Linux instance. The EC2 Linux instance uses a 1 TB Provisioned IOPS SSD (io1) EBS volume with 64,000 IOPS.
The database storage performance after the migration is slower than the performance of the on-premises database.
Which solution will improve storage performance?

- **A.** Add more Provisioned IOPS SSD (io1) EBS volumes. Use OS commands to create a Logical Volume Management (LVM) stripe. ✅
- **B.** Increase the size of the Provisioned IOPS SSD (io1) EBS volume to 2 TB.
- **C.** Change the EC2 Linux instance to a storage optimized instance type. Do not change the Provisioned IOPS SSD (io1) EBS volume.
- **D.** Increase the Provisioned IOPS SSD (io1) EBS volume to more than 64,000 IOPS.

**Answer:** A

**Explanation:**

Correct Answer:Add more Provisioned IOPS SSD (io1) EBS volumes. Use OS commands to create a Logical Volume Management (LVM) stripe.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add more Provisioned IOPS SSD (io1) EBS volumes. Use OS commands to create a Logical Volume Management (LVM) stripe. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Increase the size of the Provisioned IOPS SSD (io1) EBS volume to 2 TB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Change the EC2 Linux instance to a storage optimized instance type. Do not change the Provisioned IOPS SSD (io1) EBS volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Increase the Provisioned IOPS SSD (io1) EBS volume to more than 64,000 IOPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 102

A company is using AWS DataSync to migrate millions of files from an on-premises system to AWS. The files are 10 KB in size on average.
The company wants to use Amazon S3 for file storage. For the first year after the migration, the files will be accessed once or twice and must be immediately available. After 1 year, the files must be archived for at least 7 years.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use an archive tool to group the files into large objects. Use DataSync to copy the objects to S3 Standard-Infrequent Access (S3 Standard-IA). Use a lifecycle configuration to transition the files to S3 Glacier Instant Retrieval after 1 year with a retention period of 7 years.
- **B.** Use an archive tool to group the files into large objects. Use DataSync to migrate the objects. Store the objects in S3 Glacier Instant Retrieval for the first year. Use a lifecycle configuration to transition the files to S3 Glacier Deep Archive after 1 year with a retention period of 7 years. ✅
- **C.** Configure a DataSync task to transfer the files to S3 Standard-Infrequent Access (S3 Standard-IA). Use a lifecycle configuration to transition the files to S3 Deep Archive after 1 year with a retention period of 7 years.
- **D.** Configure the destination storage class for the files as S3 Glacier Instant Retrieval. Use a lifecycle policy to transition the files to S3 Glacier Flexible Retrieval after 1 year with a retention period of 7 years.

**Answer:** B

**Explanation:**

Correct Answer:Use an archive tool to group the files into large objects. Use DataSync to migrate the objects. Store the objects in S3 Glacier Instant Retrieval for the first year. Use a lifecycle configuration to transition the files to S3 Glacier Deep Archive after 1 year with a retention period of 7 years.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an archive tool to group the files into large objects. Use DataSync to migrate the objects. Store the objects in S3 Glacier Instant Retrieval for the first year. Use a lifecycle configuration to transition the files to S3 Glacier Deep Archive after 1 year with a retention period of 7 years. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an archive tool to group the files into large objects. Use DataSync to copy the objects to S3 Standard-Infrequent Access (S3 Standard-IA). Use a lifecycle configuration to transition the files to S3 Glacier Instant Retrieval after 1 year with a retention period of 7 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a DataSync task to transfer the files to S3 Standard-Infrequent Access (S3 Standard-IA). Use a lifecycle configuration to transition the files to S3 Deep Archive after 1 year with a retention period of 7 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the destination storage class for the files as S3 Glacier Instant Retrieval. Use a lifecycle policy to transition the files to S3 Glacier Flexible Retrieval after 1 year with a retention period of 7 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 103

A company needs to design a resilient web application to process customer orders. The web application must automatically handle increases in web traffic and application usage without affecting the customer experience or losing customer orders.
Which solution will meet these requirements?

- **A.** Use a Gateway Load Balancer (GWLB) to manage web traffic. Use Amazon Elastic Container Service (Amazon ECS) to receive and process customer orders. Use the GWLB to capture and store unprocessed orders. Use Amazon DynamoDB to store processed customer orders.
- **B.** Use a Network Load Balancer (NLB) to manage web traffic. Use an Application Load Balancer to receive customer orders from the NLB. Use Amazon Redshift with a Multi-AZ deployment to store unprocessed and processed customer orders.
- **C.** Use a NAT gateway to manage web traffic. Use Amazon EC2 Auto Scaling groups to receive, process, and store processed customer orders. Use an AWS Lambda function to capture and store unprocessed orders.
- **D.** Use an Application Load Balancer to manage web traffic. Use Amazon EC2 Auto Scaling groups to receive and process customer orders. Use Amazon Simple Queue Service (Amazon SQS) to store unprocessed orders. Use Amazon RDS with a Multi-AZ deployment to store processed customer orders. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use an Application Load Balancer to manage web traffic. Use Amazon EC2 Auto Scaling groups to receive and process customer orders. Use Amazon Simple Queue Service (Amazon SQS) to store unprocessed orders. Use Amazon RDS with a Multi-AZ deployment to store processed customer orders.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an Application Load Balancer to manage web traffic. Use Amazon EC2 Auto Scaling groups to receive and process customer orders. Use Amazon Simple Queue Service (Amazon SQS) to store unprocessed orders. Use Amazon RDS with a Multi-AZ deployment to store processed customer orders. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use a Gateway Load Balancer (GWLB) to manage web traffic. Use Amazon Elastic Container Service (Amazon ECS) to receive and process customer orders. Use the GWLB to capture and store unprocessed orders. Use Amazon DynamoDB to store processed customer orders. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a Network Load Balancer (NLB) to manage web traffic. Use an Application Load Balancer to receive customer orders from the NLB. Use Amazon Redshift with a Multi-AZ deployment to store unprocessed and processed customer orders. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a NAT gateway to manage web traffic. Use Amazon EC2 Auto Scaling groups to receive, process, and store processed customer orders. Use an AWS Lambda function to capture and store unprocessed orders. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 104

A company is designing an application on AWS that processes sensitive data. The application stores and processes financial data for multiple customers.
To meet compliance requirements, the data for each customer must be encrypted separately at rest by using a secure, centralized key management solution. The company wants to use AWS Key Management Service (AWS KMS) to implement encryption.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create separate AWS KMS keys for each customer's data that have granular access control and logging enabled. ✅
- **B.** Generate a unique encryption key for each customer. Store the keys in an Amazon S3 bucket. Enable server-side encryption.
- **C.** Deploy a hardware security appliance in the AWS environment that securely stores customer-provided encryption keys. Integrate the security appliance with AWS KMS to encrypt the sensitive data in the application.
- **D.** Create a single AWS KMS key to encrypt all sensitive data across the application.

**Answer:** A

**Explanation:**

Correct Answer:Create separate AWS KMS keys for each customer's data that have granular access control and logging enabled.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create separate AWS KMS keys for each customer's data that have granular access control and logging enabled. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Generate a unique encryption key for each customer. Store the keys in an Amazon S3 bucket. Enable server-side encryption. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy a hardware security appliance in the AWS environment that securely stores customer-provided encryption keys. Integrate the security appliance with AWS KMS to encrypt the sensitive data in the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a single AWS KMS key to encrypt all sensitive data across the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 105

A video game company is deploying a new gaming application to its global users. The company requires a solution that will provide near real-time reviews and rankings of the players.
A solutions architect must design a solution to provide fast access to the data. The solution must also ensure the data persists on disks in the event that the company restarts the application.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Deploy an Amazon ElastiCache for Memcached duster. Store the player data in the ElastiCache cluster.
- **B.** Deploy an Amazon ElastiCache for Redis duster. Store the player data in the ElastiCache cluster. ✅
- **C.** Create Amazon EC2 instances in multiple AWS Regions. Store the player data on the EC2 instances. Configure Amazon Route 53 with geolocation records to direct users to the closest EC2 instance.
- **D.** Configure an Amazon CloudFront distribution with an Amazon S3 bucket as the origin. Store the player data in the S3 bucket.

**Answer:** B

**Explanation:**

Correct Answer:Deploy an Amazon ElastiCache for Redis duster. Store the player data in the ElastiCache cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an Amazon ElastiCache for Redis duster. Store the player data in the ElastiCache cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an Amazon ElastiCache for Memcached duster. Store the player data in the ElastiCache cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create Amazon EC2 instances in multiple AWS Regions. Store the player data on the EC2 instances. Configure Amazon Route 53 with geolocation records to direct users to the closest EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon CloudFront distribution with an Amazon S3 bucket as the origin. Store the player data in the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 106

A company has developed a non-production application that is composed of multiple microservices for each of the company's business units. A single development team maintains all the microservices.
The current architecture uses a static web frontend and a Java-based backend that contains the application logic. The architecture also uses a MySQL database that the company hosts on an Amazon EC2 instance.
The company needs to ensure that the application is secure and available globally.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind a Network Load Balancer. Migrate the MySQL database to Amazon RDS for MySQL.
- **B.** Use Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind an Application Load Balancer. Migrate the MySQL database to an Amazon EC2 Reserved Instance.
- **C.** Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to Amazon RDS for MySQL. ✅
- **D.** Use Amazon CloudFront and AWS Amplify to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to an Amazon EC2 Reserved Instance.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to Amazon RDS for MySQL.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to Amazon RDS for MySQL. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon CloudFront and Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind a Network Load Balancer. Migrate the MySQL database to Amazon RDS for MySQL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon S3 to host the static web frontend. Refactor the microservices to use AWS Lambda functions that are in a target group behind an Application Load Balancer. Migrate the MySQL database to an Amazon EC2 Reserved Instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon CloudFront and AWS Amplify to host the static web frontend. Refactor the microservices to use AWS Lambda functions that the microservices access by using Amazon API Gateway. Migrate the MySQL database to an Amazon EC2 Reserved Instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 107

A company is building an application on AWS. The application uses multiple AWS Lambda functions to retrieve sensitive data from a single Amazon S3 bucket for processing. The company must ensure that only authorized Lambda functions can access the data. The solution must comply with the principle of least privilege.
Which solution will meet these requirements?

- **A.** Configure a bucket policy granting access to the Lambda functions based on their function ARNs.
- **B.** Grant full S3 bucket access to all Lambda functions through a shared IAM role.
- **C.** Configure the Lambda functions to run within a VPC. Configure a bucket policy to grant access based on the Lambda functions' VPC endpoint IP addresses.
- **D.** Create individual IAM roles for each Lambda function. Grant the IAM roles access to the S3 bucket. Assign each IAM role as the Lambda execution role for its corresponding Lambda function. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create individual IAM roles for each Lambda function. Grant the IAM roles access to the S3 bucket. Assign each IAM role as the Lambda execution role for its corresponding Lambda function.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create individual IAM roles for each Lambda function. Grant the IAM roles access to the S3 bucket. Assign each IAM role as the Lambda execution role for its corresponding Lambda function. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure a bucket policy granting access to the Lambda functions based on their function ARNs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Grant full S3 bucket access to all Lambda functions through a shared IAM role. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the Lambda functions to run within a VPC. Configure a bucket policy to grant access based on the Lambda functions' VPC endpoint IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 108

A company has stored millions of objects across multiple prefixes in an Amazon S3 bucket by using the Amazon S3 Glacier Deep Archive storage class. The company needs to delete all data older than 3 years except for a subset of data that must be retained. The company has identified the data that must be retained and wants to implement a serverless solution.
Which solution will meet these requirements?

- **A.** Use S3 Inventory to list all objects. Use the AWS CLI to create a script that runs on an Amazon EC2 instance that deletes objects from the inventory list.
- **B.** Use AWS Batch to delete objects older than 3 years except for the data that must be retained.
- **C.** Enable S3 Inventory. Create an AWS Lambda function to filter and delete objects. Invoke the Lambda function with S3 Batch Operations to delete objects by using the inventory reports. ✅
- **D.** Provision an AWS Glue crawler to query objects older than 3 years. Save the manifest file of old objects. Create a script to delete objects in the manifest.

**Answer:** C

**Explanation:**

Correct Answer:Enable S3 Inventory. Create an AWS Lambda function to filter and delete objects. Invoke the Lambda function with S3 Batch Operations to delete objects by using the inventory reports.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable S3 Inventory. Create an AWS Lambda function to filter and delete objects. Invoke the Lambda function with S3 Batch Operations to delete objects by using the inventory reports. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use S3 Inventory to list all objects. Use the AWS CLI to create a script that runs on an Amazon EC2 instance that deletes objects from the inventory list. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Batch to delete objects older than 3 years except for the data that must be retained. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an AWS Glue crawler to query objects older than 3 years. Save the manifest file of old objects. Create a script to delete objects in the manifest. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 109

A company runs an application that stores and shares photos. Users upload the photos to an Amazon S3 bucket. Every day, users upload approximately 150 photos. The company wants to design a solution that creates a thumbnail of each new photo and stores the thumbnail in a second S3 bucket.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure S3 Storage Lens to invoke an AWS Lambda function each time a user uploads a new photo to the application. Configure the Lambda function to generate a thumbnail and to upload the thumbnail to a second S3 bucket.
- **B.** Configure an Amazon EventBridge scheduled rule to invoke a script every minute on a memory-optimized Amazon EC2 instance that is always on. Configure the script to generate thumbnails for the photos that do not have thumbnails. Configure the script to upload the thumbnails to the second S3 bucket.
- **C.** Configure an S3 event notification to invoke an AWS Lambda function each time a user uploads a new photo to the application. Configure the Lambda function to generate a thumbnail and to upload the thumbnail to the second S3 bucket. ✅
- **D.** Configure an Amazon EventBridge scheduled rule to invoke a script every minute on a long-running Amazon EMR cluster. Configure the script to generate thumbnails for the photos that do not have thumbnails. Configure the script to upload the thumbnails to the second S3 bucket.

**Answer:** C

**Explanation:**

Correct Answer:Configure an S3 event notification to invoke an AWS Lambda function each time a user uploads a new photo to the application. Configure the Lambda function to generate a thumbnail and to upload the thumbnail to the second S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an S3 event notification to invoke an AWS Lambda function each time a user uploads a new photo to the application. Configure the Lambda function to generate a thumbnail and to upload the thumbnail to the second S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure S3 Storage Lens to invoke an AWS Lambda function each time a user uploads a new photo to the application. Configure the Lambda function to generate a thumbnail and to upload the thumbnail to a second S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon EventBridge scheduled rule to invoke a script every minute on a memory-optimized Amazon EC2 instance that is always on. Configure the script to generate thumbnails for the photos that do not have thumbnails. Configure the script to upload the thumbnails to the second S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon EventBridge scheduled rule to invoke a script every minute on a long-running Amazon EMR cluster. Configure the script to generate thumbnails for the photos that do not have thumbnails. Configure the script to upload the thumbnails to the second S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 110

A company hosts its multi-tier, public web application in the AWS Cloud. The web application runs on Amazon EC2 instances, and its database runs on Amazon RDS. The company is anticipating a large increase in sales during an upcoming holiday weekend. A solutions architect needs to build a solution to analyze the performance of the web application with a granularity of no more than 2 minutes.
What should the solutions architect do to meet this requirement?

- **A.** Create an AWS Lambda function to fetch EC2 logs from Amazon CloudWatch Logs. Use Amazon CloudWatch metrics to perform further analysis.
- **B.** Send Amazon CloudWatch logs to Amazon Redshift. Use Amazon QuickSight to perform further analysis.
- **C.** Send EC2 logs to Amazon S3. Use Amazon Redshift to fetch logs from the S3 bucket to process raw data for further analysis with Amazon QuickSight.
- **D.** Enable detailed monitoring on all EC2 instances. Use Amazon CloudWatch metrics to perform further analysis. ✅

**Answer:** D

**Explanation:**

Correct Answer:Enable detailed monitoring on all EC2 instances. Use Amazon CloudWatch metrics to perform further analysis.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable detailed monitoring on all EC2 instances. Use Amazon CloudWatch metrics to perform further analysis. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Lambda function to fetch EC2 logs from Amazon CloudWatch Logs. Use Amazon CloudWatch metrics to perform further analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Send Amazon CloudWatch logs to Amazon Redshift. Use Amazon QuickSight to perform further analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Send EC2 logs to Amazon S3. Use Amazon Redshift to fetch logs from the S3 bucket to process raw data for further analysis with Amazon QuickSight. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 111

A company uses Amazon RDS for PostgreSQL to run its applications in the us-east-1 Region. The company also uses machine learning (ML) models to forecast annual revenue based on near real-time reports. The reports are generated by using the same RDS for PostgreSQL database. The database performance slows during business hours. The company needs to improve database performance.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Activate Multi-AZ DB instance deployment for RDS for PostgreSQL. Configure the reports to be generated from the standby database.
- **B.** Create a read replica in us-east-1. Configure the reports to be generated from the read replica. ✅
- **C.** Use AWS Data Migration Service (AWS DMS) to logically replicate data to a new database. Configure the reports to be generated from the new database.
- **D.** Create a cross-Region read replica. Configure the reports to be generated from the read replica.

**Answer:** B

**Explanation:**

Correct Answer:Create a read replica in us-east-1. Configure the reports to be generated from the read replica.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a read replica in us-east-1. Configure the reports to be generated from the read replica. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Activate Multi-AZ DB instance deployment for RDS for PostgreSQL. Configure the reports to be generated from the standby database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Data Migration Service (AWS DMS) to logically replicate data to a new database. Configure the reports to be generated from the new database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a cross-Region read replica. Configure the reports to be generated from the read replica. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 112

A company has applications that run in an organization in AWS Organizations. The company outsources operational support of the applications. The company needs to provide access for the external support engineers without compromising security.
The external support engineers need access to the AWS Management Console. The external support engineers also need operating system access to the company’s fleet of Amazon EC2 instances that run Amazon Linux in private subnets.
Which solution will meet these requirements MOST securely?

- **A.** Create a bastion host in a public subnet. Set up the bastion host security group to allow access from only the external engineers’ IP address ranges. Ensure that all instances have a security group that allows SSH access from the bastion host. Provide each external support engineer an SSH key pair to log in to the application instances. Provide local account IAM user credentials to the engineers for console access.
- **B.** Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use AWS IAM Identity Center to provide the external support engineers console access. Use Systems Manager Session Manager to assign the required permissions. ✅
- **C.** Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use Systems Manager Session Manager to provide local IAM user credentials in each AWS account to the external support engineers for console access.
- **D.** Confirm that all instances have a security group that allows SSH access only from the external support engineers’ source IP address ranges. Provide local IAM user credentials in each AWS account to the external support engineers for console access. Provide each external support engineer an SSH key pair to log in to the application instances.

**Answer:** B

**Explanation:**

Correct Answer:Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use AWS IAM Identity Center to provide the external support engineers console access. Use Systems Manager Session Manager to assign the required permissions.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use AWS IAM Identity Center to provide the external support engineers console access. Use Systems Manager Session Manager to assign the required permissions. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a bastion host in a public subnet. Set up the bastion host security group to allow access from only the external engineers' IP address ranges. Ensure that all instances have a security group that allows SSH access from the bastion host. Provide each external support engineer an SSH key pair to log in to the application instances. Provide local account IAM user credentials to the engineers for console access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Confirm that AWS Systems Manager Agent (SSM Agent) is installed on all instances. Assign an instance profile with the necessary policy to connect to Systems Manager. Use Systems Manager Session Manager to provide local IAM user credentials in each AWS account to the external support engineers for console access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Confirm that all instances have a security group that allows SSH access only from the external support engineers' source IP address ranges. Provide local IAM user credentials in each AWS account to the external support engineers for console access. Provide each external support engineer an SSH key pair to log in to the application instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 113

A company wants to use an AWS CloudFormation stack for its application in a test environment. The company stores the CloudFormation template in an Amazon S3 bucket that blocks public access. The company wants to grant CloudFormation access to the template in the S3 bucket based on specific user requests to create the test environment. The solution must follow security best practices.
Which solution will meet these requirements?

- **A.** Create a gateway VPC endpoint for Amazon S3. Configure the CloudFormation stack to use the S3 object URL.
- **B.** Create an Amazon API Gateway REST API that has the S3 bucket as the target. Configure the CloudFormation stack to use the API Gateway URL.
- **C.** Allow public access to the template object in the S3 bucket. Block the public access after the test environment is created.
- **D.** Create a presigned URL for the template object. Configure the CloudFormation stack to use the presigned URL. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a presigned URL for the template object. Configure the CloudFormation stack to use the presigned URL.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a presigned URL for the template object. Configure the CloudFormation stack to use the presigned URL. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a gateway VPC endpoint for Amazon S3. Configure the CloudFormation stack to use the S3 object URL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon API Gateway REST API that has the S3 bucket as the target. Configure the CloudFormation stack to use the API Gateway URL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Allow public access to the template object in the S3 bucket. Block the public access after the test environment is created. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 114

A company runs a self-managed Microsoft SQL Server on Amazon EC2 instances and Amazon Elastic Block Store (Amazon EBS). Daily snapshots are taken of the EBS volumes.
Recently, all the company’s EBS snapshots were accidentally deleted while running a snapshot cleaning script that deletes all expired EBS snapshots. A solutions architect needs to update the architecture to prevent data loss without retaining EBS snapshots indefinitely.
Which solution will meet these requirements with the LEAST development effort?

- **A.** Copy the EBS snapshots to another AWS Region after completing the snapshots daily.
- **B.** Copy EBS snapshots to Amazon S3 Standard-Infrequent Access (S3 Standard-IA).
- **C.** Change the IAM policy of the user to deny EBS snapshot deletion.
- **D.** Create a 7-day EBS snapshot retention rule in Recycle Bin and apply the rule for all snapshots. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a 7-day EBS snapshot retention rule in Recycle Bin and apply the rule for all snapshots.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a 7-day EBS snapshot retention rule in Recycle Bin and apply the rule for all snapshots. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Copy the EBS snapshots to another AWS Region after completing the snapshots daily. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Copy EBS snapshots to Amazon S3 Standard-Infrequent Access (S3 Standard-IA). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Change the IAM policy of the user to deny EBS snapshot deletion. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 115

A company wants to improve the availability and performance of its hybrid application. The application consists of a stateful TCP-based workload hosted on Amazon EC2 instances in different AWS Regions and a stateless UDP-based workload hosted on premises.
Which combination of actions should a solutions architect take to improve availability and performance? (Choose two.)

- **A.** Configure two Application Load Balancers in each Region. The first will route to the EC2 endpoints, and the second will route to the on-premises endpoints.
- **B.** Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the load balancers.
- **C.** Configure a Network Load Balancer in each Region to address the EC2 endpoints. Configure an Application Load Balancer in each Region that routes to the on-premises endpoints.
- **D.** Configure a Network Load Balancer in each Region to address the EC2 endpoints. Configure a Network Load Balancer in each Region that routes to the on-premises endpoints. ✅
- **E.** Create an accelerator using AWS Global Accelerator. Add the load balancers as endpoints. ✅

**Answer:** D, E

**Explanation:**

Correct Answer:Configure a Network Load Balancer in each Region to address the EC2 endpoints. Configure a Network Load Balancer in each Region that routes to the on-premises endpoints.; Create an accelerator using AWS Global Accelerator. Add the load balancers as endpoints.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a Network Load Balancer in each Region to address the EC2 endpoints. Configure a Network Load Balancer in each Region that routes to the on-premises endpoints. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an accelerator using AWS Global Accelerator. Add the load balancers as endpoints. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure two Application Load Balancers in each Region. The first will route to the EC2 endpoints, and the second will route to the on-premises endpoints. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the load balancers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a Network Load Balancer in each Region to address the EC2 endpoints. Configure an Application Load Balancer in each Region that routes to the on-premises endpoints. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 116

A company has an application that customers use to upload images to an Amazon S3 bucket. Each night, the company launches an Amazon EC2 Spot Fleet that processes all the images that the company received that day. The processing for each image takes 2 minutes and requires 512 MB of memory.
A solutions architect needs to change the application to process the images when the images are uploaded.
Which change will meet these requirements MOST cost-effectively?

- **A.** Use S3 Event Notifications to write a message with image details to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an AWS Lambda function to read the messages from the queue and to process the images. ✅
- **B.** Use S3 Event Notifications to write a message with image details to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an EC2 Reserved Instance to read the messages from the queue and to process the images.
- **C.** Use S3 Event Notifications to publish a message with image details to an Amazon Simple Notification Service (Amazon SNS) topic. Configure a container instance in Amazon Elastic Container Service (Amazon ECS) to subscribe to the topic and to process the images.
- **D.** Use S3 Event Notifications to publish a message with image details to an Amazon Simple Notification Service (Amazon SNS) topic. Configure an AWS Elastic Beanstalk application to subscribe to the topic and to process the images.

**Answer:** A

**Explanation:**

Correct Answer:Use S3 Event Notifications to write a message with image details to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an AWS Lambda function to read the messages from the queue and to process the images.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use S3 Event Notifications to write a message with image details to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an AWS Lambda function to read the messages from the queue and to process the images. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use S3 Event Notifications to write a message with image details to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an EC2 Reserved Instance to read the messages from the queue and to process the images. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use S3 Event Notifications to publish a message with image details to an Amazon Simple Notification Service (Amazon SNS) topic. Configure a container instance in Amazon Elastic Container Service (Amazon ECS) to subscribe to the topic and to process the images. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use S3 Event Notifications to publish a message with image details to an Amazon Simple Notification Service (Amazon SNS) topic. Configure an AWS Elastic Beanstalk application to subscribe to the topic and to process the images. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 117

A company manages a data lake in an Amazon S3 bucket that numerous applications access. The S3 bucket contains a unique prefix for each application. The company wants to restrict each application to its specific prefix and to have granular control of the objects under each prefix.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Replicate the objects in the S3 bucket to new S3 buckets for each application. Create dedicated S3 access points for each application.
- **B.** Replicate the objects in the S3 bucket to new S3 buckets for each application. Create replication rules by prefix.
- **C.** Create an S3 Batch Operations job to set the ACL permissions for each object in the S3 bucket.
- **D.** Create dedicated S3 access points and access point policies for each application. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create dedicated S3 access points and access point policies for each application.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create dedicated S3 access points and access point policies for each application. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Replicate the objects in the S3 bucket to new S3 buckets for each application. Create dedicated S3 access points for each application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Replicate the objects in the S3 bucket to new S3 buckets for each application. Create replication rules by prefix. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an S3 Batch Operations job to set the ACL permissions for each object in the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 118

A company is creating a REST API. The company has strict requirements for the use of TLS. The company requires TLSv1.3 on the API endpoints. The company also requires a specific public third-party certificate authority (CA) to sign the TLS certificate.
Which solution will meet these requirements?

- **A.** Use a local machine to create a certificate that is signed by the third-party CA. Import the certificate into AWS Certificate Manager (ACM). Create an HTTP API in Amazon API Gateway with a custom domain. Configure the custom domain to use the certificate. ✅
- **B.** Create a certificate in AWS Certificate Manager (ACM) that is signed by the third-party CA. Create an HTTP API in Amazon API Gateway with a custom domain. Configure the custom domain to use the certificate.
- **C.** Create a certificate in AWS Certificate Manager (ACM) that is signed by the third-party CA. Create an AWS Lambda function with a Lambda function URL. Configure the Lambda function URL to use the certificate.
- **D.** Use AWS Certificate Manager (ACM) to create a certificate that is signed by the third-party CA. Import the certificate into AWS Certificate Manager (ACM). Create an AWS Lambda function with a Lambda function URL. Configure the Lambda function URL to use the certificate.

**Answer:** A

**Explanation:**

Correct Answer:Use a local machine to create a certificate that is signed by the third-party CA. Import the certificate into AWS Certificate Manager (ACM). Create an HTTP API in Amazon API Gateway with a custom domain. Configure the custom domain to use the certificate.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use a local machine to create a certificate that is signed by the third-party CA. Import the certificate into AWS Certificate Manager (ACM). Create an HTTP API in Amazon API Gateway with a custom domain. Configure the custom domain to use the certificate. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a certificate in AWS Certificate Manager (ACM) that is signed by the third-party CA. Create an HTTP API in Amazon API Gateway with a custom domain. Configure the custom domain to use the certificate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a certificate in AWS Certificate Manager (ACM) that is signed by the third-party CA. Create an AWS Lambda function with a Lambda function URL. Configure the Lambda function URL to use the certificate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Certificate Manager (ACM) to create a certificate that is signed by the third-party CA. Import the certificate into AWS Certificate Manager (ACM). Create an AWS Lambda function with a Lambda function URL. Configure the Lambda function URL to use the certificate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 119

A company is migrating its workloads to AWS. The company has sensitive and critical data in on-premises relational databases that run on SQL Server instances.
The company wants to use the AWS Cloud to increase security and reduce operational overhead for the databases.
Which solution will meet these requirements?

- **A.** Migrate the databases to Amazon EC2 instances. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption.
- **B.** Migrate the databases to a Multi-AZ Amazon RDS for SQL Server DB instance. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption. ✅
- **C.** Migrate the databases to an Amazon DynamoDB table. Use Amazon CloudWatch Logs to ensure data security.
- **D.** Migrate the data to an Amazon S3 bucket. Use Amazon Macie to ensure data security.

**Answer:** B

**Explanation:**

Correct Answer:Migrate the databases to a Multi-AZ Amazon RDS for SQL Server DB instance. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the databases to a Multi-AZ Amazon RDS for SQL Server DB instance. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the databases to Amazon EC2 instances. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the databases to an Amazon DynamoDB table. Use Amazon CloudWatch Logs to ensure data security. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the data to an Amazon S3 bucket. Use Amazon Macie to ensure data security. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 120

A company wants to use Amazon Elastic Container Service (Amazon ECS) to run its on-premises application in a hybrid environment. The application currently runs on containers on premises.
The company needs a single container solution that can scale in an on-premises, hybrid, or cloud environment. The company must run new application containers in the AWS Cloud and must use a load balancer for HTTP traffic.
Which combination of actions will meet these requirements? (Choose two.)

- **A.** Set up a Network Load Balancer for cloud ECS services.
- **B.** Set up an ECS cluster that uses the AWS Fargate launch type for the cloud application containers. Use an Amazon ECS Anywhere external launch type for the on-premises application containers. ✅
- **C.** Set up an Application Load Balancer for cloud ECS services. ✅
- **D.** Set up an ECS cluster that uses the AWS Fargate launch type. Use Fargate for the cloud application containers and the on-premises application containers.
- **E.** Set up an ECS cluster that uses the Amazon EC2 launch type for the cloud application containers. Use Amazon ECS Anywhere with an AWS Fargate launch type for the on-premises application containers.

**Answer:** B, C

**Explanation:**

Correct Answer:Set up an ECS cluster that uses the AWS Fargate launch type for the cloud application containers. Use an Amazon ECS Anywhere external launch type for the on-premises application containers.; Set up an Application Load Balancer for cloud ECS services.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up an ECS cluster that uses the AWS Fargate launch type for the cloud application containers. Use an Amazon ECS Anywhere external launch type for the on-premises application containers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Set up an Application Load Balancer for cloud ECS services. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up a Network Load Balancer for cloud ECS services. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an ECS cluster that uses the AWS Fargate launch type. Use Fargate for the cloud application containers and the on-premises application containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an ECS cluster that uses the Amazon EC2 launch type for the cloud application containers. Use Amazon ECS Anywhere with an AWS Fargate launch type for the on-premises application containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 121

A company is migrating five on-premises applications to VPCs in the AWS Cloud. Each application is currently deployed in isolated virtual networks on premises and should be deployed similarly in the AWS Cloud. The applications need to reach a shared services VPC. All the applications must be able to communicate with each other.
If the migration is successful, the company will repeat the migration process for more than 100 applications.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Deploy software VPN tunnels between the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets to the shared services VPC.
- **B.** Deploy a transit gateway with associations between the transit gateway and the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets and the application VPCs to the shared services VPC through the transit gateway. ✅
- **C.** Deploy VPC peering connections between the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets to the shared services VPC through the peering connection.
- **D.** Deploy an AWS Direct Connect connection between the application VPCs and the shared services VPAdd routes from the application VPCs in their subnets to the shared services VPC and the applications VPCs. Add routes from the shared services VPC subnets to the applications VPCs.

**Answer:** B

**Explanation:**

Correct Answer:Deploy a transit gateway with associations between the transit gateway and the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets and the application VPCs to the shared services VPC through the transit gateway.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy a transit gateway with associations between the transit gateway and the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets and the application VPCs to the shared services VPC through the transit gateway. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy software VPN tunnels between the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets to the shared services VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy VPC peering connections between the application VPCs and the shared services VPC. Add routes between the application VPCs in their subnets to the shared services VPC through the peering connection. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an AWS Direct Connect connection between the application VPCs and the shared services VPAdd routes from the application VPCs in their subnets to the shared services VPC and the applications VPCs. Add routes from the shared services VPC subnets to the applications VPCs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 122

A company has a large workload that runs every Friday evening. The workload runs on Amazon EC2 instances that are in two Availability Zones in the us-east-1 Region. Normally, the company must run no more than two instances at all times. However, the company wants to scale up to six instances each Friday to handle a regularly repeating increased workload.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Auto Scaling group that uses automatic scaling.
- **B.** Create an Auto Scaling group that uses manual scaling.
- **C.** Create an Auto Scaling group that uses scheduled scaling. ✅
- **D.** Create a reminder in Amazon EventBridge to scale the instances.

**Answer:** C

**Explanation:**

Correct Answer:Create an Auto Scaling group that uses scheduled scaling.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Auto Scaling group that uses scheduled scaling. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Auto Scaling group that uses automatic scaling. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Auto Scaling group that uses manual scaling. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a reminder in Amazon EventBridge to scale the instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 123

A company runs a critical data analysis job each week before the first day of the work week. The job requires at least 1 hour to complete the analysis. The job is stateful and cannot tolerate interruptions. The company needs a solution to run the job on AWS.
Which solution will meet these requirements?

- **A.** Configure an Auto Scaling group of Amazon EC2 Spot Instances that run Amazon Linux. Configure a crontab entry on the instances to run the analysis.
- **B.** Configure the job to run in an AWS Lambda function. Create a scheduled rule in Amazon EventBridge to invoke the Lambda function.
- **C.** Configure an AWS DataSync task to run the job. Configure a cron expression to run the task on a schedule.
- **D.** Create a container for the job. Schedule the job to run as an AWS Fargate task on an Amazon Elastic Container Service (Amazon ECS) cluster by using Amazon EventBridge Scheduler. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a container for the job. Schedule the job to run as an AWS Fargate task on an Amazon Elastic Container Service (Amazon ECS) cluster by using Amazon EventBridge Scheduler.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a container for the job. Schedule the job to run as an AWS Fargate task on an Amazon Elastic Container Service (Amazon ECS) cluster by using Amazon EventBridge Scheduler. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Auto Scaling group of Amazon EC2 Spot Instances that run Amazon Linux. Configure a crontab entry on the instances to run the analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the job to run in an AWS Lambda function. Create a scheduled rule in Amazon EventBridge to invoke the Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an AWS DataSync task to run the job. Configure a cron expression to run the task on a schedule. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 124

A company is designing its production application's disaster recovery (DR) strategy. The application is backed by a MySQL database on an Amazon Aurora cluster in the us-east-1 Region. The company has chosen the us-west-1 Region as its DR Region.
The company's target recovery point objective (RPO) is 5 minutes and the target recovery time objective (RTO) is 20 minutes. The company wants to minimize configuration changes.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Create a new Aurora cluster in us-west-1 that has Cross-Region Replication.
- **B.** Create a new Aurora cluster in us-west-1. Use AWS Database Migration Service (AWS DMS) to sync both clusters.
- **C.** Convert the Aurora cluster to an Aurora global database. Configure managed failover. ✅
- **D.** Create an Aurora read replica in us-west-1 similar in size to the production application's Aurora MySQL cluster writer instance.

**Answer:** C

**Explanation:**

Correct Answer:Convert the Aurora cluster to an Aurora global database. Configure managed failover.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Convert the Aurora cluster to an Aurora global database. Configure managed failover. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new Aurora cluster in us-west-1 that has Cross-Region Replication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new Aurora cluster in us-west-1. Use AWS Database Migration Service (AWS DMS) to sync both clusters. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Aurora read replica in us-west-1 similar in size to the production application's Aurora MySQL cluster writer instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 125

A company is implementing a shared storage solution for a media application that the company hosts on AWS. The company needs the ability to use SMB clients to access stored data.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Create an AWS Storage Gateway Volume Gateway. Create a file share that uses the required client protocol. Connect the application server to the file share.
- **B.** Create an AWS Storage Gateway Tape Gateway. Configure tapes to use Amazon S3. Connect the application server to the Tape Gateway.
- **C.** Create an Amazon EC2 Windows instance. Install and configure a Windows file share role on the instance. Connect the application server to the file share.
- **D.** Create an Amazon FSx for Windows File Server file system. Connect the application server to the file system. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon FSx for Windows File Server file system. Connect the application server to the file system.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon FSx for Windows File Server file system. Connect the application server to the file system. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Storage Gateway Volume Gateway. Create a file share that uses the required client protocol. Connect the application server to the file share. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Storage Gateway Tape Gateway. Configure tapes to use Amazon S3. Connect the application server to the Tape Gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon EC2 Windows instance. Install and configure a Windows file share role on the instance. Connect the application server to the file share. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 126

A company hosts a website on Amazon EC2 instances behind an Application Load Balancer (ALB). The website serves static content. Website traffic is increasing. The company wants to minimize the website hosting costs.
Which solution will meet these requirements?

- **A.** Move the website to AWS Amplify. Configure EC2 instances to cache the website.
- **B.** Move the website to an Amazon S3 bucket. Configure an Amazon CloudFront distribution for the S3 bucket. ✅
- **C.** Move the website to an Amazon S3 bucket. Configure an Amazon ElastiCache cluster for the S3 bucket.
- **D.** Move the website to AWS Amplify. Configure an ALB to resolve to the Amplify website.

**Answer:** B

**Explanation:**

Correct Answer:Move the website to an Amazon S3 bucket. Configure an Amazon CloudFront distribution for the S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Move the website to an Amazon S3 bucket. Configure an Amazon CloudFront distribution for the S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Move the website to AWS Amplify. Configure EC2 instances to cache the website. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Move the website to an Amazon S3 bucket. Configure an Amazon ElastiCache cluster for the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Move the website to AWS Amplify. Configure an ALB to resolve to the Amplify website. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 127

A company wants to isolate its workloads by creating an AWS account for each workload. The company needs a solution that centrally manages networking components for the workloads. The solution also must create accounts with automatic security controls (guardrails).
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Control Tower to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts. ✅
- **B.** Use AWS Organizations to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.
- **C.** Use AWS Control Tower to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.
- **D.** Use AWS Organizations to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment.

**Answer:** A

**Explanation:**

Correct Answer:Use AWS Control Tower to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Control Tower to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Organizations to deploy accounts. Create a networking account that has a VPC with private subnets and public subnets. Use AWS Resource Access Manager (AWS RAM) to share the subnets with the workload accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Control Tower to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Organizations to deploy accounts. Deploy a VPC in each workload account. Configure each VPC to route through an inspection VPC by using a transit gateway attachment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 128

A solutions architect is designing the storage architecture for a new web application used for storing and viewing engineering drawings. All application components will be deployed on the AWS infrastructure.
The application design must support caching to minimize the amount of time that users wait for the engineering drawings to load. The application must be able to store petabytes of data.
Which combination of storage and caching should the solutions architect use?

- **A.** AWS Storage Gateway with Amazon ElastiCache
- **B.** Amazon Elastic Block Store (Amazon EBS) volumes with Amazon CloudFront
- **C.** Amazon S3 Glacier with Amazon ElastiCache
- **D.** Amazon S3 with Amazon CloudFront ✅

**Answer:** D

**Explanation:**

Correct Answer:Amazon S3 with Amazon CloudFront

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Amazon S3 with Amazon CloudFront - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- AWS Storage Gateway with Amazon ElastiCache - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon Elastic Block Store (Amazon EBS) volumes with Amazon CloudFront - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon S3 Glacier with Amazon ElastiCache - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 129

A company has an on-premises MySQL database that handles transactional data. The company is migrating the database to the AWS Cloud. The migrated database must maintain compatibility with the company's applications that use the database. The migrated database also must scale automatically during periods of increased demand.
Which migration solution will meet these requirements?

- **A.** Use native MySQL tools to migrate the database to Amazon RDS for MySQL. Configure storage scaling.
- **B.** Migrate the database to Amazon Redshift by using the mysqldump utility. Turn on Auto Scaling for the Amazon Redshift cluster.
- **C.** Use AWS Database Migration Service (AWS DMS) to migrate the database to Amazon Aurora. Turn on Aurora Auto Scaling. ✅
- **D.** Use AWS Database Migration Service (AWS DMS) to migrate the database to Amazon DynamoDB. Configure an Auto Scaling policy.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Database Migration Service (AWS DMS) to migrate the database to Amazon Aurora. Turn on Aurora Auto Scaling.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Database Migration Service (AWS DMS) to migrate the database to Amazon Aurora. Turn on Aurora Auto Scaling. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use native MySQL tools to migrate the database to Amazon RDS for MySQL. Configure storage scaling. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon Redshift by using the mysqldump utility. Turn on Auto Scaling for the Amazon Redshift cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS) to migrate the database to Amazon DynamoDB. Configure an Auto Scaling policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 130

A company needs to optimize its Amazon S3 storage costs for an application that generates many files that cannot be recreated. Each file is approximately 5 MB and is stored in Amazon S3 Standard storage.
The company must store the files for 4 years before the files can be deleted. The files must be immediately accessible. The files are frequently accessed in the first 30 days of object creation, but they are rarely accessed after the first 30 days.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create an S3 Lifecycle policy to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) 30 days after object creation. Move the files to S3 Glacier Flexible Retrieval 4 years after object creation.
- **B.** Create an S3 Lifecycle policy to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) 30 days after object creation. Delete the files 4 years after object creation. ✅
- **C.** Create an S3 Lifecycle policy to move the files to S3 Glacier Instant Retrieval 30 days after object creation. Delete the files 4 years after object creation.
- **D.** Create an S3 Lifecycle policy to move the files to S3 One Zone-Infrequent Access (S3 One Zone-IA) 30 days after object creation. Delete the files 4 years after object creation.

**Answer:** B

**Explanation:**

Correct Answer:Create an S3 Lifecycle policy to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) 30 days after object creation. Delete the files 4 years after object creation.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an S3 Lifecycle policy to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) 30 days after object creation. Delete the files 4 years after object creation. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an S3 Lifecycle policy to move the files to S3 Standard-Infrequent Access (S3 Standard-IA) 30 days after object creation. Move the files to S3 Glacier Flexible Retrieval 4 years after object creation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an S3 Lifecycle policy to move the files to S3 Glacier Instant Retrieval 30 days after object creation. Delete the files 4 years after object creation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an S3 Lifecycle policy to move the files to S3 One Zone-Infrequent Access (S3 One Zone-IA) 30 days after object creation. Delete the files 4 years after object creation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 131

A global company runs its workloads on AWS. The company's application uses Amazon S3 buckets across AWS Regions for sensitive data storage and analysis. The company stores millions of objects in multiple S3 buckets daily. The company wants to identify all S3 buckets that are not versioning-enabled.
Which solution will meet these requirements?

- **A.** Set up an AWS CloudTrail event that has a rule to identify all S3 buckets that are not versioning-enabled across Regions.
- **B.** Use Amazon S3 Storage Lens to identify all S3 buckets that are not versioning-enabled across Regions. ✅
- **C.** Enable IAM Access Analyzer for S3 to identify all S3 buckets that are not versioning-enabled across Regions.
- **D.** Create an S3 Multi-Region Access Point to identify all S3 buckets that are not versioning-enabled across Regions.

**Answer:** B

**Explanation:**

Correct Answer:Use Amazon S3 Storage Lens to identify all S3 buckets that are not versioning-enabled across Regions.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon S3 Storage Lens to identify all S3 buckets that are not versioning-enabled across Regions. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up an AWS CloudTrail event that has a rule to identify all S3 buckets that are not versioning-enabled across Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable IAM Access Analyzer for S3 to identify all S3 buckets that are not versioning-enabled across Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an S3 Multi-Region Access Point to identify all S3 buckets that are not versioning-enabled across Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 132

An ecommerce company wants to collect user clickstream data from the company's website for real-time analysis. The website experiences fluctuating traffic patterns throughout the day. The company needs a scalable solution that can adapt to varying levels of traffic.
Which solution will meet these requirements?

- **A.** Use a data stream in Amazon Kinesis Data Streams in on-demand mode to capture the clickstream data. Use AWS Lambda to process the data in real time. ✅
- **B.** Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to capture the clickstream data. Use AWS Lambda to process the data in real time.
- **C.** Use Amazon Kinesis Data Firehose to capture the clickstream data. Use AWS Glue to process the data in real time.
- **D.** Use Amazon Kinesis Video Streams to capture the clickstream data. Use AWS Glue to process the data in real time.

**Answer:** A

**Explanation:**

Correct Answer:Use a data stream in Amazon Kinesis Data Streams in on-demand mode to capture the clickstream data. Use AWS Lambda to process the data in real time.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use a data stream in Amazon Kinesis Data Streams in on-demand mode to capture the clickstream data. Use AWS Lambda to process the data in real time. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to capture the clickstream data. Use AWS Lambda to process the data in real time. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Kinesis Data Firehose to capture the clickstream data. Use AWS Glue to process the data in real time. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Kinesis Video Streams to capture the clickstream data. Use AWS Glue to process the data in real time. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 133

A company plans to rehost an application to Amazon EC2 instances that use Amazon Elastic Block Store (Amazon EBS) as the attached storage.
A solutions architect must design a solution to ensure that all newly created Amazon EBS volumes are encrypted by default. The solution must also prevent the creation of unencrypted EBS volumes.
Which solution will meet these requirements?

- **A.** Configure AWS Systems Manager to create encrypted copies of the EBS volumes. Reconfigure the EC2 instances to use the encrypted volumes.
- **B.** Configure the EC2 account attributes to always encrypt new EBS volumes. ✅
- **C.** Create a customer managed key in AWS Key Management Service (AWS KMS). Configure AWS Migration Hub to use the key when the company migrates workloads.
- **D.** Use AWS Config. Configure the encrypted-volumes identifier. Apply the default AWS Key Management Service (AWS KMS) key.

**Answer:** B

**Explanation:**

Correct Answer:Configure the EC2 account attributes to always encrypt new EBS volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the EC2 account attributes to always encrypt new EBS volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Systems Manager to create encrypted copies of the EBS volumes. Reconfigure the EC2 instances to use the encrypted volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a customer managed key in AWS Key Management Service (AWS KMS). Configure AWS Migration Hub to use the key when the company migrates workloads. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Config. Configure the encrypted-volumes identifier. Apply the default AWS Key Management Service (AWS KMS) key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 134

A company uses a Microsoft SQL Server database. The company's applications are connected to the database. The company wants to migrate to an Amazon Aurora PostgreSQL database with minimal changes to the application code.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Use Amazon RDS Proxy to connect the applications to Aurora PostgreSQL.
- **B.** Enable Babelfish on Aurora PostgreSQL to run the SQL queries from the applications. ✅
- **C.** Use AWS Database Migration Service (AWS DMS) to rewrite the SQL queries in the applications.
- **D.** Use the AWS Schema Conversion Tool (AWS SCT) to rewrite the SQL queries in the applications.
- **E.** Migrate the database schema and data by using the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS). ✅

**Answer:** B, E

**Explanation:**

Correct Answer:Enable Babelfish on Aurora PostgreSQL to run the SQL queries from the applications.; Migrate the database schema and data by using the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable Babelfish on Aurora PostgreSQL to run the SQL queries from the applications. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Migrate the database schema and data by using the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon RDS Proxy to connect the applications to Aurora PostgreSQL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS) to rewrite the SQL queries in the applications. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the AWS Schema Conversion Tool (AWS SCT) to rewrite the SQL queries in the applications. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 135

A company has released a new version of its production application. The company's workload uses Amazon EC2, AWS Lambda, AWS Fargate, and Amazon SageMaker.
The company wants to cost optimize the workload now that usage is at a steady state. The company wants to cover the most services with the fewest savings plans.
Which combination of savings plans will meet these requirements? (Choose two.)

- **A.** Purchase an EC2 Instance Savings Plan for Amazon EC2 and Fargate.
- **B.** Purchase a Compute Savings Plan for Lambda, Fargate, and Amazon EC2. ✅
- **C.** Purchase a SageMaker Savings Plan. ✅
- **D.** Purchase a Compute Savings Plan for Amazon EC2, Lambda, and SageMaker.
- **E.** Purchase an EC2 Instance Savings Plan for Amazon EC2 and SageMaker.

**Answer:** B, C

**Explanation:**

Correct Answer:Purchase a Compute Savings Plan for Lambda, Fargate, and Amazon EC2.; Purchase a SageMaker Savings Plan.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Purchase a Compute Savings Plan for Lambda, Fargate, and Amazon EC2. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Purchase a SageMaker Savings Plan. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Purchase an EC2 Instance Savings Plan for Amazon EC2 and Fargate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase a Compute Savings Plan for Amazon EC2, Lambda, and SageMaker. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase an EC2 Instance Savings Plan for Amazon EC2 and SageMaker. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 136

A solutions architect is designing a three-tier web application. The architecture consists of an internet-facing Application Load Balancer (ALB) and a web tier that is hosted on Amazon EC2 instances in private subnets. The application tier with the business logic runs on EC2 instances in private subnets. The database tier consists of Microsoft SQL Server that runs on EC2 instances in private subnets. Security is a high priority for the company.
Which combination of security group configurations should the solutions architect use? (Choose three.)

- **A.** Configure the security group for the web tier to allow outbound HTTPS traffic to 0.0.0.0/0.
- **B.** Configure the security group for the application tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier.
- **C.** Configure the security group for the application tier to allow inbound HTTPS traffic from the security group for the web tier. ✅
- **D.** Configure the security group for the database tier to allow inbound Microsoft SQL Server traffic from the security group for the application tier. ✅
- **E.** Configure the security group for the web tier to allow inbound HTTPS traffic from the security group for the ALB. ✅
- **F.** Configure the security group for the database tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier.

**Answer:** C, D, E

**Explanation:**

Correct Answer:Configure the security group for the application tier to allow inbound HTTPS traffic from the security group for the web tier.; Configure the security group for the database tier to allow inbound Microsoft SQL Server traffic from the security group for the application tier.; Configure the security group for the web tier to allow inbound HTTPS traffic from the security group for the ALB.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the security group for the application tier to allow inbound HTTPS traffic from the security group for the web tier. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure the security group for the database tier to allow inbound Microsoft SQL Server traffic from the security group for the application tier. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure the security group for the web tier to allow inbound HTTPS traffic from the security group for the ALB. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the security group for the web tier to allow outbound HTTPS traffic to 0.0.0.0/0. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the security group for the application tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the security group for the database tier to allow outbound HTTPS traffic and Microsoft SQL Server traffic to the security group for the web tier. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 137

A company has deployed a multi-account strategy on AWS by using AWS Control Tower. The company has provided individual AWS accounts to each of its developers. The company wants to implement controls to limit AWS resource costs that the developers incur.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Service Catalog to allow developers to launch resources within a limited cost range. Create AWS Lambda functions in each AWS account to stop running resources at the end of each work day. Configure the Lambda functions to resume the resources at the start of each work day.
- **B.** Use AWS Cost Explorer to monitor and report on costs for each developer account. Configure Cost Explorer to send a daily report to each developer to monitor their spending. Use AWS Cost Anomaly Detection to detect anomalous spending and provide alerts.
- **C.** Use AWS Budgets to establish budgets for each developer account. Set up budget alerts for actual and forecast values to notify developers when they exceed or expect to exceed their assigned budget. Use AWS Budgets actions to apply a DenyAll policy to the developer's IAM role to prevent additional resources from being launched when the assigned budget is reached. ✅
- **D.** Instruct each developer to tag all their resources with a tag that has a key of CostCenter and a value of the developer's name. Use the required-tags AWS Config managed rule to check for the tag. Create an AWS Lambda function to terminate resources that do not have the tag. Configure AWS Cost Explorer to send a daily report to each developer to monitor their spending.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Budgets to establish budgets for each developer account. Set up budget alerts for actual and forecast values to notify developers when they exceed or expect to exceed their assigned budget. Use AWS Budgets actions to apply a DenyAll policy to the developer's IAM role to prevent additional resources from being launched when the assigned budget is reached.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Budgets to establish budgets for each developer account. Set up budget alerts for actual and forecast values to notify developers when they exceed or expect to exceed their assigned budget. Use AWS Budgets actions to apply a DenyAll policy to the developer's IAM role to prevent additional resources from being launched when the assigned budget is reached. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Service Catalog to allow developers to launch resources within a limited cost range. Create AWS Lambda functions in each AWS account to stop running resources at the end of each work day. Configure the Lambda functions to resume the resources at the start of each work day. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Cost Explorer to monitor and report on costs for each developer account. Configure Cost Explorer to send a daily report to each developer to monitor their spending. Use AWS Cost Anomaly Detection to detect anomalous spending and provide alerts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Instruct each developer to tag all their resources with a tag that has a key of CostCenter and a value of the developer's name. Use the required-tags AWS Config managed rule to check for the tag. Create an AWS Lambda function to terminate resources that do not have the tag. Configure AWS Cost Explorer to send a daily report to each developer to monitor their spending. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 138

A company runs its application by using Amazon EC2 instances and AWS Lambda functions. The EC2 instances run in private subnets of a VPC. The Lambda functions need direct network access to the EC2 instances for the application to work.
The application will run for 1 year. The number of Lambda functions that the application uses will increase during the 1-year period. The company must minimize costs on all application resources.
Which solution will meet these requirements?

- **A.** Purchase a Compute Savings Plan. Keep the Lambda functions in the Lambda service VPC.
- **B.** Purchase a Compute Savings Plan. Connect the Lambda functions to the private subnets that contain the EC2 instances. ✅
- **C.** Purchase an EC2 Instance Savings Plan. Connect the Lambda functions to new public subnets in the same VPC where the EC2 instances run.
- **D.** Purchase an EC2 Instance Savings Plan. Connect the Lambda functions to the private subnets that contain the EC2 instances.

**Answer:** B

**Explanation:**

Correct Answer:Purchase a Compute Savings Plan. Connect the Lambda functions to the private subnets that contain the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Purchase a Compute Savings Plan. Connect the Lambda functions to the private subnets that contain the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Purchase a Compute Savings Plan. Keep the Lambda functions in the Lambda service VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase an EC2 Instance Savings Plan. Connect the Lambda functions to new public subnets in the same VPC where the EC2 instances run. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase an EC2 Instance Savings Plan. Connect the Lambda functions to the private subnets that contain the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 139

A company is hosting a high-traffic static website on Amazon S3 with an Amazon CloudFront distribution that has a default TTL of 0 seconds. The company wants to implement caching to improve performance for the website. However, the company also wants to ensure that stale content is not served for more than a few minutes after a deployment.
Which combination of caching methods should a solutions architect implement to meet these requirements? (Choose two.)

- **A.** Add a Cache-Control max-age directive of 24 hours to the objects in Amazon S3. On deployment, create a CloudFront invalidation to clear any changed files from edge caches. ✅
- **B.** Set the CloudFront default TTL to 2 minutes. ✅
- **C.** Set a default TTL of 2 minutes on the S3 bucket.
- **D.** Add a Cache-Control private directive to the objects in Amazon S3.
- **E.** Create an AWS Lambda@Edge function to add an Expires header to HTTP responses. Configure the function to run on viewer response.

**Answer:** A, B

**Explanation:**

Correct Answer:Add a Cache-Control max-age directive of 24 hours to the objects in Amazon S3. On deployment, create a CloudFront invalidation to clear any changed files from edge caches.; Set the CloudFront default TTL to 2 minutes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add a Cache-Control max-age directive of 24 hours to the objects in Amazon S3. On deployment, create a CloudFront invalidation to clear any changed files from edge caches. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Set the CloudFront default TTL to 2 minutes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set a default TTL of 2 minutes on the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add a Cache-Control private directive to the objects in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda@Edge function to add an Expires header to HTTP responses. Configure the function to run on viewer response. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 140

A company that uses AWS Organizations runs 150 applications across 30 different AWS accounts. The company used AWS Cost and Usage Report to create a new report in the management account. The report is delivered to an Amazon S3 bucket that is replicated to a bucket in the data collection account.
The company’s senior leadership wants to view a custom dashboard that provides NAT gateway costs each day starting at the beginning of the current month.
Which solution will meet these requirements?

- **A.** Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use AWS DataSync to query the new report.
- **B.** Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use Amazon Athena to query the new report. ✅
- **C.** Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use Amazon Athena to query the new report.
- **D.** Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use AWS DataSync to query the new report.

**Answer:** B

**Explanation:**

Correct Answer:Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use Amazon Athena to query the new report.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use Amazon Athena to query the new report. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use AWS DataSync to query the new report. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use Amazon Athena to query the new report. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use AWS DataSync to query the new report. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 141

A company runs an ecommerce application on AWS. Amazon EC2 instances process purchases and store the purchase details in an Amazon Aurora PostgreSQL DB cluster.
Customers are experiencing application timeouts during times of peak usage. A solutions architect needs to rearchitect the application so that the application can scale to meet peak usage demands.
Which combination of actions will meet these requirements MOST cost-effectively? (Choose two.)

- **A.** Configure an AWS Lambda function to retry the ticket purchases until the processing is complete.
- **B.** Update the application to send the purchase requests to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an Auto Scaling group of new EC2 instances that read from the SQS queue. ✅
- **C.** Configure the application to use an Amazon ElastiCache cluster in front of the Aurora PostgreSQL DB cluster. ✅
- **D.** Configure an Auto Scaling group of new EC2 instances to retry the purchases until the processing is complete. Update the applications to connect to the DB cluster by using Amazon RDS Proxy.
- **E.** Configure an Amazon AP! Gateway REST API with a usage plan.

**Answer:** B, C

**Explanation:**

Correct Answer:Update the application to send the purchase requests to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an Auto Scaling group of new EC2 instances that read from the SQS queue.; Configure the application to use an Amazon ElastiCache cluster in front of the Aurora PostgreSQL DB cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Update the application to send the purchase requests to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an Auto Scaling group of new EC2 instances that read from the SQS queue. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure the application to use an Amazon ElastiCache cluster in front of the Aurora PostgreSQL DB cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an AWS Lambda function to retry the ticket purchases until the processing is complete. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Auto Scaling group of new EC2 instances to retry the purchases until the processing is complete. Update the applications to connect to the DB cluster by using Amazon RDS Proxy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon AP! Gateway REST API with a usage plan. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 142

A company uses Amazon API Gateway to manage its REST APIs that third-party service providers access. The company must protect the REST APIs from SQL injection and cross-site scripting attacks.
What is the MOST operationally efficient solution that meets these requirements?

- **A.** Configure AWS WAF. ✅
- **B.** Set up API Gateway with an Amazon CloudFront distribution. Configure AWS WAF in CloudFront.
- **C.** Configure AWS Shield.
- **D.** Set up API Gateway with an Amazon CloudFront distribution. Configure AWS Shield in CloudFront.

**Answer:** A

**Explanation:**

Correct Answer:Configure AWS WAF.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure AWS WAF. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up API Gateway with an Amazon CloudFront distribution. Configure AWS WAF in CloudFront. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Shield. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up API Gateway with an Amazon CloudFront distribution. Configure AWS Shield in CloudFront. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 143

A company uses Amazon S3 to host its static website. The company wants to add a contact form to the webpage. The contact form will have dynamic server-side components for users to input their name, email address, phone number, and user message.
The company expects fewer than 100 site visits each month. The contact form must notify the company by email when a customer fills out the form.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Migrate the website from Amazon S3 to Amazon EC2 instances that run Windows Server. Use Internet Information Services (IIS) for Windows Server to host the webpage. Use client-side scripting to build the contact form. Integrate the form with Amazon WorkMail.
- **B.** Host the dynamic contact form in Amazon Elastic Container Service (Amazon ECS). Set up Amazon Simple Email Service (Amazon SES) to connect to a third-party email provider.
- **C.** Create an Amazon API Gateway endpoint that returns the contact form from an AWS Lambda function. Configure another Lambda function on the API Gateway to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic. ✅
- **D.** Host the website by using AWS Amplify Hosting for static content and dynamic content. Use server-side scripting to build the contact form. Configure Amazon Simple Queue Service (Amazon SQS) to deliver the message to the company.

**Answer:** C

**Explanation:**

Correct Answer:Create an Amazon API Gateway endpoint that returns the contact form from an AWS Lambda function. Configure another Lambda function on the API Gateway to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon API Gateway endpoint that returns the contact form from an AWS Lambda function. Configure another Lambda function on the API Gateway to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the website from Amazon S3 to Amazon EC2 instances that run Windows Server. Use Internet Information Services (IIS) for Windows Server to host the webpage. Use client-side scripting to build the contact form. Integrate the form with Amazon WorkMail. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Host the dynamic contact form in Amazon Elastic Container Service (Amazon ECS). Set up Amazon Simple Email Service (Amazon SES) to connect to a third-party email provider. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Host the website by using AWS Amplify Hosting for static content and dynamic content. Use server-side scripting to build the contact form. Configure Amazon Simple Queue Service (Amazon SQS) to deliver the message to the company. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 144

A company hosts an application on Amazon EC2 instances that run in a single Availability Zone. The application is accessible by using the transport layer of the Open Systems Interconnection (OSI) model. The company needs the application architecture to have high availability.
Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

- **A.** Configure a Network Load Balancer in front of the EC2 instances. ✅
- **B.** Configure new EC2 instances in a different Availability Zone. Use Amazon Route 53 to route traffic to all instances.
- **C.** Create an Auto Scaling group for the EC2 instances. Configure the Auto Scaling group to use multiple Availability Zones. Configure the Auto Scaling group to run application health checks on the instances. ✅
- **D.** Create an Amazon CloudWatch alarm. Configure the alarm to restart EC2 instances that transition to a stopped state.
- **E.** Configure a Network Load Balancer for TCP traffic to the instances. Configure an Application Load Balancer for HTTP and HTTPS traffic to the instances.

**Answer:** A, C

**Explanation:**

Correct Answer:Configure a Network Load Balancer in front of the EC2 instances.; Create an Auto Scaling group for the EC2 instances. Configure the Auto Scaling group to use multiple Availability Zones. Configure the Auto Scaling group to run application health checks on the instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a Network Load Balancer in front of the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Auto Scaling group for the EC2 instances. Configure the Auto Scaling group to use multiple Availability Zones. Configure the Auto Scaling group to run application health checks on the instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure new EC2 instances in a different Availability Zone. Use Amazon Route 53 to route traffic to all instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudWatch alarm. Configure the alarm to restart EC2 instances that transition to a stopped state. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a Network Load Balancer for TCP traffic to the instances. Configure an Application Load Balancer for HTTP and HTTPS traffic to the instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 145

A company runs an application on Amazon EC2 instances in a private subnet. The application needs to store and retrieve data in Amazon S3 buckets. According to regulatory requirements, the data must not travel across the public internet.
What should a solutions architect do to meet these requirements MOST cost-effectively?

- **A.** Deploy an S3 gateway endpoint to access the S3 buckets. ✅
- **B.** Deploy AWS Storage Gateway to access the S3 buckets.
- **C.** Deploy an S3 interface endpoint to access the S3 buckets.
- **D.** Deploy a NAT gateway to access the S3 buckets.

**Answer:** A

**Explanation:**

Correct Answer:Deploy an S3 gateway endpoint to access the S3 buckets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an S3 gateway endpoint to access the S3 buckets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy AWS Storage Gateway to access the S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an S3 interface endpoint to access the S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy a NAT gateway to access the S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 146

A company hosts its application in the AWS Cloud. The application runs on Amazon EC2 instances in an Auto Scaling group behind an Elastic Load Balancing (ELB) load balancer. The application connects to an Amazon DynamoDB table.
For disaster recovery (DR) purposes, the company wants to ensure that the application is available from another AWS Region with minimal downtime.
Which solution will meet these requirements with the LEAST downtime?

- **A.** Create an Auto Scaling group and an ELB in the DR Region. Configure the DynamoDB table as a global table. Create an Amazon CloudWatch alarm with an evaluation period of 10 minutes to invoke an AWS Lambda function that updates Amazon Route 53 to point to the DR Region's ELB.
- **B.** Create an AWS CloudFormation template to create EC2 instances and an ELB to be launched when necessary. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new DR Region's ELB.
- **C.** Create an AWS CloudFormation template to create EC2 instances, ELBs, and DynamoDB tables to be launched when necessary. Configure DNS failover to point to the new DR Region's ELB.
- **D.** Create an Auto Scaling group and an ELB in the DR Region. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new DR Region's ELB. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Auto Scaling group and an ELB in the DR Region. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new DR Region's ELB.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Auto Scaling group and an ELB in the DR Region. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new DR Region's ELB. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Auto Scaling group and an ELB in the DR Region. Configure the DynamoDB table as a global table. Create an Amazon CloudWatch alarm with an evaluation period of 10 minutes to invoke an AWS Lambda function that updates Amazon Route 53 to point to the DR Region's ELB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS CloudFormation template to create EC2 instances and an ELB to be launched when necessary. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new DR Region's ELB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS CloudFormation template to create EC2 instances, ELBs, and DynamoDB tables to be launched when necessary. Configure DNS failover to point to the new DR Region's ELB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 147

A company has migrated a fleet of hundreds of on-premises virtual machines (VMs) to Amazon EC2 instances. The instances run a diverse fleet of Windows Server versions along with several Linux distributions. The company wants a solution that will automate inventory and updates of the operating systems. The company also needs a summary of common vulnerabilities of each instance for regular monthly reviews.
What should a solutions architect recommend to meet these requirements?

- **A.** Set up Amazon GuardDuty in the account to monitor all EC2 instances. Deploy AWS Config to automate patch installations on the EC2 instances.
- **B.** Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Deploy Amazon Inspector, and configure monthly reports. ✅
- **C.** Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Configure AWS Security Hub to produce monthly reports.
- **D.** Set up AWS Shield Advanced, and configure monthly reports. Deploy AWS Config to automate patch installations on the EC2 instances.

**Answer:** B

**Explanation:**

Correct Answer:Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Deploy Amazon Inspector, and configure monthly reports.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Deploy Amazon Inspector, and configure monthly reports. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up Amazon GuardDuty in the account to monitor all EC2 instances. Deploy AWS Config to automate patch installations on the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Configure AWS Security Hub to produce monthly reports. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS Shield Advanced, and configure monthly reports. Deploy AWS Config to automate patch installations on the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 148

A development team uses multiple AWS accounts for its development, staging, and production environments. Team members have been launching large Amazon EC2 instances that are underutilized. A solutions architect must prevent large instances from being launched in all accounts.
How can the solutions architect meet this requirement with the LEAST operational overhead?

- **A.** Define a resource in AWS Resource Access Manager that prevents the launch of large EC2 instances.
- **B.** Create an organization in AWS Organizations in the management account with the default policy. Create a service control policy (SCP) that denies the launch of large EC2 instances, and apply it to the AWS accounts. ✅
- **C.** Create an IAM role in each account that denies the launch of large EC2 instances. Grant the developers IAM group access to the role.
- **D.** Update the IAM policies to deny the launch of large EC2 instances. Apply the policies to all users.

**Answer:** B

**Explanation:**

Correct Answer:Create an organization in AWS Organizations in the management account with the default policy. Create a service control policy (SCP) that denies the launch of large EC2 instances, and apply it to the AWS accounts.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an organization in AWS Organizations in the management account with the default policy. Create a service control policy (SCP) that denies the launch of large EC2 instances, and apply it to the AWS accounts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Define a resource in AWS Resource Access Manager that prevents the launch of large EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM role in each account that denies the launch of large EC2 instances. Grant the developers IAM group access to the role. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Update the IAM policies to deny the launch of large EC2 instances. Apply the policies to all users. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 149

A company wants to restrict access to the content of its web application. The company needs to protect the content by using authorization techniques that are available on AWS. The company also wants to implement a serverless architecture for authorization and authentication that has low login latency.
The solution must integrate with the web application and serve web content globally. The application currently has a small user base, but the company expects the application's user base to increase.
Which solution will meet these requirements?

- **A.** Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement AWS Lambda for authorization. Use an Application Load Balancer to serve the web application globally.
- **B.** Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement Lambda@Edge for authorization. Use AWS Elastic Beanstalk to serve the web application globally.
- **C.** Configure Amazon Cognito for authentication. Implement Lambda@Edge for authorization. Configure Amazon CloudFront to serve the web application globally. ✅
- **D.** Configure Amazon Cognito for authentication. Implement AWS Lambda for authorization. Use Amazon S3 Transfer Acceleration to serve the web application globally.

**Answer:** C

**Explanation:**

Correct Answer:Configure Amazon Cognito for authentication. Implement Lambda@Edge for authorization. Configure Amazon CloudFront to serve the web application globally.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Cognito for authentication. Implement Lambda@Edge for authorization. Configure Amazon CloudFront to serve the web application globally. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement AWS Lambda for authorization. Use an Application Load Balancer to serve the web application globally. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement Lambda@Edge for authorization. Use AWS Elastic Beanstalk to serve the web application globally. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Cognito for authentication. Implement AWS Lambda for authorization. Use Amazon S3 Transfer Acceleration to serve the web application globally. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 150

A company has two AWS accounts: Production and Development. The company needs to push code changes in the Development account to the Production account. In the alpha phase, only two senior developers on the development team need access to the Production account. In the beta phase, more developers will need access to perform testing.
Which solution will meet these requirements?

- **A.** Create two policy documents by using the AWS Management Console in each account. Assign the policy to developers who need access.
- **B.** Create an IAM role in the Development account. Grant the IAM role access to the Production account. Allow developers to assume the role.
- **C.** Create an IAM role in the Production account. Define a trust policy that specifies the Development account. Allow developers to assume the role. ✅
- **D.** Create an IAM group in the Production account. Add the group as a principal in a trust policy that specifies the Production account. Add developers to the group.

**Answer:** C

**Explanation:**

Correct Answer:Create an IAM role in the Production account. Define a trust policy that specifies the Development account. Allow developers to assume the role.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an IAM role in the Production account. Define a trust policy that specifies the Development account. Allow developers to assume the role. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create two policy documents by using the AWS Management Console in each account. Assign the policy to developers who need access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM role in the Development account. Grant the IAM role access to the Production account. Allow developers to assume the role. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM group in the Production account. Add the group as a principal in a trust policy that specifies the Production account. Add developers to the group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 151

A company wants to enhance its ecommerce order-processing application that is deployed on AWS. The application must process each order exactly once without affecting the customer experience during unpredictable traffic surges.
Which solution will meet these requirements?

- **A.** Create a flow by using Amazon AppFlow. Send the orders to the flow. Configure an AWS Lambda function as the target to process the orders.
- **B.** Configure AWS X-Ray in the application to track the order requests. Configure the application to process the orders by pulling the orders from Amazon CloudWatch.
- **C.** Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Publish all the orders to the SNS standard topic. Configure the application as a notification target.
- **D.** Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Put all the orders in the SQS queue. Configure an AWS Lambda function as the target to process the orders. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Put all the orders in the SQS queue. Configure an AWS Lambda function as the target to process the orders.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Put all the orders in the SQS queue. Configure an AWS Lambda function as the target to process the orders. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a flow by using Amazon AppFlow. Send the orders to the flow. Configure an AWS Lambda function as the target to process the orders. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS X-Ray in the application to track the order requests. Configure the application to process the orders by pulling the orders from Amazon CloudWatch. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Publish all the orders to the SNS standard topic. Configure the application as a notification target. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 152

A research company uses on-premises devices to generate data for analysis. The company wants to use the AWS Cloud to analyze the data. The devices generate .csv files and support writing the data to an SMB file share. Company analysts must be able to use SQL commands to query the data. The analysts will run queries periodically throughout the day.
Which combination of steps will meet these requirements MOST cost-effectively? (Choose three.)

- **A.** Deploy an AWS Storage Gateway on premises in Amazon S3 File Gateway mode. ✅
- **B.** Deploy an AWS Storage Gateway on premises in Amazon FSx File Gateway made.
- **C.** Set up an AWS Glue crawler to create a table based on the data that is in Amazon S3. ✅
- **D.** Setup Amazon Athena to query the data that is in Amazon S3. Provide access to analysts. ✅
- **E.** Set up an Amazon Redshift cluster to query the data that is in Amazon S3. Provide access to analysts.
- **F.** Set up an Amazon EMR cluster with EMR File System (EMRFS) to query the data that is in Amazon S3. Provide access to analysts.

**Answer:** A, C, D

**Explanation:**

Correct Answer:Deploy an AWS Storage Gateway on premises in Amazon S3 File Gateway mode.; Set up an AWS Glue crawler to create a table based on the data that is in Amazon S3.; Setup Amazon Athena to query the data that is in Amazon S3. Provide access to analysts.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an AWS Storage Gateway on premises in Amazon S3 File Gateway mode. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Set up an AWS Glue crawler to create a table based on the data that is in Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Setup Amazon Athena to query the data that is in Amazon S3. Provide access to analysts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an AWS Storage Gateway on premises in Amazon FSx File Gateway made. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an Amazon Redshift cluster to query the data that is in Amazon S3. Provide access to analysts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an Amazon EMR cluster with EMR File System (EMRFS) to query the data that is in Amazon S3. Provide access to analysts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 153

A company runs its production workload on Amazon EC2 instances with Amazon Elastic Block Store (Amazon EBS) volumes. A solutions architect needs to analyze the current EBS volume cost and to recommend optimizations. The recommendations need to include estimated monthly saving opportunities.
Which solution will meet these requirements?

- **A.** Use Amazon CloudWatch metrics reporting to determine EBS volume recommendations for optimization.
- **B.** Use AWS Systems Manager reporting to determine EBS volume recommendations for optimization.
- **C.** Use AWS Compute Optimizer to generate EBS volume recommendations for optimization. ✅
- **D.** Use Amazon Inspector reporting to generate EBS volume recommendations for optimization.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Compute Optimizer to generate EBS volume recommendations for optimization.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Compute Optimizer to generate EBS volume recommendations for optimization. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon CloudWatch metrics reporting to determine EBS volume recommendations for optimization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Systems Manager reporting to determine EBS volume recommendations for optimization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Inspector reporting to generate EBS volume recommendations for optimization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 154

A company runs a web application on multiple Amazon EC2 instances in a VPC. The application needs to write sensitive data to an Amazon S3 bucket. The data cannot be sent over the public internet.
Which solution will meet these requirements?

- **A.** Create an AWS Direct Connect connection between the VPC and an S3 regional endpoint.
- **B.** Create a gateway VPC endpoint for Amazon S3. Create a route in the VPC route table to the endpoint. ✅
- **C.** Deploy the S3 bucket inside the VPCreate a route in the VPC route table to the bucket.
- **D.** Create an internal Network Load Balancer that has the S3 bucket as the target.

**Answer:** B

**Explanation:**

Correct Answer:Create a gateway VPC endpoint for Amazon S3. Create a route in the VPC route table to the endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a gateway VPC endpoint for Amazon S3. Create a route in the VPC route table to the endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Direct Connect connection between the VPC and an S3 regional endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the S3 bucket inside the VPCreate a route in the VPC route table to the bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an internal Network Load Balancer that has the S3 bucket as the target. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 155

A company's SAP application has a backend SQL Server database in an on-premises environment. The company wants to migrate its on-premises application and database server to AWS. The company needs an instance type that meets the high demands of its SAP database. On-premises performance data shows that both the SAP application and the database have high memory utilization.
Which solution will meet these requirements?

- **A.** Use the high performance computing (HPC) optimized instance family for the application. Use the memory optimized instance family for the database.
- **B.** Use the memory optimized instance family for both the application and the database. ✅
- **C.** Use the storage optimized instance family for both the application and the database.
- **D.** Use the compute optimized instance family for the application. Use the memory optimized instance family for the database.

**Answer:** B

**Explanation:**

Correct Answer:Use the memory optimized instance family for both the application and the database.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use the memory optimized instance family for both the application and the database. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the high performance computing (HPC) optimized instance family for the application. Use the memory optimized instance family for the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the storage optimized instance family for both the application and the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the compute optimized instance family for the application. Use the memory optimized instance family for the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 156

A company that runs its application on AWS uses an Amazon Aurora DB cluster as its database. During peak usage hours when multiple users access and read the data, the monitoring system shows degradation of database performance for the write queries. The company wants to increase the scalability of the application to meet peak usage demands.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create a second Aurora DB cluster. Configure a copy job to replicate the users’ data to the new database. Update the application to use the second database to read the data.
- **B.** Create an Amazon DynamoDB Accelerator (DAX) cluster in front of the existing Aurora DB cluster. Update the application to use the DAX cluster for read-only queries. Write data directly to the Aurora DB cluster.
- **C.** Create an Amazon Redshift cluster. Copy the users' data to the Redshift cluster. Update the application to connect to the Redshift cluster and to perform read-only queries on the Redshift cluster.
- **D.** Create an Aurora read replica in the existing Aurora DB cluster. Update the application to use the replica endpoint for read-only queries and to use the cluster endpoint for write queries. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Aurora read replica in the existing Aurora DB cluster. Update the application to use the replica endpoint for read-only queries and to use the cluster endpoint for write queries.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Aurora read replica in the existing Aurora DB cluster. Update the application to use the replica endpoint for read-only queries and to use the cluster endpoint for write queries. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a second Aurora DB cluster. Configure a copy job to replicate the users' data to the new database. Update the application to use the second database to read the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon DynamoDB Accelerator (DAX) cluster in front of the existing Aurora DB cluster. Update the application to use the DAX cluster for read-only queries. Write data directly to the Aurora DB cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Redshift cluster. Copy the users' data to the Redshift cluster. Update the application to connect to the Redshift cluster and to perform read-only queries on the Redshift cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 157

A company uses Amazon RDS with default backup settings for its database tier. The company needs to make a daily backup of the database to meet regulatory requirements. The company must retain the backups for 30 days.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Write an AWS Lambda function to create an RDS snapshot every day.
- **B.** Modify the RDS database to have a retention period of 30 days for automated backups. ✅
- **C.** Use AWS Systems Manager Maintenance Windows to modify the RDS backup retention period.
- **D.** Create a manual snapshot every day by using the AWS CLI. Modify the RDS backup retention period.

**Answer:** B

**Explanation:**

Correct Answer:Modify the RDS database to have a retention period of 30 days for automated backups.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Modify the RDS database to have a retention period of 30 days for automated backups. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Write an AWS Lambda function to create an RDS snapshot every day. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Systems Manager Maintenance Windows to modify the RDS backup retention period. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a manual snapshot every day by using the AWS CLI. Modify the RDS backup retention period. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 158

A company runs an application in the AWS Cloud that generates sensitive archival data files. The company wants to rearchitect the application's data storage. The company wants to encrypt the data files and to ensure that third parties do not have access to the data before the data is encrypted and sent to AWS. The company has already created an Amazon S3 bucket.
Which solution will meet these requirements?

- **A.** Configure the S3 bucket to use client-side encryption with an Amazon S3 managed encryption key. Configure the application to use the S3 bucket to store the archival files.
- **B.** Configure the S3 bucket to use server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files.
- **C.** Configure the application to use client-side encryption with a key stored in AWS Key Management Service (AWS KMS). Configure the application to store the archival files in the S3 bucket. ✅
- **D.** Configure the S3 bucket to use dual-layer server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files.

**Answer:** C

**Explanation:**

Correct Answer:Configure the application to use client-side encryption with a key stored in AWS Key Management Service (AWS KMS). Configure the application to store the archival files in the S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the application to use client-side encryption with a key stored in AWS Key Management Service (AWS KMS). Configure the application to store the archival files in the S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the S3 bucket to use client-side encryption with an Amazon S3 managed encryption key. Configure the application to use the S3 bucket to store the archival files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the S3 bucket to use server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the S3 bucket to use dual-layer server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 159

A company wants to relocate its on-premises MySQL database to AWS. The database accepts regular imports from a client-facing application, which causes a high volume of write operations. The company is concerned that the amount of traffic might be causing performance issues within the application.
How should a solutions architect design the architecture on AWS?

- **A.** Provision an Amazon Elastic File System (Amazon EFS) file system in General Purpose performance mode. Monitor Amazon CloudWatch for IOPS bottlenecks. Change to Provisioned Throughput performance mode if necessary.
- **B.** Provision an Amazon DocumentDB (with MongoDB compatibility) instance with a memory optimized instance type. Monitor Amazon CloudWatch for performance-related issues. Change the instance class if necessary.
- **C.** Provision an Amazon RDS for MySQL DB instance with General Purpose SSD storage. Place an Amazon ElastiCache cluster in front of the DB instance. Configure the application to query ElastiCache instead.
- **D.** Provision an Amazon RDS for MySQL DB instance with Provisioned IOPS SSD storage. Monitor write operation metrics by using Amazon CloudWatch. Adjust the provisioned IOPS if necessary. ✅

**Answer:** D

**Explanation:**

Correct Answer:Provision an Amazon RDS for MySQL DB instance with Provisioned IOPS SSD storage. Monitor write operation metrics by using Amazon CloudWatch. Adjust the provisioned IOPS if necessary.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision an Amazon RDS for MySQL DB instance with Provisioned IOPS SSD storage. Monitor write operation metrics by using Amazon CloudWatch. Adjust the provisioned IOPS if necessary. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Provision an Amazon Elastic File System (Amazon EFS) file system in General Purpose performance mode. Monitor Amazon CloudWatch for IOPS bottlenecks. Change to Provisioned Throughput performance mode if necessary. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an Amazon DocumentDB (with MongoDB compatibility) instance with a memory optimized instance type. Monitor Amazon CloudWatch for performance-related issues. Change the instance class if necessary. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an Amazon RDS for MySQL DB instance with General Purpose SSD storage. Place an Amazon ElastiCache cluster in front of the DB instance. Configure the application to query ElastiCache instead. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 160

A solutions architect is creating an application. The application will run on Amazon EC2 instances in private subnets across multiple Availability Zones in a VPC. The EC2 instances will frequently access large files that contain confidential information. These files are stored in Amazon S3 buckets for processing. The solutions architect must optimize the network architecture to minimize data transfer costs.
What should the solutions architect do to meet these requirements?

- **A.** Create a single NAT gateway in a public subnet. In the route tables for the private subnets, add a default route that points to the NAT gateway.
- **B.** Create one NAT gateway for each Availability Zone in public subnets. In each of the route tables for the private subnets, add a default route that points to the NAT gateway in the same Availability Zone.
- **C.** Create a gateway endpoint for Amazon S3 in the VPC. In the route tables for the private subnets, add an entry for the gateway endpoint. ✅
- **D.** Create an AWS PrivateLink interface endpoint for Amazon S3 in the VPIn the route tables for the private subnets, add an entry for the interface endpoint.

**Answer:** C

**Explanation:**

Correct Answer:Create a gateway endpoint for Amazon S3 in the VPC. In the route tables for the private subnets, add an entry for the gateway endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a gateway endpoint for Amazon S3 in the VPC. In the route tables for the private subnets, add an entry for the gateway endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a single NAT gateway in a public subnet. In the route tables for the private subnets, add a default route that points to the NAT gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create one NAT gateway for each Availability Zone in public subnets. In each of the route tables for the private subnets, add a default route that points to the NAT gateway in the same Availability Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS PrivateLink interface endpoint for Amazon S3 in the VPIn the route tables for the private subnets, add an entry for the interface endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 161

A company runs several Amazon RDS for Oracle On-Demand DB instances that have high utilization. The RDS DB instances run in member accounts that are in an organization in AWS Organizations.
The company's finance team has access to the organization's management account and member accounts. The finance team wants to find ways to optimize costs by using AWS Trusted Advisor.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Review the Trusted Advisor checks for compute optimization. Crosscheck the results by using AWS Compute Optimizer.
- **B.** Review the Trusted Advisor checks for Amazon RDS Idle DB Instances.
- **C.** Review the Trusted Advisor checks for Amazon RDS Reserved Instance Optimization. ✅
- **D.** Use the Trusted Advisor recommendations in the member accounts where the RDS DB instances are running.
- **E.** Use the Trusted Advisor recommendations in the management account. ✅

**Answer:** C, E

**Explanation:**

Correct Answer:Review the Trusted Advisor checks for Amazon RDS Reserved Instance Optimization.; Use the Trusted Advisor recommendations in the management account.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Review the Trusted Advisor checks for Amazon RDS Reserved Instance Optimization. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use the Trusted Advisor recommendations in the management account. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Review the Trusted Advisor checks for compute optimization. Crosscheck the results by using AWS Compute Optimizer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Review the Trusted Advisor checks for Amazon RDS Idle DB Instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the Trusted Advisor recommendations in the member accounts where the RDS DB instances are running. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 162

A company has primary and secondary data centers that are 500 miles (804.7 km) apart and interconnected with high-speed fiber-optic cable. The company needs a highly available and secure network connection between its data centers and a VPC on AWS for a mission-critical workload. A solutions architect must choose a connection solution that provides maximum resiliency.
Which solution meets these requirements?

- **A.** Two AWS Direct Connect connections from the primary data center terminating at two Direct Connect locations on two separate devices.
- **B.** A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on the same device.
- **C.** Two AWS Direct Connect connections from each of the primary and secondary data centers terminating at two Direct Connect locations on two separate devices. ✅
- **D.** A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on two separate devices.

**Answer:** C

**Explanation:**

Correct Answer:Two AWS Direct Connect connections from each of the primary and secondary data centers terminating at two Direct Connect locations on two separate devices.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Two AWS Direct Connect connections from each of the primary and secondary data centers terminating at two Direct Connect locations on two separate devices. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Two AWS Direct Connect connections from the primary data center terminating at two Direct Connect locations on two separate devices. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on the same device. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on two separate devices. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 163

A company plans to run a high performance computing (HPC) workload on Amazon EC2 Instances. The workload requires low-latency network performance and high network throughput with tightly coupled node-to-node communication.
Which solution will meet these requirements?

- **A.** Configure an On-Demand Capacity Reservation when the EC2 instances are launched.
- **B.** Launch the EC2 instances as Spot Instances.
- **C.** Launch the EC2 instances with Dedicated Instance tenancy.
- **D.** Configure the EC2 instances to be part of a cluster placement group. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure the EC2 instances to be part of a cluster placement group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the EC2 instances to be part of a cluster placement group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an On-Demand Capacity Reservation when the EC2 instances are launched. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch the EC2 instances as Spot Instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch the EC2 instances with Dedicated Instance tenancy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 164

A company creates operations data and stores the data in an Amazon S3 bucket. For the company's annual audit, an external consultant needs to access an annual report that is stored in the S3 bucket. The external consultant needs to access the report for 7 days.
The company must implement a solution to allow the external consultant access to only the report.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Enable public access to the S3 bucket for 7 days. Remove access to the S3 bucket when the external consultant completes the audit.
- **B.** Generate a presigned URL that has the required access to the location of the report on the S3 bucket. Share the presigned URL with the external consultant. ✅
- **C.** Create a new IAM user that has access to the report in the S3 bucket. Provide the access keys to the external consultant. Revoke the access keys after 7 days.
- **D.** Create a new S3 bucket that is configured to host a public static website. Migrate the operations data to the new S3 bucket. Share the S3 website URL with the external consultant.

**Answer:** B

**Explanation:**

Correct Answer:Generate a presigned URL that has the required access to the location of the report on the S3 bucket. Share the presigned URL with the external consultant.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Generate a presigned URL that has the required access to the location of the report on the S3 bucket. Share the presigned URL with the external consultant. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Enable public access to the S3 bucket for 7 days. Remove access to the S3 bucket when the external consultant completes the audit. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new IAM user that has access to the report in the S3 bucket. Provide the access keys to the external consultant. Revoke the access keys after 7 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new S3 bucket that is configured to host a public static website. Migrate the operations data to the new S3 bucket. Share the S3 website URL with the external consultant. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 165

A company wants to configure its Amazon CloudFront distribution to use SSL/TLS certificates. The company does not want to use the default domain name for the distribution. Instead, the company wants to use a different domain name for the distribution.
Which solution will deploy the certificate without incurring any additional costs?

- **A.** Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-east-1 Region. ✅
- **B.** Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-west-1 Region.
- **C.** Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-east-1 Region.
- **D.** Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-west-1 Region.

**Answer:** A

**Explanation:**

Correct Answer:Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-east-1 Region.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-east-1 Region. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-west-1 Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-east-1 Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-west-1 Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 166

A company is planning to run a group of Amazon EC2 instances that connect to an Amazon Aurora database. The company has built an AWS CloudFormation template to deploy the EC2 instances and the Aurora DB cluster. The company wants to allow the instances to authenticate to the database in a secure way. The company does not want to maintain static database credentials.
Which solution meets these requirements with the LEAST operational effort?

- **A.** Configure the DB cluster to use IAM database authentication with an IAM user. Create a database user that has a name that matches the IAM user. Associate the IAM user with the EC2 instances to allow applications on the instances to access the database.
- **B.** Create a database user with a user name and password. Store the user name and password in AWS Systems Manager Parameter Store. Configure the EC2 instances to retrieve the database credentials from Parameter Store.
- **C.** Configure the DB cluster to use IAM database authentication. Create a database user to use with IAM authentication. Associate a role with the EC2 instances to allow applications on the instances to access the database. ✅
- **D.** Create a database user with a user name and password. Add parameters for the database user name and password to the CloudFormation template. Pass the parameters to the EC2 instances when the instances are launched.

**Answer:** C

**Explanation:**

Correct Answer:Configure the DB cluster to use IAM database authentication. Create a database user to use with IAM authentication. Associate a role with the EC2 instances to allow applications on the instances to access the database.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the DB cluster to use IAM database authentication. Create a database user to use with IAM authentication. Associate a role with the EC2 instances to allow applications on the instances to access the database. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the DB cluster to use IAM database authentication with an IAM user. Create a database user that has a name that matches the IAM user. Associate the IAM user with the EC2 instances to allow applications on the instances to access the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a database user with a user name and password. Store the user name and password in AWS Systems Manager Parameter Store. Configure the EC2 instances to retrieve the database credentials from Parameter Store. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a database user with a user name and password. Add parameters for the database user name and password to the CloudFormation template. Pass the parameters to the EC2 instances when the instances are launched. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 167

A company's web application consists of multiple Amazon EC2 instances that run behind an Application Load Balancer in a VPC. An Amazon RDS for MySQL DB instance contains the data. The company needs the ability to automatically detect and respond to suspicious or unexpected behavior in its AWS environment. The company already has added AWS WAF to its architecture.
What should a solutions architect do next to protect against threats?

- **A.** Use Amazon Macie to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application.
- **B.** Use Amazon Inspector to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application.
- **C.** Use AWS Firewall Manager to perform threat detection. Configure Amazon EventBridge to filter for Firewall Manager findings and to invoke an AWS Lambda function to adjust the AWS WAF web ACL.
- **D.** Use Amazon GuardDuty to perform threat detection. Configure Amazon EventBridge to filter for GuardDuty findings and to invoke an AWS Lambda function to adjust the AWS WAF rules. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use Amazon GuardDuty to perform threat detection. Configure Amazon EventBridge to filter for GuardDuty findings and to invoke an AWS Lambda function to adjust the AWS WAF rules.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon GuardDuty to perform threat detection. Configure Amazon EventBridge to filter for GuardDuty findings and to invoke an AWS Lambda function to adjust the AWS WAF rules. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Macie to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Inspector to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Firewall Manager to perform threat detection. Configure Amazon EventBridge to filter for Firewall Manager findings and to invoke an AWS Lambda function to adjust the AWS WAF web ACL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 168

A company is building a web application that serves a content management system. The content management system runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The EC2 instances run in an Auto Scaling group across multiple Availability Zones. Users are constantly adding and updating files, blogs, and other website assets in the content management system.
A solutions architect must implement a solution in which all the EC2 instances share up-to-date website content with the least possible lag time.
Which solution meets these requirements?

- **A.** Update the EC2 user data in the Auto Scaling group lifecycle policy to copy the website assets from the EC2 instance that was launched most recently. Configure the ALB to make changes to the website assets only in the newest EC2 instance.
- **B.** Copy the website assets to an Amazon Elastic File System (Amazon EFS) file system. Configure each EC2 instance to mount the EFS file system locally. Configure the website hosting application to reference the website assets that are stored in the EFS file system. ✅
- **C.** Copy the website assets to an Amazon S3 bucket. Ensure that each EC2 instance downloads the website assets from the S3 bucket to the attached Amazon Elastic Block Store (Amazon EBS) volume. Run the S3 sync command once each hour to keep files up to date.
- **D.** Restore an Amazon Elastic Block Store (Amazon EBS) snapshot with the website assets. Attach the EBS snapshot as a secondary EBS volume when a new EC2 instance is launched. Configure the website hosting application to reference the website assets that are stored in the secondary EBS volume.

**Answer:** B

**Explanation:**

Correct Answer:Copy the website assets to an Amazon Elastic File System (Amazon EFS) file system. Configure each EC2 instance to mount the EFS file system locally. Configure the website hosting application to reference the website assets that are stored in the EFS file system.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Copy the website assets to an Amazon Elastic File System (Amazon EFS) file system. Configure each EC2 instance to mount the EFS file system locally. Configure the website hosting application to reference the website assets that are stored in the EFS file system. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Update the EC2 user data in the Auto Scaling group lifecycle policy to copy the website assets from the EC2 instance that was launched most recently. Configure the ALB to make changes to the website assets only in the newest EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Copy the website assets to an Amazon S3 bucket. Ensure that each EC2 instance downloads the website assets from the S3 bucket to the attached Amazon Elastic Block Store (Amazon EBS) volume. Run the S3 sync command once each hour to keep files up to date. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Restore an Amazon Elastic Block Store (Amazon EBS) snapshot with the website assets. Attach the EBS snapshot as a secondary EBS volume when a new EC2 instance is launched. Configure the website hosting application to reference the website assets that are stored in the secondary EBS volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 169

A large company wants to provide its globally located developers separate, limited size, managed PostgreSQL databases for development purposes. The databases will be low volume. The developers need the databases only when they are actively working.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Give the developers the ability to launch separate Amazon Aurora instances. Set up a process to shut down Aurora instances at the end of the workday and to start Aurora instances at the beginning of the next workday.
- **B.** Monitor AWS Trusted Advisor checks for idle Amazon RDS databases. Create a process to terminate identified idle RDS databases.
- **C.** Develop an AWS Service Catalog product that enforces size restrictions for launching Amazon Aurora instances. Give the developers access to launch the product when they need a development database.
- **D.** Create an Amazon Aurora Serverless cluster. Develop an AWS Service Catalog product to launch databases in the cluster with the default capacity settings. Grant the developers access to the product. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon Aurora Serverless cluster. Develop an AWS Service Catalog product to launch databases in the cluster with the default capacity settings. Grant the developers access to the product.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Aurora Serverless cluster. Develop an AWS Service Catalog product to launch databases in the cluster with the default capacity settings. Grant the developers access to the product. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Give the developers the ability to launch separate Amazon Aurora instances. Set up a process to shut down Aurora instances at the end of the workday and to start Aurora instances at the beginning of the next workday. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Monitor AWS Trusted Advisor checks for idle Amazon RDS databases. Create a process to terminate identified idle RDS databases. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Develop an AWS Service Catalog product that enforces size restrictions for launching Amazon Aurora instances. Give the developers access to launch the product when they need a development database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 170

A company wants to build a map of its IT infrastructure to identify and enforce policies on resources that pose security risks. The company's security team must be able to query data in the IT infrastructure map and quickly identify security risks.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use Amazon Neptune to store the data. Use SPARQL to query the data to identify security risks. ✅
- **B.** Use Amazon RDS to store the data. Use SQL to query the data to identify security risks.
- **C.** Use Amazon DynamoDB to store the data. Use PartiQL to query the data to identify security risks.
- **D.** Use Amazon Redshift to store the data. Use SQL to query the data to identify security risks.

**Answer:** A

**Explanation:**

Correct Answer:Use Amazon Neptune to store the data. Use SPARQL to query the data to identify security risks.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Neptune to store the data. Use SPARQL to query the data to identify security risks. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon RDS to store the data. Use SQL to query the data to identify security risks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon DynamoDB to store the data. Use PartiQL to query the data to identify security risks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Redshift to store the data. Use SQL to query the data to identify security risks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 171

A large international university has deployed all of its compute services in the AWS Cloud. These services include Amazon EC2, Amazon RDS, and Amazon DynamoDB. The university currently relies on many custom scripts to back up its infrastructure. However, the university wants to centralize management and automate data backups as much as possible by using AWS native options.
Which solution will meet these requirements?

- **A.** Use AWS Systems Manager State Manager to manage the configuration and monitoring of backup tasks.
- **B.** Use AWS Backup to configure and monitor all backups for the services in use. ✅
- **C.** Use AWS Config to set lifecycle management to take snapshots of all data sources on a schedule.
- **D.** Use third-party backup software with an AWS Storage Gateway tape gateway virtual tape library.

**Answer:** B

**Explanation:**

Correct Answer:Use AWS Backup to configure and monitor all backups for the services in use.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Backup to configure and monitor all backups for the services in use. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Systems Manager State Manager to manage the configuration and monitoring of backup tasks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Config to set lifecycle management to take snapshots of all data sources on a schedule. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use third-party backup software with an AWS Storage Gateway tape gateway virtual tape library. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 172

A company runs its application on Oracle Database Enterprise Edition. The company needs to migrate the application and the database to AWS. The company can use the Bring Your Own License (BYOL) model while migrating to AWS. The application uses third-party database features that require privileged access.
A solutions architect must design a solution for the database migration.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Migrate the database to Amazon RDS for PostgreSQL by using AWS Database Migration Service (AWS DMS). Rewrite the application code to remove the dependency on third-party features.
- **B.** Migrate the database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). Customize the new database settings to support the third-party features.
- **C.** Migrate the database to Amazon RDS Custom for Oracle by using native tools. Customize the new database settings to support the third-party features. ✅
- **D.** Migrate the database to Amazon RDS for Oracle by using native tools. Replace the third-party features with AWS Lambda.

**Answer:** C

**Explanation:**

Correct Answer:Migrate the database to Amazon RDS Custom for Oracle by using native tools. Customize the new database settings to support the third-party features.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the database to Amazon RDS Custom for Oracle by using native tools. Customize the new database settings to support the third-party features. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the database to Amazon RDS for PostgreSQL by using AWS Database Migration Service (AWS DMS). Rewrite the application code to remove the dependency on third-party features. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). Customize the new database settings to support the third-party features. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon RDS for Oracle by using native tools. Replace the third-party features with AWS Lambda. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 173

A company uses Amazon RDS for PostgreSQL databases for its data tier. The company must implement password rotation for the databases.
Which solution meets this requirement with the LEAST operational overhead?

- **A.** Store the password in AWS Key Management Service (AWS KMS). Enable automatic rotation on the AWS KMS key.
- **B.** Store the password in AWS Systems Manager Parameter Store. Write an AWS Lambda function that rotates the password.
- **C.** Store the password in AWS Systems Manager Parameter Store. Enable automatic rotation on the parameter.
- **D.** Store the password in AWS Secrets Manager. Enable automatic rotation on the secret. ✅

**Answer:** D

**Explanation:**

Correct Answer:Store the password in AWS Secrets Manager. Enable automatic rotation on the secret.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the password in AWS Secrets Manager. Enable automatic rotation on the secret. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the password in AWS Key Management Service (AWS KMS). Enable automatic rotation on the AWS KMS key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the password in AWS Systems Manager Parameter Store. Write an AWS Lambda function that rotates the password. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the password in AWS Systems Manager Parameter Store. Enable automatic rotation on the parameter. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 174

A company’s application is running on Amazon EC2 instances within an Auto Scaling group behind an Elastic Load Balancing (ELB) load balancer. Based on the application's history, the company anticipates a spike in traffic during a holiday each year. A solutions architect must design a strategy to ensure that the Auto Scaling group proactively increases capacity to minimize any performance impact on application users.
Which solution will meet these requirements?

- **A.** Configure an Amazon Simple Notification Service (Amazon SNS) notification to send alerts when there are autoscaling:EC2_INSTANCE_LAUNCH events.
- **B.** Increase the minimum and maximum number of EC2 instances in the Auto Scaling group during the peak demand period.
- **C.** Create a recurring scheduled action to scale up the Auto Scaling group before the expected period of peak demand. ✅
- **D.** Create an Amazon CloudWatch alarm to scale up the EC2 instances when CPU utilization exceeds 90%.

**Answer:** C

**Explanation:**

Correct Answer:Create a recurring scheduled action to scale up the Auto Scaling group before the expected period of peak demand.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a recurring scheduled action to scale up the Auto Scaling group before the expected period of peak demand. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Amazon Simple Notification Service (Amazon SNS) notification to send alerts when there are autoscaling:EC2_INSTANCE_LAUNCH events. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Increase the minimum and maximum number of EC2 instances in the Auto Scaling group during the peak demand period. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudWatch alarm to scale up the EC2 instances when CPU utilization exceeds 90%. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 175

A company has 15 employees. The company stores employee start dates in an Amazon DynamoDB table. The company wants to send an email message to each employee on the day of the employee's work anniversary.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Create a script that scans the DynamoDB table and uses Amazon Simple Notification Service (Amazon SNS) to send email messages to employees when necessary. Use a cron job to run this script every day on an Amazon EC2 instance.
- **B.** Create an AWS Lambda function that scans the DynamoDB table and uses Amazon Simple Queue Service (Amazon SQS) to send email messages to employees when necessary. Schedule this Lambda function to run every day.
- **C.** Create a script that scans the DynamoDB table and uses Amazon Simple Queue Service (Amazon SQS) to send email messages to employees when necessary. Use a cron job to run this script every day on an Amazon EC2 instance.
- **D.** Create an AWS Lambda function that scans the DynamoDB table and uses Amazon Simple Notification Service (Amazon SNS) to send email messages to employees when necessary. Schedule this Lambda function to run every day. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an AWS Lambda function that scans the DynamoDB table and uses Amazon Simple Notification Service (Amazon SNS) to send email messages to employees when necessary. Schedule this Lambda function to run every day.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Lambda function that scans the DynamoDB table and uses Amazon Simple Notification Service (Amazon SNS) to send email messages to employees when necessary. Schedule this Lambda function to run every day. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a script that scans the DynamoDB table and uses Amazon Simple Notification Service (Amazon SNS) to send email messages to employees when necessary. Use a cron job to run this script every day on an Amazon EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function that scans the DynamoDB table and uses Amazon Simple Queue Service (Amazon SQS) to send email messages to employees when necessary. Schedule this Lambda function to run every day. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a script that scans the DynamoDB table and uses Amazon Simple Queue Service (Amazon SQS) to send email messages to employees when necessary. Use a cron job to run this script every day on an Amazon EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 176

A company has an on-premises business application that generates hundreds of files each day. These files are stored on an SMB file share and require a low-latency connection to the application servers. A new company policy states all application-generated files must be copied to AWS. There is already a VPN connection to AWS.
The application development team does not have time to make the necessary code modifications to move the application to AWS.
Which service should a solutions architect recommend to allow the application to copy files to AWS?

- **A.** Amazon Elastic File System (Amazon EFS)
- **B.** Amazon FSx for Windows File Server
- **C.** AWS Snowball
- **D.** AWS Storage Gateway ✅

**Answer:** D

**Explanation:**

Correct Answer:AWS Storage Gateway

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- AWS Storage Gateway - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Amazon Elastic File System (Amazon EFS) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon FSx for Windows File Server - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- AWS Snowball - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 177

An ecommerce company is migrating its on-premises workload to the AWS Cloud. The workload currently consists of a web application and a backend Microsoft SQL database for storage.
The company expects a high volume of customers during a promotional event. The new infrastructure in the AWS Cloud must be highly available and scalable.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Migrate the web application to two Amazon EC2 instances across two Availability Zones behind an Application Load Balancer. Migrate the database to Amazon RDS for Microsoft SQL Server with read replicas in both Availability Zones.
- **B.** Migrate the web application to Amazon EC2 instances that run in an Auto Scaling group across two Availability Zones behind an Application Load Balancer. Migrate the database to Amazon RDS with Multi-AZ deployment. ✅
- **C.** Migrate the web application to three Amazon EC2 instances across three Availability Zones behind an Application Load Balancer. Migrate the database to three EC2 instances across three Availability Zones.
- **D.** Migrate the web application to an Amazon EC2 instance that runs in an Auto Scaling group across two Availability Zones behind an Application Load Balancer. Migrate the database to two EC2 instances across separate AWS Regions with database replication.

**Answer:** B

**Explanation:**

Correct Answer:Migrate the web application to Amazon EC2 instances that run in an Auto Scaling group across two Availability Zones behind an Application Load Balancer. Migrate the database to Amazon RDS with Multi-AZ deployment.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the web application to Amazon EC2 instances that run in an Auto Scaling group across two Availability Zones behind an Application Load Balancer. Migrate the database to Amazon RDS with Multi-AZ deployment. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the web application to two Amazon EC2 instances across two Availability Zones behind an Application Load Balancer. Migrate the database to Amazon RDS for Microsoft SQL Server with read replicas in both Availability Zones. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the web application to three Amazon EC2 instances across three Availability Zones behind an Application Load Balancer. Migrate the database to three EC2 instances across three Availability Zones. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the web application to an Amazon EC2 instance that runs in an Auto Scaling group across two Availability Zones behind an Application Load Balancer. Migrate the database to two EC2 instances across separate AWS Regions with database replication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 178

A company runs an application on several Amazon EC2 instances that store persistent data on an Amazon Elastic File System (Amazon EFS) file system. The company needs to replicate the data to another AWS Region by using an AWS managed service solution.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use the EFS-to-EFS backup solution to replicate the data to an EFS file system in another Region.
- **B.** Run a nightly script to copy data from the EFS file system to an Amazon S3 bucket. Enable S3 Cross-Region Replication on the S3 bucket.
- **C.** Create a VPC in another Region. Establish a cross-Region VPC peer. Run a nightly rsync to copy data from the original Region to the new Region.
- **D.** Use AWS Backup to create a backup plan with a rule that takes a daily backup and replicates it to another Region. Assign the EFS file system resource to the backup plan. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS Backup to create a backup plan with a rule that takes a daily backup and replicates it to another Region. Assign the EFS file system resource to the backup plan.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Backup to create a backup plan with a rule that takes a daily backup and replicates it to another Region. Assign the EFS file system resource to the backup plan. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the EFS-to-EFS backup solution to replicate the data to an EFS file system in another Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Run a nightly script to copy data from the EFS file system to an Amazon S3 bucket. Enable S3 Cross-Region Replication on the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPC in another Region. Establish a cross-Region VPC peer. Run a nightly rsync to copy data from the original Region to the new Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 179

A solutions architect needs to review a company's Amazon S3 buckets to discover personally identifiable information (PII). The company stores the PII data in the us-east-1 Region and us-west-2 Region.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Configure Amazon Macie in each Region. Create a job to analyze the data that is in Amazon S3. ✅
- **B.** Configure AWS Security Hub for all Regions. Create an AWS Config rule to analyze the data that is in Amazon S3.
- **C.** Configure Amazon GuardDuty to analyze the data that is in Amazon S3.
- **D.** Configure Amazon Inspector to analyze the data that is in Amazon S3.

**Answer:** A

**Explanation:**

Correct Answer:Configure Amazon Macie in each Region. Create a job to analyze the data that is in Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Macie in each Region. Create a job to analyze the data that is in Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS Security Hub for all Regions. Create an AWS Config rule to analyze the data that is in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon GuardDuty to analyze the data that is in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Inspector to analyze the data that is in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 180

A news company that has reporters all over the world is hosting its broadcast system on AWS. The reporters send live broadcasts to the broadcast system. The reporters use software on their phones to send live streams through the Real Time Messaging Protocol (RTMP).
A solutions architect must design a solution that gives the reporters the ability to send the highest quality streams. The solution must provide accelerated TCP connections back to the broadcast system.
What should the solutions architect use to meet these requirements?

- **A.** Amazon CloudFront
- **B.** AWS Global Accelerator ✅
- **C.** AWS Client VPN
- **D.** Amazon EC2 instances and AWS Elastic IP addresses

**Answer:** B

**Explanation:**

Correct Answer:AWS Global Accelerator

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- AWS Global Accelerator - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Amazon CloudFront - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- AWS Client VPN - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon EC2 instances and AWS Elastic IP addresses - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 181

A company runs an AWS Lambda function in private subnets in a VPC. The subnets have a default route to the internet through an Amazon EC2 NAT instance. The Lambda function processes input data and saves its output as an object to Amazon S3.
Intermittently, the Lambda function times out while trying to upload the object because of saturated traffic on the NAT instance's network. The company wants to access Amazon S3 without traversing the internet.
Which solution will meet these requirements?

- **A.** Replace the EC2 NAT instance with an AWS managed NAT gateway.
- **B.** Increase the size of the EC2 NAT instance in the VPC to a network optimized instance type.
- **C.** Provision a transit gateway. Place transit gateway attachments in the private subnets where the Lambda function is running.
- **D.** Provision a gateway endpoint for Amazon S3 in the VPC. Update the route tables of the subnets accordingly. ✅

**Answer:** D

**Explanation:**

Correct Answer:Provision a gateway endpoint for Amazon S3 in the VPC. Update the route tables of the subnets accordingly.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision a gateway endpoint for Amazon S3 in the VPC. Update the route tables of the subnets accordingly. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Replace the EC2 NAT instance with an AWS managed NAT gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Increase the size of the EC2 NAT instance in the VPC to a network optimized instance type. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision a transit gateway. Place transit gateway attachments in the private subnets where the Lambda function is running. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 182

A company is running a highly sensitive application on Amazon EC2 backed by an Amazon RDS database. Compliance regulations mandate that all personally identifiable information (PII) be encrypted at rest.
Which solution should a solutions architect recommend to meet this requirement with the LEAST amount of changes to the infrastructure?

- **A.** Configure SSL encryption using AWS Key Management Service (AWS KMS) keys to encrypt database volumes.
- **B.** Configure Amazon Elastic Block Store (Amazon EBS) encryption and Amazon RDS encryption with AWS Key Management Service (AWS KMS) keys to encrypt instance and database volumes. ✅
- **C.** Deploy AWS CloudHSM, generate encryption keys, and use the keys to encrypt database volumes.
- **D.** Deploy AWS Certificate Manager to generate certificates. Use the certificates to encrypt the database volume.

**Answer:** B

**Explanation:**

Correct Answer:Configure Amazon Elastic Block Store (Amazon EBS) encryption and Amazon RDS encryption with AWS Key Management Service (AWS KMS) keys to encrypt instance and database volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Elastic Block Store (Amazon EBS) encryption and Amazon RDS encryption with AWS Key Management Service (AWS KMS) keys to encrypt instance and database volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure SSL encryption using AWS Key Management Service (AWS KMS) keys to encrypt database volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy AWS CloudHSM, generate encryption keys, and use the keys to encrypt database volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy AWS Certificate Manager to generate certificates. Use the certificates to encrypt the database volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 183

A company runs its applications on Amazon EC2 instances that are backed by Amazon Elastic Block Store (Amazon EBS). The EC2 instances run the most recent Amazon Linux release. The applications are experiencing availability issues when the company's employees store and retrieve files that are 25 GB or larger. The company needs a solution that does not require the company to transfer files between EC2 instances. The files must be available across many EC2 instances and across multiple Availability Zones.
Which solution will meet these requirements?

- **A.** Create an Amazon Machine Image (AMI) from the EC2 instances. Configure new EC2 instances from the AMI that use an instance store volume. Instruct the employees to access the files from the EC2 instances.
- **B.** Mount an Amazon Elastic File System (Amazon EFS) file system across all the EC2 instances. Instruct the employees to access the files from the EC2 instances. ✅
- **C.** Migrate all the files to an Amazon S3 bucket. Instruct the employees to access the files from the S3 bucket.
- **D.** Take a snapshot of the existing EBS volume. Mount the snapshot as an EBS volume across the EC2 instances. Instruct the employees to access the files from the EC2 instances.

**Answer:** B

**Explanation:**

Correct Answer:Mount an Amazon Elastic File System (Amazon EFS) file system across all the EC2 instances. Instruct the employees to access the files from the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Mount an Amazon Elastic File System (Amazon EFS) file system across all the EC2 instances. Instruct the employees to access the files from the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Machine Image (AMI) from the EC2 instances. Configure new EC2 instances from the AMI that use an instance store volume. Instruct the employees to access the files from the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate all the files to an Amazon S3 bucket. Instruct the employees to access the files from the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Take a snapshot of the existing EBS volume. Mount the snapshot as an EBS volume across the EC2 instances. Instruct the employees to access the files from the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 184

A company serves its website by using an Auto Scaling group of Amazon EC2 instances in a single AWS Region. The website does not require a database.
The company is expanding, and the company's engineering team deploys the website to a second Region. The company wants to distribute traffic across both Regions to accommodate growth and for disaster recovery purposes. The solution should not serve traffic from a Region in which the website is unhealthy.
Which policy or resource should the company use to meet these requirements?

- **A.** An Application Load Balancer in one Region with a target group that specifies the IP addresses of the EC2 instances from both Regions
- **B.** An Application Load Balancer in one Region with a target group that specifies the EC2 instance IDs from both Regions
- **C.** An Amazon Route 53 multivalue answer routing policy ✅
- **D.** An Amazon Route 53 simple routing policy

**Answer:** C

**Explanation:**

Correct Answer:An Amazon Route 53 multivalue answer routing policy

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- An Amazon Route 53 multivalue answer routing policy - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- An Application Load Balancer in one Region with a target group that specifies the IP addresses of the EC2 instances from both Regions - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- An Application Load Balancer in one Region with a target group that specifies the EC2 instance IDs from both Regions - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- An Amazon Route 53 simple routing policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 185

A company needs to connect several VPCs in the us-east-1 Region that span hundreds of AWS accounts. The company's networking team has its own AWS account to manage the cloud network.
What is the MOST operationally efficient solution to connect the VPCs?

- **A.** Configure a NAT gateway and an internet gateway in each VPC to connect each VPC through the internet
- **B.** Create an AWS Transit Gateway in the networking team's AWS account. Configure static routes from each VPC. ✅
- **C.** Set up VPC peering connections between each VPC. Update each associated subnet's route table
- **D.** Deploy VPN gateways in each VPC. Create a transit VPC in the networking team's AWS account to connect to each VPC.

**Answer:** B

**Explanation:**

Correct Answer:Create an AWS Transit Gateway in the networking team's AWS account. Configure static routes from each VPC.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Transit Gateway in the networking team's AWS account. Configure static routes from each VPC. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure a NAT gateway and an internet gateway in each VPC to connect each VPC through the internet - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up VPC peering connections between each VPC. Update each associated subnet's route table - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy VPN gateways in each VPC. Create a transit VPC in the networking team's AWS account to connect to each VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 186

A company is migrating a three-tier application to AWS. The application requires a MySQL database. In the past, the application users reported poor application performance when creating new entries. These performance issues were caused by users generating different real-time reports from the application during working hours.
Which solution will improve the performance of the application when it is moved to AWS?

- **A.** Import the data into an Amazon DynamoDB table with provisioned capacity. Refactor the application to use DynamoDB for reports.
- **B.** Create an Amazon Aurora MySQL Multi-AZ DB cluster. Configure the application to use the backup instance of the cluster as an endpoint for the reports.
- **C.** Create the database on a compute optimized Amazon EC2 instance. Ensure compute resources exceed the on-premises database.
- **D.** Create an Amazon Aurora MySQL Multi-AZ DB cluster with multiple read replicas. Configure the application to use the reader endpoint for reports. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon Aurora MySQL Multi-AZ DB cluster with multiple read replicas. Configure the application to use the reader endpoint for reports.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Aurora MySQL Multi-AZ DB cluster with multiple read replicas. Configure the application to use the reader endpoint for reports. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Import the data into an Amazon DynamoDB table with provisioned capacity. Refactor the application to use DynamoDB for reports. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Aurora MySQL Multi-AZ DB cluster. Configure the application to use the backup instance of the cluster as an endpoint for the reports. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create the database on a compute optimized Amazon EC2 instance. Ensure compute resources exceed the on-premises database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 187

A company needs to transfer 600 TB of data from its on-premises network-attached storage (NAS) system to the AWS Cloud. The data transfer must be complete within 2 weeks. The data is sensitive and must be encrypted in transit. The company’s internet connection can support an upload speed of 100 Mbps.
Which solution meets these requirements MOST cost-effectively?

- **A.** Use Amazon S3 multi-part upload functionality to transfer the files over HTTPS.
- **B.** Create a VPN connection between the on-premises NAS system and the nearest AWS Region. Transfer the data over the VPN connection.
- **C.** Use the AWS Snow Family console to order several AWS Snowball Edge Storage Optimized devices. Use the devices to transfer the data to Amazon S3. ✅
- **D.** Set up a 10 Gbps AWS Direct Connect connection between the company location and the nearest AWS Region. Transfer the data over a VPN connection into the Region to store the data in Amazon S3.

**Answer:** C

**Explanation:**

Correct Answer:Use the AWS Snow Family console to order several AWS Snowball Edge Storage Optimized devices. Use the devices to transfer the data to Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use the AWS Snow Family console to order several AWS Snowball Edge Storage Optimized devices. Use the devices to transfer the data to Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon S3 multi-part upload functionality to transfer the files over HTTPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPN connection between the on-premises NAS system and the nearest AWS Region. Transfer the data over the VPN connection. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up a 10 Gbps AWS Direct Connect connection between the company location and the nearest AWS Region. Transfer the data over a VPN connection into the Region to store the data in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 188

A company has an on-premises SFTP file transfer solution. The company is migrating to the AWS Cloud to scale the file transfer solution and to optimize costs by using Amazon S3. The company's employees will use their credentials for the on-premises Microsoft Active Directory (AD) to access the new solution. The company wants to keep the current authentication and file access mechanisms.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an AWS Transfer Family SFTP endpoint. Configure the endpoint to use the AWS Directory Service option as the identity provider to connect to the existing Active Directory.
- **B.** Configure an S3 File Gateway. Create SMB file shares on the file gateway that use the existing Active Directory to authenticate.
- **C.** Configure an Auto Scaling group with Amazon EC2 instances to run an SFTP solution. Configure the group to scale up at 60% CPU utilization.
- **D.** Create an AWS Transfer Family server with SFTP endpoints. Choose the AWS Directory Service option as the identity provider. Use AD Connector to connect the on-premises Active Directory. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an AWS Transfer Family server with SFTP endpoints. Choose the AWS Directory Service option as the identity provider. Use AD Connector to connect the on-premises Active Directory.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Transfer Family server with SFTP endpoints. Choose the AWS Directory Service option as the identity provider. Use AD Connector to connect the on-premises Active Directory. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Transfer Family SFTP endpoint. Configure the endpoint to use the AWS Directory Service option as the identity provider to connect to the existing Active Directory. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an S3 File Gateway. Create SMB file shares on the file gateway that use the existing Active Directory to authenticate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Auto Scaling group with Amazon EC2 instances to run an SFTP solution. Configure the group to scale up at 60% CPU utilization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 189

A company needs a secure connection between its on-premises environment and AWS. This connection does not need high bandwidth and will handle a small amount of traffic. The connection should be set up quickly.
What is the MOST cost-effective method to establish this type of connection?

- **A.** Implement a client VPN.
- **B.** Implement AWS Direct Connect.
- **C.** Implement a bastion host on Amazon EC2.
- **D.** Implement an AWS Site-to-Site VPN connection. ✅

**Answer:** D

**Explanation:**

Correct Answer:Implement an AWS Site-to-Site VPN connection.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Implement an AWS Site-to-Site VPN connection. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Implement a client VPN. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement AWS Direct Connect. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement a bastion host on Amazon EC2. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 190

A company has 5 TB of datasets. The datasets consist of 1 million user profiles and 10 million connections. The user profiles have connections as many-to-many relationships. The company needs a performance efficient way to find mutual connections up to five levels.
Which solution will meet these requirements?

- **A.** Use an Amazon S3 bucket to store the datasets. Use Amazon Athena to perform SQL JOIN queries to find connections.
- **B.** Use Amazon Neptune to store the datasets with edges and vertices. Query the data to find connections. ✅
- **C.** Use Amazon RDS to store the datasets with multiple tables. Perform SQL JOIN queries to find connections.
- **D.** Use an Amazon S3 bucket to store the datasets. Use Amazon QuickSight to visualize connections.

**Answer:** B

**Explanation:**

Correct Answer:Use Amazon Neptune to store the datasets with edges and vertices. Query the data to find connections.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Neptune to store the datasets with edges and vertices. Query the data to find connections. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an Amazon S3 bucket to store the datasets. Use Amazon Athena to perform SQL JOIN queries to find connections. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon RDS to store the datasets with multiple tables. Perform SQL JOIN queries to find connections. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an Amazon S3 bucket to store the datasets. Use Amazon QuickSight to visualize connections. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 191

A company uses an Amazon S3 bucket as its data lake storage platform. The S3 bucket contains a massive amount of data that is accessed randomly by multiple teams and hundreds of applications. The company wants to reduce the S3 storage costs and provide immediate availability for frequently accessed objects.
What is the MOST operationally efficient solution that meets these requirements?

- **A.** Store objects in Amazon S3 Glacier. Use S3 Select to provide applications with access to the data.
- **B.** Transition objects to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class. Create an AWS Lambda function to transition objects to the S3 Standard storage class when they are accessed by an application.
- **C.** Create an S3 Lifecycle rule to transition objects to the S3 Intelligent-Tiering storage class. ✅
- **D.** Use data from S3 storage class analysis to create S3 Lifecycle rules to automatically transition objects to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class.

**Answer:** C

**Explanation:**

Correct Answer:Create an S3 Lifecycle rule to transition objects to the S3 Intelligent-Tiering storage class.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an S3 Lifecycle rule to transition objects to the S3 Intelligent-Tiering storage class. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store objects in Amazon S3 Glacier. Use S3 Select to provide applications with access to the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Transition objects to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class. Create an AWS Lambda function to transition objects to the S3 Standard storage class when they are accessed by an application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use data from S3 storage class analysis to create S3 Lifecycle rules to automatically transition objects to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 192

A company runs a Java-based job on an Amazon EC2 instance. The job runs every hour and takes 10 seconds to run. The job runs on a scheduled interval and consumes 1 GB of memory. The CPU utilization of the instance is low except for short surges during which the job uses the maximum CPU available. The company wants to optimize the costs to run the job.
Which solution will meet these requirements?

- **A.** Configure the existing schedule to stop the EC2 instance at the completion of the job and restart the EC2 instance when the next job starts.
- **B.** Use AWS App2Container (A2C) to containerize the job. Install the container in the existing Amazon Machine Image (AMI). Ensure that the schedule stops the container when the task finishes.
- **C.** Copy the code into an AWS Lambda function that has 1 GB of memory. Create an Amazon EventBridge scheduled rule to run the code each hour. ✅
- **D.** Use AWS App2Container (A2C) to containerize the job. Run the job as an Amazon Elastic Container Service (Amazon ECS) task on AWS Fargate with 0.5 virtual CPU (vCPU) and 1 GB of memory.

**Answer:** C

**Explanation:**

Correct Answer:Copy the code into an AWS Lambda function that has 1 GB of memory. Create an Amazon EventBridge scheduled rule to run the code each hour.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Copy the code into an AWS Lambda function that has 1 GB of memory. Create an Amazon EventBridge scheduled rule to run the code each hour. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the existing schedule to stop the EC2 instance at the completion of the job and restart the EC2 instance when the next job starts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS App2Container (A2C) to containerize the job. Install the container in the existing Amazon Machine Image (AMI). Ensure that the schedule stops the container when the task finishes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS App2Container (A2C) to containerize the job. Run the job as an Amazon Elastic Container Service (Amazon ECS) task on AWS Fargate with 0.5 virtual CPU (vCPU) and 1 GB of memory. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 193

A company is planning to deploy its application on an Amazon Aurora PostgreSQL Serverless v2 cluster. The application will receive large amounts of traffic. The company wants to optimize the storage performance of the cluster as the load on the application increases.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure the cluster to use the Aurora Standard storage configuration.
- **B.** Configure the cluster storage type as Provisioned IOPS.
- **C.** Configure the cluster storage type as General Purpose.
- **D.** Configure the cluster to use the Aurora I/O-Optimized storage configuration. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure the cluster to use the Aurora I/O-Optimized storage configuration.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the cluster to use the Aurora I/O-Optimized storage configuration. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the cluster to use the Aurora Standard storage configuration. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the cluster storage type as Provisioned IOPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the cluster storage type as General Purpose. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 194

A company is migrating applications from an on-premises Microsoft Active Directory that the company manages to AWS. The company deploys the applications in multiple AWS accounts. The company uses AWS Organizations to manage the accounts centrally.
The company's security team needs a single sign-on solution across all the company's AWS accounts. The company must continue to manage users and groups that are in the on-premises Active Directory.
Which solution will meet these requirements?

- **A.** Deploy an identity provider (IdP) on Amazon EC2. Link the IdP as an identity source within AWS IAM Identity Center.
- **B.** Use AWS Directory Service and create a two-way trust relationship with the company's self-managed Active Directory.
- **C.** Enable AWS IAM Identity Center. Configure a two-way forest trust relationship to connect the company's self-managed Active Directory with IAM Identity Center by using AWS Directory Service for Microsoft Active Directory. ✅
- **D.** Create an Enterprise Edition Active Directory in AWS Directory Service for Microsoft Active Directory. Configure the Active Directory to be the identity source for AWS IAM Identity Center.

**Answer:** C

**Explanation:**

Correct Answer:Enable AWS IAM Identity Center. Configure a two-way forest trust relationship to connect the company's self-managed Active Directory with IAM Identity Center by using AWS Directory Service for Microsoft Active Directory.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable AWS IAM Identity Center. Configure a two-way forest trust relationship to connect the company's self-managed Active Directory with IAM Identity Center by using AWS Directory Service for Microsoft Active Directory. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an identity provider (IdP) on Amazon EC2. Link the IdP as an identity source within AWS IAM Identity Center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Directory Service and create a two-way trust relationship with the company's self-managed Active Directory. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Enterprise Edition Active Directory in AWS Directory Service for Microsoft Active Directory. Configure the Active Directory to be the identity source for AWS IAM Identity Center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 195

A company is planning to migrate data to an Amazon S3 bucket. The data must be encrypted at rest within the S3 bucket. The encryption key must be rotated automatically every year.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Migrate the data to the S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3). Use the built-in key rotation behavior of SSE-S3 encryption keys.
- **B.** Create an AWS Key Management Service (AWS KMS) customer managed key. Enable automatic key rotation. Set the S3 bucket's default encryption behavior to use the customer managed KMS key. Migrate the data to the S3 bucket. ✅
- **C.** Create an AWS Key Management Service (AWS KMS) customer managed key. Set the S3 bucket's default encryption behavior to use the customer managed KMS key. Migrate the data to the S3 bucket. Manually rotate the KMS key every year.
- **D.** Use customer key material to encrypt the data. Migrate the data to the S3 bucket. Create an AWS Key Management Service (AWS KMS) key without key material. Import the customer key material into the KMS key. Enable automatic key rotation.

**Answer:** B

**Explanation:**

Correct Answer:Create an AWS Key Management Service (AWS KMS) customer managed key. Enable automatic key rotation. Set the S3 bucket's default encryption behavior to use the customer managed KMS key. Migrate the data to the S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Key Management Service (AWS KMS) customer managed key. Enable automatic key rotation. Set the S3 bucket's default encryption behavior to use the customer managed KMS key. Migrate the data to the S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the data to the S3 bucket. Use server-side encryption with Amazon S3 managed keys (SSE-S3). Use the built-in key rotation behavior of SSE-S3 encryption keys. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Key Management Service (AWS KMS) customer managed key. Set the S3 bucket's default encryption behavior to use the customer managed KMS key. Migrate the data to the S3 bucket. Manually rotate the KMS key every year. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use customer key material to encrypt the data. Migrate the data to the S3 bucket. Create an AWS Key Management Service (AWS KMS) key without key material. Import the customer key material into the KMS key. Enable automatic key rotation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 196

A company has an application that runs on a single Amazon EC2 instance. The application uses a MySQL database that runs on the same EC2 instance. The company needs a highly available and automatically scalable solution to handle increased traffic.
Which solution will meet these requirements?

- **A.** Deploy the application to EC2 instances that run in an Auto Scaling group behind an Application Load Balancer. Create an Amazon Redshift cluster that has multiple MySQL-compatible nodes.
- **B.** Deploy the application to EC2 instances that are configured as a target group behind an Application Load Balancer. Create an Amazon RDS for MySQL cluster that has multiple instances.
- **C.** Deploy the application to EC2 instances that run in an Auto Scaling group behind an Application Load Balancer. Create an Amazon Aurora Serverless MySQL cluster for the database layer. ✅
- **D.** Deploy the application to EC2 instances that are configured as a target group behind an Application Load Balancer. Create an Amazon ElastiCache for Redis cluster that uses the MySQL connector.

**Answer:** C

**Explanation:**

Correct Answer:Deploy the application to EC2 instances that run in an Auto Scaling group behind an Application Load Balancer. Create an Amazon Aurora Serverless MySQL cluster for the database layer.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy the application to EC2 instances that run in an Auto Scaling group behind an Application Load Balancer. Create an Amazon Aurora Serverless MySQL cluster for the database layer. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy the application to EC2 instances that run in an Auto Scaling group behind an Application Load Balancer. Create an Amazon Redshift cluster that has multiple MySQL-compatible nodes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the application to EC2 instances that are configured as a target group behind an Application Load Balancer. Create an Amazon RDS for MySQL cluster that has multiple instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the application to EC2 instances that are configured as a target group behind an Application Load Balancer. Create an Amazon ElastiCache for Redis cluster that uses the MySQL connector. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 197

A robotics company is designing a solution for medical surgery. The robots will use advanced sensors, cameras, and AI algorithms to perceive their environment and to complete surgeries.
The company needs a public load balancer in the AWS Cloud that will ensure seamless communication with backend services. The load balancer must be capable of routing traffic based on the query strings to different target groups. The traffic must also be encrypted.
Which solution will meet these requirements?

- **A.** Use an Application Load Balancer with a certificate attached from AWS Certificate Manager (ACM). Use query parameter-based routing. ✅
- **B.** Use a Network Load Balancer with a certificate attached from AWS Certificate Manager (ACM). Use query parameter-based routing.
- **C.** Use a Gateway Load Balancer. Import a generated certificate in AWS Identity and Access Management (IAM). Attach the certificate to the load balancer. Use HTTP path-based routing.
- **D.** Use a Network Load Balancer. Import a generated certificate in AWS Identity and Access Management (IAM). Attach the certificate to the load balancer. Use query parameter-based routing.

**Answer:** A

**Explanation:**

Correct Answer:Use an Application Load Balancer with a certificate attached from AWS Certificate Manager (ACM). Use query parameter-based routing.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an Application Load Balancer with a certificate attached from AWS Certificate Manager (ACM). Use query parameter-based routing. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use a Network Load Balancer with a certificate attached from AWS Certificate Manager (ACM). Use query parameter-based routing. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a Gateway Load Balancer. Import a generated certificate in AWS Identity and Access Management (IAM). Attach the certificate to the load balancer. Use HTTP path-based routing. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a Network Load Balancer. Import a generated certificate in AWS Identity and Access Management (IAM). Attach the certificate to the load balancer. Use query parameter-based routing. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 198

A consulting company provides professional services to customers worldwide. The company provides solutions and tools for customers to expedite gathering and analyzing data on AWS. The company needs to centrally manage and deploy a common set of solutions and tools for customers to use for self-service purposes.
Which solution will meet these requirements?

- **A.** Create AWS Config items for the customers.
- **B.** Create AWS Systems Manager templates for the customers.
- **C.** Create AWS Service Catalog products for the customers. ✅
- **D.** Create AWS CloudFormation templates for the customers.

**Answer:** C

**Explanation:**

Correct Answer:Create AWS Service Catalog products for the customers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create AWS Service Catalog products for the customers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create AWS Config items for the customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create AWS Systems Manager templates for the customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create AWS CloudFormation templates for the customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 199

A company uses Salesforce. The company needs to load existing data and ongoing data changes from Salesforce to Amazon Redshift for analysis. The company does not want the data to travel over the public internet.
Which solution will meet these requirements with the LEAST development effort?

- **A.** Establish a VPN connection from the VPC to Salesforce. Use AWS Glue DataBrew to transfer data.
- **B.** Establish an AWS Direct Connect connection from the VPC to Salesforce. Use AWS Glue DataBrew to transfer data.
- **C.** Create a VPC peering connection to Salesforce. Use Amazon AppFlow to transfer data.
- **D.** Create an AWS PrivateLink connection in the VPC to Salesforce. Use Amazon AppFlow to transfer data. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an AWS PrivateLink connection in the VPC to Salesforce. Use Amazon AppFlow to transfer data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS PrivateLink connection in the VPC to Salesforce. Use Amazon AppFlow to transfer data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Establish a VPN connection from the VPC to Salesforce. Use AWS Glue DataBrew to transfer data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Establish an AWS Direct Connect connection from the VPC to Salesforce. Use AWS Glue DataBrew to transfer data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a VPC peering connection to Salesforce. Use Amazon AppFlow to transfer data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 200

A company is migrating a legacy application from an on-premises data center to AWS. The application relies on hundreds of cron jobs that run between 1 and 20 minutes on different recurring schedules throughout the day.
The company wants a solution to schedule and run the cron jobs on AWS with minimal refactoring. The solution must support running the cron jobs in response to an event in the future.
Which solution will meet these requirements?

- **A.** Create a container image for the cron jobs. Use Amazon EventBridge Scheduler to create a recurring schedule. Run the cron job tasks as AWS Lambda functions.
- **B.** Create a container image for the cron jobs. Create a workflow in AWS Step Functions that uses a Wait state to run the cron jobs at a specified time. Use the RunTask action to run the cron job tasks on AWS Fargate.
- **C.** Create a container image for the cron jobs. Use AWS Batch on Amazon Elastic Container Service (Amazon ECS) with a scheduling policy to run the cron jobs.
- **D.** Create a container image for the cron jobs. Use Amazon EventBridge Scheduler to create a recurring schedule. Run the cron job tasks on AWS ECS Fargate. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a container image for the cron jobs. Use Amazon EventBridge Scheduler to create a recurring schedule. Run the cron job tasks on AWS ECS Fargate.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a container image for the cron jobs. Use Amazon EventBridge Scheduler to create a recurring schedule. Run the cron job tasks on AWS ECS Fargate. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a container image for the cron jobs. Use Amazon EventBridge Scheduler to create a recurring schedule. Run the cron job tasks as AWS Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a container image for the cron jobs. Create a workflow in AWS Step Functions that uses a Wait state to run the cron jobs at a specified time. Use the RunTask action to run the cron job tasks on AWS Fargate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a container image for the cron jobs. Use AWS Batch on Amazon Elastic Container Service (Amazon ECS) with a scheduling policy to run the cron jobs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 201

A company’s application is receiving data from multiple data sources. The size of the data varies and is expected to increase over time. The current maximum size is 700 KB. The data volume and data size continue to grow as more data sources are added.
The company decides to use Amazon DynamoDB as the primary database for the application. A solutions architect needs to identify a solution that handles the large data sizes.
Which solution will meet these requirements in the MOST operationally efficient way?

- **A.** Create an AWS Lambda function that uses gzip compression to compress the large objects as they are written to a DynamoDB table.
- **B.** Split all incoming large data into a collection of items that have the same partition key. Write the data to a DynamoDB table in a single operation by using the BatchWriteItem API operation.
- **C.** Store the large data as objects in an Amazon S3 bucket. In a DynamoDB table, create an item that has an attribute that points to the S3 URL of the data. ✅
- **D.** Create an AWS Lambda function to filter the data that exceeds DynamoDB item size limits. Store the larger data in an Amazon DocumentDB (with MongoDB compatibility) database.

**Answer:** C

**Explanation:**

Correct Answer:Store the large data as objects in an Amazon S3 bucket. In a DynamoDB table, create an item that has an attribute that points to the S3 URL of the data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the large data as objects in an Amazon S3 bucket. In a DynamoDB table, create an item that has an attribute that points to the S3 URL of the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Lambda function that uses gzip compression to compress the large objects as they are written to a DynamoDB table. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Split all incoming large data into a collection of items that have the same partition key. Write the data to a DynamoDB table in a single operation by using the BatchWriteItem API operation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function to filter the data that exceeds DynamoDB item size limits. Store the larger data in an Amazon DocumentDB (with MongoDB compatibility) database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 202

A company's application runs on Amazon EC2 instances that are in multiple Availability Zones. The application needs to ingest real-time data from third-party applications.
The company needs a data ingestion solution that places the ingested raw data in an Amazon S3 bucket.
Which solution will meet these requirements?

- **A.** Create an AWS Direct Connect connection to the application for data ingestion. Create Amazon Kinesis Data Firehose delivery streams to consume direct PUT operations from the application. Specify the S3 bucket as the destination of the delivery streams.
- **B.** Create database migration tasks in AWS Database Migration Service (AWS DMS). Specify replication instances of the EC2 instances as the source endpoints. Specify the S3 bucket as the target endpoint. Set the migration type to migrate existing data and replicate ongoing changes.
- **C.** Create Amazon Kinesis data streams for data ingestion. Create Amazon Kinesis Data Firehose delivery streams to consume the Kinesis data streams. Specify the S3 bucket as the destination of the delivery streams. ✅
- **D.** Create and configure AWS DataSync agents on the EC2 instances. Configure DataSync tasks to transfer data from the EC2 instances to the S3 bucket.

**Answer:** C

**Explanation:**

Correct Answer:Create Amazon Kinesis data streams for data ingestion. Create Amazon Kinesis Data Firehose delivery streams to consume the Kinesis data streams. Specify the S3 bucket as the destination of the delivery streams.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create Amazon Kinesis data streams for data ingestion. Create Amazon Kinesis Data Firehose delivery streams to consume the Kinesis data streams. Specify the S3 bucket as the destination of the delivery streams. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Direct Connect connection to the application for data ingestion. Create Amazon Kinesis Data Firehose delivery streams to consume direct PUT operations from the application. Specify the S3 bucket as the destination of the delivery streams. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create database migration tasks in AWS Database Migration Service (AWS DMS). Specify replication instances of the EC2 instances as the source endpoints. Specify the S3 bucket as the target endpoint. Set the migration type to migrate existing data and replicate ongoing changes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create and configure AWS DataSync agents on the EC2 instances. Configure DataSync tasks to transfer data from the EC2 instances to the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 203

A marketing team wants to build a campaign for an upcoming multi-sport event. The team has news reports from the past five years in PDF format. The team needs a solution to extract insights about the content and the sentiment of the news reports. The solution must use Amazon Textract to process the news reports.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Provide the extracted insights to Amazon Comprehend for analysis. Save the analysis to an Amazon S3 bucket. ✅
- **B.** Store the extracted insights in an Amazon DynamoDB table. Use Amazon SageMaker to build a sentiment model.
- **C.** Provide the extracted insights to Amazon Athena for analysis. Store the extracted insights and analysis in an Amazon S3 bucket.
- **D.** Store the extracted insights in an Amazon S3 bucket. Use Amazon QuickSight to visualize and analyze the data.

**Answer:** A

**Explanation:**

Correct Answer:Provide the extracted insights to Amazon Comprehend for analysis. Save the analysis to an Amazon S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provide the extracted insights to Amazon Comprehend for analysis. Save the analysis to an Amazon S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the extracted insights in an Amazon DynamoDB table. Use Amazon SageMaker to build a sentiment model. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provide the extracted insights to Amazon Athena for analysis. Store the extracted insights and analysis in an Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the extracted insights in an Amazon S3 bucket. Use Amazon QuickSight to visualize and analyze the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 204

A global marketing company has applications that run in the ap-southeast-2 Region and the eu-west-1 Region. Applications that run in a VPC in eu-west-1 need to communicate securely with databases that run in a VPC in ap-southeast-2.
Which network design will meet these requirements?

- **A.** Create a VPC peering connection between the eu-west-1 VPC and the ap-southeast-2 VPC. Create an inbound rule in the eu-west-1 application security group that allows traffic from the database server IP addresses in the ap-southeast-2 security group.
- **B.** Configure a VPC peering connection between the ap-southeast-2 VPC and the eu-west-1 VPC. Update the subnet route tables. Create an inbound rule in the ap-southeast-2 database security group that references the security group ID of the application servers in eu-west-1. ✅
- **C.** Configure a VPC peering connection between the ap-southeast-2 VPC and the eu-west-1 VPC. Update the subnet route tables. Create an inbound rule in the ap-southeast-2 database security group that allows traffic from the eu-west-1 application server IP addresses.
- **D.** Create a transit gateway with a peering attachment between the eu-west-1 VPC and the ap-southeast-2 VPC. After the transit gateways are properly peered and routing is configured, create an inbound rule in the database security group that references the security group ID of the application servers in eu-west-1.

**Answer:** B

**Explanation:**

Correct Answer:Configure a VPC peering connection between the ap-southeast-2 VPC and the eu-west-1 VPC. Update the subnet route tables. Create an inbound rule in the ap-southeast-2 database security group that references the security group ID of the application servers in eu-west-1.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a VPC peering connection between the ap-southeast-2 VPC and the eu-west-1 VPC. Update the subnet route tables. Create an inbound rule in the ap-southeast-2 database security group that references the security group ID of the application servers in eu-west-1. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a VPC peering connection between the eu-west-1 VPC and the ap-southeast-2 VPC. Create an inbound rule in the eu-west-1 application security group that allows traffic from the database server IP addresses in the ap-southeast-2 security group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a VPC peering connection between the ap-southeast-2 VPC and the eu-west-1 VPC. Update the subnet route tables. Create an inbound rule in the ap-southeast-2 database security group that allows traffic from the eu-west-1 application server IP addresses. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a transit gateway with a peering attachment between the eu-west-1 VPC and the ap-southeast-2 VPC. After the transit gateways are properly peered and routing is configured, create an inbound rule in the database security group that references the security group ID of the application servers in eu-west-1. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 205

An online gaming company hosts its platform on Amazon EC2 instances behind Network Load Balancers (NLBs) across multiple AWS Regions. The NLBs can route requests to targets over the internet. The company wants to improve the customer playing experience by reducing end-to-end load time for its global customer base.
Which solution will meet these requirements?

- **A.** Create a standard accelerator in AWS Global Accelerator. Configure the existing NLBs as target endpoints. ✅
- **B.** Create Application Load Balancers (ALBs) in each Region to replace the existing NLBs. Register the existing EC2 instances as targets for the ALBs in each Region.
- **C.** Create additional NLBs and EC2 instances in other Regions where the company has large customer bases.
- **D.** Configure Amazon Route 53 to route equally weighted traffic to the NLBs in each Region.

**Answer:** A

**Explanation:**

Correct Answer:Create a standard accelerator in AWS Global Accelerator. Configure the existing NLBs as target endpoints.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a standard accelerator in AWS Global Accelerator. Configure the existing NLBs as target endpoints. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create Application Load Balancers (ALBs) in each Region to replace the existing NLBs. Register the existing EC2 instances as targets for the ALBs in each Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create additional NLBs and EC2 instances in other Regions where the company has large customer bases. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Route 53 to route equally weighted traffic to the NLBs in each Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 206

A company runs a container application on a Kubernetes cluster in the company's data center. The application uses Advanced Message Queuing Protocol (AMQP) to communicate with a message queue. The data center cannot scale fast enough to meet the company’s expanding business needs. The company wants to migrate the workloads to AWS.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Lambda functions to run the application. Use Amazon Simple Queue Service (Amazon SQS) to retrieve the messages.
- **B.** Migrate the container application to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon MQ to retrieve the messages. ✅
- **C.** Migrate the container application to Amazon Elastic Container Service (Amazon ECS). Use Amazon Simple Queue Service (Amazon SQS) to retrieve the messages.
- **D.** Use highly available Amazon EC2 instances to run the application. Use Amazon MQ to retrieve the messages.

**Answer:** B

**Explanation:**

Correct Answer:Migrate the container application to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon MQ to retrieve the messages.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the container application to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon MQ to retrieve the messages. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Lambda functions to run the application. Use Amazon Simple Queue Service (Amazon SQS) to retrieve the messages. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the container application to Amazon Elastic Container Service (Amazon ECS). Use Amazon Simple Queue Service (Amazon SQS) to retrieve the messages. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use highly available Amazon EC2 instances to run the application. Use Amazon MQ to retrieve the messages. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 207

A solutions architect runs a web application on multiple Amazon EC2 instances that are in individual target groups behind an Application Load Balancer (ALB). Users can reach the application through a public website.
The solutions architect wants to allow engineers to use a development version of the website to access one specific development EC2 instance to test new features for the application. The solutions architect wants to use an Amazon Route 53 hosted zone to give the engineers access to the development instance. The solution must automatically route to the development instance even if the development instance is replaced.
Which solution will meet these requirements?

- **A.** Create an A Record for the development website that has the value set to the ALB. Create a listener rule on the ALB that forwards requests for the development website to the target group that contains the development instance. ✅
- **B.** Recreate the development instance with a public IP address. Create an A Record for the development website that has the value set to the public IP address of the development instance.
- **C.** Create an A Record for the development website that has the value set to the ALB. Create a listener rule on the ALB to redirect requests for the development website to the public IP address of the development instance.
- **D.** Place all the instances in the same target group. Create an A Record for the development website. Set the value to the ALB. Create a listener rule on the ALB that forwards requests for the development website to the target group.

**Answer:** A

**Explanation:**

Correct Answer:Create an A Record for the development website that has the value set to the ALB. Create a listener rule on the ALB that forwards requests for the development website to the target group that contains the development instance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an A Record for the development website that has the value set to the ALB. Create a listener rule on the ALB that forwards requests for the development website to the target group that contains the development instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Recreate the development instance with a public IP address. Create an A Record for the development website that has the value set to the public IP address of the development instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an A Record for the development website that has the value set to the ALB. Create a listener rule on the ALB to redirect requests for the development website to the public IP address of the development instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Place all the instances in the same target group. Create an A Record for the development website. Set the value to the ALB. Create a listener rule on the ALB that forwards requests for the development website to the target group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 208

A company containerized a Windows job that runs on .NET 6 Framework under a Windows container. The company wants to run this job in the AWS Cloud. The job runs every 10 minutes. The job's runtime varies between 1 minute and 3 minutes.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to run the job. Create a scheduled task based on the container image of the job to run every 10 minutes. ✅
- **B.** Use AWS Batch to create a job that uses AWS Fargate resources. Configure the job scheduling to run every 10 minutes.
- **C.** Create an AWS Lambda function based on the container image of the job. Configure Amazon EventBridge to invoke the function every 10 minutes.
- **D.** Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to run the job. Create a standalone task based on the container image of the job. Use Windows task scheduler to run the job every10 minutes.

**Answer:** A

**Explanation:**

Correct Answer:Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to run the job. Create a scheduled task based on the container image of the job to run every 10 minutes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to run the job. Create a scheduled task based on the container image of the job to run every 10 minutes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Batch to create a job that uses AWS Fargate resources. Configure the job scheduling to run every 10 minutes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function based on the container image of the job. Configure Amazon EventBridge to invoke the function every 10 minutes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate to run the job. Create a standalone task based on the container image of the job. Use Windows task scheduler to run the job every10 minutes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 209

A company wants to set up Amazon Managed Grafana as its visualization tool. The company wants to visualize data from its Amazon RDS database as one data source. The company needs a secure solution that will not expose the data over the internet.
Which solution will meet these requirements?

- **A.** Create an Amazon Managed Grafana workspace without a VPC. Create a public endpoint for the RDS database. Configure the public endpoint as a data source in Amazon Managed Grafana.
- **B.** Create an Amazon Managed Grafana workspace in a VPC. Create a private endpoint for the RDS database. Configure the private endpoint as a data source in Amazon Managed Grafana. ✅
- **C.** Create an Amazon Managed Grafana workspace without a VPCreate an AWS PrivateLink endpoint to establish a connection between Amazon Managed Grafana and Amazon RDS. Set up Amazon RDS as a data source in Amazon Managed Grafana.
- **D.** Create an Amazon Managed Grafana workspace in a VPC. Create a public endpoint for the RDS database. Configure the public endpoint as a data source in Amazon Managed Grafana.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon Managed Grafana workspace in a VPC. Create a private endpoint for the RDS database. Configure the private endpoint as a data source in Amazon Managed Grafana.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Managed Grafana workspace in a VPC. Create a private endpoint for the RDS database. Configure the private endpoint as a data source in Amazon Managed Grafana. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Managed Grafana workspace without a VPC. Create a public endpoint for the RDS database. Configure the public endpoint as a data source in Amazon Managed Grafana. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Managed Grafana workspace without a VPCreate an AWS PrivateLink endpoint to establish a connection between Amazon Managed Grafana and Amazon RDS. Set up Amazon RDS as a data source in Amazon Managed Grafana. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Managed Grafana workspace in a VPC. Create a public endpoint for the RDS database. Configure the public endpoint as a data source in Amazon Managed Grafana. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 210

A company collects and processes data from a vendor. The vendor stores its data in an Amazon RDS for MySQL database in the vendor's own AWS account. The company’s VPC does not have an internet gateway, an AWS Direct Connect connection, or an AWS Site-to-Site VPN connection. The company needs to access the data that is in the vendor database.
Which solution will meet this requirement?

- **A.** Instruct the vendor to create a Network Load Balancer (NLB). Place the NLB in front of the Amazon RDS for MySQL database. Use AWS PrivateLink to integrate the company's VPC and the vendor's VPC. ✅
- **B.** Instruct the vendor to sign up for the AWS Hosted Connection Direct Connect Program. Use VPC peering to connect the company's VPC and the vendor's VPC.
- **C.** Configure a client VPN connection between the company's VPC and the vendor's VPC. Use VPC peering to connect the company's VPC and the vendor's VPC.
- **D.** Use AWS Transit Gateway to integrate the company's VPC and the vendor's VPC. Use VPC peering to connect the company’s VPC and the vendor's VPC.

**Answer:** A

**Explanation:**

Correct Answer:Instruct the vendor to create a Network Load Balancer (NLB). Place the NLB in front of the Amazon RDS for MySQL database. Use AWS PrivateLink to integrate the company's VPC and the vendor's VPC.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Instruct the vendor to create a Network Load Balancer (NLB). Place the NLB in front of the Amazon RDS for MySQL database. Use AWS PrivateLink to integrate the company's VPC and the vendor's VPC. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Instruct the vendor to sign up for the AWS Hosted Connection Direct Connect Program. Use VPC peering to connect the company's VPC and the vendor's VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a client VPN connection between the company's VPC and the vendor's VPC. Use VPC peering to connect the company's VPC and the vendor's VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Transit Gateway to integrate the company's VPC and the vendor's VPC. Use VPC peering to connect the company's VPC and the vendor's VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 211

A company collects data from a large number of participants who use wearable devices. The company stores the data in an Amazon DynamoDB table and uses applications to analyze the data. The data workload is constant and predictable. The company wants to stay at or below its forecasted budget for DynamoDB.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use provisioned mode and DynamoDB Standard-Infrequent Access (DynamoDB Standard-IA). Reserve capacity for the forecasted workload.
- **B.** Use provisioned mode. Specify the read capacity units (RCUs) and write capacity units (WCUs). ✅
- **C.** Use on-demand mode. Set the read capacity units (RCUs) and write capacity units (WCUs) high enough to accommodate changes in the workload.
- **D.** Use on-demand mode. Specify the read capacity units (RCUs) and write capacity units (WCUs) with reserved capacity.

**Answer:** B

**Explanation:**

Correct Answer:Use provisioned mode. Specify the read capacity units (RCUs) and write capacity units (WCUs).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use provisioned mode. Specify the read capacity units (RCUs) and write capacity units (WCUs). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use provisioned mode and DynamoDB Standard-Infrequent Access (DynamoDB Standard-IA). Reserve capacity for the forecasted workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use on-demand mode. Set the read capacity units (RCUs) and write capacity units (WCUs) high enough to accommodate changes in the workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use on-demand mode. Specify the read capacity units (RCUs) and write capacity units (WCUs) with reserved capacity. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 212

A company runs its workloads on Amazon Elastic Container Service (Amazon ECS). The container images that the ECS task definition uses need to be scanned for Common Vulnerabilities and Exposures (CVEs). New container images that are created also need to be scanned.
Which solution will meet these requirements with the FEWEST changes to the workloads?

- **A.** Deploy the workloads to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository. Specify scan on push filters for the ECR enhanced scan.
- **B.** Store the container images in an Amazon S3 bucket that has versioning enabled. Configure an S3 Event Notification for s3:ObjectCreated:* events to invoke an AWS Lambda function. Configure the Lambda function to initiate an Amazon Inspector scan.
- **C.** Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository to store the container images. Specify scan on push filters for the ECR basic scan. ✅
- **D.** Store the container images in an Amazon S3 bucket. Use Amazon Macie to scan the images. Use an S3 Event Notification to initiate a Macie scan for every event with an s3:ObjectCreated:Put event type.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository to store the container images. Specify scan on push filters for the ECR basic scan.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository to store the container images. Specify scan on push filters for the ECR basic scan. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy the workloads to Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon Elastic Container Registry (Amazon ECR) as a private image repository. Specify scan on push filters for the ECR enhanced scan. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the container images in an Amazon S3 bucket that has versioning enabled. Configure an S3 Event Notification for s3:ObjectCreated:* events to invoke an AWS Lambda function. Configure the Lambda function to initiate an Amazon Inspector scan. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the container images in an Amazon S3 bucket. Use Amazon Macie to scan the images. Use an S3 Event Notification to initiate a Macie scan for every event with an s3:ObjectCreated:Put event type. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 213

A company uses high concurrency AWS Lambda functions to process a constantly increasing number of messages in a message queue during marketing events. The Lambda functions use CPU intensive code to process the messages. The company wants to reduce the compute costs and to maintain service latency for its customers.
Which solution will meet these requirements?

- **A.** Configure provisioned concurrency for the Lambda functions. Increase the memory according to AWS Compute Optimizer recommendations. ✅
- **B.** Configure provisioned concurrency for the Lambda functions. Decrease the memory allocated to the Lambda functions.
- **C.** Configure reserved concurrency for the Lambda functions. Increase the memory according to AWS Compute Optimizer recommendations.
- **D.** Configure reserved concurrency for the Lambda functions. Decrease the memory allocated to the Lambda functions.

**Answer:** A

**Explanation:**

Correct Answer:Configure provisioned concurrency for the Lambda functions. Increase the memory according to AWS Compute Optimizer recommendations.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure provisioned concurrency for the Lambda functions. Increase the memory according to AWS Compute Optimizer recommendations. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure provisioned concurrency for the Lambda functions. Decrease the memory allocated to the Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure reserved concurrency for the Lambda functions. Increase the memory according to AWS Compute Optimizer recommendations. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure reserved concurrency for the Lambda functions. Decrease the memory allocated to the Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 214

A social media company has workloads that collect and process data. The workloads store the data in on-premises NFS storage. The data store cannot scale fast enough to meet the company’s expanding business needs. The company wants to migrate the current data store to AWS.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use the Amazon Elastic File System (Amazon EFS) One Zone-Infrequent Access (One Zone-IA) storage class. Activate the infrequent access lifecycle policy.
- **B.** Use the Amazon Elastic File System (Amazon EFS) Standard-Infrequent Access (Standard-IA) storage class. Activate the infrequent access lifecycle policy.
- **C.** Set up an AWS Storage Gateway Amazon S3 File Gateway. Use an Amazon S3 Lifecycle policy to transition the data to the appropriate storage class. ✅
- **D.** Set up an AWS Storage Gateway Volume Gateway. Use an Amazon S3 Lifecycle policy to transition the data to the appropriate storage class.

**Answer:** C

**Explanation:**

Correct Answer:Set up an AWS Storage Gateway Amazon S3 File Gateway. Use an Amazon S3 Lifecycle policy to transition the data to the appropriate storage class.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up an AWS Storage Gateway Amazon S3 File Gateway. Use an Amazon S3 Lifecycle policy to transition the data to the appropriate storage class. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the Amazon Elastic File System (Amazon EFS) One Zone-Infrequent Access (One Zone-IA) storage class. Activate the infrequent access lifecycle policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the Amazon Elastic File System (Amazon EFS) Standard-Infrequent Access (Standard-IA) storage class. Activate the infrequent access lifecycle policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an AWS Storage Gateway Volume Gateway. Use an Amazon S3 Lifecycle policy to transition the data to the appropriate storage class. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 215

A company runs containers in a Kubernetes environment in the company's local data center. The company wants to use Amazon Elastic Kubernetes Service (Amazon EKS) and other AWS managed services. Data must remain locally in the company's data center and cannot be stored in any remote site or cloud to maintain compliance.
Which solution will meet these requirements?

- **A.** Deploy AWS Local Zones in the company's data center.
- **B.** Use DataSync in the company's data center.
- **C.** Install an AWS Outposts rack in the company's data center. ✅
- **D.** Install an AWS Snowball Edge Storage Optimized node in the data center.

**Answer:** C

**Explanation:**

Correct Answer:Install an AWS Outposts rack in the company's data center.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Install an AWS Outposts rack in the company's data center. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy AWS Local Zones in the company's data center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use DataSync in the company's data center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Install an AWS Snowball Edge Storage Optimized node in the data center. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 216

A research company runs experiments that are powered by a simulation application and a visualization application. The simulation application runs on Linux and outputs intermediate data to an NFS share every 5 minutes. The visualization application is a Windows desktop application that displays the simulation output and requires an SMB file system.
The company maintains two synchronized file systems. This strategy is causing data duplication and inefficient resource usage. The company needs to migrate the applications to AWS without making code changes to either application.
Which solution will meet these requirements?

- **A.** Migrate both applications to Amazon Elastic Container Service (Amazon ECS). Configure Amazon FSx File Gateway for storage.
- **B.** Migrate the simulation application to Linux Amazon EC2 instances. Migrate the visualization application to Windows EC2 instances. Configure Amazon FSx for NetApp ONTAP for storage. ✅
- **C.** Migrate both applications to AWS Lambda. Create an Amazon S3 bucket to exchange data between the applications.
- **D.** Migrate the simulation application to Linux Amazon EC2 instances. Migrate the visualization application to Windows EC2 instances. Configure Amazon Simple Queue Service (Amazon SQS) to exchange data between the applications.

**Answer:** B

**Explanation:**

Correct Answer:Migrate the simulation application to Linux Amazon EC2 instances. Migrate the visualization application to Windows EC2 instances. Configure Amazon FSx for NetApp ONTAP for storage.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the simulation application to Linux Amazon EC2 instances. Migrate the visualization application to Windows EC2 instances. Configure Amazon FSx for NetApp ONTAP for storage. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate both applications to Amazon Elastic Container Service (Amazon ECS). Configure Amazon FSx File Gateway for storage. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate both applications to AWS Lambda. Create an Amazon S3 bucket to exchange data between the applications. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the simulation application to Linux Amazon EC2 instances. Migrate the visualization application to Windows EC2 instances. Configure Amazon Simple Queue Service (Amazon SQS) to exchange data between the applications. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 217

A solutions architect is designing a user authentication solution for a company. The solution must invoke two-factor authentication for users that log in from inconsistent geographical locations, IP addresses, or devices. The solution must also be able to scale up to accommodate millions of users.
Which solution will meet these requirements?

- **A.** Configure Amazon Cognito user pools for user authentication. Enable the risk-based adaptive authentication feature with multifactor authentication (MFA). ✅
- **B.** Configure Amazon Cognito identity pools for user authentication. Enable multi-factor authentication (MFA).
- **C.** Configure AWS Identity and Access Management (IAM) users for user authentication. Attach an IAM policy that allows the AllowManageOwnUserMFA action.
- **D.** Configure AWS IAM Identity Center (AWS Single Sign-On) authentication for user authentication. Configure the permission sets to require multi-factor authentication (MFA).

**Answer:** A

**Explanation:**

Correct Answer:Configure Amazon Cognito user pools for user authentication. Enable the risk-based adaptive authentication feature with multifactor authentication (MFA).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon Cognito user pools for user authentication. Enable the risk-based adaptive authentication feature with multifactor authentication (MFA). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon Cognito identity pools for user authentication. Enable multi-factor authentication (MFA). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS Identity and Access Management (IAM) users for user authentication. Attach an IAM policy that allows the AllowManageOwnUserMFA action. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure AWS IAM Identity Center (AWS Single Sign-On) authentication for user authentication. Configure the permission sets to require multi-factor authentication (MFA). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 218

A company has 700 TB of backup data stored in network attached storage (NAS) in its data center. This backup data need to be accessible for infrequent regulatory requests and must be retained 7 years. The company has decided to migrate this backup data from its data center to AWS. The migration must be complete within 1 month. The company has 500 Mbps of dedicated bandwidth on its public internet connection available for data transfer.
What should a solutions architect do to migrate and store the data at the LOWEST cost?

- **A.** Order AWS Snowball devices to transfer the data. Use a lifecycle policy to transition the files to Amazon S3 Glacier Deep Archive. ✅
- **B.** Deploy a VPN connection between the data center and Amazon VPC. Use the AWS CLI to copy the data from on premises to Amazon S3 Glacier.
- **C.** Use AWS DataSync to transfer the data and deploy a DataSync agent on premises. Use the DataSync task to copy files from the on-premises NAS storage to Amazon S3 Glacier.
- **D.** Provision a 500 Mbps AWS Direct Connect connection and transfer the data to Amazon S3. Use a lifecycle policy to transition the files to Amazon S3 Glacier Deep Archive.

**Answer:** A

**Explanation:**

Correct Answer:Order AWS Snowball devices to transfer the data. Use a lifecycle policy to transition the files to Amazon S3 Glacier Deep Archive.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Order AWS Snowball devices to transfer the data. Use a lifecycle policy to transition the files to Amazon S3 Glacier Deep Archive. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy a VPN connection between the data center and Amazon VPC. Use the AWS CLI to copy the data from on premises to Amazon S3 Glacier. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS DataSync to transfer the data and deploy a DataSync agent on premises. Use the DataSync task to copy files from the on-premises NAS storage to Amazon S3 Glacier. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision a 500 Mbps AWS Direct Connect connection and transfer the data to Amazon S3. Use a lifecycle policy to transition the files to Amazon S3 Glacier Deep Archive. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 219

A financial company needs to handle highly sensitive data. The company will store the data in an Amazon S3 bucket. The company needs to ensure that the data is encrypted in transit and at rest. The company must manage the encryption keys outside the AWS Cloud.
Which solution will meet these requirements?

- **A.** Encrypt the data at the company's data center before storing the data in the S3 bucket. ✅
- **B.** Encrypt the data in the S3 bucket with the default server-side encryption (SSE).
- **C.** Encrypt the data in the S3 bucket with server-side encryption (SSE) that uses an AWS Key Management Service (AWS KMS) AWS managed key.
- **D.** Encrypt the data in the S3 bucket with server-side encryption (SSE) that uses an AWS Key Management Service (AWS KMS) customer managed key.

**Answer:** A

**Explanation:**

Correct Answer:Encrypt the data at the company's data center before storing the data in the S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Encrypt the data at the company's data center before storing the data in the S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Encrypt the data in the S3 bucket with the default server-side encryption (SSE). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Encrypt the data in the S3 bucket with server-side encryption (SSE) that uses an AWS Key Management Service (AWS KMS) AWS managed key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Encrypt the data in the S3 bucket with server-side encryption (SSE) that uses an AWS Key Management Service (AWS KMS) customer managed key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 220

A company needs to create an AWS Lambda function that will run in a VPC in the company's primary AWS account. The Lambda function needs to access files that the company stores in an Amazon Elastic File System (Amazon EFS) file system. The EFS file system is located in a secondary AWS account. As the company adds files to the file system, the solution must scale to meet the demand.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Move the contents of the file system to a Lambda layer. Configure the Lambda layer's permissions to allow the company's secondary account to use the Lambda layer.
- **B.** Create a VPC peering connection between the VPCs that are in the primary account and the secondary account. ✅
- **C.** Create a new EFS file system in the primary account. Use AWS DataSync to copy the contents of the original EFS file system to the new EFS file system.
- **D.** Create a second Lambda function in the secondary account that has a mount that is configured for the file system. Use the primary account's Lambda function to invoke the secondary account's Lambda function.

**Answer:** B

**Explanation:**

Correct Answer:Create a VPC peering connection between the VPCs that are in the primary account and the secondary account.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a VPC peering connection between the VPCs that are in the primary account and the secondary account. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Move the contents of the file system to a Lambda layer. Configure the Lambda layer's permissions to allow the company's secondary account to use the Lambda layer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new EFS file system in the primary account. Use AWS DataSync to copy the contents of the original EFS file system to the new EFS file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a second Lambda function in the secondary account that has a mount that is configured for the file system. Use the primary account's Lambda function to invoke the secondary account's Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 221

A company's infrastructure consists of Amazon EC2 instances and an Amazon RDS DB instance in a single AWS Region. The company wants to back up its data in a separate Region.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use Amazon Data Lifecycle Manager (Amazon DLM) to copy EC2 backups and RDS backups to the separate Region.
- **B.** Create Amazon Elastic Block Store (Amazon EBS) snapshots. Copy the EBS snapshots to the separate Region. Create RDS snapshots. Export the RDS snapshots to Amazon S3. Configure S3 Cross-Region Replication (CRR) to the separate Region.
- **C.** Use AWS Backup to copy EC2 backups and RDS backups to the separate Region. ✅
- **D.** Create Amazon Machine Images (AMIs) of the EC2 instances. Copy the AMIs to the separate Region. Create a read replica for the RDS DB instance in the separate Region.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS Backup to copy EC2 backups and RDS backups to the separate Region.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Backup to copy EC2 backups and RDS backups to the separate Region. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Data Lifecycle Manager (Amazon DLM) to copy EC2 backups and RDS backups to the separate Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create Amazon Elastic Block Store (Amazon EBS) snapshots. Copy the EBS snapshots to the separate Region. Create RDS snapshots. Export the RDS snapshots to Amazon S3. Configure S3 Cross-Region Replication (CRR) to the separate Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create Amazon Machine Images (AMIs) of the EC2 instances. Copy the AMIs to the separate Region. Create a read replica for the RDS DB instance in the separate Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 222

A company needs to save the results from a medical trial to an Amazon S3 repository. The repository must allow a few scientists to add new files and must restrict all other users to read-only access. No users can have the ability to modify or delete any files in the repository. The company must keep every file in the repository for a minimum of 1 year after its creation date.
Which solution will meet these requirements?

- **A.** Use S3 Object Lock in governance mode with a legal hold of 1 year.
- **B.** Use S3 Object Lock in compliance mode with a retention period of 365 days. ✅
- **C.** Use an IAM role to restrict all users from deleting or changing objects in the S3 bucket. Use an S3 bucket policy to only allow the IAM role.
- **D.** Configure the S3 bucket to invoke an AWS Lambda function every time an object is added. Configure the function to track the hash of the saved object so that modified objects can be marked accordingly.

**Answer:** B

**Explanation:**

Correct Answer:Use S3 Object Lock in compliance mode with a retention period of 365 days.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use S3 Object Lock in compliance mode with a retention period of 365 days. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use S3 Object Lock in governance mode with a legal hold of 1 year. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an IAM role to restrict all users from deleting or changing objects in the S3 bucket. Use an S3 bucket policy to only allow the IAM role. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the S3 bucket to invoke an AWS Lambda function every time an object is added. Configure the function to track the hash of the saved object so that modified objects can be marked accordingly. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 223

A company uses AWS to run its ecommerce platform. The platform is critical to the company's operations and has a high volume of traffic and transactions. The company configures a multi-factor authentication (MFA) device to secure its AWS account root user credentials. The company wants to ensure that it will not lose access to the root user account if the MFA device is lost.
Which solution will meet these requirements?

- **A.** Set up a backup administrator account that the company can use to log in if the company loses the MFA device.
- **B.** Attach the administrator policy to another IAM user when the company cannot access the root account.
- **C.** Add multiple MFA devices for the root user account to handle the disaster scenario. ✅
- **D.** Create a new administrator account when the company cannot access the root account.

**Answer:** C

**Explanation:**

Correct Answer:Add multiple MFA devices for the root user account to handle the disaster scenario.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add multiple MFA devices for the root user account to handle the disaster scenario. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up a backup administrator account that the company can use to log in if the company loses the MFA device. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach the administrator policy to another IAM user when the company cannot access the root account. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new administrator account when the company cannot access the root account. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 224

A company needs a solution to prevent photos with unwanted content from being uploaded to the company's web application. The solution must not involve training a machine learning (ML) model.
Which solution will meet these requirements?

- **A.** Create an AWS Lambda function that uses Amazon Rekognition Video to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded.
- **B.** Create an Amazon CloudFront function that uses Amazon Comprehend to detect unwanted content. Associate the function with the web application.
- **C.** Create an AWS Lambda function that uses Amazon Rekognition to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded. ✅
- **D.** Create and deploy a model by using Amazon SageMaker Autopilot. Create a real-time endpoint that the web application invokes when new photos are uploaded.

**Answer:** C

**Explanation:**

Correct Answer:Create an AWS Lambda function that uses Amazon Rekognition to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Lambda function that uses Amazon Rekognition to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Lambda function that uses Amazon Rekognition Video to detect unwanted content. Create a Lambda function URL that the web application invokes when new photos are uploaded. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudFront function that uses Amazon Comprehend to detect unwanted content. Associate the function with the web application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create and deploy a model by using Amazon SageMaker Autopilot. Create a real-time endpoint that the web application invokes when new photos are uploaded. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 225

A company is designing a tightly coupled high performance computing (HPC) environment in the AWS Cloud. The company needs to include features that will optimize the HPC environment for networking and storage.
Which combination of solutions will meet these requirements? (Choose two.)

- **A.** Create an accelerator in AWS Global Accelerator. Configure custom routing for the accelerator.
- **B.** Create an Amazon CloudFront distribution. Configure the viewer protocol policy to be HTTP and HTTPS.
- **C.** Launch Amazon EC2 instances. Attach an Elastic Fabric Adapter (EFA) to the instances. ✅
- **D.** Create an Amazon FSx for Lustre file system. Configure the file system with scratch storage. ✅
- **E.** Create an AWS Elastic Beanstalk deployment to manage the environment.

**Answer:** C, D

**Explanation:**

Correct Answer:Launch Amazon EC2 instances. Attach an Elastic Fabric Adapter (EFA) to the instances.; Create an Amazon FSx for Lustre file system. Configure the file system with scratch storage.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Launch Amazon EC2 instances. Attach an Elastic Fabric Adapter (EFA) to the instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Amazon FSx for Lustre file system. Configure the file system with scratch storage. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an accelerator in AWS Global Accelerator. Configure custom routing for the accelerator. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudFront distribution. Configure the viewer protocol policy to be HTTP and HTTPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Elastic Beanstalk deployment to manage the environment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 226

A company wants to analyze and generate reports to track the usage of its mobile app. The app is popular and has a global user base. The company uses a custom report building program to analyze application usage.
The program generates multiple reports during the last week of each month. The program takes less than 10 minutes to produce each report. The company rarely uses the program to generate reports outside of the last week of each month The company wants to generate reports in the least amount of time when the reports are requested.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Run the program in AWS Lambda. Create an Amazon EventBridge rule to run a Lambda function when reports are requested. ✅
- **B.** Run the program by using Amazon EC2 On-Demand Instances. Create an Amazon EventBridge rule to start the EC2 instances when reports are requested. Run the EC2 instances continuously during the last week of each month.
- **C.** Run the program in Amazon Elastic Container Service (Amazon ECS). Schedule Amazon ECS to run the program when reports are requested.
- **D.** Run the program by using Amazon EC2 Spot Instances. Create an Amazon EventBndge rule to start the EC2 instances when reports are requested. Run the EC2 instances continuously during the last week of each month.

**Answer:** A

**Explanation:**

Correct Answer:Run the program in AWS Lambda. Create an Amazon EventBridge rule to run a Lambda function when reports are requested.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Run the program in AWS Lambda. Create an Amazon EventBridge rule to run a Lambda function when reports are requested. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Run the program by using Amazon EC2 On-Demand Instances. Create an Amazon EventBridge rule to start the EC2 instances when reports are requested. Run the EC2 instances continuously during the last week of each month. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Run the program in Amazon Elastic Container Service (Amazon ECS). Schedule Amazon ECS to run the program when reports are requested. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Run the program by using Amazon EC2 Spot Instances. Create an Amazon EventBndge rule to start the EC2 instances when reports are requested. Run the EC2 instances continuously during the last week of each month. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 227

A company has multiple AWS accounts for development work. Some staff consistently use oversized Amazon EC2 instances, which causes the company to exceed the yearly budget for the development accounts. The company wants to centrally restrict the creation of AWS resources in these accounts.
Which solution will meet these requirements with the LEAST development effort?

- **A.** Set up AWS Service Catalog products for the staff to create the allowed EC2 instance types. Ensure that staff can deploy EC2 instances only by using the Service Catalog products.
- **B.** Configure an Amazon EventBridge rule that invokes an AWS Lambda function when an EC2 instance is created. Stop disallowed EC2 instance types.
- **C.** Develop AWS Systems Manager templates that use an approved EC2 creation process. Use the approved Systems Manager templates to provision EC2 instances.
- **D.** Use AWS Organizations to organize the accounts into organizational units (OUs). Define and attach a service control policy (SCP) to control the usage of EC2 instance types. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS Organizations to organize the accounts into organizational units (OUs). Define and attach a service control policy (SCP) to control the usage of EC2 instance types.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Organizations to organize the accounts into organizational units (OUs). Define and attach a service control policy (SCP) to control the usage of EC2 instance types. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up AWS Service Catalog products for the staff to create the allowed EC2 instance types. Ensure that staff can deploy EC2 instances only by using the Service Catalog products. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon EventBridge rule that invokes an AWS Lambda function when an EC2 instance is created. Stop disallowed EC2 instance types. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Develop AWS Systems Manager templates that use an approved EC2 creation process. Use the approved Systems Manager templates to provision EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 228

An analytics company uses Amazon VPC to run its multi-tier services. The company wants to use RESTful APIs to offer a web analytics service to millions of users. Users must be verified by using an authentication service to access the APIs.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Configure an Amazon Cognito user pool for user authentication. Implement Amazon API Gateway REST APIs with a Cognito authorizer. ✅
- **B.** Configure an Amazon Cognito identity pool for user authentication. Implement Amazon API Gateway HTTP APIs with a Cognito authorizer.
- **C.** Configure an IAM user to handle user authentication. Implement Amazon API Gateway HTTP APIs with an IAM authorizer.
- **D.** Configure an AWS Lambda function to handle user authentication. Implement Amazon API Gateway REST APIs with a Lambda authorizer.

**Answer:** A

**Explanation:**

Correct Answer:Configure an Amazon Cognito user pool for user authentication. Implement Amazon API Gateway REST APIs with a Cognito authorizer.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon Cognito user pool for user authentication. Implement Amazon API Gateway REST APIs with a Cognito authorizer. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Amazon Cognito identity pool for user authentication. Implement Amazon API Gateway HTTP APIs with a Cognito authorizer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an IAM user to handle user authentication. Implement Amazon API Gateway HTTP APIs with an IAM authorizer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an AWS Lambda function to handle user authentication. Implement Amazon API Gateway REST APIs with a Lambda authorizer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 229

A company has AWS Lambda functions that use environment variables. The company does not want its developers to see environment variables in plaintext.
Which solution will meet these requirements?

- **A.** Configure SSL encryption on the Lambda functions to use AWS CloudHSM to store and encrypt the environment variables.
- **B.** Create an AWS Key Management Service (AWS KMS) key. Enable encryption helpers on the Lambda functions to use the KMS key to store and encrypt the environment variables. ✅
- **C.** Deploy code to Amazon EC2 instances instead of using Lambda functions.
- **D.** Create a certificate in AWS Certificate Manager (ACM). Configure the Lambda functions to use the certificate to encrypt the environment variables.

**Answer:** B

**Explanation:**

Correct Answer:Create an AWS Key Management Service (AWS KMS) key. Enable encryption helpers on the Lambda functions to use the KMS key to store and encrypt the environment variables.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Key Management Service (AWS KMS) key. Enable encryption helpers on the Lambda functions to use the KMS key to store and encrypt the environment variables. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure SSL encryption on the Lambda functions to use AWS CloudHSM to store and encrypt the environment variables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy code to Amazon EC2 instances instead of using Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a certificate in AWS Certificate Manager (ACM). Configure the Lambda functions to use the certificate to encrypt the environment variables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 230

A company's web application that is hosted in the AWS Cloud recently increased in popularity. The web application currently exists on a single Amazon EC2 instance in a single public subnet. The web application has not been able to meet the demand of the increased web traffic.
The company needs a solution that will provide high availability and scalability to meet the increased user demand without rewriting the web application.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Configure a NAT gateway in a public subnet to handle web requests.
- **B.** Configure Amazon EC2 Auto Scaling with multiple Availability Zones in private subnets. ✅
- **C.** Replace the EC2 instance with a larger compute optimized instance.
- **D.** Replace the EC2 instance with a larger memory optimized instance.
- **E.** Configure an Application Load Balancer in a public subnet to distribute web traffic. ✅

**Answer:** B, E

**Explanation:**

Correct Answer:Configure Amazon EC2 Auto Scaling with multiple Availability Zones in private subnets.; Configure an Application Load Balancer in a public subnet to distribute web traffic.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon EC2 Auto Scaling with multiple Availability Zones in private subnets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Configure an Application Load Balancer in a public subnet to distribute web traffic. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure a NAT gateway in a public subnet to handle web requests. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Replace the EC2 instance with a larger compute optimized instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Replace the EC2 instance with a larger memory optimized instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 231

A company needs a solution to prevent AWS CloudFormation stacks from deploying AWS Identity and Access Management (IAM) resources that include an inline policy or
*
in the statement. The solution must also prohibit deployment of Amazon EC2 instances with public IP addresses. The company has AWS Control Tower enabled in its organization in AWS Organizations.
Which solution will meet these requirements?

- **A.** Use AWS Config to create rules for EC2 and IAM compliance. Configure the rules to run an AWS Systems Manager Session Manager automation to delete a resource when it is not compliant.
- **B.** Use a service control policy (SCP) to block actions for the EC2 instances and IAM resources if the actions lead to noncompliance.
- **C.** Use AWS Control Tower detective controls to block deployment of EC2 instances with public IP addresses and inline policies with elevated access or “*”.
- **D.** Use AWS Control Tower proactive controls to block deployment of EC2 instances with public IP addresses and inline policies with elevated access or “*”. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use AWS Control Tower proactive controls to block deployment of EC2 instances with public IP addresses and inline policies with elevated access or "*".

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Control Tower proactive controls to block deployment of EC2 instances with public IP addresses and inline policies with elevated access or "*". - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Config to create rules for EC2 and IAM compliance. Configure the rules to run an AWS Systems Manager Session Manager automation to delete a resource when it is not compliant. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a service control policy (SCP) to block actions for the EC2 instances and IAM resources if the actions lead to noncompliance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Control Tower detective controls to block deployment of EC2 instances with public IP addresses and inline policies with elevated access or "*". - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 232

A company has stored 10 TB of log files in Apache Parquet format in an Amazon S3 bucket. The company occasionally needs to use SQL to analyze the log files.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Create an Amazon Aurora MySQL database. Migrate the data from the S3 bucket into Aurora by using AWS Database Migration Service (AWS DMS). Issue SQL statements to the Aurora database.
- **B.** Create an Amazon Redshift cluster. Use Redshift Spectrum to run SQL statements directly on the data in the S3 bucket.
- **C.** Create an AWS Glue crawler to store and retrieve table metadata from the S3 bucket. Use Amazon Athena to run SQL statements directly on the data in the S3 bucket. ✅
- **D.** Create an Amazon EMR cluster. Use Apache Spark SQL to run SQL statements directly on the data in the S3 bucket.

**Answer:** C

**Explanation:**

Correct Answer:Create an AWS Glue crawler to store and retrieve table metadata from the S3 bucket. Use Amazon Athena to run SQL statements directly on the data in the S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Glue crawler to store and retrieve table metadata from the S3 bucket. Use Amazon Athena to run SQL statements directly on the data in the S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Aurora MySQL database. Migrate the data from the S3 bucket into Aurora by using AWS Database Migration Service (AWS DMS). Issue SQL statements to the Aurora database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Redshift cluster. Use Redshift Spectrum to run SQL statements directly on the data in the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon EMR cluster. Use Apache Spark SQL to run SQL statements directly on the data in the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 233

A company has an organization in AWS Organizations that has all features enabled. The company requires that all API calls and logins in any existing or new AWS account must be audited. The company needs a managed solution to prevent additional work and to minimize costs. The company also needs to know when any AWS account is not compliant with the AWS Foundational Security Best Practices (FSBP) standard.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Deploy an AWS Control Tower environment in a dedicated Organizations member account. Enable AWS Security Hub and AWS Control Tower Account Factory in the environment.
- **B.** Use AWS Managed Services (AMS) Accelerate to build a multi-account landing zone (MALZ). Submit an RFC to self-service provision AWS Security Hub in the MALZ.
- **C.** Deploy an AWS Control Tower environment in the Organizations management account. Enable AWS Security Hub and AWS Control Tower Account Factory in the environment. ✅
- **D.** Use AWS Managed Services (AMS) Accelerate to build a multi-account landing zone (MALZ). Submit an RFC to self-service provision Amazon GuardDuty in the MALZ.

**Answer:** C

**Explanation:**

Correct Answer:Deploy an AWS Control Tower environment in the Organizations management account. Enable AWS Security Hub and AWS Control Tower Account Factory in the environment.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an AWS Control Tower environment in the Organizations management account. Enable AWS Security Hub and AWS Control Tower Account Factory in the environment. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy an AWS Control Tower environment in a dedicated Organizations member account. Enable AWS Security Hub and AWS Control Tower Account Factory in the environment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Managed Services (AMS) Accelerate to build a multi-account landing zone (MALZ). Submit an RFC to self-service provision AWS Security Hub in the MALZ. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Managed Services (AMS) Accelerate to build a multi-account landing zone (MALZ). Submit an RFC to self-service provision Amazon GuardDuty in the MALZ. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 234

A company runs multiple workloads in its on-premises data center. The company's data center cannot scale fast enough to meet the company's expanding business needs. The company wants to collect usage and configuration data about the on-premises servers and workloads to plan a migration to AWS.
Which solution will meet these requirements?

- **A.** Set the home AWS Region in AWS Migration Hub. Use AWS Systems Manager to collect data about the on-premises servers.
- **B.** Use the AWS Schema Conversion Tool (AWS SCT) to create the relevant templates. Use AWS Database Migration Service (AWS DMS) to collect data about the on-premises servers.
- **C.** Use the AWS Schema Conversion Tool (AWS SCT) to create the relevant templates. Use AWS Trusted Advisor to collect data about the on-premises servers.
- **D.** Set the home AWS Region in AWS Migration Hub. Use AWS Application Discovery Service to collect data about the on-premises servers. ✅

**Answer:** D

**Explanation:**

Correct Answer:Set the home AWS Region in AWS Migration Hub. Use AWS Application Discovery Service to collect data about the on-premises servers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set the home AWS Region in AWS Migration Hub. Use AWS Application Discovery Service to collect data about the on-premises servers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set the home AWS Region in AWS Migration Hub. Use AWS Systems Manager to collect data about the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the AWS Schema Conversion Tool (AWS SCT) to create the relevant templates. Use AWS Database Migration Service (AWS DMS) to collect data about the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the AWS Schema Conversion Tool (AWS SCT) to create the relevant templates. Use AWS Trusted Advisor to collect data about the on-premises servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 235

A solutions architect is designing a payment processing application that runs on AWS Lambda in private subnets across multiple Availability Zones. The application uses multiple Lambda functions and processes millions of transactions each day.
The architecture must ensure that the application does not process duplicate payments.
Which solution will meet these requirements?

- **A.** Use Lambda to retrieve all due payments. Store the due payments in an Amazon DynamoDB table. Configure streams on the DynamoDB table to invoke another Lambda function to process the due payments.
- **B.** Use Lambda to retrieve all due payments. Publish the due payments to an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Configure another Lambda function to poll the FIFO queue and to process the due payments. ✅
- **C.** Use Lambda to retrieve all due payments. Publish the due payments to an Amazon Simple Queue Service (Amazon SQS) queue. Configure another Lambda function to poll the SQS queue and to process the due payments.
- **D.** Use Lambda to retrieve all due payments. Publish the due payments to an Amazon S3 bucket. Configure the S3 bucket with an event notification to invoke another Lambda function to process the due payments.

**Answer:** B

**Explanation:**

Correct Answer:Use Lambda to retrieve all due payments. Publish the due payments to an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Configure another Lambda function to poll the FIFO queue and to process the due payments.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Lambda to retrieve all due payments. Publish the due payments to an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Configure another Lambda function to poll the FIFO queue and to process the due payments. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Lambda to retrieve all due payments. Store the due payments in an Amazon DynamoDB table. Configure streams on the DynamoDB table to invoke another Lambda function to process the due payments. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Lambda to retrieve all due payments. Publish the due payments to an Amazon Simple Queue Service (Amazon SQS) queue. Configure another Lambda function to poll the SQS queue and to process the due payments. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Lambda to retrieve all due payments. Publish the due payments to an Amazon S3 bucket. Configure the S3 bucket with an event notification to invoke another Lambda function to process the due payments. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 236

A company wants to move from many standalone AWS accounts to a consolidated, multi-account architecture. The company plans to create many new AWS accounts for different business units. The company needs to authenticate access to these AWS accounts by using a centralized corporate directory service.
Which combination of actions should a solutions architect recommend to meet these requirements? (Choose two.)

- **A.** Set up AWS IAM Identity Center (AWS Single Sign-On) in the organization. Configure IAM Identity Center, and integrate it with the company's corporate directory service. ✅
- **B.** Create a new organization in AWS Organizations. Configure the organization's authentication mechanism to use AWS Directory Service directly.
- **C.** Configure a service control policy (SCP) to manage the AWS accounts. Add AWS IAM Identity Center (AWS Single Sign-On) to AWS Directory Service.
- **D.** Create a new organization in AWS Organizations with all features turned on. Create the new AWS accounts in the organization. ✅
- **E.** Set up an Amazon Cognito identity pool. Configure AWS IAM Identity Center (AWS Single Sign-On) to accept Amazon Cognito authentication.

**Answer:** A, D

**Explanation:**

Correct Answer:Set up AWS IAM Identity Center (AWS Single Sign-On) in the organization. Configure IAM Identity Center, and integrate it with the company's corporate directory service.; Create a new organization in AWS Organizations with all features turned on. Create the new AWS accounts in the organization.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up AWS IAM Identity Center (AWS Single Sign-On) in the organization. Configure IAM Identity Center, and integrate it with the company's corporate directory service. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a new organization in AWS Organizations with all features turned on. Create the new AWS accounts in the organization. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new organization in AWS Organizations. Configure the organization's authentication mechanism to use AWS Directory Service directly. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a service control policy (SCP) to manage the AWS accounts. Add AWS IAM Identity Center (AWS Single Sign-On) to AWS Directory Service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an Amazon Cognito identity pool. Configure AWS IAM Identity Center (AWS Single Sign-On) to accept Amazon Cognito authentication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 237

A company stores raw collected data in an Amazon S3 bucket. The data is used for several types of analytics on behalf of the company's customers. The type of analytics requested determines the access pattern on the S3 objects.
The company cannot predict or control the access pattern. The company wants to reduce its S3 costs.
Which solution will meet these requirements?

- **A.** Use S3 Lifecycle rules to transition objects from S3 Standard to S3 Intelligent-Tiering ✅
- **B.** Use S3 Lifecycle rules to transition objects from S3 Standard to Standard-Infrequent Access (S3 Standard-IA)
- **C.** Use S3 replication to transition infrequently accessed objects to S3 Standard-Infrequent Access (S3 Standard-IA)
- **D.** Use S3 Inventory to identify and transition objects that have not been accessed from S3 Standard to S3 Intelligent-Tiering

**Answer:** A

**Explanation:**

Correct Answer:Use S3 Lifecycle rules to transition objects from S3 Standard to S3 Intelligent-Tiering

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use S3 Lifecycle rules to transition objects from S3 Standard to S3 Intelligent-Tiering - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use S3 Lifecycle rules to transition objects from S3 Standard to Standard-Infrequent Access (S3 Standard-IA) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use S3 replication to transition infrequently accessed objects to S3 Standard-Infrequent Access (S3 Standard-IA) - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use S3 Inventory to identify and transition objects that have not been accessed from S3 Standard to S3 Intelligent-Tiering - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 238

A company wants to deploy an internal web application on AWS. The web application must be accessible only from the company's office. The company needs to download security patches for the web application from the internet.
The company has created a VPC and has configured an AWS Site-to-Site VPN connection to the company's office. A solutions architect must design a secure architecture for the web application.
Which solution will meet these requirements?

- **A.** Deploy the web application on Amazon EC2 instances in public subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in private subnets. Attach an internet gateway to the VPC. Set the outbound destination of the ALB’s security group to the company's office network CIDR block.
- **B.** Deploy the web application on Amazon EC2 instances in public subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the inbound source of the ALB's security group to 0.0.0.0/0.
- **C.** Deploy the web application on Amazon EC2 instances in private subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in public subnets. Attach an internet gateway to the VPC. Set the inbound source of the ALB's security group to the company's office network CIDR block. ✅
- **D.** Deploy the web application on Amazon EC2 instances in private subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the outbound destination of the ALB’s security group to 0.0.0.0/0.

**Answer:** C

**Explanation:**

Correct Answer:Deploy the web application on Amazon EC2 instances in private subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in public subnets. Attach an internet gateway to the VPC. Set the inbound source of the ALB's security group to the company's office network CIDR block.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy the web application on Amazon EC2 instances in private subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in public subnets. Attach an internet gateway to the VPC. Set the inbound source of the ALB's security group to the company's office network CIDR block. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy the web application on Amazon EC2 instances in public subnets behind an internal Application Load Balancer (ALB). Deploy NAT gateways in private subnets. Attach an internet gateway to the VPC. Set the outbound destination of the ALB's security group to the company's office network CIDR block. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the web application on Amazon EC2 instances in public subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the inbound source of the ALB's security group to 0.0.0.0/0. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the web application on Amazon EC2 instances in private subnets behind a public Application Load Balancer (ALB). Attach an internet gateway to the VPC. Set the outbound destination of the ALB's security group to 0.0.0.0/0. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 239

A company wants to run its experimental workloads in the AWS Cloud. The company has a budget for cloud spending. The company's CFO is concerned about cloud spending accountability for each department. The CFO wants to receive notification when the spending threshold reaches 60% of the budget.
Which solution will meet these requirements?

- **A.** Use AWS Cost Explorer forecasts to determine resource owners. Use AWS Cost Anomaly Detection to create alert threshold notifications when spending exceeds 60% of the budget.
- **B.** Use cost allocation tags on AWS resources to label owners. Create usage budgets in AWS Budgets. Add an alert threshold to receive notification when spending exceeds 60% of the budget. ✅
- **C.** Use cost allocation tags on AWS resources to label owners. Use AWS Support API on AWS Trusted Advisor to create alert threshold notifications when spending exceeds 60% of the budget.
- **D.** Use AWS Cost Explorer forecasts to determine resource owners. Create usage budgets in AWS Budgets. Add an alert threshold to receive notification when spending exceeds 60% of the budget.

**Answer:** B

**Explanation:**

Correct Answer:Use cost allocation tags on AWS resources to label owners. Create usage budgets in AWS Budgets. Add an alert threshold to receive notification when spending exceeds 60% of the budget.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use cost allocation tags on AWS resources to label owners. Create usage budgets in AWS Budgets. Add an alert threshold to receive notification when spending exceeds 60% of the budget. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Cost Explorer forecasts to determine resource owners. Use AWS Cost Anomaly Detection to create alert threshold notifications when spending exceeds 60% of the budget. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use cost allocation tags on AWS resources to label owners. Use AWS Support API on AWS Trusted Advisor to create alert threshold notifications when spending exceeds 60% of the budget. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Cost Explorer forecasts to determine resource owners. Create usage budgets in AWS Budgets. Add an alert threshold to receive notification when spending exceeds 60% of the budget. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 240

A company has hired an external vendor to perform work in the company’s AWS account. The vendor uses an automated tool that is hosted in an AWS account that the vendor owns. The vendor does not have IAM access to the company’s AWS account. The company needs to grant the vendor access to the company’s AWS account.
Which solution will meet these requirements MOST securely?

- **A.** Create an IAM group in the company’s account. Add the automated tool’s IAM user from the vendor account to the group. Attach the appropriate IAM policies to the group for the permissions that the vendor requires.
- **B.** Create an IAM user in the company’s account with a password that meets the password complexity requirements. Attach the appropriate IAM policies to the user for the permissions that the vendor requires.
- **C.** Create an IAM user in the company’s account that has a permission boundary that allows the vendor’s account. Attach the appropriate IAM policies to the user for the permissions that the vendor requires.
- **D.** Create an IAM role in the company’s account to delegate access to the vendor’s IAM role. Attach the appropriate IAM policies to the role for the permissions that the vendor requires. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an IAM role in the company's account to delegate access to the vendor's IAM role. Attach the appropriate IAM policies to the role for the permissions that the vendor requires.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an IAM role in the company's account to delegate access to the vendor's IAM role. Attach the appropriate IAM policies to the role for the permissions that the vendor requires. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an IAM group in the company's account. Add the automated tool's IAM user from the vendor account to the group. Attach the appropriate IAM policies to the group for the permissions that the vendor requires. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM user in the company's account with a password that meets the password complexity requirements. Attach the appropriate IAM policies to the user for the permissions that the vendor requires. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM user in the company's account that has a permission boundary that allows the vendor's account. Attach the appropriate IAM policies to the user for the permissions that the vendor requires. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 241

A company runs its critical database on an Amazon RDS for PostgreSQL DB instance. The company wants to migrate to Amazon Aurora PostgreSQL with minimal downtime and data loss.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use data import from Amazon S3 to migrate the database to an Aurora PostgreSQL DB cluster.
- **B.** Create an Aurora read replica of the RDS for PostgreSQL DB instance. Promote the Aurora read replicate to a new Aurora PostgreSQL DB cluster. ✅
- **C.** Create a DB snapshot of the RDS for PostgreSQL DB instance to populate a new Aurora PostgreSQL DB cluster.
- **D.** Use the pg_dump utility to back up the RDS for PostgreSQL database. Restore the backup to a new Aurora PostgreSQL DB cluster.

**Answer:** B

**Explanation:**

Correct Answer:Create an Aurora read replica of the RDS for PostgreSQL DB instance. Promote the Aurora read replicate to a new Aurora PostgreSQL DB cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Aurora read replica of the RDS for PostgreSQL DB instance. Promote the Aurora read replicate to a new Aurora PostgreSQL DB cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use data import from Amazon S3 to migrate the database to an Aurora PostgreSQL DB cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a DB snapshot of the RDS for PostgreSQL DB instance to populate a new Aurora PostgreSQL DB cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the pg_dump utility to back up the RDS for PostgreSQL database. Restore the backup to a new Aurora PostgreSQL DB cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 242

A data analytics company has 80 offices that are distributed globally. Each office hosts 1 PB of data and has between 1 and 2 Gbps of internet bandwidth.
The company needs to perform a one-time migration of a large amount of data from its offices to Amazon S3. The company must complete the migration within 4 weeks.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use multiple AWS Snowball Edge storage-optimized devices to store and transfer the data to Amazon S3. ✅
- **B.** Set up an AWS Storage Gateway Volume Gateway to transfer the data to Amazon S3.
- **C.** Establish a new 10 Gbps AWS Direct Connect connection to each office. Transfer the data to Amazon S3.
- **D.** Upload data directly to Amazon S3 via internet.

**Answer:** A

**Explanation:**

Correct Answer:Use multiple AWS Snowball Edge storage-optimized devices to store and transfer the data to Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use multiple AWS Snowball Edge storage-optimized devices to store and transfer the data to Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up an AWS Storage Gateway Volume Gateway to transfer the data to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Establish a new 10 Gbps AWS Direct Connect connection to each office. Transfer the data to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Upload data directly to Amazon S3 via internet. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 243

A company uses AWS Organizations for its multi-account AWS setup. The security organizational unit (OU) of the company needs to share approved Amazon Machine Images (AMIs) with the development OU. The AMIs are created by using AWS Key Management Service (AWS KMS) encrypted snapshots.
Which solution will meet these requirements? (Choose two.)

- **A.** Add the development team’s account Amazon Resource Name (ARN) to the launch permission list for the AMIs.
- **B.** Add the development team's OU Amazon Resource Name (ARN) to the launch permission list for the AMIs. ✅
- **C.** Add the Organizations root Amazon Resource Name (ARN) to the launch permission list for the AMIs.
- **D.** Recreate the AWS KMS key. Add a key policy to allow the Organizations root Amazon Resource Name (ARN) to use the AWS KMS key.
- **E.** Update the key policy to allow the development team's OU to use the AWS KMS keys that are used to decrypt the snapshots. ✅

**Answer:** B, E

**Explanation:**

Correct Answer:Add the development team's OU Amazon Resource Name (ARN) to the launch permission list for the AMIs.; Update the key policy to allow the development team's OU to use the AWS KMS keys that are used to decrypt the snapshots.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add the development team's OU Amazon Resource Name (ARN) to the launch permission list for the AMIs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Update the key policy to allow the development team's OU to use the AWS KMS keys that are used to decrypt the snapshots. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add the development team's account Amazon Resource Name (ARN) to the launch permission list for the AMIs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add the Organizations root Amazon Resource Name (ARN) to the launch permission list for the AMIs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Recreate the AWS KMS key. Add a key policy to allow the Organizations root Amazon Resource Name (ARN) to use the AWS KMS key. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 244

A company has a mobile game that reads most of its metadata from an Amazon RDS DB instance. As the game increased in popularity, developers noticed slowdowns related to the game's metadata load times. Performance metrics indicate that simply scaling the database will not help. A solutions architect must explore all options that include capabilities for snapshots, replication, and sub-millisecond response times.
What should the solutions architect recommend to solve these issues?

- **A.** Migrate the database to Amazon Aurora with Aurora Replicas.
- **B.** Migrate the database to Amazon DynamoDB with global tables.
- **C.** Add an Amazon ElastiCache for Redis layer in front of the database. ✅
- **D.** Add an Amazon ElastiCache for Memcached layer in front of the database.

**Answer:** C

**Explanation:**

Correct Answer:Add an Amazon ElastiCache for Redis layer in front of the database.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add an Amazon ElastiCache for Redis layer in front of the database. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the database to Amazon Aurora with Aurora Replicas. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon DynamoDB with global tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add an Amazon ElastiCache for Memcached layer in front of the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 245

A solutions architect needs to ensure that API calls to Amazon DynamoDB from Amazon EC2 instances in a VPC do not travel across the internet.
Which combination of steps should the solutions architect take to meet this requirement? (Choose two.)

- **A.** Create an elastic network interface for the endpoint in each of the subnets of the VPC.
- **B.** Create a security group entry in the endpoint's security group to provide access.
- **C.** Create an interface endpoint for Amazon EC2.
- **D.** Create a gateway endpoint for DynamoDB. ✅
- **E.** Create a route table entry for the endpoint. ✅

**Answer:** D, E

**Explanation:**

Correct Answer:Create a gateway endpoint for DynamoDB.; Create a route table entry for the endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a gateway endpoint for DynamoDB. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a route table entry for the endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an elastic network interface for the endpoint in each of the subnets of the VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a security group entry in the endpoint's security group to provide access. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an interface endpoint for Amazon EC2. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 246

A solutions architect must provide an automated solution for a company's compliance policy that states security groups cannot include a rule that allows SSH from 0.0.0.0/0. The company needs to be notified if there is any breach in the policy. A solution is needed as soon as possible.
What should the solutions architect do to meet these requirements with the LEAST operational overhead?

- **A.** Write an AWS Lambda script that monitors security groups for SSH being open to 0.0.0.0/0 addresses and creates a notification every time it finds one.
- **B.** Enable the restricted-ssh AWS Config managed rule and generate an Amazon Simple Notification Service (Amazon SNS) notification when a noncompliant rule is created. ✅
- **C.** Create an IAM role with permissions to globally open security groups and network ACLs. Create an Amazon Simple Notification Service (Amazon SNS) topic to generate a notification every time the role is assumed by a user.
- **D.** Configure a service control policy (SCP) that prevents non-administrative users from creating or editing security groups. Create a notification in the ticketing system when a user requests a rule that needs administrator permissions.

**Answer:** B

**Explanation:**

Correct Answer:Enable the restricted-ssh AWS Config managed rule and generate an Amazon Simple Notification Service (Amazon SNS) notification when a noncompliant rule is created.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable the restricted-ssh AWS Config managed rule and generate an Amazon Simple Notification Service (Amazon SNS) notification when a noncompliant rule is created. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Write an AWS Lambda script that monitors security groups for SSH being open to 0.0.0.0/0 addresses and creates a notification every time it finds one. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM role with permissions to globally open security groups and network ACLs. Create an Amazon Simple Notification Service (Amazon SNS) topic to generate a notification every time the role is assumed by a user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a service control policy (SCP) that prevents non-administrative users from creating or editing security groups. Create a notification in the ticketing system when a user requests a rule that needs administrator permissions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 247

A solutions architect is designing the architecture for a software demonstration environment. The environment will run on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB). The system will experience significant increases in traffic during working hours but is not required to operate on weekends.
Which combination of actions should the solutions architect take to ensure that the system can scale to meet demand? (Choose two.)

- **A.** Use AWS Auto Scaling to adjust the ALB capacity based on request rate.
- **B.** Use AWS Auto Scaling to scale the capacity of the VPC internet gateway.
- **C.** Use a target tracking scaling policy to scale the Auto Scaling group based on instance CPU utilization. ✅
- **D.** Launch the EC2 instances in multiple AWS Regions to distribute the load across Regions.
- **E.** Use scheduled scaling to change the Auto Scaling group minimum, maximum, and desired capacity to zero for weekends. Revert to the default values at the start of the week. ✅

**Answer:** C, E

**Explanation:**

Correct Answer:Use a target tracking scaling policy to scale the Auto Scaling group based on instance CPU utilization.; Use scheduled scaling to change the Auto Scaling group minimum, maximum, and desired capacity to zero for weekends. Revert to the default values at the start of the week.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use a target tracking scaling policy to scale the Auto Scaling group based on instance CPU utilization. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use scheduled scaling to change the Auto Scaling group minimum, maximum, and desired capacity to zero for weekends. Revert to the default values at the start of the week. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Auto Scaling to adjust the ALB capacity based on request rate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Auto Scaling to scale the capacity of the VPC internet gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch the EC2 instances in multiple AWS Regions to distribute the load across Regions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 248

A company built an application with Docker containers and needs to run the application in the AWS Cloud. The company wants to use a managed service to host the application.
The solution must scale in and out appropriately according to demand on the individual container services. The solution also must not result in additional operational overhead or infrastructure to manage.
Which solutions will meet these requirements? (Choose two.)

- **A.** Use Amazon Elastic Container Service (Amazon ECS) with Amazon EC2 worker nodes.
- **B.** Use Amazon Elastic Kubernetes Service (Amazon EKS) with Amazon EC2 worker nodes.
- **C.** Use Amazon Elastic Container Service (Amazon ECS) with AWS Fargate. ✅
- **D.** Use Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate. ✅
- **E.** Provision an Amazon API Gateway API. Connect the API to AWS Lambda to run the containers.

**Answer:** C, D

**Explanation:**

Correct Answer:Use Amazon Elastic Container Service (Amazon ECS) with AWS Fargate.; Use Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Elastic Container Service (Amazon ECS) with AWS Fargate. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Elastic Container Service (Amazon ECS) with Amazon EC2 worker nodes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Kubernetes Service (Amazon EKS) with Amazon EC2 worker nodes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an Amazon API Gateway API. Connect the API to AWS Lambda to run the containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 249

A company stores data in an on-premises Oracle relational database. The company needs to make the data available in Amazon Aurora PostgreSQL for analysis. The company uses an AWS Site-to-Site VPN connection to connect its on-premises network to AWS.
The company must capture the changes that occur to the source database during the migration to Aurora PostgreSQL.
Which solution will meet these requirements?

- **A.** Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle schema to Aurora PostgreSQL schema. Use AWS Database Migration Service (AWS DMS) to migrate the existing data and replicate the ongoing changes. ✅
- **B.** Use AWS DataSync to migrate the data to an Amazon S3 bucket. Import the S3 data to Aurora PostgreSQL by using the Aurora PostgreSQL aws_s3 extension.
- **C.** Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle schema to Aurora PostgreSQL schema. Use the AWS Database Migration Service (AWS DMS) full-load migration task to migrate the data.
- **D.** Use an AWS Snowball device to migrate the data to an Amazon S3 bucket. Import the S3 data to Aurora PostgreSQL by using the Aurora PostgreSQL aws_s3 extension.

**Answer:** A

**Explanation:**

Correct Answer:Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle schema to Aurora PostgreSQL schema. Use AWS Database Migration Service (AWS DMS) to migrate the existing data and replicate the ongoing changes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle schema to Aurora PostgreSQL schema. Use AWS Database Migration Service (AWS DMS) to migrate the existing data and replicate the ongoing changes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS DataSync to migrate the data to an Amazon S3 bucket. Import the S3 data to Aurora PostgreSQL by using the Aurora PostgreSQL aws_s3 extension. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle schema to Aurora PostgreSQL schema. Use the AWS Database Migration Service (AWS DMS) full-load migration task to migrate the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Snowball device to migrate the data to an Amazon S3 bucket. Import the S3 data to Aurora PostgreSQL by using the Aurora PostgreSQL aws_s3 extension. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 250

A company’s application is deployed on Amazon EC2 instances for an event-driven architecture. The company uses nonproduction development environments in a different AWS account to test new features before the company deploys the features to production.
The production instances show constant usage because of customers in different time zones. The company uses nonproduction instances only during business hours on weekdays. The company does not use the nonproduction instances on the weekends. The company wants to optimize the costs to run its application on AWS.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Use On-Demand Instances for the production instances. Use Dedicated Hosts for the nonproduction instances on weekends only.
- **B.** Use Reserved Instances for the production instances and the nonproduction instances. Shut down the nonproduction instances when not in use.
- **C.** Use Compute Savings Plans for the production instances. Use On-Demand Instances for the nonproduction instances. Shut down the nonproduction instances when not in use. ✅
- **D.** Use Dedicated Hosts for the production instances. Use EC2 Instance Savings Plans for the nonproduction instances.

**Answer:** C

**Explanation:**

Correct Answer:Use Compute Savings Plans for the production instances. Use On-Demand Instances for the nonproduction instances. Shut down the nonproduction instances when not in use.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Compute Savings Plans for the production instances. Use On-Demand Instances for the nonproduction instances. Shut down the nonproduction instances when not in use. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use On-Demand Instances for the production instances. Use Dedicated Hosts for the nonproduction instances on weekends only. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Reserved Instances for the production instances and the nonproduction instances. Shut down the nonproduction instances when not in use. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Dedicated Hosts for the production instances. Use EC2 Instance Savings Plans for the nonproduction instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 251

A company hosts an application used to upload files to an Amazon S3 bucket. Once uploaded, the files are processed to extract metadata, which takes less than 5 seconds. The volume and frequency of the uploads varies from a few files each hour to hundreds of concurrent uploads. The company has asked a solutions architect to design a cost-effective architecture that will meet these requirements.
What should the solutions architect recommend?

- **A.** Configure AWS CloudTrail trails to log S3 API calls. Use AWS AppSync to process the files.
- **B.** Configure an object-created event notification within the S3 bucket to invoke an AWS Lambda function to process the files. ✅
- **C.** Configure Amazon Kinesis Data Streams to process and send data to Amazon S3. Invoke an AWS Lambda function to process the files.
- **D.** Configure an Amazon Simple Notification Service (Amazon SNS) topic to process the files uploaded to Amazon S3. Invoke an AWS Lambda function to process the files.

**Answer:** B

**Explanation:**

Correct Answer:Configure an object-created event notification within the S3 bucket to invoke an AWS Lambda function to process the files.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an object-created event notification within the S3 bucket to invoke an AWS Lambda function to process the files. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS CloudTrail trails to log S3 API calls. Use AWS AppSync to process the files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Kinesis Data Streams to process and send data to Amazon S3. Invoke an AWS Lambda function to process the files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Amazon Simple Notification Service (Amazon SNS) topic to process the files uploaded to Amazon S3. Invoke an AWS Lambda function to process the files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 252

A company has a business-critical application that runs on Amazon EC2 instances. The application stores data in an Amazon DynamoDB table. The company must be able to revert the table to any point within the last 24 hours.
Which solution meets these requirements with the LEAST operational overhead?

- **A.** Turn on streams on the table to capture a log of all changes to the table in the last 24 hours. Store a copy of the stream in an Amazon S3 bucket.
- **B.** Use an AWS Lambda function to make an on-demand backup of the table every hour.
- **C.** Use AWS Backup for the table.
- **D.** Configure point-in-time recovery for the table. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure point-in-time recovery for the table.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure point-in-time recovery for the table. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Turn on streams on the table to capture a log of all changes to the table in the last 24 hours. Store a copy of the stream in an Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Lambda function to make an on-demand backup of the table every hour. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Backup for the table. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 253

A pharmaceutical company is developing a new drug. The volume of data that the company generates has grown exponentially over the past few months. The company's researchers regularly require a subset of the entire dataset to be immediately available with minimal lag. However, the entire dataset does not need to be accessed on a daily basis. All the data currently resides in on-premises storage arrays, and the company wants to reduce ongoing capital expenses.
Which storage solution should a solutions architect recommend to meet these requirements?

- **A.** Run AWS DataSync as a scheduled cron job to migrate the data to an Amazon S3 bucket on an ongoing basis.
- **B.** Configure an AWS Site-to-Site VPN connection from the on-premises environment to AWS. Migrate data to an Amazon Elastic File System (Amazon EFS) file system.
- **C.** Deploy an AWS Storage Gateway file gateway with an Amazon S3 bucket as the target storage. Migrate the data to the Storage Gateway appliance.
- **D.** Deploy an AWS Storage Gateway volume gateway with cached volumes with an Amazon S3 bucket as the target storage. Migrate the data to the Storage Gateway appliance. ✅

**Answer:** D

**Explanation:**

Correct Answer:Deploy an AWS Storage Gateway volume gateway with cached volumes with an Amazon S3 bucket as the target storage. Migrate the data to the Storage Gateway appliance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy an AWS Storage Gateway volume gateway with cached volumes with an Amazon S3 bucket as the target storage. Migrate the data to the Storage Gateway appliance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Run AWS DataSync as a scheduled cron job to migrate the data to an Amazon S3 bucket on an ongoing basis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an AWS Site-to-Site VPN connection from the on-premises environment to AWS. Migrate data to an Amazon Elastic File System (Amazon EFS) file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an AWS Storage Gateway file gateway with an Amazon S3 bucket as the target storage. Migrate the data to the Storage Gateway appliance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 254

A company’s developers want a secure way to gain SSH access on the company's Amazon EC2 instances that run the latest version of Amazon Linux. The developers work remotely and in the corporate office.
The company wants to use AWS services as a part of the solution. The EC2 instances are hosted in a VPC private subnet and access the internet through a NAT gateway that is deployed in a public subnet.
What should a solutions architect do to meet these requirements MOST cost-effectively?

- **A.** Attach the AmazonSSMManagedInstanceCore IAM policy to an IAM role that is associated with the EC2 instances. Instruct the developers to use AWS Systems Manager Session Manager to access the EC2 instances. ✅
- **B.** Create an AWS Site-to-Site VPN connection between the corporate network and the VPC. Instruct the developers to use the Site-to-Site VPN connection to access the EC2 instances when the developers are on the corporate network. Instruct the developers to set up another VPN connection for access when they work remotely.
- **C.** Create a bastion host in the same subnet as the EC2 instances. Grant the ec2:CreateVpnConnection IAM permission to the developers. Install EC2 Instance Connect so that the developers can connect to the EC2 instances.
- **D.** Create a bastion host in the public subnet of the VPConfigure the security groups and SSH keys of the bastion host to only allow connections and SSH authentication from the developers’ corporate and remote networks. Instruct the developers to connect through the bastion host by using SSH to reach the EC2 instances.

**Answer:** A

**Explanation:**

Correct Answer:Attach the AmazonSSMManagedInstanceCore IAM policy to an IAM role that is associated with the EC2 instances. Instruct the developers to use AWS Systems Manager Session Manager to access the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Attach the AmazonSSMManagedInstanceCore IAM policy to an IAM role that is associated with the EC2 instances. Instruct the developers to use AWS Systems Manager Session Manager to access the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Site-to-Site VPN connection between the corporate network and the VPC. Instruct the developers to use the Site-to-Site VPN connection to access the EC2 instances when the developers are on the corporate network. Instruct the developers to set up another VPN connection for access when they work remotely. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a bastion host in the same subnet as the EC2 instances. Grant the ec2:CreateVpnConnection IAM permission to the developers. Install EC2 Instance Connect so that the developers can connect to the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a bastion host in the public subnet of the VPConfigure the security groups and SSH keys of the bastion host to only allow connections and SSH authentication from the developers' corporate and remote networks. Instruct the developers to connect through the bastion host by using SSH to reach the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 255

A company's website handles millions of requests each day, and the number of requests continues to increase. A solutions architect needs to improve the response time of the web application. The solutions architect determines that the application needs to decrease latency when retrieving product details from the Amazon DynamoDB table.
Which solution will meet these requirements with the LEAST amount of operational overhead?

- **A.** Set up a DynamoDB Accelerator (DAX) cluster. Route all read requests through DAX. ✅
- **B.** Set up Amazon ElastiCache for Redis between the DynamoDB table and the web application. Route all read requests through Redis.
- **C.** Set up Amazon DynamoDB Streams on the table, and have AWS Lambda read from the table and populate Amazon ElastiCache. Route all read requests through ElastiCache.
- **D.** Set up Amazon ElastiCache for Memcached between the DynamoDB table and the web application. Route all read requests through Memcached.

**Answer:** A

**Explanation:**

Correct Answer:Set up a DynamoDB Accelerator (DAX) cluster. Route all read requests through DAX.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up a DynamoDB Accelerator (DAX) cluster. Route all read requests through DAX. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up Amazon ElastiCache for Redis between the DynamoDB table and the web application. Route all read requests through Redis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up Amazon DynamoDB Streams on the table, and have AWS Lambda read from the table and populate Amazon ElastiCache. Route all read requests through ElastiCache. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up Amazon ElastiCache for Memcached between the DynamoDB table and the web application. Route all read requests through Memcached. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 256

A company wants to migrate its three-tier application from on premises to AWS. The web tier and the application tier are running on third-party virtual machines (VMs). The database tier is running on MySQL.
The company needs to migrate the application by making the fewest possible changes to the architecture. The company also needs a database solution that can restore data to a specific point in time.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Migrate the web tier and the application tier to Amazon EC2 instances in public subnets. Migrate the database tier to Amazon Aurora MySQL in public subnets.
- **B.** Migrate the web tier to Amazon EC2 instances in public subnets. Migrate the application tier to EC2 instances in private subnets. Migrate the database tier to Amazon RDS for MySQL in private subnets.
- **C.** Migrate the web tier to Amazon EC2 instances in public subnets. Migrate the application tier to EC2 instances in private subnets. Migrate the database tier to Amazon Aurora MySQL in private subnets. ✅
- **D.** Migrate the web tier and the application tier to Amazon EC2 instances in private subnets. Migrate the database tier to Amazon RDS for MySQL in private subnets.

**Answer:** C

**Explanation:**

Correct Answer:Migrate the web tier to Amazon EC2 instances in public subnets. Migrate the application tier to EC2 instances in private subnets. Migrate the database tier to Amazon Aurora MySQL in private subnets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the web tier to Amazon EC2 instances in public subnets. Migrate the application tier to EC2 instances in private subnets. Migrate the database tier to Amazon Aurora MySQL in private subnets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the web tier and the application tier to Amazon EC2 instances in public subnets. Migrate the database tier to Amazon Aurora MySQL in public subnets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the web tier to Amazon EC2 instances in public subnets. Migrate the application tier to EC2 instances in private subnets. Migrate the database tier to Amazon RDS for MySQL in private subnets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the web tier and the application tier to Amazon EC2 instances in private subnets. Migrate the database tier to Amazon RDS for MySQL in private subnets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 257

A company has 150 TB of archived image data stored on-premises that needs to be moved to the AWS Cloud within the next month. The company’s current network connection allows up to 100 Mbps uploads for this purpose during the night only.
What is the MOST cost-effective mechanism to move this data and meet the migration deadline?

- **A.** Use AWS Datasync to migrate data to AWS.
- **B.** Order AWS Snowball devices to ship the data to AWS. ✅
- **C.** Enable Amazon S3 Transfer Acceleration and securely upload the data.
- **D.** Create an Amazon S3 VPC endpoint and establish a VPN to upload the data.

**Answer:** B

**Explanation:**

Correct Answer:Order AWS Snowball devices to ship the data to AWS.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Order AWS Snowball devices to ship the data to AWS. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Datasync to migrate data to AWS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable Amazon S3 Transfer Acceleration and securely upload the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 VPC endpoint and establish a VPN to upload the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 258

A company stores data in Amazon S3. According to regulations, the data must not contain personally identifiable information (PII). The company recently discovered that S3 buckets have some objects that contain PII. The company needs to automatically detect PII in S3 buckets and to notify the company's security team.
Which solution will meet these requirements?

- **A.** Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team.
- **B.** Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team.
- **C.** Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData event type from Macie findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team. ✅
- **D.** Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData:S3Object/Personal event type from Macie findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData event type from Macie findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData event type from Macie findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Notification Service (Amazon SNS) notification to the security team. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon GuardDuty. Create an Amazon EventBridge rule to filter the CRITICAL event type from GuardDuty findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Macie. Create an Amazon EventBridge rule to filter the SensitiveData:S3Object/Personal event type from Macie findings and to send an Amazon Simple Queue Service (Amazon SQS) notification to the security team. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 259

A company needs to use its on-premises LDAP directory service to authenticate its users to the AWS Management Console. The directory service is not compatible with Security Assertion Markup Language (SAML).
Which solution meets these requirements?

- **A.** Develop an on-premises custom identity broker application or process that uses AWS Security Token Service (AWS STS) to get short-lived credentials. ✅
- **B.** Set up a process that rotates the IAM credentials whenever LDAP credentials are updated.
- **C.** Create an IAM policy that uses AWS credentials, and integrate the policy into LDAP.
- **D.** Enable AWS IAM Identity Center (AWS Single Sign-On) between AWS and the on-premises LDAP.

**Answer:** A

**Explanation:**

Correct Answer:Develop an on-premises custom identity broker application or process that uses AWS Security Token Service (AWS STS) to get short-lived credentials.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Develop an on-premises custom identity broker application or process that uses AWS Security Token Service (AWS STS) to get short-lived credentials. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up a process that rotates the IAM credentials whenever LDAP credentials are updated. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM policy that uses AWS credentials, and integrate the policy into LDAP. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable AWS IAM Identity Center (AWS Single Sign-On) between AWS and the on-premises LDAP. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 260

A developer has an application that uses an AWS Lambda function to upload files to Amazon S3 and needs the required permissions to perform the task. The developer already has an IAM user with valid IAM credentials required for Amazon S3.
What should a solutions architect do to grant the permissions?

- **A.** Create a new IAM user and use the existing IAM credentials in the Lambda function.
- **B.** Create a signed request using the existing IAM credentials in the Lambda function.
- **C.** Add required IAM permissions in the resource policy of the Lambda function.
- **D.** Create an IAM execution role with the required permissions and attach the IAM role to the Lambda function. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an IAM execution role with the required permissions and attach the IAM role to the Lambda function.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an IAM execution role with the required permissions and attach the IAM role to the Lambda function. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new IAM user and use the existing IAM credentials in the Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a signed request using the existing IAM credentials in the Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add required IAM permissions in the resource policy of the Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 261

A media company stores movies in Amazon S3. Each movie is stored in a single video file that ranges from 1 GB to 10 GB in size.
The company must be able to provide the streaming content of a movie within 5 minutes of a user purchase. There is higher demand for movies that are less than 20 years old than for movies that are more than 20 years old. The company wants to minimize hosting service costs based on demand.
Which solution will meet these requirements?

- **A.** Store newer movie video files in S3 Intelligent-Tiering. Store older movie video files in S3 Glacier Flexible Retrieval. When a user orders an older movie, retrieve the video file by using expedited retrieval.
- **B.** Store newer movie video files in S3 Standard. Store older movie video files in S3 Standard-infrequent Access (S3 Standard-IA). When a user orders an older movie, retrieve the video file by using standard retrieval. ✅
- **C.** Store all media content in Amazon S3. Use S3 Lifecycle policies to move media data into the Infrequent Access tier when the demand for a movie decreases.
- **D.** Store newer movie video files in S3 Standard. Store older movie video files in S3 Glacier Flexible Retrieval. When a user orders an older movie, retrieve the video file by using bulk retrieval.

**Answer:** B

**Explanation:**

Correct Answer:Store newer movie video files in S3 Standard. Store older movie video files in S3 Standard-infrequent Access (S3 Standard-IA). When a user orders an older movie, retrieve the video file by using standard retrieval.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store newer movie video files in S3 Standard. Store older movie video files in S3 Standard-infrequent Access (S3 Standard-IA). When a user orders an older movie, retrieve the video file by using standard retrieval. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store newer movie video files in S3 Intelligent-Tiering. Store older movie video files in S3 Glacier Flexible Retrieval. When a user orders an older movie, retrieve the video file by using expedited retrieval. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store all media content in Amazon S3. Use S3 Lifecycle policies to move media data into the Infrequent Access tier when the demand for a movie decreases. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store newer movie video files in S3 Standard. Store older movie video files in S3 Glacier Flexible Retrieval. When a user orders an older movie, retrieve the video file by using bulk retrieval. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 262

A company wants to deploy its containerized application workloads to a VPC across three Availability Zones. The company needs a solution that is highly available across Availability Zones. The solution must require minimal changes to the application.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use an AWS Lambda function. Configure the Lambda function to connect to a VPC. Configure Application Auto Scaling to use Lambda as a scalable target. Set the minimum capacity to 3.
- **B.** Use Amazon EC2 Reserved Instances. Launch three EC2 instances in a spread placement group. Configure an Auto Scaling group to use target tracking scaling. Set the minimum capacity to 3.
- **C.** Use Amazon Elastic Container Service (Amazon ECS). Configure Amazon ECS Service Auto Scaling to use target tracking scaling. Set the minimum capacity to 3. Set the task placement strategy type to spread with an Availability Zone attribute. ✅
- **D.** Use Amazon Elastic Kubernetes Service (Amazon EKS) self-managed nodes. Configure Application Auto Scaling to use target tracking scaling. Set the minimum capacity to 3.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon Elastic Container Service (Amazon ECS). Configure Amazon ECS Service Auto Scaling to use target tracking scaling. Set the minimum capacity to 3. Set the task placement strategy type to spread with an Availability Zone attribute.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Elastic Container Service (Amazon ECS). Configure Amazon ECS Service Auto Scaling to use target tracking scaling. Set the minimum capacity to 3. Set the task placement strategy type to spread with an Availability Zone attribute. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS Lambda function. Configure the Lambda function to connect to a VPC. Configure Application Auto Scaling to use Lambda as a scalable target. Set the minimum capacity to 3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon EC2 Reserved Instances. Launch three EC2 instances in a spread placement group. Configure an Auto Scaling group to use target tracking scaling. Set the minimum capacity to 3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Kubernetes Service (Amazon EKS) self-managed nodes. Configure Application Auto Scaling to use target tracking scaling. Set the minimum capacity to 3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 263

A company is running a legacy system on an Amazon EC2 instance. The application code cannot be modified, and the system cannot run on more than one instance. A solutions architect must design a resilient solution that can improve the recovery time for the system.
What should the solutions architect recommend to meet these requirements?

- **A.** Create an Amazon CloudWatch alarm to recover the EC2 instance in case of failure. ✅
- **B.** Launch the EC2 instance with two Amazon Elastic Block Store (Amazon EBS) volumes that use RAID configurations for storage redundancy.
- **C.** Configure the EC2 instance for Multi-AZ deployment.
- **D.** Enable termination protection for the EC2 instance.

**Answer:** A

**Explanation:**

Correct Answer:Create an Amazon CloudWatch alarm to recover the EC2 instance in case of failure.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon CloudWatch alarm to recover the EC2 instance in case of failure. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Launch the EC2 instance with two Amazon Elastic Block Store (Amazon EBS) volumes that use RAID configurations for storage redundancy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the EC2 instance for Multi-AZ deployment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable termination protection for the EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 264

A company stores text files in Amazon S3. The text files include customer chat messages, date and time information, and customer personally identifiable information (PII).
The company needs a solution to provide samples of the conversations to an external service provider for quality control. The external service provider needs to randomly pick sample conversations up to the most recent conversation. The company must not share the customer PII with the external service provider. The solution must scale when the number of customer conversations increases.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Object Lambda Access Point. Create an AWS Lambda function that redacts the PII when the function reads the file. Instruct the external service provider to access the Object Lambda Access Point. ✅
- **B.** Create a batch process on an Amazon EC2 instance that regularly reads all new files, redacts the PII from the files, and writes the redacted files to a different S3 bucket. Instruct the external service provider to access the bucket that does not contain the PII.
- **C.** Create a web application on an Amazon EC2 instance that presents a list of the files, redacts the PII from the files, and allows the external service provider to download new versions of the files that have the PII redacted.
- **D.** Create an Amazon DynamoDB table. Create an AWS Lambda function that reads only the data in the files that does not contain PII. Configure the Lambda function to store the non-PII data in the DynamoDB table when a new file is written to Amazon S3. Grant the external service provider access to the DynamoDB table.

**Answer:** A

**Explanation:**

Correct Answer:Create an Object Lambda Access Point. Create an AWS Lambda function that redacts the PII when the function reads the file. Instruct the external service provider to access the Object Lambda Access Point.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Object Lambda Access Point. Create an AWS Lambda function that redacts the PII when the function reads the file. Instruct the external service provider to access the Object Lambda Access Point. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a batch process on an Amazon EC2 instance that regularly reads all new files, redacts the PII from the files, and writes the redacted files to a different S3 bucket. Instruct the external service provider to access the bucket that does not contain the PII. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a web application on an Amazon EC2 instance that presents a list of the files, redacts the PII from the files, and allows the external service provider to download new versions of the files that have the PII redacted. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon DynamoDB table. Create an AWS Lambda function that reads only the data in the files that does not contain PII. Configure the Lambda function to store the non-PII data in the DynamoDB table when a new file is written to Amazon S3. Grant the external service provider access to the DynamoDB table. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 265

A company’s data platform uses an Amazon Aurora MySQL database. The database has multiple read replicas and multiple DB instances across different Availability Zones. Users have recently reported errors from the database that indicate that there are too many connections. The company wants to reduce the failover time by 20% when a read replica is promoted to primary writer.
Which solution will meet this requirement?

- **A.** Switch to Amazon Redshift with relocation capability.
- **B.** Switch from Aurora to Amazon RDS with Multi-AZ cluster deployment.
- **C.** Use Amazon RDS Proxy in front of the Aurora database. ✅
- **D.** Switch to Amazon DynamoDB with DynamoDB Accelerator (DAX) for read connections.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon RDS Proxy in front of the Aurora database.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon RDS Proxy in front of the Aurora database. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Switch to Amazon Redshift with relocation capability. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Switch from Aurora to Amazon RDS with Multi-AZ cluster deployment. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Switch to Amazon DynamoDB with DynamoDB Accelerator (DAX) for read connections. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 266

A company has users all around the world accessing its HTTP-based application deployed on Amazon EC2 instances in multiple AWS Regions. The company wants to improve the availability and performance of the application. The company also wants to protect the application against common web exploits that may affect availability, compromise security, or consume excessive resources. Static IP addresses are required.
What should a solutions architect recommend to accomplish this?

- **A.** Put the EC2 instances behind Application Load Balancers (ALBs) in each Region. Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the ALBs. Deploy AWS WAF on the CloudFront distribution.
- **B.** Put the EC2 instances behind Network Load Balancers (NLBs) in each Region. Deploy AWS WAF on the NLBs. Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the NLBs.
- **C.** Put the EC2 instances behind Application Load Balancers (ALBs) in each Region. Deploy AWS WAF on the ALBs. Create an accelerator using AWS Global Accelerator and register the ALBs as endpoints. ✅
- **D.** Put the EC2 instances behind Network Load Balancers (NLBs) in each Region. Deploy AWS WAF on the NLBs. Create an accelerator using AWS Global Accelerator and register the NLBs as endpoints.

**Answer:** C

**Explanation:**

Correct Answer:Put the EC2 instances behind Application Load Balancers (ALBs) in each Region. Deploy AWS WAF on the ALBs. Create an accelerator using AWS Global Accelerator and register the ALBs as endpoints.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Put the EC2 instances behind Application Load Balancers (ALBs) in each Region. Deploy AWS WAF on the ALBs. Create an accelerator using AWS Global Accelerator and register the ALBs as endpoints. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Put the EC2 instances behind Application Load Balancers (ALBs) in each Region. Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the ALBs. Deploy AWS WAF on the CloudFront distribution. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Put the EC2 instances behind Network Load Balancers (NLBs) in each Region. Deploy AWS WAF on the NLBs. Create an Amazon CloudFront distribution with an origin that uses Amazon Route 53 latency-based routing to route requests to the NLBs. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Put the EC2 instances behind Network Load Balancers (NLBs) in each Region. Deploy AWS WAF on the NLBs. Create an accelerator using AWS Global Accelerator and register the NLBs as endpoints. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 267

A company has a nightly batch processing routine that analyzes report files that an on-premises file system receives daily through SFTP. The company wants to move the solution to the AWS Cloud. The solution must be highly available and resilient. The solution also must minimize operational effort.
Which solution meets these requirements?

- **A.** Deploy AWS Transfer for SFTP and an Amazon S3 bucket for storage. Modify the application to pull the batch files from Amazon S3 to an Amazon EC2 instance for processing. Use an EC2 instance in an Auto Scaling group with a scheduled scaling policy to run the batch operation.
- **B.** Deploy AWS Transfer for SFTP and an Amazon Elastic File System (Amazon EFS) file system for storage. Use an Amazon EC2 instance in an Auto Scaling group with a scheduled scaling policy to run the batch operation. ✅
- **C.** Deploy an Amazon EC2 instance that runs Linux and an SFTP service. Use an Amazon Elastic Block Store (Amazon EBS) volume for storage. Use an Auto Scaling group with the minimum number of instances and desired number of instances set to 1.
- **D.** Deploy an Amazon EC2 instance that runs Linux and an SFTP service. Use an Amazon Elastic File System (Amazon EFS) file system for storage. Use an Auto Scaling group with the minimum number of instances and desired number of instances set to 1.

**Answer:** B

**Explanation:**

Correct Answer:Deploy AWS Transfer for SFTP and an Amazon Elastic File System (Amazon EFS) file system for storage. Use an Amazon EC2 instance in an Auto Scaling group with a scheduled scaling policy to run the batch operation.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy AWS Transfer for SFTP and an Amazon Elastic File System (Amazon EFS) file system for storage. Use an Amazon EC2 instance in an Auto Scaling group with a scheduled scaling policy to run the batch operation. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy AWS Transfer for SFTP and an Amazon S3 bucket for storage. Modify the application to pull the batch files from Amazon S3 to an Amazon EC2 instance for processing. Use an EC2 instance in an Auto Scaling group with a scheduled scaling policy to run the batch operation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Amazon EC2 instance that runs Linux and an SFTP service. Use an Amazon Elastic Block Store (Amazon EBS) volume for storage. Use an Auto Scaling group with the minimum number of instances and desired number of instances set to 1. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Amazon EC2 instance that runs Linux and an SFTP service. Use an Amazon Elastic File System (Amazon EFS) file system for storage. Use an Auto Scaling group with the minimum number of instances and desired number of instances set to 1. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 268

A company has a multi-tier payment processing application that is based on virtual machines (VMs). The communication between the tiers occurs asynchronously through a third-party middleware solution that guarantees exactly-once delivery.
The company needs a solution that requires the least amount of infrastructure management. The solution must guarantee exactly-once delivery for application messaging.
Which combination of actions will meet these requirements? (Choose two.)

- **A.** Use AWS Lambda for the compute layers in the architecture. ✅
- **B.** Use Amazon EC2 instances for the compute layers in the architecture.
- **C.** Use Amazon Simple Notification Service (Amazon SNS) as the messaging component between the compute layers.
- **D.** Use Amazon Simple Queue Service (Amazon SQS) FIFO queues as the messaging component between the compute layers. ✅
- **E.** Use containers that are based on Amazon Elastic Kubernetes Service (Amazon EKS) for the compute layers in the architecture.

**Answer:** A, D

**Explanation:**

Correct Answer:Use AWS Lambda for the compute layers in the architecture.; Use Amazon Simple Queue Service (Amazon SQS) FIFO queues as the messaging component between the compute layers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Lambda for the compute layers in the architecture. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use Amazon Simple Queue Service (Amazon SQS) FIFO queues as the messaging component between the compute layers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon EC2 instances for the compute layers in the architecture. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Simple Notification Service (Amazon SNS) as the messaging component between the compute layers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use containers that are based on Amazon Elastic Kubernetes Service (Amazon EKS) for the compute layers in the architecture. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 269

A solutions architect is designing an AWS Identity and Access Management (IAM) authorization model for a company's AWS account. The company has designated five specific employees to have full access to AWS services and resources in the AWS account.
The solutions architect has created an IAM user for each of the five designated employees and has created an IAM user group.
Which solution will meet these requirements?

- **A.** Attach the AdministratorAccess resource-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group.
- **B.** Attach the SystemAdministrator identity-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group.
- **C.** Attach the AdministratorAccess identity-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group. ✅
- **D.** Attach the SystemAdministrator resource-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group.

**Answer:** C

**Explanation:**

Correct Answer:Attach the AdministratorAccess identity-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Attach the AdministratorAccess identity-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach the AdministratorAccess resource-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach the SystemAdministrator identity-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach the SystemAdministrator resource-based policy to the IAM user group. Place each of the five designated employee IAM users in the IAM user group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 270

A company sets up an organization in AWS Organizations that contains 10 AWS accounts. A solutions architect must design a solution to provide access to the accounts for several thousand employees. The company has an existing identity provider (IdP). The company wants to use the existing IdP for authentication to AWS.
Which solution will meet these requirements?

- **A.** Use AWS Resource Access Manager (AWS RAM) to share access to the AWS accounts with the users in the existing IdP.
- **B.** Configure AWS IAM Identity Center (AWS Single Sign-On). Connect IAM Identity Center to the existing IdP. Provision users and groups from the existing IdP. ✅
- **C.** Create IAM users for the employees in the required AWS accounts. Connect IAM users to the existing IdP. Configure federated authentication for the IAM users.
- **D.** Set up AWS account root users with user email addresses and passwords that are synchronized from the existing IdP.

**Answer:** B

**Explanation:**

Correct Answer:Configure AWS IAM Identity Center (AWS Single Sign-On). Connect IAM Identity Center to the existing IdP. Provision users and groups from the existing IdP.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure AWS IAM Identity Center (AWS Single Sign-On). Connect IAM Identity Center to the existing IdP. Provision users and groups from the existing IdP. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Resource Access Manager (AWS RAM) to share access to the AWS accounts with the users in the existing IdP. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create IAM users for the employees in the required AWS accounts. Connect IAM users to the existing IdP. Configure federated authentication for the IAM users. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS account root users with user email addresses and passwords that are synchronized from the existing IdP. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 271

A company’s website is used to sell products to the public. The site runs on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB). There is also an Amazon CloudFront distribution, and AWS WAF is being used to protect against SQL injection attacks. The ALB is the origin for the CloudFront distribution. A recent review of security logs revealed an external malicious IP that needs to be blocked from accessing the website.
What should a solutions architect do to protect the application?

- **A.** Modify the network ACL for the EC2 instances in the target groups behind the ALB to deny the malicious IP address.
- **B.** Modify the configuration of AWS WAF to add an IP match condition to block the malicious IP address. ✅
- **C.** Modify the security groups for the EC2 instances in the target groups behind the ALB to deny the malicious IP address.
- **D.** Modify the network ACL on the CloudFront distribution to add a deny rule for the malicious IP address.

**Answer:** B

**Explanation:**

Correct Answer:Modify the configuration of AWS WAF to add an IP match condition to block the malicious IP address.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Modify the configuration of AWS WAF to add an IP match condition to block the malicious IP address. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Modify the network ACL for the EC2 instances in the target groups behind the ALB to deny the malicious IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Modify the security groups for the EC2 instances in the target groups behind the ALB to deny the malicious IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Modify the network ACL on the CloudFront distribution to add a deny rule for the malicious IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 272

A company uses an organization in AWS Organizations to manage AWS accounts that contain applications. The company sets up a dedicated monitoring member account in the organization. The company wants to query and visualize observability data across the accounts by using Amazon CloudWatch.
Which solution will meet these requirements?

- **A.** Create a new IAM user in the monitoring account. Create cross-account IAM policies in each AWS account. Attach the IAM policies to the new IAM user.
- **B.** Configure a new IAM user in the monitoring account. In each AWS account, configure an IAM policy to have access to query and visualize the CloudWatch data in the account. Attach the new IAM policy to the new IAM user.
- **C.** Set up service control policies (SCPs) to provide access to CloudWatch in the monitoring account under the Organizations root organizational unit (OU).
- **D.** Enable CloudWatch cross-account observability for the monitoring account. Deploy an AWS CloudFormation template provided by the monitoring account in each AWS account to share the data with the monitoring account. ✅

**Answer:** D

**Explanation:**

Correct Answer:Enable CloudWatch cross-account observability for the monitoring account. Deploy an AWS CloudFormation template provided by the monitoring account in each AWS account to share the data with the monitoring account.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable CloudWatch cross-account observability for the monitoring account. Deploy an AWS CloudFormation template provided by the monitoring account in each AWS account to share the data with the monitoring account. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a new IAM user in the monitoring account. Create cross-account IAM policies in each AWS account. Attach the IAM policies to the new IAM user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a new IAM user in the monitoring account. In each AWS account, configure an IAM policy to have access to query and visualize the CloudWatch data in the account. Attach the new IAM policy to the new IAM user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up service control policies (SCPs) to provide access to CloudWatch in the monitoring account under the Organizations root organizational unit (OU). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 273

A company is deploying an application that processes streaming data in near-real time. The company plans to use Amazon EC2 instances for the workload. The network architecture must be configurable to provide the lowest possible latency between nodes.
Which combination of network solutions will meet these requirements? (Choose two.)

- **A.** Run the EC2 instances in a cluster placement group. ✅
- **B.** Attach multiple elastic network interfaces to each EC2 instance.
- **C.** Use Amazon Elastic Block Store (Amazon EBS) optimized instance types.
- **D.** Enable and configure enhanced networking on each EC2 instance. ✅
- **E.** Group the EC2 instances in separate accounts.

**Answer:** A, D

**Explanation:**

Correct Answer:Run the EC2 instances in a cluster placement group.; Enable and configure enhanced networking on each EC2 instance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Run the EC2 instances in a cluster placement group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Enable and configure enhanced networking on each EC2 instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach multiple elastic network interfaces to each EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Block Store (Amazon EBS) optimized instance types. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Group the EC2 instances in separate accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 274

A company has established a new AWS account. The account is newly provisioned and no changes have been made to the default settings. The company is concerned about the security of the AWS account root user.
What should be done to secure the root user?

- **A.** Create IAM users for daily administrative tasks. Enable multi-factor authentication on the root user. ✅
- **B.** Provide the root user credentials to the most senior solutions architect. Have the solutions architect use the root user for daily administration tasks.
- **C.** Create IAM users for daily administrative tasks. Disable the root user.
- **D.** Generate an access key for the root user. Use the access key for daily administration tasks instead of the AWS Management Console.

**Answer:** A

**Explanation:**

Correct Answer:Create IAM users for daily administrative tasks. Enable multi-factor authentication on the root user.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create IAM users for daily administrative tasks. Enable multi-factor authentication on the root user. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Provide the root user credentials to the most senior solutions architect. Have the solutions architect use the root user for daily administration tasks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create IAM users for daily administrative tasks. Disable the root user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Generate an access key for the root user. Use the access key for daily administration tasks instead of the AWS Management Console. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 275

A company is designing a new web service that will run on Amazon EC2 instances behind an Elastic Load Balancing (ELB) load balancer. However, many of the web service clients can only reach IP addresses authorized on their firewalls.
What should a solutions architect recommend to meet the clients’ needs?

- **A.** A Network Load Balancer with an associated Elastic IP address. ✅
- **B.** An Application Load Balancer with an associated Elastic IP address.
- **C.** An EC2 instance with a public IP address running as a proxy in front of the load balancer.
- **D.** An A record in an Amazon Route 53 hosted zone pointing to an Elastic IP address.

**Answer:** A

**Explanation:**

Correct Answer:A Network Load Balancer with an associated Elastic IP address.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- A Network Load Balancer with an associated Elastic IP address. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- An Application Load Balancer with an associated Elastic IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- An EC2 instance with a public IP address running as a proxy in front of the load balancer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- An A record in an Amazon Route 53 hosted zone pointing to an Elastic IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 276

To meet security requirements, a company needs to encrypt all of its application data in transit while communicating with an Amazon RDS MySQL DB instance. A recent security audit revealed that encryption at rest is enabled using AWS Key Management Service (AWS KMS), but data in transit is not enabled.
What should a solutions architect do to satisfy the security requirements?

- **A.** Provide self-signed certificates. Use the certificates in all connections to the RDS instance.
- **B.** Download AWS-provided root certificates. Provide the certificates in all connections to the RDS instance. ✅
- **C.** Enable IAM database authentication on the database.
- **D.** Take a snapshot of the RDS instance. Restore the snapshot to a new instance with encryption enabled.

**Answer:** B

**Explanation:**

Correct Answer:Download AWS-provided root certificates. Provide the certificates in all connections to the RDS instance.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Download AWS-provided root certificates. Provide the certificates in all connections to the RDS instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Provide self-signed certificates. Use the certificates in all connections to the RDS instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable IAM database authentication on the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Take a snapshot of the RDS instance. Restore the snapshot to a new instance with encryption enabled. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 277

A company is building an application on AWS that connects to an Amazon RDS database. The company wants to manage the application configuration and to securely store and retrieve credentials for the database and other services.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Use AWS AppConfig to store and manage the application configuration. Use AWS Secrets Manager to store and retrieve the credentials. ✅
- **B.** Use AWS AppConfig to store and manage the application configuration. Use Amazon RDS to store and retrieve the credentials.
- **C.** Use AWS Lambda to store and manage the application configuration. Use AWS Systems Manager Parameter Store to store and retrieve the credentials.
- **D.** Use an encrypted application configuration file. Store the file in Amazon S3 for the application configuration. Create another S3 file to store and retrieve the credentials.

**Answer:** A

**Explanation:**

Correct Answer:Use AWS AppConfig to store and manage the application configuration. Use AWS Secrets Manager to store and retrieve the credentials.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS AppConfig to store and manage the application configuration. Use AWS Secrets Manager to store and retrieve the credentials. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS AppConfig to store and manage the application configuration. Use Amazon RDS to store and retrieve the credentials. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Lambda to store and manage the application configuration. Use AWS Systems Manager Parameter Store to store and retrieve the credentials. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an encrypted application configuration file. Store the file in Amazon S3 for the application configuration. Create another S3 file to store and retrieve the credentials. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 278

The DNS provider that hosts a company's domain name records is experiencing outages that cause service disruption for a website running on AWS. The company needs to migrate to a more resilient managed DNS service and wants the service to run on AWS.
What should a solutions architect do to rapidly migrate the DNS hosting service?

- **A.** Create an Amazon Route 53 Resolver inbound endpoint in the VPC. Specify the IP addresses that the provider's DNS will forward DNS queries to. Configure the provider's DNS to forward DNS queries for the domain to the IP addresses that are specified in the inbound endpoint.
- **B.** Create a Simple AD directory in AWS. Enable zone transfer between the DNS provider and AWS Directory Service for Microsoft Active Directory for the domain records.
- **C.** Create an Amazon Route 53 private hosted zone for the domain name. Import the zone file containing the domain records hosted by the previous provider.
- **D.** Create an Amazon Route 53 public hosted zone for the domain name. Import the zone file containing the domain records hosted by the previous provider. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon Route 53 public hosted zone for the domain name. Import the zone file containing the domain records hosted by the previous provider.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Route 53 public hosted zone for the domain name. Import the zone file containing the domain records hosted by the previous provider. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Route 53 Resolver inbound endpoint in the VPC. Specify the IP addresses that the provider's DNS will forward DNS queries to. Configure the provider's DNS to forward DNS queries for the domain to the IP addresses that are specified in the inbound endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a Simple AD directory in AWS. Enable zone transfer between the DNS provider and AWS Directory Service for Microsoft Active Directory for the domain records. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Route 53 private hosted zone for the domain name. Import the zone file containing the domain records hosted by the previous provider. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 279

A company migrated millions of archival files to Amazon S3. A solutions architect needs to implement a solution that will encrypt all the archival data by using a customer-provided key. The solution must encrypt existing unencrypted objects and future objects.
Which solution will meet these requirements?

- **A.** Use S3 Storage Lens metrics to identify unencrypted S3 buckets. Configure the S3 default encryption feature to use a server-side encryption with AWS KMS keys (SSE-KMS).
- **B.** Create a list of unencrypted objects by filtering an Amazon S3 Inventory report. Configure an S3 Batch Operations job to encrypt the objects from the list with a server-side encryption with a customer-provided key (SSE-C). Configure the S3 default encryption feature to use a server-side encryption with a customer-provided key (SSE-C). ✅
- **C.** Create a list of unencrypted objects by filtering the AWS usage report for Amazon S3. Configure an AWS Batch job to encrypt the objects from the list with a server-side encryption with AWS KMS keys (SSE-KMS). Configure the S3 default encryption feature to use a server-side encryption with AWS KMS keys (SSE-KMS).
- **D.** Create a list of unencrypted objects by filtering the AWS usage report for Amazon S3. Configure the S3 default encryption feature to use a server-side encryption with a customer-provided key (SSE-C).

**Answer:** B

**Explanation:**

Correct Answer:Create a list of unencrypted objects by filtering an Amazon S3 Inventory report. Configure an S3 Batch Operations job to encrypt the objects from the list with a server-side encryption with a customer-provided key (SSE-C). Configure the S3 default encryption feature to use a server-side encryption with a customer-provided key (SSE-C).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a list of unencrypted objects by filtering an Amazon S3 Inventory report. Configure an S3 Batch Operations job to encrypt the objects from the list with a server-side encryption with a customer-provided key (SSE-C). Configure the S3 default encryption feature to use a server-side encryption with a customer-provided key (SSE-C). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use S3 Storage Lens metrics to identify unencrypted S3 buckets. Configure the S3 default encryption feature to use a server-side encryption with AWS KMS keys (SSE-KMS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a list of unencrypted objects by filtering the AWS usage report for Amazon S3. Configure an AWS Batch job to encrypt the objects from the list with a server-side encryption with AWS KMS keys (SSE-KMS). Configure the S3 default encryption feature to use a server-side encryption with AWS KMS keys (SSE-KMS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a list of unencrypted objects by filtering the AWS usage report for Amazon S3. Configure the S3 default encryption feature to use a server-side encryption with a customer-provided key (SSE-C). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 280

A company is building a new application that uses serverless architecture. The architecture will consist of an Amazon API Gateway REST API and AWS Lambda functions to manage incoming requests.
The company wants to add a service that can send messages received from the API Gateway REST API to multiple target Lambda functions for processing. The service must offer message filtering that gives the target Lambda functions the ability to receive only the messages the functions need.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Send the requests from the API Gateway REST API to Amazon Managed Streaming for Apache Kafka (Amazon MSK). Configure Amazon MSK to publish the messages to the target Lambda functions.
- **B.** Send the requests from the API Gateway REST API to multiple Amazon Simple Queue Service (Amazon SQS) queues. Configure the target Lambda functions to poll the different SQS queues.
- **C.** Send the requests from the API Gateway REST API to Amazon EventBridge. Configure EventBridge to invoke the target Lambda functions. ✅
- **D.** Send the requests from the API Gateway REST API to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe Amazon Simple Queue Service (Amazon SQS) queues to the SNS topic. Configure the target Lambda functions to poll the different SQS queues.

**Answer:** C

**Explanation:**

Correct Answer:Send the requests from the API Gateway REST API to Amazon EventBridge. Configure EventBridge to invoke the target Lambda functions.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Send the requests from the API Gateway REST API to Amazon EventBridge. Configure EventBridge to invoke the target Lambda functions. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Send the requests from the API Gateway REST API to Amazon Managed Streaming for Apache Kafka (Amazon MSK). Configure Amazon MSK to publish the messages to the target Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Send the requests from the API Gateway REST API to multiple Amazon Simple Queue Service (Amazon SQS) queues. Configure the target Lambda functions to poll the different SQS queues. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Send the requests from the API Gateway REST API to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe Amazon Simple Queue Service (Amazon SQS) queues to the SNS topic. Configure the target Lambda functions to poll the different SQS queues. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 281

A company has multiple AWS accounts with applications deployed in the us-west-2 Region. Application logs are stored within Amazon S3 buckets in each account. The company wants to build a centralized log analysis solution that uses a single S3 bucket. Logs must not leave us-west-2, and the company wants to incur minimal operational overhead.
Which solution meets these requirements and is MOST cost-effective?

- **A.** Write a script that uses the PutObject API operation every day to copy the entire contents of the buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.
- **B.** Use S3 Same-Region Replication to replicate logs from the S3 buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis. ✅
- **C.** Create an S3 Lifecycle policy that copies the objects from one of the application S3 buckets to the centralized S3 bucket.
- **D.** Write AWS Lambda functions in these accounts that are triggered every time logs are delivered to the S3 buckets (s3:ObjectCreated:* event). Copy the logs to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.

**Answer:** B

**Explanation:**

Correct Answer:Use S3 Same-Region Replication to replicate logs from the S3 buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use S3 Same-Region Replication to replicate logs from the S3 buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Write a script that uses the PutObject API operation every day to copy the entire contents of the buckets to another S3 bucket in us-west-2. Use this S3 bucket for log analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an S3 Lifecycle policy that copies the objects from one of the application S3 buckets to the centralized S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Write AWS Lambda functions in these accounts that are triggered every time logs are delivered to the S3 buckets (s3:ObjectCreated:* event). Copy the logs to another S3 bucket in us-west-2. Use this S3 bucket for log analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 282

An ecommerce company runs applications in AWS accounts that are part of an organization in AWS Organizations. The applications run on Amazon Aurora PostgreSQL databases across all the accounts. The company needs to prevent malicious activity and must identify abnormal failed and incomplete login attempts to the databases.
Which solution will meet these requirements in the MOST operationally efficient way?

- **A.** Publish the Aurora general logs to a log group in Amazon CloudWatch Logs. Export the log data to a central Amazon S3 bucket.
- **B.** Enable the Amazon RDS Protection feature in Amazon GuardDuty for the member accounts of the organization. ✅
- **C.** Publish all the Aurora PostgreSQL database events in AWS CloudTrail to a central Amazon S3 bucket.
- **D.** Attach service control policies (SCPs) to the root of the organization to identity the failed login attempts.

**Answer:** B

**Explanation:**

Correct Answer:Enable the Amazon RDS Protection feature in Amazon GuardDuty for the member accounts of the organization.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable the Amazon RDS Protection feature in Amazon GuardDuty for the member accounts of the organization. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Publish the Aurora general logs to a log group in Amazon CloudWatch Logs. Export the log data to a central Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Publish all the Aurora PostgreSQL database events in AWS CloudTrail to a central Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach service control policies (SCPs) to the root of the organization to identity the failed login attempts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 283

A company has deployed its application on Amazon EC2 instances with an Amazon RDS database. The company used the principle of least privilege to configure the database access credentials. The company's security team wants to protect the application and the database from SQL injection and other web-based attacks.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS WAF to protect the application. Use RDS parameter groups to configure the security settings. ✅
- **B.** Use different database accounts in the application code for different functions. Avoid granting excessive privileges to the database users.
- **C.** Use security groups and network ACLs to secure the database and application servers.
- **D.** Use AWS Network Firewall to protect the application and the database.

**Answer:** A

**Explanation:**

Correct Answer:Use AWS WAF to protect the application. Use RDS parameter groups to configure the security settings.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS WAF to protect the application. Use RDS parameter groups to configure the security settings. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use different database accounts in the application code for different functions. Avoid granting excessive privileges to the database users. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use security groups and network ACLs to secure the database and application servers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Network Firewall to protect the application and the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 284

A package delivery company has an application that uses Amazon EC2 instances and an Amazon Aurora MySQL DB cluster. As the application becomes more popular, EC2 instance usage increases only slightly. DB cluster usage increases at a much faster rate.
The company adds a read replica, which reduces the DB cluster usage for a short period of time. However, the load continues to increase. The operations that cause the increase in DB cluster usage are all repeated read statements that are related to delivery details. The company needs to alleviate the effect of repeated reads on the DB cluster.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Add an additional read replica to the DB cluster.
- **B.** Implement an Amazon ElastiCache for Redis cluster between the application and the DB cluster. ✅
- **C.** Modify the DB cluster to have multiple writer instances.
- **D.** Configure Aurora Auto Scaling for the Aurora read replicas.

**Answer:** B

**Explanation:**

Correct Answer:Implement an Amazon ElastiCache for Redis cluster between the application and the DB cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Implement an Amazon ElastiCache for Redis cluster between the application and the DB cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add an additional read replica to the DB cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Modify the DB cluster to have multiple writer instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Aurora Auto Scaling for the Aurora read replicas. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 285

A company runs a three-tier web application in a VPC across multiple Availability Zones. Amazon EC2 instances run in an Auto Scaling group for the application tier.
The company needs to make an automated scaling plan that will analyze each resource's daily and weekly historical workload trends. The configuration must scale resources appropriately according to both the forecast and live changes in utilization.
Which scaling strategy should a solutions architect recommend to meet these requirements?

- **A.** Set up a simple scaling policy. Increase the cooldown period based on the EC2 instance startup time.
- **B.** Enable predictive scaling to forecast and scale. Configure dynamic scaling with target tracking. ✅
- **C.** Implement dynamic scaling with step scaling based on average CPU utilization from the EC2 instances.
- **D.** Create an automated scheduled scaling action based on the traffic patterns of the web application.

**Answer:** B

**Explanation:**

Correct Answer:Enable predictive scaling to forecast and scale. Configure dynamic scaling with target tracking.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable predictive scaling to forecast and scale. Configure dynamic scaling with target tracking. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up a simple scaling policy. Increase the cooldown period based on the EC2 instance startup time. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement dynamic scaling with step scaling based on average CPU utilization from the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an automated scheduled scaling action based on the traffic patterns of the web application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 286

A company stores critical data in Amazon DynamoDB tables in the company's AWS account. An IT administrator accidentally deleted a DynamoDB table. The deletion caused a significant loss of data and disrupted the company's operations. The company wants to prevent this type of disruption in the future.
Which solution will meet this requirement with the LEAST operational overhead?

- **A.** Enable point-in-time recovery on the DynamoDB tables.
- **B.** Configure deletion protection on the DynamoDB tables. ✅
- **C.** Configure a trail in AWS CloudTrail. Create an Amazon EventBridge rule for delete actions. Create an AWS Lambda function to automatically restore deleted DynamoDB tables.
- **D.** Create a backup and restore plan for the DynamoDB tables. Recover the DynamoDB tables manually.

**Answer:** B

**Explanation:**

Correct Answer:Configure deletion protection on the DynamoDB tables.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure deletion protection on the DynamoDB tables. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Enable point-in-time recovery on the DynamoDB tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a trail in AWS CloudTrail. Create an Amazon EventBridge rule for delete actions. Create an AWS Lambda function to automatically restore deleted DynamoDB tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a backup and restore plan for the DynamoDB tables. Recover the DynamoDB tables manually. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 287

A company maintains about 300 TB in Amazon S3 Standard storage month after month. The S3 objects are each typically around 50 GB in size and are frequently replaced with multipart uploads by their global application. The number and size of S3 objects remain constant, but the company's S3 storage costs are increasing each month.
How should a solutions architect reduce costs in this situation?

- **A.** Switch from multipart uploads to Amazon S3 Transfer Acceleration.
- **B.** Configure S3 inventory to prevent objects from being archived too quickly.
- **C.** Configure Amazon CloudFront to reduce the number of objects stored in Amazon S3.
- **D.** Enable an S3 Lifecycle policy that deletes incomplete multipart uploads. ✅

**Answer:** D

**Explanation:**

Correct Answer:Enable an S3 Lifecycle policy that deletes incomplete multipart uploads.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable an S3 Lifecycle policy that deletes incomplete multipart uploads. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Switch from multipart uploads to Amazon S3 Transfer Acceleration. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure S3 inventory to prevent objects from being archived too quickly. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon CloudFront to reduce the number of objects stored in Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 288

A company runs container applications by using Amazon Elastic Kubernetes Service (Amazon EKS) and the Kubernetes Horizontal Pod Autoscaler. The workload is not consistent throughout the day. A solutions architect notices that the number of nodes does not automatically scale out when the existing nodes have reached maximum capacity in the cluster, which causes performance issues.
Which solution will resolve this issue with the LEAST administrative overhead?

- **A.** Scale out the nodes by tracking the memory usage.
- **B.** Use the Kubernetes Cluster Autoscaler to manage the number of nodes in the cluster. ✅
- **C.** Use an Amazon EC2 Auto Scaling group to distribute the workload.
- **D.** Use an AWS Lambda function to resize the EKS cluster automatically.

**Answer:** B

**Explanation:**

Correct Answer:Use the Kubernetes Cluster Autoscaler to manage the number of nodes in the cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use the Kubernetes Cluster Autoscaler to manage the number of nodes in the cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Scale out the nodes by tracking the memory usage. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an Amazon EC2 Auto Scaling group to distribute the workload. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Lambda function to resize the EKS cluster automatically. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 289

A media company uses an Amazon CloudFront distribution to deliver content over the internet. The company wants only premium customers to have access to the media streams and file content. The company stores all content in an Amazon S3 bucket. The company also delivers content on demand to customers for a specific purpose, such as movie rentals or music downloads.
Which solution will meet these requirements?

- **A.** Generate and provide S3 signed cookies to premium customers.
- **B.** Generate and provide CloudFront signed URLs to premium customers. ✅
- **C.** Use origin access control (OAC) to limit the access of non-premium customers.
- **D.** Generate and activate field-level encryption to block non-premium customers.

**Answer:** B

**Explanation:**

Correct Answer:Generate and provide CloudFront signed URLs to premium customers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Generate and provide CloudFront signed URLs to premium customers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Generate and provide S3 signed cookies to premium customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use origin access control (OAC) to limit the access of non-premium customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Generate and activate field-level encryption to block non-premium customers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 290

A company has an AWS Direct Connect connection from its on-premises location to an AWS account. The AWS account has 30 different VPCs in the same AWS Region. The VPCs use private virtual interfaces (VIFs). Each VPC has a CIDR block that does not overlap with other networks under the company's control.
The company wants to centrally manage the networking architecture while still allowing each VPC to communicate with all other VPCs and on-premises networks.
Which solution will meet these requirements with the LEAST amount of operational overhead?

- **A.** Create a transit gateway, and associate the Direct Connect connection with a new transit VIF. Turn on the transit gateway's route propagation feature. ✅
- **B.** Create a Direct Connect gateway. Recreate the private VIFs to use the new gateway. Associate each VPC by creating new virtual private gateways.
- **C.** Create a transit VPConnect the Direct Connect connection to the transit VPCreate a peering connection between all other VPCs in the Region. Update the route tables.
- **D.** Create AWS Site-to-Site VPN connections from on premises to each VPC. Ensure that both VPN tunnels are UP for each connection. Turn on the route propagation feature.

**Answer:** A

**Explanation:**

Correct Answer:Create a transit gateway, and associate the Direct Connect connection with a new transit VIF. Turn on the transit gateway's route propagation feature.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a transit gateway, and associate the Direct Connect connection with a new transit VIF. Turn on the transit gateway's route propagation feature. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a Direct Connect gateway. Recreate the private VIFs to use the new gateway. Associate each VPC by creating new virtual private gateways. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a transit VPConnect the Direct Connect connection to the transit VPCreate a peering connection between all other VPCs in the Region. Update the route tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create AWS Site-to-Site VPN connections from on premises to each VPC. Ensure that both VPN tunnels are UP for each connection. Turn on the route propagation feature. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 291

A company wants to rearchitect a large-scale web application to a serverless microservices architecture. The application uses Amazon EC2 instances and is written in Python.
The company selected one component of the web application to test as a microservice. The component supports hundreds of requests each second. The company wants to create and test the microservice on an AWS solution that supports Python. The solution must also scale automatically and require minimal infrastructure and minimal operational support.
Which solution will meet these requirements?

- **A.** Use an AWS Lambda function that runs custom developed code. ✅
- **B.** Use Amazon Elastic Kubernetes Service (Amazon EKS). Launch Auto Scaling groups of self-managed EC2 instances.
- **C.** Use a Spot Fleet with auto scaling of EC2 instances that run the most recent Amazon Linux operating system.
- **D.** Use an AWS Elastic Beanstalk web server environment that has high availability configured.

**Answer:** A

**Explanation:**

Correct Answer:Use an AWS Lambda function that runs custom developed code.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an AWS Lambda function that runs custom developed code. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Elastic Kubernetes Service (Amazon EKS). Launch Auto Scaling groups of self-managed EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a Spot Fleet with auto scaling of EC2 instances that run the most recent Amazon Linux operating system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Elastic Beanstalk web server environment that has high availability configured. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 292

A manufacturing company runs its report generation application on AWS. The application generates each report in about 20 minutes. The application is built as a monolith that runs on a single Amazon EC2 instance. The application requires frequent updates to its tightly coupled modules. The application becomes complex to maintain as the company adds new features.
Each time the company patches a software module, the application experiences downtime. Report generation must restart from the beginning after any interruptions. The company wants to redesign the application so that the application can be flexible, scalable, and gradually improved. The company wants to minimize application downtime.
Which solution will meet these requirements?

- **A.** Run the application on AWS Elastic Beanstalk as a single application environment with an all-at-once deployment strategy.
- **B.** Run the application on Amazon Elastic Container Service (Amazon ECS) as microservices with service auto scaling. ✅
- **C.** Run the application on Amazon EC2 Spot Instances as microservices with a Spot Fleet default allocation strategy.
- **D.** Run the application on AWS Lambda as a single function with maximum provisioned concurrency.

**Answer:** B

**Explanation:**

Correct Answer:Run the application on Amazon Elastic Container Service (Amazon ECS) as microservices with service auto scaling.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Run the application on Amazon Elastic Container Service (Amazon ECS) as microservices with service auto scaling. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Run the application on AWS Elastic Beanstalk as a single application environment with an all-at-once deployment strategy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Run the application on Amazon EC2 Spot Instances as microservices with a Spot Fleet default allocation strategy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Run the application on AWS Lambda as a single function with maximum provisioned concurrency. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 293

A company is migrating a large amount of data from on-premises storage to AWS. Windows, Mac, and Linux based Amazon EC2 instances in the same AWS Region will access the data by using SMB and NFS storage protocols. The company will access a portion of the data routinely. The company will access the remaining data infrequently.
The company needs to design a solution to host the data.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Amazon Elastic File System (Amazon EFS) volume that uses EFS Intelligent-Tiering. Use AWS DataSync to migrate the data to the EFS volume.
- **B.** Create an Amazon FSx for ONTAP instance. Create an FSx for ONTAP file system with a root volume that uses the auto tiering policy. Migrate the data to the FSx for ONTAP volume. ✅
- **C.** Create an Amazon S3 bucket that uses S3 Intelligent-Tiering. Migrate the data to the S3 bucket by using an AWS Storage Gateway Amazon S3 File Gateway.
- **D.** Create an Amazon FSx for OpenZFS file system. Migrate the data to the new volume.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon FSx for ONTAP instance. Create an FSx for ONTAP file system with a root volume that uses the auto tiering policy. Migrate the data to the FSx for ONTAP volume.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon FSx for ONTAP instance. Create an FSx for ONTAP file system with a root volume that uses the auto tiering policy. Migrate the data to the FSx for ONTAP volume. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Elastic File System (Amazon EFS) volume that uses EFS Intelligent-Tiering. Use AWS DataSync to migrate the data to the EFS volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 bucket that uses S3 Intelligent-Tiering. Migrate the data to the S3 bucket by using an AWS Storage Gateway Amazon S3 File Gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon FSx for OpenZFS file system. Migrate the data to the new volume. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 294

A company’s applications use Apache Hadoop and Apache Spark to process data on premises. The existing infrastructure is not scalable and is complex to manage.
A solutions architect must design a scalable solution that reduces operational complexity. The solution must keep the data processing on premises.
Which solution will meet these requirements?

- **A.** Use an AWS Snowball device to migrate the data to an Amazon S3 bucket. Create an Amazon EMR cluster to process the data.
- **B.** Use AWS Site-to-Site VPN to access the on-premises Hadoop Distributed File System (HDFS) data and application. Use an Amazon EMR cluster to process the data.
- **C.** Use AWS DataSync to connect to the on-premises Hadoop Distributed File System (HDFS) cluster. Create an Amazon EMR cluster to process the data.
- **D.** Migrate the Apache Hadoop application and the Apache Spark application to Amazon EMR clusters on AWS Outposts. Use the EMR clusters to process the data. ✅

**Answer:** D

**Explanation:**

Correct Answer:Migrate the Apache Hadoop application and the Apache Spark application to Amazon EMR clusters on AWS Outposts. Use the EMR clusters to process the data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the Apache Hadoop application and the Apache Spark application to Amazon EMR clusters on AWS Outposts. Use the EMR clusters to process the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS Snowball device to migrate the data to an Amazon S3 bucket. Create an Amazon EMR cluster to process the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Site-to-Site VPN to access the on-premises Hadoop Distributed File System (HDFS) data and application. Use an Amazon EMR cluster to process the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS DataSync to connect to the on-premises Hadoop Distributed File System (HDFS) cluster. Create an Amazon EMR cluster to process the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 295

A company runs a real-time data ingestion solution on AWS. The solution consists of the most recent version of Amazon Managed Streaming for Apache Kafka (Amazon MSK). The solution is deployed in a VPC in private subnets across three Availability Zones.
A solutions architect needs to redesign the data ingestion solution to be publicly available over the internet. The data in transit must also be encrypted.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Deploy a Network Load Balancer (NLB) that uses private subnets. Configure an NLB listener for HTTPS communication over the internet.
- **B.** Configure public subnets in the existing VPC. Deploy an MSK cluster in the public subnets. Update the MSK cluster security settings to enable mutual TLS authentication. ✅
- **C.** Deploy an Application Load Balancer (ALB) that uses private subnets. Configure an ALB security group inbound rule to allow inbound traffic from the VPC CIDR block for HTTPS protocol.
- **D.** Create a new VPC that has public subnets. Deploy an MSK cluster in the public subnets. Update the MSK cluster security settings to enable mutual TLS authentication.

**Answer:** B

**Explanation:**

Correct Answer:Configure public subnets in the existing VPC. Deploy an MSK cluster in the public subnets. Update the MSK cluster security settings to enable mutual TLS authentication.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure public subnets in the existing VPC. Deploy an MSK cluster in the public subnets. Update the MSK cluster security settings to enable mutual TLS authentication. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy a Network Load Balancer (NLB) that uses private subnets. Configure an NLB listener for HTTPS communication over the internet. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Application Load Balancer (ALB) that uses private subnets. Configure an ALB security group inbound rule to allow inbound traffic from the VPC CIDR block for HTTPS protocol. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new VPC that has public subnets. Deploy an MSK cluster in the public subnets. Update the MSK cluster security settings to enable mutual TLS authentication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 296

A company uses Amazon EC2, AWS Fargate, and AWS Lambda to run multiple workloads in the company's AWS account. The company wants to fully make use of its Compute Savings Plans. The company wants to receive notification when coverage of the Compute Savings Plans drops.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Create a Savings Plans alert subscription. Enable all notification options. Enter an email address to receive notifications.
- **B.** Create an AWS Budgets report for the Savings Plans budget. Set the frequency to daily.
- **C.** Create a Lambda function that runs a coverage report against the Savings Plans. Use Amazon Simple Email Service (Amazon SES) to email the report to the appropriate email message recipients.
- **D.** Create a daily budget for the Savings Plans by using AWS Budgets. Configure the budget with a coverage threshold to send notifications to the appropriate email message recipients. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create a daily budget for the Savings Plans by using AWS Budgets. Configure the budget with a coverage threshold to send notifications to the appropriate email message recipients.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a daily budget for the Savings Plans by using AWS Budgets. Configure the budget with a coverage threshold to send notifications to the appropriate email message recipients. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a Savings Plans alert subscription. Enable all notification options. Enter an email address to receive notifications. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Budgets report for the Savings Plans budget. Set the frequency to daily. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a Lambda function that runs a coverage report against the Savings Plans. Use Amazon Simple Email Service (Amazon SES) to email the report to the appropriate email message recipients. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 297

A company is running a photo hosting service in the us-east-1 Region. The service enables users across multiple countries to upload and view photos. Some photos are heavily viewed for months, and others are viewed for less than a week. The application allows uploads of up to 20 MB for each photo. The service uses the photo metadata to determine which photos to display to each user.
Which solution provides the appropriate user access MOST cost-effectively?

- **A.** Store the photos in the Amazon S3 Intelligent-Tiering storage class. Store the photo metadata and its S3 location in DynamoDB. ✅
- **B.** Store the photos in the Amazon S3 Glacier storage class. Set up an S3 Lifecycle policy to move photos older than 30 days to the S3 Glacier Deep Archive storage class. Store the photo metadata and its S3 location in Amazon OpenSearch Service.
- **C.** Store the photos in Amazon DynamoDB. Turn on DynamoDB Accelerator (DAX) to cache frequently viewed items.
- **D.** Store the photos in the Amazon S3 Standard storage class. Set up an S3 Lifecycle policy to move photos older than 30 days to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class. Use the object tags to keep track of metadata.

**Answer:** A

**Explanation:**

Correct Answer:Store the photos in the Amazon S3 Intelligent-Tiering storage class. Store the photo metadata and its S3 location in DynamoDB.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the photos in the Amazon S3 Intelligent-Tiering storage class. Store the photo metadata and its S3 location in DynamoDB. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the photos in the Amazon S3 Glacier storage class. Set up an S3 Lifecycle policy to move photos older than 30 days to the S3 Glacier Deep Archive storage class. Store the photo metadata and its S3 location in Amazon OpenSearch Service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the photos in Amazon DynamoDB. Turn on DynamoDB Accelerator (DAX) to cache frequently viewed items. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the photos in the Amazon S3 Standard storage class. Set up an S3 Lifecycle policy to move photos older than 30 days to the S3 Standard-Infrequent Access (S3 Standard-IA) storage class. Use the object tags to keep track of metadata. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 298

An ecommerce company runs its application on AWS. The application uses an Amazon Aurora PostgreSQL cluster in Multi-AZ mode for the underlying database. During a recent promotional campaign, the application experienced heavy read load and write load. Users experienced timeout issues when they attempted to access the application.
A solutions architect needs to make the application architecture more scalable and highly available.
Which solution will meet these requirements with the LEAST downtime?

- **A.** Create an Amazon ElastiCache for Redis cache. Replicate data from the Aurora cluster to Redis by using AWS Database Migration Service (AWS DMS) with a write-around approach.
- **B.** Add additional reader instances to the Aurora cluster. Create an Amazon RDS Proxy target group for the Aurora cluster. ✅
- **C.** Modify the Aurora cluster and activate the zero-downtime restart (ZDR) feature. Use Database Activity Streams on the cluster to track the cluster status.
- **D.** Create an Amazon EventBridge rule that has the Aurora cluster as a source. Create an AWS Lambda function to log the state change events of the Aurora cluster. Add the Lambda function as a target for the EventBridge rule. Add additional reader nodes to fail over to.

**Answer:** B

**Explanation:**

Correct Answer:Add additional reader instances to the Aurora cluster. Create an Amazon RDS Proxy target group for the Aurora cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Add additional reader instances to the Aurora cluster. Create an Amazon RDS Proxy target group for the Aurora cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon ElastiCache for Redis cache. Replicate data from the Aurora cluster to Redis by using AWS Database Migration Service (AWS DMS) with a write-around approach. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Modify the Aurora cluster and activate the zero-downtime restart (ZDR) feature. Use Database Activity Streams on the cluster to track the cluster status. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon EventBridge rule that has the Aurora cluster as a source. Create an AWS Lambda function to log the state change events of the Aurora cluster. Add the Lambda function as a target for the EventBridge rule. Add additional reader nodes to fail over to. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 299

A company’s website hosted on Amazon EC2 instances processes classified data stored in Amazon S3. Due to security concerns, the company requires a private and secure connection between its EC2 resources and Amazon S3.
Which solution meets these requirements?

- **A.** Set up S3 bucket policies to allow access from a VPC endpoint. ✅
- **B.** Set up an IAM policy to grant read-write access to the S3 bucket.
- **C.** Set up a NAT gateway to access resources outside the private subnet.
- **D.** Set up an access key ID and a secret access key to access the S3 bucket.

**Answer:** A

**Explanation:**

Correct Answer:Set up S3 bucket policies to allow access from a VPC endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up S3 bucket policies to allow access from a VPC endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up an IAM policy to grant read-write access to the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up a NAT gateway to access resources outside the private subnet. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an access key ID and a secret access key to access the S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 300

A company has an organization in AWS Organizations. The company runs Amazon EC2 instances across four AWS accounts in the root organizational unit (OU). There are three nonproduction accounts and one production account. The company wants to prohibit users from launching EC2 instances of a certain size in the nonproduction accounts. The company has created a service control policy (SCP) to deny access to launch instances that use the prohibited types.
Which solutions to deploy the SCP will meet these requirements? (Choose two.)

- **A.** Attach the SCP to the three nonproduction Organizations member accounts. ✅
- **B.** Attach the SCP to the root OU for the organization.
- **C.** Attach the SCP to the Organizations management account.
- **D.** Create an OU for the required accounts. Attach the SCP to the OU. Move the nonproduction member accounts into the new OU. ✅
- **E.** Create an OU for the production account. Attach the SCP to the OU. Move the production member account into the new OU.

**Answer:** A, D

**Explanation:**

Correct Answer:Attach the SCP to the three nonproduction Organizations member accounts.; Create an OU for the required accounts. Attach the SCP to the OU. Move the nonproduction member accounts into the new OU.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Attach the SCP to the three nonproduction Organizations member accounts. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an OU for the required accounts. Attach the SCP to the OU. Move the nonproduction member accounts into the new OU. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach the SCP to the root OU for the organization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach the SCP to the Organizations management account. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an OU for the production account. Attach the SCP to the OU. Move the production member account into the new OU. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 301

A company wants to use NAT gateways in its AWS environment. The company's Amazon EC2 instances in private subnets must be able to connect to the public internet through the NAT gateways.
Which solution will meet these requirements?

- **A.** Create private NAT gateways in public subnets in the same VPCs as the EC2 instances.
- **B.** Create public NAT gateways in public subnets in the same VPCs as the EC2 instances. ✅
- **C.** Create private NAT gateways in the same private subnets as the EC2 instances.
- **D.** Create public NAT gateways in the same private subnets as the EC2 instances.

**Answer:** B

**Explanation:**

Correct Answer:Create public NAT gateways in public subnets in the same VPCs as the EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create public NAT gateways in public subnets in the same VPCs as the EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create private NAT gateways in public subnets in the same VPCs as the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create private NAT gateways in the same private subnets as the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create public NAT gateways in the same private subnets as the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 302

A company is using an Application Load Balancer (ALB) to present its application to the internet. The company finds abnormal traffic access patterns across the application. A solutions architect needs to improve visibility into the infrastructure to help the company understand these abnormalities better.
What is the MOST operationally efficient solution that meets these requirements?

- **A.** Create a table in Amazon Athena for AWS CloudTrail logs. Create a query for the relevant information.
- **B.** Enable ALB access logging to Amazon S3. Open each file in a text editor, and search each line for the relevant information.
- **C.** Use Amazon EMR on a dedicated Amazon EC2 instance to directly query the ALB to acquire traffic access log information.
- **D.** Enable ALB access logging to Amazon S3. Create a table in Amazon Athena, and query the logs. ✅

**Answer:** D

**Explanation:**

Correct Answer:Enable ALB access logging to Amazon S3. Create a table in Amazon Athena, and query the logs.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable ALB access logging to Amazon S3. Create a table in Amazon Athena, and query the logs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a table in Amazon Athena for AWS CloudTrail logs. Create a query for the relevant information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable ALB access logging to Amazon S3. Open each file in a text editor, and search each line for the relevant information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon EMR on a dedicated Amazon EC2 instance to directly query the ALB to acquire traffic access log information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 303

A company hosts a database that runs on an Amazon RDS instance that is deployed to multiple Availability Zones. The company periodically runs a script against the database to report new entries that are added to the database. The script that runs against the database negatively affects the performance of a critical application. The company needs to improve application performance with minimal costs.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Add functionality to the script to identify the instance that has the fewest active connections. Configure the script to read from that instance to report the total new entries.
- **B.** Create a read replica of the database. Configure the script to query only the read replica to report the total new entries. ✅
- **C.** Use Amazon ElastiCache to cache the common queries that the script runs against the database.
- **D.** Instruct the development team to manually export the new entries for the day in the database at the end of each day.

**Answer:** B

**Explanation:**

Correct Answer:Create a read replica of the database. Configure the script to query only the read replica to report the total new entries.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a read replica of the database. Configure the script to query only the read replica to report the total new entries. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add functionality to the script to identify the instance that has the fewest active connections. Configure the script to read from that instance to report the total new entries. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon ElastiCache to cache the common queries that the script runs against the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Instruct the development team to manually export the new entries for the day in the database at the end of each day. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 304

A company runs a three-tier application in a VPC. The database tier uses an Amazon RDS for MySQL DB instance.
The company plans to migrate the RDS for MySQL DB instance to an Amazon Aurora PostgreSQL DB cluster. The company needs a solution that replicates the data changes that happen during the migration to the new database.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Promote the Aurora PostgreSQL read replica to a standalone Aurora PostgreSQL DB cluster when the replica lag is zero.
- **B.** Define an AWS Database Migration Service (AWS DMS) task with change data capture (CDC) to migrate the data. ✅
- **C.** Configure an Aurora MySQL read replica for the RDS for MySQL DB instance.
- **D.** Use AWS Database Migration Service (AWS DMS) Schema Conversion to create an Aurora PostgreSQL read replica on the RDS for MySQL DB instance.
- **E.** Use AWS Database Migration Service (AWS DMS) Schema Conversion to transform the database objects. ✅

**Answer:** B, E

**Explanation:**

Correct Answer:Define an AWS Database Migration Service (AWS DMS) task with change data capture (CDC) to migrate the data.; Use AWS Database Migration Service (AWS DMS) Schema Conversion to transform the database objects.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Define an AWS Database Migration Service (AWS DMS) task with change data capture (CDC) to migrate the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use AWS Database Migration Service (AWS DMS) Schema Conversion to transform the database objects. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Promote the Aurora PostgreSQL read replica to a standalone Aurora PostgreSQL DB cluster when the replica lag is zero. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Aurora MySQL read replica for the RDS for MySQL DB instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS) Schema Conversion to create an Aurora PostgreSQL read replica on the RDS for MySQL DB instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 305

An online video game company must maintain ultra-low latency for its game servers. The game servers run on Amazon EC2 instances. The company needs a solution that can handle millions of UDP internet traffic requests each second.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure a Network Load Balancer with the required protocol and ports for the internet traffic. Specify the EC2 instances as the targets. ✅
- **B.** Launch an identical set of game servers on EC2 instances in separate AWS Regions. Route internet traffic to both sets of EC2 instances.
- **C.** Configure an Application Load Balancer with the required protocol and ports for the internet traffic. Specify the EC2 instances as the targets.
- **D.** Configure a Gateway Load Balancer for the internet traffic. Specify the EC2 instances as the targets.

**Answer:** A

**Explanation:**

Correct Answer:Configure a Network Load Balancer with the required protocol and ports for the internet traffic. Specify the EC2 instances as the targets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a Network Load Balancer with the required protocol and ports for the internet traffic. Specify the EC2 instances as the targets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Launch an identical set of game servers on EC2 instances in separate AWS Regions. Route internet traffic to both sets of EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Application Load Balancer with the required protocol and ports for the internet traffic. Specify the EC2 instances as the targets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a Gateway Load Balancer for the internet traffic. Specify the EC2 instances as the targets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 306

A company has NFS servers in an on-premises data center that need to periodically back up small amounts of data to Amazon S3.
Which solution meets these requirements and is MOST cost-effective?

- **A.** Set up an AWS Direct Connect connection between the on-premises data center and a VPC, and copy the data to Amazon S3.
- **B.** Set up an SFTP sync using AWS Transfer for SFTP to sync data from on premises to Amazon S3.
- **C.** Set up an AWS DataSync agent on the on-premises servers, and sync the data to Amazon S3. ✅
- **D.** Set up AWS Glue to copy the data from the on-premises servers to Amazon S3.

**Answer:** C

**Explanation:**

Correct Answer:Set up an AWS DataSync agent on the on-premises servers, and sync the data to Amazon S3.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up an AWS DataSync agent on the on-premises servers, and sync the data to Amazon S3. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up an AWS Direct Connect connection between the on-premises data center and a VPC, and copy the data to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an SFTP sync using AWS Transfer for SFTP to sync data from on premises to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS Glue to copy the data from the on-premises servers to Amazon S3. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 307

A company copies 200 TB of data from a recent ocean survey onto AWS Snowball Edge Storage Optimized devices. The company has a high performance computing (HPC) cluster that is hosted on AWS to look for oil and gas deposits. A solutions architect must provide the cluster with consistent sub-millisecond latency and high-throughput access to the data on the Snowball Edge Storage Optimized devices. The company is sending the devices back to AWS.
Which solution will meet these requirements?

- **A.** Create an Amazon S3 bucket. Import the data into the S3 bucket. Configure an AWS Storage Gateway file gateway to use the S3 bucket. Access the file gateway from the HPC cluster instances.
- **B.** Create an Amazon S3 bucket and an Amazon Elastic File System (Amazon EFS) file system. Import the data into the S3 bucket. Copy the data from the S3 bucket to the EFS file system. Access the EFS file system from the HPC cluster instances.
- **C.** Create an Amazon FSx for Lustre file system. Import the data directly into the FSx for Lustre file system. Access the FSx for Lustre file system from the HPC cluster instances.
- **D.** Create an Amazon S3 bucket. Import the data into the S3 bucket. Configure an Amazon FSx for Lustre file system, and integrate it with the S3 bucket. Access the FSx for Lustre file system from the HPC cluster instances. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an Amazon S3 bucket. Import the data into the S3 bucket. Configure an Amazon FSx for Lustre file system, and integrate it with the S3 bucket. Access the FSx for Lustre file system from the HPC cluster instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon S3 bucket. Import the data into the S3 bucket. Configure an Amazon FSx for Lustre file system, and integrate it with the S3 bucket. Access the FSx for Lustre file system from the HPC cluster instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon S3 bucket. Import the data into the S3 bucket. Configure an AWS Storage Gateway file gateway to use the S3 bucket. Access the file gateway from the HPC cluster instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon S3 bucket and an Amazon Elastic File System (Amazon EFS) file system. Import the data into the S3 bucket. Copy the data from the S3 bucket to the EFS file system. Access the EFS file system from the HPC cluster instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon FSx for Lustre file system. Import the data directly into the FSx for Lustre file system. Access the FSx for Lustre file system from the HPC cluster instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 308

A city has deployed a web application running on Amazon EC2 instances behind an Application Load Balancer (ALB). The application's users have reported sporadic performance, which appears to be related to DDoS attacks originating from random IP addresses. The city needs a solution that requires minimal configuration changes and provides an audit trail for the DDoS sources.
Which solution meets these requirements?

- **A.** Create an Amazon CloudFront distribution for the application, and set the ALB as the origin. Enable an AWS WAF web ACL on the distribution, and configure rules to block traffic from unknown sources
- **B.** Subscribe to AWS Shield Advanced. Engage the AWS DDoS Response Team (DRT) to integrate mitigating controls into the service. ✅
- **C.** Subscribe to Amazon Inspector. Engage the AWS DDoS Response Team (DRT) to integrate mitigating controls into the service.
- **D.** Enable an AWS WAF web ACL on the ALB, and configure rules to block traffic from unknown sources.

**Answer:** B

**Explanation:**

Correct Answer:Subscribe to AWS Shield Advanced. Engage the AWS DDoS Response Team (DRT) to integrate mitigating controls into the service.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Subscribe to AWS Shield Advanced. Engage the AWS DDoS Response Team (DRT) to integrate mitigating controls into the service. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon CloudFront distribution for the application, and set the ALB as the origin. Enable an AWS WAF web ACL on the distribution, and configure rules to block traffic from unknown sources - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Subscribe to Amazon Inspector. Engage the AWS DDoS Response Team (DRT) to integrate mitigating controls into the service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable an AWS WAF web ACL on the ALB, and configure rules to block traffic from unknown sources. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 309

A gaming company wants to launch a new internet-facing application in multiple AWS Regions. The application will use the TCP and UDP protocols for communication. The company needs to provide high availability and minimum latency for global users.
Which combination of actions should a solutions architect take to meet these requirements? (Choose two.)

- **A.** Configure Amazon CloudFront to handle the traffic and route requests to the application in each Region
- **B.** Configure Amazon Route 53 to use a geolocation routing policy to distribute the traffic.
- **C.** Create internal Network Load Balancers in front of the application in each Region. ✅
- **D.** Create external Application Load Balancers in front of the application in each Region.
- **E.** Create an AWS Global Accelerator accelerator to route traffic to the load balancers in each Region. ✅

**Answer:** C, E

**Explanation:**

Correct Answer:Create internal Network Load Balancers in front of the application in each Region.; Create an AWS Global Accelerator accelerator to route traffic to the load balancers in each Region.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create internal Network Load Balancers in front of the application in each Region. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an AWS Global Accelerator accelerator to route traffic to the load balancers in each Region. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure Amazon CloudFront to handle the traffic and route requests to the application in each Region - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon Route 53 to use a geolocation routing policy to distribute the traffic. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create external Application Load Balancers in front of the application in each Region. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 310

A company has an application that uses Docker containers in its local data center. The application runs on a container host that stores persistent data in a volume on the host. The container instances use the stored persistent data.
The company wants to move the application to a fully managed service because the company does not want to manage any servers or storage infrastructure.
Which solution will meet these requirements?

- **A.** Use Amazon Elastic Container Service (Amazon ECS) with an Amazon EC2 launch type. Create an Amazon Elastic File System (Amazon EFS) volume. Add the EFS volume as a persistent storage volume mounted in the containers.
- **B.** Use Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type. Create an Amazon S3 bucket. Map the S3 bucket as a persistent storage volume mounted in the containers.
- **C.** Use Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type. Create an Amazon Elastic File System (Amazon EFS) volume. Add the EFS volume as a persistent storage volume mounted in the containers. ✅
- **D.** Use Amazon Elastic Kubernetes Service (Amazon EKS) with self-managed nodes. Create an Amazon Elastic Block Store (Amazon EBS) volume attached to an Amazon EC2 instance. Use the EBS volume as a persistent volume mounted in the containers.

**Answer:** C

**Explanation:**

Correct Answer:Use Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type. Create an Amazon Elastic File System (Amazon EFS) volume. Add the EFS volume as a persistent storage volume mounted in the containers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type. Create an Amazon Elastic File System (Amazon EFS) volume. Add the EFS volume as a persistent storage volume mounted in the containers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Elastic Container Service (Amazon ECS) with an Amazon EC2 launch type. Create an Amazon Elastic File System (Amazon EFS) volume. Add the EFS volume as a persistent storage volume mounted in the containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Container Service (Amazon ECS) with an AWS Fargate launch type. Create an Amazon S3 bucket. Map the S3 bucket as a persistent storage volume mounted in the containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic Kubernetes Service (Amazon EKS) with self-managed nodes. Create an Amazon Elastic Block Store (Amazon EBS) volume attached to an Amazon EC2 instance. Use the EBS volume as a persistent volume mounted in the containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 311

A company is deploying a new application to Amazon Elastic Kubernetes Service (Amazon EKS) with an AWS Fargate cluster. The application needs a storage solution for data persistence. The solution must be highly available and fault tolerant. The solution also must be shared between multiple application containers.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create an Amazon Elastic Block Store (Amazon EBS) volume. Register the volume in a StorageClass object on an EKS cluster. Use the same volume for all containers.
- **B.** Create an Amazon Elastic File System (Amazon EFS) file system. Register the file system in a StorageClass object on an EKS cluster. Use the same file system for all containers. ✅
- **C.** Create Amazon Elastic Block Store (Amazon EBS) volumes in the same Availability Zones where EKS worker nodes are placed. Register the volumes in a StorageClass object on an EKS cluster. Use EBS Multi-Attach to share the data between containers.
- **D.** Create Amazon Elastic File System (Amazon EFS) file systems in the same Availability Zones where EKS worker nodes are placed. Register the file systems in a StorageClass object on an EKS cluster. Create an AWS Lambda function to synchronize the data between file systems.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon Elastic File System (Amazon EFS) file system. Register the file system in a StorageClass object on an EKS cluster. Use the same file system for all containers.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Elastic File System (Amazon EFS) file system. Register the file system in a StorageClass object on an EKS cluster. Use the same file system for all containers. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon Elastic Block Store (Amazon EBS) volume. Register the volume in a StorageClass object on an EKS cluster. Use the same volume for all containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create Amazon Elastic Block Store (Amazon EBS) volumes in the same Availability Zones where EKS worker nodes are placed. Register the volumes in a StorageClass object on an EKS cluster. Use EBS Multi-Attach to share the data between containers. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create Amazon Elastic File System (Amazon EFS) file systems in the same Availability Zones where EKS worker nodes are placed. Register the file systems in a StorageClass object on an EKS cluster. Create an AWS Lambda function to synchronize the data between file systems. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 312

A solutions architect creates a VPC that includes two public subnets and two private subnets. A corporate security mandate requires the solutions architect to launch all Amazon EC2 instances in a private subnet. However, when the solutions architect launches an EC2 instance that runs a web server on ports 80 and 443 in a private subnet, no external internet traffic can connect to the server.
What should the solutions architect do to resolve this issue?

- **A.** Attach the EC2 instance to an Auto Scaling group in a private subnet. Ensure that the DNS record for the website resolves to the Auto Scaling group identifier.
- **B.** Ensure that the security group that is attached to the EC2 instance allows HTTP traffic on port 80 and HTTPS traffic on port 443. Ensure that the DNS record for the website resolves to the public IP address of the EC2 instance.
- **C.** Provision an internet-facing Application Load Balancer (ALB) in a public subnet. Add the EC2 instance to the target group that is associated with the ALB. Ensure that the DNS record for the website resolves to the ALB. ✅
- **D.** Launch a NAT gateway in a private subnet. Update the route table for the private subnets to add a default route to the NAT gateway. Attach a public Elastic IP address to the NAT gateway.

**Answer:** C

**Explanation:**

Correct Answer:Provision an internet-facing Application Load Balancer (ALB) in a public subnet. Add the EC2 instance to the target group that is associated with the ALB. Ensure that the DNS record for the website resolves to the ALB.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision an internet-facing Application Load Balancer (ALB) in a public subnet. Add the EC2 instance to the target group that is associated with the ALB. Ensure that the DNS record for the website resolves to the ALB. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach the EC2 instance to an Auto Scaling group in a private subnet. Ensure that the DNS record for the website resolves to the Auto Scaling group identifier. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Ensure that the security group that is attached to the EC2 instance allows HTTP traffic on port 80 and HTTPS traffic on port 443. Ensure that the DNS record for the website resolves to the public IP address of the EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch a NAT gateway in a private subnet. Update the route table for the private subnets to add a default route to the NAT gateway. Attach a public Elastic IP address to the NAT gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 313

A company needs to provide customers with secure access to its data. The company processes customer data and stores the results in an Amazon S3 bucket.
All the data is subject to strong regulations and security requirements. The data must be encrypted at rest. Each customer must be able to access only their data from their AWS account. Company employees must not be able to access the data.
Which solution will meet these requirements?

- **A.** Provision an AWS Certificate Manager (ACM) certificate for each customer. Encrypt the data client-side. In the private certificate policy, deny access to the certificate for all principals except an IAM role that the customer provides.
- **B.** Provision a separate AWS Key Management Service (AWS KMS) key for each customer. Encrypt the data server-side. In the S3 bucket policy, deny decryption of data for all principals except an IAM role that the customer provides.
- **C.** Provision a separate AWS Key Management Service (AWS KMS) key for each customer. Encrypt the data server-side. In each KMS key policy, deny decryption of data for all principals except an IAM role that the customer provides. ✅
- **D.** Provision an AWS Certificate Manager (ACM) certificate for each customer. Encrypt the data client-side. In the public certificate policy, deny access to the certificate for all principals except an IAM role that the customer provides.

**Answer:** C

**Explanation:**

Correct Answer:Provision a separate AWS Key Management Service (AWS KMS) key for each customer. Encrypt the data server-side. In each KMS key policy, deny decryption of data for all principals except an IAM role that the customer provides.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision a separate AWS Key Management Service (AWS KMS) key for each customer. Encrypt the data server-side. In each KMS key policy, deny decryption of data for all principals except an IAM role that the customer provides. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Provision an AWS Certificate Manager (ACM) certificate for each customer. Encrypt the data client-side. In the private certificate policy, deny access to the certificate for all principals except an IAM role that the customer provides. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision a separate AWS Key Management Service (AWS KMS) key for each customer. Encrypt the data server-side. In the S3 bucket policy, deny decryption of data for all principals except an IAM role that the customer provides. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an AWS Certificate Manager (ACM) certificate for each customer. Encrypt the data client-side. In the public certificate policy, deny access to the certificate for all principals except an IAM role that the customer provides. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 314

A company is building a microservices-based application that will be deployed on Amazon Elastic Kubernetes Service (Amazon EKS). The microservices will interact with each other. The company wants to ensure that the application is observable to identify performance issues in the future.
Which solution will meet these requirements?

- **A.** Configure AWS CloudTrail to review the API calls. Build an Amazon QuickSight dashboard to observe the microservice interactions.
- **B.** Configure Amazon CloudWatch Container Insights to collect metrics from the EKS clusters. Configure AWS X-Ray to trace the requests between the microservices. ✅
- **C.** Configure the application to use Amazon ElastiCache to reduce the number of requests that are sent to the microservices.
- **D.** Use AWS Trusted Advisor to understand the performance of the application.

**Answer:** B

**Explanation:**

Correct Answer:Configure Amazon CloudWatch Container Insights to collect metrics from the EKS clusters. Configure AWS X-Ray to trace the requests between the microservices.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon CloudWatch Container Insights to collect metrics from the EKS clusters. Configure AWS X-Ray to trace the requests between the microservices. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure AWS CloudTrail to review the API calls. Build an Amazon QuickSight dashboard to observe the microservice interactions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the application to use Amazon ElastiCache to reduce the number of requests that are sent to the microservices. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Trusted Advisor to understand the performance of the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 315

A company runs a stateful production application on Amazon EC2 instances. The application requires at least two EC2 instances to always be running.
A solutions architect needs to design a highly available and fault-tolerant architecture for the application. The solutions architect creates an Auto Scaling group of EC2 instances.
Which set of additional steps should the solutions architect take to meet these requirements?

- **A.** Set the Auto Scaling group's minimum capacity to four. Deploy two On-Demand Instances in one Availability Zone and two Spot Instances in a second Availability Zone.
- **B.** Set the Auto Scaling group's minimum capacity to two. Deploy four Spot Instances in one Availability Zone.
- **C.** Set the Auto Scaling group's minimum capacity to four. Deploy two On-Demand Instances in one Availability Zone and two On-Demand Instances in a second Availability Zone. ✅
- **D.** Set the Auto Scaling group's minimum capacity to two. Deploy one On-Demand Instance in one Availability Zone and one On-Demand Instance in a second Availability Zone.

**Answer:** C

**Explanation:**

Correct Answer:Set the Auto Scaling group's minimum capacity to four. Deploy two On-Demand Instances in one Availability Zone and two On-Demand Instances in a second Availability Zone.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set the Auto Scaling group's minimum capacity to four. Deploy two On-Demand Instances in one Availability Zone and two On-Demand Instances in a second Availability Zone. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set the Auto Scaling group's minimum capacity to four. Deploy two On-Demand Instances in one Availability Zone and two Spot Instances in a second Availability Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set the Auto Scaling group's minimum capacity to two. Deploy four Spot Instances in one Availability Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set the Auto Scaling group's minimum capacity to two. Deploy one On-Demand Instance in one Availability Zone and one On-Demand Instance in a second Availability Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 316

A company uses locally attached storage to run a latency-sensitive application on premises. The company is using a lift and shift method to move the application to the AWS Cloud. The company does not want to change the application architecture.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Host the application on an Amazon EC2 instance. Use an Amazon Elastic Block Store (Amazon EBS) GP3 volume to run the application. ✅
- **B.** Configure an Auto Scaling group with an Amazon EC2 instance. Use an Amazon FSx for OpenZFS file system to run the application.
- **C.** Host the application on an Amazon EC2 instance. Use an Amazon Elastic Block Store (Amazon EBS) GP2 volume to run the application.
- **D.** Configure an Auto Scaling group with an Amazon EC2 instance. Use an Amazon FSx for Lustre file system to run the application.

**Answer:** A

**Explanation:**

Correct Answer:Host the application on an Amazon EC2 instance. Use an Amazon Elastic Block Store (Amazon EBS) GP3 volume to run the application.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Host the application on an Amazon EC2 instance. Use an Amazon Elastic Block Store (Amazon EBS) GP3 volume to run the application. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Auto Scaling group with an Amazon EC2 instance. Use an Amazon FSx for OpenZFS file system to run the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Host the application on an Amazon EC2 instance. Use an Amazon Elastic Block Store (Amazon EBS) GP2 volume to run the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an Auto Scaling group with an Amazon EC2 instance. Use an Amazon FSx for Lustre file system to run the application. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 317

A company runs an application that uses Amazon RDS for PostgreSQL. The application receives traffic only on weekdays during business hours. The company wants to optimize costs and reduce operational overhead based on this usage.
Which solution will meet these requirements?

- **A.** Turn off automatic backups. Create weekly manual snapshots of the database.
- **B.** Create a custom AWS Lambda function to start and stop the database based on minimum CPU utilization.
- **C.** Purchase All Upfront reserved DB instances.
- **D.** Use the Instance Scheduler on AWS to configure start and stop schedules. ✅

**Answer:** D

**Explanation:**

Correct Answer:Use the Instance Scheduler on AWS to configure start and stop schedules.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use the Instance Scheduler on AWS to configure start and stop schedules. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Turn off automatic backups. Create weekly manual snapshots of the database. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a custom AWS Lambda function to start and stop the database based on minimum CPU utilization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Purchase All Upfront reserved DB instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 318

A company deployed a serverless application that uses Amazon DynamoDB as a database layer. The application has experienced a large increase in users. The company wants to improve database response time from milliseconds to microseconds and to cache requests to the database.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use Amazon ElastiCache for Redis.
- **B.** Migrate the database to Amazon RDS.
- **C.** Migrate the database to Amazon Redshift.
- **D.** Use DynamoDB Accelerator (DAX). ✅

**Answer:** D

**Explanation:**

Correct Answer:Use DynamoDB Accelerator (DAX).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use DynamoDB Accelerator (DAX). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon ElastiCache for Redis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon RDS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon Redshift. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 319

A company uses an Amazon CloudFront distribution to serve content pages for its website. The company needs to ensure that clients use a TLS certificate when accessing the company's website. The company wants to automate the creation and renewal of the TLS certificates.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Use AWS Certificate Manager (ACM) to create a certificate. Use email validation for the domain.
- **B.** Use AWS Certificate Manager (ACM) to create a certificate. Use DNS validation for the domain. ✅
- **C.** Use a CloudFront origin access control (OAC) to create a certificate.
- **D.** Use a CloudFront security policy to create a certificate.

**Answer:** B

**Explanation:**

Correct Answer:Use AWS Certificate Manager (ACM) to create a certificate. Use DNS validation for the domain.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Certificate Manager (ACM) to create a certificate. Use DNS validation for the domain. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Certificate Manager (ACM) to create a certificate. Use email validation for the domain. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a CloudFront origin access control (OAC) to create a certificate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a CloudFront security policy to create a certificate. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 320

A company is building a RESTful serverless web application on AWS by using Amazon API Gateway and AWS Lambda. The users of this web application will be geographically distributed, and the company wants to reduce the latency of API requests to these users.
Which type of endpoint should a solutions architect use to meet these requirements?

- **A.** Edge-optimized endpoint ✅
- **B.** Interface VPC endpoint
- **C.** Regional endpoint
- **D.** Private endpoint

**Answer:** A

**Explanation:**

Correct Answer:Edge-optimized endpoint

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Edge-optimized endpoint - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Interface VPC endpoint - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Regional endpoint - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Private endpoint - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 321

A company deploys its applications on Amazon Elastic Kubernetes Service (Amazon EKS) behind an Application Load Balancer in an AWS Region. The application needs to store data in a PostgreSQL database engine. The company wants the data in the database to be highly available. The company also needs increased capacity for read workloads.
Which solution will meet these requirements with the MOST operational efficiency?

- **A.** Create an Amazon RDS database configured with cross-Region read replicas.
- **B.** Create an Amazon RDS database with Multi-AZ DB cluster deployment. ✅
- **C.** Create an Amazon RDS database with Multi-AZ deployments.
- **D.** Create an Amazon DynamoDB database table configured with global tables.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon RDS database with Multi-AZ DB cluster deployment.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon RDS database with Multi-AZ DB cluster deployment. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon RDS database configured with cross-Region read replicas. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon RDS database with Multi-AZ deployments. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon DynamoDB database table configured with global tables. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 322

A financial services company launched a new application that uses an Amazon RDS for MySQL database. The company uses the application to track stock market trends. The company needs to operate the application for only 2 hours at the end of each week. The company needs to optimize the cost of running the database.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Migrate the existing RDS for MySQL database to an Amazon Elastic Container Service (Amazon ECS) cluster that uses MySQL container images to run tasks.
- **B.** Migrate the existing RDS for MySQL database to an Amazon EC2 instance that runs MySQL. Purchase an instance reservation for the EC2 instance.
- **C.** Migrate the existing RDS for MySQL database to an Aurora MySQL database cluster.
- **D.** Migrate the existing RDS for MySQL database to an Aurora Serverless v2 MySQL database cluster. ✅

**Answer:** D

**Explanation:**

Correct Answer:Migrate the existing RDS for MySQL database to an Aurora Serverless v2 MySQL database cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the existing RDS for MySQL database to an Aurora Serverless v2 MySQL database cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the existing RDS for MySQL database to an Amazon Elastic Container Service (Amazon ECS) cluster that uses MySQL container images to run tasks. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the existing RDS for MySQL database to an Amazon EC2 instance that runs MySQL. Purchase an instance reservation for the EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the existing RDS for MySQL database to an Aurora MySQL database cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 323

A company wants to use an event-driven programming model with AWS Lambda. The company wants to reduce startup latency for Lambda functions that run on Java 11. The company does not have strict latency requirements for the applications. The company wants to reduce cold starts and outlier latencies when a function scales up.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Increase the timeout of the Lambda functions.
- **B.** Increase the memory of the Lambda functions.
- **C.** Configure Lambda provisioned concurrency.
- **D.** Configure Lambda SnapStart. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure Lambda SnapStart.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Lambda SnapStart. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Increase the timeout of the Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Increase the memory of the Lambda functions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Lambda provisioned concurrency. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 324

A company is migrating its workloads to AWS. The company has transactional and sensitive data in its databases. The company wants to use AWS Cloud solutions to increase security and reduce operational overhead for the databases.
Which solution will meet these requirements?

- **A.** Migrate the database to Amazon RDS. Use Amazon CloudWatch Logs for data security and protection.
- **B.** Migrate the data to Amazon S3 Use Amazon Macie for data security and protection
- **C.** Migrate the databases to Amazon RDS Configure encryption at rest. ✅
- **D.** Migrate the databases to Amazon EC2. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption.

**Answer:** C

**Explanation:**

Correct Answer:Migrate the databases to Amazon RDS Configure encryption at rest.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the databases to Amazon RDS Configure encryption at rest. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the database to Amazon RDS. Use Amazon CloudWatch Logs for data security and protection. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the data to Amazon S3 Use Amazon Macie for data security and protection - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the databases to Amazon EC2. Use an AWS Key Management Service (AWS KMS) AWS managed key for encryption. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 325

A company wants to analyze and troubleshoot Access Denied errors and Unauthorized errors that are related to IAM permissions. The company has AWS CloudTrail turned on.
Which solution will meet these requirements with the LEAST effort?

- **A.** Search CloudTrail logs with Amazon Athena queries to identify the errors. ✅
- **B.** Use AWS Glue and write custom scripts to query CloudTrail logs for the errors.
- **C.** Search CloudTrail logs with Amazon QuickSight. Create a dashboard to identify the errors.
- **D.** Use AWS Batch and write custom scripts to query CloudTrail logs for the errors.

**Answer:** A

**Explanation:**

Correct Answer:Search CloudTrail logs with Amazon Athena queries to identify the errors.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Search CloudTrail logs with Amazon Athena queries to identify the errors. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Glue and write custom scripts to query CloudTrail logs for the errors. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Search CloudTrail logs with Amazon QuickSight. Create a dashboard to identify the errors. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Batch and write custom scripts to query CloudTrail logs for the errors. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 326

An ecommerce company needs to run a scheduled daily job to aggregate and filter sales records for analytics. The company stores the sales records in an Amazon S3 bucket. Each object can be up to 10 GB in size. Based on the number of sales events, the job can take up to an hour to complete. The CPU and memory usage of the job are constant and are known in advance.
A solutions architect needs to minimize the amount of operational effort that is needed for the job to run.
Which solution meets these requirements?

- **A.** Create an Amazon Elastic Container Service (Amazon ECS) cluster with an AWS Fargate launch type. Create an Amazon EventBridge scheduled event that launches an ECS task on the cluster to run the job. ✅
- **B.** Create an AWS Lambda function. Create an Amazon API Gateway HTTP API, and integrate the API with the function. Create an Amazon EventBridge scheduled event that calls the API and invokes the function.
- **C.** Create an Amazon Elastic Container Service (Amazon ECS) cluster with an Amazon EC2 launch type and an Auto Scaling group with at least one EC2 instance. Create an Amazon EventBridge scheduled event that launches an ECS task on the cluster to run the job.
- **D.** Create an AWS Lambda function that has an Amazon EventBridge notification. Schedule the EventBridge event to run once a day.

**Answer:** A

**Explanation:**

Correct Answer:Create an Amazon Elastic Container Service (Amazon ECS) cluster with an AWS Fargate launch type. Create an Amazon EventBridge scheduled event that launches an ECS task on the cluster to run the job.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon Elastic Container Service (Amazon ECS) cluster with an AWS Fargate launch type. Create an Amazon EventBridge scheduled event that launches an ECS task on the cluster to run the job. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an AWS Lambda function. Create an Amazon API Gateway HTTP API, and integrate the API with the function. Create an Amazon EventBridge scheduled event that calls the API and invokes the function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon Elastic Container Service (Amazon ECS) cluster with an Amazon EC2 launch type and an Auto Scaling group with at least one EC2 instance. Create an Amazon EventBridge scheduled event that launches an ECS task on the cluster to run the job. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function that has an Amazon EventBridge notification. Schedule the EventBridge event to run once a day. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 327

A company has a web application that includes an embedded NoSQL database. The application runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The instances run in an Amazon EC2 Auto Scaling group in a single Availability Zone.
A recent increase in traffic requires the application to be highly available and for the database to be eventually consistent.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Replace the ALB with a Network Load Balancer. Migrate the embedded NoSQL database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS).
- **B.** Modify the Auto Scaling group to use EC2 instances across three Availability Zones. Migrate the embedded NoSQL database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). ✅
- **C.** Replace the ALB with a Network Load Balancer. Maintain the embedded NoSQL database with its replication service on the EC2 instances.
- **D.** Modify the Auto Scaling group to use EC2 instances across three Availability Zones. Maintain the embedded NoSQL database with its replication service on the EC2 instances.

**Answer:** B

**Explanation:**

Correct Answer:Modify the Auto Scaling group to use EC2 instances across three Availability Zones. Migrate the embedded NoSQL database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS).

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Modify the Auto Scaling group to use EC2 instances across three Availability Zones. Migrate the embedded NoSQL database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Replace the ALB with a Network Load Balancer. Migrate the embedded NoSQL database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Replace the ALB with a Network Load Balancer. Maintain the embedded NoSQL database with its replication service on the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Modify the Auto Scaling group to use EC2 instances across three Availability Zones. Maintain the embedded NoSQL database with its replication service on the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 328

A company is deploying an application in three AWS Regions using an Application Load Balancer. Amazon Route 53 will be used to distribute traffic between these Regions.
Which Route 53 configuration should a solutions architect use to provide the MOST high-performing experience?

- **A.** Create a CNAME record with a failover policy.
- **B.** Create an A record with a geolocation policy.
- **C.** Create a CNAME record with a geoproximity policy.
- **D.** Create an A record with a latency policy. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create an A record with a latency policy.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an A record with a latency policy. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a CNAME record with a failover policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an A record with a geolocation policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a CNAME record with a geoproximity policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 329

A solutions architect is designing a shared storage solution for a web application that is deployed across multiple Availability Zones. The web application runs on Amazon EC2 instances that are in an Auto Scaling group. The company plans to make frequent changes to the content. The solution must have strong consistency in returning the new content as soon as the changes occur.
Which solutions meet these requirements? (Choose two.)

- **A.** Create a shared Amazon Elastic Block Store (Amazon EBS) volume. Mount the EBS volume on the individual EC2 instances.
- **B.** Create an Amazon S3 bucket to store the web content. Set the metadata for the Cache-Control header to no-cache. Use Amazon CloudFront to deliver the content. ✅
- **C.** Use AWS Storage Gateway Volume Gateway Internet Small Computer Systems Interface (iSCSI) block storage that is mounted to the individual EC2 instances.
- **D.** Create an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system on the individual EC2 instances. ✅
- **E.** Use AWS DataSync to perform continuous synchronization of data between EC2 hosts in the Auto Scaling group.

**Answer:** B, D

**Explanation:**

Correct Answer:Create an Amazon S3 bucket to store the web content. Set the metadata for the Cache-Control header to no-cache. Use Amazon CloudFront to deliver the content.; Create an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system on the individual EC2 instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon S3 bucket to store the web content. Set the metadata for the Cache-Control header to no-cache. Use Amazon CloudFront to deliver the content. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Amazon Elastic File System (Amazon EFS) file system. Mount the EFS file system on the individual EC2 instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a shared Amazon Elastic Block Store (Amazon EBS) volume. Mount the EBS volume on the individual EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Storage Gateway Volume Gateway Internet Small Computer Systems Interface (iSCSI) block storage that is mounted to the individual EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS DataSync to perform continuous synchronization of data between EC2 hosts in the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 330

A company regularly uploads GB-sized files to Amazon S3. After the company uploads the files, the company uses a fleet of Amazon EC2 Spot Instances to transcode the file format. The company needs to scale throughput when the company uploads data from the on-premises data center to Amazon S3 and when the company downloads data from Amazon S3 to the EC2 instances.
Which solutions will meet these requirements? (Choose two.)

- **A.** Use the S3 bucket access point instead of accessing the S3 bucket directly.
- **B.** Upload the files into multiple S3 buckets.
- **C.** Use S3 multipart uploads. ✅
- **D.** Fetch multiple byte-ranges of an object in parallel. ✅
- **E.** Add a random prefix to each object when uploading the files.

**Answer:** C, D

**Explanation:**

Correct Answer:Use S3 multipart uploads.; Fetch multiple byte-ranges of an object in parallel.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use S3 multipart uploads. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Fetch multiple byte-ranges of an object in parallel. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use the S3 bucket access point instead of accessing the S3 bucket directly. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Upload the files into multiple S3 buckets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add a random prefix to each object when uploading the files. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 331

A company wants to standardize its Amazon Elastic Block Store (Amazon EBS) volume encryption strategy. The company also wants to minimize the cost and configuration effort required to operate the volume encryption check.
Which solution will meet these requirements?

- **A.** Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Use Amazon EventBridge to schedule an AWS Lambda function to run the API calls.
- **B.** Create an AWS Identity and Access Management (IAM) policy that requires the use of tags on EBS volumes. Use AWS Cost Explorer to display resources that are not properly tagged. Encrypt the untagged resources manually.
- **C.** Create an AWS Config rule for Amazon EBS to evaluate if a volume is encrypted and to flag the volume if it is not encrypted. ✅
- **D.** Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Run the API calls on an AWS Fargate task.

**Answer:** C

**Explanation:**

Correct Answer:Create an AWS Config rule for Amazon EBS to evaluate if a volume is encrypted and to flag the volume if it is not encrypted.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Config rule for Amazon EBS to evaluate if a volume is encrypted and to flag the volume if it is not encrypted. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Use Amazon EventBridge to schedule an AWS Lambda function to run the API calls. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Identity and Access Management (IAM) policy that requires the use of tags on EBS volumes. Use AWS Cost Explorer to display resources that are not properly tagged. Encrypt the untagged resources manually. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Write API calls to describe the EBS volumes and to confirm the EBS volumes are encrypted. Run the API calls on an AWS Fargate task. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 332

A company manages AWS accounts in AWS Organizations. AWS IAM Identity Center (AWS Single Sign-On) and AWS Control Tower are configured for the accounts. The company wants to manage multiple user permissions across all the accounts.
The permissions will be used by multiple users and must be split between the developer and administrator teams. Each team requires different permissions. The company wants a solution that includes new users that are hired on both teams.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create individual users in IAM Identity Center. Create new developer and administrator groups in IAM Identity Center. Create new permission sets that include the appropriate IAM policies for each group. Assign the new groups to the appropriate accounts. Assign the new permission sets to the new groups. When new users are hired, add them to the appropriate group. ✅
- **B.** Create individual users in IAM Identity Center. Create new permission sets that include the appropriate IAM policies for each user. Assign the users to the appropriate accounts. Grant additional IAM permissions to the users from within specific accounts. When new users are hired, add them to IAM Identity Center and assign them to the accounts.
- **C.** Create individual users in IAM Identity Center for each account. Create separate developer and administrator groups in IAM Identity Center. Assign the users to the appropriate groups. Attach AWS managed IAM policies to each user as needed for fine-grained permissions.
- **D.** Create individual users in IAM Identity Center for each account. Create separate developer and administrator groups in IAM Identity Center. Assign the users to the appropriate groups. Create a custom IAM policy for each group to set fine-grained permissions.

**Answer:** A

**Explanation:**

Correct Answer:Create individual users in IAM Identity Center. Create new developer and administrator groups in IAM Identity Center. Create new permission sets that include the appropriate IAM policies for each group. Assign the new groups to the appropriate accounts. Assign the new permission sets to the new groups. When new users are hired, add them to the appropriate group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create individual users in IAM Identity Center. Create new developer and administrator groups in IAM Identity Center. Create new permission sets that include the appropriate IAM policies for each group. Assign the new groups to the appropriate accounts. Assign the new permission sets to the new groups. When new users are hired, add them to the appropriate group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create individual users in IAM Identity Center. Create new permission sets that include the appropriate IAM policies for each user. Assign the users to the appropriate accounts. Grant additional IAM permissions to the users from within specific accounts. When new users are hired, add them to IAM Identity Center and assign them to the accounts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create individual users in IAM Identity Center for each account. Create separate developer and administrator groups in IAM Identity Center. Assign the users to the appropriate groups. Attach AWS managed IAM policies to each user as needed for fine-grained permissions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create individual users in IAM Identity Center for each account. Create separate developer and administrator groups in IAM Identity Center. Assign the users to the appropriate groups. Create a custom IAM policy for each group to set fine-grained permissions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 333

A company wants to migrate 100 GB of historical data from an on-premises location to an Amazon S3 bucket. The company has a 100 megabits per second (Mbps) internet connection on premises. The company needs to encrypt the data in transit to the S3 bucket. The company will store new data directly in Amazon S3.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Set up an IPsec VPN from the on-premises location to AWS. Use the s3 cp command in the AWS CLI to move the data directly to an S3 bucket
- **B.** Use AWS DataSync to migrate the data from the on-premises location to an S3 bucket ✅
- **C.** Use the s3 sync command in the AWS CLI to move the data directly to an S3 bucket
- **D.** Use AWS Snowball to move the data to an S3 bucket

**Answer:** B

**Explanation:**

Correct Answer:Use AWS DataSync to migrate the data from the on-premises location to an S3 bucket

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS DataSync to migrate the data from the on-premises location to an S3 bucket - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up an IPsec VPN from the on-premises location to AWS. Use the s3 cp command in the AWS CLI to move the data directly to an S3 bucket - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the s3 sync command in the AWS CLI to move the data directly to an S3 bucket - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Snowball to move the data to an S3 bucket - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 334

An IAM user made several configuration changes to AWS resources in their company's account during a production deployment last week. A solutions architect learned that a couple of security group rules are not configured as desired. The solutions architect wants to confirm which IAM user was responsible for making changes.
Which service should the solutions architect use to find the desired information?

- **A.** AWS Config
- **B.** AWS CloudTrail ✅
- **C.** Amazon Inspector
- **D.** Amazon GuardDuty

**Answer:** B

**Explanation:**

Correct Answer:AWS CloudTrail

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- AWS CloudTrail - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- AWS Config - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon Inspector - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon GuardDuty - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 335

A company’s ecommerce website has unpredictable traffic and uses AWS Lambda functions to directly access a private Amazon RDS for PostgreSQL DB instance. The company wants to maintain predictable database performance and ensure that the Lambda invocations do not overload the database with too many connections.
What should a solutions architect do to meet these requirements?

- **A.** Point the client driver at an RDS custom endpoint. Deploy the Lambda functions outside a VPC.
- **B.** Point the client driver at an RDS proxy endpoint. Deploy the Lambda functions inside a VPC. ✅
- **C.** Point the client driver at an RDS proxy endpoint. Deploy the Lambda functions outside a VPC.
- **D.** Point the client driver at an RDS custom endpoint. Deploy the Lambda functions inside a VPC.

**Answer:** B

**Explanation:**

Correct Answer:Point the client driver at an RDS proxy endpoint. Deploy the Lambda functions inside a VPC.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Point the client driver at an RDS proxy endpoint. Deploy the Lambda functions inside a VPC. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Point the client driver at an RDS custom endpoint. Deploy the Lambda functions outside a VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Point the client driver at an RDS proxy endpoint. Deploy the Lambda functions outside a VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Point the client driver at an RDS custom endpoint. Deploy the Lambda functions inside a VPC. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 336

A company wants to migrate its web applications from on premises to AWS. The company is located close to the eu-central-1 Region. Because of regulations, the company cannot launch some of its applications in eu-central-1. The company wants to achieve single-digit millisecond latency.
Which solution will meet these requirements?

- **A.** Deploy the applications in AWS Wavelength Zones by extending the company’s VPC from eu-central-1 to the chosen Wavelength Zone.
- **B.** Deploy the applications in AWS Local Zones by extending the company's VPC from eu-central-1 to the chosen Local Zone. ✅
- **C.** Deploy the applications in eu-central-1. Extend the company’s VPC from eu-central-1 to the regional edge caches in Amazon CloudFront.
- **D.** Deploy the applications in eu-central-1. Extend the company’s VPC from eu-central-1 to an edge location in Amazon CloudFront.

**Answer:** B

**Explanation:**

Correct Answer:Deploy the applications in AWS Local Zones by extending the company's VPC from eu-central-1 to the chosen Local Zone.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deploy the applications in AWS Local Zones by extending the company's VPC from eu-central-1 to the chosen Local Zone. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deploy the applications in AWS Wavelength Zones by extending the company's VPC from eu-central-1 to the chosen Wavelength Zone. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the applications in eu-central-1. Extend the company's VPC from eu-central-1 to the regional edge caches in Amazon CloudFront. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy the applications in eu-central-1. Extend the company's VPC from eu-central-1 to an edge location in Amazon CloudFront. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 337

A company is migrating its multi-tier on-premises application to AWS. The application consists of a single-node MySQL database and a multi-node web tier. The company must minimize changes to the application during the migration. The company wants to improve application resiliency after the migration.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Migrate the database to an Amazon DynamoDB table.
- **B.** Migrate the web tier to Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. ✅
- **C.** Migrate the database to Amazon EC2 instances in an Auto Scaling group behind a Network Load Balancer.
- **D.** Migrate the database to an Amazon RDS Multi-AZ deployment. ✅
- **E.** Migrate the web tier to an AWS Lambda function.

**Answer:** B, D

**Explanation:**

Correct Answer:Migrate the web tier to Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer.; Migrate the database to an Amazon RDS Multi-AZ deployment.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the web tier to Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Migrate the database to an Amazon RDS Multi-AZ deployment. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the database to an Amazon DynamoDB table. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the database to Amazon EC2 instances in an Auto Scaling group behind a Network Load Balancer. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Migrate the web tier to an AWS Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 338

A company needs a solution to enforce data encryption at rest on Amazon EC2 instances. The solution must automatically identify noncompliant resources and enforce compliance policies on findings.
Which solution will meet these requirements with the LEAST administrative overhead?

- **A.** Use an IAM policy that allows users to create only encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Config and AWS Systems Manager to automate the detection and remediation of unencrypted EBS volumes. ✅
- **B.** Use AWS Key Management Service (AWS KMS) to manage access to encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Lambda and Amazon EventBridge to automate the detection and remediation of unencrypted EBS volumes.
- **C.** Use Amazon Macie to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes.
- **D.** Use Amazon inspector to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes.

**Answer:** A

**Explanation:**

Correct Answer:Use an IAM policy that allows users to create only encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Config and AWS Systems Manager to automate the detection and remediation of unencrypted EBS volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an IAM policy that allows users to create only encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Config and AWS Systems Manager to automate the detection and remediation of unencrypted EBS volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Key Management Service (AWS KMS) to manage access to encrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Lambda and Amazon EventBridge to automate the detection and remediation of unencrypted EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Macie to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon inspector to detect unencrypted Amazon Elastic Block Store (Amazon EBS) volumes. Use AWS Systems Manager Automation rules to automatically encrypt existing and new EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 339

A company uses Amazon EC2 instances and stores data on Amazon Elastic Block Store (Amazon EBS) volumes. The company must ensure that all data is encrypted at rest by using AWS Key Management Service (AWS KMS). The company must be able to control rotation of the encryption keys.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use an AWS owned key to encrypt the EBS volumes.
- **B.** Create a customer managed key. Use the key to encrypt the EBS volumes. ✅
- **C.** Use an AWS managed key to encrypt the EBS volumes. Use the key to configure automatic key rotation.
- **D.** Create an external KMS key with imported key material. Use the key to encrypt the EBS volumes.

**Answer:** B

**Explanation:**

Correct Answer:Create a customer managed key. Use the key to encrypt the EBS volumes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a customer managed key. Use the key to encrypt the EBS volumes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS owned key to encrypt the EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS managed key to encrypt the EBS volumes. Use the key to configure automatic key rotation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an external KMS key with imported key material. Use the key to encrypt the EBS volumes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 340

A company uses Amazon EC2 instances to host its internal systems. As part of a deployment operation, an administrator tries to use the AWS CLI to terminate an EC2 instance. However, the administrator receives a 403 (Access Denied) error message.
The administrator is using an IAM role that has the following IAM policy attached:
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": ["ec2:TerminateInstances"],
"Resource": ["*"]
},
{
"Effect": "Deny",
"Action": ["ec2:TerminateInstances"],
"Condition": {
"NotIpAddress": {
"aws:SourceIp": [
"192.0.2.0/24",
"203.0.113.0/24"
]
}
},
"Resource": ["*"]
}
]
}
What is the cause of the unsuccessful request?

- **A.** The request to terminate the EC2 instance does not originate from the CIDR blocks 192.0.2.0/24 or 203.0.113.0/24. ✅
- **B.** The "Action" field does not grant the actions that are required to terminate the EC2 instance.
- **C.** The principal has not been specified in the policy statement.
- **D.** The EC2 instance has a resource-based policy with a Deny statement.

**Answer:** A

**Explanation:**

Correct Answer:The request to terminate the EC2 instance does not originate from the CIDR blocks 192.0.2.0/24 or 203.0.113.0/24.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- The request to terminate the EC2 instance does not originate from the CIDR blocks 192.0.2.0/24 or 203.0.113.0/24. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- The "Action" field does not grant the actions that are required to terminate the EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- The principal has not been specified in the policy statement. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- The EC2 instance has a resource-based policy with a Deny statement. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 341

A company's reporting system delivers hundreds of .csv files to an Amazon S3 bucket each day. The company must convert these files to Apache Parquet format and must store the files in a transformed data bucket.
Which solution will meet these requirements with the LEAST development effort?

- **A.** Create an Amazon EMR cluster with Apache Spark installed. Write a Spark application to transform the data. Use EMR File System (EMRFS) to write files to the transformed data bucket.
- **B.** Create an AWS Glue crawler to discover the data. Create an AWS Glue extract, transform, and load (ETL) job to transform the data. Specify the transformed data bucket in the output step. ✅
- **C.** Use AWS Batch to create a job definition with Bash syntax to transform the data and output the data to the transformed data bucket. Use the job definition to submit a job. Specify an array job as the job type.
- **D.** Create an AWS Lambda function to transform the data and output the data to the transformed data bucket. Configure an event notification for the S3 bucket. Specify the Lambda function as the destination for the event notification.

**Answer:** B

**Explanation:**

Correct Answer:Create an AWS Glue crawler to discover the data. Create an AWS Glue extract, transform, and load (ETL) job to transform the data. Specify the transformed data bucket in the output step.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Glue crawler to discover the data. Create an AWS Glue extract, transform, and load (ETL) job to transform the data. Specify the transformed data bucket in the output step. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon EMR cluster with Apache Spark installed. Write a Spark application to transform the data. Use EMR File System (EMRFS) to write files to the transformed data bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Batch to create a job definition with Bash syntax to transform the data and output the data to the transformed data bucket. Use the job definition to submit a job. Specify an array job as the job type. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function to transform the data and output the data to the transformed data bucket. Configure an event notification for the S3 bucket. Specify the Lambda function as the destination for the event notification. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 342

A company has a mobile chat application with a data store based in Amazon DynamoDB. Users would like new messages to be read with as little latency as possible. A solutions architect needs to design an optimal solution that requires minimal application changes.
Which method should the solutions architect select?

- **A.** Add an Amazon ElastiCache for Redis cache to the application stack. Update the application to point to the Redis cache endpoint instead of DynamoDB.
- **B.** Add DynamoDB read replicas to handle the increased read load. Update the application to point to the read endpoint for the read replicas.
- **C.** Configure Amazon DynamoDB Accelerator (DAX) for the new messages table. Update the code to use the DAX endpoint. ✅
- **D.** Double the number of read capacity units for the new messages table in DynamoDB. Continue to use the existing DynamoDB endpoint.

**Answer:** C

**Explanation:**

Correct Answer:Configure Amazon DynamoDB Accelerator (DAX) for the new messages table. Update the code to use the DAX endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure Amazon DynamoDB Accelerator (DAX) for the new messages table. Update the code to use the DAX endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add an Amazon ElastiCache for Redis cache to the application stack. Update the application to point to the Redis cache endpoint instead of DynamoDB. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add DynamoDB read replicas to handle the increased read load. Update the application to point to the read endpoint for the read replicas. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Double the number of read capacity units for the new messages table in DynamoDB. Continue to use the existing DynamoDB endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 343

A company runs an infrastructure monitoring service. The company is building a new feature that will enable the service to monitor data in customer AWS accounts. The new feature will call AWS APIs in customer accounts to describe Amazon EC2 instances and read Amazon CloudWatch metrics.
What should the company do to obtain access to customer accounts in the MOST secure way?

- **A.** Ensure that the customers create an IAM role in their account with read-only EC2 and CloudWatch permissions and a trust policy to the company's account. ✅
- **B.** Create a serverless API that implements a token vending machine to provide temporary AWS credentials for a role with read-only EC2 and CloudWatch permissions.
- **C.** Ensure that the customers create an IAM user in their account with read-only EC2 and CloudWatch permissions. Encrypt and store customer access and secret keys in a secrets management system.
- **D.** Ensure that the customers create an Amazon Cognito user in their account to use an IAM role with read-only EC2 and CloudWatch permissions. Encrypt and store the Amazon Cognito user and password in a secrets management system.

**Answer:** A

**Explanation:**

Correct Answer:Ensure that the customers create an IAM role in their account with read-only EC2 and CloudWatch permissions and a trust policy to the company's account.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Ensure that the customers create an IAM role in their account with read-only EC2 and CloudWatch permissions and a trust policy to the company's account. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a serverless API that implements a token vending machine to provide temporary AWS credentials for a role with read-only EC2 and CloudWatch permissions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Ensure that the customers create an IAM user in their account with read-only EC2 and CloudWatch permissions. Encrypt and store customer access and secret keys in a secrets management system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Ensure that the customers create an Amazon Cognito user in their account to use an IAM role with read-only EC2 and CloudWatch permissions. Encrypt and store the Amazon Cognito user and password in a secrets management system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 344

A company's application uses Network Load Balancers, Auto Scaling groups, Amazon EC2 instances, and databases that are deployed in an Amazon VPC. The company wants to capture information about traffic to and from the network interfaces in near real time in its Amazon VPC. The company wants to send the information to Amazon OpenSearch Service for analysis.
Which solution will meet these requirements?

- **A.** Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Kinesis Data Streams to stream the logs from the trail to OpenSearch Service.
- **B.** Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Firehose to stream the logs from the log group to OpenSearch Service. ✅
- **C.** Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Streams to stream the logs from the log group to OpenSearch Service.
- **D.** Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Kinesis Data Firehose to stream the logs from the trail to OpenSearch Service.

**Answer:** B

**Explanation:**

Correct Answer:Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Firehose to stream the logs from the log group to OpenSearch Service.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Firehose to stream the logs from the log group to OpenSearch Service. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Kinesis Data Streams to stream the logs from the trail to OpenSearch Service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a log group in Amazon CloudWatch Logs. Configure VPC Flow Logs to send the log data to the log group. Use Amazon Kinesis Data Streams to stream the logs from the log group to OpenSearch Service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a trail in AWS CloudTrail. Configure VPC Flow Logs to send the log data to the trail. Use Amazon Kinesis Data Firehose to stream the logs from the trail to OpenSearch Service. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 345

A company uses Amazon EC2 instances and Amazon Elastic Block Store (Amazon EBS) volumes to run an application. The company creates one snapshot of each EBS volume every day to meet compliance requirements. The company wants to implement an architecture that prevents the accidental deletion of EBS volume snapshots. The solution must not change the administrative rights of the storage administrator user.
Which solution will meet these requirements with the LEAST administrative effort?

- **A.** Create an IAM role that has permission to delete snapshots. Attach the role to a new EC2 instance. Use the AWS CLI from the new EC2 instance to delete snapshots.
- **B.** Lock the EBS snapshots to prevent deletion. ✅
- **C.** Create an IAM policy that denies snapshot deletion. Attach the policy to the storage administrator user.
- **D.** Add tags to the snapshots. Create retention rules in Recycle Bin for EBS snapshots that have the tags.

**Answer:** B

**Explanation:**

Correct Answer:Lock the EBS snapshots to prevent deletion.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Lock the EBS snapshots to prevent deletion. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an IAM role that has permission to delete snapshots. Attach the role to a new EC2 instance. Use the AWS CLI from the new EC2 instance to delete snapshots. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an IAM policy that denies snapshot deletion. Attach the policy to the storage administrator user. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Add tags to the snapshots. Create retention rules in Recycle Bin for EBS snapshots that have the tags. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 346

A company runs a web application on Amazon EC2 instances in an Auto Scaling group. The application uses a database that runs on an Amazon RDS for PostgreSQL DB instance. The application performs slowly when traffic increases. The database experiences a heavy read load during periods of high traffic.
Which actions should a solutions architect take to resolve these performance issues? (Choose two.)

- **A.** Turn on auto scaling for the DB instance.
- **B.** Create a read replica for the DB instance. Configure the application to send read traffic to the read replica. ✅
- **C.** Configure the Auto Scaling group subnets to ensure that the EC2 instances are provisioned in the same Availability Zone as the DB instance.
- **D.** Create an Amazon ElastiCache cluster. Configure the application to cache query results in the ElastiCache cluster. ✅
- **E.** Convert the DB instance to a Multi-AZ DB instance deployment. Configure the application to send read traffic to the standby DB instance.

**Answer:** B, D

**Explanation:**

Correct Answer:Create a read replica for the DB instance. Configure the application to send read traffic to the read replica.; Create an Amazon ElastiCache cluster. Configure the application to cache query results in the ElastiCache cluster.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a read replica for the DB instance. Configure the application to send read traffic to the read replica. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Amazon ElastiCache cluster. Configure the application to cache query results in the ElastiCache cluster. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Turn on auto scaling for the DB instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the Auto Scaling group subnets to ensure that the EC2 instances are provisioned in the same Availability Zone as the DB instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Convert the DB instance to a Multi-AZ DB instance deployment. Configure the application to send read traffic to the standby DB instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 347

A company runs an SMB file server in its data center. The file server stores large files that the company frequently accesses for up to 7 days after the file creation date. After 7 days, the company needs to be able to access the files with a maximum retrieval time of 24 hours.
Which solution will meet these requirements?

- **A.** Use AWS DataSync to copy data that is older than 7 days from the SMB file server to AWS.
- **B.** Create an Amazon S3 File Gateway to increase the company's storage space. Create an S3 Lifecycle policy to transition the data to S3 Glacier Deep Archive after 7 days. ✅
- **C.** Configure access to Amazon S3 for each user. Create an S3 Lifecycle policy to transition the data to S3 Glacier Flexible Retrieval after 7 days.
- **D.** Create an Amazon FSx File Gateway to increase the company's storage space. Create an Amazon S3 Lifecycle policy to transition the data after 7 days.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon S3 File Gateway to increase the company's storage space. Create an S3 Lifecycle policy to transition the data to S3 Glacier Deep Archive after 7 days.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon S3 File Gateway to increase the company's storage space. Create an S3 Lifecycle policy to transition the data to S3 Glacier Deep Archive after 7 days. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS DataSync to copy data that is older than 7 days from the SMB file server to AWS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure access to Amazon S3 for each user. Create an S3 Lifecycle policy to transition the data to S3 Glacier Flexible Retrieval after 7 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon FSx File Gateway to increase the company's storage space. Create an Amazon S3 Lifecycle policy to transition the data after 7 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 348

A marketing company receives a large amount of new clickstream data in Amazon S3 from a marketing campaign. The company needs to analyze the clickstream data in Amazon S3 quickly. Then the company needs to determine whether to process the data further in the data pipeline.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Create external tables in a Hive metastore. Configure Spark jobs in Amazon EMR to query the data.
- **B.** Create external tables in a Spark catalog. Configure jobs in AWS Glue to query the data.
- **C.** Configure an AWS Glue crawler to crawl the data. Configure Amazon Managed Service for Apache Flink to use SQL to query the data.
- **D.** Configure an AWS Glue crawler to crawl the data. Configure Amazon Athena to query the data. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure an AWS Glue crawler to crawl the data. Configure Amazon Athena to query the data.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an AWS Glue crawler to crawl the data. Configure Amazon Athena to query the data. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create external tables in a Hive metastore. Configure Spark jobs in Amazon EMR to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create external tables in a Spark catalog. Configure jobs in AWS Glue to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure an AWS Glue crawler to crawl the data. Configure Amazon Managed Service for Apache Flink to use SQL to query the data. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 349

A company runs its applications on Amazon EC2 instances. The company performs periodic financial assessments of its AWS costs. The company recently identified unusual spending.
The company needs a solution to prevent unusual spending. The solution must monitor costs and notify responsible stakeholders in the event of unusual spending.
Which solution will meet these requirements?

- **A.** Use an AWS Budgets template to create a zero spend budget.
- **B.** Create an AWS Cost Anomaly Detection monitor in the AWS Billing and Cost Management console. ✅
- **C.** Use Amazon CloudWatch to monitor costs and to identify unusual spending.
- **D.** Create AWS Pricing Calculator estimates for the current running workload pricing details.

**Answer:** B

**Explanation:**

Correct Answer:Create an AWS Cost Anomaly Detection monitor in the AWS Billing and Cost Management console.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an AWS Cost Anomaly Detection monitor in the AWS Billing and Cost Management console. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS Budgets template to create a zero spend budget. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon CloudWatch to monitor costs and to identify unusual spending. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create AWS Pricing Calculator estimates for the current running workload pricing details. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 350

A company's solutions architect is designing an AWS multi-account solution that uses AWS Organizations. The solutions architect has organized the company's accounts into organizational units (OUs).
The solutions architect needs a solution that will identify any changes to the OU hierarchy. The solution also needs to notify the company's operations team of any changes.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Service Catalog to create accounts in Organizations. Use an AWS CloudTrail organization trail to identify the changes to the OU hierarchy.
- **B.** Provision the AWS accounts by using AWS Control Tower. Use AWS Config aggregated rules to identify the changes to the OU hierarchy.
- **C.** Use AWS CloudFormation templates to create accounts in Organizations. Use the drift detection operation on a stack to identify the changes to the OU hierarchy.
- **D.** Provision the AWS accounts by using AWS Control Tower. Use account drift notifications to identify the changes to the OU hierarchy. ✅

**Answer:** D

**Explanation:**

Correct Answer:Provision the AWS accounts by using AWS Control Tower. Use account drift notifications to identify the changes to the OU hierarchy.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Provision the AWS accounts by using AWS Control Tower. Use account drift notifications to identify the changes to the OU hierarchy. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Service Catalog to create accounts in Organizations. Use an AWS CloudTrail organization trail to identify the changes to the OU hierarchy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision the AWS accounts by using AWS Control Tower. Use AWS Config aggregated rules to identify the changes to the OU hierarchy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS CloudFormation templates to create accounts in Organizations. Use the drift detection operation on a stack to identify the changes to the OU hierarchy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 351

A company runs its databases on Amazon RDS for PostgreSQL. The company wants a secure solution to manage the master user password by rotating the password every 30 days.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Integrate AWS Systems Manager Parameter Store with Amazon RDS for PostgreSQL to automate password rotation.
- **B.** Use Amazon EventBridge to schedule a custom AWS Lambda function to rotate the password every 30 days.
- **C.** Integrate AWS Secrets Manager with Amazon RDS for PostgreSQL to automate password rotation. ✅
- **D.** Use the modify-db-instance command in the AWS CLI to change the password.

**Answer:** C

**Explanation:**

Correct Answer:Integrate AWS Secrets Manager with Amazon RDS for PostgreSQL to automate password rotation.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Integrate AWS Secrets Manager with Amazon RDS for PostgreSQL to automate password rotation. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Integrate AWS Systems Manager Parameter Store with Amazon RDS for PostgreSQL to automate password rotation. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon EventBridge to schedule a custom AWS Lambda function to rotate the password every 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the modify-db-instance command in the AWS CLI to change the password. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 352

A company has two VPCs that are located in the us-west-2 Region within the same AWS account. The company needs to allow network traffic between these VPCs. Approximately 500 GB of data transfer will occur between the VPCs each month.
What is the MOST cost-effective solution to connect these VPCs?

- **A.** Set up a VPC peering connection between the VPCs. Update the route tables of each VPC to use the VPC peering connection for inter-VPC communication. ✅
- **B.** Implement AWS Transit Gateway to connect the VPCs. Update the route tables of each VPC to use the transit gateway for inter-VPC communication.
- **C.** Implement an AWS Site-to-Site VPN tunnel between the VPCs. Update the route tables of each VPC to use the VPN tunnel for inter-VPC communication.
- **D.** Set up a 1 GB AWS Direct Connect connection between the VPCs. Update the route tables of each VPC to use the Direct Connect connection for inter-VPC communication.

**Answer:** A

**Explanation:**

Correct Answer:Set up a VPC peering connection between the VPCs. Update the route tables of each VPC to use the VPC peering connection for inter-VPC communication.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up a VPC peering connection between the VPCs. Update the route tables of each VPC to use the VPC peering connection for inter-VPC communication. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Implement AWS Transit Gateway to connect the VPCs. Update the route tables of each VPC to use the transit gateway for inter-VPC communication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement an AWS Site-to-Site VPN tunnel between the VPCs. Update the route tables of each VPC to use the VPN tunnel for inter-VPC communication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up a 1 GB AWS Direct Connect connection between the VPCs. Update the route tables of each VPC to use the Direct Connect connection for inter-VPC communication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 353

A company is moving its data and applications to AWS during a multiyear migration project. The company wants to securely access data on Amazon S3 from the company's AWS Region and from the company's on-premises location. The data must not traverse the internet. The company has established an AWS Direct Connect connection between its Region and its on-premises location.
Which solution will meet these requirements?

- **A.** Use an AWS Key Management Service (AWS KMS) key to access the data securely from the Region and the on-premises location.
- **B.** Create a gateway in AWS Transit Gateway to access Amazon S3 securely from the Region and the on-premises location.
- **C.** Create gateway endpoints for Amazon S3. Use the gateway endpoints to securely access the data from the Region and the on-premises location.
- **D.** Create interface endpoints for Amazon S3. Use the interface endpoints to securely access the data from the Region and the on-premises location. ✅

**Answer:** D

**Explanation:**

Correct Answer:Create interface endpoints for Amazon S3. Use the interface endpoints to securely access the data from the Region and the on-premises location.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create interface endpoints for Amazon S3. Use the interface endpoints to securely access the data from the Region and the on-premises location. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS Key Management Service (AWS KMS) key to access the data securely from the Region and the on-premises location. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a gateway in AWS Transit Gateway to access Amazon S3 securely from the Region and the on-premises location. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create gateway endpoints for Amazon S3. Use the gateway endpoints to securely access the data from the Region and the on-premises location. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 354

A startup company is hosting a website for its customers on an Amazon EC2 instance. The website consists of a stateless Python application and a MySQL database. The website serves only a small amount of traffic. The company is concerned about the reliability of the instance and needs to migrate to a highly available architecture. The company cannot modify the application code.
Which combination of actions should a solutions architect take to achieve high availability for the website? (Choose two.)

- **A.** Migrate the database to Amazon DynamoDB, and enable DynamoDB auto scaling.
- **B.** Migrate the database to an Amazon RDS for MySQL Multi-AZ DB instance. ✅
- **C.** Use AWS DataSync to synchronize the database data across multiple EC2 instances.
- **D.** Provision an internet gateway in each Availability Zone in use.
- **E.** Create an Application Load Balancer to distribute traffic to an Auto Scaling group of EC2 instances that are distributed across two Availability Zones. ✅

**Answer:** B, E

**Explanation:**

Correct Answer:Migrate the database to an Amazon RDS for MySQL Multi-AZ DB instance.; Create an Application Load Balancer to distribute traffic to an Auto Scaling group of EC2 instances that are distributed across two Availability Zones.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Migrate the database to an Amazon RDS for MySQL Multi-AZ DB instance. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create an Application Load Balancer to distribute traffic to an Auto Scaling group of EC2 instances that are distributed across two Availability Zones. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Migrate the database to Amazon DynamoDB, and enable DynamoDB auto scaling. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS DataSync to synchronize the database data across multiple EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an internet gateway in each Availability Zone in use. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 355

A company has customers located across the world. The company wants to use automation to secure its systems and network infrastructure. The company's security team must be able to track and audit all incremental changes to the infrastructure.
Which solution will meet these requirements?

- **A.** Use AWS CloudFormation to set up the infrastructure. Use AWS Service Catalog to track changes.
- **B.** Use AWS Organizations to set up the infrastructure. Use AWS Service Catalog to track changes.
- **C.** Use AWS CloudFormation to set up the infrastructure. Use AWS Config to track changes. ✅
- **D.** Use AWS Organizations to set up the infrastructure. Use AWS Config to track changes.

**Answer:** C

**Explanation:**

Correct Answer:Use AWS CloudFormation to set up the infrastructure. Use AWS Config to track changes.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS CloudFormation to set up the infrastructure. Use AWS Config to track changes. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS CloudFormation to set up the infrastructure. Use AWS Service Catalog to track changes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Organizations to set up the infrastructure. Use AWS Service Catalog to track changes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Organizations to set up the infrastructure. Use AWS Config to track changes. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 356

A company has separate AWS accounts for its finance, data analytics, and development departments. Because of costs and security concerns, the company wants to control which services each AWS account can use.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Systems Manager templates to control which AWS services each department can use.
- **B.** Create organization units (OUs) for each department in AWS Organizations. Attach service control policies (SCPs) to the OUs. ✅
- **C.** Use AWS CloudFormation to automatically provision only the AWS services that each department can use.
- **D.** Set up a list of products in AWS Service Catalog in the AWS accounts to manage and control the usage of specific AWS services.

**Answer:** B

**Explanation:**

Correct Answer:Create organization units (OUs) for each department in AWS Organizations. Attach service control policies (SCPs) to the OUs.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create organization units (OUs) for each department in AWS Organizations. Attach service control policies (SCPs) to the OUs. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Systems Manager templates to control which AWS services each department can use. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS CloudFormation to automatically provision only the AWS services that each department can use. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up a list of products in AWS Service Catalog in the AWS accounts to manage and control the usage of specific AWS services. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 357

A company runs an application in a VPC with public and private subnets. The VPC extends across multiple Availability Zones. The application runs on Amazon EC2 instances in private subnets. The application uses an Amazon Simple Queue Service (Amazon SQS) queue.
A solutions architect needs to design a secure solution to establish a connection between the EC2 instances and the SQS queue.
Which solution will meet these requirements?

- **A.** Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the public subnets. Attach to the interface endpoint a VPC endpoint policy that allows access from the EC2 instances that are in the private subnets.
- **B.** Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the private subnets. Add to the endpoint a security group that has an inbound access rule that allows traffic from the EC2 instances that are in the private subnets. ✅
- **C.** Implement a gateway endpoint for Amazon SQS. Add a NAT gateway to the private subnets. Attach an IAM role to the EC2 instances that allows access to the SQS queue.
- **D.** Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the public subnets. Attach an Amazon SQS access policy to the interface VPC endpoint that allows requests from only a specified VPC endpoint.

**Answer:** B

**Explanation:**

Correct Answer:Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the private subnets. Add to the endpoint a security group that has an inbound access rule that allows traffic from the EC2 instances that are in the private subnets.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the private subnets. Add to the endpoint a security group that has an inbound access rule that allows traffic from the EC2 instances that are in the private subnets. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the public subnets. Attach to the interface endpoint a VPC endpoint policy that allows access from the EC2 instances that are in the private subnets. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement a gateway endpoint for Amazon SQS. Add a NAT gateway to the private subnets. Attach an IAM role to the EC2 instances that allows access to the SQS queue. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Implement an interface VPC endpoint for Amazon SQS. Configure the endpoint to use the public subnets. Attach an Amazon SQS access policy to the interface VPC endpoint that allows requests from only a specified VPC endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 358

A social media company is building a feature for its website. The feature will give users the ability to upload photos. The company expects significant increases in demand during large events and must ensure that the website can handle the upload traffic from users.
Which solution meets these requirements with the MOST scalability?

- **A.** Upload files from the user's browser to the application servers. Transfer the files to an Amazon S3 bucket.
- **B.** Provision an Amazon Elastic File System (Amazon EFS) file system. Upload files directly from the user's browser to the file system.
- **C.** Generate Amazon S3 presigned URLs in the application. Upload files directly from the user's browser into an S3 bucket. ✅
- **D.** Provision an AWS Storage Gateway file gateway. Upload files directly from the user's browser to the file gateway.

**Answer:** C

**Explanation:**

Correct Answer:Generate Amazon S3 presigned URLs in the application. Upload files directly from the user's browser into an S3 bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Generate Amazon S3 presigned URLs in the application. Upload files directly from the user's browser into an S3 bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Upload files from the user's browser to the application servers. Transfer the files to an Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an Amazon Elastic File System (Amazon EFS) file system. Upload files directly from the user's browser to the file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Provision an AWS Storage Gateway file gateway. Upload files directly from the user's browser to the file gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 359

An application uses an Amazon RDS MySQL DB instance. The RDS database is becoming low on disk space. A solutions architect wants to increase the disk space without downtime.
Which solution meets these requirements with the LEAST amount of effort?

- **A.** Back up the RDS database, increase the storage capacity, restore the database, and stop the previous instance
- **B.** Increase the RDS database instance size
- **C.** Enable storage autoscaling in RDS ✅
- **D.** Change the RDS database instance storage type to Provisioned IOPS

**Answer:** C

**Explanation:**

Correct Answer:Enable storage autoscaling in RDS

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable storage autoscaling in RDS - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Back up the RDS database, increase the storage capacity, restore the database, and stop the previous instance - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Increase the RDS database instance size - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Change the RDS database instance storage type to Provisioned IOPS - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 360

A company hosts an application on Amazon EC2 On-Demand Instances in an Auto Scaling group. Application peak hours occur at the same time each day. Application users report slow application performance at the start of peak hours. The application performs normally 2-3 hours after peak hours begin. The company wants to ensure that the application works properly at the start of peak hours.
Which solution will meet these requirements?

- **A.** Configure an Application Load Balancer to distribute traffic properly to the instances.
- **B.** Configure a dynamic scaling policy for the Auto Scaling group to launch new instances based on memory utilization.
- **C.** Configure a scheduled scaling policy for the Auto Scaling group to launch new instances before peak hours. ✅
- **D.** Configure a dynamic scaling policy for the Auto Scaling group to launch new instances based on CPU utilization.

**Answer:** C

**Explanation:**

Correct Answer:Configure a scheduled scaling policy for the Auto Scaling group to launch new instances before peak hours.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a scheduled scaling policy for the Auto Scaling group to launch new instances before peak hours. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure an Application Load Balancer to distribute traffic properly to the instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a dynamic scaling policy for the Auto Scaling group to launch new instances based on memory utilization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a dynamic scaling policy for the Auto Scaling group to launch new instances based on CPU utilization. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 361

A company is relocating its data center and wants to securely transfer 50 TB of data to AWS within 2 weeks. The existing data center has a Site-to-Site VPN connection to AWS that is 90% utilized.
Which AWS service should a solutions architect use to meet these requirements?

- **A.** AWS Snowball Edge Storage Optimized ✅
- **B.** AWS Direct Connect
- **C.** AWS Storage Gateway
- **D.** AWS DataSync with a VPC endpoint

**Answer:** A

**Explanation:**

Correct Answer:AWS Snowball Edge Storage Optimized

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- AWS Snowball Edge Storage Optimized - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- AWS Direct Connect - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- AWS Storage Gateway - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- AWS DataSync with a VPC endpoint - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 362

A company uses an on-premises network-attached storage (NAS) system to provide file shares to its high performance computing (HPC) workloads. The company wants to migrate its latency-sensitive HPC workloads and its storage to the AWS Cloud. The company must be able to provide NFS and SMB multi-protocol access from the file system.
Which solution will meet these requirements with the LEAST latency? (Choose two.)

- **A.** Attach the EC2 instances to an Amazon FSx for NetApp ONTAP file system. ✅
- **B.** Attach the EC2 instances to an Amazon FSx for Lustre file system.
- **C.** Deploy compute optimized EC2 instances into a partition placement group.
- **D.** Deploy compute optimized EC2 instances into a cluster placement group. ✅
- **E.** Attach the EC2 instances to an Amazon FSx for OpenZFS file system.

**Answer:** A, D

**Explanation:**

Correct Answer:Attach the EC2 instances to an Amazon FSx for NetApp ONTAP file system.; Deploy compute optimized EC2 instances into a cluster placement group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Attach the EC2 instances to an Amazon FSx for NetApp ONTAP file system. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Deploy compute optimized EC2 instances into a cluster placement group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach the EC2 instances to an Amazon FSx for Lustre file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy compute optimized EC2 instances into a partition placement group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Attach the EC2 instances to an Amazon FSx for OpenZFS file system. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 363

A solutions architect is reviewing the resilience of an application. The solutions architect notices that a database administrator recently failed over the application's Amazon Aurora PostgreSQL database writer instance as part of a scaling exercise. The failover resulted in 3 minutes of downtime for the application.
Which solution will reduce the downtime for scaling exercises with the LEAST operational overhead?

- **A.** Set up a secondary Aurora PostgreSQL cluster in the same AWS Region. During failover, update the application to use the secondary cluster's writer endpoint.
- **B.** Create an Amazon ElastiCache for Memcached cluster to handle the load during failover.
- **C.** Set up an Amazon RDS proxy for the database. Update the application to use the proxy endpoint. ✅
- **D.** Create more Aurora PostgreSQL read replicas in the cluster to handle the load during failover.

**Answer:** C

**Explanation:**

Correct Answer:Set up an Amazon RDS proxy for the database. Update the application to use the proxy endpoint.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up an Amazon RDS proxy for the database. Update the application to use the proxy endpoint. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up a secondary Aurora PostgreSQL cluster in the same AWS Region. During failover, update the application to use the secondary cluster's writer endpoint. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon ElastiCache for Memcached cluster to handle the load during failover. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create more Aurora PostgreSQL read replicas in the cluster to handle the load during failover. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 364

A company runs a website that stores images of historical events. Website users need the ability to search and view images based on the year that the event in the image occurred. On average, users request each image only once or twice a year. The company wants a highly available solution to store and deliver the images to users.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Store images in Amazon Elastic Block Store (Amazon EBS). Use a web server that runs on Amazon EC2.
- **B.** Store images in Amazon S3 Standard-Infrequent Access (S3 Standard-IA). Use S3 Standard-IA to directly deliver images by using a static website. ✅
- **C.** Store images in Amazon Elastic File System (Amazon EFS). Use a web server that runs on Amazon EC2.
- **D.** Store images in Amazon S3 Standard. Use S3 Standard to directly deliver images by using a static website.

**Answer:** B

**Explanation:**

Correct Answer:Store images in Amazon S3 Standard-Infrequent Access (S3 Standard-IA). Use S3 Standard-IA to directly deliver images by using a static website.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store images in Amazon S3 Standard-Infrequent Access (S3 Standard-IA). Use S3 Standard-IA to directly deliver images by using a static website. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store images in Amazon Elastic Block Store (Amazon EBS). Use a web server that runs on Amazon EC2. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store images in Amazon Elastic File System (Amazon EFS). Use a web server that runs on Amazon EC2. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store images in Amazon S3 Standard. Use S3 Standard to directly deliver images by using a static website. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 365

A company runs a web application on Amazon EC2 instances in an Auto Scaling group that has a target group. The company designed the application to work with session affinity (sticky sessions) for a better user experience.
The application must be available publicly over the internet as an endpoint. A WAF must be applied to the endpoint for additional security. Session affinity (sticky sessions) must be configured on the endpoint.
Which combination of steps will meet these requirements? (Choose two.)

- **A.** Create a web ACL in AWS WAF. Associate the web ACL with the endpoint ✅
- **B.** Create a second target group. Add Elastic IP addresses to the EC2 instances.
- **C.** Create a public Network Load Balancer. Specify the application target group.
- **D.** Create a Gateway Load Balancer. Specify the application target group.
- **E.** Create a public Application Load Balancer. Specify the application target group. ✅

**Answer:** A, E

**Explanation:**

Correct Answer:Create a web ACL in AWS WAF. Associate the web ACL with the endpoint; Create a public Application Load Balancer. Specify the application target group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a web ACL in AWS WAF. Associate the web ACL with the endpoint - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a public Application Load Balancer. Specify the application target group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a second target group. Add Elastic IP addresses to the EC2 instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a public Network Load Balancer. Specify the application target group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a Gateway Load Balancer. Specify the application target group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 366

A company recently migrated its web application to the AWS Cloud. The company uses an Amazon EC2 instance to run multiple processes to host the application. The processes include an Apache web server that serves static content. The Apache web server makes requests to a PHP application that uses a local Redis server for user sessions.
The company wants to redesign the architecture to be highly available and to use AWS managed solutions.
Which solution will meet these requirements?

- **A.** Keep the backend code on the EC2 instance. Create an Amazon ElastiCache for Redis cluster that has Multi-AZ enabled. Configure the ElastiCache for Redis cluster in cluster mode. Copy the frontend resources to Amazon S3. Configure the backend code to reference the EC2 instance.
- **B.** Use AWS Lambda to host the static content and the PHP application. Use an Amazon API Gateway REST API to proxy requests to the Lambda function. Set the API Gateway CORS configuration to respond to the domain name. Configure Amazon ElastiCache for Redis to handle session information.
- **C.** Configure an Amazon CloudFront distribution with an Amazon S3 endpoint to an S3 bucket that is configured to host the static content. Configure an Application Load Balancer that targets an Amazon Elastic Container Service (Amazon ECS) service that runs AWS Fargate tasks for the PHP application. Configure the PHP application to use an Amazon ElastiCache for Redis cluster that runs in multiple Availability Zones. ✅
- **D.** Use AWS Elastic Beanstalk to host the static content and the PHP application. Configure Elastic Beanstalk to deploy its EC2 instance into a public subnet. Assign a public IP address.

**Answer:** C

**Explanation:**

Correct Answer:Configure an Amazon CloudFront distribution with an Amazon S3 endpoint to an S3 bucket that is configured to host the static content. Configure an Application Load Balancer that targets an Amazon Elastic Container Service (Amazon ECS) service that runs AWS Fargate tasks for the PHP application. Configure the PHP application to use an Amazon ElastiCache for Redis cluster that runs in multiple Availability Zones.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure an Amazon CloudFront distribution with an Amazon S3 endpoint to an S3 bucket that is configured to host the static content. Configure an Application Load Balancer that targets an Amazon Elastic Container Service (Amazon ECS) service that runs AWS Fargate tasks for the PHP application. Configure the PHP application to use an Amazon ElastiCache for Redis cluster that runs in multiple Availability Zones. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Keep the backend code on the EC2 instance. Create an Amazon ElastiCache for Redis cluster that has Multi-AZ enabled. Configure the ElastiCache for Redis cluster in cluster mode. Copy the frontend resources to Amazon S3. Configure the backend code to reference the EC2 instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Lambda to host the static content and the PHP application. Use an Amazon API Gateway REST API to proxy requests to the Lambda function. Set the API Gateway CORS configuration to respond to the domain name. Configure Amazon ElastiCache for Redis to handle session information. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Elastic Beanstalk to host the static content and the PHP application. Configure Elastic Beanstalk to deploy its EC2 instance into a public subnet. Assign a public IP address. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 367

A company is designing a new web application that will run on Amazon EC2 Instances. The application will use Amazon DynamoDB for backend data storage. The application traffic will be unpredictable. The company expects that the application read and write throughput to the database will be moderate to high. The company needs to scale in response to application traffic.
Which DynamoDB table configuration will meet these requirements MOST cost-effectively?

- **A.** Configure DynamoDB in on-demand mode by using the DynamoDB Standard Infrequent Access (DynamoDB Standard-IA) table class.
- **B.** Configure DynamoDB with provisioned read and write by using the DynamoDB Standard table class. Set DynamoDB auto scaling to a maximum defined capacity.
- **C.** Configure DynamoDB with provisioned read and write by using the DynamoDB Standard Infrequent Access (DynamoDB Standard-IA) table class. Set DynamoDB auto scaling to a maximum defined capacity.
- **D.** Configure DynamoDB in on-demand mode by using the DynamoDB Standard table class. ✅

**Answer:** D

**Explanation:**

Correct Answer:Configure DynamoDB in on-demand mode by using the DynamoDB Standard table class.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure DynamoDB in on-demand mode by using the DynamoDB Standard table class. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure DynamoDB in on-demand mode by using the DynamoDB Standard Infrequent Access (DynamoDB Standard-IA) table class. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure DynamoDB with provisioned read and write by using the DynamoDB Standard table class. Set DynamoDB auto scaling to a maximum defined capacity. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure DynamoDB with provisioned read and write by using the DynamoDB Standard Infrequent Access (DynamoDB Standard-IA) table class. Set DynamoDB auto scaling to a maximum defined capacity. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 368

A company has a large data workload that runs for 6 hours each day. The company cannot lose any data while the process is running. A solutions architect is designing an Amazon EMR cluster configuration to support this critical data workload.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure a long-running cluster that runs the primary node and core nodes on On-Demand Instances and the task nodes on Spot Instances.
- **B.** Configure a transient cluster that runs the primary node on an On-Demand Instance and the core nodes and task nodes on Spot Instances.
- **C.** Configure a transient cluster that runs the primary node and core nodes on On-Demand Instances and the task nodes on Spot Instances. ✅
- **D.** Configure a long-running cluster that runs the primary node on an On-Demand Instance, the core nodes on Spot Instances, and the task nodes on Spot Instances.

**Answer:** C

**Explanation:**

Correct Answer:Configure a transient cluster that runs the primary node and core nodes on On-Demand Instances and the task nodes on Spot Instances.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure a transient cluster that runs the primary node and core nodes on On-Demand Instances and the task nodes on Spot Instances. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure a long-running cluster that runs the primary node and core nodes on On-Demand Instances and the task nodes on Spot Instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a transient cluster that runs the primary node on an On-Demand Instance and the core nodes and task nodes on Spot Instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure a long-running cluster that runs the primary node on an On-Demand Instance, the core nodes on Spot Instances, and the task nodes on Spot Instances. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 369

A company stores a large volume of image files in an Amazon S3 bucket. The images need to be readily available for the first 180 days. The images are infrequently accessed for the next 180 days. After 360 days, the images need to be archived but must be available instantly upon request. After 5 years, only auditors can access the images. The auditors must be able to retrieve the images within 12 hours. The images cannot be lost during this process.
A developer will use S3 Standard storage for the first 180 days. The developer needs to configure an S3 Lifecycle rule.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 180 days. S3 Glacier Instant Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years.
- **B.** Transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 180 days, S3 Glacier Flexible Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years.
- **C.** Transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 180 days. S3 Glacier Flexible Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years.
- **D.** Transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 180 days, S3 Glacier Instant Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years. ✅

**Answer:** D

**Explanation:**

Correct Answer:Transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 180 days, S3 Glacier Instant Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 180 days, S3 Glacier Instant Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 180 days. S3 Glacier Instant Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 180 days, S3 Glacier Flexible Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 180 days. S3 Glacier Flexible Retrieval after 360 days, and S3 Glacier Deep Archive after 5 years. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 370

A company wants to use artificial intelligence (AI) to determine the quality of its customer service calls. The company currently manages calls in four different languages, including English. The company will offer new languages in the future. The company does not have the resources to regularly maintain machine learning (ML) models.
The company needs to create written sentiment analysis reports from the customer service call recordings. The customer service call recording text must be translated into English.
Which combination of steps will meet these requirements? (Choose three.)

- **A.** Use Amazon Comprehend to translate the audio recordings into English.
- **B.** Use Amazon Lex to create the written sentiment analysis reports.
- **C.** Use Amazon Transcribe to convert the audio recordings in any language into text. ✅
- **D.** Use Amazon Polly to convert the audio recordings into text.
- **E.** Use Amazon Translate to translate text in any language to English. ✅
- **F.** Use Amazon Comprehend to create the sentiment analysis reports. ✅

**Answer:** C, E, F

**Explanation:**

Correct Answer:Use Amazon Transcribe to convert the audio recordings in any language into text.; Use Amazon Translate to translate text in any language to English.; Use Amazon Comprehend to create the sentiment analysis reports.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon Transcribe to convert the audio recordings in any language into text. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use Amazon Translate to translate text in any language to English. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Use Amazon Comprehend to create the sentiment analysis reports. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Comprehend to translate the audio recordings into English. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Lex to create the written sentiment analysis reports. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Polly to convert the audio recordings into text. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 371

An ecommerce company runs a PostgreSQL database on premises. The database stores data by using high IOPS Amazon Elastic Block Store (Amazon EBS) block storage. The daily peak I/O transactions per second do not exceed 15,000 IOPS. The company wants to migrate the database to Amazon RDS for PostgreSQL and provision disk IOPS performance independent of disk storage capacity.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Configure the General Purpose SSD (gp2) EBS volume storage type and provision 15,000 IOPS.
- **B.** Configure the Provisioned IOPS SSD (io1) EBS volume storage type and provision 15,000 IOPS.
- **C.** Configure the General Purpose SSD (gp3) EBS volume storage type and provision 15,000 IOPS. ✅
- **D.** Configure the EBS magnetic volume type to achieve maximum IOPS.

**Answer:** C

**Explanation:**

Correct Answer:Configure the General Purpose SSD (gp3) EBS volume storage type and provision 15,000 IOPS.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Configure the General Purpose SSD (gp3) EBS volume storage type and provision 15,000 IOPS. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Configure the General Purpose SSD (gp2) EBS volume storage type and provision 15,000 IOPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the Provisioned IOPS SSD (io1) EBS volume storage type and provision 15,000 IOPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the EBS magnetic volume type to achieve maximum IOPS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 372

A weather forecasting company needs to process hundreds of gigabytes of data with sub-millisecond latency. The company has a high performance computing (HPC) environment in its data center and wants to expand its forecasting capabilities.
A solutions architect must identify a highly available cloud storage solution that can handle large amounts of sustained throughput. Files that are stored in the solution should be accessible to thousands of compute instances that will simultaneously access and process the entire dataset.
What should the solutions architect do to meet these requirements?

- **A.** Use Amazon FSx for Lustre persistent file systems. ✅
- **B.** Use Amazon Elastic File System (Amazon EFS) with Bursting Throughput mode.
- **C.** Use Amazon Elastic File System (Amazon EFS) with Provisioned Throughput mode.
- **D.** Use Amazon FSx for Lustre scratch file systems.

**Answer:** A

**Explanation:**

Correct Answer:Use Amazon FSx for Lustre persistent file systems.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use Amazon FSx for Lustre persistent file systems. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Elastic File System (Amazon EFS) with Bursting Throughput mode. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Elastic File System (Amazon EFS) with Provisioned Throughput mode. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon FSx for Lustre scratch file systems. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 373

A gaming company is building an application with Voice over IP capabilities. The application will serve traffic to users across the world. The application needs to be highly available with an automated failover across AWS Regions. The company wants to minimize the latency of users without relying on IP address caching on user devices.
What should a solutions architect do to meet these requirements?

- **A.** Use Amazon Route 53 with a geolocation routing policy.
- **B.** Use AWS Global Accelerator with health checks. ✅
- **C.** Create an Application Load Balancer that uses path-based routing.
- **D.** Create an Amazon CloudFront distribution that includes multiple origins.

**Answer:** B

**Explanation:**

Correct Answer:Use AWS Global Accelerator with health checks.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS Global Accelerator with health checks. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use Amazon Route 53 with a geolocation routing policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Application Load Balancer that uses path-based routing. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an Amazon CloudFront distribution that includes multiple origins. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 374

A company runs an application on Amazon EC2 instances. The company needs to implement a disaster recovery (DR) solution for the application. The DR solution needs to have a recovery time objective (RTO) of less than 4 hours. The DR solution also needs to use the fewest possible AWS resources during normal operations.
Which solution will meet these requirements in the MOST operationally efficient way?

- **A.** Create Amazon Machine Images (AMIs) to back up the EC2 instances. Copy the AMIs to a secondary AWS Region. Automate infrastructure deployment in the secondary Region by using AWS Lambda and custom scripts.
- **B.** Create Amazon Machine Images (AMIs) to back up the EC2 instances. Copy the AMIs to a secondary AWS Region. Automate infrastructure deployment in the secondary Region by using AWS CloudFormation. ✅
- **C.** Launch EC2 instances in a secondary AWS Region. Keep the EC2 instances in the secondary Region active at all times.
- **D.** Launch EC2 instances in a secondary Availability Zone. Keep the EC2 instances in the secondary Availability Zone active at all times.

**Answer:** B

**Explanation:**

Correct Answer:Create Amazon Machine Images (AMIs) to back up the EC2 instances. Copy the AMIs to a secondary AWS Region. Automate infrastructure deployment in the secondary Region by using AWS CloudFormation.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create Amazon Machine Images (AMIs) to back up the EC2 instances. Copy the AMIs to a secondary AWS Region. Automate infrastructure deployment in the secondary Region by using AWS CloudFormation. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create Amazon Machine Images (AMIs) to back up the EC2 instances. Copy the AMIs to a secondary AWS Region. Automate infrastructure deployment in the secondary Region by using AWS Lambda and custom scripts. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch EC2 instances in a secondary AWS Region. Keep the EC2 instances in the secondary Region active at all times. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Launch EC2 instances in a secondary Availability Zone. Keep the EC2 instances in the secondary Availability Zone active at all times. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 375

A company is required to use cryptographic keys in its on-premises key manager. The key manager is outside of the AWS Cloud because of regulatory and compliance requirements. The company wants to manage encryption and decryption by using cryptographic keys that are retained outside of the AWS Cloud and that support a variety of external key managers from different vendors.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS CloudHSM key store backed by a CloudHSM cluster.
- **B.** Use an AWS Key Management Service (AWS KMS) external key store backed by an external key manager. ✅
- **C.** Use the default AWS Key Management Service (AWS KMS) managed key store.
- **D.** Use a custom key store backed by an AWS CloudHSM cluster.

**Answer:** B

**Explanation:**

Correct Answer:Use an AWS Key Management Service (AWS KMS) external key store backed by an external key manager.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an AWS Key Management Service (AWS KMS) external key store backed by an external key manager. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS CloudHSM key store backed by a CloudHSM cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use the default AWS Key Management Service (AWS KMS) managed key store. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a custom key store backed by an AWS CloudHSM cluster. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 376

A company recently created a disaster recovery site in a different AWS Region. The company needs to transfer large amounts of data back and forth between NFS file systems in the two Regions on a periodic basis.
Which solution will meet these requirements with the LEAST operational overhead?

- **A.** Use AWS Snowball devices.
- **B.** Use AWS DataSync. ✅
- **C.** Set up an SFTP server on Amazon EC2.
- **D.** Use AWS Database Migration Service (AWS DMS).

**Answer:** B

**Explanation:**

Correct Answer:Use AWS DataSync.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use AWS DataSync. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use AWS Snowball devices. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up an SFTP server on Amazon EC2. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use AWS Database Migration Service (AWS DMS). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 377

A company runs several websites on AWS for its different brands. Each website generates tens of gigabytes of web traffic logs each day. A solutions architect needs to design a scalable solution to give the company's developers the ability to analyze traffic patterns across all the company's websites. This analysis by the developers will occur on demand once a week over the course of several months. The solution must support queries with standard SQL.
Which solution will meet these requirements MOST cost-effectively?

- **A.** Store the logs in Amazon RDS. Use a database client for analysis.
- **B.** Store the logs in Amazon OpenSearch Service. Use OpenSearch Service for analysis.
- **C.** Store the logs in an Amazon EMR cluster Use a supported open-source framework for SQL-based analysis.
- **D.** Store the logs in Amazon S3. Use Amazon Athena for analysis. ✅

**Answer:** D

**Explanation:**

Correct Answer:Store the logs in Amazon S3. Use Amazon Athena for analysis.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Store the logs in Amazon S3. Use Amazon Athena for analysis. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Store the logs in Amazon RDS. Use a database client for analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the logs in Amazon OpenSearch Service. Use OpenSearch Service for analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store the logs in an Amazon EMR cluster Use a supported open-source framework for SQL-based analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 378

A company wants to run a gaming application on Amazon EC2 instances that are part of an Auto Scaling group in the AWS Cloud. The application will transmit data by using UDP packets. The company wants to ensure that the application can scale out and in as traffic increases and decreases.
What should a solutions architect do to meet these requirements?

- **A.** Attach an Application Load Balancer to the Auto Scaling group.
- **B.** Attach a Network Load Balancer to the Auto Scaling group. ✅
- **C.** Deploy an Amazon Route 53 record set with a weighted policy to route traffic appropriately.
- **D.** Deploy a NAT instance that is configured with port forwarding to the EC2 instances in the Auto Scaling group.

**Answer:** B

**Explanation:**

Correct Answer:Attach a Network Load Balancer to the Auto Scaling group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Attach a Network Load Balancer to the Auto Scaling group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach an Application Load Balancer to the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy an Amazon Route 53 record set with a weighted policy to route traffic appropriately. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deploy a NAT instance that is configured with port forwarding to the EC2 instances in the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 379

A company wants to monitor its AWS costs for financial review. The cloud operations team is designing an architecture in the AWS Organizations management account to query AWS Cost and Usage Reports for all member accounts. The team must run this query once a month and provide a detailed analysis of the bill.
Which solution is the MOST scalable and cost-effective way to meet these requirements?

- **A.** Enable Cost and Usage Reports in the management account. Deliver the reports to Amazon S3. Use Amazon Athena for analysis. ✅
- **B.** Enable Cost and Usage Reports in the management account. Deliver reports to Amazon Kinesis. Use Amazon EMR for analysis.
- **C.** Enable Cost and Usage Reports for member accounts. Deliver the reports to Amazon Kinesis. Use Amazon QuickSight tor analysis.
- **D.** Enable Cost and Usage Reports for member accounts. Deliver the reports to Amazon S3. Use Amazon Redshift for analysis.

**Answer:** A

**Explanation:**

Correct Answer:Enable Cost and Usage Reports in the management account. Deliver the reports to Amazon S3. Use Amazon Athena for analysis.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable Cost and Usage Reports in the management account. Deliver the reports to Amazon S3. Use Amazon Athena for analysis. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Enable Cost and Usage Reports in the management account. Deliver reports to Amazon Kinesis. Use Amazon EMR for analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable Cost and Usage Reports for member accounts. Deliver the reports to Amazon Kinesis. Use Amazon QuickSight tor analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable Cost and Usage Reports for member accounts. Deliver the reports to Amazon S3. Use Amazon Redshift for analysis. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 380

A company has an application workflow that uses an AWS Lambda function to download and decrypt files from Amazon S3. These files are encrypted using AWS Key Management Service (AWS KMS) keys. A solutions architect needs to design a solution that will ensure the required permissions are set correctly.
Which combination of actions accomplish this? (Choose two.)

- **A.** Grant the decrypt permission for the Lambda IAM role in the KMS key's policy ✅
- **B.** Attach the kms:decrypt permission to the Lambda function’s resource policy
- **C.** Create a new IAM policy with the kms:decrypt permission and attach the policy to the Lambda function.
- **D.** Create a new IAM role with the kms:decrypt permission and attach the execution role to the Lambda function. ✅
- **E.** Grant the decrypt permission for the Lambda resource policy in the KMS key's policy.

**Answer:** A, D

**Explanation:**

Correct Answer:Grant the decrypt permission for the Lambda IAM role in the KMS key's policy; Create a new IAM role with the kms:decrypt permission and attach the execution role to the Lambda function.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Grant the decrypt permission for the Lambda IAM role in the KMS key's policy - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Create a new IAM role with the kms:decrypt permission and attach the execution role to the Lambda function. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach the kms:decrypt permission to the Lambda function's resource policy - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create a new IAM policy with the kms:decrypt permission and attach the policy to the Lambda function. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Grant the decrypt permission for the Lambda resource policy in the KMS key's policy. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 381

A solutions architect is implementing a document review application using an Amazon S3 bucket for storage. The solution must prevent accidental deletion of the documents and ensure that all versions of the documents are available. Users must be able to download, modify, and upload documents.
Which combination of actions should be taken to meet these requirements? (Choose two.)

- **A.** Attach an IAM policy to the bucket.
- **B.** Enable MFA Delete on the bucket. ✅
- **C.** Enable a read-only bucket ACL.
- **D.** Enable versioning on the bucket. ✅
- **E.** Encrypt the bucket using AWS KMS.

**Answer:** B, D

**Explanation:**

Correct Answer:Enable MFA Delete on the bucket.; Enable versioning on the bucket.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable MFA Delete on the bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Enable versioning on the bucket. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Attach an IAM policy to the bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Enable a read-only bucket ACL. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Encrypt the bucket using AWS KMS. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 382

A solutions architect has created two IAM policies: Policy1 and Policy2. Both policies are attached to an IAM group.
Policy 1:
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
"iam:Get*",
"iam:List*",
"kms:List*",
"ec2:*",
"ds:*",
"logs:Get*",
"logs:Describe*"
],
"Resource": "*"
}
]
}
Policy 2:
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Deny",
"Action": "ds:Delete*",
"Resource": "*"
}
]
}
A cloud engineer is added as an IAM user to the IAM group. Which action will the cloud engineer be able to perform?

- **A.** Deleting directories
- **B.** Deleting logs from Amazon CloudWatch Logs
- **C.** Deleting IAM users
- **D.** Deleting Amazon EC2 instances ✅

**Answer:** D

**Explanation:**

Correct Answer:Deleting Amazon EC2 instances

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Deleting Amazon EC2 instances - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Deleting directories - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deleting logs from Amazon CloudWatch Logs - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Deleting IAM users - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 383

A solutions architect is designing a new service behind Amazon API Gateway. The request patterns for the service will be unpredictable and can change suddenly from 0 requests to over 500 per second. The total size of the data that needs to be persisted in a backend database is currently less than 1 GB with unpredictable future growth. Data can be queried using simple key-value requests.
Which combination of AWS services would meet these requirements? (Choose two.)

- **A.** AWS ECS Fargate
- **B.** Amazon EC2 Auto Scaling
- **C.** Amazon DynamoDB ✅
- **D.** MySQL-compatible Amazon Aurora
- **E.** AWS Lambda ✅

**Answer:** C, E

**Explanation:**

Correct Answer:Amazon DynamoDB; AWS Lambda

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Amazon DynamoDB - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- AWS Lambda - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- AWS ECS Fargate - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Amazon EC2 Auto Scaling - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- MySQL-compatible Amazon Aurora - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 384

A company is implementing a shared storage solution for a media application that is hosted in the AWS Cloud. The company needs the ability to use SMB clients to access data. The solution must be fully managed.
Which AWS solution meets these requirements?

- **A.** Create an Amazon EC2 Windows instance. Install and configure a Windows file share role on the instance. Connect the application server to the file share.
- **B.** Create an Amazon FSx for Windows File Server file system. Attach the file system to the origin server. Connect the application server to the file system. ✅
- **C.** Create an AWS Storage Gateway tape gateway. Configure tapes to use Amazon S3. Connect the application server to the tape gateway.
- **D.** Create an AWS Storage Gateway volume gateway. Create a file share that uses the required client protocol. Connect the application server to the file share.

**Answer:** B

**Explanation:**

Correct Answer:Create an Amazon FSx for Windows File Server file system. Attach the file system to the origin server. Connect the application server to the file system.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create an Amazon FSx for Windows File Server file system. Attach the file system to the origin server. Connect the application server to the file system. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create an Amazon EC2 Windows instance. Install and configure a Windows file share role on the instance. Connect the application server to the file share. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Storage Gateway tape gateway. Configure tapes to use Amazon S3. Connect the application server to the tape gateway. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Storage Gateway volume gateway. Create a file share that uses the required client protocol. Connect the application server to the file share. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 385

A solutions architect has created a new AWS account and must secure AWS account root user access.
Which combination of actions will accomplish this? (Choose two.)

- **A.** Add the root user to a group containing administrative permissions.
- **B.** Store root user access keys in an encrypted Amazon S3 bucket.
- **C.** Apply the required permissions to the root user with an inline policy document.
- **D.** Enable multi-factor authentication to the root user. ✅
- **E.** Ensure the root user uses a strong password. ✅

**Answer:** D, E

**Explanation:**

Correct Answer:Enable multi-factor authentication to the root user.; Ensure the root user uses a strong password.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Enable multi-factor authentication to the root user. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

- Ensure the root user uses a strong password. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Add the root user to a group containing administrative permissions. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Store root user access keys in an encrypted Amazon S3 bucket. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Apply the required permissions to the root user with an inline policy document. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 386

A company runs an application on a large fleet of Amazon EC2 instances. The application reads and writes entries into an Amazon DynamoDB table. The size of the DynamoDB table continuously grows, but the application needs only data from the last 30 days. The company needs a solution that minimizes cost and development effort.
Which solution meets these requirements?

- **A.** Use an AWS CloudFormation template to deploy the complete solution. Redeploy the CloudFormation stack every 30 days, and delete the original stack.
- **B.** Extend the application to add an attribute that has a value of the current timestamp plus 30 days to each new item that is created in the table. Configure DynamoDB to use the attribute as the TTL attribute. ✅
- **C.** Use an EC2 instance that runs a monitoring application from AWS Marketplace. Configure the monitoring application to use Amazon DynamoDB Streams to store the timestamp when a new item is created in the table. Use a script that runs on the EC2 instance to delete items that have a timestamp that is older than 30 days.
- **D.** Configure Amazon DynamoDB Streams to invoke an AWS Lambda function when a new item is created in the table. Configure the Lambda function to delete items in the table that are older than 30 days.

**Answer:** B

**Explanation:**

Correct Answer:Extend the application to add an attribute that has a value of the current timestamp plus 30 days to each new item that is created in the table. Configure DynamoDB to use the attribute as the TTL attribute.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Extend the application to add an attribute that has a value of the current timestamp plus 30 days to each new item that is created in the table. Configure DynamoDB to use the attribute as the TTL attribute. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use an AWS CloudFormation template to deploy the complete solution. Redeploy the CloudFormation stack every 30 days, and delete the original stack. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an EC2 instance that runs a monitoring application from AWS Marketplace. Configure the monitoring application to use Amazon DynamoDB Streams to store the timestamp when a new item is created in the table. Use a script that runs on the EC2 instance to delete items that have a timestamp that is older than 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure Amazon DynamoDB Streams to invoke an AWS Lambda function when a new item is created in the table. Configure the Lambda function to delete items in the table that are older than 30 days. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 387

A company manages an application that stores data on an Amazon RDS for PostgreSQL Multi-AZ DB instance. Increases in traffic are causing performance problems. The company determines that database queries are the primary reason for the slow performance.
What should a solutions architect do to improve the application's performance?

- **A.** Serve read traffic from the Multi-AZ standby instance.
- **B.** Configure the DB instance to use Transfer Acceleration.
- **C.** Create a read replica from the source DB instance. Serve read traffic from the read replica. ✅
- **D.** Use Amazon Kinesis Data Firehose between the application and Amazon RDS to increase the concurrency of database requests.

**Answer:** C

**Explanation:**

Correct Answer:Create a read replica from the source DB instance. Serve read traffic from the read replica.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Create a read replica from the source DB instance. Serve read traffic from the read replica. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Serve read traffic from the Multi-AZ standby instance. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Configure the DB instance to use Transfer Acceleration. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use Amazon Kinesis Data Firehose between the application and Amazon RDS to increase the concurrency of database requests. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 388

A company wants to give a customer the ability to use on-premises Microsoft Active Directory to download files that are stored in Amazon S3. The customer’s application uses an SFTP client to download the files.
Which solution will meet these requirements with the LEAST operational overhead and no changes to the customer’s application?

- **A.** Set up AWS Transfer Family with SFTP for Amazon S3. Configure integrated Active Directory authentication. ✅
- **B.** Set up AWS DataSync to synchronize between the on-premises location and the S3 location by using AWS IAM Identity Center (AWS Single Sign-On).
- **C.** Set up a Windows Amazon EC2 instance with SFTP to connect the on-premises client with Amazon S3. Integrate AWS Identity and Access Management (IAM).
- **D.** Set up AWS Database Migration Service (AWS DMS) to synchronize the on-premises client with Amazon S3. Configure integrated Active Directory authentication.

**Answer:** A

**Explanation:**

Correct Answer:Set up AWS Transfer Family with SFTP for Amazon S3. Configure integrated Active Directory authentication.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Set up AWS Transfer Family with SFTP for Amazon S3. Configure integrated Active Directory authentication. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Set up AWS DataSync to synchronize between the on-premises location and the S3 location by using AWS IAM Identity Center (AWS Single Sign-On). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up a Windows Amazon EC2 instance with SFTP to connect the on-premises client with Amazon S3. Integrate AWS Identity and Access Management (IAM). - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Set up AWS Database Migration Service (AWS DMS) to synchronize the on-premises client with Amazon S3. Configure integrated Active Directory authentication. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 389

An application runs on Amazon EC2 instances across multiple Availability Zones. The instances run in an Amazon EC2 Auto Scaling group behind an Application Load Balancer. The application performs best when the CPU utilization of the EC2 instances is at or near 40%.
What should a solutions architect do to maintain the desired performance across all instances in the group?

- **A.** Use scheduled scaling actions to scale up and scale down the Auto Scaling group.
- **B.** Use a target tracking policy to dynamically scale the Auto Scaling group. ✅
- **C.** Use an AWS Lambda function ta update the desired Auto Scaling group capacity.
- **D.** Use a simple scaling policy to dynamically scale the Auto Scaling group.

**Answer:** B

**Explanation:**

Correct Answer:Use a target tracking policy to dynamically scale the Auto Scaling group.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use a target tracking policy to dynamically scale the Auto Scaling group. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Use scheduled scaling actions to scale up and scale down the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an AWS Lambda function ta update the desired Auto Scaling group capacity. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use a simple scaling policy to dynamically scale the Auto Scaling group. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

## Question 390

A solutions architect is creating a data processing job that runs once daily and can take up to 2 hours to complete. If the job is interrupted, it has to restart from the beginning.
How should the solutions architect address this issue in the MOST cost-effective manner?

- **A.** Create a script that runs locally on an Amazon EC2 Reserved Instance that is triggered by a cron job.
- **B.** Create an AWS Lambda function triggered by an Amazon EventBridge scheduled event.
- **C.** Use an Amazon Elastic Container Service (Amazon ECS) Fargate task triggered by an Amazon EventBridge scheduled event. ✅
- **D.** Use an Amazon Elastic Container Service (Amazon ECS) task running on Amazon EC2 triggered by an Amazon EventBridge scheduled event.

**Answer:** C

**Explanation:**

Correct Answer:Use an Amazon Elastic Container Service (Amazon ECS) Fargate task triggered by an Amazon EventBridge scheduled event.

Key Concept:

Identify the option that best satisfies the requirement in the question while avoiding unnecessary complexity or an unrelated AWS service.

Why this is correct:

- Use an Amazon Elastic Container Service (Amazon ECS) Fargate task triggered by an Amazon EventBridge scheduled event. - This option is marked as correct in the source HTML and best matches the scenario described by the question.

Why other options are incorrect:

- Create a script that runs locally on an Amazon EC2 Reserved Instance that is triggered by a cron job. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Create an AWS Lambda function triggered by an Amazon EventBridge scheduled event. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

- Use an Amazon Elastic Container Service (Amazon ECS) task running on Amazon EC2 triggered by an Amazon EventBridge scheduled event. - This option is not marked as correct in the source HTML and is less suitable for the stated requirement.

---

