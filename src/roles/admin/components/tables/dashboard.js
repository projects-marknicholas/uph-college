import React from 'react';

// Components
import DashboardTotals from '../dashboard/totals';
import DashboardActivities from '../dashboard/activities';
import DashboardScholars from '../dashboard/scholars';

// CSS
import "../../../../assets/css/dashboard.css";

const TableDashboard = ({ year, sem }) => {

  return (
    <div className="dashboard">
      <div className="dash-items">
        <DashboardTotals year={year} sem={sem}/>
      </div>

      {/** Line chart for displaying yearly data **/}
      <div className='dash-data'>
        <div className='dash-graph'>
          <div className="chart-container">
            <h2>Scholars</h2>
            <DashboardScholars year={year} sem={sem}/>
          </div>
          <div className='activities'>
            <h2>Activities</h2>
            <DashboardActivities year={year} sem={sem}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
