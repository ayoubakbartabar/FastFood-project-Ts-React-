import React, { useState } from "react";
import "./RequestReservationForm.css";

interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  note: string;
}

const RequestReservationForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: 2,
    note: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "people" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reservation data:", formData);
    // Here you can integrate API call to submit the reservation
  };

  return (
    <form className="reservation-form-wrapper" onSubmit={handleSubmit}>
      <h3 className="form-title">Book a Table</h3>

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="people">People</label>
          <input
            type="number"
            id="people"
            placeholder="2"
            min={1}
            value={formData.people}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          rows={4}
          placeholder="Write your message or request..."
          value={formData.note}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="form-button">
        Reserve Now
      </button>
    </form>
  );
};

export default RequestReservationForm;
