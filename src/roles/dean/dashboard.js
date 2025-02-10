import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateDean from "../../validations/validate-dean";

const DeanDashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Dean';
  }, []);

  return (
    <>
      <ValidateDean/>
      <div className="main-section">
        <Sidebar active='dashboard' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Dashboard
          </div>
        </div>
      </div>
    </>
  );
};

export default DeanDashboard;
