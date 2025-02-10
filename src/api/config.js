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
  adminTypes: `${BASE_URL}/api/v1/types`,
  updateTypes: `${BASE_URL}/api/v1/type`,
  adminAttachment: `${BASE_URL}/api/v1/attachment`,

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

  getDepartment: `${BASE_URL}/api/v1/department`,
  addDepartment: `${BASE_URL}/api/v1/department`,
  updateDepartment: `${BASE_URL}/api/v1/department`,

  getProgram: `${BASE_URL}/api/v1/program`,
  addProgram: `${BASE_URL}/api/v1/program`,
  updateProgram: `${BASE_URL}/api/v1/program`,

  // Dashboard
  scholarshipAnalytics: `${BASE_URL}/api/v1/scholar-analytics`,
  activities: `${BASE_URL}/api/v1/activities`,
  totals: `${BASE_URL}/api/v1/totals`,

  // Student
  studentAccount: `${BASE_URL}/api/v1/student/account`,
  updateStudentAccount: `${BASE_URL}/api/v1/student/account`,
  studentScholarshipTypes: `${BASE_URL}/api/v1/student/scholarship-types`,
  studentType: `${BASE_URL}/api/v1/student/type`,
  studentTypes: `${BASE_URL}/api/v1/student/types`,
  studentEntranceApplication: `${BASE_URL}/api/v1/student/entrance-application`,
  studentDeansListener: `${BASE_URL}/api/v1/student/deans-list`,
  studentAttachment: `${BASE_URL}/api/v1/student/attachment`,
  studentApplications: `${BASE_URL}/api/v1/student/applications`,
  studentDepartment: `${BASE_URL}/api/v1/student/department`,
  studentProgram: `${BASE_URL}/api/v1/student/program`,

  // Dean
  deanAccount: `${BASE_URL}/api/v1/dean/account`,
  updateDeanAccount: `${BASE_URL}/api/v1/dean/account`,
  deanApplications: `${BASE_URL}/api/v1/dean/applications`,
  deanEntranceApplication: `${BASE_URL}/api/v1/dean/entrance-application`,
  deanDeansListener: `${BASE_URL}/api/v1/dean/deans-list`,
  deanReferrals: `${BASE_URL}/api/v1/dean/referrals`,
  deanUpdateApplications: `${BASE_URL}/api/v1/dean/applications`,
  deanTypes: `${BASE_URL}/api/v1/dean/types`,
  deanAttachment: `${BASE_URL}/api/v1/dean/attachment`,
  deanStudents: `${BASE_URL}/api/v1/dean/students`,
  deanDepartment: `${BASE_URL}/api/v1/dean/department`,
  deanProgram: `${BASE_URL}/api/v1/dean/program`,

  // Adviser
  adviserAccount: `${BASE_URL}/api/v1/adviser/account`,
  updateAdviserAccount: `${BASE_URL}/api/v1/adviser/account`,
  adviserTypes: `${BASE_URL}/api/v1/adviser/types`,
  adviserReferrals: `${BASE_URL}/api/v1/adviser/referrals`,
  adviserEntranceApplication: `${BASE_URL}/api/v1/adviser/entrance-application`,
  adviserDeansListener: `${BASE_URL}/api/v1/adviser/deans-list`,
  adviserAttachment: `${BASE_URL}/api/v1/adviser/attachment`,
  adviserStudents: `${BASE_URL}/api/v1/adviser/students`,
  adviserDepartment: `${BASE_URL}/api/v1/adviser/department`,
  adviserProgram: `${BASE_URL}/api/v1/adviser/program`,
};
