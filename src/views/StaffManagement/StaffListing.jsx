import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
// import MaterialTable from 'material-table'

import { BiChevronRight } from 'react-icons/bi'

import { RiErrorWarningFill } from 'react-icons/ri'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useNavigate } from 'react-router-dom'
import AddGuardForm from 'src/components/Employees/GuardForms/AddGuardForms'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { getStaffList } from 'src/features/Employee/apiCalls'
import { getCountries, getSystemDefGender } from 'src/features/SystemGeneralDef/apiCalls'
import { request } from 'src/utils/requests'
import { useLayoutEffect } from 'react'
import CountUp from 'react-countup'
import Paginator from 'src/components/Pagination/Paginator'
import TableFooter from 'src/components/Pagination/TableFooter'

const StaffListing = () => {
  const dispatch = useDispatch()
  const [showAddForm, setShowAddForm] = useState(false)
  const { allStaffs, isFetching, currentEmployee } = useSelector((state) => state.employee)
  const navigate = useNavigate()
  const [employeeDepartment, setEmployeeDepartment] = useState()
  const [staffSearch, setStaffSearch] = useState({
    Name: '',
    Department: '',
    Position: '',
    EmployeeCode: '',
    LastWorkingdate: '',
    Status: '',
    DateofEntry: '',
  })
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  async function getDepartment() {
    try {
      let res = await request.fetchEmployeeDepartment()
      let departmentRes = res.data?.department
      let depOptions =
        Array.isArray(departmentRes) &&
        departmentRes.map((dep) => {
          return { value: dep.deparmentName, label: dep.deparmentName }
        })
      setEmployeeDepartment(depOptions)
    } catch (err) {
      console.log(err)
    }
  }
  useLayoutEffect(() => {
    dispatch(getCountries())
    getDepartment()
  }, [dispatch])

  const staffSearchInputs = [
    {
      id: 'Name',
      label: 'Name',
      inputType: 'text',
    },
    {
      id: 'Department',
      label: 'Department',
      inputType: 'select',
      options: employeeDepartment,
    },
    {
      id: 'Position',
      label: 'Position',
      inputType: 'select',
      options: [
        {
          value: 'Senior',
          label: 'Senior',
        },
        {
          value: 'Junior',
          label: 'Junior',
        },
      ],
    },
    {
      id: 'EmployeeCode',
      label: 'Employee ID',
      inputType: 'text',
    },
    {
      id: 'LastWorkingDate',
      label: 'Last Working Date',
      inputType: 'date',
    },
    {
      id: 'Status',
      label: 'Status',
      inputType: 'select',
      options: [
        {
          label: 'Active',
          value: 'Active',
        },
        {
          label: 'Inactive',
          value: 'InActive',
        },
        {
          label: 'Terminated',
          value: 'Terminate',
        },
      ],
    },
    {
      id: 'DateofEntry',
      label: 'Date of Entry',
      inputType: 'date',
    },
  ]

  let dataForGrid =
    Array.isArray(allStaffs) &&
    allStaffs.map((staff, index) => {
      let id = staff.employeeCode ?? index
      let dateofEntry = moment(staff.dateofEntry).format('ll')
      return { ...staff, id, dateofEntry: dateofEntry }
    })

  const tableColumns = [
    {
      field: 'id',
      headerName: 'Employee ID',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <>
            <Avatar sx={{ width: 30, height: 30, bgcolor: '#6100ff', mr: 1.5 }} />
            {params.row.name}
          </>
        )
      },
    },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'dateofEntry',
      headerName: 'Date of Entry',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastWorkingDate',
      headerName: 'Last Working Date',
      minWidth: 180,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      align: 'right',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <button className="button-primary icon-button rounded-circle ">
              <BiChevronRight
                size={25}
                className="m-0"
                onClick={(e) => navigate(`/employee-profile/${params.row.employeeGuid}`)}
              />
            </button>
          }
          label="Delete"
          key={1}
          className="me-2"
        />,
      ],
    },
  ]

  const handleStaffSearch = (e) => {
    const { name, value } = e.target
    setStaffSearch({ ...staffSearch, [name]: value })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setStaffSearch({
      Name: '',
      EmployeeCode: '',
      EmployeetType: '',
      LastWorkingDate: '',
      Status: '',
      DateofEntry: '',
    })
    dispatch(getStaffList())
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    let params = { ...staffSearch }
    dispatch(getStaffList(params))
  }
  const handleNextPage = (pageNum) => {
    setPage(pageNum)
    let params = { PageNumber: pageNum }
    dispatch(getStaffList(params))
  }
  const handlePerPage = (perPage) => {
    setPerPage(perPage)
    let params = { PageSize: perPage }
    dispatch(getStaffList(params))
  }
  useEffect(() => {
    dispatch(getSystemDefGender('gender'))
  }, [dispatch])
  useEffect(() => {
    dispatch(getStaffList())
  }, [dispatch, currentEmployee])
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h4>Staff</h4>
          <h6>
            <CountUp
              start={0}
              duration={0.9}
              end={dataForGrid.length}
              className="badge bg-primary-light p-2"
            />
          </h6>
        </div>

        <div>
          <button
            className="button-primary"
            onClick={() => {
              setShowAddForm(true)
            }}
          >
            Add New
          </button>
          <button className="button-outline-primary ms-2">Remove</button>
        </div>
      </div>
      <>
        <AddGuardForm formType="Add" showForm={showAddForm} setShowForm={setShowAddForm} />
      </>

      <CCard className="mb-4">
        <CCardBody className="p-4">
          <h5 className="mb-4">Filter Search</h5>
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {staffSearchInputs.map((input, index) => {
              return (
                <CCol md="12" lg="6" xl="4" key={index}>
                  <CRow>
                    <CCol sm={5}>
                      <CFormLabel className="col-form-label">
                        <strong>{input.label}</strong>
                      </CFormLabel>
                    </CCol>
                    <CCol>
                      {input.inputType === 'text' ? (
                        <CFormInput
                          type="text"
                          name={input.id}
                          value={staffSearch[input.id]}
                          onChange={handleStaffSearch}
                        />
                      ) : input.inputType === 'select' ? (
                        <CFormSelect
                          onChange={handleStaffSearch}
                          className="text-capitalize"
                          name={input.id}
                          value={staffSearch[input.id]}
                        >
                          <option disabled defaultValue value={''}></option>
                          {input.options?.map((option, index) => {
                            return (
                              <option value={option.value} key={index}>
                                {option.label}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      ) : input.inputType === 'date' ? (
                        <CFormInput
                          type="date"
                          name={input.id}
                          value={staffSearch[input.id]}
                          onChange={handleStaffSearch}
                        />
                      ) : null}

                      {/* */}
                    </CCol>
                  </CRow>
                </CCol>
              )
            })}
            <div className="d-flex flex-row justify-content-center gap-2">
              <button className="button-primary">Search</button>
              <button
                className="button-red"
                type="button"
                onClick={handleReset}
                disabled={isFetching}
              >
                Reset
              </button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-3">
          <div style={{ height: 500, width: '100%' }} className="fw-semibold">
            <DataGrid
              rows={dataForGrid}
              loading={isFetching}
              columns={tableColumns}
              pageSize={perPage}
              page={page}
              checkboxSelection
              columnBuffer={8}
              disableColumnMenu
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
              hideFooterPagination
              onSelectionModelChange={(id) => {
                setSelectedRows(id)
              }}
              hideFooter
              // components={{
              //   Pagination: Paginator({ totalData: dataForGrid.length }),
              // }}
              sx={{
                '.MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '.MuiDataGrid-columnHeaderTitle': {
                  fontWeight: '600',
                },
              }}
            />
          </div>
          <TableFooter
            handleNextPage={handleNextPage}
            handlePerPage={handlePerPage}
            selectedData={selectedRows?.length}
            totalNoOfData={dataForGrid?.length}
          />
          {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <CFormSelect
                onChange={(e) => {
                  setPage(e.target.value)
                  console.log(page)
                }}
                value={page}
              >
                <option value={0}>Page 1/200</option>
                <option value={1}>Page 2/200</option>
                <option value={2}>Page 3 /200</option>
              </CFormSelect>
            </div>
            <p className="text-gray">
              Showing {(page + 1) * 10 - 10} to {(page + 1) * 10} of 2000 entries
            </p>
          </div> */}
        </CCardBody>
      </CCard>
    </div>
  )
}

// function CustomPagination() {
//   const apiRef = useGridApiContext()
//   const page = useGridSelector(apiRef, gridPageSelector)
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector)

