import * as Yup from 'yup'

export const employeeAddEditValidation = Yup.object().shape({
  firstName: Yup.string().required('* First Name Required'),
  // .max(15, 'First Name Too Long'),
  lastName: Yup.string().required('*First Name Required'),
  gender: Yup.string().required('* Select A Gender'),
  employeeCode: Yup.string().required('* Employee Id Required'),
  personalEmail: Yup.string().email('* Enter Valid Email').required('* Email Required').nullable(),
  currenetDepartmentCode: Yup.string().required('* Select A Department').nullable(),
  currentPositionCode: Yup.string().required('* Select A Position').nullable(),
  dateOfEntry: Yup.string().required('* Enter Date of Entry'),
  statusId: Yup.string().required('* Select Employee Status'),
  addressDetail: Yup.object().shape({
    countyCode: Yup.string().required('* Select A City').nullable(),
    stateProvinceCode: Yup.string().required('* Select A State').nullable(),
    countryCode: Yup.string().required('* Select A Country').nullable(),
    mobilePhone: Yup.string().required('* Enter Your Mobile No.').nullable(),
    email: Yup.string().email('* Enter Valid Email').required('* Email Required').nullable(),
  }),
  maritalStatus: Yup.string().required('* Select Marital Status'),
  dateOfBirth: Yup.string().required('* Date Of Birth Required'),
})
