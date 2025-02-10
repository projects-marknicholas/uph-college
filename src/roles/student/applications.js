import { useEffect, useState } from "react";

// Components
import StudentNavbar from "./components/navbar";
import StudentStudentApplications from "./components/tables/student-applications";
import ValidateStudent from "../../validations/validate-student";

const StudentApplications = () => {

  useEffect(() => {
    document.title = 'Applications - Student';
  });

  return(
    <>
      <ValidateStudent/>
      <div className="student-section">
        <div className="container">
          <StudentNavbar/>
          <StudentStudentApplications/>
        </div>
      </div>
    </>
  );
}

export default StudentApplications;