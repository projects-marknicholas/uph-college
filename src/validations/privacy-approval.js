import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const PrivacyApproval = () => {
  const navigate = useNavigate(); 

  const handlePrivacyAlert = () => {
    // Check if privacy is already approved
    const privacyApproved = localStorage.getItem('privacyApproved');
    
    // If already approved, skip showing the alert
    if (privacyApproved === 'true') {
      return;
    }

    Swal.fire({
      title: 'Do you approve the privacy statement?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Decline',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('privacyApproved', 'true');
        Swal.fire({
          title: 'Privacy Statement Approved',
          text: 'You have approved the privacy statement.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else if (result.isDismissed) {
        localStorage.setItem('privacyApproved', 'false'); 
        navigate('/student'); // Redirect to /student only if declined
      }
    });
  };

  useEffect(() => {
    handlePrivacyAlert(); 
  }, []);

  return null; // No UI is displayed
};

export default PrivacyApproval;
