import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'

import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'
import Post from '../components/Post'
import AddPost from '../components/AddPost'
import UpdatePost from '../components/UpdatePost'
import DeletePost from '../components/DeletePost'
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
        			<li><Link to="/posts">Posts</Link></li>
        			<li><Link to="/categories">Categories</Link></li>
      				<li><Link to="/add/post">Add Post</Link></li>
        		</ul>
          </div>
          <div className="app-content">
          <Route exact path="/(posts)?" render={({ match })=>
            <div>
              <PostList/>
            </div>
          }/>
          <Route exact path="/posts/categories/:category" render={({ match })=>
            <div>
              <div>posts:{match.params.category}</div>
              <PostList category={match.params.category}/>
            </div>
          }/>

		  <Route exact path="/add/post" render={()=>
			<AddPost/>
		  }/>

      <Route exact path="/update/post/:id" render={({match})=>
        <UpdatePost id={match.params.id}/>
      }/>

      <Route exact path="/delete/post/:id" render={({match})=>
        <DeletePost id={match.params.id}/>
      }/>

      <Route exact path="/posts/:id" render={({match})=>
        <Post id={match.params.id}/>
      }/>

		  <Route exact path="/posts/:id/comments/add" render={({match})=>
			<div>{match.params.id}</div>
		  }/>

          <Route exact path="/categories" render={()=>
            <CategoryList/>
          }/>
          </div>
          <div className="app-bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
