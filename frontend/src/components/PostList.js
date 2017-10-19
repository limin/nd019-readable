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
          <li key={post.id}><Link to={"/posts/"+post.id} onClick={()=>this.props.fetchPost(post.id)}>{post.title}</Link></li>
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

function mapStateToProps({posts,comments}){
  
  return {
    posts:Object.values(posts).map((post)=>{
    return Object.assign(post,{comments:getDerivedComments({posts,comments}).filter(
      (comment)=>comment.parentId=post.id
    )})
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
