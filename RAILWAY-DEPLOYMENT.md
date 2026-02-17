# Railway Deployment Guide for MCP Server

## Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)
- Your code pushed to GitHub

---

## Step 1: Push Changes to GitHub

```bash
cd "d:/Troon Projects/ChatGpt sdk/crypto-dashboard"

# Stage all changes
git add .

# Commit
git commit -m "Enable SSE endpoint and configure for Railway deployment"

# Push to GitHub
git push
```

---

## Step 2: Deploy to Railway

### Method A: Railway Dashboard (Easiest)

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `crypto-dashboard`
6. **Railway will auto-detect** Node.js and start building
7. **Wait 2-3 minutes** for deployment

### Method B: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to new project
railway init

# Deploy
railway up
```

---

## Step 3: Get Your Railway URL

After deployment:

1. Go to your Railway project dashboard
2. Click on your service
3. Go to **Settings** → **Networking**
4. Click **Generate Domain**
5. You'll get a URL like: `https://crypto-dashboard-production.up.railway.app`

---

## Step 4: Update Configuration Files

Update these files with your Railway URL:

### 1. `public/.well-known/ai-plugin.json`
```json
{
  "api": {
    "url": "https://YOUR-RAILWAY-URL/openapi.yaml"
  },
  "ui": {
    "url": "https://YOUR-RAILWAY-URL/"
  }
}
```

### 2. `public/openapi.yaml`
```yaml
servers:
  - url: https://YOUR-RAILWAY-URL
```

### 3. `server.js` (dashboardUrl)
Update line 90 to use your Railway URL.

Then commit and push again - Railway will auto-redeploy.

---

## Step 5: Test SSE Endpoint

Verify SSE is working:

```bash
# Test SSE connection
curl -N https://YOUR-RAILWAY-URL/sse
```

You should see heartbeat messages every 30 seconds.

---

## Step 6: Configure ChatGPT MCP Server

1. **Open ChatGPT** (desktop app or web)
2. **Go to Settings** → **Integrations** → **MCP Servers**
3. **Add New Server**:
   - **Name**: Crypto Dashboard
   - **URL**: `https://YOUR-RAILWAY-URL/sse`
   - **Type**: Server-Sent Events (SSE)
4. **Save**

ChatGPT will connect to your MCP server via SSE.

---

## Step 7: Test in ChatGPT

Ask ChatGPT:
- "Show me Bitcoin price"
- "Display crypto dashboard"

ChatGPT should:
1. Connect to your MCP server via SSE
2. Call your `/crypto-price` API
3. Display your UI directly in ChatGPT

---

## Environment Variables (Optional)

In Railway dashboard, you can add environment variables:

- `NODE_ENV=production`
- `PORT` (Railway sets this automatically)

---

## Monitoring

Railway provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, Memory, Network usage
- **Deployments**: History of all deployments

Access these in your Railway project dashboard.

---

## Costs

- **Free Tier**: $5 credit/month (enough for small projects)
- **Hobby Plan**: $5/month for more resources
- **Pro Plan**: $20/month for production apps

Your crypto dashboard should run fine on the free tier.

---

## Troubleshooting

### SSE Not Connecting
- Check Railway logs for errors
- Verify CORS headers are set
- Test `/sse` endpoint with curl

### Build Fails
- Check `railway.json` build command
- Verify all dependencies in `package.json`
- Check Railway build logs

### Frontend Not Loading
- Ensure `client/dist` is built during deployment
- Check `railway.json` buildCommand
- Verify static file serving in `server.js`

---

## Important Notes

- Railway supports **long-lived connections** (perfect for SSE)
- Auto-deploys on every GitHub push
- Provides HTTPS by default
- No timeout issues like Vercel

---

## Next Steps After Deployment

1. Get your Railway URL
2. Update configuration files
3. Push changes to GitHub
4. Railway auto-redeploys
5. Add MCP server to ChatGPT
6. Test the integration

Your crypto dashboard will be live with full MCP server support! 🚀
