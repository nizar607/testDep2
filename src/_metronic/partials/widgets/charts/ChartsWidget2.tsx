import React, { useEffect, useState, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import axios from 'axios';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
};

const ChartsWidget2: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chart, setChart] = useState<ApexCharts | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/users`);
        if (chartRef.current) {
          const chartOptions = getChartOptions(chartRef.current.offsetHeight, response.data);
          if (chart) {
            chart.updateOptions(chartOptions);
          } else {
            const newChart = new ApexCharts(chartRef.current, chartOptions);
            newChart.render();
            setChart(newChart);
          }
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [mode]); 

  const getChartOptions = (height: number, users: any[]): ApexOptions => {
   
    const rolesCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(rolesCount);
    const series = Object.values(rolesCount);

    return {
      chart: {
        type: 'pie',
        height: height
      },
      series: series as ApexAxisChartSeries,
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  };

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>User Roles Distribution</span>
          <span className='text-muted fw-semibold fs-7'>Overview of user roles</span>
        </h3>
      </div>
      <div className='card-body'>
        <div ref={chartRef} id='kt_charts_widget_2_chart' style={{ height: '350px' }} />
      </div>
    </div>
  );
};

export { ChartsWidget2 };
