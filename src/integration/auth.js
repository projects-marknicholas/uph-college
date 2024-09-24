// Env
import { API_KEY, endpoints } from './config';

// React
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = `${endpoints.googleAuth}`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
  
    if (code) {
      fetch(`${url}?code=${code}`)
        .then(response => response.text())
        .then(data => {
          const jsonStart = data.indexOf('{');
          const jsonString = data.slice(jsonStart);
          try {
            const jsonData = JSON.parse(jsonString);
  
            if (jsonData.status === 'success') {
              sessionStorage.setItem('user', JSON.stringify(jsonData.data));
              navigate('/');
            } else {
              console.error('Google Login Failed:', jsonData.message);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e, jsonString);
          }
        })
        .catch(error => {
          console.error('Error during Google OAuth:', error);
        });
    }
  }, [location]);

  return null;
}

export const registerUser = async (userData) => {
  const url = `${endpoints.register}`;
  
  const formData = new FormData();
  Object.keys(userData).forEach(key => formData.append(key, userData[key]));

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { status: 'error', message: 'An error occurred during registration. Please try again.' };
  }
};

export const loginUser = async (userData) => {
  const url = `${endpoints.login}`;
  
  const formData = new FormData();
  Object.keys(userData).forEach(key => formData.append(key, userData[key]));

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message, user: data.user };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during logging in:', error);
    return { status: 'error', message: 'An error occurred during loggin in. Please try again.' };
  }
};

export const resetPassword = async (email, token, userData) => {
  const url = `${endpoints.resetPassword}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  const formData = new FormData();
  Object.keys(userData).forEach(key => formData.append(key, userData[key]));

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during resetting your password:', error);
    return { status: 'error', message: 'An error occurred during resetting your password. Please try again.' };
  }
};
