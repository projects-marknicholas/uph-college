import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='dashboard'/>

        <div className="setup-sect">
          <Navbar/>
          
          <div className="setup-header">
            Dashboard
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;