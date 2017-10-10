import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'
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
          deleted: false
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
        }]
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
          <div className="top-bar">
        		<span className="logo">
            		<img src={logo} alt="logo" />
        		</span>
        		<ul className="nav-bar">
        			<li><Link to="/posts">Posts</Link></li>
        			<li><Link to="/categories">Categories</Link></li>
        		</ul>
          </div>
          <div className="content">
          <Route exact path="/posts/categories/:category" render={({ match })=>
            <div>
              <div>posts:{match.params.category}</div>
              <ul className="posts">
              {
                this.state.posts.map((post)=>(
                  <li><Link to={"/posts/"+post.id}>{post.title}</Link></li>
                ))
              }
              </ul>
            </div>
          }/>
          <Route exact path="/posts/:id" render={({match})=>
            <div className="post">
            {
              this.state.posts.filter((post)=>post.id===match.params.id).map((post)=>(
              <div>
                <div className="title">{post.title}</div>
                <div className="body">{post.body}</div>
              </div>
              ))
            }
            </div>
          }/>
          <Route exact path="/categories" render={()=>
            <ul className="categories">
            {
              this.state.categories.map((category)=>(
                <li key={category.name}><Link to={"/posts/categories/"+category.path}>{category.name}</Link></li>
              ))
            }
            </ul>
          }/>
          </div>
          <div className="bottom-bar"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
