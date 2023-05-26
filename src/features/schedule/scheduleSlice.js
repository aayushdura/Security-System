import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  schedules: [],
  scheduledEmployees: [],
  isFetching: false,
  error: false,
  errorList: [],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    getSchedulesStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getSchedulesSuccess: (state, action) => {
      state.isFetching = false
      state.schedules = action.payload
    },
    getScheduledEmployeeSuccess: (state, action) => {
      state.isFetching = false
      state.scheduledEmployees = action.payload
    },
    getSchedulesFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const {
  getSchedulesStart,
  getSchedulesSuccess,
  getSchedulesFailure,
  getScheduledEmployeeSuccess,
} = scheduleSlice.actions

export default scheduleSlice.reducer
