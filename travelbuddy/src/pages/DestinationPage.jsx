import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlightOffers, getHotelOffers } from "../api/amadeus";
import useItineraryStore from "../store/useItineraryStore";
import { Link } from "react-router-dom";


function DestinationPage() {
  const { cityCode } = useParams();
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const addItem = useItineraryStore((state) => state.addItem);


  /*useEffect(() => {
    async function fetchData() {
      try {
        const flightData = await getFlightOffers(cityCode);
        const hotelData = await getHotelOffers(cityCode);
        setFlights(flightData);
        setHotels(hotelData);
      } catch (error) {
        console.error("Error loading destination details:", error.message);
      }
    }

    fetchData();
  }, [cityCode]);*/

  useEffect(() => {
    async function fetchData() {
      try {
        const flightData = await getFlightOffers(cityCode);
        setFlights(flightData);
      } catch (error) {
        console.error("Error fetching flights:", error.message);
      }
  
      try {
        const hotelData = await getHotelOffers(cityCode);
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error.message);
      }
    }
  
    fetchData();
  }, [cityCode]);
  

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Destination Details: {cityCode}
      </h1>

    <div className="flex justify-end mb-4">
        <Link
            to="/itinerary"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
            View My Itinerary
        </Link>
    </div>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Flight Offers</h2>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul className="space-y-2">
          {flights.map((flight, index) => (
            <li key={index} className="border p-3 rounded shadow-sm">
              <p>Price: {flight.price.total} {flight.price.currency}</p>
              <p>Carrier: {flight.validatingAirlineCodes?.[0]}</p>

              <button
                className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                    addItem({
                        id: `${flight.validatingAirlineCodes?.[0]}-${index}`,
                        type: "flight",
                        label: `Flight ${flight.validatingAirlineCodes?.[0]} - ${flight.price.total} ${flight.price.currency}`,
                    });
                    alert("Flight added to itinerary!");
                }}
            >
                Add to Itinerary
            </button>
        </li>
            ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Hotels</h2>
      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <ul className="space-y-2">
          {hotels.map((hotel, index) => (
            <li key={index} className="border p-3 rounded shadow-sm">
              <p>{hotel.hotel.name}</p>
              <p>Rating: {hotel.hotel.rating || "N/A"}</p>
              <p>City: {hotel.hotel.address?.cityName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DestinationPage;
