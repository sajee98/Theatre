import axios from "axios";
import { useState } from "react";
import "./AddMovie.css";

function Theatreadd() {
  const [theatreName, setTheatreName] = useState("");
  const [theatreID, setTheatreID] = useState("");
  const [ownerName, setownerName] = useState("");
  const [ownerNIC, setownerNIC] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [decision, setDecision] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTheatrepicture(file); // Update the theatrepicture state with the selected file
    }
  };

  const save = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("theatreName", theatreName);
    formData.append("theatreID", theatreID);
    formData.append("ownerName", ownerName);
    formData.append("ownerNIC", ownerNIC);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("decision", decision);

    try {
      await axios.post("http://127.0.0.1:8000/api/theatreList", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Theatre registered successfully");
      // Reset all state values to their initial values
      setTheatreName("");
      setTheatreID("");
      setownerName("");
      setownerNIC("");
      setEmail("");
      setLocation("");
      setDecision("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <h2>Theatre ADD</h2>
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>register Theatre Details </h2>
          </div>
          <div className="row clearfix">
            <div className="">
              <form onSubmit={save}>
                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-home"></i>
                  </span>
                  <input type="text" placeholder="Theatre Name" onChange={(event) => setTheatreName(event.target.value)} required/>
                </div>

                <div className="input_field">
                  <span>
                    <i aria-hidden="true" className="fa fa-id-card"></i>
                  </span>
                  <input type="text" placeholder="Theatre_ID" onChange={(event) => setTheatreID(event.target.value)} required />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-user"></i>
                  </span>
                  <input type="text"  placeholder="owner Name" value={ownerName} onChange={(event) => {setownerName(event.target.value);}} required />
                </div>
                
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Owner NIC"
                    value={ownerNIC}
                    onChange={(event) => {
                      setownerNIC(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" className="fa fa-map-marker"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="row clearfix">
                  <div className="input_field">
                    <input
                      type="text"
                      hidden
                      name="Decisionpending"
                      placeholder="Decision pending"
                      value={decision}
                      onChange={(event) => {
                        setDecision(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <input className="button" type="submit" value="Register The Theatre" />
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Theatreadd;
