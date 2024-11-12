import React, { useState, useEffect } from "react";

// Components
import Swal from "sweetalert2";

// API
import { insertEntranceApplication } from '../../../../api/student';

// Assets
import Logo from "../../../../assets/img/logo.png";
import ISO from "../../../../assets/img/iso.png";

const EntranceApplication = ({ studentTypeId, typeId }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState(['']);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    academic_year: "",
    year_level: "",
    semester: "1", 
    program: "",
    email_address: "",
    contact_number: "",
    honors_received: "",
    general_weighted_average: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.error("User not found in session storage");
      return;
    }

    const userData = JSON.parse(user);
    setUserId(userData.user_id || '');
  }, []);

  useEffect(() => {
    const formatDate = () => {
      const date = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setCurrentDate(date.toLocaleString("en-US", options));
    };

    formatDate();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the insert function and pass the necessary data
    const response = await insertEntranceApplication({
      uid: userId,
      stid: studentTypeId,
      tid: typeId,
      formData,
    });

    if (response.status === "success") {
      Swal.fire('Success!', response.message, 'success');
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        academic_year: "",
        year_level: "",
        semester: "1", 
        program: "",
        email_address: "",
        contact_number: "",
        honors_received: "",
        general_weighted_average: "",
      });
      setError(null);
    } else {
      Swal.fire('Error!', response.message, 'error');
      setMessage(null);
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="entrance-application">
          <div className="ea-header">
            <img className="logo" src={Logo} alt="Logo" />
            <img className="iso" src={ISO} alt="ISO" />
          </div>
          <div className="content">
            <div className="serials">
              <h5>UPHSDCC-<span>SAS-EGA-01</span></h5>
              <h5>07-15-2024-01</h5>
            </div>

            <div className="headers">
              <h1>SCHOLARSHIP PROGRAM</h1>
              <h3>ENTRANCE GRANT APPLICATION FORM</h3>
              <p>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                </select>
                semester
              </p>
              <p>
                Academic Year
                <input
                  type="number"
                  id="academic_year"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                />
              </p>
            </div>

            <div className="entrance-info">
              <div className="item">
                First Name:
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Middle Name:
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Last Name:
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Course:
                <input
                  type="text"
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                E-mail Address:
                <input
                  type="text"
                  id="email_address"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Contact Number:
                <input
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Honors Received:
                <input
                  type="text"
                  id="honors_received"
                  name="honors_received"
                  value={formData.honors_received}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                General Weighted Average (GWA):
                <input
                  type="text"
                  id="general_weighted_average"
                  name="general_weighted_average"
                  value={formData.general_weighted_average}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                Date Applied: {currentDate}
              </div>
            </div>

            <div className="privacy">
              "By signing this <b>entrance grant application form</b> you hereby allow / authorize UPH Calamba
              Campus and their authorized personnel to gather and process your personal information (name,
              address, and picture if applicable for documentation use) <b>specifically for scholarship program</b>.
              All information gathered on the said activity will be kept secured and confidential for a period of
              five (5) years from the collection date and will be destroyed by means of shredding and/or file deletion
              after the prescribed retention period in accordance with Republic Act 10173 of the Data Privacy Act of 2012
              of the Republic of the Philippines."
            </div>

            <div className="form-actions">
              <button onClick={handleSubmit}>Submit Application</button>
            </div>

            {error && <div className="error">{error}</div>}
            {message && <div className="message">{message}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntranceApplication;
