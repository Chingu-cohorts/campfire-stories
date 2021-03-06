import axios from '../utils/axios'
import { browserHistory } from "react-router";

import errorHandler from './utils';

import {
  GET_CONTENT,
  GET_USERS_AWAIT,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  UPDATE_USER_AWAIT,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  REMOVE_USER_AWAIT,
  REMOVE_USER_FAIL,
  REMOVE_USER_SUCCESS,
  REGISTER_USER_AWAIT,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  SWITCH_VIEW
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

/**
 * Get Users Actions
 */

export const getUsersAwait = () => ({ type: GET_USERS_AWAIT });

export const getUsersSuccess = (page, pages, data) =>
  ({ type: GET_USERS_SUCCESS, page, pages, data })

export function getUsersAxios(dispatch, page, limit) {
  dispatch(getUsersAwait());
  return axios.get(`/api/admin/users?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .then(data => ({
      ...data,
      users: data.users.map(user => ({
        ...user,
        isFetching: false,
        error: null
      }))
    }))
    .then(({ pages, users }) => dispatch(getUsersSuccess(page, pages, users)))
    .catch(err => errorHandler(dispatch, err, GET_USERS_FAIL))
    .catch(console.error);
}

export const getUsers = (page=1, limit=10) =>
  dispatch => getUsersAxios(dispatch, page, limit);

export const registerUserAwait = () => ({ type: REGISTER_USER_AWAIT });

export const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS });

export const shouldRegisterUser = state => !state.admin.register.isFetching;

export function registerUserAxios(dispatch, userData) {
  dispatch(registerUserAwait());
  return axios.post('/api/auth/register', userData)
    .then(() => dispatch(registerUserSuccess()))
    .then(() => browserHistory.push('/admin'))
    .catch(err => errorHandler(dispatch, err, REGISTER_USER_FAIL))
    .catch(console.error);
}

export const registerUser = userData => (dispatch, getState) => {
  if (shouldRegisterUser(getState())) registerUserAxios(dispatch, userData);
};

export const updateUserAwait = _id => ({ type: UPDATE_USER_AWAIT, _id });

export const updateUserSuccess = (_id, user) => ({ type: UPDATE_USER_SUCCESS, _id, user });

export const shouldUpdateUser = (state, id) =>
  state.admin.users.data.some(user => user._id === id && !user.isFetching);

export function updateUser(dispatch, id) {
  dispatch(updateUserAwait(id));
  return axios.put(`/api/auth/user?id=${id}`)
    .then(res => res.data.user)
    .then(user => dispatch(updateUserSuccess(id, user)))
    .catch(err => errorHandler(dispatch, err, UPDATE_USER_FAIL, id))
    .catch(console.error);
}

export const switchRoles = id => (dispatch, getState) => {
  if (shouldUpdateUser(getState(), id)) updateUser(dispatch, id);
};

export const removeUserAwait = _id => ({ type: REMOVE_USER_AWAIT, _id });

export const removeUserSuccess = _id => ({ type: REMOVE_USER_SUCCESS, _id});

export function removeUser(dispatch, id) {
  dispatch(removeUserAwait(id));
  return axios.delete(`/api/auth/user?id=${id}`)
    .then(() => dispatch(removeUserSuccess(id)))
    .catch(err => errorHandler(dispatch, err, REMOVE_USER_FAIL, id))
    .catch(console.error);
}

export const deleteUser = id => (dispatch, getState) => {
  if (shouldUpdateUser(getState(), id)) removeUser(dispatch, id);
};
