import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom'; 

// Assets
import SearchSvg from "../../../assets/svg/search.svg";
import CalendarSvg from "../../../assets/svg/calendar.svg";

// Components
import SearchSpeech from "./speech-recognition";
import Year from "./year";
import Swal from 'sweetalert2';

// CSS
import '../../../assets/css/navbar.css';

const Navbar = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const exportRef = useRef();

  const data = sessionStorage.getItem('user');
  const userData = data ? JSON.parse(data) : null;

  const location = useLocation(); // Get the current location

  const handleYearSemesterSelect = (year, semester) => {
    Swal.fire('Success!', `You selected ${year}, ${semester} sem`, 'success');
    console.log("Selected Year:", year);
    console.log("Selected Semester:", semester);
    onSelect(year, semester); // Call the onSelect function passed as prop
  };

  return (
    <>
      <nav>
        {/* <div className="search-all">
          <div className="search-bar">
            <img src={SearchSvg} />
            <input
              type="text"
              placeholder="Search"
              id="search-all"
              name="search-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchSpeech
              onResult={(transcript) => setSearchQuery(transcript)}
            />
          </div>
        </div> */}
        <div className="ad-greetings">
          <h3>Welcome, Admin {userData.first_name}!</h3>
        </div>
        <div className="controls">
          {/* Conditionally render Year component only on /admin route */}
          {location.pathname === '/admin' && (
            <div className="calendar">
              <img src={CalendarSvg} />
              <Year onSelect={handleYearSemesterSelect} />
            </div>
          )}
          <div className="profile-pic">
            <img src={userData?.profile || ''} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
