import React, { useState, useEffect } from "react";

// Components
import Swal from "sweetalert2";

// API
import { insertFormAttachment } from '../../../../api/adviser';

const CollegeCouncilPresident = ({ application, onClose }) => {
  const [attachment, setAttachment] = useState(null);
  const [studentNumber, setStudentNumber] = useState(''); 
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.error("User not found in session storage");
      return;
    }

    const userData = JSON.parse(user);
    setUserId(userData.user_id || '');
  }, []);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleStudentNumberChange = (e) => {
    setStudentNumber(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire("Warning!", "You must agree to the terms and conditions.", "warning");
      return;
    }

    if (!studentNumber.trim()) {
      Swal.fire("Warning!", "Please enter your student number.", "warning");
      return;
    }

    if (!attachment) {
      Swal.fire("Warning!", "Please attach a valid document.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append('attachment', attachment);

    setIsSubmitting(true);

    try {
      const response = await insertFormAttachment({
        rid: userId,
        sn: studentNumber, 
        stid: application.scholarship_type_id,
        tid: application.type_id,
        formData,
      });

      if (response.status === 'success') {
        Swal.fire('Success!', response.message, 'success');
        onClose();
      } else {
        Swal.fire('Error!', response.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className='closing'>
        <button className="close-view" onClick={onClose}>Close</button>
      </div>
      <div className="entrance-application">
        <div className="content">
          <div className="headers">
            <h1>SCHOLARSHIP PROGRAM</h1>
            <h3>COLLEGE COUNCIL PRESIDENT APPLICATION FORM</h3>
          </div>

          <div className="inputs">
            <div className="item">
              <span>Student Number</span>
              <input
                className="input"
                type="text"
                id="student_number"
                name="student_number"
                value={studentNumber} 
                onChange={handleStudentNumberChange}
              />
            </div>
            <div className="item">
              <span>Attachment</span>
              <input
                className="input"
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleAttachmentChange}
                accept=".pdf"
              />
            </div>
          </div>

          <div className="privacy">
            <input 
              type="checkbox" 
              name="privacy_agreement"
              checked={isChecked}
              onChange={handleCheckboxChange}
            /> 
            <span>
              By signing this <b>college council president application form</b>, you hereby
              allow/authorize UPH Calamba Campus and their authorized personnel
              to gather and process your personal information (name, address,
              and picture if applicable for documentation use){" "}
              <b>specifically for the scholarship program</b>. All information
              gathered on the said activity will be kept secured and
              confidential for a period of five (5) years from the collection
              date and will be destroyed by means of shredding and/or file
              deletion after the prescribed retention period in accordance with
              Republic Act 10173 of the Data Privacy Act of 2012 of the
              Republic of the Philippines.
            </span>
          </div>

          <div className="form-actions">
            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCouncilPresident;
