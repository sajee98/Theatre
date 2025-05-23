import React, { useState, useEffect } from "react";
import axios from "axios";
import TheatreData from "./TheatreData";
import Hero from "./Hero";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Theatre() {
    const [theatreData, setTheatres] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get movieName from location state
    const location = useLocation();
    const movieName = location.state?.movieName || "Unknown Movie";

    useEffect(() => {
        Load();
    }, []);

    const Load = async (searchQuery = "2") => {
        setLoading(true);
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/acceptMovie", {
                params: { decision: searchQuery, movieName: movieName },
            });
            setTheatres(result.data.data);
        } catch (error) {
            console.error("Error loading theatres:", error);
        }
        setLoading(false);
    };

    return (
        <>
            <Hero
                cName="hero"
                heroImg="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlYXRlciUyMHNlYXRzfGVufDB8fDB8fHww"
                title="Select The Theatre"
                text="Get the ultimate experience"
                url="/"
                buttonText="Travel up"
                btnClass="show"
            />
            <br />

            {/* displayMoiveName */}
            <h1 style={{ textAlign: "center" }}>{movieName}</h1>
      <br />
            <div className="container">
                {loading ? (
                    <p>Loading Theatres...</p>
                ) : (
                    theatreData.length > 0 ? (
                        theatreData.map((movies) => (
                            <TheatreData
                                key={movies.id}
                                movieName={movies.movieName}
                                price={movies.price}
                                theatreName={movies.theatreName}
                                showtime1={movies.firstShow}
                                showtime2={movies.secondShow}
                                showtime3={movies.thirdShow}
                                showtime4={movies.firstShow}
                            />
                        ))
                    ) : (
                        <p>No Theatres found.</p>
                    )
                )}
            </div>

            <br />
            <Footer />
        </>
    );
}

export default Theatre;
