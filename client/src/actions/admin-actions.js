import axios from '../utils/axios'
import { browserHistory } from "react-router";

import { errorHandler } from './utils';

import {
  AUTH_ERROR,
  GET_CONTENT,
  GET_ALL_USERS,
  SWITCH_VIEW,
  REMOVE_USER,
  UPDATE_USER
} from './types'

/*
 * Helper
 */
export const getContent = (res) => {
  return {
    type: GET_CONTENT,
    payload: res.data.payload
  }
}

/*
 * Content Control
 */
export function switchView(payload) {
  return {
    type: SWITCH_VIEW,
    payload
  }
}
export function handleNotAdmin(errorMessage) {
  return {
    type: AUTH_ERROR,
    payload: errorMessage
  }
}

/*
 * User Control
 */

export function getUsers(page=1, limit=10) {
  return dispatch => {
    return axios.get(`/api/admin/users?page=${page}&limit=${limit}`, )
      .then( res => {
        dispatch({
          type: GET_ALL_USERS,
          userPage: page,
          userPages: res.data.pages,
          payload: res.data.users
        })
      })
  }
}

export function registerUser(userData) {
  return dispatch => {
    return axios.post('/api/auth/register', userData)
    .then((resp) => {
      //  this only gets called with 200 codes
      browserHistory.push('/admin')
    })
    .catch((err) => {
      errorHandler(dispatch, err, AUTH_ERROR)
    })
  }
}

export function deleteUser(id) {
  return dispatch => {
    return axios.delete(`/api/auth/user?id=${id}`)
    .then( () => {
          dispatch({
            type: REMOVE_USER,
            payload: id
          })
      })
  }
}

export function switchRoles(id) {
  return dispatch => {
    return axios.put(`/api/auth/user?id=${id}`)
      .then( (res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data.user
        })
      })
  }
}
