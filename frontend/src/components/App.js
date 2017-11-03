import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import PostList from '../components/PostList'
import Post from '../components/Post'
import AddPost from '../components/AddPost'
import AddComment from '../components/AddComment'
import UpdatePost from '../components/UpdatePost'
import DeletePost from '../components/DeletePost'
import UpdateComment from '../components/UpdateComment'
import DeleteComment from '../components/DeleteComment'

import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="app-top-bar">
        		<span className="logo">
            		<img src={logo} alt="logo" />
        		</span>
        		<ul className="app-nav-bar">
        			<li><Link to="/">Posts</Link></li>
      				<li><Link to="/add/post/0">Add Post</Link></li>
        		</ul>
          </div>
          <div className="app-content">
            <Route exact path="/" render={({ match })=>
              <div>
                <PostList/>
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

            <Route exact path="/delete/post/:id" render={({match})=>
              <DeletePost id={match.params.id}/>
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
            <Route exact path="/delete/comment/:category/:parentId/:commentId" render={({match})=>
      			   <DeleteComment category={match.params.category} parentId={match.params.parentId} id={match.params.commentId}/>
      		  }/>

          </div>
          <div className="app-bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
