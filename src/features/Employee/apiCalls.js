import { request } from 'src/utils/requests'
import {
  getAllEmployeeList,
  getAllStaffList,
  getCurrentEmployee,
  getEmployeeListFail,
  getEmployeeListStart,
} from './employeeSlice'

export const getEmployeeList = (params) => {
  return async function (dispatch) {
    dispatch(getEmployeeListStart())
    try {
      const res = await request.getEmployeeList({ params })
      res.data?.employees && dispatch(getAllEmployeeList(res.data?.employees))
    } catch (err) {
      dispatch(getEmployeeListFail(err))
    }
  }
}
export const getStaffList = (params) => {
  return async function (dispatch) {
    dispatch(getEmployeeListStart())
    try {
      const res = await request.searchStaffList({ params })
      res.data?.employees && dispatch(getAllStaffList(res.data?.employees))
    } catch (err) {
      dispatch(getEmployeeListFail(err))
    }
  }
}
export const getEmployee = (params) => {
  return async function (dispatch) {
    try {
      const res = await request.getSingleEmployee(params)
      res.data && dispatch(getCurrentEmployee(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}
