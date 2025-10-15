import React from "react";
import { motion } from "framer-motion";

function TrendingTips() {
  const tips = [
    {
      title: "Binance Academy - Crypto Basics",
      url: "https://academy.binance.com/en",
      icon: "📚",
    },
    {
      title: "CoinTelegraph News & Tips",
      url: "https://cointelegraph.com/news",
      icon: "📰",
    },
    {
      title: "CoinGecko Learn",
      url: "https://www.coingecko.com/learn",
      icon: "💡",
    },
  ];

  return (
    <div className="mt-12 px-4" data-aos="fade-up">
      <h2 className="text-3xl font-extrabold text-center text-green-400 mb-8 animate-pulse drop-shadow-lg">
        🔥 Trending Crypto Tips
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <motion.a
            key={index}
            href={tip.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl hover:shadow-green-500/50 border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3 animate-pulse">{tip.icon}</span>
              <h3 className="font-bold text-lg text-blue-400 transition-all duration-300 hover:underline">
                {tip.title}
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              Learn, stay updated, and get tips from top crypto sources.
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default TrendingTips;
