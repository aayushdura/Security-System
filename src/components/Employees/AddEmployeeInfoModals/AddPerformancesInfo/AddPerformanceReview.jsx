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
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { performanceReviewSchema } from '../validationschemas/addInfoSchemas'
import PropTypes from 'prop-types'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { FaFileAlt } from 'react-icons/fa'

const AddPerformanceReview = ({ visible, setVisible, getPerformanceList }) => {
  const [performanceDocs, setPerformanceDocs] = useState({})
  const inputDoc = useRef()
  const params = useParams()
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setPerformanceDocs(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: performanceReviewSchema,
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      reviewDate: '',
      jobKnowledge: '',
      workQuality: '',
      attendance: '',
      clientRating: '',
      supervisor: '',
      comments: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addPerformanceReview({
          ...values,
          pictureId: performanceDocs?.pictureId ? performanceDocs?.pictureId : 0,
        })
        if (res.data) {
          toast.success('Performance Review Added Successfully')
          formik.resetForm()
          setVisible(false)
          setPerformanceDocs({})
          getPerformanceList()
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Performance Review')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="align-items-center" onClose={() => setVisible(false)}>
        <h3>Performance Review</h3>
      </CModalHeader>
      <CModalBody>
        <CModalBody className="ps-5">
          <CRow className="my-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                Review Date <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                value={formik.values.reviewDate}
                onChange={formik.handleChange}
                className={formik.errors.reviewDate && 'border-danger'}
                id="reviewDate"
                type="date"
              />
              <div className="validator-message text-danger">
                {formik.errors.reviewDate && formik.errors.reviewDate}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Job Knowledge</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                value={formik.values.jobKnowledge}
                className={formik.errors.jobKnowledge && 'border-danger'}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('jobKnowledge', e.target.value)
                  }
                }}
                id="jobKnowledge"
              >
                <option disabled defaultValue value={''}></option>
                <option value="High">High</option>
                <option value="Adequate">Adequate</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.jobKnowledge && formik.errors.jobKnowledge}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Work Quality</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                className={formik.errors.workQuality && 'border-danger'}
                onChange={(e) => {
                  if (e) formik.setFieldValue('workQuality', e.target.value)
                }}
                value={formik.values.workQuality}
              >
                <option disabled defaultValue value={''}></option>
                <option value="High">High</option>
                <option value="Adequate">Adequate</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.workQuality && formik.errors.workQuality}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Attendance/Punctuality</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                value={formik.values.attendance}
                onChange={(e) => {
                  if (e) formik.setFieldValue('attendance', e.target.value)
                }}
                className={formik.errors.attendance && 'border-danger'}
              >
                <option disabled defaultValue value={''}></option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fine">Fine</option>
                <option value="Bad">Bad</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.attendance && formik.errors.attendance}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Communication/Listening</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                value={formik.values.clientRating}
                className={formik.errors.clientRating && 'border-danger'}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('clientRating', e.target.value)
                  }
                }}
                id="clientRating"
              >
                <option disabled defaultValue value={''}></option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fine">Fine</option>
                <option value="Bad">Bad</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.clientRating && formik.errors.clientRating}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Dependability</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                value={formik.values.supervisor}
                className={formik.errors.supervisor && 'border-danger'}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('supervisor', e.target.value)
                  }
                }}
                id="supervisor"
              >
                <option disabled defaultValue value={''}></option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fine">Fine</option>
                <option value="Bad">Bad</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.supervisor && formik.errors.supervisor}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Action Recommended</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                onChange={formik.handleChange}
                id="comments"
                value={formik.values.comments}
                className={formik.errors.comments && 'border-danger'}
                rows={6}
              />
            </CCol>
            <div className="validator-message text-danger">
              {formik.errors.comments && formik.errors.comments}
            </div>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Upload Document</CFormLabel>
            </CCol>
            <CCol className="col-auto">
              <CFormInput
                type="file"
                onChange={(e) => handleIdCardOnChange(e)}
                ref={inputDoc}
                style={{ display: 'none' }}
              />
              <button className="button-primary-small" onClick={handleUploadFile}>
                {' '}
                Upload
              </button>
            </CCol>
            {performanceDocs?.pictureId && (
              <CCol>
                <FaFileAlt size={25} color="#A70000" />
                {performanceDocs?.fileName}
              </CCol>
            )}
          </CRow>
        </CModalBody>
      </CModalBody>
      <CModalFooter>
        <button className="button-primary" onClick={formik.handleSubmit}>
          Create
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default AddPerformanceReview
AddPerformanceReview.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  getPerformanceList: PropTypes.func,
}
