import React, { useState, useEffect } from 'react';

// Components
import ViewApplication from '../views/application';
import Swal from 'sweetalert2';

// Assets
import ViewSvg from '../../../../assets/svg/view.svg';
import AcceptSvg from '../../../../assets/svg/accept.svg';
import DeclineSvg from '../../../../assets/svg/decline.svg';

// CSS
import '../../../../assets/css/student/s-applications.css';

// API
import { getApplications, updateApplication } from '../../../../api/dean';

const TableApplications = () => {
  const [isViewPopup, setViewPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleView = (application) => {
    setSelectedApplication(application);
    setViewPopup(true);
  };

  const closeView = () => {
    setViewPopup(false);
    setSelectedApplication(null);
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.error("User not found in session storage");
      return;
    }

    const userData = JSON.parse(user);
    if (userData && userData.user_id) {
      setUserId(userData.user_id);
    } else {
      console.error("Invalid user data or user_id missing");
    }
  }, []);

  const fetchData = async (searchQuery, page) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getApplications({
        uid: userId,
        searchQuery,
        page,
      });

      if (result.status === 'success') {
        setData(prevData => page === 1 ? result.data : [...prevData, ...result.data]);
        setHasMore(result.data.length >= 50);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      fetchData(searchQuery, page);
    }
  }, [page, searchQuery, userId]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleUpdateApplication = async (applicationId, newStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${newStatus} this application.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateApplication(applicationId, newStatus);
  
        if (response.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
          });
          // Refresh the data
          setPage(1);
          setHasMore(true);
          fetchData(searchQuery, 1);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message,
          });
        }
      }
    });
  };  

  return (
    <>
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
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Student Number</th>
                <th>Student Name</th>
                <th>Applied Scholarship</th>
                <th>Type</th>
                <th>Status</th>
                <th>Referred by</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((application, index) => (
                  <tr key={index}>
                    <td>{application.student_number}</td>
                    <td>{application.first_name} {application.middle_name} {application.last_name}</td>
                    <td>{application.scholarship_type}</td>
                    <td>{application.type}</td>
                    <td>{application.status}</td>
                    <td>{application.referral_name}</td>
                    <td>{application.created_at}</td>
                    <td className="action-field">
                      <button className="accept" onClick={() => handleUpdateApplication(application.application_id, 'approved')}>
                        <img src={AcceptSvg} alt="Approve" /> Approve
                      </button>
                      <button className="decline" onClick={() => handleUpdateApplication(application.application_id, 'declined')}>
                        <img src={DeclineSvg} alt="Decline" /> Decline
                      </button>
                      <button className="view" onClick={() => handleView(application)}>
                        <img src={ViewSvg} alt="View" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="item">
            <p>Showing {data.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !loading && (
              <button className="load-more" onClick={loadMore}>
                Load More
              </button>
            )}
            {loading && <p>Loading...</p>}
          </div>
          <div className="item right">
            <p>Total of {data.length} result(s)</p>
          </div>
        </div>
      </div>
      {isViewPopup && selectedApplication && 
        <ViewApplication 
          application={selectedApplication} 
          onClose={closeView} 
        />
      }
    </>
  );
};

export default TableApplications;
