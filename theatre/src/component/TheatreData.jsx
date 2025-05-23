import Navbar from "./Navbar";
import "./theatre.css";
import { Link } from "react-router-dom";

function TheatreData(props) {
  return (
    <>
      <Navbar />
      <div className="card">
        {/* Price in the top-left corner */}
        <div className="price"> Rs.{props.price}/-</div>
        
        <div className="theatre-name">{props.theatreName}</div>
        <div className="movie-details">
          <div className="movie-name">{props.movieName}</div>
          <div className="buttons">
            {/* Pass theatreName and showtime correctly */}
            {props.showtime1 && (
              <Link to="/seat" state={{ theatreName: props.theatreName, price: props.price, movieName: props.movieName, showtime: props.showtime1 }}>
                <button>{props.showtime1}</button>
              </Link>
            )}
            {props.showtime2 && (
              <Link to="/seat" state={{ theatreName: props.theatreName, movieName: props.movieName, showtime: props.showtime2 }}>
                <button>{props.showtime2}</button>
              </Link>
            )}
            {props.showtime3 && (
              <Link to="/seat" state={{ theatreName: props.theatreName, movieName: props.movieName, showtime: props.showtime3 }}>
                <button>{props.showtime3}</button>
              </Link>
            )}
            {props.showtime4 && (
              <Link to="/seat" state={{ theatreName: props.theatreName, movieName: props.movieName, showtime: props.showtime4 }}>
                <button>{props.showtime4}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default TheatreData;
