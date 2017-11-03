import React from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {uniqueId} from '../utils'
import {addPost} from '../actions'
import {withRouter} from 'react-router';


class AddPost extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    values.id=uniqueId()
    values.timestamp=Date.now()
    values.deleted=false
    this.props.addPost(values)
    //window.location.href="/"
    this.props.history.push("/")
  }
  render(){
    return(
      <div>
      	<div>Add post</div>
        <form  onSubmit={this.handleSubmit}>
      	<div><input className="title" type="text" name="title" placeholder="title" /></div>
      	<div><textarea className="body" name="body" placeholder="body" /></div>
      	<div><input className="author" type="text" name="author" placeholder="author" /></div>
        <div>
      		<select name="category">
          {
            this.props.categories.map((category)=>(
              <option key={category.path} value={category.path}>{category.name}
              </option>
            ))
          }
      		</select>
        </div>
      	<div>
      		<input type="submit" value="Create"/>
      	</div>
        </form>
      </div>
      )
  }
}

function mapStateToProps({categories}){
  return{
    categories: Object.values(categories)
  }
}

function mapDispatchToProps(dispatch){
  return{
    addPost: post=>dispatch(addPost(post))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPost))
