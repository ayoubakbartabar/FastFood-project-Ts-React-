import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { CartProvider } from "./core/context/CartContext/CartContext";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
