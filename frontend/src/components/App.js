import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'
import Post from '../components/Post'
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories:[{name:"java",path:"java"},{name:"javascript",path:"javascript"},{name:"python",path:"python"}],
      posts:[{
          id: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1467166872634,
          title: 'Udacity is the best place to learn React',
          body: 'Everyone says so after all.',
          author: 'thingtwo',
          category: 'react',
          voteScore: 6,
          deleted: false,
          comments:[
            {
              id: '894tuq4ut84ut8v4t8wun89g',
              parentId: "8xf0y6ziyjabvozdd253nd",
              timestamp: 1468166872634,
              body: 'Hi there! I am a COMMENT.',
              author: 'thingtwo',
              voteScore: 6,
              deleted: false,
              parentDeleted: false
            },
            {
              id: '8tu4bsun805n8un48ve89',
              parentId: "8xf0y6ziyjabvozdd253nd",
              timestamp: 1469479767190,
              body: 'Comments. Are. Cool.',
              author: 'thingone',
              voteScore: -5,
              deleted: false,
              parentDeleted: false
            }
          ]
        },
        {
          id: '6ni6ok3ym7mf1p33lnez',
          timestamp: 1468479767190,
          title: 'Learn Redux in 10 minutes!',
          body: 'Just kidding. It takes more than 10 minutes to learn technology.',
          author: 'thingone',
          category: 'redux',
          voteScore: -5,
          deleted: false
        }],
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }

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
          <Route exact path="/posts/categories/:category" render={({ match })=>
            <div>
              <div>posts:{match.params.category}</div>
              <PostList posts={this.state.posts}/>
            </div>
          }/>
          <Route exact path="/posts/:id" render={({match})=>
            <Post post={this.state.posts.filter((post)=>post.id===match.params.id)[0]}/>
          }/>
          <Route exact path="/categories" render={()=>
            <CategoryList categories={this.state.categories}/>
          }/>
          </div>
          <div className="app-bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
