import React from 'react'
import {connect} from 'react-redux'
import {updatePost,fetchPost} from '../actions'
import {withRouter} from 'react-router';
import update from 'immutability-helper'

class UpdatePost extends React.Component{
  state={
    messages:{},
    post:{
      ...this.props.post
    }
  }

  validate=()=>{
    const {post}=this.state
    const messages={}
    post.title=post.title.trim()
    if(post.title.length===0){
      messages["title"]="Title is invalid."
    }
    post.body=post.body.trim()
    if(post.body.length===0){
      messages["body"]="Body is invalid."
    }
    const newState=update(this.state,{
      post:{$set:post},
      messages:{$set:messages}
    });
    this.setState(newState)
    return newState
  }


  handleSubmit = (e) => {
    e.preventDefault()
    //const values = serializeForm(e.target, { hash: true })
    const {messages,post}=this.validate()
    if(Object.keys(messages).length===0){
      post.timestamp=Date.now()
      this.props.updatePost(this.props.id,post)
      this.props.history.push("/")
    }
  }

  componentDidMount(){
    this.props.fetchPost(this.props.id)
  }

  render(){
    const {messages,post}=this.state
    const {user} = this.props
    if(post==null || post.deleted===true){
      return (
          <div>
          Page not found.
          </div>
      )
    }
    if(!(user && user.id===post.author.id && user.provider===post.author.provider)){
      return (
        <div>
        Not authorized.
        </div>
      )
    }
    return(
      <div>
      	<h2 className="title">Update post</h2>
        <form  onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className={messages.hasOwnProperty("title")?"control has-icons-right":"control"}>
            <input className={messages.hasOwnProperty("title")?"input is-danger":"input"} name="title" value={post.title} type="text" placeholder="title" onChange={(e)=>this.setState(update(this.state,{post:{title:{$set:e.target.value}}}))}/>
            {
              messages.hasOwnProperty("title") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("title") && <p className="help is-danger">{messages['title']}</p>
          }
        </div>
        <div className="field">
          <label className="label">Body</label>
          <div className={messages.hasOwnProperty("body")?"control has-icons-right":"control"}>
            <textarea className={messages.hasOwnProperty("body")?"textarea is-danger":"textarea"} name="body" value={post.body} placeholder="body" onChange={(e)=>this.setState(update(this.state,{post:{body:{$set:e.target.value}}}))}></textarea>
            {
              messages.hasOwnProperty("body") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("body") && <p className="help is-danger">{messages['body']}</p>
          }
        </div>
        <div className="field is-grouped">
          <div className="control">
            <input type="submit" className="button is-link" value="Update"/>
          </div>
        </div>
        </form>
      </div>
      )
  }
}

function mapStateToProps({categories,posts,user},{id}){
  return{
    categories: Object.values(categories),
    post:Object.values(posts).filter(post=>post.id===id)[0],
    user
  }
}
function mapDispatchToProps(dispatch){
  return{
    updatePost: (id,post)=>dispatch(updatePost(id,post)),
    fetchPost:id=>dispatch(fetchPost(id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdatePost))
