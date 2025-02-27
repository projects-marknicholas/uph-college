import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

const CoordinatorDashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Coordinator';
  }, []);

  return (
    <>
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

export default CoordinatorDashboard;
