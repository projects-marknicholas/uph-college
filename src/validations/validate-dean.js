import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ValidateDean = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    if (user) {
      const { first_name, middle_name, last_name, role, department, program } = user;
      
      if (!first_name || !middle_name || !last_name || !role || !department || !program) {
        Swal.fire({
          title: "Update Required",
          text: "You need to update your account before proceeding.",
          icon: "warning",
          confirmButtonText: "Update Now"
        }).then(() => {
          navigate("/dean/settings");
        });
      }
    }
  }, [navigate]);

  return null; 
};

export default ValidateDean;
