import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: {},
    Message: null,
    isAuhtneticated: false
  },
  reducers: {
    signup_user: (state, action) => {
      state.user = action.payload.registered_user ? action.payload.registered_user : null;
      state.Message = action.payload.Message ? action.payload.Message : null;
      state.error = !action.payload.errors ?  null : action.payload.errors;
      state.isAuhtneticated = false;
    }
  }
})

export const { signup_user } = authSlice.actions
export default authSlice.reducer;