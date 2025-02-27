import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import '../../../../assets/css/student/account.css';

// Components
import Swal from 'sweetalert2';

// API
import { userAccount, updateUserAccount, getDepartment, getProgram } from '../../../../api/dean';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    department: '',
    program: '',
  });
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);

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
            department: user.department || '',
            program: user.program || '',
          });

          // Fetch programs based on user department
          fetchPrograms(user.department);
        } else {
          console.error(response.message);
        }

        const departmentResponse = await getDepartment({ searchQuery: '', page: 1 });
        if (departmentResponse.status === 'success') {
          setDepartments(departmentResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchPrograms = async (department) => {
    try {
      const programResponse = await getProgram({ searchQuery: department, page: 1 });
      if (programResponse.status === 'success') {
        setPrograms(programResponse.data);
      } else {
        setPrograms([]);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Fetch programs when department changes
    if (name === 'department') {
      fetchPrograms(value);
    }
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
              <label htmlFor="department">
                <span>College Department</span><br />
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_name}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="program">
                <span>College Program</span><br />
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                >
                  <option value="">Select Program</option>
                  {programs.map((prog) => (
                    <option key={prog.program_id} value={prog.program_name}>
                      {prog.program_name}
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
