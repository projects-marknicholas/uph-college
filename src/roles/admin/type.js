import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";

const AdminTypes = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = 'Types - Admin';
  }, []);

  const togglePopup = () => {
    setShowPopup(prev => !prev); 
  };

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='scholars'/>
        <div className="setup-sect">
          <Navbar/>
          
          <div className="setup-header">
            Types of 
            <button className="add" onClick={togglePopup}>+ Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTypes;
