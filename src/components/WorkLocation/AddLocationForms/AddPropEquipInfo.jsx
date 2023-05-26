import React from 'react'
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
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { request } from 'src/utils/requests'
import { getAllPropEquipInfo } from 'src/features/WorkLocation/apiCalls'
import { TailSpin } from 'react-loader-spinner'
import { toast } from 'react-hot-toast'
const AddPropEquipInfo = ({ visible, setVisible }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const { values, handleChange, handleSubmit, isValid, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      workLocationGuid: params?.id,
      propertyId: 0,
      name: '',
      amount: '',
      type: '',
      description: '',
    },
    onSubmit: async () => {
      if (isValid) {
        try {
          let res = await request.addPropertyEquipmentInfo(values)
          if (res.data) {
            toast.success('Successfully Added Property Equipment Info')
            dispatch(getAllPropEquipInfo(params?.id))
            setVisible(false)
          }
        } catch (err) {
          toast.error('Could Not Add Property Equipment Info')
          console.log(err)
        }
      }
    },
  })
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <h2>Property & Eqipment Info</h2>
      </CModalHeader>
      <CModalBody className="fw-bold px-5">
        <CRow className="my-4">
          <CCol lg={3}>
            <CFormLabel>Name</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput value={values.name} onChange={handleChange} id="name" />
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol lg={3}>
            <CFormLabel>Amount</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput value={values.amount} onChange={handleChange} id="amount" />
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol lg={3}>
            <CFormLabel>Type</CFormLabel>
          </CCol>
          <CCol>
            <CFormSelect
              id="type"
              value={values.type}
              onChange={(e) => {
                if (e) {
                  setFieldValue('type', e.target.value)
                }
              }}
            >
              <option value={''} defaultValue disabled></option>
              <option value={'commercial'}>Commercial</option>
              <option value={'industrial'}>Industrial</option>
              <option value={'residential'}>Residential</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol lg={3}>
            <CFormLabel>Description</CFormLabel>
          </CCol>
          <CCol>
            <CFormTextarea
              rows={4}
              onChange={handleChange}
              value={values.description}
              id="description"
            />
          </CCol>
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
        >
          Add{' '}
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

export default AddPropEquipInfo

AddPropEquipInfo.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
