import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {fetchUser} from '../actions'
import {config} from '../config'

class Login extends React.Component{
  componentWillMount(){
    const {token}=this.props
    if(token){
      this.props.fetchUser(token)
      this.props.history.push("/")
    }
  }

  render(){
    return (
      <div className="login">
        <p>
          <i className="fa fa-github fa-5" aria-hidden="true">GitHub</i>
        </p>
        <p>
          <a className="button is-primary" onClick={()=> window.location.href = "https://github.com/login/oauth/authorize?client_id="+config.GITHUB_CLIENT_ID+"&scope=user"}>Login</a>
        </p>
      </div>
    )
  }
}


function mapStateToProps({user}){
  return {
    user
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchUser: token=>dispatch(fetchUser(token))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))
