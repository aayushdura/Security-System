import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rosterRules: [],
  isFetching: false,
  currentRosterRule: {},
  isAdding: false,
  error: false,
  errorList: [],
}

export const rosterRuleSlice = createSlice({
  name: 'rosterRule',
  initialState,
  reducers: {
    getRosterRuleStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getRosterRuleSuccess: (state, action) => {
      state.isFetching = false
      state.rosterRules = action.payload
    },
    getRosterRuleFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addRosterRuleStart: (state) => {
      state.isAdding = true
      state.error = false
    },
    addRosterRuleSuccess: (state, action) => {
      state.isAdding = false
      state.currentRosterRule = action.payload
    },
    addRosterRuleFailure: (state) => {
      state.isAdding = false
      state.error = true
    },
  },
})

export const {
  getRosterRuleStart,
  getRosterRuleSuccess,
  getRosterRuleFailure,
  addRosterRuleStart,
  addRosterRuleSuccess,
  addRosterRuleFailure,
} = rosterRuleSlice.actions

export default rosterRuleSlice.reducer
