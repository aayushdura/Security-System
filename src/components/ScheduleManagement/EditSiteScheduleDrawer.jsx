import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CFormLabel,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import Tab from '../Tab/Tab'
import { useFormik } from 'formik'
import moment from 'moment'
import { useDebounce } from 'use-debounce'
import { request } from 'src/utils/requests'
import { TailSpin } from 'react-loader-spinner'

const EditSiteScheduleDrawer = ({ OpenDrawer, setOpenDrawer }) => {
  const navigate = useNavigate()
  const [showAddRoster, setShowAddRoster] = useState(false)
  const [showAddSClass, setShowAddSClass] = useState(false)
  const [scheduleDetails, setScheduleDetails] = useState({
    month: '',
    siteAreaCode: '',
    postPointCode: '',
  })
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  let tabTitle = ['Roster Schedule', 'SClass Schedule']

  const handleDetailsChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'month':
        setScheduleDetails({ ...scheduleDetails, [name]: value })
      case 'siteAreaCode':
        setScheduleDetails({ ...scheduleDetails, [name]: value })
      case 'postPointCode':
        setScheduleDetails({ ...scheduleDetails, [name]: value })
    }
  }
  const RosterSchedule = () => {
    const { handleChange, isSubmitting, handleSubmit, setFieldValue, values } = useFormik({
      initialValues: {
        amount: '',
        rosterCode: '',
        beginSequence: '',
        truncateSequence: '',
        sClassCode: '',
      },
      onSubmit: async () => {
        console.log(values)
      },
    })
    return (
      <>
        <Drawer anchor="right" onClose={() => setShowAddRoster(false)} open={showAddRoster}>
          <div className="drawer-header">
            <h5 className="fw-bold m-0 text-capitalize">Edit Roster Schedule</h5>
          </div>
          <div className="drawer-body fw-bold mx-4">
            <>
              {' '}
              <CRow className="pt-3 mb-3 gap-2 align-items-center">
                <CCol sm={6} className="d-flex gap-5">
                  <span>Site Code</span>
                  <span>SERVICE1</span>
                </CCol>
                <CCol className="d-flex gap-5 align-items-center">
                  <span>Month</span>
                  <span>
                    {scheduleDetails.month
                      ? moment(scheduleDetails.month).format('MMMM YYYY')
                      : '---'}
                  </span>
                </CCol>
              </CRow>
              <CRow className="my-3 gap-2 align-items-center ">
                <CCol sm="6" className="d-flex gap-2 align-items-center">
                  <span>SiteAreaCode</span>
                  <span>---</span>
                </CCol>
                <CCol className="d-flex gap-2 align-items-center">
                  <span className="fw-bold">PostPointCode</span>
                  <span>---</span>
                </CCol>
              </CRow>
              <CRow className="my-3  gap-2 align-items-center ">
                <CCol sm="6" className="d-flex gap-2 align-items-center">
                  <span>RosterCode</span>
                  <CFormSelect
                    id="rosterCode"
                    value={values.rosterCode}
                    onChange={(e) => {
                      if (e) {
                        setFieldValue('rosterCode', e.target.value)
                      }
                    }}
                  >
                    <option value={''} defaultValue disabled></option>
                    <option value="RosterA">Roster A</option>
                  </CFormSelect>
                </CCol>
                <CCol className="d-flex gap-2 align-items-center">
                  <span className="fw-bold">Amount</span>
                  <CFormInput id="amount" onChange={handleChange} value={values.amount} />
                </CCol>
              </CRow>
              <CTable align="middle" className="mt-1 fw-semibold border" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">BeginSClassCode</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">SClassCode</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">IsHalfDay</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">MustSubstitute</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell className="text-center">
                      <CFormCheck
                        type="radio"
                        name="sClassCode"
                        value="Day 1"
                        onChange={handleChange}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 1</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell className="text-center">
                      <CFormCheck
                        type="radio"
                        name="sClassCode"
                        value="Day 2"
                        onChange={handleChange}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 2</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell className="text-center">
                      <CFormCheck
                        type="radio"
                        name="sClassCode"
                        value="Day 3"
                        onChange={handleChange}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 3</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <CRow className="align-items-center mt-3">
                <CCol sm="4"> Begin Sequence </CCol>
                <CCol sm="5">
                  <CFormInput
                    type="date"
                    id="beginSequence"
                    onChange={handleChange}
                    value={values.beginSequence}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center mt-3">
                <CCol sm="4">Truncate Sequence</CCol>
                <CCol sm="5">
                  <CFormInput
                    type="date"
                    id="truncateSequence"
                    onChange={handleChange}
                    value={values.truncateSequence}
                  />
                </CCol>
              </CRow>
            </>
          </div>
          <div className="drawer-footer">
            <button
              className="button-gray-light"
              type="button"
              onClick={() => setShowAddRoster(false)}
            >
              Cancel
            </button>
            <button className="button-primary-light" type="button" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </Drawer>
      </>
    )
  }

  const SClassSchedule = () => {
    const { handleChange, isSubmitting, handleSubmit, setFieldValue, values } = useFormik({
      initialValues: {
        amount: '',
        sClassCode: '',
        beginSequence: '',
        truncateSequence: '',
        day: '',
      },
      onSubmit: async () => {
        console.log(values)
      },
    })
    return (
      <>
        <Drawer anchor="right" onClose={() => setShowAddSClass(false)} open={showAddSClass}>
          <div className="drawer-header">
            <h5 className="fw-bold m-0 text-capitalize">Edit SClass Schedule</h5>
          </div>
          <div className="drawer-body fw-bold mx-4">
            <>
              {' '}
              <CRow className="pt-3 mb-3 gap-2 align-items-center">
                <CCol sm={6} className="d-flex gap-5">
                  <span>Site Code</span>
                  <span>SERVICE1</span>
                </CCol>
                <CCol className="d-flex gap-5 align-items-center">
                  <span>Month</span>
                  <span>
                    {' '}
                    {scheduleDetails.month
                      ? moment(scheduleDetails.month).format('MMMM YYYY')
                      : '---'}
                  </span>
                </CCol>
              </CRow>
              <CRow className="my-3 gap-2 align-items-center ">
                <CCol sm="6" className="d-flex gap-2 align-items-center">
                  <span>SiteAreaCode</span>
                  <span>---</span>
                </CCol>
                <CCol className="d-flex gap-2 align-items-center">
                  <span className="fw-bold">PostPointCode</span>
                  <span>---</span>
                </CCol>
              </CRow>
              <CRow className="my-3  gap-2 align-items-center ">
                <CCol sm="6" className="d-flex gap-2 align-items-center">
                  <span>SClassCode</span>
                  <CFormSelect
                    id="sClassCode"
                    value={values.sClassCode}
                    onChange={(e) => {
                      if (e) {
                        setFieldValue('sClassCode', e.target.value)
                      }
                    }}
                  >
                    <option value={''} defaultValue disabled></option>
                    <option value="Thur">THUR</option>
                  </CFormSelect>
                </CCol>
                <CCol className="d-flex gap-2 align-items-center">
                  <span className="fw-bold">Amount</span>
                  <CFormInput id="amount" value={values.amount} onChange={handleChange} />
                </CCol>
              </CRow>
              <CTable align="middle" className="mt-1 fw-semibold border" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell></CTableHeaderCell>
                    <CTableHeaderCell className="text-center">BeginSClassCode</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">SClassCode</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">IsHalfDay</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">MustSubstitute</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell className="text-center">
                      <CFormCheck type="radio" name="day" value="Day 1" onChange={handleChange} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 1</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell className="text-center">
                      <CFormCheck type="radio" name="day" value="Day 1" onChange={handleChange} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 2</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                  <CTableRow className="border-bottom-1">
                    <CTableDataCell
                      className="text-center"
                      name="day"
                      value="Day 1"
                      onChange={handleChange}
                    >
                      <CFormCheck type="radio" name="rosterA" />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">Day 3</CTableDataCell>
                    <CTableDataCell className="text-center">A</CTableDataCell>
                    <CTableDataCell className="text-center">No</CTableDataCell>
                    <CTableDataCell className="text-center">Yes</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <CRow className="align-items-center mt-3">
                <CCol sm="4"> Begin Sequence </CCol>
                <CCol sm="5">
                  <CFormInput
                    type="date"
                    id="beginSequence"
                    value={values.beginSequence}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="align-items-center mt-3">
                <CCol sm="4">Truncate Sequence</CCol>
                <CCol sm="5">
                  <CFormInput
                    type="date"
                    id="truncateSequence"
                    value={values.truncateSequence}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
            </>
          </div>
          <div className="drawer-footer">
            <button
              className="button-gray-light"
              type="button"
              onClick={() => setShowAddSClass(false)}
            >
              Cancel
            </button>
            <button className="button-primary-light" type="button" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </Drawer>
      </>
    )
  }

  const switchTabs = () => {
    switch (activeKey) {
      //  Roster Schedule
      case 0:
        return (
          <>
            <CRow className="mt-4 mb-1 align-items-center">
              <CCol>
                <span>Roster Schedule</span>
              </CCol>
              <CCol sm={'auto'} className="offset-4">
                <button
                  className="button-primary-light"
                  type="button"
                  onClick={() => setShowAddRoster(true)}
                >
                  Add Roster
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell className="text-center">Roster Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">3/5</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CRow className="mt-5 mb-2 align-items-center">
              <CCol sm={'auto'}>
                <span>Filter by RosterCode</span>
              </CCol>
              <CCol>
                <CFormSelect>
                  <option disabled defaultValue value={''}></option>
                  <option value="All">All</option>
                </CFormSelect>
              </CCol>
              <CCol sm={'auto'} className="offset-2">
                <button
                  className="button-primary-light-fit-content"
                  onClick={() => setShowAddEmployee(true)}
                  type="button"
                >
                  Add Employee
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow className="border-bottom-1">
                  <CTableHeaderCell className="text-center">Employee Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Employee Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Roster Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableDataCell className="text-center"></CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">Sammy001</CTableDataCell>
                  <CTableDataCell className="text-center">Sammy Cheng</CTableDataCell>
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">AD001</CTableDataCell>
                  <CTableDataCell className="text-center">Aayush Dura</CTableDataCell>
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </>
        )
      //  SClass Schedule
      case 1:
        return (
          <>
            <CRow className="mt-4 mb-2 align-items-center">
              <CCol>
                <span>SClass Schedule</span>
              </CCol>
              <CCol sm={'auto'} className="offset-4">
                <button
                  className="button-primary-light"
                  type="button"
                  onClick={() => setShowAddSClass(true)}
                >
                  Add Class
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell className="text-center">SClass Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">3/5</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CRow className="mt-5 mb-2 align-items-center">
              <CCol sm={'auto'}>
                <span>Filter by SCLassCode</span>
              </CCol>
              <CCol>
                <CFormSelect>
                  <option disabled defaultValue value={''}></option>
                  <option value="All">All</option>
                </CFormSelect>
              </CCol>
              <CCol sm={'auto'} className="offset-1">
                <button className="button-primary-light-fit-content">Add Employee</button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell className="text-center">Employee Code </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Employee Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">SClassCode</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequnce</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1 text-center">
                  <CTableDataCell className="text-center">Sammy001</CTableDataCell>
                  <CTableDataCell className="text-center">Sammy Cheng</CTableDataCell>
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">11/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </>
        )

      default:
        return (
          <>
            <CRow className="mt-4 mb-1 align-items-center">
              <CCol>
                <span>Roster Schedule</span>
              </CCol>
              <CCol sm={'auto'} className="offset-4">
                <button
                  className="button-primary-light"
                  type="button"
                  onClick={() => setShowAddRoster(true)}
                >
                  Add Roster
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell className="text-center">Roster Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">3/5</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <CRow className="mt-5 mb-2 align-items-center">
              <CCol sm={'auto'}>
                <span>Filter by RosterCode</span>
              </CCol>
              <CCol>
                <CFormSelect>
                  <option disabled defaultValue value={''}></option>
                  <option value="All">All</option>
                </CFormSelect>
              </CCol>
              <CCol sm={'auto'} className="offset-2">
                <button
                  className="button-primary-light-fit-content"
                  // onClick={() => s(true)}
                  type="button"
                >
                  Add Employee
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-1 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow className="border-bottom-1">
                  <CTableHeaderCell className="text-center">Employee Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Employee Name</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Roster Code</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Truncate Sequence</CTableHeaderCell>
                  <CTableDataCell className="text-center"></CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">Sammy001</CTableDataCell>
                  <CTableDataCell className="text-center">Sammy Cheng</CTableDataCell>
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell className="text-center">AD001</CTableDataCell>
                  <CTableDataCell className="text-center">Aayush Dura</CTableDataCell>
                  <CTableDataCell className="text-center">A</CTableDataCell>
                  <CTableDataCell className="text-center">01/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">10/12/2022</CTableDataCell>
                  <CTableDataCell className="text-center">E D</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </>
        )
    }
  }

  const AddEmployeesOnSite = () => {
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedQuery] = useDebounce(searchQuery, 1000)
    const [employeeList, setEmployeeList] = useState([])
    const [loading, setLoading] = useState(false)
    const handleEmployeeSearch = (e) => {
      setSearchQuery(e.target.value)
    }
    useEffect(async () => {
      setLoading(true)
      let params = { Name: debouncedQuery ? debouncedQuery : null }
      try {
        let res = await request.getEmployeeList({ params })
        setEmployeeList(res.data?.employees)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }, [debouncedQuery])
    return (
      <>
        <Drawer anchor="right" open={showAddEmployee} onClose={() => setShowAddEmployee(false)}>
          <div className="drawer-header">
            <h5 className="fw-bold m-0 text-capitalize">Edit Employee Schedule</h5>
          </div>
          <div className="drawer-body mx-2 fw-bold">
            <CRow className="py-4 gap-3 align-items-center">
              <CCol className="d-flex gap-2">
                <span>SiteCode :</span>
                <span>---</span>
              </CCol>
              <CCol className="d-flex gap-2">
                <span>Month :</span>
                <span>---</span>
              </CCol>
            </CRow>
            <CRow></CRow>
            <CRow className="py-4 gap-4 ">
              <CCol className="d-flex gap-2 align-items-center">
                <span>SiteAreaCode</span>
                <span>---</span>
              </CCol>
              <CCol className="d-flex gap-2 align-items-center">
                <span>PostPointCode</span>
                <span>---</span>
              </CCol>
            </CRow>
            <CRow className="py-4 gap-4 ">
              <CCol className="d-flex gap-2 align-items-center">
                <span>RosterCode</span>
                <span>---</span>
              </CCol>
              <CCol className="d-flex gap-2 align-items-center">
                <span>Amount</span>
                <span>---</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="px-3">
                <CFormInput
                  placeholder="EmployeeCode/Name"
                  onChange={(e) => handleEmployeeSearch(e)}
                />
              </CCol>
            </CRow>
            <CTable align="middle" className="my-4 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>
                    <CFormCheck onChange={() => setSelectAll((selectAll) => !selectAll)} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Employee Code</CTableHeaderCell>
                  <CTableHeaderCell>Employee Name</CTableHeaderCell>
                  <CTableHeaderCell>Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell>Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {!loading ? (
                  employeeList?.length > 0 &&
                  employeeList.map((emp) => (
                    <CTableRow key={emp.employeeGuid}>
                      <CTableDataCell>
                        <CFormCheck
                          value={emp.employeeGuid}
                          checked={selectAll || selectedEmployees.includes(emp.employeeGuid)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEmployees([...selectedEmployees, e.target.value])
                            } else {
                              let tempSelected = selectedEmployees.filter(
                                (id) => id !== e.target.value,
                              )
                              setSelectedEmployees(tempSelected)
                            }
                          }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{emp.employeeCode}</CTableDataCell>
                      <CTableDataCell>{emp.name}</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type="date" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type="date" />
                      </CTableDataCell>
                      <CTableDataCell></CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <>
                    <CTableRow>
                      <CTableDataCell />
                      <CTableDataCell />
                      <CTableDataCell />
                      <CTableDataCell>
                        <TailSpin
                          height="80"
                          width="80"
                          color="#6100ff"
                          ariaLabel="tail-spin-loading"
                          wrapperClass=""
                          visible={true}
                        />
                      </CTableDataCell>
                      <CTableDataCell />
                    </CTableRow>
                  </>
                )}
              </CTableBody>
            </CTable>
          </div>
          <div className="drawer-footer">
            <button
              className="button-gray-light"
              type="button"
              onClick={() => setShowAddEmployee(false)}
            >
              Cancel
            </button>
            <button
              className="button-primary-light"
              type="button"
              onClick={() => setShowAddEmployee(false)}
            >
              Save
            </button>
          </div>
        </Drawer>
      </>
    )
  }
  return (
    <>
      <Drawer anchor="right" onClose={() => setOpenDrawer(false)} open={OpenDrawer}>
        <div className="drawer-header">
          <h5 className="fw-bold m-0 text-capitalize">Edit Schedule</h5>
        </div>
        <div className="drawer-body fw-bold mx-4">
          <>
            {' '}
            <CRow className="pt-3 mb-3 justify-content-between align-items-center">
              <CCol sm={5} className="d-flex gap-5">
                <span>Site Code</span>
                <span>SERVICE1</span>
              </CCol>
              <CCol sm={5} className="d-flex gap-3 align-items-center">
                <span className="fw-bold">Month</span>
                <CFormInput type="month" name="month" onChange={handleDetailsChange} />
              </CCol>
            </CRow>
            <CRow className="mb-2  gap-2 align-items-center ">
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>SiteAreaCode</span>
                <CFormSelect name="siteAreaCode" onChange={handleDetailsChange}>
                  <option value={'All'}>{'All'}</option>
                  <option value={'Service1'}>{'Service1'}</option>
                  <option value={'Service2'}>{'Service2'}</option>
                  <option value={'Service3'}>{'Service3'}</option>
                  <option value={'Service4'}>{'Service4'}</option>
                </CFormSelect>
              </CCol>
              <CCol className="d-flex gap-2 align-items-center">
                <span className="fw-bold">PostPointCode</span>
                <CFormSelect name="postPointCode" onChange={handleDetailsChange}>
                  <option value={'All'}>{'All'}</option>
                  <option value={'Service1'}>{'Service1'}</option>
                  <option value={'Service2'}>{'Service2'}</option>
                  <option value={'Service3'}>{'Service3'}</option>
                  <option value={'Service4'}>{'Service4'}</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <div className="row mt-3 ps-2 gap-1">
              {tabTitle.map((tab, index) => (
                <Tab
                  title={tab}
                  key={index}
                  style={activeKey === index ? { borderBottom: '3px solid' } : {}}
                  handleClick={() => setActiveKey(index)}
                />
              ))}
            </div>
            {switchTabs()}
          </>
        </div>
        <div className="drawer-footer">
          <button className="button-gray-light" type="button" onClick={() => setOpenDrawer(false)}>
            Close
          </button>
        </div>
      </Drawer>
      <>
        <RosterSchedule />
      </>
      <>
        <SClassSchedule />
      </>
      <>
        <AddEmployeesOnSite />
      </>
    </>
  )
}

export default EditSiteScheduleDrawer

EditSiteScheduleDrawer.propTypes = {
  OpenDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
}
