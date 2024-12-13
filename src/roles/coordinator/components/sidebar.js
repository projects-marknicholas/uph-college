import React from "react";
import { Link, useLocation } from "react-router-dom";

// Assets
import Logo from "../../../assets/svg/favicon.svg";
import LogoutSvg from "../../../assets/svg/logout.svg";
import DashboardSvg from "../../../assets/svg/scholars.svg";
import ReferralSvg from "../../../assets/svg/referral.svg";

// CSS
import "../../../assets/css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const getIcon = (route, defaultIcon, activeIcon) => {
    return path === route ? activeIcon : defaultIcon;
  };

  return (
    <div className="sidebar-set">
      <div className="sidebar">
        {/* Logo */}
        <div className="side-logo">
          <img src={Logo} alt="logo" />
        </div>

        {/* Navigation */}
        <div className="navigation">
          <ul>
            <li>
              <Link to="/adviser" className={path === "/adviser" ? "active" : ""}>
                <img src={getIcon("/adviser", DashboardSvg, DashboardSvg)} alt="Dashboard" />
                <span>Scholarships</span>
              </Link>
            </li>
            <li>
              <Link to="/adviser/referral" className={path === "/adviser/referral" ? "active" : ""}>
                <img src={getIcon("/adviser/referral", ReferralSvg, ReferralSvg)} alt="Referral" />
                <span>Referral</span>
              </Link>
            </li>
            <li className="logout">
              <Link to="/">
                <img src={LogoutSvg} alt="Logout" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
