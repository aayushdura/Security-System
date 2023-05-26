import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getCurrentEmployee } from 'src/features/Employee/employeeSlice'
import { useSelector } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'

const AddBankAccountInfo = ({ visible, setVisible }) => {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const { currentEmployee } = useSelector((state) => state.employee)
  const params = useParams()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      bankAccNo: currentEmployee.bankAccNo ? currentEmployee.bankAccNo : '',
      bankHolderName: currentEmployee.bankHolderName ? currentEmployee.bankHolderName : '',
      bankName: currentEmployee.bankName ? currentEmployee.bankName : '',
      bankBranchName: currentEmployee.bankBranchName ? currentEmployee.bankBranchName : '',
      paymentMethod: currentEmployee.paymentMethod ? currentEmployee.paymentMethod : '',
    },
    onSubmit: async (values) => {
      setSubmitting(true)
      try {
        let res = await request.addBankAccountInfo(values.employeeGuid, values)
        if (res.data) {
          formik.resetForm()
          setSubmitting(false)
          setVisible(false)
          dispatch(getCurrentEmployee(res.data))
          toast.success('Bank Details Added Successfully')
        }
      } catch (err) {
        setSubmitting(false)
        console.log(err)
        toast.error('Failed to add Bank Details')
      }
    },
  })

  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Bank Account Info</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Account Holder Number</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.bankAccNo}
              onChange={formik.handleChange}
              id="bankAccNo"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Account Holder Name</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.bankHolderName}
              onChange={formik.handleChange}
              id="bankHolderName"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Bank Name</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.bankName}
              onChange={formik.handleChange}
              id="bankName"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Branch Name</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.bankBranchName}
              onChange={formik.handleChange}
              id="bankBranchName"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Payment Method</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              id="paymentMethod"
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <button
          className={
            submitting
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary`
          }
          onClick={formik.handleSubmit}
        >
          Update
          {submitting && (
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

export default AddBankAccountInfo
AddBankAccountInfo.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
