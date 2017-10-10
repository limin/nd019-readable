import {ADD_POST,ADD_COMMENT,UPDATE_POST,UPDATE_COMMENT,DELETE_POST,DELETE_COMMENT,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions'
import {combineReducers} from 'redux'

const initialState={
  posts:{},
  comments:{},
}


function post(state=initialState,action){
  let {id}=action.post;
  switch(action.type){
    case ADD_POST:
      return {
        ...state,
        posts:{
          [id]:{
            ...action.post
          }
        }
      }
    case UPDATE_POST:
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            ...action.post,
          }
        }
      }
    case DELETE_POST:
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            deleted:true
          }
        }
      }
    default:
      return state
  }
}

function comment(state=initialState,action){
  let {id}=action.comment;
  switch(action.type){
    case ADD_COMMENT:
    return {
      ...state,
      comments:{
        [id]:{
          ...action.comment
        }
      }
    }
  case UPDATE_COMMENT:
    return {
      ...state,
      posts:{
        [id]:{
          ...state.comments[id],
          ...action.comment,
        }
      }
    }
  case DELETE_COMMENT:
    return {
      ...state,
      posts:{
        [id]:{
          ...state.comments[id],
          deleted:true
        }
      }
    }
  default:
    return state
}

function vote(state=initialState,action){
  swith(action.type){
    case UP_VOTE_POST:
      return {
        ...state,
        posts:{
          [action.id]:{
            ...state.posts[id],
            voteScore:state.posts[id].voteScore+1
          }
        }
      }
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts:{
          [action.id]:{
            ...state.posts[id],
            voteScore:state.posts[id].voteScore-1
          }
        }
      }
    default:
      return state
  }
}

export default combineReducers({post,comment,vote})
