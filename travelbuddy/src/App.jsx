import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import { searchCity } from "./api/amadeus";
import { useState } from "react";

function App() {
  const [destinations, setDestinations] = useState([]);

  async function handleSearch(term) {
    try {
      const results = await searchCity(term);
      console.log("Search results:", results);
      setDestinations(results);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
    }
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">TravelBuddy ✈️</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Destination list */}
      <div className="grid gap-4 mt-8 w-full max-w-4xl">
        {destinations.map((city) => (
          <DestinationCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

export default App;
