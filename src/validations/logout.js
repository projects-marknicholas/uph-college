import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('user');

    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return null;
}

export default AdminLogout;
