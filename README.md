### Setup & Static Website Hosting

### What I did:
- Built a simple HTML form to report hospital equipment issues.
- Created an S3 bucket on AWS.
- Enabled static website hosting.
- Uploaded my HTML file and accessed it via the public S3 website endpoint.

### 📸 Screenshot:
![My Screenshot](images/H.E.I.R%20.jpg)

### 🔗 Demo Link:
http://incident-report-form-oluwabunmi.s3-website.eu-north-1.amazonaws.com/

### 🧩 What I learned:
- How to set up and host a static site using S3.
- How to enable public access and configure bucket policies.
- Basics of structuring a web form for user input.

### 😥 Challenges:
- Had to troubleshoot "Access Denied" errors due to bucket policy.
- Learned the importance of MIME types and permission settings in S3.

### 📍 Next Steps:
- Connect the form to AWS backend via API Gateway and Lambda.
- Save submitted data in DynamoDB.
- Upload uploaded files to S3.