//   return (
//     <Pagination
//       color="primary"
//       variant="outlined"
//       shape="rounded"
//       page={page + 1}
//       count={pageCount}
//       showFirstButton
//       showLastButton
//       // @ts-expect-error
//       renderItem={(props2) => (
//         <PaginationItem
//           {...props2}
//           disableRipple
//           components={{
//             next: (props) => (
//               <small
//                 {...props}
//                 style={{
//                   fontSize: '12px',
//                   padding: '5px',
//                 }}
//               >
//                 Next
//               </small>
//             ),
//             previous: (props) => (
//               <small
//                 style={{
//                   fontSize: '12px',
//                   padding: '5px',
//                 }}
//                 {...props}
//               >
//                 Previous
//               </small>
//             ),
//           }}
//         />
//       )}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   )
// }

const Modal = ({ visible, setVisible, type, project }) => {
  return (
    <CModal size="sm" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalBody className="py-4">
        <div className="d-flex flex-column justify-content-center align-items-center fw-bold ">
          <RiErrorWarningFill size={90} className="text-gray mb-2" />
          <h5 className="fw-bold text-capitalize">{type}?</h5>
          <p className=" text-capitalize">Are You Sure to {type} ?</p>
          <div className="d-flex justify-content-center gap-2  ">
            <button className="button-gray ">No, cancel.</button>
            <button className="button-red ">Yes, {type}.</button>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}
Modal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  type: PropTypes.string,
  project: PropTypes.object,
}

export default StaffListing
