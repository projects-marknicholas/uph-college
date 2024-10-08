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

export const fetchTotals = async (year, sem) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.totals}?year=${year}&sem=${sem}`;

  try{
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error('Error displaying data');
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
}

export const ScholarAnalytics = async (year, sem) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.scholarshipAnalytics}?year=${year}&sem=${sem}`;

  try{
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error('Error displaying data');
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
}

export const fetchActivities = async (year, sem, page) => {
  // Fetch the API key first
  const securityKeyResponse = await fetchSecurityKey();
  
  if (securityKeyResponse.status === 'error') {
    return { status: 'error', message: 'Failed to fetch API key.' };
  }

  const apiKey = securityKeyResponse.security_key;
  const url = `${endpoints.activities}?year=${year}&sem=${sem}&page=${page}&limit=50`; 

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

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error('Error displaying data');
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'No activities' };
  }
}