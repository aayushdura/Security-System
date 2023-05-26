import { request } from 'src/utils/requests'
import {
  getSystemCountry,
  getSystemDefEnd,
  getSystemDefStart,
  getSystemDepartment,
  getSystemGenderType,
  getSystemPositioins,
} from './systemDefSlice'

export const getSystemDefGender = (params) => {
  return async function (dispatch) {
    dispatch(getSystemDefStart())
    try {
      const res = await request.getSystemDefType(params)
      dispatch(getSystemGenderType(res.data.systemGeneralDef))
      dispatch(getSystemDefEnd())
    } catch (err) {
      console.log(err)
      dispatch(getSystemDefEnd())
    }
  }
}
export const getCountries = () => {
  return async function (dispatch) {
    dispatch(getSystemDefStart())
    try {
      let res = await request.fetchCountryDetails()
      dispatch(getSystemCountry(res.data.countries))
      dispatch(getSystemDefEnd())
    } catch (err) {
      console.log(err)
      dispatch(getSystemDefEnd())
    }
  }
}
export const getAllDepartments = () => {
  return async function (dispatch) {
    dispatch(getSystemDefStart())
    try {
      let res = await request.fetchEmployeeDepartment()
      dispatch(getSystemDepartment(res.data?.department))
    } catch (err) {
      console.log(err)
      dispatch(getSystemDefEnd())
    }
  }
}
export const getAllPositions = () => {
  return async function (dispatch) {
    dispatch(getSystemDefStart())
    try {
      let res = await request.fetchEmployeePosition()
      dispatch(getSystemPositioins(res.data?.position))
    } catch (err) {
      console.log(err)
      dispatch(getSystemDefEnd())
    }
  }
}
