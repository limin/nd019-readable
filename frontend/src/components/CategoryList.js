import React from 'react'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component{
  render(){
    return (
      <ul className="categories">
      {
        this.props.categories.map((category)=>(
          <li key={category.name}><Link to={"/posts/categories/"+category.path} onClick={()=>this.prop.selectCategory(category.path)}>{category.name}</Link></li>
        ))
      }
      </ul>
    );
  }
}

export default CategoryList
