import * as Yup from 'yup'
export const departmentSchema = Yup.object().shape({
  departmentCode: Yup.string().required('* Department Code is Required'),
  deparmentName: Yup.string().required('* Department Name is Required'),
})

export const positionSchema = Yup.object().shape({
  deparmentCode: Yup.string().required('* Department Code is Required'),
  positionName: Yup.string().required('* Position Name is Required'),
  positionCode: Yup.string().required('* Position Name is Required'),
})
