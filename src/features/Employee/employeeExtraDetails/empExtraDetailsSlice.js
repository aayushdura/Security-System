const { createSlice } = require('@reduxjs/toolkit')

const intialState = {
  generalInfo: {
    workExperience: [],
    education: [],
    licenseCertification: [],
    skills: [],
    emergencyDependants: [],
  },
  paymentInfo: {
    fixAllowanceInfo: [],
    reimbursementInfo: [],
    deductionInfo: [],
    taxtaionInfo: [],
  },
  performanceInfo: {
    performanceReview: [],
    training: [],
    creditPenalty: [],
  },
  documents: {
    folders: [],
    files: [],
  },
}
export const employeeExtraDetails = createSlice({
  name: 'empExtraDetails',
  initialState: intialState,
  reducers: {
    workExperience: (state, action) => {
      state.generalInfo.workExperience = action.payload
    },
    education: (state, action) => {
      state.generalInfo.education = action.payload
    },
    licenseCertification: (state, action) => {
      state.generalInfo.licenseCertification = action.payload
    },
    skills: (state, action) => {
      state.generalInfo.skills = action.payload
    },
    emergencyDependants: (state, action) => {
      state.generalInfo.emergencyDependants = action.payload
    },
    fixAllowanceInfo: (state, action) => {
      state.paymentInfo.fixAllowanceInfo = action.payload
    },
    deductionInfo: (state, action) => {
      state.paymentInfo.deductionInfo = action.payload
    },
    taxtaionInfo: (state, action) => {
      state.paymentInfo.taxtaionInfo = action.payload
    },
    performanceReview: (state, action) => {
      state.performanceInfo.performanceReview = action.payload
    },
    training: (state, action) => {
      state.performanceInfo.training = action.payload
    },
    creditPenalty: (state, action) => {
      state.performanceInfo.creditPenalty = action.payload
    },
    folders: (state, action) => {
      state.documents.folders = action.payload
    },
  },
})

export const {
  workExperience,
  fixAllowanceInfo,
  creditPenalty,
  deductionInfo,
  education,
  emergencyDependants,
  licenseCertification,
  performanceReview,
  skills,
  taxtaionInfo,
  training,
  folders,
} = employeeExtraDetails.actions

export default employeeExtraDetails.reducer
