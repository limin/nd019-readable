import React from 'react'
import {connect} from 'react-redux'
import {votePost,voteComment} from '../actions'

class Vote extends React.Component{
  up=e=>{
    e.preventDefault()
    this.props.up()
  }

  down=e=>{
    e.preventDefault()
    this.props.down()
  }
  render(){
    let item=this.props.item
    return (
      <div className="vote">
        <div className="up button" onClick={this.up}>Up</div>
        <div className="score">{item.voteScore}</div>
        <div className="down button" onClick={this.down}>Down</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch,ownProps){
  return {
    up:()=>dispatch(ownProps.type==='post'?votePost(ownProps.item.id,true):voteComment(ownProps.item.id,true)),
    down:()=>dispatch(ownProps.type==='post'?votePost(ownProps.item.id,false):voteComment(ownProps.item.id,false))
  }
}

export default connect(null,mapDispatchToProps)(Vote)
