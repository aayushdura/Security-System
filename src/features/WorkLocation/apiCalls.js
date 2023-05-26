import { request } from 'src/utils/requests'
import {
  workLocationFetchFailure,
  allWorkLocationsFetchSuccess,
  workLocationFetchSuccess,
  workLocationFetchStart,
  contactPersonsFetchSuccess,
  propEquipFetchSuccess,
  documentFetchSuccess,
} from './workLocationSlice'

export const getAllWorkLocations = (params) => {
  return async function (dispatch) {
    dispatch(workLocationFetchStart())
    try {
      let res = await request.getAllSites({ params })
      dispatch(allWorkLocationsFetchSuccess(res.data?.location))
    } catch (err) {
      dispatch(workLocationFetchFailure(err))
      console.log(err)
    }
  }
}

export const getSingleWorkLocation = (params) => {
  return async function (dispatch) {
    dispatch(workLocationFetchStart())
    try {
      let res = await request.getSingleSite(params)
      dispatch(workLocationFetchSuccess(res.data))
    } catch (err) {
      dispatch(workLocationFetchFailure(err))
      console.log(err.response.data)
    }
  }
}

export const getAllContactPersons = (params) => {
  return async function (dispatch) {
    dispatch(workLocationFetchStart())
    try {
      let res = await request.getAllContactPerson(params)
      dispatch(contactPersonsFetchSuccess(res.data.contactPersons))
    } catch (err) {
      dispatch(workLocationFetchFailure())
      console.log(err.response.data)
    }
  }
}

export const getAllPropEquipInfo = (params) => {
  return async function (dispatch) {
    dispatch(workLocationFetchStart())
    try {
      let res = await request.getAllPropEquipInfo(params)
      dispatch(propEquipFetchSuccess(res.data.propertyAndEquipments))
    } catch (err) {
      dispatch(workLocationFetchFailure())
      console.log(err.response.data)
    }
  }
}

export const getWorkDocuments = (params) => {
  return async function (dispatch) {
    dispatch(workLocationFetchStart())
    try {
      let res = await request.getWorkFolderList(params)
      dispatch(documentFetchSuccess(res.data.folder))
    } catch (err) {
      dispatch(workLocationFetchFailure())
      console.log(err.response.data)
    }
  }
}
