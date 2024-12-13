import { endpoints } from './config';

export const fetchSecurityKey = async () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user ? user.user_id : '';
  const bearerToken = 'ZgnJxCp7R2i95Y3Y7wMN6VTryZ0Ro3a1letBoUyYi5MyKIyW5EQTTvwDqsJU5xVG';
  const url = `${endpoints.securityKey}?user_id=${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': bearerToken,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      sessionStorage.setItem('security_key', data.security_key);
      return { status: 'success', message: data.message, security_key: data.security_key };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    return { status: 'error', message: 'An error occurred while fetching the security key.' };
  }
};

export const userAccount = async ({ uid }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanAccount}?uid=${uid}`;

  console.log(url);

  try{
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', user: data.user };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

export const updateUserAccount = async ({ uid, ...formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.updateDeanAccount}?uid=${uid}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating data:', error);
    return { status: 'error', message: error.message || 'An error occurred while updating data. Please try again.' };
  }
};

export const getApplications = async ({ searchQuery = '', page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

  if (!userData.user_id) {
    return { status: 'error', message: 'User ID not found' };
  }

  const url = searchQuery
    ? `${endpoints.deanApplications}?uid=${userData.user_id}&search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.deanApplications}?uid=${userData.user_id}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

export const updateApplication = async (applicationId, newStatus) => {
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanUpdateApplications}?aid=${applicationId}&status=${newStatus}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating application:', error);
    return { status: 'error', message: 'An error occurred while updating the application. Please try again.' };
  }
};

export const getTypes = async ({ searchQuery = '', page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

  if (!userData.user_id) {
    return { status: 'error', message: 'User ID not found' };
  }

  const url = searchQuery
    ? `${endpoints.deanTypes}?search=${searchQuery}&page=${page}&limit=10`
    : `${endpoints.deanTypes}?page=${page}&limit=10`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

export const insertEntranceApplication = async ({ rid, uid, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanEntranceApplication}?rid=${rid}&uid=${uid}&stid=${stid}&tid=${tid}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during inserting data:', error);
    return { status: 'error', message: 'An error occurred during inserting data. Please try again.' };
  }
};

export const insertDeansListener = async ({ rid, uid, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanDeansListener}?rid=${rid}&uid=${uid}&stid=${stid}&tid=${tid}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during inserting data:', error);
    return { status: 'error', message: 'An error occurred during inserting data. Please try again.' };
  }
};

export const insertFormAttachment = async ({ rid, sn, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanAttachment}?rid=${rid}&sn=${sn}&stid=${stid}&tid=${tid}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
      },
      body: formData,
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during inserting data:', error);
    return { status: 'error', message: 'An error occurred during inserting data. Please try again.' };
  }
};

export const getStudents = async ({ program, department, search, page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.deanStudents}?search=${search}&program=${program}&department=${department}&page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const getReferrals = async ({ searchQuery = '', page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

  if (!userData.user_id) {
    return { status: 'error', message: 'User ID not found' };
  }

  const url = searchQuery
    ? `${endpoints.deanReferrals}?uid=${userData.user_id}&search=${searchQuery}&page=${page}&limit=10`
    : `${endpoints.deanReferrals}?uid=${userData.user_id}&page=${page}&limit=10`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

// Department
export const getDepartment = async ({ searchQuery, page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;

  const url = searchQuery
    ? `${endpoints.deanDepartment}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.deanDepartment}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

// Programs
export const getProgram = async ({ searchQuery, page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;

  const url = searchQuery
    ? `${endpoints.deanProgram}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.deanProgram}?page=${page}&limit=50`;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};