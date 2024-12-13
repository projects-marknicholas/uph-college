import React, { useState, useEffect } from 'react';

// Components
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { addDepartment } from '../../../../api/admin';

const AddDepartmentPopup = ({ onClose, refreshTable }) => {
  const [departmentCode, setDepartmentCode] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      department_code: departmentCode,
      department_name: departmentName,
    };

    try {
      const result = await addDepartment(formData);
      if (result.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          onClose(); 
          refreshTable();
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (err) {
      Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
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
          <div className='closing'>
            <button className="close-view" onClick={onClose}>Close</button>
          </div>
          <div className="pop-overlay-header">
            <h3>Add New Department</h3>
          </div>
          <form className="pop-labels" onSubmit={handleFormSubmit}>
            <label htmlFor="department_code">
              <span>Department Code</span><br />
              <input
                type="text"
                id="department_code"
                value={departmentCode}
                onChange={(e) => setDepartmentCode(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="department_name">
              <span>Department Name</span><br />
              <input
                type="text"
                id="department_name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <button className="btn-sub" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddDepartmentPopup;
