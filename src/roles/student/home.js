import { useEffect } from "react";

// Components
import StudentNavbar from "./components/navbar";
import StudentScholarshipTypes from "./components/view/scholarship-types";
import ValidateStudent from "../../validations/validate-student";

// CSS
import '../../assets/css/student/student.css';

const StudentHome = () => {

  useEffect(() => {
    document.title = 'Home - Student';
  });

  return(
    <>
      <ValidateStudent/>
      <div className="student-section">
        <div className="container">
          <StudentNavbar/>
          <StudentScholarshipTypes/>
        </div>
      </div>
    </>
  );
}

export default StudentHome;