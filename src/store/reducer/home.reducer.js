const initialState = {
  home_data: null,
  toggle_state: false,
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_STORE':
      return {
        ...state,
        home_data: action.data
      }
    case 'SET_TOGGLE':
      return {
        ...state,
        toggle_state: action.data
      }
    default:
      return state
  }
}

export default home