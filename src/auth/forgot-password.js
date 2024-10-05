import React, {useEffect} from "react";

// Router
import { Link } from "react-router-dom";

// Assets
import Logo from "../assets/svg/favicon.svg";
import Show from "../assets/svg/show.svg";
import Hide from "../assets/svg/hide.svg";
import Google from "../assets/svg/google.svg";

const ForgotPassword = () => {
  
  // Page title
  useEffect(() => {
    document.title = "Forgot Password - University of Perpetual Help College Scholarship";
  });
  
  return(
    <>
    <div className="auth">
      <form className="log-form">
        <div className="header">
          <Link to="/" className="auth">
            <img src={Logo} alt="Logo" />
            <h1>UPHSD-Calamba Scholarship System</h1>
          </Link>
          <h1>Forgotten your password?</h1>
          <p><Link to="/">back to login</Link></p>

          <div className="form-group">
            <label htmlFor="email">
              <div className="flex-label">
                <p>Email address <span>*</span><br/></p>
              </div>
              <input 
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                autoFocus
              />
            </label><br/>
          </div>

          <div className="sign forgot">
            <button 
              className="sign-m"
              type="button"
            >
              Send email
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default ForgotPassword;