import React, {useEffect} from "react";

// Components
import Sidebar from "./components/sidebar";

const AdminLogout = () => {
  useEffect(() => {
    document.title = 'Logout - Admin';
  });

  return(
    <>
      <div className="main-section">
        <Sidebar active='applications'/>

        <div className="setup-sect"></div>
      </div>
    </>
  );
}

export default AdminLogout;