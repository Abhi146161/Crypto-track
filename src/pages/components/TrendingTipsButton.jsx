import React from "react";

function TrendingTipsButton({ onClick }) {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
      >
        🔥 Show Trending Tips
      </button>
    </div>
  );
}

export default TrendingTipsButton;
