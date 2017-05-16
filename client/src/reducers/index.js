import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user  from './user';
import content from './content';
import admin from './admin';

var rootReducer = combineReducers({
  user,
  content,
  admin,
  form
});

export default rootReducer;
