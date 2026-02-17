import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard({ data, onRefresh }) {
  const isPositiveChange = parseFloat(data.change24h) >= 0;

  const chartData = {
    labels: data.chartData.map((item) => {
      const date = new Date(item.time);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: `${data.coinName} Price (USD)`,
        data: data.chartData.map((item) => parseFloat(item.price)),
        borderColor: isPositiveChange ? '#10b981' : '#ef4444',
        backgroundColor: isPositiveChange 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: isPositiveChange ? '#10b981' : '#ef4444',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '7-Day Price Trend',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: isPositiveChange ? '#10b981' : '#ef4444',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString('en-US');
          },
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="coin-info">
          <h2>{data.coinName}</h2>
          <div className="price-info">
            <div className="current-price">{data.currentPrice}</div>
            <div className={`change-24h ${isPositiveChange ? 'positive' : 'negative'}`}>
              {isPositiveChange ? '▲' : '▼'} {data.change24h}
              <span className="change-label">24h</span>
            </div>
          </div>
        </div>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="dashboard-footer">
        <p>Data provided by CoinGecko API</p>
        <p className="timestamp">Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Dashboard;
