import React, {useEffect} from "react";
import { Link } from "react-router-dom";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";

// CSS
import '../../assets/css/settings.css';

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

          <div className="settings-choices">
            <Link to='/admin/scholarship-type' className="settings-item">
              Scholarship Types
            </Link>
            <Link to='/admin/programs' className="settings-item">
              Programs
            </Link>
            <Link to='/admin/departments' className="settings-item">
              Departments
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;