// React
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// CSS
import './assets/css/variables.css';
import './assets/css/colors.css';
import './assets/css/default.css';

// Auth
import Login from './auth/login';
import Register from './auth/register';
import ForgotPassword from './auth/forgot-password';
import ResetPassword from './auth/reset-password';

// Admin
import AdminDashboard from './roles/admin/dashboard';
import AdminScholars from './roles/admin/scholars';
import AdminApplications from './roles/admin/applications';
import AdminAccounts from './roles/admin/accounts';
import AdminSettings from './roles/admin/settings';
import AdminLogout from './validations/logout';
import AdminActiveAccounts from './roles/admin/active-accounts';
import AdminScholarshipTypes from './roles/admin/scholarship-types';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/scholars" element={<AdminScholars />} />
          <Route path="/admin/scholarship-type" element={<AdminScholarshipTypes />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/accounts" element={<AdminAccounts />} />
          <Route path="/admin/active-accounts" element={<AdminActiveAccounts />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;