const DeansListener = ({ application }) => {
  return(
    <>
      <div className="popup-overlay">
        <div className="entrance-application">
          DeansListener
        </div>
        <div className="entrance-application">
          {application.form_data.first_name}<br/>
          {application.form_data.middle_name}<br/>
          {application.form_data.last_name}<br/>
          {application.form_data.suffix}<br/>
          {application.form_data.email}<br/>
          {application.form_data.semester}<br/>
          {application.form_data.program}<br/>
          {application.form_data.year_level}<br/>
          {application.form_data.contact_number}<br/>
          {application.form_data.subject_name}<br/>
          {application.form_data.subject_code}<br/>
          {application.form_data.grade}<br/>
          {application.form_data.units}<br/>
          {application.form_data.created_at}<br/>
          
          {application.form_data.subjects.length > 0 ? (
            <ul>
              {application.form_data.subjects.map((subject, index) => (
                <li key={index}>
                  <strong>Subject Name:</strong> {subject.subject_name}<br/>
                  <strong>Subject Code:</strong> {subject.subject_code}<br/>
                  <strong>Grade:</strong> {subject.grade}<br/>
                  <strong>Units:</strong> {subject.units}<br/>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DeansListener;