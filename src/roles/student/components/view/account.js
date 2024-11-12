import { useEffect, useState } from 'react';

// CSS
import '../../../../assets/css/student/account.css';

// Components
import Swal from 'sweetalert2';

// API
import { userAccount, updateUserAccount } from '../../../../api/student';

const StudentStudentAccount = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    student_number: '',
    place_of_birth: '',
    date_of_birth: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve and parse the user data from session storage
      const user = sessionStorage.getItem('user');
      if (!user) {
        console.error("User not found in session storage");
        return;
      }
  
      const userData = JSON.parse(user);
  
      try {
        const response = await userAccount({ uid: userData.user_id });
        if (response.status === 'success') {
          const user = response.user[0];
          setFormData({
            first_name: user.first_name || '',
            middle_name: user.middle_name || '',
            last_name: user.last_name || '',
            student_number: user.student_number || '',
            place_of_birth: user.place_of_birth || '',
            date_of_birth: user.date_of_birth || '',
          });
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching user account data:", error);
      }
    };
  
    fetchData();
  }, []);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Retrieve and parse the user data from session storage
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.error("User not found in session storage");
      return;
    }

    const userData = JSON.parse(user);

    try {
      const response = await updateUserAccount({ uid: userData.user_id, ...formData });
      if (response.status === 'success') {
        Swal.fire('Success!', response.message, 'success');
      } else {
        Swal.fire('Error!', response.message, 'error'); 
      }
    } catch (error) {
      Swal.fire('Error!', "Error updating user account:", error, 'error'); 
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="container s-app">
        <div className="s-account">
          <div className="s-header">
            <h1>Account Settings</h1>
            <p>Here you can change your account information</p>
          </div>

          <div className="sa-input-grid">
            <div className="form-group">
              <label htmlFor="first_name">
                <span>First Name</span><br />
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  defaultValue={formData.first_name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="middle_name">
                <span>Middle Name</span><br />
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  defaultValue={formData.middle_name}
                  onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="last_name">
                <span>Last Name</span><br />
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  defaultValue={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="student_number">
                <span>Student Number</span><br />
                <input
                  type="text"
                  id="student_number"
                  name="student_number"
                  defaultValue={formData.student_number}
                  onChange={(e) => setFormData({ ...formData, student_number: e.target.value })}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="place_of_birth">
                <span>Place of Birth</span><br />
                <input
                  type="text"
                  id="place_of_birth"
                  name="place_of_birth"
                  defaultValue={formData.place_of_birth}
                  onChange={(e) => setFormData({ ...formData, place_of_birth: e.target.value })}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">
                <span>Date of Birth</span><br />
                <input
                  type="text"
                  id="date_of_birth"
                  name="date_of_birth"
                  defaultValue={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              </label>
            </div>
          </div>
          <div className="s-sub">
            <button>Update changes</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StudentStudentAccount;
