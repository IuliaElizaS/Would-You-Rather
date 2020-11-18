import {combineReducers} from 'redux';
import {commonR} from './commonR';
import {questionsR} from './questionsR';
import {usersR} from './usersR';

const rootReducer = combineReducers({
  commonR,
  usersR,
  questionsR,
  })

export default rootReducer;