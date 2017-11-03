import React from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {updateComment,fetchComment} from '../actions'
import {withRouter} from 'react-router';

class UpdateComment extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.updateComment(this.props.id,values)
    this.props.history.push(`/${this.props.category}/${this.props.parentId}`)
  }

  componentDidMount(){
    this.props.fetchComment(this.props.id)
  }
  state={
    ...this.props.comment
  }
  render(){
    return(
      <div>
      	<div>Update comment</div>
        <form  onSubmit={this.handleSubmit}>
      	<div><textarea className="body" name="body" placeholder="body" onChange={(e)=>this.setState({body:e.target.value})}>{this.state.body}</textarea></div>
      	<div>
      		<input type="submit" value="Update"/>
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
