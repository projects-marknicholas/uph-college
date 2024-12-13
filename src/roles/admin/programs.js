import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TablePrograms from "./components/tables/programs";

const AdminPrograms = () => {

  return (
    <>
      <ValidateUser />
      <div className="main-section">
        <Sidebar active='department' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Programs
          </div>

          <TablePrograms/>
        </div>
      </div>
    </>
  );
};

export default AdminPrograms;
