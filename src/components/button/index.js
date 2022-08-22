import React from 'react'
import colors from '../colors'

const buttonPrimary = {
  color: "#FFFFFF",
  border: `1px solid ${colors.primary}`,
  backgroundColor: `${colors.primary}`,
}

const buttonDelete = {
  color: "#FFFFFF",
  border: `1px solid ${colors.danger}`,
  backgroundColor: `${colors.danger}`,
}

const buttonEdit = {
  color: "#000000",
  border: `1px solid ${colors.info}`,
  backgroundColor: `${colors.info}`,
}

const buttonSecondary = {
  color: "#4F46E5",
  border: `1px solid ${colors.secondary}`,
  backgroundColor: `${colors.secondary}`,
}

export default function Button(props) {
  return (
    <button 
      style={
        props?.color === "primary" ? 
        buttonPrimary :
        props?.color === "delete" ?
        buttonDelete :
        props?.color === "edit" ?
        buttonEdit :
        buttonSecondary
      }
      type={props.type}
    >
      {props.children}
    </button>
  )
}
