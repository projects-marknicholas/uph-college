import React, { useState, useEffect } from 'react';

// Assets
import SearchSvg from '../../../../assets/svg/search.svg';

// CSS
import '../../../../assets/css/student/scholarship.css';

// Fetch functions
import { fetchScholarship, fetchType } from '../../../../api/student';

// Components
import ViewScholarshipDetails from './view-scholarship-details';

const StudentScholarshipTypes = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filter, setFilter] = useState('internal');
  const [subtypeData, setSubtypeData] = useState({});
  const [loadingSubtypes, setLoadingSubtypes] = useState({});
  const [selectedSubtype, setSelectedSubtype] = useState(null);

  const data = sessionStorage.getItem('user');
  const userData = data ? JSON.parse(data) : null;

  // Fetch scholarships when the component mounts or filter changes
  useEffect(() => {
    const getScholarships = async () => {
      try {
        const response = await fetchScholarship({ filter });
        if (response.status === 'success') {
          setScholarships(response.data);
        } else {
          console.error('Failed to fetch scholarships:', response.message);
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    getScholarships();
  }, [filter]);

  // Fetch and group subtypes by `scholarship_type_id`
  useEffect(() => {
    const fetchAllSubtypes = async () => {
      const initialLoadingState = {};
      scholarships.forEach((scholarship) => {
        initialLoadingState[scholarship.scholarship_type_id] = true;
      });
      setLoadingSubtypes(initialLoadingState);

      // Fetch subtypes for each scholarship type
      for (const scholarship of scholarships) {
        try {
          const response = await fetchType({ stid: scholarship.scholarship_type_id });
          if (response.status === 'success') {
            // Group subtypes by scholarship_type_id
            const filteredSubtypes = response.data.filter(
              (subtype) => subtype.scholarship_type_id === scholarship.scholarship_type_id
            );
            setSubtypeData((prev) => ({
              ...prev,
              [scholarship.scholarship_type_id]: filteredSubtypes,
            }));
          } else {
            console.error(
              `Failed to fetch subtypes for ${scholarship.scholarship_type_id}:`,
              response.message
            );
          }
        } catch (error) {
          console.error(
            `Error fetching subtypes for ${scholarship.scholarship_type_id}:`,
            error
          );
        } finally {
          setLoadingSubtypes((prev) => ({
            ...prev,
            [scholarship.scholarship_type_id]: false,
          }));
        }
      }
    };

    if (scholarships.length > 0) {
      fetchAllSubtypes();
    }
  }, [scholarships]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Open popup with selected subtype details
  const handleSubtypeClick = (subtype) => {
    setSelectedSubtype(subtype);
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedSubtype(null);
  };

  return (
    <div className="s-scholar-type container">
      <div className="s-filter">
        <div className="ad-greetings">
          <h3>Welcome, Student {userData?.first_name}!</h3>
        </div>
        <div className="search">
          <img src={SearchSvg} alt="Search" />
          <input type="search" placeholder="Search" id="search" name="search" />
        </div>
        <select onChange={handleFilterChange} value={filter}>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
      </div>

      <div className="s-scholar-grid">
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <div key={scholarship.scholarship_type_id} className="item">
              <h1>{scholarship.scholarship_type}</h1>
              <span>{scholarship.category}</span>

              <ul>
                {loadingSubtypes[scholarship.scholarship_type_id] ? (
                  <li>Loading...</li>
                ) : subtypeData[scholarship.scholarship_type_id]?.length > 0 ? (
                  subtypeData[scholarship.scholarship_type_id].map((subtype) => (
                    <li
                      key={subtype.type_id}
                      className="link"
                      onClick={() => handleSubtypeClick(subtype)}
                    >
                      {subtype.type}
                    </li>
                  ))
                ) : (
                  <li>No subtypes available.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>No scholarships available for the selected filter.</p>
        )}
      </div>

      {/* Render the popup if a subtype is selected */}
      {selectedSubtype && (
        <ViewScholarshipDetails
          onClose={handleClosePopup}
          scholarship={selectedSubtype}
        />
      )}
    </div>
  );
};

export default StudentScholarshipTypes;
