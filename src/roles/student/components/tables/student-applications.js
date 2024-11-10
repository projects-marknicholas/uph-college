import React, { useState } from 'react';

// Components
import StudentApplicationPopup from '../view/student-application-pop';

// Assets
import DeclineSvg from '../../../../assets/svg/decline.svg';
import ViewSvg from '../../../../assets/svg/view.svg';

// CSS
import '../../../../assets/css/student/s-applications.css';

const StudentStudentApplications = () => {
  const [isViewPopup, setViewPopup] = useState(false);
  
  const handleView = () => {
    setViewPopup(true);
  };

  const closeView = () => {
    setViewPopup(false);
  }

  return(
    <>
      <div className='container s-app'>
        <div className="table-holder">
          <div className="table-header">
            <div tabIndex="-1" className="search-bar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="search"
                id="search"
                name="search"
                autoComplete="off"
                placeholder="Search"
              />
            </div>
          </div>
          {/* Table Data */}
          <div className="table-scrolling">
            <table>
              <thead>
                <tr>
                  <th>Applied Scholarship</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Submitted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Co-Curricular</td>
                  <td>Entrance</td>
                  <td>Pending</td>
                  <td>December 08, 2022</td>
                  <td className="action-field">
                    <button className="view" onClick={handleView}>
                      <img src={ViewSvg} alt="View"/> View
                    </button>
                    <button className="decline">
                      <img src={DeclineSvg} alt="Decline"/> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="item">
              <p>Showing (0) result(s)</p>
            </div>
            <div className="item center">
              <button className="load-more">
                Load More
              </button>
            </div>
            <div className="item right">
              <p>Total of (0) result(s)</p>
            </div>
          </div>
        </div>
      </div>
      
      {isViewPopup && 
        <StudentApplicationPopup close={closeView}></StudentApplicationPopup>
      }
    </>
  );
}

export default StudentStudentApplications;