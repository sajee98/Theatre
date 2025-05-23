import "./cardPaymentForm.css";

function CardPaymentForm() {
  return (
    <div className="payment-container">
      <h2>Card Payment</h2>
      <form className="payment-form">
        <div className="form-group">
          <label htmlFor="name">Name on Card</label>
          <input type="text" id="name" placeholder="John Doe" required />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" maxLength="16" placeholder="1234 5678 9012 3456" required />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="expiry">Expiry Date</label>
            <input type="text" id="expiry" placeholder="MM/YY" required />
          </div>
          <div className="form-group half">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" maxLength="3" placeholder="123" required />
          </div>
        </div>

        <button type="submit" className="pay-btn">Pay ₹150</button>
      </form>
    </div>
  );
}

export default CardPaymentForm;
