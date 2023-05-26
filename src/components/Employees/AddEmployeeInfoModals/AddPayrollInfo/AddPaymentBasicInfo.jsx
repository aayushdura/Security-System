import React from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
// import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
const AddPaymentBasicInfo = ({ visible, setVisible }) => {
  const params = useParams()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeGuid: params.id,
      payrollType: '',
      basicSalary: '',
      otcompensationCode: '',
      otRule: '',
      lateRule: '',
      absentRule: '',
      annualLeave: '',
    },
    onSubmit: async (values) => {
      try {
        // let res = await request.addLicense(values)
        // console.log(res.data)
        formik.resetForm()
        setVisible(false)
        toast.success('Basic Payment Info Added Successfully')
      } catch (err) {
        console.log(err)
        toast.error('Failed to add Basic Payment Info')
      }
    },
  })

  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <h3>Payment Basic Info</h3>
      </CModalHeader>
      <CModalBody className="ps-5 fw-bold">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Payroll Type <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              value={formik.values.payrollType}
              onChange={(e) => {
                if (!e) return
                formik.setFieldValue('payrollType', e.target.value)
              }}
              id="payrollType"
            >
              <option value={''} defaultValue disabled></option>
              <option value={'Full Time'}>Full Time</option>
              <option value={'Part Time'}>Part Time</option>
              <option value={'Contract'}>Contract</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Basic Salary <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.basicSalary}
              onChange={formik.handleChange}
              id="basicSalary"
              type="number"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Over Time Salary<span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6} className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <CFormCheck
                className="w-50"
                id="otRule"
                name="otRule"
                onChange={formik.handleChange}
                type="radio"
                value={'rate'}
                label="By Rate"
              />{' '}
              <CFormInput
                disabled={formik.values.otRule === 'fixed' || formik.values.otRule === ''}
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <CFormCheck
                className="w-50"
                name="otRule"
                id="otRule"
                onChange={formik.handleChange}
                type="radio"
                value={'fixed'}
                label="Fixed"
              />{' '}
              <CFormInput
                disabled={formik.values.otRule === 'rate' || formik.values.otRule === ''}
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Over Time Rule</CFormLabel>
          </CCol>
          <CCol sm={6} className="d-flex flex-column gap-3">
            <div>
              <CFormCheck
                // onChange={}
                label="Minimum Time count as OT"
                type="checkbox"
              />
              <CFormInput />
            </div>
            <div>
              <CFormCheck
                // onChange={}
                label="Minimum Time per OT"
                type="checkbox"
              />
              <CFormInput />
            </div>
            <CFormCheck
              // onChange={}
              label="Require Pre-Approval"
              type="checkbox"
            />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Late Rule</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormCheck
              // onChange={}
              label="Minimum Time count as Late"
              type="checkbox"
            />
            <CFormInput />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Absent Rule</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormCheck
              // value={formik.values.expiryDate}
              // onChange={formik.handleChange}
              // id="expiryDate"
              label="Minimum Time count as Absent"
              type="checkbox"
            />
            <CFormInput type="text" />
          </CCol>
        </CRow>
        <CRow className="mb-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">Annual Leave</CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              value={formik.values.annualLeave}
              onChange={formik.handleChange}
              id="annualLeave"
              type="text"
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

export default AddPaymentBasicInfo
AddPaymentBasicInfo.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
