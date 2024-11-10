// CSS
import '../../../../assets/css/student/account.css';

const StudentStudentAccount = () => {

  return(
    <>
      <div className="container s-app">
        <div className="s-account">
          <div className="s-header">
            <h1>Account Settings</h1>
            <p>Here you can change your account information</p>
          </div>

          <div className="sa-input-grid">
            <div className="form-group">
              <label htmlFor="first_name">
                <span>First name</span><br/>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="first_name">
                <span>Middle name</span><br/>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="last_name">
                <span>Last name</span><br/>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="extension">
                <span>Extension (Jr., Sr.m etc.)</span><br/>
                <input
                  type="text"
                  id="extension"
                  name="extension"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="student_number">
                <span>Student number</span><br/>
                <input
                  type="text"
                  id="student_number"
                  name="student_number"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="place_of_birth">
                <span>Place of birth</span><br/>
                <input
                  type="text"
                  id="place_of_birth"
                  name="place_of_birth"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">
                <span>Date of birth</span><br/>
                <input
                  type="text"
                  id="date_of_birth"
                  name="date_of_birth"
                />
              </label>
            </div>
          </div>
          <div className="s-sub">
            <button>Update changes</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentStudentAccount;