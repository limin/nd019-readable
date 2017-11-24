import React from 'react'
//import serializeForm from 'form-serialize'
import {uniqueId} from '../utils'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addComment} from '../actions'
import update from 'immutability-helper'

class AddComment extends React.Component{
  state={
    messages:{},
    comment:{
      body:"",
      author:""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //const values = serializeForm(e.target, { hash: true })
    const {messages,comment}=this.validate()
    if(Object.keys(messages).length===0){
      comment.id=uniqueId()
      comment.parentId=this.props.parentId
      comment.timestamp=Date.now()
      this.props.addComment(comment)
      this.props.history.push(`/${this.props.category}/${this.props.parentId}`)
    }
  }

  validate=()=>{
    const {comment}=this.state
    const messages={}
    comment.body=comment.body.trim()
    if(comment.body.length===0){
      messages["body"]="Body is invalid."
    }
    comment.author=comment.author.trim()
    if(comment.author.length===0){
      messages["author"]="Author is invalid."
    }
    const newState=update(this.state,{
      comment:{$set:comment},
      messages:{$set:messages}
    });
    this.setState(newState)
    return newState
  }

  render(){
    const {messages,comment}=this.state
    return (
      <div>
        <h2 className="title">Add Comment</h2>
        <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Body</label>
          <div className={messages.hasOwnProperty("body")?"control has-icons-right":"control"}>
            <textarea className={messages.hasOwnProperty("body")?"textarea is-danger":"textarea"} name="body" value={comment.body} placeholder="body" onChange={(e)=>this.setState(update(this.state,{comment:{body:{$set:e.target.value}}}))}></textarea>
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
        <div className="field">
          <label className="label">Author</label>
          <div className={messages.hasOwnProperty("author")?"control has-icons-right":"control"}>
            <input className={messages.hasOwnProperty("author")?"input is-danger":"input"} name="author" value={comment.author} type="text" placeholder="author"  onChange={(e)=>this.setState(update(this.state,{comment:{author:{$set:e.target.value}}}))}/>
            {
              messages.hasOwnProperty("author") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("author") && <p className="help is-danger">{messages['author']}</p>
          }
        </div>
        <div className="field is-grouped">
          <div className="control">
            <input type="submit" className="button is-link" value="Add"/>
          </div>
        </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{
    addComment: comment=>dispatch(addComment(comment))
  }
}

export default withRouter(connect(null,mapDispatchToProps)(AddComment))
