import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaCheckCircle, FaTrash } from "react-icons/fa"; // Added for icons
import './CurrentMovie.css';

function DeletedMovies() {
  const [movie, setMovieList] = useState([]); // Store the full list of movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Store the filtered list
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      cell: (row) => <span>{row.id}</span>
    },
    {
      name: "Theatre Name",
      selector: (row) => row.theatreName,
      sortable: true
    },
    {
      name: "Movie Name",
      selector: (row) => row.movieName,
      sortable: true
    },
    {
      name: "Movie Name",
      selector: (row) => (
        <img
          src={`http://localhost:8000/storage/${row.moviePoster}`}
          alt={row.name}
          className="movie-img"
        />
      ),
      sortable: false
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      sortable: true
    },
    {
      name: "Publish Date",
      selector: (row) => row.publishDate,
      sortable: true
    },
    {
      name: "Show Times",
      selector: (row) => (
        <div>
          {row.showtime1 && <div>{row.showtime1}</div>}
          {row.showtime2 && <div>{row.showtime2}</div>}
          {row.showtime3 && <div>{row.showtime3}</div>}
          {row.showtime4 && <div>{row.showtime4}</div>}
        </div>
      ),
      sortable: false
    },

  ];

  useEffect(() => {
    // Initial load of all movies
    Load();
  }, []);

  const Load = async (searchQuery = "3") => {
    setLoading(true);
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/deletedMovie", {
        params: { decision: searchQuery }
      });
      setMovieList(result.data.data);
      setFilteredMovies(result.data.data);
    } catch (error) {
      console.error("Error loading movies:", error);
    }
    setLoading(false);
  };




  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    Load(query);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Deleted Movie List</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading-message">Loading movies...</div>
      ) : (
        <div className="table-container">
          <DataTable 
            columns={columns}
            data={filteredMovies} // Use filtered data here
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent={<div>No Movies Available</div>}
          />
        </div>
      )}
    </div>
  );
}

export default DeletedMovies;
