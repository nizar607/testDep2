import React, { FC } from 'react';
import { Field, ErrorMessage } from 'formik';




const Step3: FC = () => {
 
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>Tournament Dvisions</h2>

        <div className='text-gray-400 fw-bold fs-6'>
          If you need more info, please check out
          <a href='/dashboard' className='link-primary fw-bolder'>
            {' '}
            Help Page
          </a>
          .
        </div>
      </div>

      {/* Division Selection */}
<div className='fv-row mb-10'>
  <label className='form-label col-lg-8 col-form-label fw-bold fs-6'>
    <h2 className='fw-bolder d-flex align-items-center text-dark'>
      Select your Tournament Division(s)
    </h2>
  </label>

  <div className='d-flex flex-column'>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U23' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>  Under-23 (U23)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U21' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-21 (U21)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U19' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-19 (U19)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U17' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-17 (U17)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U15' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-15 (U15)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U13' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-13 (U13)</span>
    </label>
    <label className='form-check form-check-inline'>
      <Field type='checkbox' name='divisions' value='U11' className='form-check-input' />
      <span className='form-check-label fw-bold fs-5'>Under-11 (U11) and below</span>
    </label>
  </div>

  {/* Display error message if divisions field is touched and not selected */}
  <ErrorMessage name='divisions'>
    {errorMessage => (
      <div className='text-danger mt-2'>{errorMessage}</div>
    )}
  </ErrorMessage>
</div>

      

          
      

      
    </div>
  );
};

export { Step3 };
