import React from 'react'

class Vote extends React.Component{
  render(){
    let item=this.props.item
    return (
      <div className="vote">
        <div className="up button">Up</div>
        <div className="score">{item.voteScore}</div>
        <div className="down button">Down</div>
      </div>
    );
  }
}

export default Vote
