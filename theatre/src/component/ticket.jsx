import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ticket.css";

function Ticket() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No ticket data found.</p>;

  const {
    name,
    nic,
    email,
    phone,
    theatreName,
    Movie_name,
    showtime,
    date,
    selectedSeats,
    total,
  } = state;

  const downloadPDF = () => {
    const ticket = document.getElementById("ticket-card");
    ticket.scrollIntoView(); // ensure it's in view
    html2canvas(ticket).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("movie-ticket.pdf");
    });
  };
  

  return (
    <div className="ticket-container">
      <div className="ticket-card" id="ticket-card">
        <h2>🎟️ Booking Confirmed</h2>
        <div className="ticket-details">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>NIC:</strong> {nic}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <hr />
          <p><strong>Movie:</strong> {Movie_name}</p>
          <p><strong>Theatre:</strong> {theatreName}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Showtime:</strong> {showtime}</p>
          <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
          <p><strong>Total Paid:</strong> ₹{total}</p>
        </div>
      </div>
      <div className="ticket-buttons">
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

export default Ticket;
