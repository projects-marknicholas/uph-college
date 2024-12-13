import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableApplications from "./components/tables/application";

const DeanApplications = () => {
  useEffect(() => {
    document.title = 'Applications - Dean';
  }, []);

  return (
    <>
      <div className="main-section">
        <Sidebar active='applications' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Applications
          </div>

          <TableApplications/>
        </div>
      </div>
    </>
  );
};

export default DeanApplications;
