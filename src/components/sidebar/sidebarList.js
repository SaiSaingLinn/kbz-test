import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { FaUserFriends } from 'react-icons/fa'
import { MdAddCircleOutline } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { home } from '../../store/action'
import { getAuth, signOut } from 'firebase/auth'

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
  const dispatch = useDispatch();
  const history = useHistory();
  const { toggle_state } = useSelector(state => state.home);
  const toggleMenu = () => {
    // if toggle false set to true and if ture set to false
    !toggle_state ? dispatch(home.setHomeStore('SET_TOGGLE', true))  : dispatch(home.setHomeStore('SET_TOGGLE', false))
  }

  // handle logout
  const handleLogout = () => {
    toggleMenu();
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        dispatch(home.setLogout())
        history.push('/')
      }).catch((error) => {
        console.log('error', error)
      });
    } catch (error) {
      console.log('error', error)
    }
  }
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
                <NavLink to="/" className="nav-link-wrap" onClick={() => toggleMenu()}>
                  <div style={navLink}>
                    <FaUserFriends /> 
                    <span className='nav-text'>Customers</span>
                  </div>
                </NavLink>
              </li>    
              <li>
                <NavLink to="/addCustomer" className="nav-link-wrap" onClick={() => toggleMenu()}>
                  <div style={navLink}>
                    <MdAddCircleOutline /> 
                    <span className='nav-text'>Add New Customer</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/familyClaim" className="nav-link-wrap" onClick={() => toggleMenu()}>
                  <div style={navLink}>
                    <MdAddCircleOutline /> 
                    <span className='nav-text'>Family Claim</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <div className="nav-link-wrap" onClick={() => handleLogout()}>
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
