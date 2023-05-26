import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  allStaffs: [],
  currentEmployee: {},
  errorStatus: false,
  error: {},
  isFetching: false,
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployeeListStart: (state) => {
      state.isFetching = true
      state.errorStatus = false
    },
    getCurrentEmployee: (state, action) => {
      state.errorStatus = false
      state.currentEmployee = action.payload
    },
    getAllEmployeeList: (state, action) => {
      state.errorStatus = false
      state.employees = action.payload
      state.isFetching = false
    },
    getAllStaffList: (state, action) => {
      state.errorStatus = false
      state.allStaffs = action.payload
      state.isFetching = false
    },
    getEmployeeListFail: (state, action) => {
      state.isFetching = false
      state.errorStatus = true
      state.error = action.payload
    },
  },
})

export const {
  getAllEmployeeList,
  getAllStaffList,
  getCurrentEmployee,
  getEmployeeListStart,
  getEmployeeListFail,
  getEmployeeImage,
} = employeeSlice.actions
export default employeeSlice.reducer
