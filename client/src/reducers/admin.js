import {
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
} from 'actions/types';

const initialState = {
  users: {
    data: [],
    page: 1,
    pages: 1,
    isFetching: false,
    error: null,
  },
  register: {
    isFetching: false,
    error: null
  },
  view: 'users', // one of users, stories
};

const updateUser = (users, _id, status) =>
  users.map(user => user._id === _id
    ? { ...user, ...status }
    : user
  );

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case GET_USERS_AWAIT:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: true
        }
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: {
          data: action.data,
          page: action.page,
          pages: action.pages,
          isFetching: false,
          error: null
        }
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        users: {
          ...state.users,
          isFetching: false,
          error: action.error
        }
      };
    case REGISTER_USER_AWAIT:
     return {
       ...state,
       register: {
         ...state.register,
         isFetching: true
       }
     };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        register: {
          isFetching: false,
          error: action.error
        }
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        register: {
          isFetching: false,
          error: null
        }
      };
    case UPDATE_USER_AWAIT:
    case REMOVE_USER_AWAIT:
      return {
        ...state,
        users: {
          ...state.users,
          data: updateUser(
            state.users.data,
            action._id,
            { isFetching: true }
          )
        }
      };
      case UPDATE_USER_FAIL:
      case REMOVE_USER_FAIL:
        return {
          ...state,
          users: {
            ...state.users,
            data: updateUser(
              state.users.data,
              action._id,
              { error: action.error, isFetching: false }
            )
          }
        };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: updateUser(
            state.users.data,
            action._id,
            { ...action.user, isFetching: false }
          )
        }
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.filter(user => user._id !== action._id)
        }
      };
    case SWITCH_VIEW:
      return {
        ...state,
        view: action.payload
      };
    default:
      return state;
  }
}
