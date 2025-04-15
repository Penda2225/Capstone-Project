import useItineraryStore from "../store/useItineraryStore";

function ItineraryPage() {
  const items = useItineraryStore((state) => state.items);
  const removeItem = useItineraryStore((state) => state.removeItem);
  const clearItinerary = useItineraryStore((state) => state.clearItinerary);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">My Itinerary</h1>

      {items.length === 0 ? (
        <p>No items yet. Go add flights or hotels!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border p-3 rounded shadow">
              <p>{item.label}</p>
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
 
