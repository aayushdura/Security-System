import { request } from './requests'

export const handleFileOnChange = async (e, fileType) => {
  let formData = new FormData()
  formData.append('', e.target.files[0])
  switch (fileType) {
    case 'Id':
      try {
        console.log({ formData })
        let res = await request.uploadIdCard(formData)
        return res.data.pictures[0]
      } catch (err) {
        console.log(err?.response?.data?.ErrorList[0])
        return err?.response?.data?.ErrorList[0]?.detail
      }
    case 'Picture':
      try {
        console.log(formData)
        let res = await request.uploadImage(formData)
        return res.data?.pictures && res.data?.pictures[0]
      } catch (err) {
        console.log(err?.response?.data?.ErrorList[0])
        return err?.response?.data?.ErrorList[0]?.detail
      }
    default:
      try {
        console.log({ formData })
        let res = await request.uploadIdCard(formData)
        return res.data.pictures[0]
      } catch (err) {
        console.log(err?.response?.data?.ErrorList[0])
        return err?.response?.data?.ErrorList[0]?.detail
      }
  }
}
