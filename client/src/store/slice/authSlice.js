import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: {},
    message: '',
    isAuhenticated: false
  },
  reducers: {
    signup_user: (state, action) => {
      state.user = action.payload.loggedIn || {};
      state.error = action.payload.errors ||  {};
      state.isAuhenticated = false;
    },
    login_user: (state, action) => {
      state.user = action.payload.loggedIn || {};
      state.error = action.payload.errors ||  {};
      state.message = action.payload.Message || '';
      state.isAuhenticated = action.payload.loggedIn ? true : false;
    },
    clear_authstate: (state) => {
      state.user = {};
      state.error = {};
      state.message = '';
      state.isAuhenticated = false
    }
  }
})

export const { signup_user, login_user, clear_authstate } = authSlice.actions
export default authSlice.reducer;