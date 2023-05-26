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
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { licenseSchema } from '../validationschemas/addInfoSchemas'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { FaFileAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getLicenseList } from 'src/features/Employee/employeeExtraDetails/apiCalls'
const AddLicense = ({ visible, setVisible }) => {
  const [licenseDocument, setLicenseDocument] = useState({})
  const params = useParams()
  const dispatch = useDispatch()
  const { systemCountry } = useSelector((state) => state.systemDef)
  const inputDoc = useRef()
  const handleIdCardOnChange = (e) => {
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setLicenseDocument(res)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const formik = useFormik({
    validationSchema: licenseSchema,
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
        let res = await request.addLicense({
          ...values,
          pictureId: licenseDocument?.pictureId ? licenseDocument?.pictureId : 0,
        })
        if (res.data) {
          formik.resetForm()
          setVisible(false)
          setLicenseDocument({})
          dispatch(getLicenseList(params.id))
          toast.success('License Details Added Successfully')
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add License Details')
      }
    },
  })
  const handleUploadFile = () => {
    inputDoc.current.click()
  }
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>License & Certification</h3>
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
              className={formik.errors.certName && 'border-danger'}
              value={formik.values.certName}
              onChange={formik.handleChange}
              id="certName"
            />
            <div className="validator-message text-danger">
              {formik.errors.certName && formik.errors.certName}
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
              className={formik.errors.countryCode && 'border-danger'}
              value={formik.values.countryCode}
              onChange={(e) => {
                if (e) {
                  formik.setFieldValue('countryCode', e.target.value)
                }
              }}
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
              Institute/Council <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              className={formik.errors.issueOrganization && 'border-danger'}
              value={formik.values.issueOrganization}
              onChange={formik.handleChange}
              id="issueOrganization"
            />
            <div className="validator-message text-danger">
              {formik.errors.issueOrganization && formik.errors.issueOrganization}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Type
              <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              className={formik.errors.certType && 'border-danger'}
              value={formik.values.certType}
              onChange={(e) => {
                if (e) formik.setFieldValue('certType', e.target.value)
              }}
            >
              <option disabled defaultValue value={''}></option>
              <option value="A">Two Wheelers</option>
              <option value="B">Four Wheelers</option>
              <option value="C">Heavy Wheelers</option>
              <option value="D">AirWays</option>
              <option value="E">Waterways</option>
            </CFormSelect>
            <div className="validator-message text-danger">
              {formik.errors.certType && formik.errors.certType}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Valid Date From</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.issueDate}
              onChange={formik.handleChange}
              id="issueDate"
              type="date"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Valid Date To</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.expiryDate}
              onChange={formik.handleChange}
              id="expiryDate"
              type="date"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Remarks</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormTextarea
              value={formik.values.remarks}
              onChange={formik.handleChange}
              id="remarks"
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
          {licenseDocument?.pictureId && (
            <CCol>
              <FaFileAlt size={25} color="#A70000" />
              {licenseDocument?.fileName}
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

export default AddLicense
AddLicense.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
