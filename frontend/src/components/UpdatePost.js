import React from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {updatePost,fetchPost} from '../actions'
import {withRouter} from 'react-router';

class UpdatePost extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    this.props.updatePost(this.props.id,values)
    //window.location.href="/"
    this.props.history.push("/")
  }

  componentDidMount(){
    this.props.fetchPost(this.props.id)
  }
  state={
    ...this.props.post
  }
  render(){
    return(
      <div>
      	<div>Update post</div>
        <form  onSubmit={this.handleSubmit}>
      	<div><input value={this.state.title} type="text" name="title" placeholder="title" onChange={(e)=>this.setState({title:e.target.value})} /></div>
      	<div><input value={this.state.body}  type="text" name="body" placeholder="body" onChange={(e)=>this.setState({body:e.target.value})}/></div>
      	<div>
      		<input type="submit" value="Update"/>
      	</div>
        </form>
      </div>
      )
  }
}

function mapStateToProps({categories,posts},{id}){
  return{
    categories: Object.values(categories),
    post:Object.values(posts).filter(post=>post.id===id)[0]
  }
}
function mapDispatchToProps(dispatch){
  return{
    updatePost: (id,post)=>dispatch(updatePost(id,post)),
    fetchPost:id=>dispatch(fetchPost(id))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpdatePost))
