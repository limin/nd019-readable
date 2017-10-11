import React from 'react'
import Vote from '../components/Vote'

class Post extends React.Component{
  render(){
    let post=this.props.post
    return (
      <div className="post">
        <div className="title">{post.title}</div>
        <div className="body">
          <Vote item={post}/>
          <div className="content">
            <div>{post.body}</div>
            <div className="action">
              <div>posted by {post.author} at {new Date(post.timestamp).toString()}.</div>
            </div>
          </div>
        </div>
        <div className="comments">
          <div>3 comments</div>
          <ul className="comments">
          {
            post.comments.map((comment)=>(
            <li>
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

export default Post
