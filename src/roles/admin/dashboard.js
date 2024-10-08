import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ValidateUser from "../../validations/validate-user";
import TableDashboard from "./components/tables/dashboard";

const AdminDashboard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0 (January) to 11 (December)

  // Determine the current semester based on the month
  const getCurrentSemester = () => {
    if (currentMonth >= 8 && currentMonth <= 11) {
      return '1st'; // September to December
    } else if (currentMonth >= 0 && currentMonth <= 5) {
      return '2nd'; // January to June
    } else {
      return 'Unknown'; // Handle any unexpected cases
    }
  };

  const [year, setYear] = useState(currentYear.toString());
  const [sem, setSem] = useState(getCurrentSemester()); // Set default semester

  useEffect(() => {
    document.title = 'Dashboard - Admin';
  }, []);

  const handleYearSemesterSelect = (selectedYear, selectedSemester) => {
    setYear(selectedYear);
    setSem(selectedSemester);
  };

  return (
    <>
      <ValidateUser />
      <div className="main-section">
        <Sidebar active='dashboard' />

        <div className="setup-sect">
          <Navbar onSelect={handleYearSemesterSelect} />

          <div className="setup-header">
            Dashboard
          </div>

          <TableDashboard year={year} sem={sem} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
