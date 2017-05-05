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
  SWITCH_VIEW
} from 'actions/types';

const initialState = {
  data: [],
  page: 1,
  pages: 1,
  isFetching: false,
  view: 'users', // one of users, stories
  error: null
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
        isFetching: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        page: action.page,
        pages: action.pages,
        isFetching: false,
        error: null
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case UPDATE_USER_AWAIT:
    case REMOVE_USER_AWAIT:
      return {
        ...state,
        data: updateUser(
          state.data,
          action._id,
          { isFetching: true }
        )
      };
      case UPDATE_USER_FAIL:
      case REMOVE_USER_FAIL:
        return {
          ...state,
          error: action.error,
          data: updateUser(
            state.data,
            action._id,
            {
              error: action.error,
              isFetching: false
            }
          )
        }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: updateUser(
          state.data,
          action._id,
          { ...action.user, isFetching: false }
        )
      };
      case REMOVE_USER_SUCCESS:
        return {
          ...state,
          data: state.data.filter(user => user._id !== action._id)
        }
      case SWITCH_VIEW:
        return {
          ...state,
          view: action.payload
        }
    default:
      return state;
  }
}
