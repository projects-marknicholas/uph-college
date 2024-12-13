import React from "react";
import { Link, useLocation } from "react-router-dom";

// Assets
import Logo from "../../../assets/svg/favicon.svg";
import LogoutSvg from "../../../assets/svg/logout.svg";
import ApplicationsSvg from "../../../assets/svg/applications.svg";
import ScholarsSvg from "../../../assets/svg/scholars.svg";
import DashboardActiveSvg from "../../../assets/svg/dashboard-active.svg";
import ApplicationsActiveSvg from "../../../assets/svg/applications-active.svg";
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
            {/* <li>
              <Link to="/dean" className={path === "/dean" ? "active" : ""}>
                <img src={getIcon("/dean", DashboardSvg, DashboardActiveSvg)} alt="Dashboard" />
                <span>Dashboard</span>
              </Link>
            </li> */}
            <li>
              <Link to="/dean/applications" className={path === "/dean/applications" ? "active" : ""}>
                <img src={getIcon("/dean/applications", ApplicationsSvg, ApplicationsActiveSvg)} alt="Applications" />
                <span>Applications</span>
              </Link>
            </li>
            <li>
              <Link to="/dean/scholars" className={path === "/dean/scholars" ? "active" : ""}>
                <img src={getIcon("/dean/scholars", ScholarsSvg, ScholarsSvg)} alt="scholars" />
                <span>Scholarship</span>
              </Link>
            </li>
            <li>
              <Link to="/dean/referral" className={path === "/dean/referral" ? "active" : ""}>
                <img src={getIcon("/dean/referral", ReferralSvg, ReferralSvg)} alt="Referral" />
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
