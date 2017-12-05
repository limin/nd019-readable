import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {votePost,voteComment} from '../actions'

class Vote extends React.Component{
  up=e=>{
    e.preventDefault()
    const {user}=this.props
    if(user && user.id){
      this.props.up()
    }else{
      this.props.history.push("/a/b/login")
    }
  }

  down=e=>{
    e.preventDefault()
    const {user}=this.props
    if(user && user.id){
      this.props.down()
    }else{
      this.props.history.push("/a/b/login")
    }

  }
  render(){
    const {item}=this.props
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

function mapStateToProps({user}){
  return {
    user
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Vote))
