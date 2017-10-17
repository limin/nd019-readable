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
Promise.all([categoryFetcher,postFetcher]).then(responses=>{
  Promise.all([responses[0].json(),responses[1].json()]).then(values=>{
    let preloadedState={
      categories:values[0].categories,
      posts:values[1].reduce((map,post)=>{
        map[post.id]=post
        return map
      },{}),
    }
	rendDom(preloadedState)
  })
})
  
