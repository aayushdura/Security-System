import React from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
// import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
const AddMedicalRetailInfo = ({ visible, setVisible }) => {
  const params = useParams()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      certType: '',
      certName: '',
      countryCode: '',
      issueDate: '',
      expiryDate: '',
      issueOrganization: '',
      remarks: '',
      fileGuid: '',
    },
    onSubmit: async (values) => {
      try {
        // let res = await request.addLicense(values)
        // console.log(res.data)
        formik.resetForm()
        setVisible(false)
        toast.success('Medical Info Added Successfully')
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Medical Info')
      }
    },
  })

  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Medical Insurance Info</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Insurance Provider</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.certName}
              onChange={formik.handleChange}
              id="certName"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Medical Scheme</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Insurance Subsidies</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
            // value={formik.values.issueOrganization}
            // onChange={formik.handleChange}
            // id="issueOrganization"
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <button className="button-primary" onClick={formik.handleSubmit}>
          Update
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default AddMedicalRetailInfo
AddMedicalRetailInfo.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
