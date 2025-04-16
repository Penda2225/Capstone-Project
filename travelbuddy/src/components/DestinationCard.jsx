import { Link } from "react-router-dom";

function DestinationCard({ city }) {
  return (
    <Link to={`/destination/${city.iataCode}`}>
      <div className="border rounded p-4 shadow-md bg-gray-900 w-full max-w-sm hover:bg-white hover:text-black transition">
        <h2 className="text-xl font-semibold mb-1">{city.name}</h2>
        <p className="text-gray-600 mb-1">Country: {city.address?.countryCode}</p>
        <p className="text-purple-200 text-sm">City Code: {city.iataCode}</p>
      </div>
    </Link>
  );
}

export default DestinationCard;
