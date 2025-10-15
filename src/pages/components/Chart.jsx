import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import CountUp from "react-countup";

const TIMEFRAMES = { "24h": 1, "7d": 7, "30d": 30, "90d": 90 };

function UltimateCryptoChart({ coins }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("7d");
  const [darkMode, setDarkMode] = useState(true);

  const fetchCoinData = async (coinId) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${TIMEFRAMES[timeframe]}&interval=daily`
    );
    return res.data.prices.map((p, i, arr) => ({
      date: new Date(p[0]).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      price: +p[1].toFixed(2),
      change:
        i === 0 ? 0 : (((p[1] - arr[i - 1][1]) / arr[i - 1][1]) * 100).toFixed(2),
    }));
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const allData = {};
      for (const coin of coins) {
        allData[coin.id] = await fetchCoinData(coin.id);
      }
      setData(allData);
    } catch (err) {
      setError("Failed to fetch coin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [coins, timeframe]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-800 border-t-green-400 h-16 w-16 animate-spin"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center font-bold mt-6">{error}</div>;

  const bgGradient = darkMode
    ? "from-gray-900 via-gray-800 to-gray-900"
    : "from-white via-gray-100 to-white";
  const textColor = darkMode ? "text-green-400" : "text-green-600";
  const gridColor = darkMode ? "#2d2d2d" : "#e2e8f0";

  return (
    <div className={`p-6 rounded-3xl shadow-2xl transform transition hover:scale-105 duration-500 hover:shadow-green-500/70 bg-gradient-to-br ${bgGradient}`}>
      {/* Dark/Light Mode Toggle */}
      <div className="flex justify-end mb-4">
        <button
          className="px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-green-500 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Timeframe Buttons */}
      <div className="flex justify-center mb-6 gap-4">
        {Object.keys(TIMEFRAMES).map((tf) => (
          <button
            key={tf}
            className={`px-4 py-2 rounded-full font-semibold ${
              tf === timeframe
                ? "bg-green-500 text-black shadow-lg"
                : `bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-black transition`
            }`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Multiple Coins Charts */}
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="mb-12 p-4 rounded-2xl bg-gray-800/20 shadow-lg hover:shadow-green-400/40 transition"
        >
          <h2 className={`text-center mb-4 font-extrabold text-2xl drop-shadow-xl animate-pulse ${textColor}`}>
            {coin.name} - Last {timeframe}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data[coin.id]}>
              <defs>
                <linearGradient id={`lineGradient-${coin.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id={`fillGradient-${coin.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke={gridColor} />
              <XAxis dataKey="date" stroke={darkMode ? "#ccc" : "#4b5563"} tick={{ fontSize: 12, fontWeight: "bold" }} />
              <YAxis
                stroke={darkMode ? "#ccc" : "#4b5563"}
                tickFormatter={(value) => `₹${value}`}
                tick={{ fontWeight: "bold" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
                  border: "1px solid #4b5563",
                  borderRadius: "12px",
                  color: darkMode ? "#10b981" : "#059669",
                  fontWeight: "bold",
                  boxShadow: "0 0 20px rgba(16,185,129,0.5)",
                }}
                formatter={(value, name, props) => [
                  <CountUp
                    end={value}
                    duration={0.8}
                    separator=","
                    decimals={2}
                    prefix="₹"
                    key={value}
                  />,
                  "Price",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={`url(#lineGradient-${coin.id})`}
                strokeWidth={4}
                dot={{ r: 5, stroke: "#10b981", strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 3, stroke: "#34d399" }}
                fill={`url(#fillGradient-${coin.id})`}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Brush dataKey="date" stroke="#10b981" height={30} travellerWidth={10} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default UltimateCryptoChart;
