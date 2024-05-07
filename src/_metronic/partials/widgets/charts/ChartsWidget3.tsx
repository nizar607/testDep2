import React, { useEffect, useState, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import axios from 'axios';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';
import { getCSSVariableValue } from '../../../assets/ts/_utils';
import { Dropdown1 } from '../../content/dropdown/Dropdown1';
import { KTIcon } from '../../../helpers';

type Props = {
  className: string;
};

const ChartsWidget3: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chart, setChart] = useState<ApexCharts | null>(null);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
      
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/division/divisionsAdmin`);
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
        console.error('Failed to fetch divisions:', error);
      }
    };

    fetchDivisions();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [mode]);

  const getChartOptions = (height: number, divisions: any[]): ApexOptions => {
    const categories = divisions.map((division: any) => division.name);

    const seriesData = divisions.map(division => division.teams.length);

    
    const baseColor = getCSSVariableValue('--bs-info'); 
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const labelColor = getCSSVariableValue('--bs-gray-500');

    return {
      series: [{
        name: 'Teams',
        data: seriesData,
      }],
      chart: {
        type: 'line',
        height: height,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [baseColor],
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: labelColor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
          },
        },
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
      },
      colors: [baseColor],
      markers: {
        strokeColors: baseColor,
        strokeWidth: 3,
      },
   
    };
  };

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Teams</span>
          <span className='text-muted fw-semibold fs-7'>Overview Of teams By Division</span>
        </h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          <Dropdown1 />
        </div>
      </div>
      <div className='card-header border-0 pt-5'>
        {/* Entête du composant */}
      </div>
      <div className='card-body'>
        <div ref={chartRef} id='line_chart_widget' style={{ height: '350px' }}></div>
      </div>
    </div>
  );
};

export { ChartsWidget3 };
