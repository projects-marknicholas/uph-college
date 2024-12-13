import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// CSS
import '../../../assets/css/navbar.css';

const Navbar = () => {
  const data = sessionStorage.getItem('user');
  const userData = data ? JSON.parse(data) : null;

  return (
    <>
      <nav>
        <div className="ad-greetings">
          <h3>Welcome, Adviser {userData.first_name}!</h3>
        </div>
        <div className="controls">
          <Link to='/adviser/settings' className="profile-pic">
            <img src={userData.profile} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
