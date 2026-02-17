# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1️⃣ Install Backend Dependencies

Open terminal in the `crypto-dashboard` folder:

```bash
npm install
```

This installs:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `node-fetch` - HTTP client for API calls

### 2️⃣ Install Frontend Dependencies

Navigate to the client folder:

```bash
cd client
npm install
```

This installs:
- `react` & `react-dom` - UI framework
- `vite` - Build tool
- `chart.js` & `react-chartjs-2` - Charting library
- `@vitejs/plugin-react` - Vite React plugin

### 3️⃣ Start the Backend Server

From the `crypto-dashboard` folder:

```bash
npm start
```

You should see:
```
🚀 Crypto Dashboard Backend running on http://localhost:3000
📊 API endpoint: POST http://localhost:3000/crypto-price
🔌 Plugin manifest: http://localhost:3000/.well-known/ai-plugin.json
```

### 4️⃣ Start the Frontend Dev Server

Open a **new terminal** and navigate to the client folder:

```bash
cd client
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5️⃣ Open the App

Visit: **http://localhost:5173**

You should see the Live Crypto Dashboard with buttons for Bitcoin and Ethereum.

---

## ✅ Verification Steps

### Test Backend API

```bash
curl -X POST http://localhost:3000/crypto-price \
  -H "Content-Type: application/json" \
  -d "{\"symbol\": \"bitcoin\"}"
```

Expected response: JSON with Bitcoin data

### Test Frontend

1. Click "₿ Bitcoin" button
2. Dashboard should load with:
   - Current Bitcoin price
   - 24h change percentage
   - 7-day price chart

### Test OpenAI Integration Files

1. Visit: `http://localhost:3000/.well-known/ai-plugin.json`
   - Should show plugin manifest

2. Visit: `http://localhost:3000/openapi.yaml`
   - Should show OpenAPI specification

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For client
cd client
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure:
1. Backend is running on port 3000
2. Frontend is making requests to `http://localhost:3000`
3. CORS is enabled in `server.js`

### CoinGecko API Rate Limit

If you see rate limit errors:
- Wait 1-2 minutes
- Reduce request frequency
- Consider CoinGecko Pro API for higher limits

---

## 🎯 Next Steps

Once everything is running:

1. **Test the UI** - Click Bitcoin and Ethereum buttons
2. **Inspect Network** - Open DevTools → Network tab
3. **Check Console** - Look for any errors
4. **Review Code** - Explore the project structure
5. **Customize** - Add your own features!

---

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [OpenAI Apps SDK](https://platform.openai.com/docs/apps)

---

**Happy Coding! 🎉**
