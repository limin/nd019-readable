import React from 'react'
import {connect} from 'react-redux'
import {deleteComment} from '../actions'

class DeleteComment extends React.Component{
  componentDidMount(){
    this.props.dispatch(deleteComment(this.props.id))
  }
  render(){
    return(
      <div>Comment is deleted.</div>
    )

  }
}

export default connect()(DeleteComment)
