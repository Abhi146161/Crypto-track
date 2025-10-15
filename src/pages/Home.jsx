import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import Chart from "./components/Chart";
import News from "./components/News";
import TrendingTips from "./components/TrendingTips";

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showNews, setShowNews] = useState(false);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Fetch coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "inr",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setLoading(false);
        alert("Failed to fetch coins. Check your internet or API limits.");
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div data-aos="fade-down">
          <Header />
        </div>

        <div data-aos="fade-up" data-aos-delay={100}>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => setShowNews(!showNews)}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-green-400 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            {showNews ? "Hide News 📰" : "Show News 📰"}
          </button>

          <button
            onClick={() => setShowTips(!showTips)}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            {showTips ? "Hide Trending Tips 🔥" : "Show Trending Tips 🔥"}
          </button>
        </div>

        {/* News Section */}
        <AnimatePresence>
          {showNews && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="mt-12"
            >
              <News />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trending Tips Section */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="mt-12"
            >
              <TrendingTips />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-300 animate-pulse mt-6">
            Loading coins...
          </p>
        ) : (
          <div data-aos="fade-up" data-aos-delay={200}>
            <CryptoList coins={filteredCoins} setSelectedCoin={setSelectedCoin} />
          </div>
        )}

        {selectedCoin && (
          <div data-aos="fade-up" data-aos-delay={300} className="mt-10">
            <Chart coin={selectedCoin} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
