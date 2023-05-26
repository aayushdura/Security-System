import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { creditPenaltySchema } from '../validationschemas/addInfoSchemas'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
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
import { request } from 'src/utils/requests'
import { FaFileAlt } from 'react-icons/fa'
import { handleFileOnChange } from 'src/utils/generalServerCalls'

const AddCreditPenalty = ({ visible, setVisible, getCreditPenalty }) => {
  const [creditPenaltyDocs, setCreditPenaltyDocs] = useState({})
  const inputDoc = useRef()
  const params = useParams()
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setCreditPenaltyDocs(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: creditPenaltySchema,
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      effectiveDate: '',
      rpType: '',
      reason: '',
      supervisor: '',
      rewardAmount: '',
      penaltyAmount: '',
      supervisorAssessment: '',
      fileGuid: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addCreditPenalty({
          ...values,
          pictureId: creditPenaltyDocs?.pictureId ? creditPenaltyDocs?.pictureId : 0,
        })
        if (res.data) {
          formik.resetForm()
          toast.success('Credit Penalty Added Successfully')
          setVisible(false)
          setCreditPenaltyDocs({})
          getCreditPenalty()
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Credit Penalty')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="align-items-center" onClose={() => setVisible(false)}>
        <h3>Credit/Penalty</h3>
      </CModalHeader>
      <CModalBody>
        <CModalBody className="ps-5">
          <CRow className="my-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                Training Date <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                value={formik.values.effectiveDate}
                className={formik.errors.effectiveDate && 'border-danger'}
                onChange={formik.handleChange}
                id="effectiveDate"
                type="date"
              />
              <div className="validator-message text-danger">
                {formik.errors.effectiveDate && formik.errors.effectiveDate}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Type</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                id="rpType"
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('rpType', e.target.value)
                  }
                }}
                value={formik.values.rpType}
                className={formik.errors.rpType && 'border-danger'}
              >
                <option disabled defaultValue value={''}></option>
                <option value="Credit">Credit</option>
                <option value="Penalty">Penalty</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.rpType && formik.errors.rpType}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Reason</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                onChange={formik.handleChange}
                id="reason"
                value={formik.values.reason}
                className={formik.errors.reason && 'border-danger'}
                rows={6}
              />
              <div className="validator-message text-danger">
                {formik.errors.reason && formik.errors.reason}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Supervisor</CFormLabel>
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
                <option value={params.id}>A</option>
                <option value={params.id}>B</option>
                <option value={params.id}>C</option>
                <option value={params.id}>D</option>
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.supervisor && formik.errors.supervisor}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Supervisor Assessment</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                onChange={formik.handleChange}
                id="supervisorAssessment"
                value={formik.values.supervisorAssessment}
                className={formik.errors.supervisorAssessment && 'border-danger'}
                rows={6}
              />
              <div className="validator-message text-danger">
                {formik.errors.supervisorAssessment && formik.errors.supervisorAssessment}
              </div>
            </CCol>
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
            {creditPenaltyDocs?.pictureId && (
              <CCol>
                <FaFileAlt size={25} color="#A70000" />
                {creditPenaltyDocs?.fileName}
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

export default AddCreditPenalty

AddCreditPenalty.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  getCreditPenalty: PropTypes.func,
}
