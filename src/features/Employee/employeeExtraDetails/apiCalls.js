import { request } from 'src/utils/requests'
import {
  deductionInfo,
  education,
  emergencyDependants,
  fixAllowanceInfo,
  folders,
  licenseCertification,
  skills,
  taxtaionInfo,
  workExperience,
} from './empExtraDetailsSlice'

// general Info
export const getWorkinExperienceList = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getWorkExperienceList(id)
      dispatch(workExperience(res.data.workExperience))
    } catch (err) {
      console.log(err)
    }
  }
}
export const getEducationHistoryList = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getEducationHistoryList(id)
      dispatch(education(res.data.educations))
    } catch (err) {
      console.log(err)
    }
  }
}
export const getLicenseList = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getLisenceList(id)
      dispatch(licenseCertification(res.data.licenseCertificate))
    } catch (err) {
      console.log(err)
    }
  }
}
export const getSkills = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getSkills(id)
      dispatch(skills(res.data.skill))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getEmergencyContact = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getEmergencyDetails(id)
      dispatch(emergencyDependants(res.data.familyContact))
    } catch (err) {
      console.log(err)
    }
  }
}
// Payroll Info
export const getFixedAllowance = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getFixedAllowance(id)
      dispatch(fixAllowanceInfo(res.data.wagesAllowance))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getFixedDeduction = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getFixedDeduction(id)
      dispatch(deductionInfo(res.data.wagesDeduction))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getTaxation = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getWorkExperienceList(id)
      dispatch(taxtaionInfo(res.data.taxation))
    } catch (err) {
      console.log(err)
    }
  }
}

// Documents

export const getDocumentList = (id) => {
  return async function (dispatch) {
    try {
      let res = await request.getFolderList(id)
      dispatch(folders(res.data.folder))
    } catch (err) {
      console.log(err)
    }
  }
}
