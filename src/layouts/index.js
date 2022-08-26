import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { authStore } from '../services'
import { home } from '../store/action'
import AppRoute from './../router/router'

export default function Index() {
  const dispatch = useDispatch();
  // signout if token expired 
  useEffect(() => {
    if(authStore.getAuth()) {
      let tokenExpiredTime = authStore.getAuth()?.stsTokenManager?.expirationTime;
      let now = +new Date();
      if(now > tokenExpiredTime) {
        dispatch(home.setLogout())
        window.location.href = "/"
      }
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  )
}
