import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: {},
    isAuthenticated: false,
    message: ''
  },
  reducers: {
    signup_user: (state, action) => {
      return{
        ...state,
        user: action.payload.loggedIn || {},
        error: action.payload.errors ||  {},
        isAuthenticated: false
      }
    },
    login_user: (state, action) => {
      return {
        user: action.payload.loggedIn || {},
        error: action.payload.errors || {},
        isAuthenticated: action.payload.loggedIn ? true : false,
        message: action.payload.Message || ''
      }
    },
    logout_user: (state, action) => {
      return {
        user: {},
        error: {},
        isAuthenticated: false,
        message: ''
      }
    },
    clear_authstate: (state) => {
      return {
        ...state
      }
    }
  }
})

export const { signup_user, login_user, logout_user, clear_authstate } = authSlice.actions
export default authSlice.reducer;