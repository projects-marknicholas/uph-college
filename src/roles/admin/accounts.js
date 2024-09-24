import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableAccountApproval from "./components/tables/accounts-approval";

const AdminAccounts = () => {
  useEffect(() => {
    document.title = 'Accounts - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Account Approval
          </div>

          <TableAccountApproval/>
        </div>
      </div>
    </>
  );
}

export default AdminAccounts;