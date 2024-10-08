import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ScholarAnalytics } from '../../../../api/dashboard';

// Register the components needed for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardScholars = ({ year, sem }) => {
  const [admissionsData, setAdmissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarData = async () => {
      setLoading(true);
      const response = await ScholarAnalytics(year, sem);

      if (response.status === 'success') {
        setAdmissionsData(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchScholarData();
  }, [year, sem]);

  const data = useMemo(() => {
    const monthlyData = [
      admissionsData.january || 0,
      admissionsData.february || 0,
      admissionsData.march || 0,
      admissionsData.april || 0,
      admissionsData.may || 0,
      admissionsData.june || 0,
      admissionsData.july || 0,
      admissionsData.august || 0,
      admissionsData.september || 0,
      admissionsData.october || 0,
      admissionsData.november || 0,
      admissionsData.december || 0,
    ];

    return {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      datasets: [
        {
          label: 'Monthly Admissions',
          data: monthlyData,
          fill: true,
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(127, 20, 22, 0.2)');
            gradient.addColorStop(1, 'rgba(127, 20, 22, 0)');
            return gradient;
          },
          borderColor: 'rgba(127, 20, 22, 1)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(127, 20, 22, 1)',
          pointBorderColor: '#fff',
          pointHoverRadius: 7,
          pointHoverBackgroundColor: 'rgba(127, 20, 22, 1)',
          tension: 0.4,
        },
      ],
    };
  }, [admissionsData]);

  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#333',
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
        title: {
          display: true,
          text: 'Scholars Analytics',
          color: '#333',
          font: {
            size: 18,
            weight: 'bold',
          },
          padding: {
            top: 20,
            bottom: 30,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleFont: { size: 16 },
          bodyFont: { size: 14 },
          padding: 10,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#666',
            font: {
              size: 12,
            },
          },
        },
        y: {
          grid: {
            color: 'rgba(127, 20, 22, 0.1)',
          },
          ticks: {
            color: '#666',
            font: {
              size: 12,
            },
          },
        },
      },
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default DashboardScholars;
