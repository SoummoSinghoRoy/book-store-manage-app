import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: {},
    isAuhtneticated: false
  },
  reducers: {
    signup_user: (state, action) => {
      state.user = action.payload.registered_user ? action.payload.registered_user : {};
      state.error = !action.payload.errors ?  {} : action.payload.errors;
      state.isAuhtneticated = false;
    },
    login_user: (state, action) => {
      state.user = action.payload.loggedIn ? action.payload.loggedIn : {};
      state.error = !action.payload.errors ?  {} : action.payload.errors;
      state.isAuhtneticated = action.payload.loggedIn ? true : false;
    }
  }
})

export const { signup_user, login_user } = authSlice.actions
export default authSlice.reducer;