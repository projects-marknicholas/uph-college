import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ProfileSettings from "./components/views/settings";

const DeanSettings = () => {
  useEffect(() => {
    document.title = 'Settings - Adviser';
  }, []);

  return (
    <>
      <div className="main-section">
        <Sidebar active='settings' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Profile Settings
          </div>

          <ProfileSettings/>
        </div>
      </div>
    </>
  );
};

export default DeanSettings;
