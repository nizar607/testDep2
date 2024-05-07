import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  className: string;
  description: string;
  color: string;
  img: string;
};

const CardsWidget20 = ({ className, description, color, img }: Props) => {
  
  const [tournamentCount, setTournamentCount] = useState<number | null>(null);
  const safeTournamentCount = tournamentCount ?? 0;

  useEffect(() => {

    const fetchTournamentsCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tournament/tournaments/count');
       
        setTournamentCount(response.data.count);
      } catch (error) {
        console.error('Error fetching tournament count:', error);
        setTournamentCount(null);
      }
    };

    fetchTournamentsCount();
  }, []);


  let progressBarPercentage = 0;
if (safeTournamentCount >= 3) {
  progressBarPercentage = 90;
} else if (safeTournamentCount <= 2) {
  progressBarPercentage = 70;
} else if (safeTournamentCount === 1) {
  progressBarPercentage = 50;
}

  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
      
          <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>{tournamentCount ?? 'Loading...'}</span>
          <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>{description}</span>
        </div>
      </div>
      <div className='card-body d-flex align-items-end pt-0'>
        <div className='d-flex align-items-center flex-column mt-3 w-100'>
          <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
       
            <span>43 Pending</span>
            <span>{progressBarPercentage}%</span>
          </div>

          <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
            <div
              className='bg-white rounded h-8px'
              role='progressbar'
              style={{ width: `${progressBarPercentage}%` }}
              aria-valuenow={progressBarPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardsWidget20 };
