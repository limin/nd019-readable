import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {fetchPost,deleteComment,deletePost} from '../actions'
import {connect} from 'react-redux'
import {getDerivedPosts} from '../selectors'
import Vote from '../components/Vote'
import {MOMENT_FORMAT} from '../utils'
import Moment from 'react-moment'
import ConfirmDialog from '../components/ConfirmDialog'

class Post extends React.Component{
  state={
    activePostModal:false,
    activeCommentModal:false
  }
  onDeletePostClick=()=>{
    this.setState({
      activePostModal:true
    })
  }
  onDeleteCommentClick=(comment)=>{
    this.setState({
      selectedComment:comment,
      activeCommentModal:true
    })
  }

  deletePost=()=>{
    this.props.dispatch(deletePost(this.props.post.id))
    this.props.history.go(-1)
  }

  deleteComment=()=>{
    this.props.dispatch(deleteComment(this.state.selectedComment.id))
    this.setState({activeCommentModal:false})
  }

  componentDidMount(){
    this.props.dispatch(fetchPost(this.props.id))
  }
  render(){
    let {post,user}=this.props
    if(post==null || post.deleted===true){
      return (
          <div>
          Page not found.
          </div>
      )
    }

    return (
      <div className="post">
        <div className="title">{post.title} {user && user.id===post.author.id && user.provider===post.author.provider && <span> <Link className="button is-text" to={"/update/post/"+post.id}>Update</Link> <a className="button" onClick={this.onDeletePostClick}>Delete</a></span>}</div>
        <div className="body">
          <Vote item={post} type="post"/>
          <div className="content">
            <div>{post.body} <Link to={"/"+post.category} className="tag is-dark">{post.category}</Link></div>
            <div className="action">
              <span>posted by {post.author.name} at <Moment format={MOMENT_FORMAT}>{new Date(post.timestamp)}</Moment>.</span>
            </div>
          </div>
        </div>
        <div className="comments">
          <div><span>{post.comments.length} comments.</span> {user && user.id===post.author.id && user.provider===post.author.provider && <Link className="button is-text is-small" to={"/add/comment/"+post.category+"/"+post.id}>Add Comment</Link>}</div>
          <ul className="comments">
          {
            post.comments.map((comment)=>(
            <li key={comment.id}>
              <Vote item={comment} type="comment"/>
              <div className="content">
                <div>{comment.body} {user && user.id===post.author.id && user.provider===post.author.provider && <span> <Link className="button is-text is-small" to={"/update/comment/"+post.category+"/"+post.id+"/"+comment.id}>Update</Link> <a className="button is-small"  onClick={()=>this.onDeleteCommentClick(comment)}>Delete</a></span>}</div>
                <div className="action">
                  <span>commented by {comment.author.name} at <Moment format={MOMENT_FORMAT}>{new Date(comment.timestamp)}</Moment>.</span>
                </div>
              </div>
            </li>
            ))
          }
          </ul>
        </div>
        <ConfirmDialog  title="Delete Post" body="Are you sure you want to delete the post?" activeModal={this.state.activePostModal} onCancel={()=>this.setState({activePostModal:false})} onConfirm={this.deletePost}/>
        <ConfirmDialog  title="Delete Comment" body="Are you sure you want to delete the comment?" activeModal={this.state.activeCommentModal} onCancel={()=>this.setState({activeCommentModal:false})} onConfirm={this.deleteComment}/>
      </div>
    )
  }
}

function mapStateToProps({user,posts,comments},{id}){
  const postList=getDerivedPosts({posts,comments}).filter(post=>post.id===id)
  return{
    user,
    post:postList.length===0?null:postList[0]
  }
}
export default withRouter(connect(mapStateToProps)(Post))
