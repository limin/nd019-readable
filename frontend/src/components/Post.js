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
        <div className="title">{post.title} <Link to={"/update/post/"+post.id}>Update</Link> <Link to={"/delete/post/"+post.id}>Delete</Link></div>
        <div className="body">
          <Vote item={post} type="post"/>
          <div className="content">
            <div>{post.body} <Link to={"/"+post.category} className="category">{post.category}</Link></div>
            <div className="action">
              <div>posted by {post.author} at {new Date(post.timestamp).toString()}.</div>
            </div>
          </div>
        </div>
        <div className="comments">
          <div>{post.comments.length} comments. <Link to={"/add/comment/"+post.category+"/"+post.id}>Add Comment</Link></div>
          <ul className="comments">
          {
            post.comments.map((comment)=>(
            <li key={comment.id}>
              <Vote item={comment} type="comment"/>
              <div className="content">
                <div>{comment.body} <Link to={"/update/comment/"+post.category+"/"+post.id+"/"+comment.id}>Update</Link> <Link to={"/delete/comment/"+post.category+"/"+post.id+"/"+comment.id}>Delete</Link></div>
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
    	post.comments=Object.values(comments).filter(comment=>comment.parentId===post.id && comment.deleted===false)
      	return post
    })[0]
  }
}
export default connect(mapStateToProps)(Post)
