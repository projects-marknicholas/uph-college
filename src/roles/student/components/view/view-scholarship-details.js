import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import StudentTypePopup from './student-types-pop';

const ViewScholarshipDetails = ({ onClose, scholarship }) => {
  const [isApplyPopup, setApplyPopup] = useState(false);
  const navigate = useNavigate();

  // Format dates or return "Closed" if empty
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Closed";
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openApplyPopup = () => {
    setApplyPopup(true);
    navigate(`/student/${scholarship.scholarship_type_id}/${scholarship.type_id}`);
  };

  const closeApplyPopup = () => {
    setApplyPopup(false);
  };

  return (
    <div className="s-pop-bg">
      <div className="s-pop-show">
        <div className="closing">
          <button onClick={onClose} className="close-btn">close</button>
        </div>
        <div className="header">{scholarship.type}</div>
        <div className="s-pop-desc">
          <small>Start: {formatDate(scholarship.start_date)}</small><br />
          <small>End: {formatDate(scholarship.end_date)}</small><br /><br />
          <p dangerouslySetInnerHTML={{ __html: scholarship.description }}></p>
          <p dangerouslySetInnerHTML={{ __html: scholarship.eligibility }}></p>

          {/* Apply Now Button */}
          <button onClick={openApplyPopup} className="apply-btn">
            Apply Now
          </button>
        </div>

        {/* Scholarship Types Popup */}
        {isApplyPopup && (
          <StudentTypePopup
            onClose={onClose}
            scholarship={scholarship}
          />
        )}
      </div>
    </div>
  );
};

export default ViewScholarshipDetails;
