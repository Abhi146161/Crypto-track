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
} from "recharts";

function Chart({ coin }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=inr&days=7&interval=daily`
      )
      .then((res) => {
        const prices = res.data.prices.map((p) => ({
          date: new Date(p[0]).toLocaleDateString(),
          price: p[1],
        }));
        setData(prices);
      })
      .catch((err) => console.log(err));
  }, [coin]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-2xl">
      <h2 className="text-center mb-6 font-bold text-2xl text-green-400">
        {coin.name} - Last 7 Days
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              borderRadius: "10px",
              color: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
