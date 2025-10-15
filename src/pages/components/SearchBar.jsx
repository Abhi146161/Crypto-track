function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="🔍 Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          p-3 w-80 text-white text-center 
          rounded-2xl 
          border-2 border-transparent 
          bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
          shadow-lg 
          focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent
          placeholder:text-gray-400 
          hover:scale-105 transform transition duration-300
        "
      />
    </div>
  );
}

export default SearchBar;
