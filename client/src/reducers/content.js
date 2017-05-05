import {
  FETCH_STORIES,
  FETCH_STORY,
  STORY_ERROR,
  GET_MY_STORIES,
  HANDLE_STORY_BODY,
  EMPTY_BODY
} from 'actions/types';

// mockData for development only.
// reset initialState.current to [] and uncomment switch case below
  // when connected to database
// import mockData from '../__mocks__/mockData'

const initialState = {
  current: [],
  currentStory: null,
  submitted: [],
  storyPages: 1,
  storyPage: 1,
  error: null,
  body: ''
};

export default function stories_reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_STORIES:
      return {
        ...state,
        current: action.payload,
        storyPage: action.storyPage,
        storyPages: action.storyPages
      }
    case STORY_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case GET_MY_STORIES:
      return {
        ...state,
        submitted: action.payload
      }
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
    case FETCH_STORY:
      return {
        ...state,
        currentStory: action.payload
      }
    default:
      return state;
  }
}
