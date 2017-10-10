import React, { Component } from 'react';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
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
          <Route path="/posts/(categories)?/:category?" render={({ match })=>
            <div>
              <div>posts:{match.params.category}</div>
              <ul>
                <li>
                  <Link to="/posts/123456">my post</Link>
                </li>
              </ul>
            </div>
          }/>
          <Route path="/posts/:id" render={({match})=>
            <div>
            {match.params.postId}
            </div>
          }/>
          <Route exact path="/categories" render={()=>
            <ul className="categories">
              <li><Link to="/posts/categories/javascript">javascript</Link></li>
              <li><Link to="/posts/categories/java">java</Link></li>
              <li><Link to="/posts/categories/python">python</Link></li>
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
