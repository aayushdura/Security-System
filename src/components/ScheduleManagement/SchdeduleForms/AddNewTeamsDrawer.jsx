import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@mui/material'
import { useFormik } from 'formik'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { TailSpin } from 'react-loader-spinner'
import { teamsSchema } from '../Schemas/teamsSchema'
import { useDispatch } from 'react-redux'
import { searchTeams } from 'src/features/schedule/apiCalls'
import { useDebounce } from 'use-debounce'
import { RiAddBoxFill, RiCheckFill, RiDeleteBin4Fill } from 'react-icons/ri'
const AddNewTeamsDrawer = ({ showDrawer, setShowDrawer, type, content }) => {
  const dispatch = useDispatch()
  const [empCodeSearchKey, setEmpCodeSearchKey] = useState('')
  const [empNameSearchKey, setEmpNameSearchKey] = useState('')
  const [addedMembers, setAddedMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [employeeList, setEmployeeList] = useState([])
  const [currentTeamEmp, setCurrentTeamEmp] = useState([])
  const [debouncedName] = useDebounce(empNameSearchKey, 800)
  const [debouncedCode] = useDebounce(empCodeSearchKey, 800)
  async function searchEmp() {
    setLoading(true)
    let params = {
      Name: debouncedName ? debouncedName : null,
      EmployeeCode: debouncedCode ? debouncedCode : null,
    }
    try {
      let res = await request.getEmployeeList({ params })
      let tempArr = res.data?.employees?.map((emp) => {
        let employeeName = emp.name
        let lastWorkingDate = emp.lastWorkingdate
        return {
          ...emp,
          employeeName,
          lastWorkingDate,
        }
      })
      setEmployeeList(tempArr?.slice(0, 4))
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  async function getTeamDetails() {
    try {
      let res = await request.getTeam(content?.teamCode)
      setCurrentTeamEmp(res.data.teamMembers?.teamMembersForView)
    } catch (err) {
      console.log(err)
    }
  }
  const { handleChange, handleSubmit, isSubmitting, setFieldValue, values, isValid, errors } =
    useFormik({
      initialValues: {
        teamCode: type === 'edit' ? content.teamCode : '',
        teamName: type === 'edit' ? content.teamName : '',
        status: type === 'edit' ? content.status : '',
      },
      validationSchema: teamsSchema,
      enableReinitialize: true,
      onSubmit: async () => {
        let guidArr = addedMembers.map((member) => member.employeeGuid)
        if (isValid) {
          let req = {
            ...values,
            teamMemberRequest: {
              guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              teamCode: values.teamCode,
              employeeGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
              teamMembers: guidArr,
            },
          }
          if (type === 'add') {
            try {
              let res = await request.createTeams(req)
              res.data && toast.success('Team Added Successfully')
              setShowDrawer(false)
              setAddedMembers([])
              dispatch(searchTeams())
            } catch (err) {
              toast.error('Failed To Add Team')
              console.log(err)
            }
          }
          if (type === 'edit') {
            try {
              let res = await request.updateTeams(content?.teamCode, req)
              res.data && toast.success('Team Updated Successfully')
              setShowDrawer(false)
              dispatch(searchTeams())
            } catch (err) {
              toast.error('Failed To Update Team')
              console.log(err)
            }
          }
        }
      },
    })
  const handleSearch = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        setEmpNameSearchKey(value)
        break
      case 'code':
        setEmpCodeSearchKey(value)
        break
    }
  }
  const handleReset = (e) => {
    e.preventDefault()
    setEmpCodeSearchKey('')
    setEmpNameSearchKey('')
  }
  const handleAddMembers = (employee) => {
    setAddedMembers([...addedMembers, employee])
  }
  const handleRemoveMembers = async (employee) => {
    let isTeamMember = currentTeamEmp.some((emp) => emp.teamMemberGuid === employee.teamMemberGuid)
    if (isTeamMember) {
      try {
        let res = await request.delteTeamMember(employee?.teamMemberGuid)
        res.data && getTeamDetails()
        toast.success('Succesfully Deleted Team Member')
      } catch (err) {
        console.log(err)
        toast.error('Cannot Delete Team Member')
      }
    } else {
      let tempTeamMembers = addedMembers.filter(
        (member) => member.employeeGuid !== employee.employeeGuid,
      )
      setAddedMembers(tempTeamMembers)
    }
  }
  useMemo(async () => {
    if (showDrawer && type === 'edit') {
      getTeamDetails()
    }
    if (type === 'add') {
      setAddedMembers([])
    }
  }, [showDrawer, type])
  useMemo(() => {
    setAddedMembers([...currentTeamEmp])
  }, [currentTeamEmp])
  useEffect(() => {
    searchEmp()
  }, [debouncedCode, debouncedName])
  return (
    <Drawer anchor="right" onClose={() => setShowDrawer(false)} open={showDrawer}>
      <div className="drawer-header">
        <h5 className="fw-bold m-0 text-capitalize"> {type} Team</h5>
      </div>
      <div className="drawer-body fw-bold my-4 mx-4">
        <CRow className=" align-items-center mb-3">
          <CCol sm="auto" className="">
            <CFormLabel>Team Code</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              className={errors.teamCode && 'border-danger'}
              type="text"
              disabled={type === 'edit'}
              name="teamCode"
              onChange={handleChange}
              value={values.teamCode}
            />
            <div className="validator-message text-danger">
              {errors.teamCode && errors.teamCode}
            </div>
          </CCol>
        </CRow>
        <CRow className=" align-items-center mb-3">
          <CCol sm="auto" className="">
            <CFormLabel>Team Name</CFormLabel>
          </CCol>
          <CCol>
            <CFormInput
              className={errors.teamName && 'border-danger'}
              type="text"
              name="teamName"
              onChange={handleChange}
              value={values.teamName}
            />
            <div className="validator-message text-danger">
              {errors.teamName && errors.teamName}
            </div>
          </CCol>
        </CRow>
        <CRow className=" align-items-center mb-5">
          <CCol sm="auto" className="">
            <CFormLabel>Team Status</CFormLabel>
          </CCol>
          <CCol>
            <CFormSelect
              name="status"
              value={values.status}
              onChange={(e) => {
                if (e) {
                  setFieldValue('status', e.target.value)
                }
              }}
            >
              <option value={''} defaultValue={true} disabled></option>
              <option value="0">Active</option>
              <option value="1">InActive</option>
            </CFormSelect>
          </CCol>
        </CRow>
        {/* Search Employee and list employee */}
        <div className="border-top pt-4">
          <h5 className="mb-3">Add Team Member</h5>
          <CRow className="align-items-center">
            <CCol sm="4">
              <CFormInput
                placeholder="Employee Code"
                name="code"
                value={empCodeSearchKey}
                onChange={handleSearch}
              />
            </CCol>
            <CCol sm="6">
              <CFormInput
                placeholder="Employee Name"
                name="name"
                value={empNameSearchKey}
                onChange={handleSearch}
              />
            </CCol>
            <CCol sm="2">
              <button className="button-red-small" type="button" onClick={handleReset}>
                Reset
              </button>
            </CCol>
          </CRow>
          <CRow>
            <CTable align="middle" className="my-4 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Employee Code</CTableHeaderCell>
                  <CTableHeaderCell>Employee Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Working Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {!loading ? (
                  employeeList?.length > 0 &&
                  employeeList.map((emp) => (
                    <CTableRow key={emp?.employeeGuid}>
                      <CTableDataCell>{emp?.employeeCode}</CTableDataCell>
                      <CTableDataCell>{emp?.name}</CTableDataCell>
                      <CTableDataCell>{emp?.lastWorkingDate}</CTableDataCell>
                      <CTableDataCell>{emp?.status}</CTableDataCell>
                      <CTableDataCell style={{ cursor: 'pointer' }}>
                        {addedMembers.some((member) => member.employeeGuid === emp.employeeGuid) ? (
                          <RiCheckFill className="text-green" size="20" />
                        ) : (
                          <RiAddBoxFill
                            className="text-primary"
                            size="20"
                            onClick={() => handleAddMembers(emp)}
                          />
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <>
                    <CTableRow>
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
                      <CTableDataCell />
                    </CTableRow>
                  </>
                )}
              </CTableBody>
            </CTable>
          </CRow>
        </div>
        <div className="mt-4">
          <h5 className="mb-1">Team Members List</h5>
          <CRow>
            <CTable align="middle" className="my-4 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Employee Code</CTableHeaderCell>
                  <CTableHeaderCell>Employee Name</CTableHeaderCell>
                  <CTableHeaderCell>Last Working Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {addedMembers.length > 0 &&
                  addedMembers?.map((emp) => (
                    <CTableRow key={emp?.employeeGuid}>
                      <CTableDataCell>{emp?.employeeCode}</CTableDataCell>
                      <CTableDataCell>{emp?.employeeName}</CTableDataCell>
                      <CTableDataCell>{emp?.lastWorkingDate}</CTableDataCell>
                      <CTableDataCell>{emp?.status}</CTableDataCell>
                      <CTableDataCell style={{ cursor: 'pointer' }}>
                        <RiDeleteBin4Fill
                          className="text-red"
                          size="20"
                          onClick={() => handleRemoveMembers(emp)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CRow>
        </div>
      </div>
      <div className="drawer-footer">
        <button className="button-gray" type="button" onClick={() => setShowDrawer(false)}>
          Close
        </button>
        <button
          className={
            isSubmitting
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary-light`
          }
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {type === 'edit' && 'Update'}
          {type === 'add' && 'Add'}
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
      </div>
    </Drawer>
  )
}

export default AddNewTeamsDrawer

AddNewTeamsDrawer.propTypes = {
  showDrawer: PropTypes.bool,
  setShowDrawer: PropTypes.func,
  type: PropTypes.string.isRequired,
  content: PropTypes.object,
}
