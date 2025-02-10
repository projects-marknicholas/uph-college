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
  const url = `${endpoints.studentAccount}?uid=${uid}`;

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
  const url = `${endpoints.updateStudentAccount}?uid=${uid}`;

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

export const fetchScholarship = async ({ filter = 'internal' }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentScholarshipTypes}?filter=${filter}`;

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

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
}

export const fetchType = async ({ stid }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentType}?stid=${stid}`;

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

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
}

export const fetchTypes = async ({ tid }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentTypes}?tid=${tid}`;

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

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
}

export const insertEntranceApplication = async ({ uid, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentEntranceApplication}?uid=${uid}&stid=${stid}&tid=${tid}`;

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

export const insertFormAttachment = async ({ uid, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentAttachment}?uid=${uid}&stid=${stid}&tid=${tid}`;

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

export const insertDeansListener = async ({ uid, stid, tid, formData }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.studentDeansListener}?uid=${uid}&stid=${stid}&tid=${tid}`;

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

export const fetchApplications = async ({ uid, searchQuery, page }) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  
  // Construct the URL based on whether searchQuery is provided
  const url = searchQuery
    ? `${endpoints.studentApplications}?uid=${uid}&search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.studentApplications}?uid=${uid}&page=${page}&limit=50`;

  try {
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
    ? `${endpoints.studentDepartment}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.studentDepartment}?page=${page}&limit=50`;

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
    ? `${endpoints.studentProgram}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.studentProgram}?page=${page}&limit=50`;

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