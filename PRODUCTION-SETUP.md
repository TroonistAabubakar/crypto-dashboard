# 🚀 Production Setup for OpenAI Apps SDK Integration

## Architecture Overview

Your app is now configured for **unified backend serving**:
- ✅ Express serves both API endpoints AND React UI from port 3000
- ✅ No separate Vite dev server needed (port 5173 eliminated)
- ✅ Single HTTPS domain for manifest, API, and UI
- ✅ Proper iframe embedding headers configured
- ✅ OpenAI Apps SDK `window.openai.onToolResponse()` integrated

---

## 📦 Build & Deploy Steps

### Step 1: Build React Frontend

```bash
cd client
npm run build
```

This creates optimized production files in `client/dist/`:
- Minified JavaScript bundles
- Optimized CSS
- Static assets

### Step 2: Start Backend Server

```bash
cd ..
npm start
```

Server runs on port 3000 and serves:
- **UI**: `https://t53ffb5r-3000.inc1.devtunnels.ms/` (from `client/dist`)
- **API**: `https://t53ffb5r-3000.inc1.devtunnels.ms/crypto-price`
- **Manifest**: `https://t53ffb5r-3000.inc1.devtunnels.ms/.well-known/ai-plugin.json`
- **OpenAPI**: `https://t53ffb5r-3000.inc1.devtunnels.ms/openapi.yaml`

### Step 3: Verify Endpoints

Test each URL in your browser:

1. **Manifest**: https://t53ffb5r-3000.inc1.devtunnels.ms/.well-known/ai-plugin.json
   - Should return JSON with `ui.webview` section

2. **OpenAPI**: https://t53ffb5r-3000.inc1.devtunnels.ms/openapi.yaml
   - Should return YAML specification

3. **UI**: https://t53ffb5r-3000.inc1.devtunnels.ms/
   - Should show React dashboard with Bitcoin/Ethereum buttons

4. **API Test**:
```bash
curl -X POST https://t53ffb5r-3000.inc1.devtunnels.ms/crypto-price \
  -H "Content-Type: application/json" \
  -d '{"symbol": "bitcoin"}'
```

---

## 🔌 ChatGPT Integration Steps

### 1. Install App in ChatGPT

1. Open ChatGPT → **Settings** → **Apps** → **Install an app**
2. Enter manifest URL: `https://t53ffb5r-3000.inc1.devtunnels.ms/.well-known/ai-plugin.json`
3. ChatGPT will:
   - Fetch and validate the manifest
   - Load the OpenAPI spec
   - Register the `getCryptoPrice` tool
   - Enable the webview UI

### 2. Test the Integration

In ChatGPT, try prompts like:

- "Show me Bitcoin price data"
- "Get Ethereum dashboard"
- "Display crypto prices for Bitcoin"

**What happens:**
1. ChatGPT calls `POST /crypto-price` with `{"symbol": "bitcoin"}`
2. Backend fetches CoinGecko data and returns structured JSON
3. ChatGPT displays the webview iframe with your React UI
4. `window.openai.onToolResponse()` receives the data
5. Dashboard renders with live price, chart, and 24h change

---

## 🏗️ Architecture Details

### Backend Configuration (`server.js`)

```javascript
// Serve React build from client/dist
app.use(express.static("client/dist"));

// Serve manifest
app.use('/.well-known', express.static(path.join(PUBLIC_DIR, '.well-known')));

// Serve OpenAPI spec
app.get('/openapi.yaml', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'openapi.yaml'));
});

// Enable iframe embedding for ChatGPT
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://chat.openai.com https://chatgpt.com"
  );
  next();
});

// API endpoint
app.post('/crypto-price', async (req, res) => {
  // Fetch from CoinGecko and return structured data
});
```

### Frontend Integration (`App.jsx`)

```javascript
// Listen for tool responses from ChatGPT
useEffect(() => {
  if (typeof window !== 'undefined' && window.openai) {
    window.openai.onToolResponse((response) => {
      console.log('Received tool response:', response);
      if (response && response.coinName) {
        setCryptoData(response);
        setLoading(false);
        setError(null);
      }
    });
  }
}, []);

// Auto-detect API base URL (works in iframe and standalone)
const apiBaseUrl = useMemo(() => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}, []);
```

### Manifest Configuration (`ai-plugin.json`)

