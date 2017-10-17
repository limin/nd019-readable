import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'
import Post from '../components/Post'
import {getDerivedComments} from '../selectors'
import {fetchPost} from '../actions'
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
              <PostList posts={this.props.posts}/>
            </div>
          }/>      
          <Route exact path="/posts/categories/:category" render={({ match })=>
            <div>
              <div>posts:{match.params.category}</div>
              <PostList posts={this.props.posts}/>
            </div>
          }/>
          <Route exact path="/posts/:id" render={({match})=>
            <Post post={this.props.posts.filter((post)=>post.id===match.params.id)[0]}/>
          }/>
          <Route exact path="/categories" render={()=>
            <CategoryList categories={this.props.categories}/>
          }/>
          </div>
          <div className="app-bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost:(id)=>dispatch(fetchPost(id))
  }
}

function mapStateToProps({categories,posts,comments}){
  
  return {
    categories:Object.values(categories),
    posts:Object.values(posts).map((post)=>{
    return Object.assign(post,{comments:getDerivedComments({categories,posts,comments}).filter(
      (comment)=>comment.parentId=post.id
    )})
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
