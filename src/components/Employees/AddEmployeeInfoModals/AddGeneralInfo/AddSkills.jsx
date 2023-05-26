import React from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { skillsSchema } from '../validationschemas/addInfoSchemas'
import { getSkills } from 'src/features/Employee/employeeExtraDetails/apiCalls'
import { useDispatch } from 'react-redux'

const AddSkills = ({ visible, setVisible }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema: skillsSchema,
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      skillType: '',
      skillName: '',
      skillLevel: '',
      description: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addSkills(values)
        console.log(res.data)
        formik.resetForm()
        setVisible(false)
        dispatch(getSkills(params.id))

        toast.success('Skills Added Succesfully')
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Skills')
      }
    },
  })
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Skills</h3>
      </CModalHeader>
      <CModalBody className="px-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Type <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="skillType"
              value={formik.values.skillType}
              onChange={formik.handleChange}
              className={formik.errors.skillType && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.skillType && formik.errors.skillType}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Name <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="skillName"
              value={formik.values.skillName}
              onChange={formik.handleChange}
              className={formik.errors.skillName && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.skillName && formik.errors.skillName}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Level <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="skillLevel"
              value={formik.values.skillLevel}
              onChange={formik.handleChange}
              className={formik.errors.skillLevel && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.skillLevel && formik.errors.skillLevel}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Remarks</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormTextarea
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
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

export default AddSkills

AddSkills.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
