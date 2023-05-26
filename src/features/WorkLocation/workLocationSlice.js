const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  allWorkLocations: [],
  currentLocation: null,
  contactPersons: [],
  propEquipInfo: [],
  documents: [],
  isFetching: false,
  fetchError: null,
}
const workLocationSlice = createSlice({
  name: 'workLocation',
  initialState,
  reducers: {
    workLocationFetchStart: (state) => {
      state.isFetching = true
    },
    allWorkLocationsFetchSuccess: (state, action) => {
      state.isFetching = false
      state.allWorkLocations = action.payload
    },
    workLocationFetchSuccess: (state, action) => {
      state.currentLocation = action.payload
      state.isFetching = false
    },
    contactPersonsFetchSuccess: (state, action) => {
      state.contactPersons = action.payload
      state.isFetching = false
    },
    propEquipFetchSuccess: (state, action) => {
      state.propEquipInfo = action.payload
      state.isFetching = false
    },
    documentFetchSuccess: (state, action) => {
      state.documents = action.payload
      state.isFetching = false
    },
    workLocationFetchFailure: (state, action) => {
      state.isFetching = false
      state.fetchError = action.payload
    },
  },
})

export const {
  workLocationFetchStart,
  allWorkLocationsFetchSuccess,
  contactPersonsFetchSuccess,
  propEquipFetchSuccess,
  workLocationFetchFailure,
  workLocationFetchSuccess,
  documentFetchSuccess,
} = workLocationSlice.actions
export default workLocationSlice.reducer
