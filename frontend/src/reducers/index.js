import {combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_USER,
  POST_DELETED,
  COMMENT_DELETED,
  RECEIVE_COMMENTS,
  SORT_POSTS,
} from '../actions'

function categories(state={},action){
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const categories=action.categories
      const newState=JSON.parse(JSON.stringify(state))
      categories.forEach(category=>{
          const newCategory=JSON.parse(JSON.stringify(category))
          newState[newCategory.path]=newCategory
      })
      return newState
    default:
      return state
  }
}

function posts(state={},action){
  switch(action.type){
    case RECEIVE_POSTS:{
      const posts=action.posts
      const newState=JSON.parse(JSON.stringify(state))
      posts.forEach(post=>{
          const newPost=JSON.parse(JSON.stringify(post))
          delete newPost.comments
          newState[post.id]=newPost
      })
      return newState
    }
    case POST_DELETED:{
      let id=action.id;
      return {
        ...state,
        [id]:{
          ...state[id],
          deleted:true
        }
      }
    }
    default:
      return state
  }
}

function comments(state={},action){
  switch(action.type){
    case RECEIVE_COMMENTS:{
      const comments=action.comments
      const newState=JSON.parse(JSON.stringify(state))
      comments.forEach(comment=>{
          newState[comment.id]=JSON.parse(JSON.stringify(comment))
      })
      return newState
    }
    case COMMENT_DELETED:{
      let id=action.id;
      return {
        ...state,
        [id]:{
          ...state[id],
          deleted:true
        }
      }
    }
  default:
    return state
  }
}

function user(state={},action){
  switch (action.type) {
    case RECEIVE_USER:
      return{
        ...action.user
      }
    default:
      return state
  }
}


function sorts(state={"field":"SCORE","ascending":false},action){
  switch (action.type) {
    case SORT_POSTS:
      return{
        field:action.field,
        ascending:!state.ascending
      }
    default:
      return state
  }
}

export default combineReducers({categories,posts,comments,sorts,user,})
