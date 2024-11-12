import React, { useState, useEffect } from "react";

// Assets
import ProfileImage from "../../../../assets/svg/profile.svg";
import AcceptSvg from "../../../../assets/svg/accept.svg";
import ViewSvg from "../../../../assets/svg/view.svg";
import DeclineSvg from "../../../../assets/svg/decline.svg";

// Components
import Swal from 'sweetalert2';
import ViewApplication from "../views/applications";

// API
import { getApplications, searchApplications, updateApplication } from "../../../../api/admin";

// CSS
import '../../../../assets/css/table.css';

const TableApplications = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch data based on search query and pagination
  const fetchData = async (searchQuery, page) => {
    setLoading(true);
    try {
      const result = searchQuery 
        ? await searchApplications(searchQuery, page) 
        : await getApplications(page);

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
    fetchData(searchQuery, page);
  }, [page, searchQuery]);

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

  const capitalize = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
  };

  const handleUpdateApplication = async (applicationId, newStatus) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to update the application status to "${newStatus}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await updateApplication(applicationId, newStatus);
        if (response.status === 'success') {
          fetchData(searchQuery, page); 
          Swal.fire('Success!', response.message, 'success');
        } else {
          Swal.fire('Error!', response.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error!', "An error occurred while updating the application.", 'error');
      }
    }
  };  

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const closeView = () => {
    setSelectedApplication(null);
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
                <th>Image</th>
                <th>Student number</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
                <th>GWA</th>
                <th>Form Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index}>
                    <td><img src={row.profile || ProfileImage} alt="Profile" /></td>
                    <td>{row.student_number || ''}</td>
                    <td>{capitalize(row.first_name)} {capitalize(row.middle_name)} {capitalize(row.last_name)}</td>
                    <td>{row.email}</td>
                    <td>{row.course}</td>
                    <td>{row.year_level}</td>
                    <td>{row.general_weighted_average}</td>
                    <td>{row.form_type}</td>
                    <td className="action-field">
                      <button className="accept" onClick={() => handleUpdateApplication(row.application_id, 'accepted')}>
                        <img src={AcceptSvg} alt="Accept" />
                        Accept
                      </button>
                      <button className="decline" onClick={() => handleUpdateApplication(row.application_id, 'declined')}>
                        <img src={DeclineSvg} alt="Decline" />
                        Decline
                      </button>
                      <button className="view" onClick={() => handleViewApplication(row)}>
                        <img src={ViewSvg} alt="View" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <center>No results found.</center>
                  </td>
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
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {data.length} result(s)</p>
          </div>
        </div>
      </div>

      {selectedApplication && (
        <ViewApplication application={selectedApplication} onClose={closeView} />
      )}
    </>
  );
}

export default TableApplications;
