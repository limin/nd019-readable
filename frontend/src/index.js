import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose } from 'redux'
import {Provider} from 'react-redux'
import App from './components/App';
import reducer from './reducers'
import {config} from './config.js'
import registerServiceWorker from './registerServiceWorker';

const rendDom=(preloadedState)=>{
  	const loggerMiddleware = createLogger()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware,loggerMiddleware ))
    const store=createStore(reducer,preloadedState,enhancer)
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'));
    registerServiceWorker();
}

const categoryFetcher=fetch(`${config.API_BASE_URL}/categories`, config.FETCH_INIT_PARAM)
const postFetcher=fetch(`${config.API_BASE_URL}/posts`, config.FETCH_INIT_PARAM)
const commentsFetcher=fetch(`${config.API_BASE_URL}/comments`, config.FETCH_INIT_PARAM)

Promise.all([categoryFetcher,postFetcher,commentsFetcher]).then(responses=>{
  Promise.all([responses[0].json(),responses[1].json(),responses[2].json()]).then(values=>{
    let preloadedState={
      categories:values[0].categories,
      posts:values[1].reduce((map,post)=>{
        map[post.id]=post
        return map
      },{}),
      comments:values[2].reduce((map,comment)=>{
        map[comment.id]=comment
        return map
      },{}),
    }
	rendDom(preloadedState)
  })
})
