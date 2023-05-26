import React from 'react'
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
import { getFixedAllowance } from 'src/features/Employee/employeeExtraDetails/apiCalls'
const AddFixedAllowancesInfo = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      wagesDateCode: '1-11-2023',
      recId: 0,
      id: 0,
      allowanceItemCode: '',
      allowanceItemName: '',
      currencyCode: '',
      allowanceAmount: '',
    },
    onSubmit: async (values) => {
      try {
        let res = await request.addFixedAllowance(values)
        if (res.data) {
          formik.resetForm()
          setVisible(false)
          dispatch(getFixedAllowance(params.id))
          toast.success('Fixed Allowances Added Successfully')
        }
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Fixed Allowances')
      }
    },
  })

  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Add Allowances</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Paid Item</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.allowanceItemName}
              onChange={formik.handleChange}
              id="allowanceItemName"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Paid Item Payment</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.allowanceAmount}
              onChange={formik.handleChange}
              id="allowanceAmount"
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <button className="button-primary" onClick={formik.handleSubmit}>
          Update
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default AddFixedAllowancesInfo
AddFixedAllowancesInfo.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
