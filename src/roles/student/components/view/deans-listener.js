import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Swal from "sweetalert2";
import DeansListFile from "./form/dl-file";

// API
import { insertDeansListener, fetchTypes } from '../../../../api/student';

const DeansListener = ({ studentTypeId, typeId }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [userId, setUserId] = useState('');
  const [curriculumYears, setCurriculumYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    const savedSubjects = localStorage.getItem('subjects');

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }

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

  // Save formData to localStorage on every change
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Save subjects to localStorage on every change
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

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

  // Add subject inputs
  const handleAddSubject = () => {
    const newSubjects = [
      ...subjects,
      {
        subject_code: "",
        units: "",
        name_of_instructor: "",
        grades: "",
      },
    ];
    setSubjects(newSubjects);
  };

  // Handle subject input changes
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  // Remove subject
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

  // Fetch curriculum years and semesters
  useEffect(() => {
    const fetchData = async () => {
      if (!typeId) return;

      try {
        const response = await fetchTypes({ tid: typeId });

        if (response.status === "success") {
          setCurriculumYears(response.data || []);
          setSemesters(response.data || []);
          if (response.data && response.data.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              academic_year: response.data[0].curriculum_year,
              semester: response.data[0].semester,
            }));
          }
        } else {
          console.error("Failed to fetch curriculum years:", response.message);
        }
      } catch (error) {
        console.error("Error fetching curriculum years:", error);
      }
    };

    fetchData();
  }, [typeId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

    const payload = {
      ...formData,
      subjects: subjects.map(subject => ({
        subject_code: subject.subject_code,
        units: subject.units,
        name_of_instructor: subject.name_of_instructor,
        grade: subject.grades,
      })),
    };

    const response = await insertDeansListener({
      uid: userId,
      stid: studentTypeId,
      tid: typeId,
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
      setSubjects([]);
      setError(null);
      localStorage.removeItem('formData'); // Clear saved form data
      localStorage.removeItem('subjects'); // Clear saved subjects
      navigate('/student/applications');
    } else {
      Swal.fire('Error!', response.message, 'error');
      setMessage(null);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="entrance-application">
        <div className="content">
          <div className="headers">
            <h1>SCHOLARSHIP PROGRAM</h1>
            <h3>DEAN'S LIST APPLICATION FORM</h3>
          </div>

          <div className="inputs">
            <div className="item">
              <span>Semester</span>
              <select
                className="input"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                disabled
              >
                {semesters.length ? (
                  semesters.map((sem) => (
                    <option key={sem.semester} value={sem.semester}>
                      {sem.semester === '1' ? "1st Semester" : sem.semester === '2' ? "2nd Semester" : sem.semester}
                    </option>
                  ))
                ) : (
                  <option disabled>No available semesters</option>
                )}
              </select>
            </div>
            <div className="item">
              <span>Academic Year</span>
              <select 
                className="input"
                id="academic_year"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
                disabled
              > 
                <option disabled>Select Academic Year</option>
                {curriculumYears.map((year, index) => (
                  <option key={index} value={year.curriculum_year}>
                    {year.curriculum_year}
                  </option>
                ))}
              </select>
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
              <select 
                className="input" 
                type="text" 
                name="year_level" 
                value={formData.year_level}
                onChange={handleChange}
              >
                <option value='1'>1st Year</option>
                <option value='2'>2nd Year</option>
                <option value='3'>3rd Year</option>
                <option value='4'>4th Year</option>
              </select>
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

          <div className="items-123-title">
            <h2>Subjects</h2>
            <button type="button" onClick={handleAddSubject}>
              Add Subject
            </button>
          </div>

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
              {subjects.map((subject, index) => (
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
                        handleSubjectChange(
                          index,
                          "name_of_instructor",
                          e.target.value
                        )
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
              ))}
              </tbody>
            </table>
          </div>

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

          <div className="form-actions">
            <button onClick={handleSubmit}>Submit Application</button>&nbsp;
            <button type="button" onClick={() => setIsUploadPopupOpen(true)}>Add attachment</button>
          </div>
        </div>
      </div>

      {isUploadPopupOpen && (
        <DeansListFile 
          studentTypeId={studentTypeId} 
          typeId={typeId} 
          onClose={() => setIsUploadPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default DeansListener;
