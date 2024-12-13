import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// Assets
import EditSvg from "../../../../assets/svg/edit.svg";

// API
import { getProgram } from "../../../../api/admin";

// Components
import AddProgramPopup from "../views/add-program";
import EditProgramPopup from "../views/edit-program";

// CSS
import '../../../../assets/css/table.css';

const TablePrograms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showEditProgram, setShowEditProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrograms = async (query, currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProgram({ searchQuery: query, page: currentPage });
      if (result.status === 'success') {
        setPrograms((prev) =>
          currentPage === 1 ? result.data : [...prev, ...result.data]
        );
        setHasMore(result.data.length >= 10);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while fetching programs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPrograms([]);
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
    fetchPrograms(searchQuery, 1);
  };

  // Edit Program
  const handleEditProgramClick = (program) => {
    setShowEditProgram(true);
    setSelectedProgram(program);
  };

  // Add Program
  const handleAddProgramClick = () => {
    setShowAddProgram(!showAddProgram);
  };

  const handleCloseProgram = () => {
    setShowAddProgram(false);
    setShowEditProgram(false);
    setSelectedProgram(null);
  };

  return (
    <>
      <div className="table-holder">
        <div className="table-header">
          <div className="table-btns">
            <Link to onClick={handleAddProgramClick}>Add Program</Link>
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
                <th>Department</th>
                <th>Program Code</th>
                <th>Program</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={index}>
                  <td>{program.department_name}</td>
                  <td>{program.program_code}</td>
                  <td>{program.program_name}</td>
                  <td className="action-field">
                    <button className="accept" onClick={() => handleEditProgramClick(program)}>
                      <img src={EditSvg} alt="Edit" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && programs.length === 0 && (
                <tr>
                  <td style={{ padding: '8px', textAlign: 'center' }} colSpan="4">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="item">
            <p>Showing {programs.length} result(s)</p>
          </div>
          <div className="item center">
            {hasMore && !searchQuery && (
              <button onClick={loadMore} disabled={loading} className="load-more">
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
          <div className="item right">
            <p>Total of {programs.length} result(s)</p>
          </div>
        </div>
      </div>

      {showAddProgram && (
        <AddProgramPopup
          onClose={handleCloseProgram}
          refreshTable={refreshTable}
        />
      )}

      {showEditProgram && selectedProgram && (
        <EditProgramPopup
          onClose={handleCloseProgram}
          refreshTable={refreshTable}
          program={selectedProgram}
        />
      )}
    </>
  );
};

export default TablePrograms;
