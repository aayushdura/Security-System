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
import { getAllDepartments } from 'src/features/SystemGeneralDef/apiCalls'
import { departmentSchema } from '../Employees/AddEmployeeInfoModals/validationschemas/AddSysDefSchemas'
const AddDepartmentForm = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch()
  const { handleChange, handleSubmit, isSubmitting, isValid, errors, values, setFieldValue } =
    useFormik({
      initialValues: {
        departmentCode: '',
        parentDepartmentCode: '',
        deparmentName: '',
      },
      validationSchema: departmentSchema,
      onSubmit: async () => {
        if (isValid) {
          try {
            let res = await request.createDepartment(values)
            res.data && toast.success('New Department Added')
            dispatch(getAllDepartments())
            setShowForm(false)
          } catch (err) {
            console.log(err)
            toast.error('Could Not Add New Department')
            setShowForm(false)
          }
        }
      },
    })
  return (
    <CModal size="lg" visible={showForm} onClose={() => setShowForm(false)}>
      <CModalHeader className="align-items-center">
        <h3>Add New Department</h3>
      </CModalHeader>
      <CModalBody className="ps-5">
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Department Code <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="departmentCode"
              className={errors.departmentCode && 'border-danger'}
              value={values.departmentCode}
              onChange={handleChange}
            />
            <div className="validator-message text-danger">
              {errors.departmentCode && errors.departmentCode}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Department Name <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormInput
              id="deparmentName"
              className={errors.deparmentName && 'border-danger'}
              value={values.deparmentName}
              onChange={handleChange}
            />
            <div className="validator-message text-danger">
              {errors.deparmentName && errors.deparmentName}
            </div>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol sm={4}>
            <CFormLabel className="fw-bold">
              Parent Department <span style={{ color: 'red' }}>*</span>
            </CFormLabel>
          </CCol>
          <CCol sm={6}>
            <CFormSelect
              id="parentDepartmentCode"
              className={errors.parentDepartmentCode && 'border-danger'}
              value={values.parentDepartmentCode}
              onChange={(e) => {
                if (e) {
                  setFieldValue('parentDepartmentCode', e.target.value)
                }
              }}
            >
              <option value={''} disabled defaultChecked></option>
              <option value="HKID">HKID</option>
              <option value="CHNA">CHNA</option>
              <option value="NPL">NPL</option>
            </CFormSelect>
            <div className="validator-message text-danger">
              {errors.parentDepartmentCode && errors.parentDepartmentCode}
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

export default AddDepartmentForm

AddDepartmentForm.propTypes = {
  showForm: PropTypes.bool,
  setShowForm: PropTypes.func,
}
