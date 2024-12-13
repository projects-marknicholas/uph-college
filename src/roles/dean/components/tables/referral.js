import React, { useState, useEffect } from "react";

// Assets
import ViewSvg from "../../../../assets/svg/view.svg";

// Components
import ValidateUser from "../../../../validations/validate-user";
import ViewApplication from "../views/application";

// API
import { getReferrals } from "../../../../api/dean";

// CSS
import '../../../../assets/css/table.css';

const TableReferrals = () => {
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
      const result = await getReferrals({ searchQuery, page });
  
      if (result.status === 'success') {
        setData(prevData => page === 1 ? result.data : [...prevData, ...result.data]);
        setHasMore(result.data.length >= 10);
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

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
  };

  const closeView = () => {
    setSelectedApplication(null);
  };

  return (
    <>
      <ValidateUser/>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            
          </div>
          <div className="search-bar">
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
                <th>Applied Scholarship</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>Academic</td>
                    <td>{row.type}</td>
                    <td>{row.status}</td>
                    <td>{row.created_at}</td>
                    <td className="action-field">
                      <button className="view" onClick={() => handleViewApplication(row)}>
                        <img src={ViewSvg} alt="View" /> View
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
        <ViewApplication 
          application={selectedApplication} 
          onClose={closeView} 
        />
      )}
    </>
  );
};

export default TableReferrals;
