import React, { useEffect, useState, useMemo } from 'react';
import { fetchActivities } from '../../../../api/dashboard'; 

const DashboardActivities = ({ year, sem }) => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => { // Renamed to avoid conflict
      setLoading(true);
      const response = await fetchActivities(year, sem, 1); // Call the API function
  
      if (response.status === 'success') {
        setActivitiesData(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };
  
    fetchData();
  }, [year, sem]);  

  // Memoize the activities list for performance optimization
  const activitiesList = useMemo(() => {
    return activitiesData.map((activity, index) => (
      <div className='dash-act' key={index}>
        <span>{activity.action}</span> 
        <h3>{activity.title}</h3> 
        <div className='dash-act-foot'>
          {activity.description} <p>{new Date(activity.created_at).toLocaleString()}</p> 
        </div>
      </div>
    ));
  }, [activitiesData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='activity-list'>
      {activitiesList}
    </div>
  );
};

export default DashboardActivities;
