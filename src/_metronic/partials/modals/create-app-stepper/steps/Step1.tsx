/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import {KTIcon} from '../../../../../_metronic/helpers'
import {StepProps} from '../IAppModels'

const Step1 = ({data, updateData, hasError}: StepProps) => {
  
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
   
    setImagePreviewUrl(data.appBasic.tournamentLogoPreview || `http://localhost:3001/${data.appBasic.tournamentLogo}`);
  }, [data.appBasic.tournamentLogoPreview, data.appBasic.tournamentLogo]); 
  
  
  return (
    <div className='current' data-kt-stepper-element='content'>
      <div className='w-100'>

    {/* Début: Groupe de formulaire pour le logo du tournoi */}
<div className='fv-row mb-10'>
  <label className='form-label'>Tournament Logo</label>
  <input
    type='file'
    className='form-control'
    name='tournamentLogo'
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const logoURL = URL.createObjectURL(file);
        
        setImagePreviewUrl(logoURL);
        // Mise à jour de l'état avec l'URL de prévisualisation et le nom du fichier
        updateData({
          appBasic: {
            ...data.appBasic,
            tournamentLogoPreview: logoURL, 
            tournamentLogo: file, 
          },
        });
      }
    }}
  />
  {data.appBasic.tournamentLogo && (
    <div className='mt-3'>
      
      <img src={imagePreviewUrl} alt='Tournament Logo' style={{ width: '100px' }} />

    </div>
  )}
</div>
{/* Fin: Groupe de formulaire pour le logo du tournoi */}


      



        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Tournament Name</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='appname'
            placeholder=''
            value={data.appBasic.appName}
            onChange={(e) =>
              updateData({
                appBasic: {
                  appName: e.target.value,
                  appType: data.appBasic.appType,
                  divisions:data.appBasic.divisions,
                  tournamentSexe:data.appBasic.tournamentSexe,
                  tournamentLevel:data.appBasic.tournamentLevel,
                  tournamentLogo:data.appBasic.tournamentLogo,
                  tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                },
              })
            }
          />
          {!data.appBasic.appName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                App name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}




              {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Divisions</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='appname'
            placeholder=''
            value={data.appBasic.divisions}
            onChange={(e) =>
              updateData({
                appBasic: {
                  appName: data.appBasic.appName,
                  appType: data.appBasic.appType,
                  divisions:e.target.value,
                  tournamentSexe:data.appBasic.tournamentSexe,
                  tournamentLevel:data.appBasic.tournamentLevel,
                  tournamentLogo:data.appBasic.tournamentLogo,
                  tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                },
              })
            }
          />
          {!data.appBasic.appName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                App name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}



  {/*begin::Form Group */}
  <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>Tournament Sexe</span>

            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Select your app category'
            ></i>
          </label>
          {/* end::Label */}
          <div>
            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-primary'>
                    <KTIcon iconName='compass' className='fs-1 text-primary' />
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>Male</span>
                  
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='tournamentSexe'
                  value='male'
                  checked={data.appBasic.tournamentSexe === 'male'}
                  onChange={() =>
                    updateData({
                      appBasic: {
                        appName: data.appBasic.appName,
                        appType: data.appBasic.appType,
                        divisions:data.appBasic.divisions,
                        tournamentSexe:'male',
                        tournamentLevel:data.appBasic.tournamentLevel,
                        tournamentLogo:data.appBasic.tournamentLogo,
                        tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-danger'>
                    <KTIcon iconName='category' className='fs-1 text-danger' />
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>Female</span>
                 
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='tournamentSexe'
                  value='female'
                  checked={data.appBasic.tournamentSexe === 'female'}
                  onChange={() =>
                    updateData({
                      appBasic: {
                        appName: data.appBasic.appName,
                        appType: data.appBasic.appType,
                        divisions:data.appBasic.divisions,
                        tournamentSexe:'female',
                        tournamentLevel:data.appBasic.tournamentLevel,
                        tournamentLogo:data.appBasic.tournamentLogo,
                        tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
           
            {/*end::Option */}
          </div>
        </div>
        {/*end::Form Group */}




        <div className='fv-row'>
          {/* begin::Label */}
          <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
            <span className='required'>
Tournament Level</span>

            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Select your app category'
            ></i>
          </label>
          {/* end::Label */}
          <div>
            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-primary'>
                    <KTIcon iconName='abstract-27' className='fs-1 text-primary' />
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>national</span>
                  
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='tournamentLevel'
                  value='national'
                  checked={data.appBasic.tournamentLevel === 'national'}
                  onChange={() =>
                    updateData({
                      appBasic: {
                        appName: data.appBasic.appName,
                        appType: data.appBasic.appType,
                        divisions:data.appBasic.divisions,
                        tournamentSexe:data.appBasic.tournamentLevel,
                        tournamentLevel:'national',
                        tournamentLogo:data.appBasic.tournamentLogo,
                        tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-danger'>
                    <KTIcon iconName='abstract-33' className='fs-1 text-danger' />
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>international</span>
                 
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='tournamentLevel'
                  value='international'
                  checked={data.appBasic.tournamentLevel === 'international'}
                  onChange={() =>
                    updateData({
                      appBasic: {
                        appName: data.appBasic.appName,
                        appType: data.appBasic.appType,
                        divisions:data.appBasic.divisions,
                        tournamentSexe:data.appBasic.tournamentSexe,
                        tournamentLevel:'international',
                        tournamentLogo:data.appBasic.tournamentLogo,
                        tournamentLogoPreview:data.appBasic.tournamentLogoPreview,
                      },
                    })
                  }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
           
            {/*end::Option */}
          </div>
        </div>
        {/*end::Form Group */}



      
      </div>
    </div>
  )
}

export {Step1}
