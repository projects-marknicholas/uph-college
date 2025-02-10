import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Swal from "sweetalert2";

// API
import { insertEntranceApplication, getStudents } from '../../../../api/dean';

const EntranceApplication = ({ application, onClose }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    academic_year: "",
    year_level: "",
    semester: 1,
    program: "",
    email_address: "",
    contact_number: "",
    honors_received: "",
    general_weighted_average: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFound, setStudentFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Fetch user data from session storage
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.error("User not found in session storage");
      return;
    }

    const userData = JSON.parse(user);
    setUserId(userData.user_id || '');

    setFormData((prevFormData) => ({
      ...prevFormData,
      email_address: userData.email || "",
      first_name: userData.first_name || "",
      middle_name: userData.middle_name || "",
      last_name: userData.last_name || "",
      department: userData.department || "",
      program: userData.program || "",
    }));
  }, []);

  // Set current date and time
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setStudentFound(false);
    setError(null);

    if (!searchQuery) {
      Swal.fire("Warning!", "Please enter a student number, name, or email address to search.", "warning");
      return;
    }

    try {
      const user = sessionStorage.getItem('user');
      const userData = JSON.parse(user);
      const response = await getStudents({
        program: userData.program,
        department: userData.department,
        search: searchQuery,
        page: 1,
      });

      if (response.status === "success" && response.data.length > 0) {
        const student = response.data[0];
        setFormData({
          ...formData,
          user_id: student.user_id,
          first_name: student.first_name,
          middle_name: student.middle_name,
          last_name: student.last_name,
          program: student.program,
          email_address: student.email,
          contact_number: student.contact_number || '',
        });
        setStudentFound(true);
      } else {
        Swal.fire("Error!", "Student not found.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "An error occurred while searching for the student.", "error");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire("Warning!", "You must agree to the terms and conditions.", "warning");
      return;
    }

    setIsSubmitting(true);

    // Call the insert function and pass the necessary data
    const response = await insertEntranceApplication({
      rid: userId,
      uid: formData.user_id,
      stid: application.scholarship_type_id,
      tid: application.type_id,
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
        semester: 1,
        program: "",
        email_address: "",
        contact_number: "",
        honors_received: "",
        general_weighted_average: "",
      });
      setError(null);
      setIsSubmitting(false);
      navigate('/dean/referral');
    } else {
      Swal.fire('Error!', response.message, 'error');
      setMessage(null);
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
            <h3>ENTRANCE GRANT APPLICATION FORM</h3>
          </div>

          {!studentFound && (
            <div className="search-section">
              <input
                type="text"
                placeholder="Enter student number, name, or email"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button onClick={handleSearchSubmit}>Search</button>
            </div>
          )}

          {studentFound && (
            <div className="inputs">
              <div className="item">
                <span>Semester</span>
                <select
                  className="input"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                </select>
              </div>
              <div className="item">
                <span>Academic Year</span>
                <input
                  className="input"
                  type="number"
                  id="academic_year"
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <span>First Name</span>
                <input
                  className="input"
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </div>
              <div className="item">
                <span>Middle Name</span>
                <input
                  className="input"
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </div>
              <div className="item">
                <span>Last Name</span>
                <input
                  className="input"
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </div>
              <div className="item">
                <span>Course</span>
                <input
                  className="input"
                  type="text"
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </div>
              <div className="item">
                <span>E-mail Address</span>
                <input
                  className="input"
                  type="text"
                  id="email_address"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleChange}
                  disabled
                  readOnly
                />
              </div>
              <div className="item">
                <span>Contact Number</span>
                <input
                  className="input"
                  type="text"
                  id="contact_number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <span>Honors Received</span>
                <input
                  className="input"
                  type="text"
                  id="honors_received"
                  name="honors_received"
                  value={formData.honors_received}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <span>General Weighted Average (GWA)</span>
                <input
                  className="input"
                  type="text"
                  id="general_weighted_average"
                  name="general_weighted_average"
                  value={formData.general_weighted_average}
                  onChange={handleChange}
                />
              </div>
              <div className="item">
                <span>Date Applied</span>
                <div className="input">{currentDate}</div>
              </div>
            </div>
          )}

          {studentFound && (
            <>
              <div className="privacy">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span>
                  "By signing this <b>entrance grant application form</b> you  hereby allow / authorize UPH Calamba
                  Campus and their authorized personnel to gather and process your personal information (name, 
                  address, and picture if applicable for documentation use) <b>specifically for scholarship program</b>
                  . All information gathered on the said activity will be kept secured and confidential for a period of
                  five (5) years from the collection date and will be destroyed by means of shredding and/or file deletion
                  after the prescribed retention period in accordance with Republic Act 10173 of the Data Privacy Act of 2012
                  of the Republic of the Philippines."
                </span>
              </div>
              <div className="form-actions">
                <button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntranceApplication;
