import React, { Component } from 'react';
import {connect} from 'react-redux'
import {BrowserRouter,Route, Link} from 'react-router-dom'
import {receiveUser} from '../actions'
import PostList from '../components/PostList'
import Post from '../components/Post'
import Login from '../components/Login'
import AddPost from '../components/AddPost'
import AddComment from '../components/AddComment'
import UpdatePost from '../components/UpdatePost'
import UpdateComment from '../components/UpdateComment'

import logo from '../logo.svg'
import '../App.css'
import '../../node_modules/bulma/css/bulma.css'

class App extends Component {
  render() {
    const {user}=this.props
    return (
      <BrowserRouter>
        <div className="app">
          <div className="app-top-bar">
        		<span className="logo">
            		<img src={logo} alt="logo" />
        		</span>
        		<ul className="app-nav-bar">
        			<li><Link className="button is-primary is-outlined" to="/">Posts</Link></li>
      				<li><Link className="button is-primary is-outlined" to="/add/post/0">Add Post</Link></li>
              {!(user && user.name) && <li><Link className="button is-primary is-outlined" to="/a/b/login">Login</Link></li>}
              {user && user.name && <li><a className="button is-primary is-outlined" onClick={this.props.logout}>Logout({user.name})</a></li>}
        		</ul>
            <div className="fork">
              {// from: https://github.com/blog/273-github-ribbons
              }
              <a href="https://github.com/limin/nd019-readable"><img src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"/></a>
            </div>
          </div>
          <div className="app-content">
            <Route exact path="/" render={({ match })=>
              <div>
                <PostList/>
              </div>
            }/>
            <Route exact path="/a/b/login/:token?" render={({ match })=>
              <div>
                <Login token={match.params.token}/>
              </div>
            }/>

            <Route exact path="/:category" render={({ match })=>
              <div>
                <PostList category={match.params.category}/>
              </div>
            }/>

      		  <Route exact path="/add/post/0" render={()=>
      			     <AddPost/>
      		  }/>

            <Route exact path="/update/post/:id" render={({match})=>
              <UpdatePost id={match.params.id}/>
            }/>

            <Route exact path="/:category/:id" render={({match})=>
              <Post id={match.params.id}/>
            }/>

      		  <Route exact path="/add/comment/:category/:parentId" render={({match})=>
      			   <AddComment category={match.params.category} parentId={match.params.parentId}/>
      		  }/>
            <Route exact path="/update/comment/:category/:parentId/:commentId" render={({match})=>
      			   <UpdateComment category={match.params.category} parentId={match.params.parentId} id={match.params.commentId}/>
      		  }/>

          </div>
          <div className="app-bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({user}){
  return {
    user
  }
}
function mapDispatchToProps(dispatch){
  return {
    logout: ()=>dispatch(receiveUser(null))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
