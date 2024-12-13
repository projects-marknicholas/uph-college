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
import AdminTypes from './roles/admin/type';
import AdminDepartment from './roles/admin/departments';
import AdminPrograms from './roles/admin/programs';

// Dean
import DeanDashboard from './roles/dean/dashboard';
import DeanApplications from './roles/dean/applications';
import DeanReferral from './roles/dean/referral';
import DeanScholars from './roles/dean/scholars';
import DeanSettings from './roles/dean/settings';

// Coordinator
import CoordinatorDashboard from './roles/coordinator/dashboard';
import CoordinatorScholarship from './roles/coordinator/scholarship';
import CoordinatorReferral from './roles/coordinator/referral';
import CoordinatorSettings from './roles/coordinator/settings';

// Student
import StudentHome from './roles/student/home';
import StudentApplications from './roles/student/applications';
import StudentAccount from './roles/student/account';
import StudentForm from './roles/student/form';

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
          <Route path="/admin/type/:scholarshipTypeId" element={<AdminTypes />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/accounts" element={<AdminAccounts />} />
          <Route path="/admin/active-accounts" element={<AdminActiveAccounts />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/departments" element={<AdminDepartment />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
          {/* Dean */}
          <Route path="/dean/" element={<DeanApplications />} />  
          <Route path="/dean/applications" element={<DeanApplications />} />
          <Route path="/dean/referral" element={<DeanReferral />} />
          <Route path="/dean/scholars" element={<DeanScholars />} />
          <Route path="/dean/settings" element={<DeanSettings />} />
          {/* Adviser */}
          <Route path="/adviser/" element={<CoordinatorScholarship />} />
          <Route path="/adviser/referral" element={<CoordinatorReferral />} />
          <Route path="/adviser/settings" element={<CoordinatorSettings />} />
          {/* Student */}
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/applications" element={<StudentApplications />} />
          <Route path="/student/account" element={<StudentAccount />} />
          <Route path="/student/:studentTypeId/:typeId" element={<StudentForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;