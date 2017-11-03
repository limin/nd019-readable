import * as API from '../utils/Api'

export const RECEIVE_POSTS='RECEIVE_POSTS'
export const POST_DELETED='POST_DELETED'
export const COMMENT_DELETED='COMMENT_DELETED'
export const RECEIVE_COMMENTS='RECEIVE_COMMENTS'
export const ADD_COMMENT='ADD_COMMENT'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const DELETE_COMMENT='DELETE_COMMENT'
export const UP_VOTE_POST='UP_VOTE_POST'
export const DOWN_VOTE_POST='DOWN_VOTE_POST'
export const UP_VOTE_COMMENT='UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT='DOWN_VOTE_COMMENT'

export function receivePosts(posts){
	return {
    	type: RECEIVE_POSTS,
    	posts
    }
}

export function postDeleted(id){
	return {
		type:POST_DELETED,
		id
	}
}

export function commentDeleted(id){
	return {
		type:COMMENT_DELETED,
		id
	}
}

export function receiveComments(comments){
	return {
    	type: RECEIVE_COMMENTS,
    	comments
    }
}

export function addPost(post){
	return function(dispatch){
		API.createPost(post).then(post=>dispatch(receivePosts([post])))
	}
}

export function addComment(comment){
	return function(dispatch){
		API.createComment(comment).then(comment=>dispatch(receiveComments([comment])))
	}
}

export function fetchPost(id){
  return function(dispatch){
//  	dispatch(requestPost(id))
		API.fetchPost(id).then(values=>{
			dispatch(receivePosts([values[0]]))
			dispatch(receiveComments(values[1]))
			})
	  }
}

export function fetchComment(id){
  return function(dispatch){
//  	dispatch(requestPost(id))
		API.fetchComment(id).then(value=>{
			dispatch(receiveComments([value]))
			})
	  }
}


export function updatePost(id,post){
	return function(dispatch){
		API.updatePost(id,post).then(value=>dispatch(receivePosts([value])))
	}
}

export function deletePost(id){
	return function(dispatch){
		API.deletePost(id).then(value=>dispatch(postDeleted(id)))
	}
}

export function updateComment(id,comment){
	return function(dispatch){
		API.updateComment(id,comment).then(value=>dispatch(receiveComments([value])))
	}
}

export function deleteComment(id){
	return function(dispatch){
		API.deleteComment(id).then(value=>dispatch(commentDeleted(id)))
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
