import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "https://crypto-track-zcim.onrender.com";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/news`)
      .then((res) => {
        setNews(res.data || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Fetch failed:", e?.response?.data || e.message);
        setErr("Couldn't load news.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6 text-green-400 text-center">📰 Latest Crypto News</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading news...</p>
      ) : err ? (
        <p className="text-center text-red-400">{err}</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-400">No news available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <div key={i} className="p-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-lg">
              <a href={item.url || item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-400 hover:underline">
                {item.title}
              </a>
              <p className="text-sm text-gray-400 mt-2">Source: {item.domain || item.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;
