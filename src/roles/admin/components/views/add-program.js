import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { getDepartment, addProgram } from '../../../../api/admin';

const AddProgramPopup = ({ onClose, refreshTable }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [programCode, setProgramCode] = useState('');
  const [programName, setProgramName] = useState('');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartment({ page, searchQuery });

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
  }, [page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page when a new search is initiated
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!selectedDepartment || !programCode || !programName) {
      Swal.fire('Error!', 'Please fill all fields!', 'error');
      return;
    }

    try {
      const programData = {
        department_id: selectedDepartment,
        program_code: programCode,
        program_name: programName,
      };

      // Make the API call to add the program
      const response = await addProgram(programData);

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
      console.error('Error adding program:', error);
      Swal.fire('Error!', 'Something went wrong!', 'error');
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
            <h3>Add New Program</h3>
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
                value={programCode}
                onChange={(e) => setProgramCode(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="program_name">
              <span>Program Name</span><br />
              <input
                type="text"
                id="program_name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <button className="btn-sub" type="submit">
              Add
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProgramPopup;
