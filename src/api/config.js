export const API_KEY = '';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  // Auth
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`,
  googleAuth: `${BASE_URL}/api/auth/google`,  
  microsoftAuth: `${BASE_URL}/api/auth/microsoft`, 
  securityKey: `${BASE_URL}/api/auth/sk`,  

  // Admin
  addScholarshipType: `${BASE_URL}/api/v1/scholarship-type`,
  updateScholarshipType: `${BASE_URL}/api/v1/scholarship-type`,
  getScholarshipType: `${BASE_URL}/api/v1/scholarship-type`,
  updateArchiveStatus: `${BASE_URL}/api/v1/archive`,
  deleteScholarshipType: `${BASE_URL}/api/v1/scholarship-type`,

  addTypes: `${BASE_URL}/api/v1/type`,
  getTypes: `${BASE_URL}/api/v1/type`,
  updateTypes: `${BASE_URL}/api/v1/type`,

  getScholarTypeCategory: `${BASE_URL}/api/v1/scholarship-type-category`,

  getApplications: `${BASE_URL}/api/v1/applications`,
  searchApplications: `${BASE_URL}/api/v1/applications-search`,
  updateApplications: `${BASE_URL}/api/v1/applications`,
  deleteApplications: `${BASE_URL}/api/v1/applications`,

  getAccountApprovals: `${BASE_URL}/api/v1/account-approval`,
  searchAccountApprovals: `${BASE_URL}/api/v1/account-approval-search`,
  updateAccountApprovals: `${BASE_URL}/api/v1/account-approval`,
  deleteAccountApprovals: `${BASE_URL}/api/v1/account-approval`,

  getAccounts: `${BASE_URL}/api/v1/active-accounts`,
  searchAccounts: `${BASE_URL}/api/v1/active-accounts-search`,
  updateAccounts: `${BASE_URL}/api/v1/active-accounts`,

  getScholars: `${BASE_URL}/api/v1/scholars`,
  searchScholars: `${BASE_URL}/api/v1/scholars-search`,
  deleteScholars: `${BASE_URL}/api/v1/scholars`,

  // Dashboard
  scholarshipAnalytics: `${BASE_URL}/api/v1/scholar-analytics`,
  activities: `${BASE_URL}/api/v1/activities`,
  totals: `${BASE_URL}/api/v1/totals`,
};
