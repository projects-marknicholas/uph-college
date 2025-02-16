import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const PrivacyApproval = () => {
  const navigate = useNavigate(); 

  const handlePrivacyAlert = () => {
    const privacyApproved = localStorage.getItem('privacyApproved');
    if (privacyApproved === 'true') return;

    Swal.fire({
      title: 'Do you approve the privacy statement?',
      html: `By clicking "Approve", you authorize UPH Calamba Campus to collect and process your personal information (e.g., name, address, and photo for documentation) for the scholarship program. All data will be kept secure for five (5) years from the date of collection and will be deleted thereafter, in accordance with Republic Act 10173 (Data Privacy Act of 2012).`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Decline',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('privacyApproved', 'true');
        Swal.fire({
          title: 'Privacy Statement Approved',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else if (result.isDismissed) {
        localStorage.setItem('privacyApproved', 'false');
        navigate('/student');
      }
    });
  };

  useEffect(() => {
    handlePrivacyAlert(); 
  }, []);

  return null;
};

export default PrivacyApproval;
