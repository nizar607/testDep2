import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';

type Tournament = {
  _id: string;
  tournamentName: string;
  divisions: string[];
  tournamentLogo: string;
};

type Props = {
  className: string;
  chartColor: string;
  chartHeight: string;
};

const MixedWidget8: React.FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/tournament/tournamentsAdmin');
        const processedTournaments = data
          .map(tournament => ({
            ...tournament,
            divisionCount: tournament.divisions[0].split(',').length,
          }))
          .sort((a, b) => b.divisionCount - a.divisionCount);

        setTournaments(processedTournaments.slice(0, 10)); // Adjust based on how many you want for the chart

        const chartCategories = processedTournaments.map(t => t.tournamentName);
        const chartSeries = [{ name: 'Division Count', data: processedTournaments.map(t => t.divisionCount) }];

        if (chartRef.current) {
          const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight, chartCategories, chartSeries, chartColor));
          chart.render();
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    fetchTournaments();
  }, [mode, chartColor, chartHeight]);

  const chartOptions = (chartHeight, categories, series, chartColor) => ({
    series,
    chart: {
      height: chartHeight,
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: [chartColor],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [chartColor], // Adjust as needed
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories,
    },
    // Additional customization as needed
  });

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 py-5'>
        {/* Header Content Here */}
      </div>

      <div className='card-body d-flex flex-column'>
        <div ref={chartRef} className='mixed-widget-8-chart'></div>
        
        {/* Displaying top 3 tournaments */}
        <div className='mt-5'>
          {tournaments.slice(0, 3).map((tournament) => (
            <div key={tournament._id} className='d-flex align-items-center mb-5'>
              <div className='symbol symbol-50px me-5'>
                <img src={`http://localhost:3001/${tournament.tournamentLogo}`} alt={tournament.tournamentName} style={{ width: '50px' }} />
              </div>
              <div>
                <a href='#' className='text-dark text-hover-primary fw-bold fs-6'>{tournament.tournamentName}</a>
                <span className='text-muted d-block fw-semibold'>Divisions: {tournament.divisions.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { MixedWidget8 };
