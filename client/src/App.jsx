import { useState, useEffect, useMemo } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const apiBaseUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl) return envUrl.replace(/\/$/, '');
    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }
    return '';
  }, []);

  const fetchCryptoData = async (symbol) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/crypto-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Live Crypto Dashboard</h1>
        <p>Real-time cryptocurrency prices powered by CoinGecko</p>
      </header>

      <div className="crypto-selector">
        <button
          onClick={() => fetchCryptoData('bitcoin')}
          disabled={loading}
          className="crypto-btn bitcoin"
        >
          ₿ Bitcoin
        </button>
        <button
          onClick={() => fetchCryptoData('ethereum')}
          disabled={loading}
          className="crypto-btn ethereum"
        >
          Ξ Ethereum
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading crypto data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>⚠️ Error: {error}</p>
        </div>
      )}

      {cryptoData && !loading && <Dashboard data={cryptoData} onRefresh={() => fetchCryptoData(cryptoData.coinName.toLowerCase())} />}

      {!cryptoData && !loading && !error && (
        <div className="welcome">
          <p>👆 Select a cryptocurrency to view live data</p>
        </div>
      )}
    </div>
  );
}

export default App;
