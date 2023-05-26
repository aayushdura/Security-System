import api from 'src/services/api'
import {
  getSchedulesStart,
  getSchedulesSuccess,
  getSchedulesFailure,
  getScheduledEmployeeSuccess,
} from './scheduleSlice'
import { request } from 'src/utils/requests'
import {
  getScheduleClassStart,
  getScheduleClassSuccess,
  getScheduleClassFailure,
  addScheduleClassStart,
  addScheduleClassSuccess,
  addScheduleClassFailure,
  getAllScheduleClass,
} from './scheduleClassSlice'
import {
  getRosterSequenceStart,
  getRosterSequenceSuccess,
  getRosterSequenceFailure,
  addRosterSequenceStart,
  addRosterSequenceSuccess,
  addRosterSequenceFailure,
} from './rosterSequenceSlice'

import {
  getRosterRuleStart,
  getRosterRuleSuccess,
  getRosterRuleFailure,
  addRosterRuleStart,
  addRosterRuleSuccess,
  addRosterRuleFailure,
} from './rosterRuleSlice'
import { toast } from 'react-hot-toast'
import { getTeamsFailure, getTeamsStart, getTeamsSuccess } from './teamSlice'

//ScheduledEmployees

export const getScheduledEmployees = (params) => {
  return async function (dispatch) {
    dispatch(getSchedulesStart())
    try {
      let res = await request.searchScheduledEmployee({ params })
      if (res.data.rosterPlanningSearch?.length > 0) {
        dispatch(getScheduledEmployeeSuccess(res.data.rosterPlanningSearch))
      } else {
        toast.error('No record Found')
        dispatch(getSchedulesFailure())
      }
    } catch (err) {
      console.log(err)
      dispatch(getSchedulesFailure())
    }
  }
}

// Schedule

export const getSchedules = (payload) => {
  return async function (dispatch) {
    dispatch(getSchedulesStart())
    try {
      const res = await request.getSearchListRosterPlanning(payload)
      dispatch(getSchedulesSuccess(res.data))
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(getSchedulesFailure())
      return Promise.reject(error)
    }
  }
}

export const getALlScheduleClassList = () => {
  return async function (dispatch) {
    dispatch(getScheduleClassStart())
    try {
      const res = await request.getAllSchedulesList()
      dispatch(getAllScheduleClass(res.data?.scheduleClassDef))
    } catch (err) {
      dispatch(getScheduleClassFailure(err))
    }
  }
}

// Schedule Class

export const fetchScheduleClass = (params) => {
  return async function (dispatch) {
    dispatch(getScheduleClassStart())
    try {
      const res = await request.searchScheduleClass({ params })
      dispatch(getScheduleClassSuccess(res.data?.scheduleClassDef))
      return Promise.resolve(res)
    } catch (error) {
      dispatch(getScheduleClassFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const addScheduleClass = (payload) => {
  return async function (dispatch) {
    dispatch(addScheduleClassStart())
    try {
      const res = await request.createScheduleClass(payload)
      dispatch(addScheduleClassSuccess(res.data))
      dispatch(fetchScheduleClass())
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(addScheduleClassFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const deleteScheduleClass = (id) => {
  return async function (dispatch) {
    dispatch(addScheduleClassStart())
    try {
      const res = await api.post(`Schedule/ClassDef/delete/${id}`)
      dispatch(fetchScheduleClass())
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error.response?.data)
    }
  }
}

// Roster Sequence

export const fetchAllRosterSequence = (params) => {
  return async function (dispatch) {
    dispatch(getRosterSequenceStart())
    try {
      const res = await api.get('Schedule/RosterSequence/Search', {
        params,
      })
      console.log(res)
      if (res) {
        dispatch(getRosterSequenceSuccess(res))
        return Promise.resolve(res)
      }
    } catch (error) {
      dispatch(getRosterSequenceFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const addRosterSequence = (payload) => {
  return async function (dispatch) {
    dispatch(addRosterSequenceStart())
    try {
      const res = await api.post('Schedule/RosterSequence/create', payload)
      dispatch(addRosterSequenceSuccess(res.data))
      dispatch(fetchAllRosterSequence())
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(addRosterSequenceFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const deleteRosterSequence = (id) => {
  return async function (dispatch) {
    dispatch(addRosterSequenceStart())
    try {
      const res = await api.post(`Schedule/RosterSequence/delete/${id}`)
      dispatch(fetchAllRosterSequence())
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error.response?.data)
    }
  }
}

// Roster Rule

export const fetchAllRosterRule = () => {
  return async function (dispatch) {
    dispatch(getRosterRuleStart())
    try {
      const res = await request.getAllRosterRules()
      if (res.data?.scheduleRoaster) dispatch(getRosterRuleSuccess(res.data.scheduleRoaster))
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(getRosterRuleFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const addRosterRule = (payload) => {
  return async function (dispatch) {
    dispatch(addRosterRuleStart())
    try {
      const res = await api.post('Schedule/RosterRule/create', payload)
      dispatch(addRosterRuleSuccess(res.data))
      dispatch(fetchAllRosterRule())
      return Promise.resolve(res.data)
    } catch (error) {
      dispatch(addRosterRuleFailure())
      return Promise.reject(error.response?.data)
    }
  }
}

export const deleteRosterRule = (id) => {
  return async function (dispatch) {
    dispatch(addRosterRuleStart())
    try {
      const res = await api.post(`Schedule/RosterRule/delete/${id}`)
      dispatch(fetchAllRosterRule())
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error.response?.data)
    }
  }
}

// teams

export const searchTeams = (params) => {
  return async function (dispatch) {
    dispatch(getTeamsStart())
    try {
      let res = await request.searchTeams({ params })
      dispatch(getTeamsSuccess(res.data.teams))
    } catch (err) {
      dispatch(getTeamsFailure())
      console.log(err)
    }
  }
}
