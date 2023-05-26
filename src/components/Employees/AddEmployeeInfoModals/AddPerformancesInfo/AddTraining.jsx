import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { trainingSchema } from '../validationschemas/addInfoSchemas'
import { request } from 'src/utils/requests'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { FaFileAlt } from 'react-icons/fa'

const AddTraining = ({ visible, setVisible, getTrainingList }) => {
  const [trainingDocs, setAddTrainingDocs] = useState({})
  const inputDoc = useRef()
  const params = useParams()
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setAddTrainingDocs(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: trainingSchema,
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      trainingDate: '',
      courseCode: '',
      courseName: '',
      cpt: '',
      score: 0,
      status: '',
      remarks: '',
      fileGuid: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addTraining({
          ...values,
          pictureId: trainingDocs?.pictureId ? trainingDocs?.pictureId : 0,
        })
        if (res.data) {
          formik.resetForm()
          toast.success('Training Added Successfully')
          setVisible(false)
          setAddTrainingDocs({})
          getTrainingList()
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Training')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="align-items-center" onClose={() => setVisible(false)}>
        <h3>Training</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Training Date <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              onChange={formik.handleChange}
              value={formik.values.trainingDate}
              className={formik.errors.trainingDate && 'border-danger'}
              id="trainingDate"
              type="date"
            />
            <div className="validator-message text-danger">
              {formik.errors.trainingDate && formik.errors.trainingDate}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Course Code</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              onChange={formik.handleChange}
              value={formik.values.courseCode}
              className={formik.errors.courseCode && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.courseCode && formik.errors.courseCode}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Course Name</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              className={formik.errors.courseName && 'border-danger'}
              onChange={(e) => {
                if (e) formik.setFieldValue('courseName', e.target.value)
              }}
              value={formik.values.courseName}
            >
              <option disabled defaultValue value={''}></option>
              <option value="Course A">Course A</option>
              <option value="Course B">Course B</option>
            </CFormSelect>
            <div className="validator-message text-danger">
              {formik.errors.courseName && formik.errors.courseName}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">CPT</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              value={formik.values.cpt}
              onChange={(e) => {
                if (e) {
                  formik.setFieldValue('cpt', e.target.value)
                }
              }}
              className={formik.errors.cpt && 'border-danger'}
            >
              <option disabled defaultValue value={''}></option>
              <option value="1">Excellent</option>
              <option value="2">Good</option>
              <option value="3">Fine</option>
              <option value="4">Bad</option>
            </CFormSelect>
            <div className="validator-message text-danger">
              {formik.errors.cpt && formik.errors.cpt}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Score</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.score}
              type="number"
              id="score"
              onChange={formik.handleChange}
              className={formik.errors.score && 'border-danger'}
            />
            <div className="validator-message text-danger">
              {formik.errors.score && formik.errors.score}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Status</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              value={formik.values.status}
              className={formik.errors.status && 'border-danger'}
              onChange={(e) => {
                if (e) {
                  formik.setFieldValue('status', e.target.value)
                }
              }}
              id="status"
            >
              <option disabled defaultValue value={''}></option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </CFormSelect>
            <div className="validator-message text-danger">
              {formik.errors.status && formik.errors.status}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Remarks</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormTextarea
              onChange={formik.handleChange}
              id="remarks"
              value={formik.values.remarks}
              className={formik.errors.remarks && 'border-danger'}
              rows={6}
            />
          </CCol>
          <div className="validator-message text-danger">
            {formik.errors.remarks && formik.errors.remarks}
          </div>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Upload Document</CFormLabel>
          </CCol>
          <CCol className="col-auto">
            <CFormInput
              onChange={(e) => handleIdCardOnChange(e)}
              type="file"
              ref={inputDoc}
              style={{ display: 'none' }}
            />
            <button className="button-primary-small" onClick={handleUploadFile}>
              {' '}
              Upload
            </button>
          </CCol>
          {trainingDocs?.pictureId && (
            <CCol>
              <FaFileAlt size={25} color="#A70000" />
              {trainingDocs?.fileName}
            </CCol>
          )}
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

export default AddTraining
AddTraining.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  getTrainingList: PropTypes.func,
}
