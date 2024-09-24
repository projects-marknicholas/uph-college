import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableApplications from "./components/tables/applications";

const AdminApplications = () => {
  useEffect(() => {
    document.title = 'Applications - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Applications
          </div>

          <TableApplications/>
        </div>
      </div>
    </>
  );
}

export default AdminApplications;