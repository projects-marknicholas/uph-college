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
  const [startDate, setStartDate] = useState('');
  const [curriculumYear, setCurriculumYear] = useState('');
  const [semester, setSemester] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default values when scholarship prop changes
  useEffect(() => {
    if (selectedType) {
      setArchive(selectedType.archive); 
      setType(selectedType.type);
      setDescription(selectedType.description);
      setEligibility(selectedType.eligibility);
      setStartDate(selectedType.start_date);  
      setEndDate(selectedType.end_date); 
      setCurriculumYear(selectedType.curriculum_year || '');
      setSemester(selectedType.semester || '');
    }
  }, [selectedType]);

  // const formatDate = (date) => {
  //   if (!date) return '';
  //   const d = new Date(date);
  //   return d.toISOString().split('T')[0];
  // };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      archive,
      type,
      description,
      eligibility,
      start_date: startDate,
      curriculum_year: curriculumYear,
      semester: semester,
      end_date: endDate
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
              <span>Qualifications</span><br />
              <textarea
                id="eligibility"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                rows="5"
                autoComplete="off"
              ></textarea>
            </label><br />
            <label htmlFor="start_date">
              <span>Start Date {startDate}</span><br />
              <input
                type="date"
                id="start_date"
                onChange={(e) => setStartDate(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="end_date">
              <span>End Date {endDate}</span><br />
              <input
                type="date"
                id="end_date"
                onChange={(e) => setEndDate(e.target.value)}
                autoComplete="off"
              />
            </label><br />
            <label htmlFor="curriculum_year">
              <span>Curriculum Year</span><br />
              <select
                id="curriculum_year"
                autoComplete="off"
                value={curriculumYear}
                onChange={(event) => {
                  const selectedYear = parseInt(event.target.value, 10);
                  setCurriculumYear(`${selectedYear}-${selectedYear + 1}`);
                }}
              >
                <option value="" disabled>
                  Select a year
                </option>
                {Array.from({ length: 20 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  const formattedYear = `${year}-${year + 1}`; 
                  return (
                    <option key={year} value={formattedYear}>
                      {formattedYear}
                    </option>
                  );
                })}
              </select>
            </label><br />
            <label htmlFor="semester">
              <span>Semester</span><br />
              <select
                id="semester"
                autoComplete="off"
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
              >
                <option value="" disabled>Select a semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
              </select>
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
