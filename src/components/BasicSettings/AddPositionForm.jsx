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
import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { getAllPositions } from 'src/features/SystemGeneralDef/apiCalls'
import { positionSchema } from '../Employees/AddEmployeeInfoModals/validationschemas/AddSysDefSchemas'
const AddPositionForm = ({ showForm, setShowForm, departmentList }) => {
  const dispatch = useDispatch()
  const { isValid, handleChange, handleSubmit, isSubmitting, errors, values, setFieldValue } =
    useFormik({
      initialValues: {
        deparmentCode: '',
        positionCode: '',
        positionName: '',
      },
      validationSchema: positionSchema,
      onSubmit: async () => {
        if (isValid) {
          try {
            let res = await request.createPosition(values)
            res.data && toast.success('New Position Added')
            dispatch(getAllPositions())
            setShowForm(false)
          } catch (err) {
            console.log(err)
            toast.error('Could Not Add New Position')
            setShowForm(false)
          }
        }
      },
    })
  return (
    <CModal size="lg" visible={showForm} onClose={() => setShowForm(false)}>
      <CModalHeader className="align-items-center">
        <h3>Add New Position</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Department <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              id="deparmentCode"
              className={errors.deparmentCode && 'border-danger'}
              value={values.deparmentCode}
              onChange={(e) => {
                if (e) {
                  setFieldValue('deparmentCode', e.target.value)
                }
              }}
            >
              <option value={''} disabled defaultChecked></option>
              {departmentList.map((dep, index) => (
                <option key={index} value={dep.value}>
                  {dep.label}
                </option>
              ))}
            </CFormSelect>

            <div className="validator-message text-danger">
              {errors.deparmentCode && errors.deparmentCode}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Position Code <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="positionCode"
              className={errors.positionCode && 'border-danger'}
              value={values.positionCode}
              onChange={handleChange}
            />
            <div className="validator-message text-danger">
              {errors.positionCode && errors.positionCode}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Position Name <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="positionName"
              className={errors.positionName && 'border-danger'}
              value={values.positionName}
              onChange={handleChange}
            />
            <div className="validator-message text-danger">
              {errors.positionName && errors.positionName}
            </div>
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

export default AddPositionForm

AddPositionForm.propTypes = {
  showForm: PropTypes.bool,
  setShowForm: PropTypes.func,
  departmentList: PropTypes.any,
}
