import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Swal from "sweetalert2";

// API
import { insertDeansListener, getStudents } from '../../../../api/dean';

const DeansListener = ({ application, onClose }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState(['']);
  const [formData, setFormData] = useState({
    semester: "1",
    academic_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    year_level: "", 
    program: "",
    email_address: "",
    contact_number: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFound, setStudentFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Getting the default user data
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

  // Date applied format
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

  // Add subject inputss
  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        subject_code: "",
        units: "",
        name_of_instructor: "",
        grades: "",
      },
    ]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleRemoveSubject = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will remove the subject.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSubjects = [...subjects];
        updatedSubjects.splice(index, 1);
        setSubjects(updatedSubjects);
        Swal.fire('Removed!', 'The subject has been removed.', 'success');
      }
    });
  };

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

  // Form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
  
    const payload = {
      ...formData,
      subjects: subjects.map(subject => ({
        subject_code: subject.subject_code,
        units: subject.units,
        name_of_instructor: subject.name_of_instructor,
        grade: subject.grades, 
      })),
    };
  
    // Call the insert function and pass the necessary data
    const response = await insertDeansListener({
      rid: userId,
      uid: formData.user_id,
      stid: application.scholarship_type_id,
      tid: application.type_id,
      formData: payload,
    });
  
    if (response.status === "success") {
      Swal.fire('Success!', response.message, 'success');
      setFormData({
        semester: "",
        academic_year: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        year_level: "1", 
        program: "",
        email_address: "",
        contact_number: "",
      });
      setSubjects([]); // Clear subjects
      setError(null);
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
            <h3>DEAN'S LIST APPLICATION FORM</h3>
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
                name="last_name" 
                value={formData.last_name}
                onChange={handleChange}
                disabled
                readOnly
              />
            </div>
            <div className="item">
              <span>Suffix</span>
              <input 
                className="input" 
                type="text" 
                name="suffix" 
                value={formData.suffix}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <span>Year Level</span>
              <input 
                className="input" 
                type="text" 
                name="year_level" 
                value={formData.year_level}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <span>Course</span>
              <input 
                className="input" 
                type="text" 
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
                name="contact_number" 
                value={formData.contact_number}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <span>Date Applied</span>
              <div 
                className="input">{currentDate}</div>
            </div>
          </div>
        )}

        {studentFound && (
          <div className="items-123-title">
            <h2>Subjects</h2>
            <button type="button" onClick={handleAddSubject}>
              Add Subject
            </button>
          </div>
        )}

        {studentFound && (
          <div className="subjects">
            <table>
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Units</th>
                  <th>Name of Instructor</th>
                  <th>Grades</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="input"
                          type="text"
                          value={subject.subject_code}
                          onChange={(e) =>
                            handleSubjectChange(index, "subject_code", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          type="number"
                          value={subject.units}
                          onChange={(e) =>
                            handleSubjectChange(index, "units", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          type="text"
                          value={subject.name_of_instructor}
                          onChange={(e) =>
                            handleSubjectChange(index, "name_of_instructor", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="input"
                          type="text"
                          value={subject.grades}
                          onChange={(e) =>
                            handleSubjectChange(index, "grades", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveSubject(index)}
                        >
                          Remove Subject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>No subjects available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {studentFound && (
          <div className="privacy">
            <input 
              type="checkbox" 
              name="privacy_agreement"
              checked={isChecked}
              onChange={handleCheckboxChange}
             /> 
            <span>
              By signing this <b>dean's list application form</b>, you hereby
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
        )}

        {studentFound && (
          <div className="form-actions">
            <button onClick={handleSubmit}>Submit Application</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default DeansListener;
