/*import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-10">
      <input
        type="text"
        placeholder="Search for a destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;*/

import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="e.g. Paris"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-purple-600 bg-gray-900 text-white placeholder-white px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

 
