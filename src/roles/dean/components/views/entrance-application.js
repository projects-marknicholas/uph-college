import React from "react";

const EntranceApplication = ({ application, onClose }) => {
  return(
    <>
      <div className="popup-overlay">
        <div className="entrance-application">
        <div className='closing'>
          <button className="close-view" onClick={onClose}>Close</button>
        </div>
          <div className="content">
            <div className="headers">
              <h1>SCHOLARSHIP PROGRAM</h1>
              <h3>ENTRANCE GRANT APPLICATION FORM</h3>
            </div>

            <div className="inputs">
              <div className="item">
                <span>Semester</span>
                <div className="input">
                  {application.semester || ''}
                </div>
              </div>
              <div className="item">
                <span>Academic Year</span>
                <div className="input">
                  {application.academic_year || ''}
                </div>
              </div>
              <div className="item">
                <span>Name</span>
                <div className="input">
                  {application.first_name} {application.middle_name} {application.last_name}
                </div>
              </div>
              <div className="item">
                <span>Course</span>
                <div className="input">
                  {application.program}
                </div>
              </div>
              <div className="item">
                <span>E-mail Address</span>
                <div className="input">
                  {application.email_address}
                </div>
              </div>
              <div className="item">
                <span>Contact Number</span>
                <div className="input">
                  {application.contact_number}
                </div>
              </div>
              <div className="item">
                <span>Honors Received</span>
                <div className="input">
                  {application.honors_received}
                </div>
              </div>
              <div className="item">
                <span>General Weighted Average (GWA)</span>
                <div className="input">
                  {application.general_weighted_average}
                </div>
              </div>
              <div className="item">
                <span>Date Applied</span>
                <div className="input">
                  {application.created_at}
                </div>
              </div>
            </div>

            <div className="privacy">
              "By signing this <b>entrance grant application form</b> you  hereby allow / authorize UPH Calamba
              Campus and their authorized personnel to gather and process your personal information (name, 
              address, and picture if applicable for documentation use) <b>specifically for scholarship program</b>
              . All information gathered on the said activity will be kept secured and confidential for a period of
              five (5) years from the collection date and will be destroyed by means of shredding and/or file deletion
              after the prescribed retention period in accordance with Republic Act 10173 of the Data Privacy Act of 2012
              of the Republic of the Philippines."
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntranceApplication;