import { authStore } from "../../services"

const initialState = {
  home_data: null,
  toggle_state: false,
  login_data: authStore.getAuth() || null,
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOGGLE':
      return {
        ...state,
        toggle_state: action.data
      }
    case 'SET_LOGIN':
        return {
          ...state,
          login_data: action.data,
        }
    default:
      return state
  }
}

export default home