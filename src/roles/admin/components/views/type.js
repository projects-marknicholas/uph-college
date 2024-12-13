import React, { useState } from 'react';

// Components
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

// API
import { addType } from "../../../../api/admin"; 

const PopupType = ({ togglePopup, scholarship, fetchScholarshipTypes }) => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddType = async () => {
    if (!type || !description || !eligibility) {
      Swal.fire('Error!', 'All fields are required!', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await addType({
        scholarship_type_id: scholarship.scholarship_type_id, 
        type,
        description,
        eligibility,
      });

      if (response.status === 'success') {
        Swal.fire('Success!', 'Type added successfully!', 'success');
        fetchScholarshipTypes(); // Refresh the list
        togglePopup(); // Close the popup
      } else {
        Swal.fire('Error!', response.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while adding the type.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='view-application'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pop-overlay">
          <div className='closing'>
            <button className="close-view" onClick={togglePopup}>Close</button>
          </div>
          <div className="pop-overlay-header">
            <h3>Add Type to {scholarship.scholarship_type}</h3>
          </div>
          <form className="pop-labels" onSubmit={handleAddType}>
            <label htmlFor="type">
              <span>Type</span><br />
              <input
                type="text"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                autoComplete="off"
                autoFocus
              />
            </label><br />
            <label htmlFor="description">
              <span>Description</span><br />
              <textarea
                id="description"
                name="description"
                rows='5'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="eligibility">
              <span>Eligibility</span><br />
              <textarea
                id="eligibility"
                name="eligibility"
                rows='5'
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <button type="button" className='btn-sub' onClick={handleAddType} disabled={loading}>
              {loading ? 'Adding...' : 'Add Type'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupType;
