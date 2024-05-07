import React from 'react';
import { KTIcon } from '../../../helpers';
import { toAbsoluteUrl } from '../../../helpers';

// Assuming the Tournament interface is defined elsewhere and imported
interface Tournament {
  _id: string;
  tournamentLogo?: string;
  tournamentName: string;
  tournamentLevel: string;
  country?: string;
  tournamentStartDate?: Date;
  tournamentEndDate?: Date;
  tournamentSexe: string;
  divisions: string[];
  status: string;
  createdBy: string;
}

type Props = {
  className?: string;
  color?: string;
  tournament: Tournament; // Accept a single tournament as a prop
};

const formatDate = (date?: Date) => date ? new Date(date).toLocaleDateString() : 'N/A';

const MixedWidget1: React.FC<Props> = ({ className, color = 'primary', tournament }) => {
  return (
    <div className={`card ${className}`}>
      {/* Begin::Body */}
      <div className='card-body p-0'>
        {/* Begin::Header with dynamic background image or default */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
            <h3 className='m-0 text-white fw-bold fs-3'>{tournament.tournamentName}</h3>
            <div className='d-flex text-center flex-column text-white pt-8'>
              <img
                src={`${process.env.REACT_APP_API_URL}/${tournament.tournamentLogo?.replace(/\\/g, '/')}`}
                style={{ height: '80px', width: '80px', objectFit: 'cover',marginLeft:'38%' , borderRadius: '50%' }} // Adjusts image size and style
                alt={`${tournament.tournamentName} logo`}
                
              />
              <span className='fw-bold fs-2x pt-1'>{tournament.tournamentLevel}</span>
              <br />
            </div>
          </div>

        {/* End::Header */}
        {/* Begin::Items with tournament details */}
        <div className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body' style={{ marginTop: '-80px' }}>
          <div className='d-flex align-items-center mb-6'>
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                {/* Icon for tournament sex */}
                {tournament.tournamentSexe === 'male' ? (
                      <i className='fas fa-male fs-3x me-5'></i>
                    ) : tournament.tournamentSexe === 'female' ? (
                      <i className='fas fa-female fs-3x me-5'></i>
                    ) : null}
              </span>
            </div>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                {/* Date range */}
                <div className='fs-5 text-gray-800 fw-bold'>
                  {`${formatDate(tournament.tournamentStartDate)} - ${formatDate(tournament.tournamentEndDate)}`}
                </div>
                {/* Status */}
                <div className={`text-${tournament.status === 'completed' ? 'success' : 'warning'} fw-semibold fs-7`}>{tournament.status}</div>
              </div>
              {/* Divisions */}
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>{tournament.divisions.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
        {/* End::Items */}
      </div>
      {/* End::Body */}
    </div>
  );
};

export { MixedWidget1 };
