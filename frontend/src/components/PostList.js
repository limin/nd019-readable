import React from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {deletePost, fetchPost,sortByDate,sortByScore,SCORE_FIELD,DATE_FIELD} from '../actions'
import {connect} from 'react-redux'
import {getDerivedPosts} from '../selectors'
import Vote from '../components/Vote'
import ConfirmDialog from './ConfirmDialog'
import {MOMENT_FORMAT} from '../utils'

class PostList extends React.Component{
  state={activeModal:false}
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
    const {user, posts,sorts,category,categories,sortByScore,sortByDate}=this.props
    return (
      <div className="postList">
        <div>
        <span>{posts.length} posts</span>
        {
          category && <span> in <span className="tag is-dark">{category}</span></span>
        }
        </div>
        <table className="table posts">
          <thead>
            <tr>
              <th><a className="button is-small is-text" onClick={sortByScore}>Score</a>{sorts.field==="SCORE" && <i className={sorts.ascending?"fa fa-arrow-up":"fa fa-arrow-down"} aria-hidden="true"></i>}</th>
              <th>Title</th>
              <th>Comments</th>
              <th>Author</th>
              <th>Category</th>
              <th><a className="button is-small is-text" onClick={sortByDate}>Date</a>{sorts.field==="DATE" && <i className={sorts.ascending?"fa fa-arrow-up":"fa fa-arrow-down"} aria-hidden="true"></i>}</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
            posts.map((post)=>(
              <tr key={post.id}>
                <td><Vote item={post} type="post"/></td>
                <td><Link to={"/"+post.category+"/"+post.id}>{post.title}</Link></td>
                <td className="center">{post.comments.length}</td>
                <td className="center">{post.author.name}</td>
                <td className="center"><Link to={"/"+post.category} className="button is-text">{post.category}</Link></td>
                <td>
                  <Moment format={MOMENT_FORMAT}>{new Date(post.timestamp)}</Moment>
                </td>
                <td>{ user && user.id===post.author.id && user.provider===post.author.provider && <Link className="button is-text" to={"/update/post/"+post.id}>Update</Link>}</td>
                <td>{ user && user.id===post.author.id && user.provider===post.author.provider && <a className="button" onClick={()=>this.onDeleteClick(post)}>Delete</a>}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <br/>
        <ul className="categories">
        {
          categories.map((category)=>(
            <li key={category.name}><Link to={"/"+category.path} className="tag is-dark">{category.name}</Link></li>
          ))
        }
        </ul>
        <ConfirmDialog title="Delete Post" body="Are you sure you want to delete the post?" activeModal={this.state.activeModal} onCancel={this.closeModal} onConfirm={this.deletePost}/>
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

function mapStateToProps({user, categories,posts,comments,sorts},{category}){
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
    user,
    categories:Object.values(categories),
    posts:postList,
    sorts
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
