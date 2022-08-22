import React, { useState } from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import Breadcrumb from '../breadcrumb'
import { useDispatch, useSelector } from 'react-redux';
import { home } from '../../store/action';
import './appbar.css'

export default function AppBar() {
  const dispatch = useDispatch();
  const { toggle_state } = useSelector(state => state.home);
  const toggleMenu = () => {
    // if toggle false set to true and if ture set to false
    !toggle_state ? dispatch(home.setHomeStore('SET_TOGGLE', true))  : dispatch(home.setHomeStore('SET_TOGGLE', false))
  }
  return (
    <div 
      className='app-bar' 
      style={{
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 4%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 4px 0px',
        backgroundColor: '#FFF',
      }}
      >
        <div className='top-app-bar' style={{padding: 20}}>
          <div className='toggle-menu'>
            {
              toggle_state ?
              <MdClose style={{fontSize: 26}} onClick={() => toggleMenu()} /> :
              <MdMenu style={{fontSize: 26}} onClick={() => toggleMenu()} />
            }
            
          </div>
          <div className="profile" style={{display: 'flex', alignItems: 'center'}}>
            <div className="profile-image" style={{marginRight: 5}}>
              <FaUserCircle style={{fontSize: 40}} />
            </div>
            <div className="profile-name" style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: '14px', marginBottom: '3px'}}>John Doe</span>
              <span style={{fontSize: '10px', color: '#666'}}>Administrator</span>
            </div>
          </div>
        </div>
        <Breadcrumb />
    </div>
  )
}
