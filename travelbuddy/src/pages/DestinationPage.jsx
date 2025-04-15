import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlightOffers, getHotelOffers } from "../api/amadeus";

function DestinationPage() {
  const { cityCode } = useParams();
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);

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

      <h2 className="text-2xl font-semibold mt-4 mb-2">Flight Offers</h2>
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul className="space-y-2">
          {flights.map((flight, index) => (
            <li key={index} className="border p-3 rounded shadow-sm">
              <p>Price: {flight.price.total} {flight.price.currency}</p>
              <p>Carrier: {flight.validatingAirlineCodes?.[0]}</p>
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
