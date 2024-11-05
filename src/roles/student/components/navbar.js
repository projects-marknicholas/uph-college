// Hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import Logo from '../../../assets/img/main.png';
import DropdownSvg from '../../../assets/svg/dropdown.svg';
import ManageAccountSvg from '../../../assets/svg/manage-account.svg';
import StudentLogoutSvg from '../../../assets/svg/student-logout.svg';

// CSS
import '../../../assets/css/student/navbar.css';

const StudentNavbar = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Toggle tooltip visibility
  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  return(
    <>
      <div className='container'>
        <nav className='student-nav'>
          <div className="left">
            <img src={Logo} alt="Logo" />
            <h1>UPHSD Scholarship System</h1>
          </div>
          <div className="right">
            <div className='nav-links'>
              <Link to="/student">Home</Link>
              <Link to="/student/applications">Applications</Link>
            </div>
            <div className='profile' onClick={toggleTooltip}>
              <div className='image-placeholder'></div>
              <img src={DropdownSvg} alt="Dropdown Icon" />
              {showTooltip && (
                <div className="tooltip">
                  <Link to='/student/account'><img src={ManageAccountSvg}/> Manage account</Link>
                  <Link to='/student/logout'><img src={StudentLogoutSvg}/> Logout</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default StudentNavbar;
