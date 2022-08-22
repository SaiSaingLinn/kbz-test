import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoute from './../router/router'

export default function Index() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  )
}
