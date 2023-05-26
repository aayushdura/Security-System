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
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaFileAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getWorkinExperienceList } from 'src/features/Employee/employeeExtraDetails/apiCalls'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { request } from 'src/utils/requests'
import { workexpSchema } from '../validationschemas/addInfoSchemas'

const AddWorkExperience = ({ visible, setVisible }) => {
  const [workDocument, setWorkDocument] = useState({})
  const dispatch = useDispatch()
  const params = useParams()
  const { systemCountry } = useSelector((state) => state.systemDef)
  const inputDoc = useRef()
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setWorkDocument(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: workexpSchema,
    initialValues: {
      companyName: '',
      countryCode: '',
      employeeGuid: params.id,
      dateRangeStart: '',
      dateRangeEnd: '',
      jobTitle: '',
      jobDescription: '',
      reasonOfLeave: '',
      fileGuid: '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let res = await request.addWorkExperience({
          ...values,
          pictureId: workDocument?.pictureId ? workDocument?.pictureId : 0,
        })
        if (res.data) {
          formik.resetForm()
          setVisible(false)
          dispatch(getWorkinExperienceList(params.id))
          setWorkDocument({})
          toast.success('Work Experience Added Successfully')
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Work Experience')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <>
      <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader className="align-items-center" onClose={() => setVisible(false)}>
          <h3>Work Experience</h3>
        </CModalHeader>
        <CModalBody className="ps-5">
          <CRow className="my-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                Previous Company <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                id="companyName"
                className={formik.errors.companyName && 'border-danger'}
                value={formik.values.companyName}
                onChange={formik.handleChange}
              />
              <div className="validator-message text-danger">
                {formik.errors.companyName && formik.errors.companyName}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                Country <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                id="countryCode"
                value={formik.values.countryCode}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('countryCode', e.target.value)
                  }
                }}
                className={formik.errors.countryCode && 'border-danger'}
              >
                <option disabled defaultValue value={''}></option>
                {systemCountry &&
                  systemCountry.map((country) => (
                    <option key={country.countryCode} value={country.countryCode}>
                      {country.countryName}
                    </option>
                  ))}
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.countryCode && formik.errors.countryCode}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                Job Title <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                id="jobTitle"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                className={formik.errors.jobTitle && 'border-danger'}
              />
              <div className="validator-message text-danger">
                {formik.errors.jobTitle && formik.errors.jobTitle}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">From</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                id="dateRangeStart"
                type="date"
                value={formik.values.dateRangeStart}
                onChange={formik.handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">To</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                id="dateRangeEnd"
                type="date"
                value={formik.values.dateRangeEnd}
                onChange={formik.handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Job Description</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                id="jobDescription"
                rows={6}
                value={formik.values.jobDescription}
                onChange={formik.handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Leave/Resign Reason</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                id="reasonOfLeave"
                rows={6}
                value={formik.values.reasonOfLeave}
                onChange={formik.handleChange}
              />
            </CCol>
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
            {workDocument?.pictureId && (
              <CCol>
                <FaFileAlt size={25} color="#A70000" />
                {workDocument?.fileName}
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
    </>
  )
}

export default AddWorkExperience

AddWorkExperience.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
