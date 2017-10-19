import {combineReducers } from 'redux'

import {
  REQUEST_POST,
  RECEIVE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST,
  UPDATE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT
} from '../actions'


const initialCategories={
    java:{
      name: 'java',
      path: 'java'
    },
    javascript:{
      name: 'javascript',
      path: 'javascript'
    },
    python:{
      name: 'python',
      path: 'python'
    }
  }
  const initialPosts={
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    }
  }
  const initialComments={
    "894tuq4ut84ut8v4t8wun89g": {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
      id: '8tu4bsun805n8un48ve89',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    }
  }

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
    case ADD_POST:{
      let {id}=action.post;
      return {
        ...state,
        [id]:{
          ...action.post
        }
      }
    }
    case UPDATE_POST:{
      let {id}=action.post;
      return {
        ...state,
        [id]:{
          ...state[id],
          ...action.post,
        }
      }
    }
    case DELETE_POST:{
      let {id}=action.post;
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
