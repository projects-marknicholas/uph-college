import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableScholars from "./components/tables/scholars";

const AdminScholars = () => {
  useEffect(() => {
    document.title = 'Scholars - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='scholars'/>

        <div className="setup-sect">
          <Navbar/>
          
          <div className="setup-header">
            Scholars
          </div>

          <TableScholars/>
        </div>
      </div>
    </>
  );
}

export default AdminScholars;