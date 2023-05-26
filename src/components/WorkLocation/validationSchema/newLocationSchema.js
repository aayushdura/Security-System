import * as Yup from 'yup'

export const newLocationSchema = Yup.object().shape({
  siteName: Yup.string().required('* Location Name is Required'),
  siteType: Yup.string().required('* Select one Location Type'),
  siteCode: Yup.string().required('* Location Name is Required'),
  // district: Yup.string().required('* Select one District'),
  // fullAddress: Yup.string().required('* Full Address is Required'),
  //   serviceHour: '',
  //   storey: '',
  //   roomPerStorey: '',
  //   pictureId: 0,
})
