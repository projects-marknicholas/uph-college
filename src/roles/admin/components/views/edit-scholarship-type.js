import React, { useState, useEffect } from 'react';

// Components
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { updateScholarshipType } from '../../../../api/admin';

const PopupEditScholarshipType = ({ togglePopup, fetchScholarshipTypes, data }) => { 
  const [scholarshipType, setScholarshipType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default values when data prop changes
  useEffect(() => {
    if (data) {
      setScholarshipType(data.scholarship_type);
      setCategory(data.category);
      setDescription(data.description);
      setEligibility(data.eligibility);
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      scholarship_type: scholarshipType,
      category: category,
      description: description,
      eligibility: eligibility,
    };

    try {
      const result = await updateScholarshipType(data.scholarship_type_id, formData);
      if (result.status === 'success') {
        Swal.fire('Success!', 'Scholarship type updated successfully!', 'success');
        fetchScholarshipTypes(); 
        togglePopup(); 
      } else {
        Swal.fire('Error!', result.message, 'error');
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
            <button className="close-view" onClick={togglePopup}>Close</button>
          </div>
          <div className="pop-overlay-header">
            <h3>Edit Scholarship Type</h3>
          </div>
          <form className="pop-labels" onSubmit={handleFormSubmit}>
            <label htmlFor="scholarship_type">
              <span>Scholarship type</span><br />
              <input
                type="text"
                id="scholarship_type"
                name="scholarship_type"
                value={scholarshipType}
                onChange={(e) => setScholarshipType(e.target.value)}
                autoComplete="off"
                autoFocus
              />
            </label><br />
            <label htmlFor="category">
              <span>Category</span><br />
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='Internal'>Internal</option>
                <option value='External'>External</option>
              </select>
            </label><br />
            <label htmlFor="description">
              <span>Description</span><br />
              <textarea
                type="text"
                id="description"
                rows="5"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              ></textarea>
            </label><br />
            <label htmlFor="eligibility">
              <span>Qualifications</span><br />
              <textarea
                type="text"
                id="eligibility"
                rows="5"
                name="eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                autoComplete="off"
              ></textarea>
            </label><br />
            <button className="btn-sub" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupEditScholarshipType;
