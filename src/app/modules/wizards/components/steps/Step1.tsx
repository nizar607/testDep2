/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC , useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {ErrorMessage, Field ,useFormikContext } from 'formik'
import { ICreateAccount } from '../CreateAccountWizardHelper';

const Step1: FC = () => {

  const [tournamentlogo, setTournamentLogo] = useState<File | null>(null);
  const { setFieldValue } = useFormikContext<ICreateAccount>();
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          Setup your Tournament
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title='Elimination is issued based on your selected Tournament type'
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

      

      
       {/* Tournament Logo */}
       <div className='mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-100px me-5'>
                        <div className='symbol-label' >
                          {tournamentlogo ? (
                            // Display the selected logo
                            <img src={URL.createObjectURL(tournamentlogo)} alt='Tournament Logo' className='h-100 w-100' />
                          ) : (
                            // Display a default logo or placeholder image
                            <KTIcon iconName='plus' className='fs-2hx' />
                          )}
                        </div>
                      </div>

                      <div>
                      <Field
                            type='file'
                            className='form-control form-control-lg form-control-solid'
                            name='tournamentLogo'
                            accept='image/*'
                            value={undefined}
                            onChange={(event) => {
                              setTournamentLogo(event.currentTarget.files[0]);
                              setFieldValue('tournamentLogo', event.currentTarget.files[0]);
                              console.log(event.currentTarget.files[0]);
                            }}
                          />


                        <div className='text-danger mt-2'>
                      <ErrorMessage name='tournamentLogo' />
                    </div>
                      </div>
                    </div>
 
     </div>





      


      

      
     

      <div className='mb-10 fv-row'>
        <label className='form-label mb-3'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
                          Tournament Name
                    <i
                          className='fas fa-exclamation-circle ms-2 fs-7'
                      data-bs-toggle='tooltip'
                      title='Tournament Name'
                    ></i>
        </h2>
          
        </label>

        <Field
          type='text'
          className='form-control form-control-lg form-control-solid'
          name='tournamentName'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='tournamentName' />
        </div>
      </div>

      <div className='mb-0 fv-row'>
        <label className='d-flex align-items-center form-label mb-5'>
          Select Tournament Level
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            
          ></i>
        </label>

        <div className='mb-0'>
          <label className='d-flex flex-stack mb-5 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                <i className='fas fa-globe fs-1 text-gray-600'></i>
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  International
                </span>
                <span className='fs-6 fw-bold text-gray-400'>
                Global tournament with diverse participation.
                </span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-check-input form-control' type='radio' name='tournamentLevel' value='international' />
            </span>
          </label>

          <label className='d-flex flex-stack mb-5 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                <i className='fas fa-flag-usa fs-1 text-gray-600'></i>
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                National
                </span>
                <span className='fs-6 fw-bold text-gray-400'>Nationwide tournament representing country</span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-control form-check-input' type='radio' name='tournamentLevel'  value='national' />
            </span>
          </label>

          <label className='d-flex flex-stack mb-0 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                <i className='fas fa-map-marked-alt fs-1 text-gray-600'></i>
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  Regional
                </span>
                <span className='fs-6 fw-bold text-gray-400'>
                 Tournament within specific geographic area
                </span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-control form-check-input' type='radio' name='tournamentLevel'   value='regional' />
            </span>
          </label>
          <div className='text-danger mt-2'>
          <ErrorMessage name='tournamentLevel' />
        </div>
        </div>
      </div>

      
    </div>
  )
}

export {Step1}
