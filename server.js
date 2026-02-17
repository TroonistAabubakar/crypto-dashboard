import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';  // Ensure node-fetch is available

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "*",  // Allow requests from any domain (adjust this if needed)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Set iframe embedding headers for ChatGPT
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  res.setHeader("Content-Security-Policy", "frame-ancestors https://chat.openai.com https://chatgpt.com");
  next();
});

// API Routes - Define these BEFORE static file serving
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve OpenAPI file
app.get('/openapi.yaml', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'openapi.yaml'));
});

// SSE Route - DISABLED: Not compatible with Vercel serverless functions
// Vercel functions timeout after 10-60 seconds, SSE requires long-lived connections
// app.get('/sse', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders();
//
//   const intervalId = setInterval(() => {
//     res.write(`data: ${JSON.stringify({ message: 'Test message from backend' })}\n\n`);
//   }, 5000);
//
//   req.on('close', () => {
//     clearInterval(intervalId);
//     res.end();
//   });
// });

// API route to get cryptocurrency price data
app.post('/crypto-price', async (req, res) => {
  try {
    const { symbol } = req.body;

    if (!symbol || !['bitcoin', 'ethereum'].includes(symbol.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid symbol. Please use "bitcoin" or "ethereum".'
      });
    }

    const coinId = symbol.toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    const chartData = data.market_data.sparkline_7d.price.map((price, index) => ({
      time: new Date(Date.now() - (167 - index) * 3600000).toISOString(),
      price: price.toFixed(2)
    }));

    const result = {
      coinName: data.name,
      currentPrice: `$${data.market_data.current_price.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change24h: `${data.market_data.price_change_percentage_24h.toFixed(2)}%`,
      chartData: chartData,
      dashboardUrl: `https://crypto-teck-mcp.vercel.app/?coin=${coinId}`
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({
      error: 'Failed to fetch cryptocurrency data',
      details: error.message
    });
  }
});

// Static file serving - AFTER API routes
app.use('/.well-known', express.static(path.join(PUBLIC_DIR, '.well-known')));
app.use(express.static(path.join(__dirname, 'client/dist')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Crypto Dashboard Backend running on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: POST http://localhost:${PORT}/crypto-price`);
  console.log(`🔌 Plugin manifest: http://localhost:${PORT}/.well-known/ai-plugin.json`);
});
