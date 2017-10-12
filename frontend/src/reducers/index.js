import {combineReducers } from 'redux'

import {
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


const initialState={
  categories:{
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
  },
  posts:{
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
  },
  comments:{
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
  },
}


function post(state=initialState,action){
  switch(action.type){
    case ADD_POST:{
      let {id}=action.post;
      return {
        ...state,
        posts:{
          [id]:{
            ...action.post
          }
        }
      }
    }
    case UPDATE_POST:{
      let {id}=action.post;
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            ...action.post,
          }
        }
      }
    }
    case DELETE_POST:{
      let {id}=action.post;
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            deleted:true
          }
        }
      }
    }
    default:
      return state
  }
}

function comment(state=initialState,action){
  switch(action.type){
    case ADD_COMMENT:{
      let {id}=action.comment;
      return {
        ...state,
        comments:{
          [id]:{
            ...action.comment
          }
        }
      }
    }
  case UPDATE_COMMENT:{
    let {id}=action.comment;
    return {
      ...state,
      posts:{
        [id]:{
          ...state.comments[id],
          ...action.comment,
        }
      }
    }
  }
  case DELETE_COMMENT:{
    let {id}=action.comment;
    return {
      ...state,
      posts:{
        [id]:{
          ...state.comments[id],
          deleted:true
        }
      }
    }
  }
  default:
    return state
  }
}

function vote(state=initialState,action){
  switch(action.type){
    case UP_VOTE_POST:{
      let {id}=action.id
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            voteScore:state.posts[id].voteScore+1
          }
        }
      }
    }
    case DOWN_VOTE_POST:{
      let {id}=action.id
      return {
        ...state,
        posts:{
          [id]:{
            ...state.posts[id],
            voteScore:state.posts[id].voteScore-1
          }
        }
      }
    }
    case UP_VOTE_COMMENT:{
      let {id}=action.id
      return {
        ...state,
        comments:{
          [id]:{
            ...state.comments[id],
            voteScore:state.comments[id].voteScore+1
          }
        }
      }
    }
    case DOWN_VOTE_COMMENT:{
      let {id}=action.id    
      return {
        ...state,
        comments:{
          [id]:{
            ...state.comments[id],
            voteScore:state.comments[id].voteScore-1
          }
        }
      }
    }
    default:
      return state
  }
}

export default combineReducers({post,comment,vote,})
