import { FC } from "react";
import {KTIcon} from '../../../../../_metronic/helpers'
import { Field  , ErrorMessage} from 'formik'


const Step1Horizentale:FC = () => {
    return (
        <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          <h2 className='fw-bolder d-flex align-items-center text-dark'>
            Choose Division Type
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Billing is issued based on your selected account type'
            ></i>
          </h2>
          
  
          <div className='text-gray-400 fw-bold fs-6'>
            If you need more info, please check out
            <a href='/dashboard' className='link-primary fw-bolder'>
              {' '}
              Help Page
            </a>
            
            .
          </div>
        </div>
  
        <div className='fv-row'>
          <div className='row'>
            <div className='col-lg-6'>
              <Field
                type='radio'
                className='btn-check'
                name='tournamentType'
                value='singlematch'
                id='kt_select_form_division_type_singlematch'
              />
              <label
                className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                htmlFor='kt_select_form_division_type_singlematch'
              >
                <KTIcon iconName='address-book' className='fs-3x me-5' />
  
                <span className='d-block fw-bold text-start'>
                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Single Match Elimination</span>
                  <span className='text-gray-400 fw-bold fs-6'>
                    winner-takes-all showdowns, with each match deciding who
                     advances to the next round and who is eliminated
                     
                  </span>
                </span>
              </label>
            </div>
  
            <div className='col-lg-6'>
              <Field
                type='radio'
                className='btn-check'
                name='tournamentType'
                value='championship'
                id='kt_select_form_division_type_championship'
              />
              <label
                className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center'
                htmlFor='kt_select_form_division_type_championship'
              >
                <KTIcon iconName='cross' className='fs-3x me-5' />
  
                <span className='d-block fw-bold text-start'>
                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>Championship </span>
                  <span className='text-gray-400 fw-bold fs-6'>
                  The tournament winner is determined by the team that accumulates the highest
                   number of points throughout the duration of the competition <br /> <br />
                  </span>
                </span>
              </label>
            </div>
  
            <div className='text-danger mt-2'>
              <ErrorMessage name='tournamentType' />
            </div>
          </div>

          <div className='col-lg-12 '>
              <Field
                type='radio'
                className='btn-check'
                name='tournamentType'
                value='mixed'
                id='kt_select_form_division_type_mixed'
              />
              <label
                className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                htmlFor='kt_select_form_division_type_mixed'
              >
                <KTIcon iconName='address-book' className='fs-3x me-5' />
  
                <span className='d-block fw-bold text-start'>
                  <span className='text-dark fw-bolder d-block fs-4 mb-2'>mixed </span>
                  <span className='text-gray-400 fw-bold fs-6'>
                  began with a group stage based on points, advancing the top two teams from each 
                  group and the best third-placers to the knockout stage. <br />In this stage the 
                  teams who looses the match will be eliminated and the winner will advance to the next round 
                  </span>
                </span>
              </label>
            </div>
        </div>

        
      </div>
    )
}

export {Step1Horizentale};