import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {  FaTrash } from "react-icons/fa"; // Added for icons
import './CurrentMovie.css';

function TheatreList() {
  const [theatres, setTheatres] = useState([]); // Store the full list of movies
  const [filteredTheatres, setFilteredTheatres] = useState([]); // Store the filtered list
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
      name: "Owner Name",
      selector: (row) => row.ownerName,
      sortable: true
    },
    {
      name: "Owner NIC",
      selector: (row) => row.ownerNIC,
      sortable: true
    },

    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true
  },

    {
      name: "Actions",
      cell: (row) => (
        <div>
        
          <button 
            onClick={() => handleDelete(row.id)} 
            className="action-button delete-button"
            title="Delete Movie"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    // Initial load of all movies
    Load();
  }, []);

  const Load = async (searchQuery = "1") => {
    setLoading(true);
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/theatreList", {
        params: { decision: searchQuery }
      });
      setTheatres(result.data.data);
      setFilteredTheatres(result.data.data);
    } catch (error) {
      console.error("Error loading Theatres:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/theatreList/${id}`, { decision: "2" });
      setTheatres(theatres.filter(item => item.id !== id));
      setFilteredTheatres(filteredTheatres.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error updating theatre:", error);
    }
  };
  

  

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    Load(query);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Theatre Lists</h1>

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
            data={filteredTheatres} // Use filtered data here
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

export default TheatreList;
