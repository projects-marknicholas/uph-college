import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";

const AdminSettings = () => {
  useEffect(() => {
    document.title = 'Settings - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Settings
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;