/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { Dropdown1 } from '../../content/dropdown/Dropdown1'
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { verifyDivision, verifyDivisionChampion } from '../../../../services/DivisionService';

type Props = {
  Divisions: any[]
}

type DivisionType = {
  tournamentType: string;
  PlayerPerTeam: number | null;
  ExtraTime: boolean;
  NumberTeams: number | null;
  MatchDuration: number | null;
  teams?: { name: string, logo: string, location: string }[];
  // add other properties of division here...
};

const TablesWidget1: React.FC<Props> = ({ Divisions }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [currentDivision, setCurrentDivision] = useState<DivisionType | null>(null);
  console.log(currentDivision)


  const handleCheckClick = (division) => {
    setCurrentDivision(division);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };



  const handleMixedStatus = async (divisionId) => {
    await verifyDivision(divisionId);
    navigate(`/setuptournament/mixedTournamentMatchesConfig/${divisionId}`);
  }

  const handleChampionStatus = async (divisionId) => {
    navigate(`/setuptournament/ChampionshipStatus/${divisionId}`);
  }

  const handleChampionMatchs = async (divisionId) => {
    navigate(`/setuptournament/ChampionshipMatchs/${divisionId}`);
  }


  return (
    <div className='card'>

      {/** appear popup modal division details */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Division Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Tournament Type:</strong> {(currentDivision as any)?.tournamentType}</li>
              <li className="list-group-item"><strong>Player Per Team:</strong> {(currentDivision as any)?.PlayerPerTeam}</li>
              <li className="list-group-item"><strong>Extra Time:</strong> {(currentDivision as any)?.ExtraTime ? 'Yes' : 'No'}</li>
              <li className="list-group-item"><strong>Number of Teams:</strong> {(currentDivision as any)?.NumberTeams}</li>
              <li className="list-group-item"><strong>Match Duration:</strong> {(currentDivision as any)?.MatchDuration}</li>
            </ul>
          </div>
          <div className="row">
            {currentDivision && currentDivision.teams && currentDivision?.teams?.map((team, index) => (
              <div className="col-md-4 mt-3" key={index}>
                <div className="card border-primary">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Name:</strong> {team.name}</li>
                    <li className="list-group-item"><strong>Location:</strong> {team.location}</li>

                    {team.logo && (
                      <li className="list-group-item">
                        <img src={`${process.env.REACT_APP_API_URL}/${team.logo.replace(/\\/g, '/')}`} style={{ width: '100px', height: '100px' }} alt='' />
                      </li>
                    )}

                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/** end of the modal pop up division details */}
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>List of Divisions</span>
          <span className='text-muted fw-semibold fs-7'>{Divisions?.length} divisions on this tournament</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          {/* begin::Menu 1 */}
          <Dropdown1 />
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-5'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-200px'></th>
                <th className='p-0 min-w-100px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {Divisions?.map((division, index) => (
                <tr key={index}>
                  <th>
                    <div className='symbol symbol-50px me-2'>
                      <span className='symbol-label'>
                        <img
                          src={toAbsoluteUrl('/media/custom icon/tournament.png')} // replace this with the division logo

                          className='h-50 align-self-center'
                          alt=''
                        />
                      </span>
                    </div>
                  </th>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      Division : {division.name}
                    </a>
                    <span className='text-muted fw-semibold d-block fs-7'>{division.status}</span>
                  </td>
                  <td>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>{division.status === 'pending' ? '20%' : division.status === 'progress' ? '70%' : '100%'}</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{ width: division.status === 'pending' ? '20%' : division.status === 'progress' ? '70%' : '100%' }}
                        // if status is completed 100% (add teams players and games and schedule games and add scores and stats and awards  and sponsors
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className='text-end'>
                    {(division.status === 'progress' || division.status === 'completed') ? (
                      <>
                        <button className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary' onClick={() => handleCheckClick(division)}>
                          <KTIcon iconName='check' className='fs-2' />
                        </button>


                        <Link
                          to={'/team'}
                          state={division}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-3'
                        >
                          <i className="fa-solid fa-people-group"></i>
                        </Link>



                        {division.tournamentType === 'singlematch' && division.status !== 'completed' &&
                          <Link to={`/setuptournament/matchconfig/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                            <KTIcon iconName='arrow-right' className='fs-2' />
                          </Link>}

                        {division.tournamentType === 'mixed' && division.status !== 'completed' &&
                          <>
                            {division?.stages?.length > 0 ?
                              // <Link to={`/setuptournament/mixedTournamentMatchesConfig/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                              //   <KTIcon iconName='arrow-right' className='fs-2' />
                              // </Link>
                              <button onClick={() => handleMixedStatus(division._id)} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                                <KTIcon iconName='arrow-right' className='fs-2' />
                              </button>
                              :
                              <Link to={`/setuptournament/mixedTournamentGroupsConfig/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                                <KTIcon iconName='arrow-right' className='fs-2' />
                              </Link>
                            }
                          </>
                        }

                        {division.tournamentType === 'championship' && division.status !== 'completed' &&
                          <Link to={`/setuptournament/championship/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                            <KTIcon iconName='arrow-right' className='fs-2' />
                          </Link>
                        }
                      </>
                    ) : (
                      <Link to={`/setuptournament/divisionconfig/${division._id}/${division.tournament}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                        <KTIcon iconName='arrow-right' className='fs-2' />
                      </Link>
                    )}

                    {division.status === 'completed' && division.tournamentType === 'singlematch' &&
                      <Link to={`/setuptournament/bracket/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3 me-3'>
                        <KTIcon iconName='eye' className='fs-2 ' />
                      </Link>
                    }

                    {division.status === 'completed' && division.tournamentType === 'mixed' &&
                      <Link to={`/setuptournament/mixedTournamentMatchesConfig/${division._id}`} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                        <KTIcon iconName='eye' className='fs-2 ' />
                      </Link>
                    }

                    {division.status === 'completed' && division.tournamentType === 'championship' &&
                      <button onClick={() => handleChampionStatus(division._id)} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                        <KTIcon iconName='eye' className='fs-2 ' />
                      </button>

                    }

              <button onClick={() => handleChampionMatchs(division._id)} className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary ms-3'>
                        <KTIcon iconName='user' className='fs-2 ' />
                      </button>

                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    </div >
  )
}

export { TablesWidget1 }
