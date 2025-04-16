import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import { searchCity } from "../api/amadeus";
import { useState } from "react";
import useItineraryStore from "../store/useItineraryStore";
//import { searchCity } from "../api/amadeus";

function HomePage() {
  const [destinations, setDestinations] = useState([]);

  async function handleSearch(term) {
    try {
      const results = await searchCity(term.trim());
      setDestinations(results);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
    }
  }

  //const setOriginCity = useItineraryStore((state) => state.setOriginCity);
  //const [originInput, setOriginInput] = useState("");
  const [originCityName, setOriginCityName] = useState("");
  const setOriginCity = useItineraryStore((state) => state.setOriginCity);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">TravelBuddy</h1>
      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm mb-1 text-gray-700">Enter Departure City Name:</label>
        <div className="flex gap-2">
            <input
            type="text"
            value={originCityName}
            onChange={(e) => setOriginCityName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="e.g. Dakar"
            />
            <button
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            onClick={async () => {
                const trimmed = originCityName.trim();
                if (!trimmed) return;
                try {
                const results = await searchCity(trimmed);
                if (results.length > 0) {
                    const code = results[0].iataCode;
                    setOriginCity(code);
                    console.log("Origin set to:", code);
                } else {
                    alert("City not found. Try again.");
                }
                } catch (err) {
                alert("Error fetching city.");
                }
            }}
            >
            Set Origin
            </button>
        </div>
        </div>


      <SearchBar onSearch={handleSearch} />
      <div className="grid gap-4 mt-8 w-full max-w-4xl">
        {destinations.map((city) => (
          <DestinationCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

