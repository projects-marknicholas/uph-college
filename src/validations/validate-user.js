import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ValidateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);

      // Check user role and navigate accordingly
      if (userData.role === 'admin') {
        if (location.pathname !== '/admin' && 
          location.pathname !== '/admin/scholars' && 
          location.pathname !== '/admin/scholarship-type' && 
          location.pathname !== '/admin/applications' && 
          location.pathname !== '/admin/accounts' && 
          location.pathname !== '/admin/active-accounts' &&
          location.pathname !== '/admin/settings' &&
          location.pathname !== '/admin/logout'
          ) {
          navigate('/');
        }
      } else if (userData.role === 'user') {
        if (location.pathname !== '/' && 
          location.pathname !== '/cart' && 
          location.pathname !== '/checkout') {
          navigate('/');
        }
      } else {
        // If role is empty or null, or any other unexpected value
        navigate('/');
      }
    } else {
      // Redirect to login if user data is not present
      navigate('/');
    }
  }, [navigate, location.pathname]);

  return null; 
}

export default ValidateUser;
