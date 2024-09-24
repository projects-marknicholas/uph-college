import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addScholarshipType } from '../../../../api/admin';

const PopupScholarshipType = ({ togglePopup, fetchScholarshipTypes  }) => { 
  const [scholarshipType, setScholarshipType] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      scholarship_type: scholarshipType,
      category: category,
      type: type,
      description: description,
      eligibility: eligibility,
    };

    try {
      const result = await addScholarshipType(formData);
      if (result.status === 'success') {
        toast.success('Scholarship type added successfully!');
        fetchScholarshipTypes();
        togglePopup(); 
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-application">
      <button className="close-view" onClick={togglePopup}>Close</button>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pop-overlay">
          <div className="pop-overlay-header">
            <h3>Add Scholarship Type</h3>
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
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="type">
              <span>Type</span><br />
              <input
                type="text"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="description">
              <span>Description</span><br />
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="eligibility">
              <span>Eligibility</span><br />
              <input
                type="text"
                id="eligibility"
                name="eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                autoComplete="off"
              />
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

export default PopupScholarshipType;
