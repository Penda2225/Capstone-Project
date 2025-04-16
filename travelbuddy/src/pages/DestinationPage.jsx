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
  const [travelDate, setTravelDate] = useState("");
  const originCity = useItineraryStore((state) => state.originCity);

  //const departure = flight.itineraries[0].segments[0].departure.at;
  //const arrival = flight.itineraries[0].segments.at(-1).arrival.at;


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
        if (!travelDate || !originCity || originCity.length !== 3) return;
        console.log("Calling Amadeus with:", originCity, cityCode, travelDate);
      try {
        const flightData = await getFlightOffers(originCity, cityCode, travelDate);
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
  }, [cityCode, travelDate]);
  

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Destination Details: {cityCode}
      </h1>

    <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">
            Select your travel date:
        </label>
        <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="border p-2 rounded"
        />
    </div>

    <div className="flex justify-end mb-4">
        <Link
            to="/itinerary"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
            View My Itinerary
        </Link>
    </div>

    {travelDate ? (
  <>
    <h2 className="text-2xl font-semibold mt-4 mb-2">Flight Offers</h2>
    {flights.length === 0 ? (
      <p>No flights found.</p>
    ) : (
      <ul className="space-y-2">
    {flights.map((flight, index) => {
        const segment = flight.itineraries[0].segments[0];
        const lastSegment = flight.itineraries[0].segments.at(-1);
        const departureTime = new Date(segment.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const arrivalTime = new Date(lastSegment.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <li key={index} className="border p-3 rounded shadow-sm">
            <p className="text-sm font-semibold">
                {segment.departure.iataCode} → {lastSegment.arrival.iataCode}
            </p>
            <p className="text-sm text-gray-700">
                {departureTime} → {arrivalTime}
            </p>
            <p className="text-sm">Carrier: {flight.validatingAirlineCodes?.[0]}</p>
            <p className="text-sm">Price: {flight.price.total} {flight.price.currency}</p>
            <button
                className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                addItem({
                    id: `${flight.validatingAirlineCodes?.[0]}-${index}`,
                    type: "Flight",
                    origin: segment.departure.iataCode,
                    destination: cityCode,
                    departureTime: segment.departure.at,
                    arrivalTime: lastSegment.arrival.at,
                    price: flight.price.total,
                    currency: flight.price.currency,
                    carrier: flight.validatingAirlineCodes?.[0],
                    date: travelDate,
                });
                alert("Flight added to itinerary!");
                }}
            >
                Add to Itinerary
            </button>
            </li>
        );
    })}
      </ul>
    )}
  </>
) : (
  <p className="text-gray-500">Please select a travel date.</p>
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
