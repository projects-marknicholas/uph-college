import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import EditSvg from "../../../../assets/svg/edit.svg";
import AddSvg from "../../../../assets/svg/add.svg";
import HideSvg from "../../../../assets/svg/hide-st.svg";
import ShowSvg from "../../../../assets/svg/show-st.svg";

// Components
import Swal from 'sweetalert2';
import PopupScholarshipType from "../views/scholarship-type";
import PopupEditScholarshipType from "../views/edit-scholarship-type";
import PopupType from "../views/type";
import PopupEditType from "../views/edit-type";

// API
import { getScholarshipType, updateArchiveStatus } from "../../../../api/admin";

// CSS
import '../../../../assets/css/scholarship.css';

const TableScholarshipType = ({ showPopup, togglePopup }) => {
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarshipType, setSelectedScholarshipType] = useState(null);
  const [selectedType, setSelectedType] = useState(""); // To store the selected type
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isTypePopupOpen, setTypePopupOpen] = useState(false);
  const [isTypeSelectionPopupOpen, setTypeSelectionPopupOpen] = useState(false); // Track the type selection popup
  const [selectedCategory, setSelectedCategory] = useState("internal"); // State for category selection

  const fetchScholarshipTypes = async () => {
    setLoading(true);
    try {
      const response = await getScholarshipType(1);
      if (response.status === "success") {
        setScholarshipTypes(response.data);
      } else {
        Swal.fire('Error!', response.message, 'error');
      }
    } catch (err) {
      Swal.fire('Error!', "Failed to fetch scholarship types.", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarshipTypes();
  }, []); 

  const handleEdit = (scholarship) => {
    setSelectedScholarshipType(scholarship);
    setEditPopupOpen(true);
  };

  const handleType = (scholarship) => {
    setSelectedScholarshipType(scholarship); 
    setTypePopupOpen(true);
  };

  const handleTypeSelection = (scholarship, selectedType) => {
    const selectedTypeData = scholarship.type_list.find(type => type.type === selectedType);
    if (selectedTypeData) {
      setSelectedType(selectedTypeData);
      setTypeSelectionPopupOpen(true);
    }
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedScholarshipType(null);
  };

  const closeTypePopup = () => {
    setTypePopupOpen(false);
  };

  const closeTypeSelectionPopup = () => {
    setTypeSelectionPopupOpen(false);
    setSelectedType(""); // Reset selected type
  };

  const handleHide = async (scholarship, newArchiveStatus) => {
    const isHidden = scholarship.archive === 'hide';
    const action = isHidden ? 'show' : 'hide';

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `This action will ${action} this scholarship type!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        // Use the newArchiveStatus parameter directly
        const response = await updateArchiveStatus(scholarship.scholarship_type_id, newArchiveStatus);

        if (response.status === "success") {
          fetchScholarshipTypes();
          Swal.fire(`${action.charAt(0).toUpperCase() + action.slice(1)}!`, `The scholarship type has been ${action}.`, 'success');
        } else {
          Swal.fire('Error!', response.message, 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'Failed to update scholarship type.', 'error');
      }
    }
  }; 

  return (
    <>
      <div className="category-select">
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
      </div>

      <div className="scholarship-type">
        {loading ? (
          <p>Loading...</p>
        ) : (
          scholarshipTypes
            .filter(scholarship => scholarship.category.toLowerCase() === selectedCategory)
            .map((scholarship) => (
              <div key={scholarship.scholarship_type_id} className="item">
                <div className="controls">
                  {scholarship.archive === 'hide' ? (
                    <button onClick={() => handleHide(scholarship, '')}>
                      <img src={ShowSvg} alt="Show" />
                    </button>
                  ) : (
                    <button onClick={() => handleHide(scholarship, 'hide')}>
                      <img src={HideSvg} alt="Hide" />
                    </button>
                  )}
                  <button onClick={() => handleType(scholarship)}><img src={AddSvg} alt="Add"/></button>
                  <button onClick={() => handleEdit(scholarship)}><img src={EditSvg} alt="Edit" /></button>
                </div>
                <h1>{scholarship.scholarship_type}</h1>
                <span>{new Date(scholarship.created_at).toLocaleDateString()} - {scholarship.category.toLowerCase()}</span>
                <div className="tags">
                  {/* <div className="tag-item">{scholarship.category.toLowerCase()}</div> */}
                </div>
                <div className="description">{scholarship.description}</div>
                <div className="eligibility">{scholarship.eligibility}</div>

                {scholarship.type_list && scholarship.type_list.length > 0 && (
                  <div className="dropdown-type">
                    <select onChange={(e) => handleTypeSelection(scholarship, e.target.value)}>
                      <option value="">Select Type</option>
                      {scholarship.type_list.map((type) => (
                        <option key={type.type_id} value={type.type}>
                          {type.type} {type.archive === 'hide' ? '(Hidden)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {showPopup && 
        <PopupScholarshipType 
          togglePopup={togglePopup} 
          fetchScholarshipTypes={fetchScholarshipTypes} 
        />
      }
      
      {isEditPopupOpen && selectedScholarshipType && (
        <PopupEditScholarshipType 
          togglePopup={closeEditPopup} 
          fetchScholarshipTypes={fetchScholarshipTypes} 
          data={selectedScholarshipType} 
        />
      )}
      {isTypePopupOpen && (
        <PopupType 
          togglePopup={closeTypePopup} 
          scholarship={selectedScholarshipType} 
          fetchScholarshipTypes={fetchScholarshipTypes} 
        />
      )}
      {isTypeSelectionPopupOpen && (
        <PopupEditType 
          togglePopup={closeTypeSelectionPopup} 
          scholarship={selectedScholarshipType} 
          selectedType={selectedType}
          fetchScholarshipTypes={fetchScholarshipTypes}
        />
      )}
    </>
  );
};

export default TableScholarshipType;
