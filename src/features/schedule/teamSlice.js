import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teams: [],
  //   scheduledEmployees: [],
  isFetching: false,
  error: false,
  errorList: [],
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    getTeamsStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getTeamsSuccess: (state, action) => {
      state.isFetching = false
      state.teams = action.payload
    },
    // getScheduledEmployeeSuccess: (state, action) => {
    //   state.isFetching = false
    //   state.scheduledEmployees = action.payload
    // },
    getTeamsFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { getTeamsStart, getTeamsSuccess, getTeamsFailure } = teamSlice.actions

export default teamSlice.reducer
