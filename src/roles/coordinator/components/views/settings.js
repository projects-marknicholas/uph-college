import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import '../../../../assets/css/student/account.css';

// Components
import Swal from 'sweetalert2';

// API
import { userAccount, updateUserAccount, getOrganizations } from '../../../../api/adviser';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    organization: ''
  });
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
            organization: user.organization || ''
          });

          fetchOrganizations('bb32127037342ec9c79ac4a49ac58b99');
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchOrganizations = async (stid) => {
    try {
      const response = await getOrganizations({ stid });
      if (response.status === 'success') setOrganizations(response.data);
    } catch (error) { console.error(error); }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        navigate('/');  
      } else {
        Swal.fire('Error!', response.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', "Error updating user account", 'error');
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
                  value={formData.first_name}
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
                  value={formData.middle_name}
                  onChange={handleInputChange}
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
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="organization">
                <span>Organization</span><br />
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.type_id}>
                      {org.type}
                    </option>
                  ))}
                </select>
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

export default ProfileSettings;