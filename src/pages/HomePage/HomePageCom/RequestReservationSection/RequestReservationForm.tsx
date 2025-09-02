import React from "react";
import "./RequestReservationForm.css";

export default function RequestReservationForm() {
  return (
    <form className="reservation-form-wrapper">
      <h3 className="form-title">Book a Table</h3>

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Enter your full name" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" placeholder="Enter your phone number" />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" />
        </div>

        <div className="form-group">
          <label htmlFor="people">People</label>
          <input type="number" id="people" placeholder="2" min="1" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          rows={4}
          placeholder="Write your message or request..."
        ></textarea>
      </div>

      <button type="submit" className="form-button">
        Reserve Now
      </button>
    </form>
  );
}
