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
  STORY_ERROR,
  HANDLE_STORY_BODY,
  EMPTY_BODY
} from 'actions/types';

// mockData for development only.
// reset initialState.current to [] and uncomment switch case below
  // when connected to database
// import mockData from '../__mocks__/mockData'

const initialState = {
  current: {
    stories: [],
    pages: 1,
    page: 1,
    isFetching: false,
    error: null
  },
  submitted: {
    stories: [],
    isFetching: false,
    error: null
  },
  currentStory: {
    story: null,
    isFetching: false,
    error: null
  },
  newStory: {
    isFetching: false,
    error: null
  },
  update: {
    isFetching: false,
    error: null
  },
  delete: {
    isFetching: false,
    error: null
  },
  error: null,
  body: ''
};

export default function stories_reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_STORY_AWAIT:
      return {
        ...state,
        newStory: {
          ...state.newStory,
          isFetching: true
        }
      };
    case ADD_STORY_FAIL:
      return {
        ...state,
        newStory: {
          isFetching: false,
          error: action.error
        }
      };
    case ADD_STORY_SUCCESS:
      return {
        ...state,
        newStory: {
          isFetching: false,
          error: null
        }
      };
    case FETCH_STORIES_AWAIT:
      return {
        ...state,
        current: {
          ...state.current,
          isFetching: true
        }
      };
    case FETCH_STORIES_FAIL:
      return {
        ...state,
        current: {
          ...state.current,
          isFetching: false,
          error: action.error
        }
      }
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        current: {
          stories: action.stories,
          page: action.page,
          pages: action.pages,
          isFetching: false,
          error: null
        }
      };
    case UPDATE_STORY_AWAIT:
      return {
        ...state,
        update: {
          ...state.update,
          isFetching: true
        }
      };
    case UPDATE_STORY_FAIL:
      return {
        ...state,
        update: {
          isFetching: false,
          error: action.error
        }
      };
    case UPDATE_STORY_SUCCESS:
      return {
        ...state,
        update: {
          isFetching: false,
          error: null
        }
      };
    case DELETE_STORY_AWAIT:
      return {
        ...state,
        delete: {
          ...state.delete,
          isFetching: true
        }
      };
    case DELETE_STORY_FAIL:
      return {
        ...state,
        delete: {
          isFetching: false,
          error: action.error
        }
      };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        delete: {
          isFetching: false,
          error: null
        }
      };
    case STORY_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case GET_MY_STORIES_AWAIT:
      return {
        ...state,
        submitted: {
          ...state.submitted,
          isFetching: true
        }
      };
    case GET_MY_STORIES_FAIL:
      return {
        ...state,
        submitted: {
          ...state.submitted,
          isFetching: false,
          error: action.error
        }
      };
    case GET_MY_STORIES_SUCCESS:
      return {
        ...state,
        submitted: {
          stories: action.stories,
          isFetching: false,
          error: null
        }
      };
    case HANDLE_STORY_BODY:
      return {
        ...state,
        body: action.payload
      }
    case EMPTY_BODY:
      return {
        ...state,
        body: ''
      }
    case FETCH_STORY_AWAIT:
      return {
        ...state,
        currentStory: {
          ...state.currentStory,
          isFetching: true
        }
      };
    case FETCH_STORY_FAIL:
      return {
        ...state,
        currentStory: {
          ...state.currentStory,
          isFetching: false,
          error: action.error
        }
      };
    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        currentStory: {
          story: action.story,
          isFetching: false,
          error: null
        }
      };
    default:
      return state;
  }
}
