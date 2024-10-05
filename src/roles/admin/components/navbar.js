import React, {useState, useRef} from "react";

// Assets
import SearchSvg from "../../../assets/svg/search.svg";
import CalendarSvg from "../../../assets/svg/calendar.svg";

// Components
import SearchSpeech from "./speech-recognition";
import ExportButton from "./export-pdf";
import Year from "./year";
import Swal from 'sweetalert2';

// CSS
import '../../../assets/css/navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const exportRef = useRef();

  const data = sessionStorage.getItem('user');
  const userData = data ? JSON.parse(data) : null; 

  const handleYearSemesterSelect = (year, semester) => {
    Swal.fire('Success!', `You selected ${year}, ${semester} sem`, 'success');
    console.log("Selected Year:", year);
    console.log("Selected Semester:", semester);
  };

  return(
    <>
      <nav>
        <div className="search-all">
          <div className="search-bar">
            <img src={SearchSvg}/>
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
        </div>
        <div className="controls">
          <div className="calendar">
            <img src={CalendarSvg}/>
            <Year onSelect={handleYearSemesterSelect}/>
          </div>
          <ExportButton targetRef={exportRef}/>
          <div className="profile-pic">
            <img src={userData?.profile || ''}/>
          </div>
        </div>
      </nav>

      {/* PDF */}
      {/* <div ref={exportRef}></div> */}
    </>
  );
}

export default Navbar;