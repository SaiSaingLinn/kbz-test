import React from 'react'
import { useSelector } from 'react-redux'
import SidebarList from './sidebarList';
import './sidebarList.css'

export default function Sidebar() {
  const { toggle_state } = useSelector(state => state.home);
  return (
    <>
      {/* for mobile */}
      <nav 
        style={{
          flexShrink: 0, 
          width: toggle_state ? 300 : 0, 
          transform: toggle_state ? "translateX(0)" : "translateX(-300px)"
        }} 
        className="nav-sidebar mobile"
      >
        <SidebarList />
      </nav>

      {/* for desktop */}
      <nav 
        style={{
          flexShrink: 0,
        }} 
        className="nav-sidebar desktop"
      >
        <SidebarList />
      </nav>
    </>
  )
}
