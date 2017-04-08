import axios from '../utils/axios'
import {
  AUTH_ERROR,
  GET_CONTENT,
  GET_ALL_USERS,
  SWITCH_VIEW,
  REMOVE,
  UPADTE_USER
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

export function deleteUser(id) {
  return dispatch => {
    return axios.delete(`/api/auth/user?id=${id}`)
    .then( () => {
          dispatch({
            type: REMOVE,
            payload: id
          })
      })
  }
}

export function switchRoles(id) {
  return dispath => {
    return axios.put(`/api/auth/user?id=${id}`)
    .then( (res) => {
      dispath({
        type: UPADTE_USER,
        payload: res.data.user
      })
    })

  }
}
