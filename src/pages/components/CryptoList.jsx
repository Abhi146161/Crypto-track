function CryptoList({ coins, setSelectedCoin }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {coins.map((coin) => (
        <div
          key={coin.id}
          onClick={() => setSelectedCoin(coin)}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-2xl shadow-lg flex justify-between items-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-600"
        >
          <div className="flex items-center gap-4">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <div>
              <h3 className="font-bold text-lg">{coin.name}</h3>
              <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <span className="font-extrabold text-green-400 text-lg">
            ₹{coin.current_price.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CryptoList;
