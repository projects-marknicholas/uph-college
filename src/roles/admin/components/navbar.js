import React, {useState, useRef} from "react";

// Assets
import SearchSvg from "../../../assets/svg/search.svg";
import CalendarSvg from "../../../assets/svg/calendar.svg";

// Components
import SearchSpeech from "./speech-recognition";
import ExportButton from "./export-pdf";

// CSS
import '../../../assets/css/navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const exportRef = useRef();

  const data = sessionStorage.getItem('user');
  const userData = data ? JSON.parse(data) : null; 

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
            <input
              type="date"
              id="calendar"
              name="calendar"
            />
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