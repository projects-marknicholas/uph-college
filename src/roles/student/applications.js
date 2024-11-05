// Components
import { useEffect } from "react";
import StudentNavbar from "./components/navbar";

const StudentApplications = () => {

  useEffect(() => {
    document.title = 'Applications - Student';
  });

  return(
    <>
      <StudentNavbar/>
    </>
  );
}

export default StudentApplications;