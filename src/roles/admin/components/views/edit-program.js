import React, { useState, useEffect } from 'react';

// Components
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { getDepartment, updateProgram } from '../../../../api/admin';

const EditProgramPopup = ({ onClose, refreshTable, program }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(program?.department_id || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formValues, setFormValues] = useState({
    programCode: program?.program_code || '',
    programName: program?.program_name || '',
  });

  useEffect(() => {
    // Ensure the form values are reset when program changes
    if (program) {
      setFormValues({
        programCode: program.program_code || '',
        programName: program.program_name || '',
      });
      setSelectedDepartment(program.department_id || '');
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Fetch departments when searchQuery or page changes
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartment({ page: 1, searchQuery });

        if (response.status === 'success') {
          setDepartments(response.data); // Ensure proper data structure
        } else {
          setDepartments([]);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartments([]); // Handle errors gracefully
      }
    };

    fetchDepartments();
  }, [searchQuery]);

  // Handle the search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the updated form data
    const updatedProgramData = {
      program_code: formValues.programCode,
      program_name: formValues.programName,
      department_id: selectedDepartment, // Include selected department
    };
    
    try {
      const response = await updateProgram(updatedProgramData, program.program_id); 
      if (response.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          onClose(); 
          refreshTable();
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.error('Error updating program:', error);
      Swal.fire('Error', 'There was an error updating the program.', 'error');
    }
  };

  return (
    <div className="view-application">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pop-overlay">
          <div className="closing">
            <button className="close-view" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="pop-overlay-header">
            <h3>Edit {program.program_code}</h3>
          </div>
          <form className="pop-labels" onSubmit={handleSubmit}>
            <label htmlFor="search_department">
              <span>Search Department</span><br />
              <input
                type="text"
                id="search_department"
                value={searchQuery}
                onChange={handleSearch}
                autoComplete="off"
                placeholder="Search departments..."
              />
            </label><br />
            <label htmlFor="department">
              <span>Department</span><br />
              <select
                id="department_id"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.length > 0 ? (
                  departments.map((department) => (
                    <option key={department.department_id} value={department.department_id}>
                      {department.department_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Departments Found</option>
                )}
              </select>
            </label><br />
            <label htmlFor="program_code">
              <span>Program Code</span><br />
              <input
                type="text"
                id="program_code"
                name="programCode"  
                autoComplete="off"
                value={formValues.programCode}  
                onChange={handleChange}
              />
            </label><br />
            <label htmlFor="program_name">
              <span>Program Name</span><br />
              <input
                type="text"
                id="program_name"
                name="programName"  
                autoComplete="off"
                value={formValues.programName}  
                onChange={handleChange}
              />
            </label><br />
            <button className="btn-sub" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProgramPopup;
