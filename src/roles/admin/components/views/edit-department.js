import React, { useState, useEffect } from 'react';

// Components
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { updateDepartment } from '../../../../api/admin';

const EditDepartmentPopup = ({ onClose, refreshTable, department }) => {

  const [formValues, setFormValues] = useState({
    departmentCode: department?.department_code || '',
    departmentName: department?.department_name || '',
  });

  useEffect(() => {
    // Ensure the form values are reset when department changes
    if (department) {
      setFormValues({
        departmentCode: department.department_code || '',
        departmentName: department.department_name || '',
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the updated form data
    const updatedDepartmentData = {
      department_code: formValues.departmentCode,
      department_name: formValues.departmentName,
    };
    
    try {
      const response = await updateDepartment(updatedDepartmentData, department.department_id); 
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
      console.error('Error updating department:', error);
      Swal.fire('Error', 'There was an error updating the department.', 'error');
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
            <h3>Edit {department.department_code}</h3>
          </div>
          <form className="pop-labels" onSubmit={handleSubmit}>
            <label htmlFor="department_code">
              <span>Department Code</span><br />
              <input
                type="text"
                id="department_code"
                name="departmentCode"  
                autoComplete="off"
                value={formValues.departmentCode}  
                onChange={handleChange}
              />
            </label><br />
            <label htmlFor="department_name">
              <span>Department Name</span><br />
              <input
                type="text"
                id="department_name"
                name="departmentName"  
                autoComplete="off"
                value={formValues.departmentName}  
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

export default EditDepartmentPopup;
