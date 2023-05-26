import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
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
import { toast } from 'react-hot-toast'
import { request } from 'src/utils/requests'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { educationLevel, fieldOfStudy } from 'src/utils/staticData'
import { educationSchema } from '../validationschemas/addInfoSchemas'
import { FaFileAlt } from 'react-icons/fa'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { useDispatch } from 'react-redux'
import { getEducationHistoryList } from 'src/features/Employee/employeeExtraDetails/apiCalls'

const AddEducation = ({ visible, setVisible }) => {
  const [educationDocument, setEducationDocument] = useState({})
  const dispatch = useDispatch()
  const inputDoc = useRef()
  const params = useParams()
  const { systemCountry } = useSelector((state) => state.systemDef)
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setEducationDocument(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: educationSchema,
    enableReinitialize: true,
    initialValues: {
      schoolName: '',
      countryCode: '',
      educationLevelCode: '',
      employeeGuid: params.id,
      additionalNotes: '',
      dateRangeEnd: '',
      fieldofStudy: '',
      remarks: '',
      fileGuid: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addEducationHistory({
          ...values,
          pictureId: educationDocument?.pictureId ? educationDocument?.pictureId : 0,
        })
        if (res.data) {
          formik.resetForm()
          setVisible(false)
          dispatch(getEducationHistoryList(params.id))
          setEducationDocument({})
          toast.success('Education Details Added Successfully')
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Education Details')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="align-items-center" onClose={() => setVisible(false)}>
        <h3>Education</h3>
      </CModalHeader>
      <CModalBody>
        <CModalBody className="ps-5">
          <CRow className="my-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">
                School Name <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                onChange={formik.handleChange}
                id="schoolName"
                className={formik.errors.schoolName && 'border-danger'}
                value={formik.values.schoolName}
              />
              <div className="validator-message text-danger">
                {formik.errors.schoolName && formik.errors.schoolName}
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
                value={formik.values.countryCode}
                className={formik.errors.countryCode && 'border-danger'}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue('countryCode', e.target.value)
                  }
                }}
                id="countryCode"
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
                Level <span style={{ color: 'red' }}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                className={formik.errors.educationLevelCode && 'border-danger'}
                onChange={(e) => {
                  if (e) formik.setFieldValue('educationLevelCode', e.target.value)
                }}
                value={formik.values.educationLevelCode}
              >
                <option disabled defaultValue value={''}></option>
                {educationLevel.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
              <div className="validator-message text-danger">
                {formik.errors.educationLevelCode && formik.errors.educationLevelCode}
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Field of study</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                value={formik.values.fieldofStudy}
                onChange={(e) => {
                  if (e) formik.setFieldValue('fieldofStudy', e.target.value)
                }}
              >
                <option disabled defaultValue value={''}></option>
                {fieldOfStudy.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Year of Completion</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormInput
                onChange={formik.handleChange}
                id="dateRangeEnd"
                value={formik.values.dateRangeEnd}
                type="date"
              />
            </CCol>
          </CRow>
          <CRow className="mb-4">
            <CCol sm={4}>
              <CFormLabel className="fw-bold">Additional Notes</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormTextarea
                onChange={formik.handleChange}
                id="additionalNotes"
                value={formik.values.additionalNotes}
                rows={6}
              />
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
                rows={6}
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
            {educationDocument?.pictureId && (
              <CCol>
                <FaFileAlt size={25} color="#A70000" />
                {educationDocument?.fileName}
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

export default AddEducation

AddEducation.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
