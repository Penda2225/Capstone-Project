import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationPage from "./pages/DestinationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destination/:cityCode" element={<DestinationPage />} />
    </Routes>
  );
}

export default App;
