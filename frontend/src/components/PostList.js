import React from 'react'
import {Link} from 'react-router-dom'

class PostList extends React.Component{
  render(){
    return (
      <ul className="posts">
      {
        this.props.posts.map((post)=>(
          <li><Link to={"/posts/"+post.id}>{post.title}</Link></li>
        ))
      }
      </ul>
    )
  }
}

export default PostList
