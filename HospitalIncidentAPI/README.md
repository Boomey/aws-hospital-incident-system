# Hospital Equipment Incident Reporting API

A production-ready repository skeleton for your hospital equipment incident reporting system (API + docs + media + social posts).

## Quick Start
```bash
# 1) Install Git LFS for large media files (images/videos)
git lfs install
git lfs track "*.mp4" "*.mov" "*.png" "*.jpg" "*.gif"
git add .gitattributes

# 2) Install API dependencies & run tests
cd api
npm ci
npm test --if-present
```

## Monorepo Layout
```
api/            # Lambda/API code (Node.js example)
frontend/       # Optional static site/app (HTML/JS or React)
docs/           # Architecture, API reference, Postman collection
media/          # Images & videos (tracked with Git LFS)
social/         # Ready-to-post captions for LinkedIn/Instagram/YouTube
.github/        # GitHub Actions CI
```

## Deploy (example, manual)
- Zip `api/` and upload to your Lambda, or deploy with your IaC tool (SAM/Serverless/Terraform).
- Update `docs/api_reference.md` and export `docs/postman/HospitalIncidentAPI.postman_collection.json` from Postman.
- Commit and push to `main`. CI will run tests automatically.
