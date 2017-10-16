import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import './index.css';
import App from './components/App';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const rendDom=(preloadedState)=>{
    const store=createStore(reducer,preloadedState)
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'));
    registerServiceWorker();                 
}


const init={ headers: { 'Authorization': 'udacity'},credentials: 'include', mode: 'cors', }
const categoryFetcher=fetch(`${process.env.REACT_APP_BACKEND}/categories`, init)
const postFetcher=fetch(`${process.env.REACT_APP_BACKEND}/posts`, init)
const commentFetcher=fetch(`${process.env.REACT_APP_BACKEND}/comments`, init)
Promise.all([categoryFetcher,postFetcher,commentFetcher]).then(responses=>{
  Promise.all([responses[0].json(),responses[1].json(),responses[2].json()).then(values=>{
    let preloadedState={
      categories:responses[0].json(),
      posts:responses[1].json(),
      comments:responses[2].json()
    }
	rendDom(preloadedState)
  })
})
  
