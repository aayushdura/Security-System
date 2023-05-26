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
import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { getAllContactPersons } from 'src/features/WorkLocation/apiCalls'

const AddContactPerson = ({ visible, setVisible }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const { values, handleChange, handleSubmit, isValid, isSubmitting } = useFormik({
    initialValues: {
      contactPersonId: 0,
      workLocationGuid: params?.id,
      name: '',
      phoneNumber: '',
      emailAccount: '',
      description: '',
    },
    onSubmit: async () => {
      if (isValid) {
        try {
          let res = await request.addContactPerson(values)
          if (res.data) {
            toast.success('Successfully Added Contact Person')
            dispatch(getAllContactPersons(params?.id))
            setVisible(false)
          }
        } catch (err) {
          toast.error('Could Not Add Contact Person')
          console.log(err)
        }
      }
    },
  })
  return (
    <>
      <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <h2>Contact Person</h2>
        </CModalHeader>
        <CModalBody className="fw-bold px-5">
          <CRow className="my-4">
            <CCol lg={3}>
              <CFormLabel>Name</CFormLabel>
            </CCol>
            <CCol>
              <CFormInput id="name" value={values.name} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="my-4">
            <CCol lg={3}>
              <CFormLabel>Phone Number</CFormLabel>
            </CCol>
            <CCol>
              <CFormInput id="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="my-4">
            <CCol lg={3}>
              <CFormLabel>Email Account</CFormLabel>
            </CCol>
            <CCol>
              <CFormInput id="emailAccount" value={values.emailAccount} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="my-4">
            <CCol lg={3}>
              <CFormLabel>Description</CFormLabel>
            </CCol>
            <CCol>
              <CFormTextarea
                id="description"
                rows={4}
                value={values.description}
                onChange={handleChange}
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
            onClick={handleSubmit}
          >
            Add
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
    </>
  )
}

export default AddContactPerson

AddContactPerson.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
