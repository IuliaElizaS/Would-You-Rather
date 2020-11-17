import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

//enables Redux Dev Tools and trace for actions
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });
const composeEnhancers = enhancer || compose;

const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk)));
console.log(store.getState());

export default store;