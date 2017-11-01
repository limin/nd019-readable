import {combineReducers } from 'redux'

import {
  RECEIVE_POSTS,
  POST_DELETED,
  ADD_COMMENT,
  RECEIVE_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
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
    case UP_VOTE_POST:{
      let {id}=action.id
      return {
        ...state,
        [id]:{
          ...state[id],
          voteScore:state[id].voteScore+1
        }
      }
    }
    case DOWN_VOTE_POST:{
      let {id}=action.id
      return {
        ...state,
        [id]:{
          ...state[id],
          voteScore:state[id].voteScore-1
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
          newState[comment.id]=comment
      })
      return newState
    }
    case ADD_COMMENT:{
      let {id}=action.comment;
      return {
        ...state,
        [id]:{
          ...action.comment
        }
      }
    }
  case UPDATE_COMMENT:{
    let {id}=action.comment;
    return {
      ...state,
      [id]:{
        ...state[id],
        ...action.comment,
      }
    }
  }
  case DELETE_COMMENT:{
    let {id}=action.comment;
    return {
      ...state,
      [id]:{
        ...state[id],
        deleted:true
      }
    }
  }
    case UP_VOTE_COMMENT:{
      let {id}=action.id
      return {
        ...state,
        [id]:{
          ...state[id],
          voteScore:state[id].voteScore+1
        }
      }
    }
    case DOWN_VOTE_COMMENT:{
      let {id}=action.id
      return {
        ...state,
        [id]:{
          ...state.comments[id],
          voteScore:state[id].voteScore-1
        }
      }
    }
  default:
    return state
  }
}

export default combineReducers({categories,posts,comments,})
