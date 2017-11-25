import * as API from '../utils/Api'

export const RECEIVE_CATEGORIES='RECEIVE_CATEGORIES'
export const RECEIVE_POSTS='RECEIVE_POSTS'
export const POST_DELETED='POST_DELETED'
export const COMMENT_DELETED='COMMENT_DELETED'
export const RECEIVE_COMMENTS='RECEIVE_COMMENTS'
export const SORT_POSTS='SORT_POSTS'
export const SCORE_FIELD='SCORE'
export const DATE_FIELD='DATE'

export function sortByDate(){
	return {
		type:SORT_POSTS,
		field:DATE_FIELD
	}
}

export function sortByScore(){
	return {
		type:SORT_POSTS,
		field:SCORE_FIELD
	}
}

export function receiveCategories(categories){
	return {
    	type: RECEIVE_CATEGORIES,
    	categories
    }
}


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

export function loadData(){
	return function(dispatch){
		API.loadData().then(({categories,posts,comments})=>{
			dispatch(receiveCategories(categories)),
			dispatch(receivePosts(posts)),
			dispatch(receiveComments(comments))
		})
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

export function votePost(id,up){
	return function(dispatch){
		API.votePost(id,up).then(value=>dispatch(receivePosts([value])))
	}
}

export function voteComment(id,up){
	return function(dispatch){
		API.voteComment(id,up).then(value=>dispatch(receiveComments([value])))
	}
}
