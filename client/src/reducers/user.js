import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_AWAIT,
  DEAUTH_USER,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_AWAIT
} from 'actions/types';

const initialState = {
  name: null,
  role: 'Guest', // Writer, Admin, Guest
  authenticated: {
    isAuthenticated: false,
    isFetching: false,
    error: null
  },
  email: {
    isFetching: false,
    error: null
  },
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
    case DEAUTH_USER:
      return initialState;
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        email: {
          isFetching: false,
          error: null
        }
      };
    case RESET_PASSWORD_AWAIT:
      return {
        ...state,
        email: {
          ...state.email,
          isFetching: true
        }
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        email: {
          isFetching: false,
          error: action.error
        }
      };
    default:
      return state
  }
}
