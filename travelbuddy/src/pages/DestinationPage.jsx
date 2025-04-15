import { useParams } from "react-router-dom";

function DestinationPage() {
  const { cityCode } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Destination Details: {cityCode}
      </h1>
      <p>This is where flight, hotel, and activity info will go.</p>
    </div>
  );
}

export default DestinationPage;

