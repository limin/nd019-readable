export const ADD_POST='ADD_POST'
export const ADD_COMMENT='ADD_COMMENT'
export const UPDATE_POST='UPDATE_POST'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const DELETE_POST='DELETE_POST'
export const DELETE_COMMENT='DELETE_COMMENT'
export const UP_VOTE_POST='UP_VOTE_POST'
export const DOWN_VOTE_POST='DOWN_VOTE_POST'

export function addPost({title,body,author}){
    return {
      type: ADD_POST,
      title,
      body,
      author,
    }
}

export function updatePost({id,title,body,author}){
  return {
  	type:UPDATE_POST,
    id,
    title,
    body,
    author,
    
  }
}