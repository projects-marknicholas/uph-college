import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const ValidateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scholarshipTypeId } = useParams(); // Extract scholarshipTypeId from URL params

  useEffect(() => {
    const user = sessionStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);

      if (userData.status === 'deactivated') {
        navigate('/'); 
        return; 
      }

      // Check user role and navigate accordingly
      if (userData.role === 'admin') {
        // Allow access to admin routes including the scholarship type route
        if (location.pathname !== '/admin' && 
          location.pathname !== '/admin/scholars' && 
          location.pathname !== '/admin/scholarship-type' && 
          location.pathname !== `/admin/type/${scholarshipTypeId}` && // Use extracted scholarshipTypeId
          location.pathname !== '/admin/applications' && 
          location.pathname !== '/admin/accounts' && 
          location.pathname !== '/admin/active-accounts' &&
          location.pathname !== '/admin/settings' &&
          location.pathname !== '/admin/departments' &&
          location.pathname !== '/admin/programs' &&
          location.pathname !== '/admin/logout'
          ) {
          navigate('/'); // Redirect to home if access is not allowed
        }
      } else if (userData.role === 'student') {
        // Allow user routes
        if (location.pathname !== '/student' && 
          location.pathname !== '/student/applications' && 
          location.pathname !== '/student/account') {
          navigate('/');
        }
      } else if (userData.role === 'dean') {
        // Allow user routes
        if (location.pathname !== '/dean' && 
          location.pathname !== '/dean/applications' && 
          location.pathname !== '/dean/scholars' && 
          location.pathname !== '/dean/settings' && 
          location.pathname !== '/dean/referral') {
          navigate('/');
        }
      }  else if (userData.role === 'adviser') {
        // Allow user routes
        if (location.pathname !== '/adviser' && 
          location.pathname !== '/adviser/scholars' && 
          location.pathname !== '/adviser/settings' &&
          location.pathname !== '/adviser/referral') {
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
  }, [navigate, location.pathname, scholarshipTypeId]); // Include scholarshipTypeId in dependencies

  return null; 
}

export default ValidateUser;
