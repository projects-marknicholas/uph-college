import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import ProfileImage from "../../../../assets/svg/profile.svg";
import AcceptSvg from "../../../../assets/svg/accept.svg";
import DeclineSvg from "../../../../assets/svg/decline.svg";

// Components
import Swal from 'sweetalert2';

// API
import { getAccountApproval, searchAccountApproval, updateAccountApproval, deleteAccountApproval } from "../../../../api/admin";

// CSS
import '../../../../assets/css/table.css';

const TableAccountApproval = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState({});

  // Fetch data based on search query and pagination
  const fetchData = async (searchQuery, page) => {
    setLoading(true);
    try {
      const result = searchQuery 
        ? await searchAccountApproval(searchQuery, page) 
        : await getAccountApproval(page);
  
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

  const handleRoleChange = (userId, newRole) => {
    setRoles(prevRoles => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  const handleUpdateAccountApproval = async (userId) => {
    const selectedRole = roles[userId];
    if (!selectedRole) {
      Swal.fire('Error!', "Please select a role first", 'error');
      return;
    }
  
    const result = await updateAccountApproval(userId, selectedRole);
    if (result.status === 'success') {
      fetchData(searchQuery, page); 
      Swal.fire('Success!', result.message, 'success');
    } else {
      Swal.fire('Error!', result.message, 'error'); 
    }
  };  

  const handleDeleteAccountApproval = async (userId) => {
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: "This action will delete the account approval!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (confirmationResult.isConfirmed) {
      try {
        const result = await deleteAccountApproval(userId);
        if (result.status === 'success') {
          fetchData(searchQuery, page); 
          Swal.fire('Success!', result.message, 'success');
        } else {
          Swal.fire('Error!', result.message, 'error'); 
        }
      } catch (error) {
        Swal.fire('Error!', "An error occurred while deleting the account approval.", 'error');
      }
    }
  };  

  return(
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            <Link to='/admin/active-accounts'>Active accounts</Link>
          </div>
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
        {/* Table Data */}
        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Student number</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Role</th>
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
                  <td>
                    <select 
                      value={roles[row.user_id]}
                      onChange={(e) => handleRoleChange(row.user_id, e.target.value)}
                    >
                      <option>Select a role</option>
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                      <option value="dean">Dean</option>
                      <option value="adviser">Adviser</option>
                    </select>
                  </td>
                  <td className="action-field">
                    <button className="accept" onClick={() => handleUpdateAccountApproval(row.user_id)}>
                      <img src={AcceptSvg} alt="Accept"/> Accept
                    </button>
                    <button className="decline" onClick={() => handleDeleteAccountApproval(row.user_id)}>
                      <img src={DeclineSvg} alt="Decline"/> Decline
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
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
    </>
  );
};

export default TableAccountApproval;
