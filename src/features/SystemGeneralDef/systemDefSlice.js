const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  systemGenderType: [],
  systemDepartments: [],
  systemCountry: [],
  systemPosition: [],
  isFetching: false,
  errorStatus: false,
}

const systemDefSlice = createSlice({
  name: 'systemDef',
  initialState,
  reducers: {
    getSystemDefStart: (state) => {
      state.isFetching = true
    },
    getSystemGenderType: (state, action) => {
      state.systemGenderType = action.payload
      state.isFetching = false
      state.errorStatus = false
    },
    getSystemDepartment: (state, action) => {
      state.systemDepartments = action.payload
      state.isFetching = false
      state.errorStatus = false
    },
    getSystemPositioins: (state, action) => {
      state.systemPosition = action.payload
      state.isFetching = false
      state.errorStatus = false
    },
    getSystemCountry: (state, action) => {
      state.systemCountry = action.payload
      state.errorStatus = false
    },
    getSystemDefEnd: (state) => {
      state.isFetching = false
    },
    setSystemDefError: (state) => {
      state.errorStatus = true
      state.isFetching = false
    },
  },
})
export const {
  getSystemDefStart,
  getSystemGenderType,
  getSystemDefEnd,
  setSystemDefError,
  getSystemCountry,
  getSystemDepartment,
  getSystemPositioins,
} = systemDefSlice.actions

export default systemDefSlice.reducer
