import {createSelector} from 'reselect'

const getPosts=state=>Object.values(state.posts).filter((post)=>!post.deleted)
const getComments=state=>{
  return Object.values(state.comments).filter((comment)=>
    (state.posts && state.posts[comment.parentId] && !state.posts[comment.parentId].deleted) && !comment.deleted
  )
}

export const getDerivedPosts=createSelector([getPosts,getComments],(posts,comments)=>{
  return posts.map((post)=>{
    return Object.assign({},post,{
      comments:comments.filter((comment)=>comment.parentId===post.id)
                       .map((comment)=>Object.assign({},comment))
      })
  })
})
