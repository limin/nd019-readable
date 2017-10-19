import React from 'react'
import {Link} from 'react-router-dom'
import {fetchPost} from '../actions'
import {connect} from 'react-redux'
import Vote from '../components/Vote'

class Post extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchPost(this.props.id))
  }
  render(){
    let {post}=this.props
    return (
      <div className="post">
        <div className="title">{post.title}</div>
        <div className="body">
          <Vote item={post}/>
          <div className="content">
            <div>{post.body} <Link to={"/posts/categories/"+post.category} className="category">{post.category}</Link></div>    
            <div className="action">
              <div>posted by {post.author} at {new Date(post.timestamp).toString()}.</div>
            </div>
          </div>
        </div>
        <div className="comments">
          <div>{post.comments.length} comments. <Link to={"/posts/"+post.id+"/add/comments"}>Add Comment</Link></div>
          <ul className="comments">
          {
            post.comments.map((comment)=>(
            <li key={comment.id}>
              <Vote item={comment}/>
              <div className="content">
                <div>{comment.body}</div>
                <div className="action">
                  <div>commented by {comment.author} at {new Date(comment.timestamp).toString()}.</div>
                </div>
              </div>
            </li>
            ))
          }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({posts,comments},{id}){
  return{
    post:Object.values(posts).filter(post=>post.id===id).map(post=>{
    	post.comments=Object.values(comments).filter(comment=>comment.parentId===post.id)
      	return post
    })[0]
  }
}
export default connect(mapStateToProps)(Post)
