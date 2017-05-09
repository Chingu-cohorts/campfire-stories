import { default as axios, updateAxios } from '../utils/axios';
import cookie from "react-cookie";
import { browserHistory } from "react-router";

import errorHandler from './utils';
import { 
  AUTH_USER_AWAIT, 
  AUTH_USER_SUCCESS, 
  AUTH_USER_FAIL, 
  DEAUTH_USER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_AWAIT } from './types';

export const authUserAwait = () => ({ type: AUTH_USER_AWAIT });

export const authUserSuccess = ({ firstName, lastName, role}) => ({
  type: AUTH_USER_SUCCESS,
  fullName: `${firstName} ${lastName}`,
  role: role
});

export const resetPasswordAwait = () => ({ type: RESET_PASSWORD_AWAIT });
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });

export const shouldAuthUser = state => !state.user.authenticated.isFetching;
export const shouldRequestPassword = state => !state.user.email.isFetching;

export const sendPasswordReset = (dispatch, data) => {
  dispatch(resetPasswordAwait());
  axios.post('/api/auth/reset_password', data)
    .then(() => {
      dispatch(resetPasswordSuccess());
    })
    .then(() => browserHistory.push('/'))
    .catch(err => errorHandler(dispatch, err, RESET_PASSWORD_FAIL))
    .catch(console.error);
}

export function authUser(dispatch, data) {
  dispatch(authUserAwait());
  axios.post('/api/auth/login', data)
    .then(res => res.data)
    .then(({ token, user }) => {
      updateAxios(token, user);
      dispatch(authUserSuccess(user));
    })
    .then(() => browserHistory.push('/'))
    .catch(err => errorHandler(dispatch, err, AUTH_USER_FAIL))
    .catch(console.error);
}

export function loginUser(data) {
  const token = cookie.load('token');
  if (token) return browserHistory.push('/');
  return (dispatch, getState) => {
    if (shouldAuthUser(getState())) authUser(dispatch, data);
  }
}

export function requestPasswordReset(data) {
  return (dispatch, getState) => {
    if (shouldRequestPassword(getState())) sendPasswordReset(dispatch, data);
  }
}

export function logoutUser() {
  const token = cookie.load('token')
  if (token) {
    // const user = cookie.load('user')
    return dispatch => {
      cookie.remove('token', { path: '/' })
      cookie.remove('user', { path: '/' })
      dispatch({type: DEAUTH_USER})
      browserHistory.push('/login')
    }
  }

  browserHistory.push('/au/login')
}

export function changePassword(data) {
  let endpoint = (data.isToken) ? '/api/auth/new_password' : '/api/auth/change_password'
  return dispatch => {
    return axios.post(endpoint, data)
      .then(browserHistory.push('/'))
      .catch(console.error);
  };
}
