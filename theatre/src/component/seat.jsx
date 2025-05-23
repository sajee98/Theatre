import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./seat.css";
import axios from "axios";

function Seat() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookedSeats, setBookedSeats] = useState([]);

  const theatreName = location.state?.theatreName || "Unknown Theatre";
  const showtime = location.state?.showtime || "Unknown Showtime";
  const movieName = location.state?.movieName || "Unknown Movie";
  const price = location.state?.price || 0; // Use the price passed from the previous page

  const today = new Date();
  const nextDays = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const [selectedDate, setSelectedDate] = useState(nextDays[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePay = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/lock-seats", {
        seats: selectedSeats,
        movie_name: movieName,
        theatre: theatreName,
        showtime,
        date: selectedDate,
      });

      navigate("/payment", {
        state: {
          theatreName,
          movieName,
          showtime,
          movieName,
          date: selectedDate,
          selectedSeats,
          total: selectedSeats.length * price, // Use dynamic price
        },
      });
    } catch (error) {
      if (error.response?.status === 422) {
        const locked = error.response.data.lockedSeats || [];
        alert(`These seats are already locked: ${locked.join(", ")}`);
        setSelectedSeats((prev) =>
          prev.filter((seat) => !locked.includes(seat))
        );
      } else {
        alert("Error locking seats.");
      }
      console.error(error);
    }
  };

  const fetchLockedSeats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-locked-seats",
        {
          params: {
            theatre: theatreName,
            movie_name: movieName,
            showtime,
            date: selectedDate,
            movieName,
          },
        }
      );
      setLockedSeats(response.data);
    } catch (error) {
      console.error("Failed to fetch locked seats:", error);
    }
  };

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-booked-seats",
        {
          params: {
            theatre: theatreName,
            movie_name: movieName,
            showtime,
            date: selectedDate,
          },
        }
      );
      setBookedSeats(response.data);
    } catch (error) {
      console.error("Failed to fetch booked seats:", error);
    }
  };

  useEffect(() => {
    fetchLockedSeats();
    fetchBookedSeats();
    const interval = setInterval(() => {
      fetchLockedSeats();
      fetchBookedSeats();
    }, 5000);
    return () => clearInterval(interval);
  }, [theatreName, showtime, selectedDate, movieName]);

  return (
    <div className="containerseat">
      
      <div className="theatre">
        <div className="theatre-header">
          <div className="header-top">
            <div className="theatre-name">{movieName}</div>
            <div className="showtime">Time: {showtime}</div>
          </div>
          <div className="theatre-name">{theatreName}</div>
        </div>

        <div className="date-selection">
          {nextDays.map((date, index) => (
            <button
              key={index}
              className={`date-btn ${selectedDate === date ? "selected" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="screen">SCREEN</div>

        <div className="cinema-seats">
          {["A", "B", "C", "D"].map((row) => (
            <div key={row} className="cinema-row">
              {Array.from({ length: 7 }, (_, i) => {
                const seat = `${row}${i + 1}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                const isLocked = lockedSeats.includes(seat);
                const isLockedByOthers = isLocked && !isSelected;

                return (
                  <div
                    key={seat}
                    className={`seat 
                      ${isSelected ? "selected" : ""} 
                      ${isLockedByOthers ? "locked" : ""} 
                      ${isBooked ? "booked" : ""}`}
                    onClick={() => {
                      if (!isLockedByOthers && !isBooked) toggleSeat(seat);
                    }}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="pay-section">
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p>Total Price: Rs.{selectedSeats.length * price}</p> {/* Dynamically calculate price */}
          <button className="pay-button" onClick={handlePay}>
            Pay
          </button>
        </div>
      </div>
      <div className="seat-legend">
  <div className="legend-item">
    <div className="legend-color booked"></div>
    <span>Booked</span>
  </div>
  <div className="legend-item">
    <div className="legend-color locked"></div>
    <span>Locked</span>
  </div>
  <div className="legend-item">
    <div className="legend-color selected"></div>
    <span>Selected</span>
  </div>
  <div className="legend-item">
    <div className="legend-color available"></div>
    <span>Available</span>
  </div>
</div>

    </div>
  );
}

export default Seat;
