import React from 'react'
import {connect} from 'react-redux'
import {deletePost} from '../actions'

class DeletePost extends React.Component{
  componentDidMount(){
    this.props.dispatch(deletePost(this.props.id))
  }
  render(){
    return(
      <div>Post is deleted</div>
    )

  }
}

export default connect()(DeletePost)
