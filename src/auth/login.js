import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS
import '../assets/css/auth.css';

// Components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assets
import Logo from "../assets/svg/favicon.svg";
import Show from "../assets/svg/show.svg";
import Hide from "../assets/svg/hide.svg";
import Google from "../assets/svg/google.svg";

// API
import { GoogleLogin, loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send form data as JSON
    const { email, password } = formData;

    // This object should match the expected structure in your PHP backend
    const result = await loginUser({
      email,
      password
    });


    // Handle response
    if (result.status === 'success') {
      const userRole = result.user.role;
      sessionStorage.setItem('user', JSON.stringify(result.user));
      toast.success(result.message);
      navigate(`/${userRole}`);
    } else {
      toast.error(result.message);
    }
  };

  // Page title
  useEffect(() => {
    document.title = "Login - University of Perpetual Help College Scholarship";
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    const url = process.env.REACT_APP_BASE_URL;
    window.location.href = `${url}/api/auth/google`;
  };

  return (
    <>
      <GoogleLogin />
      <ToastContainer/>
      <div className="auth">
        <form className="log-form" onSubmit={handleSubmit}>
          <div className="header">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <h1>Sign in to start your session</h1>
            <p>or <Link to="/register">sign up for an account</Link></p>

            <div className="form-group">
              <label htmlFor="email">
                <div className="flex-label">
                  <p>Email address <span>*</span><br /></p>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </label><br />
              <label htmlFor="password">
                <div className="flex-label">
                  <p>Password <span>*</span><br /></p>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
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
                Sign in
              </button>
              <div className="or">or login using your</div>
              <button
                className="sign-g"
                type="button"
                onClick={handleGoogleLogin}
              >
                <div><img src={Google} alt="Google" /> Google account</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
