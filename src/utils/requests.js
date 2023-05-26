const { default: api } = require('src/services/api')

const auth = {
  getUserInfo: () => api.post('users/auth-user-info'),
  registerNewUser: (data) => api.post(`users/register`, data),
}
const getSystemGeneralDefType = {
  getSystemDefType: (data) => api.get(`SystemGeneralDef/list?DefineType=${data}`),
  createDepartment: (data) => api.post('Department/create', data),
  createPosition: (data) => api.post('EmployeePosition/create', data),
}
const getSchedules = {
  getAllSchedulesList: () => api.get(`Schedule/ClassDef/list`),
  getSearchListRosterPlanning: (data) =>
    api.get('Schedule/RosterPlanning/SearchListRosterPlanning', data),
  searchScheduleClass: (data) => api.get('Schedule/ClassDef/search', data),
  createScheduleClass: (data) => api.post('Schedule/ClassDef/create', data),
  updateScheduleClass: (SclassCode, data) =>
    api.post(`Schedule/ClassDef/update/${SclassCode}`, data),
}

const employeeSchedulePlanning = {
  searchScheduledEmployee: (data) => api.get(`employees/RosterPlanning/Search`, data),
}
const staff = {
  searchStaffList: (data) => api.get(`employees/staff/Search`, data),
}
const employeeOperation = {
  fetchEmployeeStatus: () => api.get('EmployeeStatus/list'),
  fetchEmployeeDepartment: () => api.get('Department/list'),
  fetchEmployeePosition: () => api.get('EmployeePosition/list'),
  fetchCountryDetails: () => api.get('common/country/list'),
  fetchStateList: (params) => api.get(`common/stateProvince/list?${params}`),
  fetchCountysList: (params) => api.get(`common/county/get?StateProvinceCode=${params}`),
  fetchMpfProvider: () => api.get(''),
  addEmployee: (data) => api.post(`employees/createNew`, data),
  addAddress: (data) => api.post(`address/create`, data),
  getAddress: () => api.get(`address/list`),
  getEmployeeList: (data) => api.get(`employees/employee/Search`, data),
  getSingleEmployee: (id) => api.get(`employees/employee/${id}`),
  updateSingleEmployee: (id, data) => api.post(`employees/updateemployee/${id}`, data),
  deleteEmployee: (id) => api.post(`employees/delete/${id}`),
}
const employeePerformance = {
  addCreditPenalty: (data) => api.post(`WagesMaster/RewardPenalty/create`, data),
  getCreditPenaltyList: (id) => api.get(`WagesMaster/RewardPenalty/list?EmployeeGuid=${id}`),
  addPerformanceReview: (data) => api.post(`EmployeePerformanceReviews/create`, data),
  getPerformanceList: (id) => api.get(`EmployeePerformanceReviews/list/${id}`),
  addTraining: (data) => api.post(`EmployeeTraining/create`, data),
  getTrainingList: (id) => api.get(`EmployeeTraining/list/${id}`),
}
const employeeBasicDetails = {
  getWorkExperienceList: (id) => api.get(`EmployeeWorkExperience/list/${id}`),
  addWorkExperience: (data) => api.post(`EmployeeWorkExperience/create`, data),
  addEducationHistory: (data) => api.post(`EmployeeEducationHistory/create`, data),
  getEducationHistoryList: (id) => api.get(`EmployeeEducationHistory/list/${id}`),
  addLicense: (data) => api.post(`EmployeeLicenseCertification/create`, data),
  getLisenceList: (id) => api.get(`EmployeeLicenseCertification/list/${id}`),
  addSkills: (data) => api.post(`EmployeeSkill/create`, data),
  getSkills: (id) => api.get(`EmployeeSkill/list/${id}`),
  addEmergencyDetails: (data) => api.post(`EmployeefamilyContact/create`, data),
  getEmergencyDetails: (id) => api.get(`EmployeefamilyContact/list/${id}`),
}
const employeePaymentInfo = {
  addBankAccountInfo: (id, data) => api.post(`employees/updateEmployeeBankInfo/${id}`, data),
  addFixedAllowance: (data) => api.post(`WagesMaster/Allowance/create`, data),
  getFixedAllowance: (id) => api.get(`WagesMaster/Allowance/list/${id}`),
  addFixedDeduction: (data) => api.post(`WagesMaster/Deduction/create`, data),
  getFixedDeduction: (id) => api.get(`EmployeeTaxation/list/${id}`),
  addTaxation: (data) => api.post(`EmployeeTaxation/create`, data),
  getTaxationList: (id) => api.get(`EmployeeTaxation/list/${id}`),
}
const media = {
  uploadImage: (data) =>
    api.post('media/image/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getImage: (id) => api.get(`media/image/get/${id}`),
  uploadIdCard: (data) =>
    api.post(`employees/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
const employeeDocuments = {
  getFolderList: (id) => api.get(`UploadDocument/list/${id}`),
  createFolder: (data) => api.post(`UploadDocument/create/Folder`, data),
  createDocument: (data) => api.post(`UploadDocument/create`, data),
  deleteFolder: (data) => api.post(`UploadDocument/delete`, data),
}

const rosterRule = {
  createRosterRule: (data) => api.post(`Schedule/RosterRule/create`, data),
  getAllRosterRules: () => api.get(`Schedule/RosterRule/list`),
  updateRosterRules: (id, data) => api.post(`Schedule/RosterRule/update/${id}`, data),
}
const rosterSequnce = {
  createRosterSequence: (data) => api.post(`Schedule/RosterSequence/create`, data),
  getAllRosterSequence: (data) => api.get(`Schedule/RosterSequence/list`, data),
  deleteRosterSequence: (id, day) => api.post(`Schedule/RosterSequence/delete/${id}/${day}`),
}
const workLocation = {
  searchWorkLocation: (data) => api.get(`worklocation/Search`, data),
  addWorkLocation: (data) => api.post(`worklocation/create`, data),
  updateWorkLocation: (id, data) => api.post(`worklocation/update/${id}`, data),
  deleteWorkLocation: (id) => api.post(`worklocation/delete/${id}`),
  getSingleLocationDetails: (id) => api.get(`worklocation/GetByGuid/${id}`),
}
const workLocationContactPerson = {
  addContactPerson: (data) => api.post(`worklocation/ContactPerson/create`, data),
  addPropertyEquipmentInfo: (data) => api.post(`worklocation/PropertyAndEquipment/create`, data),
  getAllContactPerson: (id) => api.get(`worklocation/ContactPerson/list/${id}`),
  getAllPropEquipInfo: (id) => api.get(`worklocation/PropertyAndEquipment/list/${id}`),
}
const workLocationDocument = {
  getWorkFolderList: (id) => api.get(`worklocation/Folder/list/${id}`),
  createWorkFolder: (data) => api.post(`worklocation/Folder/create`, data),
  createWorkDocument: (data) => api.post(`worklocation/Document/create`, data),
  deleteWorkFolder: (data) => api.post(`worklocation/Folder/delete`, data),
}
const visitorRegistration = {
  searchVisitor: (data) => api.get(`VisitorRegistration/Search`, data),
  addVisitor: (data) => api.post(`VisitorRegistration/create`, data),
  deleteVisitor: (id) => api.post(`VisitorRegistration/delete/${id}`),
}
const serviceSiteMaster = {
  getAllSites: (data) => api.get(`EmployeeSite/SearchAll`, data),
  getSingleSite: (id) => api.get(`EmployeeSite/ServiceSiteMaster/${id}`),
  createSite: (data) => api.post(`EmployeeSite/ServiceSiteMaster/create`, data),
  updateSite: (id, data) => api.post(`EmployeeSite/ServiceSiteMaster/update/${id}`, data),
  deleteSite: (id) => api.post(`EmployeeSite/ServiceSiteMaster/delete/${id}`),
}
const rosterPlanning = {
  createRosterPlanning: (data) => api.post(`Schedule/RosterPlanning/create`, data),
}
const teams = {
  createTeams: (data) => api.post(`Team/create`, data),
  getTeam: (id) => api.get(`Team/${id}`),
  searchTeams: (data) => api.get(`Team/search`, data),
  deleteTeams: (id) => api.post(`Team/delete/${id}`),
  updateTeams: (id, data) => api.post(`Team/update/${id}`, data),
}
const teamMember = {
  delteTeamMember: (id) => api.post(`team-member/delete?guid=${id}`),
}
export const request = {
  ...auth,
  ...employeeOperation,
  ...employeePaymentInfo,
  ...getSchedules,
  ...employeeSchedulePlanning,
  ...media,
  ...staff,
  ...getSystemGeneralDefType,
  ...employeeBasicDetails,
  ...employeePerformance,
  ...employeeDocuments,
  ...rosterRule,
  ...rosterSequnce,
  ...workLocation,
  ...workLocationContactPerson,
  ...workLocationDocument,
  ...visitorRegistration,
  ...serviceSiteMaster,
  ...rosterPlanning,
  ...teams,
  ...teamMember,
}
