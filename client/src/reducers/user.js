import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_AWAIT,
  UNAUTH_USER,
  SET_USER_ROLE,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  name: null,
  role: 'Guest', // Writer, Admin, Guest
  authenticated: {
    isAuthenticated: false,
    isFetching: false,
    error: null
  }
}

export default function auth_reducer(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        name: action.fullName,
        role: action.role,
        authenticated: {
          isAuthenticated: true,
          isFetching: false,
          error: null
        }
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        authenticated: {
          isAuthenticated: false,
          isFetching: false,
          error: action.error
        }
      };
    case AUTH_USER_AWAIT:
      return {
        ...state,
        authenticated: {
          ...state.authenticated,
          isAuthenticated: false,
          isFetching: true
        }
      };
    case UNAUTH_USER:
      return {
        ...state,
        role: 'Guest',
        authenticated: initialState.authenticated,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
