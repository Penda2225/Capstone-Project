import SearchBar from "./components/SearchBar";

function App() {
  function handleSearch(term) {
    console.log("User searched for:", term);
    // Later: Call API here
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">TravelBuddy ✈️</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
