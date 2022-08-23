import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { NavLink, useLocation } from 'react-router-dom'

export default function Breadcrumb() {
  const location = useLocation();
  return (
    <div className="breadcrumb" 
      style={{
        padding: 20, 
        paddingBottom: 10,
        borderTopColor: 'rgb(227 224 224)',
        borderTopStyle: 'solid',
        borderTopWidth: '1px'
      }}>
      <nav>
        <ol style={{
          display: "flex",
          flexWrap: "wrap",
          WebkitBoxAlign: "center",
          alignItems: "center",
          padding: "0px",
          margin: "0px",
          listStyle: "none",
          fontSize: '12px',
          color: '#666'
        }}>
          <li><span><NavLink to="/">Dashboard</NavLink></span></li>
          <li style={{
            display: "flex",
            userSelect: "none",
            marginLeft: "8px",
            marginRight: "8px",
          }}><IoIosArrowForward />
          </li>
          <li>{location.pathname === "/" ? <span>Customer</span> : <span>Add Customer</span>}</li>
        </ol>
      </nav>
    </div>
  )
}
