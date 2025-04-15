import { Link } from "react-router-dom";

function DestinationCard({ city }) {
  return (
    <Link to={`/destination/${city.iataCode}`}>
      <div className="border rounded p-4 shadow-sm bg-white w-full max-w-sm hover:bg-gray-50 transition">
        <h2 className="text-xl font-semibold mb-1">{city.name}</h2>
        <p className="text-gray-600 mb-1">Country: {city.address?.countryCode}</p>
        <p className="text-gray-500 text-sm">City Code: {city.iataCode}</p>
      </div>
    </Link>
  );
}

export default DestinationCard;
