import React from "react";
import { Link, useLocation } from "react-router-dom";

// Assets
import Logo from "../../../assets/svg/favicon.svg";
import LogoutSvg from "../../../assets/svg/logout.svg";
import ScholarsSvg from "../../../assets/svg/scholars.svg";
import ReferSvg from "../../../assets/svg/refer.svg";
import ReferActiveSvg from "../../../assets/svg/refer-active.svg";
import ApplicationsSvg from "../../../assets/svg/applications.svg";
import SettingsSvg from "../../../assets/svg/settings.svg";
import AccountsSvg from "../../../assets/svg/accounts.svg";
import DashboardSvg from "../../../assets/svg/dashboard.svg";
import DashboardActiveSvg from "../../../assets/svg/dashboard-active.svg";
import ScholarsActiveSvg from "../../../assets/svg/scholars-active.svg";
import ApplicationsActiveSvg from "../../../assets/svg/applications-active.svg";
import AccountsActiveSvg from "../../../assets/svg/accounts-active.svg";
import SettingsActiveSvg from "../../../assets/svg/settings-active.svg";

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
              <Link to="/admin" className={path === "/admin" ? "active" : ""}>
                <img src={getIcon("/admin", DashboardSvg, DashboardActiveSvg)} alt="Dashboard" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/scholars" className={path === "/admin/scholars" ? "active" : ""}>
                <img src={getIcon("/admin/scholars", ScholarsSvg, ScholarsActiveSvg)} alt="Scholars" />
                <span>Scholars</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/applications" className={path === "/admin/applications" ? "active" : ""}>
                <img src={getIcon("/admin/applications", ApplicationsSvg, ApplicationsActiveSvg)} alt="Applications" />
                <span>Applications</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/refer" className={path === "/admin/refer" ? "active" : ""}>
                <img src={getIcon("/admin/refer", ReferSvg, ReferActiveSvg)} alt="Refer" />
                <span>Refer</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/accounts" className={path === "/admin/accounts" ? "active" : ""}>
                <img src={getIcon("/admin/accounts", AccountsSvg, AccountsActiveSvg)} alt="Accounts" />
                <span>Accounts</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className={path === "/admin/settings" ? "active" : ""}>
                <img src={getIcon("/admin/settings", SettingsSvg, SettingsActiveSvg)} alt="Settings" />
                <span>Settings</span>
              </Link>
            </li>
            <li className="logout">
              <Link to="/admin/logout">
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
