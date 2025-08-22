# CLAUDE.md

## Project Overview

Chabi Gallery - Photo gallery app with drag & drop upload, S3 storage, and masonry layout optimized for vertical images.

## Production URL
- **Base URL**: https://chabi.fly.dev/
- **Local dev**: http://localhost:3000

## Development

```bash
npm install
npm start
```

## Key Architecture

- **Express server** with S3 image storage
- **Frontend**: Vanilla JS with CSS columns masonry layout
- **Deploy**: Fly.io with GitHub Actions auto-deploy on `main`
- **Environment**: S3 credentials in `.env` and GitHub Secrets
