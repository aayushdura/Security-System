import {
  loginStart,
  loginSuccess,
  loginFailure,
  signOutSuccess,
  signOutFailed,
  // signUpSuccess,
  // signupStart,
  // signUpFailure,
  // setCurrentUser,
} from './userSlice'

import api from 'src/services/api'

export const loginUser = (user) => {
  return async function (dispatch) {
    dispatch(loginStart())
    try {
      const res = await api.post('/users/authenticate', user)
      if (res.data.jwtToken) {
        sessionStorage.setItem('accessToken', res.data.jwtToken)
      }
      dispatch(loginSuccess(res.data))
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(loginFailure())
      return Promise.reject(error)
    }
  }
}

export const logout = () => {
  return async function (dispatch) {
    try {
      sessionStorage.removeItem('accessToken')
      dispatch(signOutSuccess())
    } catch (error) {
      sessionStorage.removeItem('accessToken')
      dispatch(signOutFailed())
      console.log(error)
    }
  }
}
