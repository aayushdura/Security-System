import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { TailSpin } from 'react-loader-spinner'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllVisitors } from 'src/features/VisitorRegistration/apiCalls'

const AddNewVisitorManagement = ({ formType, visible, setVisible }) => {
  const { allWorkLocations } = useSelector((state) => state.workLocation)
  const [currentLocation, setCurrentLocation] = useState({})
  const optionList =
    allWorkLocations?.length > 0
      ? allWorkLocations.map((location) => {
          return {
            label: location.siteName,
            value: location.siteCode,
          }
        })
      : []

  const dispatch = useDispatch()
  const { handleChange, handleSubmit, values, isSubmitting, isValid, setFieldValue, resetForm } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        id: 0,
        visitorId: '',
        visitorName: '',
        visitorPhone: '',
        entryTime: '',
        entryDate: '',
        workLocationGuid: '',
      },
      onSubmit: async () => {
        if (isValid) {
          try {
            let res = await request.addVisitor(values)
            if (res.data) {
              toast.success('Visitor Registered Succesfully')
              dispatch(getAllVisitors())
              setVisible(false)
              resetForm()
              setCurrentLocation({})
            }
          } catch (err) {
            toast.error('Could Not Register Visitor')
            console.log(err)
            resetForm()
            setCurrentLocation({})
          }
        }
      },
    })

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size={'xl'}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h2 className="text-capitalize">{formType} Visitor Registration Record</h2>
      </CModalHeader>
      <CModalBody className="fw-bold p-4 text-capitalize">
        <span>Basic Info</span>
        <CRow className="mt-3">
          <CCol sm={2}>
            <CFormLabel>Visitor Name</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormInput id="visitorName" onChange={handleChange} value={values.visitorName} />
          </CCol>
          <CCol sm={2}>
            <CFormLabel>Entry Time</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormInput
              value={values.entryTime}
              type="time"
              id="entryTime"
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={2}>
            <CFormLabel>Visitor ID</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormInput id="visitorId" value={values.visitorId} onChange={handleChange} />
          </CCol>
          <CCol sm={2}>
            <CFormLabel>Entry Date</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormInput
              type="date"
              id="entryDate"
              value={values.entryDate}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={2}>
            <CFormLabel>Visitor Phone</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormInput id="visitorPhone" onChange={handleChange} value={values.visitorPhone} />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={2}>
            <CFormLabel>Location ID</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              id="workLocationGuid"
              onChange={(e) => {
                if (e) {
                  setFieldValue('workLocationGuid', e.target.value)
                  let selectedLocation = allWorkLocations?.find(
                    (location) => location.workLocationGuid === e.target.value,
                  )
                  setCurrentLocation(selectedLocation)
                }
              }}
              value={values.workLocationGuid}
            >
              <option value={''} defaultValue disabled={true}></option>
              {optionList.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol sm={2}>Location Name</CCol>
          <CCol>{currentLocation?.locationName ? currentLocation.locationName : '---'}</CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol sm={2}>Location Type</CCol>
          <CCol>{currentLocation?.locationType ? currentLocation.locationType : '---'}</CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol sm={2}>District</CCol>
          <CCol>{currentLocation?.district ? currentLocation.district : '---'}</CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol sm={2}>Full Address</CCol>
          <CCol>{currentLocation?.fullAddress ? currentLocation.fullAddress : '---'}</CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <button
          className={
            isSubmitting
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary`
          }
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Create
          {isSubmitting && (
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

export default AddNewVisitorManagement

AddNewVisitorManagement.propTypes = {
  formType: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
