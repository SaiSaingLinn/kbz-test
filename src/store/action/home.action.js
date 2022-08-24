import { authStore } from "../../services"

const setHomeStore = (type, data) => {
  return ({
    type,
    data
  })
}

const setLoginStore = (type, data) => {
  authStore.setAuth(data)
  return ({
    type,
    data
  })
}

const setLogout = () => async dispatch => {
  authStore.removeAuth()
}

export const home = {
  setHomeStore,
  setLoginStore,
  setLogout
}