import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TableReferrals from "./components/tables/referral";

const DeanReferral = () => {
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
            You Referred
          </div>

          <TableReferrals/>
        </div>
      </div>
    </>
  );
};

export default DeanReferral;
