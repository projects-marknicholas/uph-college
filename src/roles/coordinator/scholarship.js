import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableScholarship from "./components/tables/scholarship";

const CoordinatorScholarship = () => {
  useEffect(() => {
    document.title = 'Scholarship - Adviser';
  }, []);

  return (
    <>
      <div className="main-section">
        <Sidebar active='scholarships' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Scholarships
          </div>

          <TableScholarship/>
        </div>
      </div>
    </>
  );
};

export default CoordinatorScholarship;
