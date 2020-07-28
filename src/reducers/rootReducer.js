import {combineReducers} from 'redux';
import {questionsR} from './questionsR';
import {usersR} from './usersR';

const rootReducer = combineReducers({
  users: usersR,
  questions: questionsR,
  })

export default rootReducer;