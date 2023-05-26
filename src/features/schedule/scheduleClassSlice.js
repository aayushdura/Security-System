import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scheduleClass: [],
  allScheduleClass: [],
  isFetching: false,
  isAdding: false,
  error: false,
  errorList: [],
}

export const scheduleClassSlice = createSlice({
  name: 'scheduleClass',
  initialState,
  reducers: {
    getScheduleClassStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getScheduleClassSuccess: (state, action) => {
      state.isFetching = false
      state.scheduleClass = action.payload
    },
    getAllScheduleClass: (state, action) => {
      state.isFetching = false
      state.allScheduleClass = action.payload
    },
    getScheduleClassFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addScheduleClassStart: (state) => {
      state.isAdding = true
      state.error = false
    },
    addScheduleClassSuccess: (state, action) => {
      state.isAdding = false
      state.scheduleClass = action.payload
    },
    addScheduleClassFailure: (state) => {
      state.isAdding = false
      state.error = true
    },
    // deleteScheduleClass: (state, action) => {
    //   state.scheduleClass = state.scheduleClass.filter((item) => item.id !== action.payload)
    // },
  },
})

export const {
  getScheduleClassStart,
  getScheduleClassSuccess,
  getScheduleClassFailure,
  getAllScheduleClass,
  addScheduleClassStart,
  addScheduleClassSuccess,
  addScheduleClassFailure,
} = scheduleClassSlice.actions

export default scheduleClassSlice.reducer
