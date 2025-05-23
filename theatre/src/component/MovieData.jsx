import { Link } from "react-router-dom";
import "./MovieStyles.css";

function TripData(props) {
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props.image} alt="" />
      </div>
      <h1>{props.movieName}</h1>
      <Link to="/Theatre" state={{ movieName: props.movieName }} >
        <button className="btn-book">Book Now!</button>
      </Link>
      <br />
    </div>
  );
}

export default TripData;
