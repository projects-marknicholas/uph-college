import React, { useEffect, useState } from 'react';
import { fetchTotals } from '../../../../api/dashboard';

const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  if (num < 1000) return num.toString();

  const units = ['k', 'M', 'B', 'T'];
  const index = Math.floor(Math.log(num) / Math.log(1000));
  const formattedNum = (num / Math.pow(1000, index)).toFixed(1);

  return `${formattedNum}${units[index - 1]}`;
};

const DashboardTotals = ({ year, sem }) => {
  const [totalsData, setTotalsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTotals(year, sem);

        if (response.status === 'success') {
          setTotalsData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, sem]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="item">
        <div className="dash-head">
          <p>Pending Applications</p>
          <span>{totalsData.pending_percentage_change}%</span>
        </div>
        <div className="dash-main">{formatNumber(totalsData.total_pending_applications)}</div>
        <div className="dash-foot">
          <p>vs last sem</p>
          <span>{formatNumber(totalsData.pending_difference)}</span>
        </div>
      </div>

      <div className="item">
        <div className="dash-head">
          <p>Accepted Applications</p>
          <span>{totalsData.accepted_percentage_change}%</span>
        </div>
        <div className="dash-main">{formatNumber(totalsData.total_accepted_applications)}</div>
        <div className="dash-foot">
          <p>vs last sem</p>
          <span>{formatNumber(totalsData.accepted_difference)}</span>
        </div>
      </div>

      <div className="item">
        <div className="dash-head">
          <p>Referrals</p>
          <span>0%</span>
        </div>
        <div className="dash-main">null</div>
        <div className="dash-foot">
          <p>vs last sem</p>
          <span>null</span>
        </div>
      </div>

      <div className="item">
        <div className="dash-head">
          <p>Roles</p>
          <span>{totalsData.roles_percentage_change}%</span>
        </div>
        <div className="dash-main">{formatNumber(totalsData.total_roles)}</div>
        <div className="dash-foot">
          <p>vs last sem</p>
          <span>{formatNumber(totalsData.roles_difference)}</span>
        </div>
      </div>

      <div className="item">
        <div className="dash-head">
          <p>Scholarship Types</p>
          <span>{totalsData.scholarship_types_percentage_change}%</span>
        </div>
        <div className="dash-main">{formatNumber(totalsData.total_scholarship_types)}</div>
        <div className="dash-foot">
          <p>vs last sem</p>
          <span>{formatNumber(totalsData.scholarship_types_difference)}</span>
        </div>
      </div>
    </>
  );
};

export default DashboardTotals;
