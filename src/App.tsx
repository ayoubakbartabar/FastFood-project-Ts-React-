import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./components/layout/CartContext/CartContext";
import HomePage from "./pages/HomePage/HomePage";


function App() {
  return (
    <CartProvider>
      <Router>
        <HomePage />
        
      </Router>
    </CartProvider>
  );
}

export default App;
