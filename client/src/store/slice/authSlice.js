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
      state.user = action.payload.loggedIn || {};
      state.error = action.payload.errors ||  {};
      state.isAuthenticated = false;
    },
    login_user: (state, action) => {
      state.user = action.payload.loggedIn || {};
      state.error = action.payload.errors ||  {};
      state.isAuthenticated = action.payload.loggedIn ? true : false;
      state.message = action.payload.Message || '';
    },
    clear_authstate: (state) => {
      state.user = {};
      state.error = {};
      state.isAuthenticated = false
      state.message = '';
    }
  }
})

export const { signup_user, login_user, clear_authstate } = authSlice.actions
export default authSlice.reducer;