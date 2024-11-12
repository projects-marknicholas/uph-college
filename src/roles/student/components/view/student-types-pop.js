import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 
// CSS
import '../../../../assets/css/student/s-applications.css';

// API
import { fetchType } from '../../../../api/student';

const StudentTypePopup = ({ close, scholarship }) => {
  const [studentTypeData, setStudentTypeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentTypeData = async () => {
      setLoading(true);
      const response = await fetchType({ stid: scholarship.scholarship_type_id });
      if (response.status === 'success') {
        setStudentTypeData(response.data); // Set all fetched data
      } else {
        console.error('Failed to fetch student type data:', response.message);
      }
      setLoading(false);
    };

    if (scholarship?.scholarship_type_id) {
      fetchStudentTypeData();
    }
  }, [scholarship]);

  return (
    <div className="s-pop-bg">
      <button className='close' onClick={close}>Close</button>
      <div className="s-pop-show">
        <div className='header'>{scholarship.scholarship_type}'s Types</div>
        <div className='type-list'>
          {loading ? (
            <p>Loading...</p>
          ) : studentTypeData.length > 0 ? (
            studentTypeData.map((item) => (
              <Link 
                to={`/student/${scholarship.scholarship_type_id}/${item.type_id}`}
                key={item.id}
              >
                {item.type}
              </Link>
            ))
          ) : (
            <p>No data available for this form type.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentTypePopup;
