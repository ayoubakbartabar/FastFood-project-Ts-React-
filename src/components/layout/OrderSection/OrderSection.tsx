import React from "react";
import './OrderSection.css'

import { useOrderStore } from "../../../store/orderStore";

const OrderSection: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div className="orders-section">
      <h2 className="orders-title">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h3 className="order-code">Order Code : #{order.id}</h3>
          <p>Date: {order.date}</p>
          <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
          <p>Total: ${order.total.toFixed(2)}</p>

          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="order-item-image"
                />
                <div>
                  <p>
                    {item.title} x {item.quantity}
                  </p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSection;
