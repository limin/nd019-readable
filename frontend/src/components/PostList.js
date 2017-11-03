import React from 'react'
import {Link} from 'react-router-dom'
import {fetchPost} from '../actions'
import {connect} from 'react-redux'
import {getDerivedComments} from '../selectors'

class PostList extends React.Component{
  render(){
    return (
      <div>
        <div>
        {this.props.posts.length} posts
        {
          this.props.category?`(Category:${this.props.category})`:""
        }
        . Sort by <a className="button">Score</a> <a className="button">Date</a>
        </div>
        <ul className="posts">
        {
          this.props.posts.map((post)=>(
            <li key={post.id}><span className="score">{post.voteScore}</span> <Link to={"/"+post.category+"/"+post.id}>{post.title}</Link> posted at {new Date(post.timestamp).toString()}</li>
          ))
        }
        </ul>
        <br/>
        <ul className="categories">
        {
          this.props.categories.map((category)=>(
            <li key={category.name}><Link to={"/"+category.path}>{category.name}</Link></li>
          ))
        }
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost:id=>dispatch(fetchPost(id))
  }
}

function mapStateToProps({categories,posts,comments},{category}){
  const postList=category?Object.values(posts).filter((post)=>post.category===category):Object.values(posts)
  return {
    categories:Object.values(categories),
    posts:postList.filter((post)=>post.deleted===false).map((post)=>{
    return Object.assign(post,{comments:getDerivedComments({posts,comments}).filter(
      (comment)=>comment.parentId===post.id
    )})
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
