import React from 'react'
import {Link} from 'react-router-dom'
import {fetchPost,sortByDate,sortByScore,SCORE_FIELD,DATE_FIELD} from '../actions'
import {connect} from 'react-redux'
import {getDerivedComments} from '../selectors'
import Vote from '../components/Vote'

class PostList extends React.Component{
  render(){
    return (
      <div>
        <div>
        {this.props.posts.length} posts
        {
          this.props.category?`(Category:${this.props.category})`:""
        }
        . Sort by <a className="button" onClick={this.props.sortByScore}>Score</a> <a className="button" onClick={this.props.sortByDate}>Date</a>
        </div>
        <table className="posts">
          <thead>
            <tr>
              <th>Score</th>
              <th>Title</th>
              <th>Comments</th>
              <th>Author</th>
              <th>Category</th>
              <th>Time</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.posts.map((post)=>(
              <tr>
                <td><Vote item={post} type="post"/></td>
                <td><Link to={"/"+post.category+"/"+post.id}>{post.title}</Link></td>
                <td>{post.comments.length}</td>
                <td>{post.author}</td>
                <td><Link to={"/"+post.category} className="category">{post.category}</Link></td>
                <td>{new Date(post.timestamp).toString()}</td>
                <td><Link to={"/update/post/"+post.id}>Update</Link></td>
                <td><Link to={"/delete/post/"+post.id}>Delete</Link></td>
              </tr>
            ))
          }
          </tbody>
        </table>
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
    fetchPost:id=>dispatch(fetchPost(id)),
    sortByScore:()=>dispatch(sortByScore()),
    sortByDate:()=>dispatch(sortByDate())
  }
}

function mapStateToProps({categories,posts,comments,sorts},{category}){
  const postList=category?Object.values(posts).filter((post)=>post.category===category):Object.values(posts)
  switch (sorts.field) {
    case SCORE_FIELD:
      postList.sort((a,b)=>a.voteScore-b.voteScore)
      if(!sorts.ascending){
        postList.reverse()
      }
      break;
    case DATE_FIELD:
      postList.sort((a,b)=>a.timestamp-b.timestamp)
      if(!sorts.ascending){
        postList.reverse()
      }
      break;
    default:

  }
  return {
    categories:Object.values(categories),
    posts:postList.filter((post)=>post.deleted===false).map((post)=>{
    return Object.assign({},post,{comments:getDerivedComments({posts,comments}).filter(
      (comment)=>comment.parentId===post.id
    )})
  })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
