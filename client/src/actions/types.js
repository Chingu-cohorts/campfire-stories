// Authentication specific actions
export const AUTH_USER_AWAIT = 'auth/AUTH_USER_AWAIT';
export const AUTH_USER_FAIL = 'auth/AUTH_USER_FAILURE';
export const AUTH_USER_SUCCESS = 'auth/AUTH_USER_SUCCESS';
export const DEAUTH_USER = 'auth/DEAUTH_USER';

// ADMIN specific actions
export const SET_USER_ROLE = 'set_user_role';
export const SET_USER = 'set_user';
export const GET_USERS_AWAIT = 'admin/GET_USERS_AWAIT';
export const GET_USERS_FAIL = 'admin/GET_USERS_FAIL';
export const GET_USERS_SUCCESS = 'admin/GET_USERS_SUCCESS';
export const UPDATE_USER_AWAIT = 'admin/UPDATE_USER_AWAIT';
export const UPDATE_USER_FAIL = 'admin/UPDATE_USER_FAIL';
export const UPDATE_USER_SUCCESS = 'admin/UPDATE_USER_SUCCESS';
export const REMOVE_USER_AWAIT = 'admin/REMOVE_USER_AWAIT';
export const REMOVE_USER_FAIL = 'admin/REMOVE_USER_FAIL';
export const REMOVE_USER_SUCCESS = 'admin/REMOVE_USER_SUCCESS';

// Story management actions
export const APPROVE_STORY = 'approve_story';
export const STORY_ERROR = 'story_error';
export const FETCH_STORIES = 'fetch_stories';
export const FETCH_STORY = 'fetch_story';
export const GET_COUNT = 'get_count';
export const GET_CONTENT = 'get_pending';
export const SWITCH_VIEW = 'switch_view';
export const REMOVE_CURRENT = 'remove_current';
export const GET_MY_STORIES = 'get_my_stories';
export const HANDLE_STORY_BODY = 'update_story_body';
export const EMPTY_BODY = 'empty_body';
export const FETCH_PENDING_STORIES = 'fetch_pending_stories';
