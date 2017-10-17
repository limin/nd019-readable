export const REQUEST_POST='REQUEST_POST'
export const RECEIVE_POST='RECEIVE_POST'
export const ADD_POST='ADD_POST'
export const ADD_COMMENT='ADD_COMMENT'
export const UPDATE_POST='UPDATE_POST'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const DELETE_POST='DELETE_POST'
export const DELETE_COMMENT='DELETE_COMMENT'
export const UP_VOTE_POST='UP_VOTE_POST'
export const DOWN_VOTE_POST='DOWN_VOTE_POST'
export const UP_VOTE_COMMENT='UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT='DOWN_VOTE_COMMENT'

export function requestPost(id){
	return {
      type: REQUEST_POST,
      id
    }
}

export function receivePost(post){
	return {
    	type: RECEIVE_POST,
    	post
    }
}

export function addPost({id,title,body,author,category,timestamp}){
  return {
      type: ADD_POST,
      post:{
        id,
        title,
        body,
        author,
        category,
        timestamp,
      }
    }
}

export function fetchPost(id){
  return function(dispatch){
  	dispatch(requestPost(id))
    return fetch(`${process.env.REACT_APP_BACKEND}/posts`, { headers: { 'Authorization': 'udacity'}}).then(
    	post=respnse.json(),
		// Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)      
    ).then(post=>dispatch(receivePost(post)))
  }
}

export function updatePost(post){
  let {id}=post
  return {
    type:UPDATE_POST,
    post:{
      ...post,
      id,
    }
  }
}

export function deletePost({id}){
  return {
    type:DELETE_POST,
    post:{
      id,
    }
  }
}

export function addComment({id,body, author,timestamp,parentId}){
  return{
    type:ADD_COMMENT,
    comment:{
      id,
      body,
      author,
      timestamp,
      parentId,
    }
  }
}

export function updateComment(comment){
  let {id}=comment
  return{
    type:UPDATE_COMMENT,
    comment:{
      ...comment,
      id,
    }
  }
}

export function deleteComment({id}){
  return {
    type:DELETE_COMMENT,
    comment:{
      id,
    }
  }
}

export function upVotePost({id}){
  return{
    type:UP_VOTE_POST,
    id,
  }
}

export function downVotePost({id}){
  return{
    type:DOWN_VOTE_POST,
    id,
  }
}

export function upVoteComment({id}){
  return{
    type:UP_VOTE_COMMENT,
    id,
  }
}

export function downVoteComment({id}){
  return{
    type:DOWN_VOTE_COMMENT,
    id,
  }
}
