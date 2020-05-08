import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {getData} from './utils/helper';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './Style/App.css';

//get's the initial data from the  DATA database and sets them as the initial state
let initialState = getData();
const store = createStore(rootReducer, applyMiddleware(thunk), initialState);
console.log(store.getState());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
