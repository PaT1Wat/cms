const { combineReducers } = require('redux');
import auth from './auth';
import content from './content';
import media from './media';
import users from './users';

export default combineReducers({
  auth,
  content,
  media,
  users
});