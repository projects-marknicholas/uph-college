import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import ProfileImage from "../../../../assets/svg/profile.svg";
import AcceptSvg from "../../../../assets/svg/accept.svg";
import DeclineSvg from "../../../../assets/svg/decline.svg";

// Components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { getActiveAccount, searchActiveAccount, deleteActiveAccount } from "../../../../api/admin";

// CSS
import '../../../../assets/css/table.css';

const TableActiveAccounts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState({});

  const fetchData = async (searchQuery, page) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const result = searchQuery 
        ? await searchActiveAccount(searchQuery, page) 
        : await getActiveAccount(page);
  
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

  const handleDeleteActiveAccount = async (userId) => {
    const result = await deleteActiveAccount(userId);
    if (result.status === 'success') {
      fetchData(searchQuery, page); 
      toast.success(result.message);
    } else {
      toast.error(result.message); 
    }
  }

  return(
    <>
      <ToastContainer/>
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
        {/* Table Data */}
        <div className="table-scrolling">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Date Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  <td><img src={row.profile || ProfileImage} alt="Profile" /></td>
                  <td>{capitalize(row.first_name)} {capitalize(row.middle_name)} {capitalize(row.last_name)}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>
                    {new Date(row.last_login).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                  <td>
                    {new Date(row.joined_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="action-field">
                    <button className="decline" onClick={() => handleDeleteActiveAccount(row.user_id)}>
                      <img src={DeclineSvg} alt="Decline"/> Remove
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

export default TableActiveAccounts;
