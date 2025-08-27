function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="🔍 Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 border-2 border-gray-600 bg-gray-800 text-white rounded-xl w-80 text-center focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
      />
    </div>
  );
}

export default SearchBar;
