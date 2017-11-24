import React from 'react'
import {connect} from 'react-redux'
//import serializeForm from 'form-serialize'
import {updateComment,fetchComment} from '../actions'
import {withRouter} from 'react-router';
import update from 'immutability-helper'

class UpdateComment extends React.Component{
  state={
    messages:{},
    comment:{
      ...this.props.comment
    }
  }

  validate=()=>{
    const {comment}=this.state
    const messages={}
    comment.body=comment.body.trim()
    if(comment.body.length===0){
      messages["body"]="Body is invalid."
    }
    const newState=update(this.state,{
      comment:{$set:comment},
      messages:{$set:messages}
    });
    this.setState(newState)
    return newState
  }


  handleSubmit = (e) => {
    e.preventDefault()
//    const values = serializeForm(e.target, { hash: true })
    const {messages,comment}=this.validate()
    if(Object.keys(messages).length===0){
      this.props.updateComment(this.props.id,comment)
      this.props.history.push(`/${this.props.category}/${this.props.parentId}`)
    }
  }

  componentDidMount(){
    this.props.fetchComment(this.props.id)
  }


  render(){
    const {messages, comment}=this.state
    return(
      <div>
      	<h2 className="title">Update comment</h2>
        <form  onSubmit={this.handleSubmit}>
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

function mapStateToProps({comments},{id}){
  return{
    comment:Object.values(comments).filter(comment=>comment.id===id)[0]
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateComment: (id,comment)=>dispatch(updateComment(id,comment)),
    fetchComment:id=>dispatch(fetchComment(id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdateComment))
