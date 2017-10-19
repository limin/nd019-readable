import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class CategoryList extends React.Component{
  render(){
    return (
      <ul className="categories">
      {
        this.props.categories.map((category)=>(
          <li key={category.name}><Link to={"/posts/categories/"+category.path}>{category.name}</Link></li>
        ))
      }
      </ul>
    );
  }
}

function mapStateToProps({categories}){  
  return {
    categories:Object.values(categories),
  }
}

export default connect(mapStateToProps)(CategoryList);


