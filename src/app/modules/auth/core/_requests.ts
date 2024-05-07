import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user/verify_token`
export const LOGIN_URL = `${API_URL}/user/login`
export const REGISTER_URL = `${API_URL}/user/register`
export const REGISTER_URLGOOGLE =  `${API_URL}/user/registergoogle`
export const REQUEST_PASSWORD_URL = `${API_URL}/user/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })
}


// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return AuthModel
export function registergoogle(
  email: string,
  firstname: string,
  lastname: string,
  googleToken?:any,
  password?: string,
  password_confirmation?: string,
  

) {
  return axios.post(REGISTER_URLGOOGLE, {
    email,
    first_name: firstname,
    last_name: lastname,
    googleToken,
    password,
    password_confirmation,
    
  })
}


export function requestPassword(email: string) {
  return axios.post('http://localhost:3001/user/forgot-password', { email });
  
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
