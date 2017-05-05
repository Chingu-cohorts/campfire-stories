import { default as axios, updateAxios } from '../utils/axios';
import cookie from "react-cookie";
import { browserHistory } from "react-router";

import errorHandler from './utils';
import { AUTH_USER_AWAIT, AUTH_USER_SUCCESS, AUTH_USER_FAIL, DEAUTH_USER } from './types';

export const authUserAwait = () => ({ type: AUTH_USER_AWAIT });

export const authUserSuccess = ({ firstName, lastName, role}) => ({
  type: AUTH_USER_SUCCESS,
  fullName: `${firstName} ${lastName}`,
  role: role
});

export const shouldAuthUser = state => !state.user.authenticated.isFetching;

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
  return dispatch => {
    return axios.post('/api/auth/change_password', data)
      .then(browserHistory.push('/'))
      .catch(console.error);
  };
}
