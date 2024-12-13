import React from "react";

const PresidentialDirectors = ({ application, onClose }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const pdfUrl = BASE_URL + '/' + application?.attachment;
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
              <h3>PRESIDENTIAL/BOARD DIRECTOR SCHOLARS APPLICATION FORM</h3>
            </div>

            <div className="pdf-view">
              {pdfUrl ? (
                <object
                  data={pdfUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                >
                  <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a>.</p>
                </object>
              ) : (
                <p>No PDF available to display.</p>
              )}
            </div>

            <div className="privacy">
              "By signing this <b>president/board director scholars application form</b> you  hereby allow / authorize UPH Calamba
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

export default PresidentialDirectors;