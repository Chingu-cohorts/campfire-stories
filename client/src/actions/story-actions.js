/*
 * Imports
 */
import axios from '../utils/axios'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'
import errorHandler from './utils'
import {
  ADD_STORY_AWAIT,
  ADD_STORY_FAIL,
  ADD_STORY_SUCCESS,
  FETCH_STORIES_AWAIT,
  FETCH_STORIES_FAIL,
  FETCH_STORIES_SUCCESS,
  FETCH_STORY_AWAIT,
  FETCH_STORY_FAIL,
  FETCH_STORY_SUCCESS,
  UPDATE_STORY_AWAIT,
  UPDATE_STORY_FAIL,
  UPDATE_STORY_SUCCESS,
  DELETE_STORY_AWAIT,
  DELETE_STORY_FAIL,
  DELETE_STORY_SUCCESS,
  GET_MY_STORIES_AWAIT,
  GET_MY_STORIES_FAIL,
  GET_MY_STORIES_SUCCESS,
  HANDLE_STORY_BODY,
  EMPTY_BODY
} from './types'

/*
 * Handle Post
 */

export const addStoryAwait = () => ({ type: ADD_STORY_AWAIT });

export const addStorySuccess = () => ({ type: ADD_STORY_SUCCESS });

export const shouldAddStory = state => !state.content.newStory.isFetching;

export function addStory (dispatch, data) {
  dispatch(addStoryAwait());
  return axios.post('/api/content/', data)
    .then(res => dispatch(addStorySuccess()))
    .then(() => browserHistory.push('/'))
    .catch(err => errorHandler(dispatch, err, ADD_STORY_FAIL))
    .catch(console.error);
}

export const addNewStory = data => (dispatch, getState) => {
    if (!shouldAddStory(getState())) return void 0;
    const user = cookie.load('user');
    data.postedBy = user._id;
    addStory(dispatch, data);
};

/*
 * Handle Get
 */
export const fetchStoriesAwait = () => ({ type: FETCH_STORIES_AWAIT });

export const fetchStoriesSuccess = (page, pages, stories) =>
  ({ type: FETCH_STORIES_SUCCESS, page, pages, stories });

export const shouldFetchStories = state => !state.content.current.isFetching;

export function fetchStories(dispatch, page, limit) {
  dispatch(fetchStoriesAwait());
  return axios.get(`/api/content/?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .then(({ pages, content }) => dispatch(fetchStoriesSuccess(page, pages, content)))
    .catch(err => errorHandler(dispatch, err, FETCH_STORIES_FAIL))
    .catch(console.error);
}

export const getContent = (page=1, limit=10) => (dispatch, getState) => {
  if (shouldFetchStories(getState())) fetchStories(dispatch, page, limit);
};

export const fetchStoryAwait = () => ({ type: FETCH_STORY_AWAIT });

export const fetchStorySuccess = story => ({ type: FETCH_STORY_SUCCESS, story });

export function fetchStory(dispatch, storyId) {
  dispatch(fetchStoryAwait());
  return axios.get(`/api/content/${storyId}`)
    .then(res => res.data)
    .then(({ story }) => dispatch(fetchStorySuccess(story)))
    .catch(err => errorHandler(dispatch, err, FETCH_STORY_FAIL))
    .catch(console.error);
}

export const getStory = storyId => dispatch => {
  fetchStory(dispatch, storyId);
};

/*
 * Update story
 */

export const updateStoryAwait = () => ({ type: UPDATE_STORY_AWAIT });

export const updateStorySuccess = () => ({ type: UPDATE_STORY_SUCCESS });

export const shouldUpdateStory = state => !state.content.update.isFetching;

export function updateStoryAxios(dispatch, data, id) {
  dispatch(updateStoryAwait());
  return axios.put(`/api/content?id=${id}`, data)
    .then(() => dispatch(updateStorySuccess()))
    .then(() => browserHistory.push('/'))
    .catch(err => errorHandler(dispatch, err, UPDATE_STORY_FAIL))
    .catch(console.error);
}

export const updateStory = (data, id) => (dispatch, getState) => {
  if (shouldUpdateStory(getState())) updateStoryAxios(dispatch, data, id);
};

export const deleteStoryAwait = () => ({ type: DELETE_STORY_AWAIT });

export const deleteStorySuccess = () => ({ type: DELETE_STORY_SUCCESS });

export const shouldDeleteStory = state => !state.content.delete.isFetching;

export function deleteStoryAxios(dispatch, id) {
  dispatch(deleteStoryAwait());
  return axios.delete(`/api/content?id=${id}`)
    .then(() => dispatch(deleteStorySuccess()))
    .then(() => browserHistory.push('/'))
    .catch(err => errorHandler(dispatch, err, DELETE_STORY_FAIL))
    .catch(console.error);
}

export const deleteStory = id => (dispatch, getState) => {
  if (shouldDeleteStory(getState())) deleteStoryAxios(dispatch, id);
};

/*
 * Get my Stories
 */

export const getMyStoriesAwait = () => ({ type: GET_MY_STORIES_AWAIT });

export const getMyStoriesSuccess = stories => ({ type: GET_MY_STORIES_SUCCESS, stories });

export const shouldGetMyStories = state => !state.content.submitted.isFetching;

export function getMyStoriesAxios(dispatch) {
  const user = cookie.load('user')
  dispatch(getMyStoriesAwait());

  return axios.get(`api/content/my?id=${user._id}`)
    .then(res => res.data)
    .then(({ story }) => dispatch(getMyStoriesSuccess(story)))
    .catch(err => errorHandler(dispatch, err, GET_MY_STORIES_FAIL))
    .catch(console.error)
}

export const getMyStories = () => (dispatch, getState) => {
  if (shouldGetMyStories(getState())) getMyStoriesAxios(dispatch);
};

export function emptyBody(){
  return {
    type: EMPTY_BODY
  }
}

export function handleStoryBody(payload){
  return {
    type: HANDLE_STORY_BODY,
    payload
  }
}
