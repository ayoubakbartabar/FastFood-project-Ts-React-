import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./core/context/CartContext/CartContext";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ServicesPage from "./pages/ServicePage/ServicePage";
import ServiceCardDetails from "./pages/ServicePage/ServicePageCom/ServiceCardDetails/ServiceCardDetails";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/service" element={<ServicesPage />} />

          {/* Dynamic service detail */}
          <Route path="/service/:id" element={<ServiceCardDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
