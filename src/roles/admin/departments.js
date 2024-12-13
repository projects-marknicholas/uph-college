import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableDepartment from "./components/tables/department";

const AdminDepartment = () => {

  return (
    <>
      <ValidateUser />
      <div className="main-section">
        <Sidebar active='department' />

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Departments
          </div>

          <TableDepartment/>
        </div>
      </div>
    </>
  );
};

export default AdminDepartment;
