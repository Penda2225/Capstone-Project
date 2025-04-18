import useItineraryStore from "../store/useItineraryStore";
import { Link } from "react-router-dom";


function ItineraryPage() {
  const items = useItineraryStore((state) => state.items);
  const removeItem = useItineraryStore((state) => state.removeItem);
  const clearItinerary = useItineraryStore((state) => state.clearItinerary);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-4">My Itinerary</h1>
      <Link
        to={`/destination/${localStorage.getItem("lastCityCode") || ""}`}
        className="text-blue-600 underline text-sm inline-block mb-4"
        >
        ← Back to Destination
        </Link>

      {items.length === 0 ? (
        <p>No items yet. Go add flights or hotels!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border p-4 rounded-xl shadow-md bg-gray-900 hover:shadow-md transition">
              {item.type === "Flight" ? (
                <>
                <p className="font-semibold text-lg">
                     {item.origin} → {item.destination}
                </p>
                <p>
                    {new Date(item.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} → {new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-600">
                Airline: {item.carrier} — {item.price} {item.currency}
                </p>
                <p className="text-sm text-purple-200">Date: {item.date}</p>
            </>
            ) : (
            <p>{item.label}</p>
            )}

              <button
                className="text-red-500 text-sm mt-2"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={clearItinerary}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default ItineraryPage;
 
