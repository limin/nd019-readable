import React from 'react'

class AddPost extends React.Component{

  render(){
    return(
      <div>
      	<div>Add post</div>
      	<div><input type="text" placeholder="title" /></div>
      	<div><input type="text" placeholder="body" /></div>
      	<div><input type="text" placeholder="author" /></div>      
        <div>
      		<select>
      			<option value="java">java</option>
      			<option value="javascript">javascript</option>
      		</select>
        </div>   
      	<div>
      		<input type="submit" value="Create"/>
      	</div>
      </div>
      )
  }

}

export default AddPost