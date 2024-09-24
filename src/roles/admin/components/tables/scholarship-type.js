import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';

// Assets
import EditSvg from "../../../../assets/svg/edit.svg";
import TrashSvg from "../../../../assets/svg/trash.svg";

// Components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupScholarshipType from "../views/scholarship-type";
import PopupEditScholarshipType from "../views/edit-scholarship-type";

// API
import { getScholarshipType, deleteScholarshipType } from "../../../../api/admin";

// CSS
import '../../../../assets/css/scholarship.css';

const TableScholarshipType = ({ showPopup, togglePopup }) => {
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarshipType, setSelectedScholarshipType] = useState(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  const fetchScholarshipTypes = async () => {
    setLoading(true);
    try {
      const response = await getScholarshipType(1);
      if (response.status === "success") {
        setScholarshipTypes(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Failed to fetch scholarship types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarshipTypes();
  }, []);

  const handleDelete = async (scholarshipTypeId) => {
    if (window.confirm("Are you sure you want to delete this scholarship type?")) {
      try {
        const response = await deleteScholarshipType(scholarshipTypeId);
        if (response.status === "success") {
          toast.success("Scholarship type deleted successfully!");
          fetchScholarshipTypes(); // Refresh scholarship types after deletion
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred while deleting the scholarship type.");
      }
    }
  };

  const handleEdit = (scholarship) => {
    setSelectedScholarshipType(scholarship); // Set the complete scholarship object
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedScholarshipType(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="scholarship-type">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scholarshipTypes.map((scholarship) => (
            <div key={scholarship.scholarship_type_id} className="item">
              <div className="controls">
                <button onClick={() => handleEdit(scholarship)}><img src={EditSvg} alt="Edit" /></button>
                <button onClick={() => handleDelete(scholarship.scholarship_type_id)}><img src={TrashSvg} alt="Trash" /></button>
              </div>
              <h1>{scholarship.scholarship_type}</h1>
              <span>{new Date(scholarship.created_at).toLocaleDateString()}</span>
              <div className="tags">
                <div className="tag-item">{scholarship.category}</div>
                <div className="tag-item">{scholarship.type}</div>
              </div>
              <div className="description">{scholarship.description}</div>
              <div className="eligibility">{scholarship.eligibility}</div>
            </div>
          ))
        )}
      </div>

      {showPopup && <PopupScholarshipType togglePopup={togglePopup} fetchScholarshipTypes={fetchScholarshipTypes} />}
      {isEditPopupOpen && selectedScholarshipType && (
        <PopupEditScholarshipType 
          togglePopup={closeEditPopup} 
          fetchScholarshipTypes={fetchScholarshipTypes} 
          data={selectedScholarshipType} // Pass the complete scholarship object
        />
      )}
    </>
  );
};

export default TableScholarshipType;
