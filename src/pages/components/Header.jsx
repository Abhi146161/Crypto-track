import { useState, useEffect } from "react";
import News from "./News"; // Ensure correct path
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  const [showNews, setShowNews] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,      // animation duration in ms
      easing: "ease-in-out",
      once: true,         // animate only once
    });
  }, []);

  return (
    <div className="text-center mb-10">
      <h1
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-wide drop-shadow-lg mb-6"
        data-aos="fade-down"
      >
        🚀 Crypto Price Tracker
      </h1>

      {/* News Toggle Button */}
      {/* <button
        onClick={() => setShowNews(!showNews)}
        className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-green-400 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        data-aos="fade-up"
        data-aos-delay={100}
      >
        {showNews ? "Hide News 📰" : "Show News 📰"}
      </button> */}

      {/* Render News Section */}
      {showNews && (
        <div
          className="mt-12"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <News />
        </div>
      )}
    </div>
  );
}

export default Header;
