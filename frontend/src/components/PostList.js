import React from 'react'
import {Link} from 'react-router-dom'
import {fetchPost} from '../actions'
import {connect} from 'react-redux'
import {getDerivedComments} from '../selectors'

class PostList extends React.Component{
  render(){
    return (
      <ul className="posts">
      {
        this.props.posts.map((post)=>(
          <li key={post.id}><Link to={"/posts/"+post.id}>{post.title}</Link></li>
        ))
      }
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost:id=>dispatch(fetchPost(id))
  }
}

function mapStateToProps({posts,comments},{category}){
  const postList=category?Object.values(posts).filter((post)=>post.category===category):Object.values(posts)
  return {
    posts:postList.filter((post)=>post.deleted===false).map((post)=>{
    return Object.assign(post,{comments:getDerivedComments({posts,comments}).filter(
      (comment)=>comment.parentId===post.id
    )})
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