```json
{
  "schema_version": "v1",
  "name_for_model": "live_crypto_dashboard",
  "name_for_human": "Live Crypto Dashboard",
  "description_for_model": "Fetch crypto data and render dashboard UI.",
  "description_for_human": "Interactive crypto dashboard.",
  "auth": { "type": "none" },
  "api": {
    "type": "openapi",
    "url": "https://t53ffb5r-3000.inc1.devtunnels.ms/openapi.yaml"
  },
  "ui": {
    "type": "webview",
    "url": "https://t53ffb5r-3000.inc1.devtunnels.ms/"
  }
}
```

**Key addition**: The `"ui"` section tells ChatGPT where to load the webview iframe.

---

## 🔄 Development Workflow

### For Local Development

1. **Build frontend once**:
```bash
cd client
npm run build
```

2. **Start backend**:
```bash
cd ..
npm start
```

3. **Make changes**:
   - Edit React code in `client/src/`
   - Rebuild: `cd client && npm run build`
   - Backend auto-serves new build from `client/dist`

### For Frontend-Only Changes

If you need hot reload during development:

```bash
# Terminal 1: Frontend dev server
cd client
npm run dev

# Terminal 2: Backend
cd ..
npm start
```

Then update `client/src/App.jsx` to use `http://localhost:3000` for API calls during dev.

**For production**: Always build and serve from single origin.

---

## 📋 Checklist Before Going Live

- [ ] `npm run build` completes without errors
- [ ] `client/dist/` contains built files
- [ ] Backend serves UI at root URL
- [ ] Manifest is accessible at `/.well-known/ai-plugin.json`
- [ ] OpenAPI spec is accessible at `/openapi.yaml`
- [ ] `/crypto-price` endpoint returns valid JSON
- [ ] HTTPS is enabled (required for ChatGPT)
- [ ] CSP headers allow ChatGPT iframe embedding
- [ ] CORS is configured for API calls
- [ ] `window.openai.onToolResponse()` is implemented

---

## 🚨 Common Issues & Solutions

### Issue: UI not loading in ChatGPT iframe

**Solution**: Check CSP headers in `server.js`:
```javascript
res.setHeader(
  "Content-Security-Policy",
  "frame-ancestors https://chat.openai.com https://chatgpt.com"
);
```

### Issue: API calls fail from iframe

**Solution**: Ensure CORS is enabled:
```javascript
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
```

### Issue: `window.openai` is undefined

**Solution**: This is normal when testing standalone. The SDK is only available inside ChatGPT's iframe. Use manual button clicks for standalone testing.

### Issue: Manifest not found

**Solution**: Verify file structure:
```
crypto-dashboard/
├── public/
│   └── .well-known/
│       └── ai-plugin.json
```

And ensure static middleware:
```javascript
app.use('/.well-known', express.static(path.join(PUBLIC_DIR, '.well-known')));
```

---

## 🌐 Updating Public URLs

If you change your DevTunnels URL or deploy to a new domain:

1. Update `public/.well-known/ai-plugin.json`:
   - `api.url`
   - `ui.url`

2. Update `public/openapi.yaml`:
   - `servers[0].url`

3. Rebuild and restart:
```bash
cd client && npm run build
cd .. && npm start
```

4. Re-install app in ChatGPT with new manifest URL

---

## 📊 Production Deployment Options

### Option 1: Single Server (Recommended)

Deploy to Railway, Render, or Heroku:
- Serve both API and UI from Express
- Use environment variables for URLs
- Enable HTTPS (automatic on most platforms)

### Option 2: Separate Hosting

- **Backend**: Railway/Render (API + manifest)
- **Frontend**: Netlify/Vercel (static build)
- Update manifest `ui.url` to point to frontend CDN

**Note**: Option 1 is simpler and avoids CORS complexity.

---

## ✅ Success Indicators

When everything works:

1. ✅ ChatGPT recognizes your app in the Apps menu
2. ✅ Tool calls trigger `/crypto-price` endpoint
3. ✅ Webview iframe loads your React UI
4. ✅ `window.openai.onToolResponse()` receives data
5. ✅ Dashboard displays coin name, price, change, and chart
6. ✅ No CORS or CSP errors in browser console

---

**Your app is now production-ready for OpenAI Apps SDK! 🎉**
