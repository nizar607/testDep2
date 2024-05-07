import React, { useEffect, useState, useRef } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import axios from 'axios'; // Import Axios
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';
import { Dropdown1 } from '../../content/dropdown/Dropdown1';
import { KTIcon } from '../../../helpers';

type Props = {
  className: string;
};

const ChartsWidget1: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chart, setChart] = useState<ApexCharts | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tournament/tournamentsAdmin`);
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
        console.error('Failed to fetch tournaments:', error);
      }
    };

    fetchTournaments();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [mode]); 




  const getChartOptions = (height: number, tournaments: any[]): ApexOptions => {
    const categories = tournaments.map((t: any) => t.tournamentName);
    const divisionsData = tournaments.map(t => {
      if (Array.isArray(t.divisions)) {
        return t.divisions.reduce((total, divisionString) => {
          const divisionCount = (divisionString.match(/,/g) || []).length + 1;
          return total + divisionCount;
        }, 0);
      } else {
       
        return 0;
      }
    });
    


    return {
      chart: {
        type: 'bar',
        height: height
      },
      series: [
        {
          name: 'Divisions',
          data: divisionsData,
        },
      ],
      xaxis: {
        categories: categories,
      },
    };
  };

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Tournaments</span>
          <span className='text-muted fw-semibold fs-7'>Tournaments By Divisions</span>
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
      <div className='card-body'>
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{ height: '350px' }} />
      </div>
    </div>
  );
};

export { ChartsWidget1 };
