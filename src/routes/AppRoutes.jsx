import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VisiMisi from "../pages/VisiMisi";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visi-misi" element={<VisiMisi />} />
    </Routes>
  );
};

export default AppRoutes;
