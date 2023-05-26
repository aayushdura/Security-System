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
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { request } from 'src/utils/requests'
import { emergencyDependantsSchema } from '../validationschemas/addInfoSchemas'
import { getEmergencyContact } from 'src/features/Employee/employeeExtraDetails/apiCalls'
import { useDispatch } from 'react-redux'

const AddEmergencyDep = ({ visible, setVisible }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema: emergencyDependantsSchema,
    enableReinitialize: true,
    initialValues: {
      id: 0,
      employeeGuid: params.id,
      contactName: '',
      mobile: '',
      tel: '',
      email: '',
      relationship: '',
      displayOrder: 0,
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addEmergencyDetails(values)
        if (res.data) {
          formik.resetForm()
          setVisible(false)
          dispatch(getEmergencyContact(params.id))
          toast.success('Emergency Dependants Added Succesfully')
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add emergency dependants')
      }
    },
  })
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Emergency Department</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Name <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="contactName"
              value={formik.values.contactName}
              onChange={formik.handleChange}
              className={formik.errors.contactName && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.contactName && formik.errors.contactName}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Relationship <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="relationship"
              value={formik.values.relationship}
              onChange={formik.handleChange}
              className={formik.errors.relationship && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.relationship && formik.errors.relationship}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Phone Number <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              className={formik.errors.mobile && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.mobile && formik.errors.mobile}
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <button className="button-primary" onClick={formik.handleSubmit}>
          Create
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default AddEmergencyDep

AddEmergencyDep.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
