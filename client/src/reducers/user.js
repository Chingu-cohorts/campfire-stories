import {
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_AWAIT,
  DEAUTH_USER
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
    case DEAUTH_USER:
      return initialState;
    default:
      return state
  }
}
