import React, { useState, useEffect } from 'react';

// Components
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// API
import { updateType } from '../../../../api/admin';

const PopupEditType = ({ togglePopup, scholarship, selectedType, fetchScholarshipTypes }) => {
  const [archive, setArchive] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default values when scholarship prop changes
  useEffect(() => {
    if (selectedType) {
      setArchive(selectedType.archive); 
      setType(selectedType.type);
      setDescription(selectedType.description);
      setEligibility(selectedType.eligibility);
    }
  }, [selectedType]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      archive,
      type,
      description,
      eligibility,
    };

    try {
      const result = await updateType(selectedType.type_id, formData);
      if (result.status === 'success') {
        Swal.fire('Success!', 'Type updated successfully!', 'success');
        fetchScholarshipTypes();
        togglePopup(); 
      } else {
        Swal.fire('Error!', result.message || 'Failed to update type.', 'error');
      }
    } catch (err) {
      Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
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
            <h3>Edit for {selectedType.type}</h3>
          </div>
          <form className="pop-labels" onSubmit={handleFormSubmit}>
            <label htmlFor="archive">
              <span>Archive</span><br />
              <select
                id="archive"
                value={archive}
                onChange={(e) => setArchive(e.target.value)}
                autoComplete="off"
                autoFocus
              >
                <option value="">Show</option>
                <option value="hide">Hide</option>
              </select>
            </label><br />
            <label htmlFor="type">
              <span>Type</span><br />
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="description">
              <span>Description</span><br />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                autoComplete="off"
              ></textarea>
            </label><br />
            <label htmlFor="eligibility">
              <span>Eligibility</span><br />
              <textarea
                id="eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                rows="5"
                autoComplete="off"
              ></textarea>
            </label><br />
            <button className="btn-sub" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update changes'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupEditType;
