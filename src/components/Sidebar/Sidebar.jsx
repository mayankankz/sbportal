import React from 'react'
import './Sidebar.scss'
import { menu } from '../../data'
import { Link } from 'react-router-dom'
function Sidebar() {
  return (
    <div className= "sidebar">
    <div className="menu">
    {menu.map((item) => (
      <div className="item" key={item.id}>
        <span className="title">{item.title}</span>
        {item.listItems.map((listItem) => (
          <Link to={listItem.url} className="listItem" key={listItem.id}>
            <img src={listItem.icon} alt="" />
            <span className="listItemTitle">{listItem.title}</span>
          </Link>
        ))}
      </div>
    ))}
  </div>
    
    </div>
  )
}

export default Sidebar