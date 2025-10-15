import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );
        setNews(res.data.Data.slice(0, 9));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, [news]);

  if (loading)
    return (
      <p className="text-center text-gray-300 text-lg animate-pulse">
        Loading latest news...
      </p>
    );

  return (
    <div ref={sectionRef} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-4">
      {news.map((item, i) => (
        <motion.div
          key={item.id}
          className="bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 backdrop-blur-lg rounded-2xl p-5 shadow-xl hover:shadow-blue-500/30 transition duration-300 hover:scale-[1.03] border border-gray-700/50"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <motion.img
            src={item.imageurl}
            alt={item.title}
            className="rounded-xl mb-4 w-full h-44 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <h3 className="text-xl font-semibold mb-2 text-blue-300 line-clamp-2">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.body.slice(0, 120)}...</p>
          <div className="flex items-center justify-between">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 font-semibold hover:text-green-300 transition duration-200"
            >
              Read More →
            </a>
            <span className="text-xs text-gray-500">{new Date(item.published_on * 1000).toLocaleDateString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default News;
