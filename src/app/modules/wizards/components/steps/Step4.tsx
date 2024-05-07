import React, {FC , useState} from 'react'
import {ErrorMessage, Field , useFormikContext} from 'formik'
import { ICreateAccount } from '../CreateAccountWizardHelper';

const Step4: FC = () => {

  const [enableExtraTime, setEnableExtraTime] = useState(false);
  const { setFieldValue } = useFormikContext<ICreateAccount>();

  const handleExtraTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableExtraTime(event.target.checked);
    setFieldValue('ExtraTime', event.target.checked);
    console.log(event.target.checked);
  };
  


  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Tournament Rules</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          If you need more info, please check out
          <a href='/dashboard' className='text-primary fw-bolder'>
            {' '}
            Help Page
          </a>
          .
        </div>
      </div>

      <div className='d-flex flex-column mb-7 fv-row'>
        <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
        <span className=''>
        <i className='fas fa-user fa-4x'></i>
      </span>  

          <span className='required ms-5'>Number of player per Team</span>
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title="Specify a card holder's name"
          ></i>
        </label>

        <Field
          type='number'
          className='form-control form-control-solid'
          placeholder='enter number of player per team ...'
          name='PlayerPerTeam'
          value={undefined}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='PlayerPerTeam' />
        </div>
       </div>

        <br />

            <div className='d-flex flex-stack mt-5'>
                  <div className='me-5'>
                    <label className='fs-6 fw-bold form-label'>Do you want to assign extra Time in the Tournament?</label>
                    <div className='fs-7 fw-bold text-gray-400'>
                      Extra time is added for tied matches only!
                    </div>
                  </div>

                  <label className='form-check form-switch form-check-custom form-check-solid'>
                  <Field
                          className='form-check-input'
                          type='checkbox'
                          checked={enableExtraTime}
                          onChange={handleExtraTimeChange}
                          name='ExtraTime'
                        />

                    <span className='form-check-label fw-bold text-gray-400'>Enable Extra Time</span>
                  </label>
                </div>

        <br /> <br />

        <div className='d-flex flex-column mb-7 fv-row'>
           <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
           <span className=''>
            <i className='fas fa-users fa-4x'></i>
          </span>
          <span className='required ms-5'>Number of Teams</span>
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title="Specify a card holder's name"
          ></i>
          </label>

          <Field
          type='number'
          className='form-control form-control-solid'
          placeholder='enter number of teams ...'
          name='NumberTeams'
          value={undefined}
          />
          <div className='text-danger mt-2'>
          <ErrorMessage name='NumberTeams' />
        </div>

        

        
      </div>


            <br />

            <div className='d-flex flex-column mb-7 fv-row'>
           <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
           <label className='fs-6 fw-bold form-label'>
            <i className='fas fa-clock fa-4x'></i>
          </label>
          <span className='required ms-5'>Match Duration (minutes)</span>
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            
          ></i>
          </label>

          <Field
          type='number'
          className='form-control form-control-solid'
          placeholder='enter match duration in minutes ...'
          name='MatchDuration'
          value={undefined}
          />
          <div className='text-danger mt-2'>
          <ErrorMessage name='MatchDuration' />
        </div>

        

        
      </div>





      

     
    </div>
  )
}

export {Step4}
