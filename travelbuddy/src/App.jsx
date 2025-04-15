import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";
import ItineraryPage from "./pages/ItineraryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destination/:cityCode" element={<DestinationPage />} />
      <Route path="/itinerary" element={<ItineraryPage />} />
    </Routes>
  );
}

export default App;
