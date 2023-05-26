import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  errorList: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isFetching = true
      state.error = false
      state.currentUser = action.payload
      state.isFetching = false
    },
    loginStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },
    loginFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    signupStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    signUpSuccess: (state) => {
      state.isFetching = false
      state.error = false
    },
    signUpFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    signOutSuccess: (state) => {
      state.isFetching = false
      state.currentUser = null
      state.error = false
    },
    signOutFailed: (state) => {
      state.error = true
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signOutSuccess,
  signOutFailed,
  signUpSuccess,
  signupStart,
  signUpFailure,
  setCurrentUser,
} = userSlice.actions

export default userSlice.reducer
