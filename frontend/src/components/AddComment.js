import React from 'react'
import serializeForm from 'form-serialize'
import {uniqueId} from '../utils'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addComment} from '../actions'

class AddComment extends React.Component{
  handleSubmit=(e)=>{
    e.preventDefault();
    const values=serializeForm(e.target,{hash:true})
    values.id=uniqueId()
    values.parentId=this.props.parentId
    values.timestamp=Date.now()
    this.props.addComment(values)
    this.props.history.push(`/${this.props.category}/${this.props.parentId}`)
  }
  render(){
    return (
      <div>
        <div>Add Comment</div>
        <form onSubmit={this.handleSubmit}>
        <div><textarea className="body" name="body" placeholder="body" /></div>
      	<div><input className="author" type="text" name="author" placeholder="author" /></div>
        <div>
          <input type="submit" value="Add"/>
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
