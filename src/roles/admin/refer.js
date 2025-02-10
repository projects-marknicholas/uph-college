import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableReferrals from "./components/tables/refer";

const AdminRefer = () => {
  useEffect(() => {
    document.title = 'Referrals - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Referrals
          </div>

          <TableReferrals/>
        </div>
      </div>
    </>
  );
}

export default AdminRefer;