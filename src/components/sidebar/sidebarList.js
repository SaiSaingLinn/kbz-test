import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa'
import { MdAddCircleOutline } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'

const navStyle = {
  width: 300,
  paddingBottom: 40,
  color: '#FFF',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  boxShadow: 'none',
  backgroundColor: '#1C232F',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: "100%",
  flex: "1 0 auto",
  zIndex: 1200,
  position: 'fixed',
  top: 0,
  outline: 0,
  left: 0,
  borderRight: '1px solid rgb(231, 235, 240)',
}

const navLink = {
  color: '#FFF',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
}

export default function SidebarList() {
  return (
    <div className='nav-wrap'>
        <div style={navStyle}>
          <div style={{padding: '10px 30px', background: '#161C25'}}>
            <h1>CRM App</h1>
          </div>
          <div>
            <h5 style={{textTransform: 'uppercase', padding: '0 15px'}}>Navigation</h5>
            <ul style={{color: '#FFF', listStyle: 'none', padding: 0, margin: 0}}>
              <li>
                <Link to="/" style={{background: '#161C25'}} className="nav-link-wrap">
                  <div style={navLink}>
                    <FaUserFriends /> 
                    <span className='nav-text'>Customers</span>
                  </div>
                </Link>
              </li>    
              <li>
                <Link to="/" className="nav-link-wrap">
                  <div style={navLink}>
                    <MdAddCircleOutline /> 
                    <span className='nav-text'>Add New Customer</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="nav-link-wrap">
                <div style={navLink}>
                  <BiUserCircle /> 
                  <span className='nav-text'>Logout</span>
                </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}
