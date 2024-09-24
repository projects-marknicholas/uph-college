import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableScholarshipType from "./components/tables/scholarship-type";

const AdminScholarshipTypes = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = 'Scholars - Admin';
  }, []);

  const togglePopup = () => {
    setShowPopup(prev => !prev); // Toggle the state properly
  };

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='scholars'/>
        <div className="setup-sect">
          <Navbar/>
          
          <div className="setup-header">
            Scholarship Types
            <button className="add" onClick={togglePopup}>+ Add</button>
          </div>

          <TableScholarshipType showPopup={showPopup} togglePopup={togglePopup}/>
        </div>
      </div>
    </>
  );
};

export default AdminScholarshipTypes;
