import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose } from 'redux'
import {Provider} from 'react-redux'
import {loadData} from './actions'
import App from './components/App';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const preloadedState={
  categories:{},
  posts:{},
  comments:{}
}
const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware,loggerMiddleware ))
const store=createStore(reducer,preloadedState,enhancer)
store.dispatch(loadData())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
