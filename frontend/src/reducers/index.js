import {combineReducers } from 'redux'

import {
  RECEIVE_POSTS,
  POST_DELETED,
  COMMENT_DELETED,
  RECEIVE_COMMENTS,
  SORT_POSTS,
} from '../actions'

function categories(state={},action){
  return state
}

function posts(state={},action){
  switch(action.type){
    case RECEIVE_POSTS:{
      const posts=action.posts
      const newState=JSON.parse(JSON.stringify(state))
      posts.forEach(post=>{
          newState[post.id]=post
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

function sorts(state={},action){
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

export default combineReducers({categories,posts,comments,sorts,})
