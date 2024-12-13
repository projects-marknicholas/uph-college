import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableScholars from "./components/tables/scholars";

const DeanScholars = () => {
  useEffect(() => {
    document.title = 'Referrals - Dean';
  }, []);

  return (
    <>
      <div className="main-section">
        <Sidebar active='applications' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Scholarships
          </div>

          <TableScholars/>
        </div>
      </div>
    </>
  );
};

export default DeanScholars;
