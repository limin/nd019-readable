import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
//import serializeForm from 'form-serialize'
import {uniqueId} from '../utils'
import {addPost} from '../actions'

import update from 'immutability-helper'

class AddPost extends React.Component{
  state={
    messages:{},
    post:{
      title:"",
      body:"",
      author:"",
      category:""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //const values = serializeForm(e.target, { hash: true })
    const {messages,post}=this.validate()
    if(Object.keys(messages).length===0){
      post.id=uniqueId()
      post.timestamp=Date.now()
      post.deleted=false
      this.props.addPost(post)
      this.props.history.push("/")
    }
  }

  validate=()=>{
    const {post}=this.state
    const messages={}
    post.title=post.title.trim()
    if(post.title.length===0){
      messages["title"]="Title is invalid."
    }
    post.body=post.body.trim()
    if(post.body.length===0){
      messages["body"]="Body is invalid."
    }
    post.author=post.author.trim()
    if(post.author.length===0){
      messages["author"]="Author is invalid."
    }
    post.category=post.category.trim()
    if(post.category.length===0){
      messages["category"]="Category is invalid."
    }
    const newState=update(this.state,{
      post:{$set:post},
      messages:{$set:messages}
    });
    this.setState(newState)
    return newState
  }

  render(){
    const {messages,post}=this.state
    return(
      <div>
      	<h2 className="title">Add post</h2>
        <form  onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className={messages.hasOwnProperty("title")?"control has-icons-right":"control"}>
            <input className={messages.hasOwnProperty("title")?"input is-danger":"input"} name="title" value={post.title} type="text" placeholder="title" onChange={(e)=>this.setState(update(this.state,{post:{title:{$set:e.target.value}}}))}/>
            {
              messages.hasOwnProperty("title") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("title") && <p className="help is-danger">{messages['title']}</p>
          }
        </div>
        <div className="field">
          <label className="label">Body</label>
          <div className={messages.hasOwnProperty("body")?"control has-icons-right":"control"}>
            <textarea className={messages.hasOwnProperty("body")?"textarea is-danger":"textarea"} name="body" value={post.body} placeholder="body" onChange={(e)=>this.setState(update(this.state,{post:{body:{$set:e.target.value}}}))}></textarea>
            {
              messages.hasOwnProperty("body") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("body") && <p className="help is-danger">{messages['body']}</p>
          }
        </div>
        <div className="field">
          <label className="label">Author</label>
          <div className={messages.hasOwnProperty("author")?"control has-icons-right":"control"}>
            <input className={messages.hasOwnProperty("author")?"input is-danger":"input"} name="author" value={post.author} type="text" placeholder="author"  onChange={(e)=>this.setState(update(this.state,{post:{author:{$set:e.target.value}}}))}/>
            {
              messages.hasOwnProperty("author") &&
                <span className="icon is-small is-right">
                  <i className="fa fa-warning"></i>
                </span>
            }
          </div>
          {
            messages.hasOwnProperty("author") && <p className="help is-danger">{messages['author']}</p>
          }
        </div>
        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className={messages.hasOwnProperty("category")?"select is-danger":"select"}>
              <select name="category" value={post.category}  onChange={(e)=>this.setState(update(this.state,{post:{category:{$set:e.target.value}}}))}>
                  <option key="" value="">Select category</option>
              {
                this.props.categories.map((category)=>(
                  <option key={category.path} value={category.path}>{category.name}</option>
                ))
              }
          		</select>
            </div>
            {
              messages.hasOwnProperty("category") && <p className="help is-danger">{messages['category']}</p>
            }
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <input type="submit" className="button is-link" value="Create"/>
          </div>
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
