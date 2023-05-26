import * as Yup from 'yup'

export const teamsSchema = Yup.object().shape({
  teamCode: Yup.string().required('* Team Code is Required'),
  teamName: Yup.string().required('* Team Name is Required'),
})
