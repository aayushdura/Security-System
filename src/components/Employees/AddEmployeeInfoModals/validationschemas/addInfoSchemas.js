import * as Yup from 'yup'

export const workexpSchema = Yup.object().shape({
  companyName: Yup.string().required('* Enter Company Name'),
  countryCode: Yup.string().required('* Select A Country'),
  jobTitle: Yup.string().required('* Enter A Job Title'),
})
export const educationSchema = Yup.object().shape({
  schoolName: Yup.string().required('* Enter School Name'),
  countryCode: Yup.string().required('* Select A Country'),
  educationLevelCode: Yup.string().required('* Select One Education Level'),
})
export const licenseSchema = Yup.object().shape({
  certName: Yup.string().required('* Enter License/Certification Name'),
  certType: Yup.string().required('* Select A Type'),
  countryCode: Yup.string().required('* Select A Country'),
  issueOrganization: Yup.string().required('* Enter Institue/Council Name'),
})
export const skillsSchema = Yup.object().shape({
  skillName: Yup.string().required('* Name is Required'),
  skillType: Yup.string().required('* Type is Required'),
  skillLevel: Yup.string().required('* Level is Required'),
})
export const emergencyDependantsSchema = Yup.object().shape({
  contactName: Yup.string().required('* Name is Required'),
  relationship: Yup.string().required('* Relationship is Required'),
  mobile: Yup.string().required('* Mobile Phone No. is Required'),
})
export const performanceReviewSchema = Yup.object().shape({
  reviewDate: Yup.string().required('* Review Date is Required'),
})
export const trainingSchema = Yup.object().shape({
  trainingDate: Yup.string().required('* Training Date is Required'),
})
export const creditPenaltySchema = Yup.object().shape({
  effectiveDate: Yup.string().required('* Training Date is Required'),
})
export const addFiles = Yup.object().shape({
  folderGuid: Yup.string().required('* Select A Folder'),
  documentName: Yup.string().required('* Document Name Required').nullable(),
})
export const addFolder = Yup.object().shape({
  folderName: Yup.string().required('* Folder Name Required').nullable(),
})
