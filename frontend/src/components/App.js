import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'

import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'
import Post from '../components/Post'
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
              <PostList/>
            </div>
          }/>
          <Route exact path="/posts/:id" render={({match})=>
            <Post id={match.params.id}/>
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
