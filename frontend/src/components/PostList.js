import React from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {deletePost, fetchPost,sortByDate,sortByScore,SCORE_FIELD,DATE_FIELD} from '../actions'
import {connect} from 'react-redux'
import {getDerivedPosts} from '../selectors'
import Vote from '../components/Vote'

class PostList extends React.Component{
  state={}
  onDeleteClick=(post)=>{
    this.setState({
      selected:post,
      activeModal:true
    })
  }
  deletePost=()=>{
    this.props.deletePost(this.state.selected)
    this.closeModal()
  }
  closeModal=()=>{
    this.setState({
      activeModal: false
    })
  }
  render(){
    return (
      <div className="postList">
        <div>
        {this.props.posts.length} posts
        {
          this.props.category?`(Category:${this.props.category})`:""
        }
        . Sort by <a className="button is-small is-text" onClick={this.props.sortByScore}>Score</a> <a className="button is-small is-text" onClick={this.props.sortByDate}>Date</a>
        </div>
        <table className="table posts">
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
              <tr key={post.id}>
                <td><Vote item={post} type="post"/></td>
                <td><Link to={"/"+post.category+"/"+post.id}>{post.title}</Link></td>
                <td className="center">{post.comments.length}</td>
                <td>{post.author}</td>
                <td className="center"><Link to={"/"+post.category} className="button is-text">{post.category}</Link></td>
                <td>
                  <Moment format="YYYY/MM/DD HH:mm">{new Date(post.timestamp)}</Moment>
                </td>
                <td><Link className="button is-text" to={"/update/post/"+post.id}>Update</Link></td>
                <td><a className="button" onClick={()=>this.onDeleteClick(post)}>Delete</a></td>
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
        <div className={this.state.activeModal?"modal is-active":"modal"}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete Post</p>
              <button className="delete" aria-label="close" onClick={this.closeModal}></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete the post?</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={this.deletePost}>Yes</button>
              <button className="button" onClick={this.closeModal}>No</button>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchPost:id=>dispatch(fetchPost(id)),
    sortByScore:()=>dispatch(sortByScore()),
    sortByDate:()=>dispatch(sortByDate()),
    deletePost:(post)=>dispatch(deletePost(post.id))
  }
}

function mapStateToProps({categories,posts,comments,sorts},{category}){
  const postList=category?getDerivedPosts({posts,comments}).filter((post)=>post.category===category):getDerivedPosts({posts,comments})

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
    posts:postList
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
