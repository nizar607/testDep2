import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { getUserByToken, login } from '../core/_requests';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useAuth } from '../core/Auth';
import { on } from 'events';
import { gapi } from 'gapi-script';
import { useGoogleLogin } from '@react-oauth/google'; 
import axios from 'axios';







const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
};





export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: authData } = await login(values.email, values.password);
        console.log('Auth data:', authData);
        saveAuth(authData);
        const { data: user } = await getUserByToken(authData.api_token);
        console.log('User:', user);
        setCurrentUser(user);

        setLoading(false);
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The login details are incorrect');
        setSubmitting(false);
        setLoading(false);

        if ((error as any).response && (error as any).response.status === 403) {
          setStatus('You are banned');
        } else {
          setStatus('The login details are incorrect');
        }
      }
    },
  });

  const onSuccess = async (response) => {
    console.log('Google login successful', response);
    try {
      const { data } = await axios.post('http://localhost:3001/user/google-login', {
        code: response.code, 
      });
      console.log('Google login data:', data.token);
      console.log('Google login user:', data.user);
      if (data.token) {
        localStorage.setItem('token', data.token); 
        
        saveAuth(data); 
        const { data: user } = await getUserByToken(data.token);
        console.log('User:', user);
        setCurrentUser(user); 
        
  
        setLoading(false);
        alert('Login successful');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Login failed. Please try again.');
    }
  };

 /* localStorage.setItem('token', data.api_token);
        console.log(data.user);
        saveAuth(data);
      
        setCurrentUser(data.user);
        alert(Connexion réussie. Bienvenue ${data.user.name} !);

  
  */
  


  const onFailure = () => {
    console.log('Login failed');
    alert("Failed to login with Google.");
  };

  // Initialisation du login Google
  const googleLogin = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onFailure,
    flow: 'auth-code',
  });
  
  return (
    <form className='form w-100' onSubmit={formik.handleSubmit} noValidate id='kt_login_signin_form'>
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}
      <div className='row g-3 mb-9'>
        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <div id="signInButton">
          <button type="button" onClick={googleLogin} className="btn btn-primary">
        Sign in with Google
      </button>
      </div>
          {/* end::Google link */}
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <a
            href='/hello'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            />
            Sign in with Apple
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}
      </div>
      {/* end::Login options */}

      {/* begin::Separator */}
      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span>
      </div>
      {/* end::Separator */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
            continue.
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

     

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}