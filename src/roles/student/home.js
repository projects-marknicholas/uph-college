// Components
import { useEffect } from "react";
import StudentNavbar from "./components/navbar";

const StudentHome = () => {

  useEffect(() => {
    document.title = 'Home - Student';
  });

  return(
    <>
      <StudentNavbar/>
    </>
  );
}

export default StudentHome;