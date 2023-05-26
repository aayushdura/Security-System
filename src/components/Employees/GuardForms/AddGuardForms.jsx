import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { request } from 'src/utils/requests'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentEmployee } from 'src/features/Employee/employeeSlice'
import moment from 'moment'
import { getCountries, getSystemDefGender } from 'src/features/SystemGeneralDef/apiCalls'
import { getSystemDepartment } from 'src/features/SystemGeneralDef/systemDefSlice'
import addImage from '../../../assets/images/addimage.png'
import { employeeAddEditValidation } from './validationSchema'
import { useCallback } from 'react'
import { getEmployeeList, getStaffList } from 'src/features/Employee/apiCalls'
import { TailSpin } from 'react-loader-spinner'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
const AddGuardForm = ({ formType, showForm, setShowForm }) => {
  const { systemGenderType, systemCountry, systemDepartments } = useSelector(
    (state) => state.systemDef,
  )
  const { currentEmployee } = useSelector((state) => state.employee)
  const dispatch = useDispatch()
  const [probationPeriod, setProbationPeriod] = useState('')
  const [userPhoto, setUserPhoto] = useState({})
  const [userIdCard, setUserIdCard] = useState({})
  const [employeeStatus, setEmployeeStatus] = useState()
  const [employeePosition, setEmployeePosition] = useState()
  const [stateList, setStateList] = useState()
  const [countysList, setCountysList] = useState()
  const [submitting, setSubmitting] = useState(false)
  const params = useParams()
  const photoRef = useRef()
  const idCardRef = useRef()

  const marriedStatus = [
    { label: 'Married', value: 'married' },
    { label: 'Unmarried', value: 'unmarried' },
  ]

  const handlePhotoChange = async (e) => {
    let res = await handleFileOnChange(e, 'Picture')
    if (typeof res === 'string') {
      toast.error(res)
    } else {
      setUserPhoto(res)
    }
  }

  const handlePhotoUpload = () => {
    photoRef.current.click()
  }
  const handleIdCardOnChange = async (e) => {
    let res = await handleFileOnChange(e, 'Id')
    if (typeof res === 'string') {
      toast.error(res)
    } else {
      setUserIdCard(res)
    }
  }
  const hanleIdCardUpload = () => {
    idCardRef.current.click()
  }

  const formik = useFormik({
    validationSchema: employeeAddEditValidation,
    enableReinitialize: true,
    initialValues: {
      firstName: formType === 'Edit' ? currentEmployee.firstName : '',
      lastName: formType === 'Edit' ? currentEmployee.lastName : '',
      gender: formType === 'Edit' ? currentEmployee.gender : '',
      otherName: formType === 'Edit' ? currentEmployee.otherName : '',
      employeeCode: formType === 'Edit' ? currentEmployee.employeeCode : '',
      currenetDepartmentCode: formType === 'Edit' ? currentEmployee.currenetDepartmentCode : '',
      currentPositionCode: formType === 'Edit' ? currentEmployee.currentPositionCode : '',
      dateOfEntry:
        formType === 'Edit' ? moment(currentEmployee.dateOfEntry).format('YYYY-MM-DD') : '',
      dateOfReEntry:
        formType === 'Edit' ? moment(currentEmployee.dateofReEntry).format('YYYY-MM-DD') : '',
      recuitmentSource: formType === 'Edit' ? currentEmployee.recuitmentSource : '',
      statusId: formType === 'Edit' ? currentEmployee.statusId : '',
      workPhone: formType === 'Edit' ? currentEmployee.workPhone : '',
      empType: '',
      workingEmail: formType === 'Edit' ? currentEmployee.workingEmail : '',
      mpfproviderCode: '',
      taxationCode: '',
      mpfschemeNo: '',
      taxArea: '',
      mpfaccountCreationDate:
        formType === 'Edit'
          ? moment(currentEmployee.mpfaccountCreationDate).format('YYYY-MM-DD')
          : '',
      volunatryContribution: '',
      homeAddressId: formType === 'Edit' ? currentEmployee.homeAddressId : 0,
      addressDetail: {
        cRecCode: 'HR',
        cRecType: 'C',
        cRecGuid:
          formType === 'Edit'
            ? currentEmployee.employeeGuid
            : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        companyName: '',
        fullName: '',
        email:
          formType === 'Edit'
            ? currentEmployee.addressDetail?.email
              ? currentEmployee.addressDetail?.email
              : ''
            : '',
        countryCode: formType === 'Edit' ? currentEmployee.addressModel?.countryCode : '',
        stateProvinceCode:
          formType === 'Edit' ? currentEmployee.addressModel?.stateProvinceCode : '',
        countyCode: formType === 'Edit' ? currentEmployee.addressModel?.countyCode : '',
        add1: '',
        add2: '',
        zipCode: formType === 'Edit' ? currentEmployee.addressModel?.zipCode : '',
        areaCode: '',
        mobilePhone: formType === 'Edit' ? currentEmployee.addressDetail?.mobilePhone : '',
        tel: '',
        fax: '',
        idCardNo: '',
        customAttributes: '',
        isBilling: true,
        billFormatId: 0,
        dnFormatId: 0,
        extraDeliveryFee: 0,
        idCardPicture1: 0,
        idCardPicture2: 0,
        locales: [
          {
            languageCulture: null,
            companyName: null,
            fullName: '',
            city: '',
            add1: '',
            add2: '',
          },
        ],
      },
      personalEmail: formType === 'Edit' ? currentEmployee.personalEmail : '',
      dateOfBirth:
        formType === 'Edit' ? moment(currentEmployee.dateOfBirth).format('YYYY-MM-DD') : '',
      maritalStatus: formType === 'Edit' ? currentEmployee.maritalStatus : true,
      nationality: formType === 'Edit' ? currentEmployee.nationality : '',
      iddocNo: '',
      bankCode: '',
      bankAccNo: '',
      otcompensationCode: 'CD',
      empDetails: {
        id: 0,
        employeeGuid: formType === 'Edit' ? params.id : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        probationStart:
          formType === 'Edit'
            ? moment(
                currentEmployee?.detailModel?.probationStart ?? currentEmployee.dateOfEntry,
              ).format('YYYY-MM-DD')
            : '',
        probationEnd: formType === 'Edit' ? currentEmployee?.detailModel?.probationEnd : '',
        probationRemarks: formType === 'Edit' ? currentEmployee?.detailModel?.probationRemarks : '',
        currentDepartmentCode:
          formType === 'Edit'
            ? currentEmployee?.detailModel?.currentDepartmentCode?.departmentCode ??
              currentEmployee.currenetDepartmentCode
            : '',
        currentPositionCode:
          formType === 'Edit'
            ? currentEmployee?.detailModel?.currentPositionCode?.positionCode ??
              currentEmployee.currentPositionCode
            : '',
        formerDepartmentCode:
          formType === 'Edit'
            ? currentEmployee.detailModel?.formerDepartmentCode?.departmentCode
            : '',
        formerPositionCode:
          formType === 'Edit' ? currentEmployee.detailModel?.formerPositionCode?.positionCode : '',
        transferValidfrom:
          formType === 'Edit' ? currentEmployee.detailModel?.transferValidfrom : '',
        transferRemarks: formType === 'Edit' ? currentEmployee.detailModel?.transferRemarks : '',
        promotedDepartmentCode:
          formType === 'Edit'
            ? currentEmployee.detailModel?.promotedDepartmentCode?.departmentCode
            : '',
        promotedPositionCode:
          formType === 'Edit'
            ? currentEmployee.detailModel?.promotedPositionCode?.positionCode
            : '',
        promotionValidFrom:
          formType === 'Edit' ? currentEmployee.detailModel?.promotionValidFrom : '',
        promotionRemarks: formType === 'Edit' ? currentEmployee.detailModel?.promotionRemarks : '',
        resignationNotifiedDate:
          formType === 'Edit' ? currentEmployee.detailModel?.resignationNotifiedDate : '',
        resignationNotifiedperiod:
          formType === 'Edit' ? currentEmployee.detailModel?.resignationNotifiedperiod : '2 months',
        resignationValidateFrom:
          formType === 'Edit' ? currentEmployee.detailModel?.resignationValidateFrom : '',
        resignationRemarks:
          formType === 'Edit' ? currentEmployee.detailModel?.resignationRemarks : '',
      },
    },
    onSubmit: async (values) => {
      if (formik.isValid && values) {
        setSubmitting(true)
        if (formType !== 'Edit') {
          let data = {
            ...values,
            pictureId: userPhoto?.pictureId,
            proofdetail: {
              id: 0,
              employeeGuid:
                formType === 'Edit'
                  ? currentEmployee.employeeGuid
                  : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              iddocNo: '',
              iddocType: '',
              iddocFileName:
                formType === 'Edit'
                  ? userIdCard?.fileName ?? currentEmployee.proofModel?.iddocFileName
                  : userIdCard?.fileName,
              issueDate: '',
              expiryDate: '',
              isDefault: true,
              fileGuid: '',
              fileUploadTimeUtc: '',
              pictureId:
                formType === 'Edit'
                  ? userIdCard?.pictureId ?? currentEmployee.proofModel?.pictureId
                  : userIdCard?.pictureId,
            },
          }
          await request
            .addEmployee(data)
            .then((res) => {
              if (res.data) {
                toast.success('Employee Data Submitted')
                setShowForm(false)
                dispatch(getEmployeeList())
                dispatch(getStaffList())
                setSubmitting(false)
              }
            })
            .catch((error) => {
              setSubmitting(false)
              toast.error(error.response.data?.ErrorList[0].message)
              console.log(error.response.data?.ErrorList[0].message)
            })
        } else if (formType === 'Edit') {
          let data = {
            ...values,
            empDetails: { ...values.empDetails, probationPeriod: probationPeriod },
            pictureId: userPhoto?.pictureId ?? currentEmployee.pictureModel?.pictureId,
            proofdetail: {
              id: 0,
              employeeGuid:
                formType === 'Edit'
                  ? currentEmployee.employeeGuid
                  : '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              iddocNo: '',
              iddocType: '',
              iddocFileName:
                formType === 'Edit'
                  ? userIdCard?.fileName ?? currentEmployee.proofModel?.iddocFileName
                  : userIdCard?.fileName,
              issueDate: '',
              expiryDate: '',
              isDefault: true,
              fileGuid: '',
              fileUploadTimeUtc: '',
              pictureId:
                formType === 'Edit'
                  ? userIdCard?.pictureId ?? currentEmployee.proofModel?.pictureId
                  : userIdCard?.pictureId,
            },
          }
          await request
            .updateSingleEmployee(params?.id, data)
            .then((res) => {
              toast.success('Updated Sucessfully')
              setShowForm(false)
              dispatch(getCurrentEmployee(res.data))
              setSubmitting(false)
            })
            .catch((error) => {
              setSubmitting(false)
              toast.error(error.response.data?.ErrorList[0].message)
            })
        }
      }
    },
  })
  const calculateTimeDiff = useCallback((endDate, startDate) => {
    if (!endDate) {
      setProbationPeriod('')
    }
    const monthDifference = moment(endDate).diff(startDate, 'months', true)
    monthDifference >= 0 && setProbationPeriod(`${Math.floor(monthDifference)} Months`)
  }, [])
  useEffect(() => {
    calculateTimeDiff(formik.values.empDetails.probationEnd, formik.values.dateOfEntry)
  }, [formik.values.empDetails.probationEnd, formik.values.dateOfEntry, calculateTimeDiff])
  async function getStatus() {
    try {
      let res = await request.fetchEmployeeStatus()
      setEmployeeStatus(res.data?.status)
    } catch (err) {
      console.log(err)
    }
  }
  async function getPosition() {
    try {
      let res = await request.fetchEmployeePosition()
      setEmployeePosition(res.data.position)
    } catch (err) {
      console.log(err)
    }
  }
  const getDepartment = useCallback(async () => {
    try {
      let res = await request.fetchEmployeeDepartment()
      dispatch(getSystemDepartment(res.data?.department))
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])
  async function getStateList(countryCode) {
    if (countryCode) {
      try {
        let res = await request.fetchStateList(`CountryCode=${countryCode}`)
        setStateList(res.data.stateProvinces)
      } catch (err) {
        console.log(err)
      }
    }
    return
  }
  async function getCityList(state) {
    if (state) {
      try {
        let res = await request.fetchCountysList(state)
        setCountysList(res.data.countys)
      } catch (err) {
        console.log(err)
      }
    }
  }
  useLayoutEffect(() => {
    getDepartment()
  }, [dispatch, getDepartment])
  useLayoutEffect(() => {
    dispatch(getSystemDefGender('gender'))
    dispatch(getCountries())
  }, [dispatch])
  useEffect(() => {
    getStatus()
    getPosition()
  }, [])
  useMemo(() => {
    getStateList(formik.values.addressDetail.countryCode)
  }, [formik.values.addressDetail.countryCode])
  useMemo(() => {
    getCityList(formik.values.addressDetail.stateProvinceCode)
  }, [formik.values.addressDetail.stateProvinceCode])

  return (
    <CModal scrollable size="xl" visible={showForm} onClose={() => setShowForm(false)}>
      <CModalHeader onClose={() => setShowForm(false)}>
        <h5 className="fw-bold m-0 text-capitalize">{formType} Employee Profile</h5>
      </CModalHeader>
      <CModalBody>
        <CRow className="ps-3">
          <CCol sm={9}>
            <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Basic Info</CRow>
            <CRow className="mt-3">
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-lg-2 fw-bold">First Name</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className={formik.errors.firstName && 'border-danger'}
                    required={true}
                    type="text"
                    id="firstName"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.firstName && formik.errors.firstName}
                  </div>
                </CCol>
                <CFormLabel className="col-lg-2 fw-bold">Last Name</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.lastName}
                    className={formik.errors.lastName && 'border-danger'}
                    onChange={formik.handleChange}
                    type="text"
                    id="lastName"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.lastName && formik.errors.lastName}
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Gender</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.gender}
                    className={formik.errors.gender && 'border-danger'}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('gender', e.target.value)
                    }}
                    id="gender"
                  >
                    <option disabled defaultValue value={''}></option>
                    {Array.isArray(systemGenderType) &&
                      systemGenderType.map((genderObj) => (
                        <option key={genderObj.defineKey} value={genderObj.defineKey}>
                          {genderObj.defineName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.gender && formik.errors.gender}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Other Name</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.otherName}
                    onChange={formik.handleChange}
                    type="text"
                    id="otherName"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Employee ID</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.employeeCode}
                    onChange={formik.handleChange}
                    className={formik.errors.employeeCode && 'border-danger'}
                    type="text"
                    id="employeeCode"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.employeeCode && formik.errors.employeeCode}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Email</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.addressDetail?.email}
                    className={formik.errors.addressDetail?.email && 'border-danger'}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue('addressDetail.email', e.target.value)
                      }
                    }}
                    type="email"
                    id="email"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.addressDetail?.email && formik.errors.addressDetail?.email}
                  </div>
                </CCol>
              </CRow>
            </CRow>
            <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Work</CRow>
            <CRow className="mt-3">
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Department</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.currenetDepartmentCode}
                    className={formik.errors.currenetDepartmentCode && 'border-danger'}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue('currenetDepartmentCode', e.target.value)
                      }
                    }}
                    type="select"
                    size="sm"
                    name="currenetDepartmentCode"
                  >
                    <option disabled defaultValue={''} value={''}></option>
                    {systemDepartments &&
                      systemDepartments.map((option, index) => (
                        <option key={index} value={option.departmentCode}>
                          {option.deparmentName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.currenetDepartmentCode && formik.errors.currenetDepartmentCode}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Position</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.currentPositionCode}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('currentPositionCode', e.target.value)
                    }}
                    className={formik.errors.currentPositionCode && 'border-danger'}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    {Array.isArray(employeePosition) &&
                      employeePosition.map((option, index) => (
                        <option key={index} value={option.positionCode}>
                          {option.positionName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.currentPositionCode && formik.errors.currentPositionCode}
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Date of Entry</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.dateOfEntry}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue('dateOfEntry', e.target.value)
                      }
                    }}
                    className={formik.errors.dateOfEntry && 'border-danger'}
                    type="date"
                    id="dateOfEntry"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.dateOfEntry && formik.errors.dateOfEntry}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Date of Re-Entry</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.dateOfReEntry}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('dateOfReEntry', e.target.value)
                    }}
                    type="date"
                    id="dateOfReEntry"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Source of Recruitment</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.recuitmentSource}
                    onChange={formik.handleChange}
                    type="text"
                    id="recuitmentSource"
                  />
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Employment Status</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.statusId}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('statusId', e.target.value)
                    }}
                    className={formik.errors.statusId && 'border-danger'}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    {Array.isArray(employeeStatus) &&
                      employeeStatus.map((option, index) => (
                        <option key={index} value={option.statusId}>
                          {option.statusName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.statusId && formik.errors.statusId}
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Work Phone</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.workPhone}
                    onChange={formik.handleChange}
                    type="number"
                    id="workPhone"
                  />
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold fw-bold fw-bold">Employee Type</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.empType}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('empType', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="FullTime">Full-time</option>
                    <option value="PartTime">Part-time</option>
                    <option value="Substitute">Substitute</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Work Email</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.workingEmail}
                    onChange={formik.handleChange}
                    type="email"
                    id="workingEmail"
                  />
                </CCol>
              </CRow>
            </CRow>
            {formType === 'Edit' && (
              <>
                <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Probation Details</CRow>
                <CRow className="mt-3">
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Start of Probation</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.dateOfEntry}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.probationStart', e.target.value)
                          }
                        }}
                        disabled
                        type="date"
                        id="probationStart"
                      />
                      {/* <div className="validator-message text-danger">
                        {formik.errors.startOfProbation && formik.errors.startOfProbation}
                      </div> */}
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Probation Period</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={probationPeriod}
                        // onChange={(e) => {
                        //   if (e) {
                        //     formik.setFieldValue('empDetails.probabtionPeriod', e.target.value)
                        //   }
                        // }}
                        disabled
                        type="text"
                        id="probationPeriod"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">End of Probation</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.probationEnd}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.probationEnd', e.target.value)
                          }
                        }}
                        // className={formik.errors.endofProbation && 'border-danger'}
                        type="date"
                        id="probationEnd"
                      />
                      {/* <div className="validator-message text-danger">
                        {formik.errors.endofProbation && formik.errors.endofProbation}
                      </div> */}
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Remarks</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.probationRemarks}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.probationRemarks', e.target.value)
                          }
                        }}
                        type="text"
                        id="probationRemarks"
                      />
                    </CCol>
                  </CRow>
                </CRow>
                <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Transfer Details</CRow>
                <CRow className="mt-3">
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Current Department</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.currentDepartmentCode}
                        // className={formik.errors.currentDepartmentCode && 'border-danger'}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.currentDepartmentCode', e.target.value)
                          }
                        }}
                        type="select"
                        size="sm"
                        name="currentDepartmentCode"
                      >
                        <option disabled defaultValue value={''}></option>
                        {systemDepartments &&
                          systemDepartments.map((option, index) => (
                            <option key={index} value={option.departmentCode}>
                              {option.deparmentName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentDepartmentCode && formik.errors.currentDepartmentCode}
                      </div> */}
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Current Position</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.currentPositionCode}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.currentPositionCode', e.target.value)
                        }}
                        // className={formik.errors.currentPositionCode && 'border-danger'}
                        type="select"
                        size="sm"
                      >
                        <option disabled defaultValue value={''}></option>
                        {Array.isArray(employeePosition) &&
                          employeePosition.map((option, index) => (
                            <option key={index} value={option.positionCode}>
                              {option.positionName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentPositionCode && formik.errors.currentPositionCode}
                      </div> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Transfer Valid Date From</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.transferValidfrom}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.transferValidfrom', e.target.value)
                        }}
                        type="date"
                        id="empDetails.transferValidfrom"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Remarks</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.transferRemarks}
                        onChange={(e) => {
                          if (e) formik.setFieldValue('empDetails.transferRemarks', e.target.value)
                        }}
                        type="text"
                        id="transferRemarks"
                      />
                    </CCol>
                  </CRow>
                </CRow>
                <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Promotion Details</CRow>
                <CRow className="mt-3">
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Department</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.promotedDepartmentCode}
                        // className={formik.errors.currentDepartmentCode && 'border-danger'}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue(
                              'empDetails.promotedDepartmentCode',
                              e.target.value,
                            )
                          }
                        }}
                        type="select"
                        size="sm"
                        name="currentDepartmentCode"
                      >
                        <option disabled defaultValue value={''}></option>
                        {systemDepartments &&
                          systemDepartments.map((option, index) => (
                            <option key={index} value={option.departmentCode}>
                              {option.deparmentName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentDepartmentCode && formik.errors.currentDepartmentCode}
                      </div> */}
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Current Position</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.currentPositionCode}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.currentPositionCode', e.target.value)
                        }}
                        // className={formik.errors.currentPositionCode && 'border-danger'}
                        type="select"
                        size="sm"
                      >
                        <option disabled defaultValue value={''}></option>
                        {Array.isArray(employeePosition) &&
                          employeePosition.map((option, index) => (
                            <option key={index} value={option.positionCode}>
                              {option.positionName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentPositionCode && formik.errors.currentPositionCode}
                      </div> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Promotion Valid Date From</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.promotionValidFrom}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.promotionValidFrom', e.target.value)
                        }}
                        type="date"
                        id="promotionValidFrom"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Promoted Position</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.promotedPositionCode}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.promotedPositionCode', e.target.value)
                        }}
                        // className={formik.errors.currentPositionCode && 'border-danger'}
                        type="select"
                        size="sm"
                      >
                        <option disabled defaultValue value={''}></option>
                        {Array.isArray(employeePosition) &&
                          employeePosition.map((option, index) => (
                            <option key={index} value={option.positionCode}>
                              {option.positionName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentPositionCode && formik.errors.currentPositionCode}
                      </div> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Remarks</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.promotionRemarks}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.promotionRemarks', e.target.value)
                          }
                        }}
                        id="promotionRemarks"
                      />
                    </CCol>
                  </CRow>
                </CRow>
                <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Resignation Details</CRow>
                <CRow className="mt-3">
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Former Department</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.formerDepartmentCode}
                        // className={formik.errors.currentDepartmentCode && 'border-danger'}
                        onChange={(e) => {
                          if (e) {
                            formik.setFieldValue('empDetails.formerDepartmentCode', e.target.value)
                          }
                        }}
                        type="select"
                        size="sm"
                        name="empDetails.formerDepartmentCode"
                      >
                        <option disabled defaultValue value={''}></option>
                        {systemDepartments &&
                          systemDepartments.map((option, index) => (
                            <option key={index} value={option.departmentCode}>
                              {option.deparmentName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentDepartmentCode && formik.errors.currentDepartmentCode}
                      </div> */}
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">Former Position</CFormLabel>
                    <CCol sm={4}>
                      <CFormSelect
                        value={formik.values.empDetails.formerPositionCode}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.formerPositionCode', e.target.value)
                        }}
                        // className={formik.errors.currentPositionCode && 'border-danger'}
                        type="select"
                        size="sm"
                      >
                        <option disabled defaultValue value={''}></option>
                        {Array.isArray(employeePosition) &&
                          employeePosition.map((option, index) => (
                            <option key={index} value={option.positionCode}>
                              {option.positionName}
                            </option>
                          ))}
                      </CFormSelect>
                      {/* <div className="validator-message text-danger">
                        {formik.errors.currentPositionCode && formik.errors.currentPositionCode}
                      </div> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Resignation Notified Date</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.resignationNotifiedDate}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue(
                              'empDetails.resignationNotifiedDate',
                              e.target.value,
                            )
                        }}
                        type="date"
                        id="dateOfTransferValid"
                      />
                    </CCol>
                    <CFormLabel className="col-sm-2 fw-bold">
                      Resignation Valid Date From
                    </CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.resignationValidateFrom}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue(
                              'empDetails.resignationValidateFrom',
                              e.target.value,
                            )
                        }}
                        type="date"
                        id="resignationValidateFrom"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3 align-items-center">
                    <CFormLabel className="col-sm-2 fw-bold">Remarks</CFormLabel>
                    <CCol sm={4}>
                      <CFormInput
                        value={formik.values.empDetails.resignationRemarks}
                        onChange={(e) => {
                          if (e)
                            formik.setFieldValue('empDetails.resignationRemarks', e.target.value)
                        }}
                        type="text"
                        id="resignationRemarks"
                      />
                    </CCol>
                  </CRow>
                </CRow>
              </>
            )}
            <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">MPF Details</CRow>
            <CRow className="mt-3">
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">MPF Provider</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.mpfproviderCode}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('mpfproviderCode', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Taxation Code</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.taxationCode}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('taxationCode', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">MPF Scheme</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.mpfschemeNo}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('mpfschemeNo', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Taxation Area</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.taxArea}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('taxArea', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">MPF Account Creation Date</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.mpfaccountCreationDate}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('mpfaccountCreationDate', e.target.value)
                    }}
                    type="date"
                    id="mpfaccountCreationDate"
                  />
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Voluntary Contributions</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.volunatryContribution}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('volunatryContribution', e.target.value)
                    }}
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CRow>
            <CRow className="fs-5 ps-2 mt-2 fw-bold fw-bold">Personal Details</CRow>
            <CRow className="mt-3">
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Address 1</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.addressDetail.add1}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.add1', e.target.value)
                    }}
                    type="text"
                    id="address1"
                  />
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Address 2</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.addressDetail.add2}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.add2', e.target.value)
                    }}
                    type="text"
                    id="address2"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">State/Province</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.addressDetail.stateProvinceCode}
                    className={formik.errors.addressDetail?.stateProvinceCode && 'border-danger'}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.stateProvinceCode', e.target.value)
                    }}
                    type="text"
                    id="state"
                  >
                    <option disabled defaultValue value={''}></option>
                    {Array.isArray(stateList) &&
                      stateList.map((state) => (
                        <option key={state.stateProvinceCode} value={state.stateProvinceCode}>
                          {state.stateName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.addressDetail?.stateProvinceCode &&
                      formik.errors.addressDetail?.stateProvinceCode}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">County/City</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.addressDetail.countyCode}
                    className={formik.errors.addressDetail?.countyCode && 'border-danger'}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.countyCode', e.target.value)
                    }}
                    type="text"
                    id="city"
                  >
                    <option disabled defaultValue value={''}></option>
                    {Array.isArray(countysList) &&
                      countysList.map((city, index) => (
                        <option key={index} value={city.countyCode}>
                          {city.countyName}
                        </option>
                      ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.addressDetail?.countyCode &&
                      formik.errors.addressDetail?.countyCode}
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Country</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.addressDetail?.countryCode}
                    className={formik.errors.addressDetail?.countryCode && 'border-danger'}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.countryCode', e.target.value)
                    }}
                    type="select"
                    size="sm"
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
                    {formik.errors.addressDetail?.countryCode &&
                      formik.errors.addressDetail?.countryCode}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Postal Code</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.addressDetail.zipCode}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.zipCode', e.target.value)
                    }}
                    type="text"
                    id="postalCode"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Mobile</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    className={formik.errors.addressDetail?.mobilePhone && 'border-danger'}
                    value={formik.values.addressDetail.mobilePhone}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('addressDetail.mobilePhone', e.target.value)
                    }}
                    type="number"
                    id="mobilePhone"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.addressDetail?.mobilePhone &&
                      formik.errors.addressDetail?.mobilePhone}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Personal Email</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.personalEmail}
                    onChange={formik.handleChange}
                    className={formik.errors.personalEmail && 'border-danger'}
                    type="email"
                    id="personalEmail"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.personalEmail && formik.errors.personalEmail}
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3 align-items-center">
                <CFormLabel className="col-sm-2 fw-bold">Date of Birth</CFormLabel>
                <CCol sm={4}>
                  <CFormInput
                    value={formik.values.dateOfBirth}
                    className={formik.errors.dateOfBirth && 'border-danger'}
                    onChange={(e) => {
                      if (e) formik.setFieldValue('dateOfBirth', e.target.value)
                    }}
                    type="date"
                    id="dateOfBirth"
                  />
                  <div className="validator-message text-danger">
                    {formik.errors.dateOfBirth && formik.errors.dateOfBirth}
                  </div>
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Marital Status</CFormLabel>
                <CCol sm={4}>
                  <CFormSelect
                    value={formik.values.maritalStatus}
                    onChange={(e) => {
                      if (e) {
                        formik.setFieldValue('maritalStatus', e.target.value)
                        console.log(e.target.value)
                      }
                    }}
                    className={formik.errors.maritalStatus && 'border-danger'}
                    name="marriedStatus"
                    type="select"
                    size="sm"
                  >
                    <option disabled defaultValue value={''}></option>
                    {marriedStatus.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CFormSelect>
                  <div className="validator-message text-danger">
                    {formik.errors.maritalStatus && formik.errors.maritalStatus}
                  </div>
                </CCol>
              </CRow>
            </CRow>
          </CCol>
          {/* profile image */}
          <CCol sm={3} className="h-50 pt-4">
            <CRow className="justify-content-center" onClick={handlePhotoUpload}>
              <img
                onClick={handlePhotoUpload}
                src={
                  formType === 'Edit'
                    ? userPhoto?.pictureUrl ??
                      (currentEmployee.pictureModel?.pictureUrl
                        ? currentEmployee.pictureModel?.pictureUrl
                        : addImage)
                    : userPhoto?.pictureUrl ?? addImage
                }
                style={{ objectFit: 'contain' }}
                alt="employee-profile"
                height={300}
              />
            </CRow>
            <CRow className="justify-content-between align-items-center pt-3 pe-3">
              <b className="col-sm-6">Upload Photo</b>
              <input
                ref={photoRef}
                alt="employee-photo"
                type="file"
                id="input_phot"
                onChange={(e) => handlePhotoChange(e)}
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
              />
              <button className="col-sm-6 button-primary-small" onClick={handlePhotoUpload}>
                {formType === 'Edit' && currentEmployee?.pictureModel?.pictureUrl
                  ? 'Change'
                  : 'Upload'}
              </button>
            </CRow>
          </CCol>
          {/* idcard form button */}
          <CRow className="mb-3 align-items-center">
            <CCol sm={9}>
              <CRow>
                <CFormLabel className="col-sm-2 fw-bold">Nationality</CFormLabel>
                <CCol>
                  <CFormInput
                    value={formik.values.nationality}
                    onChange={formik.handleChange}
                    type="text"
                    id="nationality"
                  />
                </CCol>
                <CFormLabel className="col-sm-2 fw-bold">Identity Card</CFormLabel>
                <CCol>
                  <CFormInput
                    value={
                      formType === 'Edit'
                        ? userIdCard?.fileName ?? currentEmployee.proofModel?.iddocFileName
                        : userIdCard?.fileName
                    }
                    type="text"
                    id="id-card"
                    disabled
                  />
                  <input
                    ref={idCardRef}
                    type="file"
                    id="input_file"
                    onChange={(e) => handleIdCardOnChange(e)}
                    accept=".jpg,.png,.pdf"
                    style={{ display: 'none' }}
                  />
                </CCol>
              </CRow>
            </CCol>
            <CCol sm={3}>
              <button className="button-primary-small" onClick={hanleIdCardUpload} type="button">
                Upload
              </button>
            </CCol>
          </CRow>
        </CRow>
      </CModalBody>
      <div className="modal-footer">
        <button
          className={
            submitting
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary`
          }
          type="submit"
          disabled={submitting}
          onClick={formik.handleSubmit}
        >
          {formType === 'Add' ? 'Create' : 'Update'}
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
      </div>
    </CModal>
  )
}

AddGuardForm.propTypes = {
  formType: PropTypes.string,
  showForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
}

export default AddGuardForm
