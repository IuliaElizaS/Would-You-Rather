import {combineReducers} from 'redux'
import {questionsR} from './questionsR';
import {usersR} from './usersR';

const rootReducer = combineReducers({
    usersR,
    questionsR,
  })

export default rootReducer;