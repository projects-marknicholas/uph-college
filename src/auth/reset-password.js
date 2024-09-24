import React, {useState, useEffect} from "react";

// Router
import { Link, useNavigate, useLocation } from "react-router-dom";

// Components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assets
import Logo from "../assets/svg/favicon.svg";
import Show from "../assets/svg/show.svg";
import Hide from "../assets/svg/hide.svg";

// API
import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: ""
  });

  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const token = params.get('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data as JSON
    const { new_password, confirm_password } = formData;

    // This object should match the expected structure in your PHP backend
    const result = await resetPassword({
      email,
      token,
      new_password,
      confirm_password
    });


    // Handle response
    if (result.status === 'success') {
      toast.success(result.message);
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="auth">
      <ToastContainer />
      <form className="log-form" onSubmit={handleSubmit}>
        <div className="header">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <h1>Create your new password</h1>
          <p>or <Link to="/">sign in to your account</Link></p>

          <div className="form-group">
            <label htmlFor="new_password">
              <div className="flex-label">
                <p>New Password <span>*</span><br /></p>
              </div>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  autoComplete="off"
                  value={formData.new_password}
                  onChange={handleChange}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? Hide : Show}
                    alt="Show/Hide"
                    className="show-hide"
                  />
                </button>
              </div>
            </label>
            <label htmlFor="confirm_new_password">
              <div className="flex-label">
                <p>Confirm New Password <span>*</span><br /></p>
              </div>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? Hide : Show}
                    alt="Show/Hide"
                    className="show-hide"
                  />
                </button>
              </div>
            </label>
          </div>

          <div className="sign">
            <button
              className="sign-m"
              type="submit"
            >
              Reset password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;