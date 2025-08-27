import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import News from "./components/News";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import Chart from "./components/Chart";

function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header />
        <News />
        <SearchBar search={search} setSearch={setSearch} />

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-300 animate-pulse mt-6">
            Loading coins...
          </p>
        ) : (
          <CryptoList coins={filteredCoins} setSelectedCoin={setSelectedCoin} />
        )}

        {selectedCoin && (
          <div className="mt-10">
            <Chart coin={selectedCoin} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
