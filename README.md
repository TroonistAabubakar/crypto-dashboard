# 🚀 Live Crypto Dashboard App

A full-stack web application that integrates with OpenAI Apps SDK to fetch and display live cryptocurrency data (Bitcoin & Ethereum) from CoinGecko API with beautiful charts and real-time updates.

## 📋 Tech Stack

### Backend
- **Node.js** + **Express** - REST API server
- **CoinGecko API** - Live cryptocurrency data
- **CORS** enabled for cross-origin requests
- **ES Modules** (modern JavaScript)

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Chart.js** + **react-chartjs-2** - Interactive charts
- **Modern CSS** - Responsive design with gradients

### OpenAI Integration
- **OpenAPI 3.0** specification
- **AI Plugin Manifest** for ChatGPT
- **Apps SDK** integration with `window.openai.onToolResponse()`

---

## 📁 Project Structure

```
crypto-dashboard/
├── server.js                          # Express backend server
├── package.json                       # Backend dependencies
├── openapi.yaml                       # OpenAPI specification
├── public/
│   └── .well-known/
│       └── ai-plugin.json            # ChatGPT plugin manifest
└── client/                           # React frontend
    ├── package.json                  # Frontend dependencies
    ├── vite.config.js               # Vite configuration
    ├── index.html                   # HTML entry point
    └── src/
        ├── main.jsx                 # React entry point
        ├── App.jsx                  # Main app component
        ├── App.css                  # App styles
        ├── index.css                # Global styles
        └── components/
            ├── Dashboard.jsx        # Dashboard component
            └── Dashboard.css        # Dashboard styles
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Step 1: Install Backend Dependencies

```bash
cd crypto-dashboard
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd client
npm install
```

---

## ▶️ Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**
```bash
cd crypto-dashboard
npm start
```
Backend will run on: `http://localhost:3000`

**Terminal 2 - Frontend Dev Server:**
```bash
cd crypto-dashboard/client
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Option 2: Production Build

**Build the frontend:**
```bash
cd crypto-dashboard/client
npm run build
```

This creates an optimized production build in `client/dist/`

---

## 🔌 API Endpoints

### POST /crypto-price

Fetches live cryptocurrency data.

**Request:**
```json
{
  "symbol": "bitcoin"
}
```

**Response:**
```json
{
  "coinName": "Bitcoin",
  "currentPrice": "$45,123.45",
  "change24h": "2.34%",
  "chartData": [
    {
      "time": "2024-01-10T12:00:00.000Z",
      "price": "44500.00"
    }
  ]
}
```

**Supported Symbols:**
- `bitcoin`
- `ethereum`

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🤖 OpenAI Apps SDK Integration

### Plugin Manifest
Located at: `http://localhost:3000/.well-known/ai-plugin.json`

### OpenAPI Spec
Located at: `http://localhost:3000/openapi.yaml`

### Frontend Integration

The React app listens for tool responses from ChatGPT:

```javascript
window.openai.onToolResponse((response) => {
  // Handle crypto data from ChatGPT tool call
  setCryptoData(response);
});
```

### How It Works

1. **ChatGPT** calls the `/crypto-price` endpoint via the Apps SDK
2. **Backend** fetches data from CoinGecko API
3. **Response** is sent back to ChatGPT
4. **Frontend** receives data via `window.openai.onToolResponse()`
5. **Dashboard** renders the live data with charts

---

## 🎨 Features

### Dashboard UI
- ✅ Real-time cryptocurrency prices
- ✅ 24-hour price change percentage
- ✅ 7-day price trend chart (168 data points)
- ✅ Beautiful gradient design
- ✅ Responsive layout (mobile-friendly)
- ✅ Smooth animations
- ✅ Interactive Chart.js visualizations

### Backend Features
- ✅ RESTful API with Express
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling and validation
- ✅ CoinGecko API integration
- ✅ Structured JSON responses
- ✅ OpenAPI 3.0 specification
- ✅ ChatGPT plugin manifest

---

## 🌐 Deploying to Production

### Requirements for HTTPS Deployment

For ChatGPT integration, you need HTTPS. Options:

1. **Netlify/Vercel** (Frontend)
2. **Railway/Render** (Backend)
3. **Nginx + Let's Encrypt** (Self-hosted)

### Environment Variables

For production, set:
```bash
PORT=3000
NODE_ENV=production
```

### Build Commands

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
npm run build
```

---

## 📊 API Rate Limits

**CoinGecko Free API:**
- 10-30 calls/minute
- No API key required for basic usage

For higher limits, consider CoinGecko Pro API.

---

## 🧪 Testing the API

### Using cURL

```bash
curl -X POST http://localhost:3000/crypto-price \
  -H "Content-Type: application/json" \
  -d '{"symbol": "bitcoin"}'
```

### Using Postman

1. Method: `POST`
2. URL: `http://localhost:3000/crypto-price`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "symbol": "ethereum"
}
```

---

## 🛠️ Development

### Backend Development Mode

```bash
npm run dev
```

Uses Node.js `--watch` flag for auto-restart on file changes.

### Frontend Development

```bash
npm run dev
```

Vite provides:
- ⚡ Instant HMR (Hot Module Replacement)
- 🔥 Fast refresh
- 📦 Optimized builds

---

## 📝 License

MIT License - feel free to use this project for learning or production.

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📞 Support

For issues or questions:
- Check the CoinGecko API documentation
- Review the OpenAI Apps SDK docs
- Open an issue on GitHub

---

## 🎯 Next Steps

- [ ] Add more cryptocurrencies (Cardano, Solana, etc.)
- [ ] Implement WebSocket for real-time updates
- [ ] Add price alerts
- [ ] Historical data comparison
- [ ] Portfolio tracking
- [ ] Dark mode toggle
- [ ] Multi-currency support (EUR, GBP, etc.)

---

**Built with ❤️ for the OpenAI Apps SDK**
