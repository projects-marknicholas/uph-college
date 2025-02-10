import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableScholarship from "./components/tables/scholarship";
import ValidateCoordinator from "../../validations/validate-coordinator";

const CoordinatorScholarship = () => {
  useEffect(() => {
    document.title = 'Scholarship - Adviser';
  }, []);

  return (
    <>
      <ValidateCoordinator/>
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
