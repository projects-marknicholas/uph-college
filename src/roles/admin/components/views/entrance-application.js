import React from "react";

// Assets
import Logo from "../../../../assets/img/logo.png";
import ISO from "../../../../assets/img/iso.png";

const EntranceApplication = ({ application }) => {
  return(
    <>
      <div className="popup-overlay">
        <div className="entrance-application">
          <div className="ea-header">
            <img className="logo" src={Logo}/>
            <img className="iso" src={ISO}/>
          </div>
          <div className="content">
            <div className="serials">
              <h5>UPHSDCC-<span>SAS-EGA-01</span></h5>
              <h5>07-15-2024-01</h5>
            </div>

            <div className="headers">
              <h1>SCHOLARSHIP PROGRAM</h1>
              <h3>ENTRANCE GRANT APPLICATION FORM</h3>
              <p>{application.form_data.semester} semester</p>
              <p>Academic Year {application.form_data.academic_year}</p>
            </div>

            <div className="entrance-info">
              <div className="item">Name: {application.form_data.first_name} {application.form_data.middle_name} {application.form_data.last_name}</div>
              <div className="item">Course: {application.form_data.course}</div>
              <div className="item">E-mail Address: {application.form_data.email}</div>
              <div className="item">Contact Number: {application.form_data.contact_number}</div>
              <div className="item">Honors Received: {application.form_data.honors_received}</div>
              <div className="item">General Weighted Average (GWA): {application.form_data.gwa}</div>
              <div className="item">Date Applied: {application.form_data.date_applied}</div>
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