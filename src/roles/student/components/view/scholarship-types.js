import React, { useState, useEffect } from 'react';

// Components
import StudentTypesPopup from './student-types-pop';

// Assets
import SearchSvg from '../../../../assets/svg/search.svg';
import ArrowupSvg from '../../../../assets/svg/arrow-up.svg';

// CSS
import '../../../../assets/css/student/scholarship.css';

// Fetch function
import { fetchScholarship } from '../../../../api/student'; 

const StudentScholarshipTypes = () => {
  const [isViewPopup, setViewPopup] = useState(false);
  const [scholarships, setScholarships] = useState([]); // Store scholarship data
  const [filter, setFilter] = useState('internal'); // Default filter

  // Function to handle the view popup
  const handleView = () => {
    setViewPopup(true);
  };

  const closeView = () => {
    setViewPopup(false);
  };

  // Fetch scholarships when the component mounts or filter changes
  useEffect(() => {
    const getScholarships = async () => {
      const response = await fetchScholarship({ filter });
      if (response.status === 'success') {
        setScholarships(response.data); // Set the fetched scholarship data
      } else {
        console.error('Failed to fetch scholarships:', response.message);
      }
    };

    getScholarships();
  }, [filter]); // Re-fetch when the filter changes

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the filter value
  };

  return (
    <>
      <div className="s-scholar-type container">
        <div className="s-filter">
          <div className="search">
            <img src={SearchSvg} alt="Search" />
            <input
              type="search"
              placeholder="Search"
              id="search"
              name="search"
            />
          </div>
          <select onChange={handleFilterChange} value={filter}>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>

        <div className="s-scholar-grid">
          {scholarships.length > 0 ? (
            scholarships.map((scholarship, index) => (
              <div key={index} className="item">
                <h1>{scholarship.scholarship_type}</h1>
                <span>{scholarship.category}</span>

                <div className="s-details">
                  <div className="description">{scholarship.description}</div>
                  <div className="eligibility">{scholarship.eligibility}</div>
                </div>
                <div className="s-apply">
                  <button onClick={handleView}>
                    Apply now <img src={ArrowupSvg} alt="Arrow" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No scholarships available for the selected filter.</p>
          )}
        </div>
      </div>

      {isViewPopup && <StudentTypesPopup close={closeView} />}
    </>
  );
};

export default StudentScholarshipTypes;
