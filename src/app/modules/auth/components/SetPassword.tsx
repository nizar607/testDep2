import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'

const initialValues = {
  newPassword: '',
}

const setPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

export function SetPassword() {
  const { email } = useParams<{ email: string }>();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    validationSchema: setPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      setHasErrors(undefined);
      axios.put(`http://localhost:3001/user/change-password/${email}`, { newPassword: values.newPassword })
        .then(({data}) => {
          setHasErrors(false);
          setLoading(false);
          setStatus(data.message || 'Password updated successfully.');
        })
        .catch((error) => {
          setHasErrors(true);
          setLoading(false);
          setSubmitting(false);
          setStatus(error.response.data.message || 'An unexpected error occurred. Please try again.');
        });
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Set New Password</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Enter your new password below.
        </div>
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            Sorry, looks like there are some errors detected, please try again.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>Password updated successfully.</div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>New Password</label>
        <input
          type='password'
          {...formik.getFieldProps('newPassword')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.newPassword && formik.errors.newPassword},
            {
              'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
            }
          )}
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.newPassword}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Login
          </button>
        </Link>{' '}
      </div>
    </form>
  )
}