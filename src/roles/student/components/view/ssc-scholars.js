import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Swal from "sweetalert2";

// API
import { insertFormAttachment } from '../../../../api/student';

const SSCScholars = ({ studentTypeId, typeId }) => {
  const navigate = useNavigate();
  const [attachment, setAttachment] = useState(null);
  const [userId, setUserId] = useState(['']);
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire("Warning!", "You must agree to the terms and conditions.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append('attachment', attachment);

    setIsSubmitting(true);

    try {
      const response = await insertFormAttachment({
        uid: userId,
        stid: studentTypeId,
        tid: typeId,
        formData,
      });

      if (response.status === 'success') {
        Swal.fire('Success!', response.message, 'success');
        navigate('/student/applications');
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
      <div className="entrance-application">
        <div className="content">
          <div className="headers">
            <h1>SCHOLARSHIP PROGRAM</h1>
            <h3>SSC SCHOLARS APPLICATION FORM</h3>
          </div>

          <div className="inputs">
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
              By signing this <b>ssc scholars application form</b>, you hereby
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

export default SSCScholars;
