# Crypto Dashboard - Git & Vercel Deployment Guide

## Prerequisites
- Git installed on your system
- GitHub account
- Vercel account (sign up at https://vercel.com)

---

## Part 1: Push Code to GitHub

### Step 1: Initialize Git Repository (if not already done)
```bash
cd "d:/Troon Projects/ChatGpt sdk/crypto-dashboard"
git init
```

### Step 2: Stage All Files
```bash
git add .
```

### Step 3: Create Initial Commit
```bash
git commit -m "Initial commit: Crypto Dashboard with Node.js backend and React frontend"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `crypto-dashboard` (or your preferred name)
3. Keep it **Public** or **Private** (your choice)
4. **DO NOT** check "Initialize with README" (you already have one)
5. Click "Create repository"

### Step 5: Link Local Repository to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/crypto-dashboard.git
git branch -M main
git push -u origin main
```

### Step 6: Verify Upload
- Visit your GitHub repository URL
- Confirm all files are uploaded (except those in .gitignore)

---

## Part 2: Deploy to Vercel

### Method A: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Sign in with your GitHub account

#### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Find and select your `crypto-dashboard` repository
4. Click "Import"

#### Step 3: Configure Project
1. **Framework Preset**: Select "Other" or "Node.js"
2. **Root Directory**: Leave as `./` (root)
3. **Build Command**: `npm run build`
4. **Output Directory**: `client/dist`
5. **Install Command**: `npm install`

#### Step 4: Environment Variables (if needed)
- Click "Environment Variables"
- Add any required variables (currently none needed)

#### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Once done, you'll get a live URL like: `https://crypto-dashboard-xyz.vercel.app`

---

### Method B: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
cd "d:/Troon Projects/ChatGpt sdk/crypto-dashboard"
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `crypto-dashboard` (or press Enter)
- In which directory is your code? `./` (press Enter)
- Want to override settings? **N**

#### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## Part 3: Post-Deployment

### Verify Deployment
1. Visit your Vercel URL
2. Test the crypto dashboard functionality
3. Check API endpoints:
   - `/health` - Should return status
   - `/crypto-price` - POST endpoint for crypto data

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Continuous Deployment
- Every push to `main` branch will auto-deploy to Vercel
- Pull requests create preview deployments

---

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify client builds locally: `cd client && npm run build`

### API Routes Not Working
- Check vercel.json routes configuration
- Verify server.js is properly configured
- Check Vercel function logs

### Frontend Not Loading
- Ensure client/dist is generated during build
- Check build command in package.json
- Verify static file serving in server.js

---

## Important Files Created

1. **vercel.json** - Vercel deployment configuration
2. **package.json** - Updated with build script
3. **.gitignore** - Already configured to exclude node_modules and build files

---

## Quick Commands Reference

```bash
# Local development
npm run dev                    # Start backend (watches for changes)
cd client && npm run dev       # Start frontend dev server

# Build
npm run build                  # Build frontend for production

# Git commands
git add .                      # Stage changes
git commit -m "message"        # Commit changes
git push                       # Push to GitHub

# Vercel commands
vercel                         # Deploy to preview
vercel --prod                  # Deploy to production
vercel logs                    # View deployment logs
```

---

## Support

- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Project Issues: Create an issue in your GitHub repository
