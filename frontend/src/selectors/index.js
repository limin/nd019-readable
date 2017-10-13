import {createSelector} from 'reselect'

const getPosts=state=>state.posts
const getComments=state=>state.comments

export const getDerivedComments=createSelector([getPosts,getComments],(posts,comments)=>{
  return Object.values(comments).map((comment)=>Object.assign({},comment,{parentDeleted:posts[comment.parentId].deleted}))
})