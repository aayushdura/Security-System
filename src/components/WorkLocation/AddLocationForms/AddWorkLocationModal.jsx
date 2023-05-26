import {
  CCol,
  CForm,
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
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllWorkLocations, getSingleWorkLocation } from 'src/features/WorkLocation/apiCalls'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { request } from 'src/utils/requests'
import addImage from '../../../assets/images/addimage.png'
import { newLocationSchema } from '../validationSchema/newLocationSchema'

const AddWorkLocationModal = ({ formType, ShowForm, setShowForm }) => {
  const { currentLocation } = useSelector((state) => state.workLocation)
  const [locationImage, setLocationImage] = useState({})
  const photoRef = useRef()
  const params = useParams()
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema: newLocationSchema,
    enableReinitialize: true,
    initialValues: {
      clientGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      active: true,
      siteName: formType === 'edit' ? currentLocation?.siteName : '',
      siteType: formType === 'edit' ? currentLocation?.siteType : '',
      siteCode: formType === 'edit' ? currentLocation?.siteCode : '',
      district: formType === 'edit' ? currentLocation?.district : '',
      fullAddress: formType === 'edit' ? currentLocation?.fullAddress : '',
      serviceHour: formType === 'edit' ? currentLocation?.serviceHour : '',
      storey: formType === 'edit' ? currentLocation?.storey : '',
      roomPerStorey: formType === 'edit' ? currentLocation?.roomPerStorey : '',
      longitude: 0,
      latitude: 0,
      addressId: 0,
      contactNo: '977',
    },
    onSubmit: async (values) => {
      if (formik.isValid) {
        if (formType !== 'edit') {
          try {
            let data = {
              ...values,
              pictureId:
                formType === 'edit'
                  ? locationImage?.pictureId ?? currentLocation?.pictureId
                  : locationImage?.pictureId,
            }
            let res = await request.createSite(data)
            if (res.data) {
              toast.success('Work Location Added')
              dispatch(getAllWorkLocations())
              setShowForm(false)
            }
          } catch (err) {
            toast.error('Could not add work location')
            console.log(err)
          }
        } else {
          try {
            let data = {
              ...values,
              pictureId:
                formType === 'edit'
                  ? locationImage?.pictureId ?? currentLocation?.pictureId
                  : locationImage?.pictureId,
            }
            let res = await request.updateSite(params?.id, data)
            if (res.data) {
              toast.success('Work Location Updated')
              dispatch(getSingleWorkLocation(params?.id))
              setShowForm(false)
            }
          } catch (err) {
            toast.error('Could Not Update Location')
            console.log(err)
          }
        }
      }
    },
  })
  const handlePhotoChange = async (e) => {
    let res = await handleFileOnChange(e, 'Picture')
    if (typeof res === 'string') {
      toast.error(res)
    } else {
      res?.pictureId && setLocationImage(res)
    }
  }

  return (
    <CModal
      size="xl"
      alignment="center"
      visible={ShowForm}
      onClose={() => setShowForm(false)}
      className="fw-bold"
    >
      <CModalHeader onClose={() => setShowForm(false)}>
        <h2 className="text-capitalize">{formType} Work Location</h2>
      </CModalHeader>
      <CModalBody>
        <CForm className="mt-3 d-flex flex-wrap-reverse" onSubmit={formik.handleSubmit}>
          <CCol lg={9}>
            <span className="fs-4">Basic Info</span>
            <CRow className="mt-4 align-items-center">
              <CFormLabel className="col-2 fs-5"> Location Name</CFormLabel>
              <CCol>
                <CFormInput
                  className={formik.errors.siteName && 'border-danger'}
                  value={formik.values.siteName}
                  onChange={formik.handleChange}
                  id="siteName"
                />
                <div className="validator-message text-danger">
                  {formik.errors.siteName && formik.errors.siteName}
                </div>
              </CCol>
              <CFormLabel className="col-2 fs-5"> Location Type</CFormLabel>
              <CCol>
                <CFormSelect
                  className={formik.errors.siteType && 'border-danger'}
                  value={formik.values.siteType}
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue('siteType', e.target.value)
                    }
                  }}
                  id="siteType"
                >
                  <option defaultValue disabled value={''}></option>
                  <option value="industrial">Industrial</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </CFormSelect>
                <div className="validator-message text-danger">
                  {formik.errors.siteType && formik.errors.siteType}
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-3 align-items-center">
              <CFormLabel className="col-2 fs-5"> Location ID</CFormLabel>
              <CCol>
                <CFormInput
                  className={formik.errors.siteCode && 'border-danger'}
                  value={formik.values.siteCode}
                  onChange={formik.handleChange}
                  id="siteCode"
                />
                <div className="validator-message text-danger">
                  {formik.errors.siteCode && formik.errors.siteCode}
                </div>
              </CCol>
              <CFormLabel className="col-2 fs-5"> District</CFormLabel>
              <CCol>
                <CFormSelect
                  className={formik.errors.district && 'border-danger'}
                  value={formik.values.district}
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue('district', e.target.value)
                    }
                  }}
                  id="district"
                >
                  <option defaultValue disabled value={''}></option>
                  <option value="kowloon">Kowloon</option>
                  <option value="hong kong">Hong Kong</option>
                  <option value="new territories">New Territories</option>
                </CFormSelect>
                <div className="validator-message text-danger">
                  {formik.errors.district && formik.errors.district}
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-3 align-items-center">
              <CFormLabel className="col-2 fs-5"> Full Address</CFormLabel>
              <CCol>
                <CFormTextarea
                  disabled={true}
                  className={formik.errors.fullAddress && 'border-danger'}
                  value={formik.values.fullAddress}
                  onChange={formik.handleChange}
                  id="fullAddress"
                  rows={4}
                />
                <div className="validator-message text-danger">
                  {formik.errors.fullAddress && formik.errors.fullAddress}
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-3 align-items-center">
              <CFormLabel className="col-2 fs-5"> Service Hour</CFormLabel>
              <CCol lg={4}>
                <CFormInput
                  value={formik.values.serviceHour}
                  onChange={formik.handleChange}
                  id="serviceHour"
                />
              </CCol>
              <CFormLabel className="col-auto fs-5"> Storey</CFormLabel>
              <CCol lg="1">
                <CFormInput
                  value={formik.values.storey}
                  onChange={formik.handleChange}
                  id="storey"
                />
              </CCol>
              <CFormLabel className="col-auto fs-5"> Room per Storey</CFormLabel>
              <CCol lg="1">
                <CFormInput
                  value={formik.values.roomPerStorey}
                  onChange={formik.handleChange}
                  id="roomPerStorey"
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol lg={3} className="px-4 mt-0">
            <CRow className="justify-content-center">
              <img
                onClick={() => photoRef.current.click()}
                src={
                  formType === 'edit'
                    ? locationImage?.pictureUrl ??
                      (currentLocation?.pictureModel?.pictureUrl
                        ? currentLocation.pictureModel?.pictureUrl
                        : addImage)
                    : locationImage?.pictureUrl ?? addImage
                }
                style={{ objectFit: 'contain' }}
                alt="employee-profile"
                height={290}
              />
            </CRow>
            <CRow className="justify-content-between align-items-center pt-3 pe-3">
              <b className="col-lg-6">Upload Photo</b>
              <input
                ref={photoRef}
                alt="employee-photo"
                type="file"
                id="input_phot"
                onChange={(e) => handlePhotoChange(e)}
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="col-lg-6 button-primary-small"
                onClick={() => photoRef.current.click()}
              >
                {formType === 'edit' && currentLocation?.pictureModel?.pictureUrl
                  ? 'Change'
                  : 'Upload'}
              </button>
            </CRow>
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <button
          disabled={formik.isSubmitting}
          type="button"
          className={
            formik.isSubmitting
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary`
          }
          onClick={formik.handleSubmit}
        >
          {formType === 'add' ? 'Create' : 'Update'}
          {formik.isSubmitting && (
            <TailSpin
              height="20"
              width="30"
              color="white"
              ariaLabel="tail-spin-loading"
              wrapperClass=""
              visible={true}
            />
          )}
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default AddWorkLocationModal

AddWorkLocationModal.propTypes = {
  formType: PropTypes.string,
  ShowForm: PropTypes.bool,
  setShowForm: PropTypes.func,
}
