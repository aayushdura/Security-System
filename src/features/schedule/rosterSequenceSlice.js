import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rosterSequence: [],
  isFetching: false,
  isAdding: false,
  error: false,
  errorList: [],
}

export const rosterSequenceSlice = createSlice({
  name: 'rosterSequence',
  initialState,
  reducers: {
    getRosterSequenceStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getRosterSequenceSuccess: (state, action) => {
      state.isFetching = false
      state.rosterSequence = action.payload
    },
    getRosterSequenceFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addRosterSequenceStart: (state) => {
      state.isAdding = true
      state.error = false
    },
    addRosterSequenceSuccess: (state, action) => {
      state.isAdding = false
      state.rosterSequence = action.payload
    },
    addRosterSequenceFailure: (state) => {
      state.isAdding = false
      state.error = true
    },
    // deleteRosterSequence: (state, action) => {
    //   state.rosterSequence = state.rosterSequence.filter((item) => item.id !== action.payload)
    // },
  },
})

export const {
  getRosterSequenceStart,
  getRosterSequenceSuccess,
  getRosterSequenceFailure,
  addRosterSequenceStart,
  addRosterSequenceSuccess,
  addRosterSequenceFailure,
} = rosterSequenceSlice.actions
export default rosterSequenceSlice.reducer
