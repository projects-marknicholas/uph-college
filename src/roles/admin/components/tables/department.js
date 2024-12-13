import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import EditSvg from "../../../../assets/svg/edit.svg";

// API
import { getDepartment } from "../../../../api/admin";

// Components
import AddDepartmentPopup from "../views/add-deparment";
import EditDepartmentPopup from "../views/edit-department";

// CSS
import '../../../../assets/css/table.css';

const TableDepartment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showEditDepartment, setShowEditDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [error, setError] = useState(null);

  const fetchDepartment = async (query, currentPage) => {
    setLoading(true);
    try {
      const result = await getDepartment({ searchQuery: query, page: currentPage });
      if (result.status === 'success') {
        setDepartments((prev) =>
          currentPage === 1 ? result.data : [...prev, ...result.data]
        );
        setHasMore(result.data.length >= 10);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while fetching department.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setDepartments([]);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Refresh Table
  const refreshTable = () => {
    setPage(1);
    setHasMore(true);
    fetchDepartment(searchQuery, 1);
  };

  // Edit Department
  const handleEditDepartmentClick = (department) => {
    setShowEditDepartment(true);
    setSelectedDepartment(department);
  };

  // Add Department
  const handleAddDepartmentClick = () => {
    setShowAddDepartment(!showAddDepartment);
  };

  const handleCloseDepartment = () => {
    setShowAddDepartment(false);
    setShowEditDepartment(false);
    setSelectedDepartment(null);
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            <Link to onClick={handleAddDepartmentClick}>Add Department</Link>
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
                <th>Department Code</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index}>
                  <td>{department.department_code}</td>
                  <td>{department.department_name}</td>
                  <td className="action-field">
                    <button className="accept" onClick={() => handleEditDepartmentClick(department)}>
                      <img src={EditSvg} alt="Edit" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && departments.length === 0 && (
                <tr>
                  <td style={{ padding: '8px', textAlign: 'center' }} colSpan="3">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="item">
            <p>Showing {departments.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {departments.length} result(s)</p>
          </div>
        </div>
      </div>

      {showAddDepartment && (
        <AddDepartmentPopup
          onClose={handleCloseDepartment}
          refreshTable={refreshTable}
        />
      )}

      {showEditDepartment && selectedDepartment && (
        <EditDepartmentPopup
          onClose={handleCloseDepartment}
          refreshTable={refreshTable}
          department={selectedDepartment}
        />
      )}
    </>
  );
};

export default TableDepartment;
