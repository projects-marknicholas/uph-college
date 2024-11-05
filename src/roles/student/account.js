// Components
import { useEffect } from "react";
import StudentNavbar from "./components/navbar";

const StudentAccount = () => {

  useEffect(() => {
    document.title = 'Account Settings - Student';
  });

  return(
    <>
      <StudentNavbar/>
    </>
  );
}

export default StudentAccount;