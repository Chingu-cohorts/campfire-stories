import axios from '../utils/axios'
import cookie from "react-cookie"
import { browserHistory } from "react-router"

import { errorHandler } from './utils'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_USER, USER_CREATED, USER_CREATE_AWAIT } from './types'

function authenticateAndSetRole(response, dispatch) {
  cookie.save('token', response.data.token, { path: '/' })
  cookie.save('user', response.data.user, { path: '/'})
  dispatch({type: AUTH_USER})
  dispatch({
    type: SET_USER,
    fullName: `${response.data.user.firstName} ${response.data.user.lastName}`,
    role: response.data.user.role
  })
  browserHistory.push('/')
}

export function userCreateAwait() {
  return {
    type: USER_CREATE_AWAIT
  }
}

export function userCreated() {
  return {
    type: USER_CREATED
  }
}

export function registerUser(userData) {
  return dispatch => {
    dispatch(userCreateAwait())
    return axios.post('/api/auth/register', userData)
    .then((resp) => {
      //  this only gets called with 200 codes
      dispatch(userCreated())
    })
    .catch((err) => {
      errorHandler(dispatch, err, AUTH_ERROR)
    })
  }
}

export function loginUser(data) {
  const token = cookie.load('token')
  if (!token) {
    return dispatch => {
      return axios.post('/api/auth/login', data)
      .then((resp) => {
        authenticateAndSetRole(resp, dispatch)
      })
      .catch((err) => {
        errorHandler(dispatch, err, AUTH_ERROR)
      })
    }
  }

  browserHistory.push('/')
}

export function logoutUser() {
  const token = cookie.load('token')
  if (token) {
    // const user = cookie.load('user')
    return dispatch => {
      cookie.remove('token', { path: '/' })
      cookie.remove('user', { path: '/' })
      dispatch({type: UNAUTH_USER})
      browserHistory.push('/login')
    }
  }

  browserHistory.push('/au/login')
}
