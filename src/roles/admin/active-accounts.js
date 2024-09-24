import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableActiveAccounts from "./components/tables/active-accounts";

const AdminActiveAccounts = () => {
  useEffect(() => {
    document.title = 'Active Accounts - Admin';
  });

  return(
    <>
      <ValidateUser/>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect">
          <Navbar/>

          <div className="setup-header">
            Active Accounts
          </div>

          <TableActiveAccounts/>
        </div>
      </div>
    </>
  );
}

export default AdminActiveAccounts;