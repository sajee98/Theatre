import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios
import "./payment.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { theatreName, movieName, showtime, date, selectedSeats, total } =
    state || {};

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\+94\d{9}$/; // Updated phone regex for +94 followed by 9 digits
    const cardNumberRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Phone number must be 12 digits starting with +94.";
    if (!formData.cardName.trim())
      newErrors.cardName = "Name on card is required.";
    if (
      !formData.cardNumber ||
      !cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ""))
    )
      newErrors.cardNumber = "Card number must be 16 digits.";
    if (!formData.expiry || !expiryRegex.test(formData.expiry))
      newErrors.expiry = "Expiry must be in MM/YY format.";
    if (!formData.cvv || !cvvRegex.test(formData.cvv))
      newErrors.cvv = "CVV must be 3 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      theatreName,
       movieName,  // <-- Fix is here
      showtime,
      date,
      selectedSeats,
      total,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/bookticket", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("Payment successful!");
        navigate("/ticket", { state: bookingData });
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to confirm your booking.");
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form">
        <h2 className="form-title">Payment</h2>
        <div className="form-group">
          <label>Movie Name</label>
          <input type="text" value={movieName} disabled />
        </div>
        <div className="form-group">
          <label>Theatre</label>
          <input type="text" value={theatreName} disabled />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" value={date} disabled />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="text" value={showtime} disabled />
        </div>
        <div className="form-group">
          <label>Seats</label>
          <input type="text" value={selectedSeats.join(", ")} disabled />
        </div>
        <div className="form-group">
          <label>Total</label>
          <input type="text" value={`Rs.${total}`} disabled />
        </div>

        {[{ label: "Your Name", name: "name" }, { label: "NIC", name: "nic" }, { label: "Email", name: "email", type: "email" }, { label: "Phone", name: "phone", type: "tel" }].map(({ label, name, type = "text" }, idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? "error" : ""}
            />
            {errors[name] && <div className="error-msg">{errors[name]}</div>}
          </div>
        ))}

        {/* Card Payment */}
        {[{ label: "Name on Card", name: "cardName" }, { label: "Card Number", name: "cardNumber", placeholder: "1234567812345678", maxLength: 19 }, { label: "Expiry", name: "expiry", placeholder: "MM/YY" }, { label: "CVV", name: "cvv", maxLength: 3 }].map(({ label, name, ...rest }, idx) => (
          <div className="form-group" key={idx}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={errors[name] ? "error" : ""}
              {...rest}
            />
            {errors[name] && <div className="error-msg">{errors[name]}</div>}
          </div>
        ))}

        {/* Terms and Submit */}
        <div className="form-group full-width">
          <label className="checkbox">
            <input type="checkbox" required /> I accept all terms and conditions.
          </label>
        </div>

        <div className="form-group full-width">
          <button className="Payment-button" onClick={handleConfirm}>Confirm & Pay ₹{total}</button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
