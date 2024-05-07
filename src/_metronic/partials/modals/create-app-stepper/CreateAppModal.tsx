/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {defaultCreateAppData, ICreateAppData} from './IAppModels'
import {StepperComponent} from '../../../assets/ts/components'
import {KTIcon} from '../../../helpers'
import {Step1} from './steps/Step1'

import axios from 'axios'

type Props = {
  show: boolean
  handleClose: () => void
  tournamentId: string | null; 
  refreshTournaments: () => void;
  onSuccessfulUpdate?: () => void;
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateAppModal = ({show, handleClose, tournamentId,refreshTournaments,onSuccessfulUpdate}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData)
  const [hasError, setHasError] = useState(false)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const checkAppBasic = (): boolean => {
    if (!data.appBasic.appName || !data.appBasic.appType) {
      return false
    }
    return true
  }

  const checkAppDataBase = (): boolean => {
    if (!data.appDatabase.databaseName || !data.appDatabase.databaseSolution) {
      return false
    }

    return true
  }

  useEffect(() => {
    const findone = async () => {
      if (!tournamentId) 
      return;
    {
        try {
          
          const response = await axios.get(`http://localhost:3001/tournament/tournament/${tournamentId}`);
          if (response.status === 200) {
            console.log(tournamentId);
            const { tournament } = response.data;
            const transformedData: ICreateAppData = {
              appBasic: {
                appName: tournament.tournamentName,
                appType: 'Quick Online Courses',
                divisions: tournament.divisions,
                tournamentSexe:tournament.tournamentSexe,
                tournamentLevel:tournament.tournamentLevel,
                tournamentLogo:tournament.tournamentLogo,
                tournamentLogoPreview:''
               

              },
              appFramework: 'HTML5',
              appDatabase: {
                databaseName: tournament.tournamentName,
                databaseSolution: 'MySQL',
              },
              appStorage: 'Basic Server',
            };
            setData(transformedData);
          } else {
            throw new Error('Failed to fetch the tournament');
          }
        } catch (error) {
          console.error('Failed to fetch tournament:', error);
          setHasError(true);
        }
      }
    };

    if (show) {
      findone();
    }
  }, [show,tournamentId]);


  const handleSubmit = async () => {
    if (!tournamentId) {
      console.error('No tournament ID provided for update.');
      return; 
    }
  
    try {
      // Create a FormData object
      const formData = new FormData();
      // Append the file if it exists
      if (data.appBasic.tournamentLogo instanceof File) {
        formData.append('tournamentLogo', data.appBasic.tournamentLogo);
      }

      // Append other fields
      formData.append('tournamentName', data.appBasic.appName);
      formData.append('divisions', data.appBasic.divisions);
      formData.append('tournamentSexe', data.appBasic.tournamentSexe);
      formData.append('tournamentLevel', data.appBasic.tournamentLevel);
      // Note: You don't need to append tournamentLogoPreview as it's just for client-side preview

      const response = await axios.put(`http://localhost:3001/tournament/tournament/${tournamentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Tournament updated successfully:', response.data);
        refreshTournaments(); 
        handleClose(); 
        if (onSuccessfulUpdate) {
          onSuccessfulUpdate(); 
        }
      } else {
        throw new Error(`Failed to update the tournament. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to update tournament:', error);
      setHasError(true);
    }
  };

  

  
  

  const submit = () => {
    window.location.reload()
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Create App</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
         

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <Step1 data={data} updateData={updateData} hasError={hasError} />
             

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  
                </div>
                <div>
                <button
  type="button"
  className="btn btn-lg btn-primary"
  onClick={handleSubmit}
>
  Submit <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
</button>


                
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateAppModal}
