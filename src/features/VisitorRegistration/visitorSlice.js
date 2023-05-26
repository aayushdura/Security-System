const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  allVisitors: [],
  currentLocation: null,
  isFetching: false,
  fetchError: null,
}
const visitorSlice = createSlice({
  name: 'visitorSlice',
  initialState,
  reducers: {
    visitorFetchStart: (state) => {
      state.isFetching = true
    },
    allVisitorsFetchSuccess: (state, action) => {
      state.isFetching = false
      state.allVisitors = action.payload
    },
    visitorFetchFailure: (state, action) => {
      state.isFetching = false
      state.fetchError = action.payload
    },
  },
})

export const { visitorFetchStart, allVisitorsFetchSuccess, visitorFetchFailure } =
  visitorSlice.actions
export default visitorSlice.reducer
