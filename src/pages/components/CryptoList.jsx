import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CryptoList({ coins, setSelectedCoin }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, [coins]);

  return (
    <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {coins.map((coin, i) => (
        <motion.div
          key={coin.id}
          onClick={() => setSelectedCoin(coin)}
          className="news-card bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-black/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-5 flex justify-between items-center cursor-pointer shadow-xl hover:shadow-green-500/40 transition-all duration-400"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            <motion.img
              src={coin.image}
              alt={coin.name}
              className="w-14 h-14 rounded-full shadow-lg"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h3 className="font-bold text-lg text-white hover:text-green-400 transition-colors duration-300">
                {coin.name}
              </h3>
              <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <motion.span
            className="font-extrabold text-lg text-green-400 glow"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            ₹{coin.current_price.toLocaleString()}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export default CryptoList;
