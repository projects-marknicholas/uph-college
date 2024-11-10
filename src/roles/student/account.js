import { useEffect } from "react";

// Components
import StudentNavbar from "./components/navbar";
import StudentStudentAccount from "./components/view/account";

const StudentAccount = () => {

  useEffect(() => {
    document.title = 'Account Settings - Student';
  });

  return(
    <>
      <div className="student-section">
        <div className="container">
          <StudentNavbar/>
          <StudentStudentAccount/>
        </div>
      </div>
    </>
  );
}

export default StudentAccount;