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
import AddGuardForm from 'src/components/Employees/GuardForms/AddGuardForms'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getEmployeeList } from 'src/features/Employee/apiCalls'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { AiFillCheckCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-hot-toast'
import CountUp from 'react-countup'
import Paginator from 'src/components/Pagination/Paginator'
import TableFooter from 'src/components/Pagination/TableFooter'

const GuardsIndex = () => {
  const { employees, isFetching } = useSelector((state) => state.employee)
  const dispatch = useDispatch()
  const [staffSearch, setStaffSearch] = useState({
    Name: '',
    EmployeeCode: '',
    EmployeetType: '',
    LastWorkingDate: '',
    Status: '',
    DateOfEntry: '',
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const navigate = useNavigate()

  let dataForGrid =
    Array.isArray(employees) &&
    employees.map((employee, index) => {
      let id = employee.employeeCode ?? index
      let dateofEntry = moment(employee.dateofEntry).format('ll')
      return { ...employee, id, dateofEntry: dateofEntry }
    })

  let activeUsers = dataForGrid.filter((employees) => employees.status === 'Active')
  let inactiveUsers = dataForGrid.filter((employees) => employees.status === 'InActive')
  let terminatedUsers = dataForGrid.filter((employees) => employees.status === 'Terminate')
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
  const staffSearchInputs = [
    {
      id: 'Name',
      label: 'Name',
      inputType: 'text',
    },
    {
      id: 'DateOfEntry',
      label: 'Date of Entry',
      inputType: 'date',
    },
    {
      id: 'EmployeetType',
      label: 'Type',
      inputType: 'select',
      options: [
        {
          value: '1',
          label: 'Full Time',
        },
        {
          value: '2',
          label: 'Part Time',
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
      label: 'Background Search',
      inputType: 'select',
      options: [
        {
          value: 'Active',
          label: 'Active',
        },
        {
          value: 'InActive',
          label: 'InActive',
        },
        {
          value: 'Terminate',
          label: 'Terminate',
        },
      ],
    },
  ]

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
      field: 'dateofEntry',
      headerName: 'Date of Entry',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },

    {
      field: 'lastWorkingdate',
      headerName: 'Last Working Date',
      minWidth: 160,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'employeeType',
      headerName: 'Type',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Back Ground Search',
      headerName: 'Background Search',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.backgroundSearch === 'Terminate') {
          return <MdCancel size={30} style={{ color: '#a82a2a' }} />
        } else if (params.row.backgroundSearch === 'Active') {
          return <AiFillCheckCircle size={30} style={{ color: '#499e49' }} />
        } else if (params.row.backgroundSearch === 'InActive') {
          return <AiOutlineClockCircle size={30} style={{ color: 'orange' }} />
        }
      },
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
          onClick={() => navigate(`/employee-profile/${params.row.employeeGuid}`)}
          icon={
            <BiChevronRight className="button-primary icon-button rounded-circle m-0" size={25} />
          }
          label="profile"
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
      DateOfEntry: '',
    })
    dispatch(getEmployeeList())
  }
  const handleRemove = () => {
    if (selectedRows?.length >= 1 && employees?.length >= 1) {
      let selectedGuids = []
      selectedRows.forEach((empId) => {
        selectedGuids = [
          ...selectedGuids,
          employees.find((employee) => empId === employee.employeeCode).employeeGuid,
        ]
      })
      console.log(` Remove selected GUIDS`, selectedGuids)
    } else {
      toast.error('Select Any Employee To Remove')
    }
  }
  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    let params = { ...staffSearch }
    dispatch(getEmployeeList(params))
  }
  useEffect(() => {
    dispatch(getEmployeeList())
  }, [dispatch])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h4>Staff Profile</h4>
          <p className="m-0">
            <CountUp
              start={0}
              duration={0.9}
              end={dataForGrid.length}
              className="badge bg-primary-light p-2"
            />
          </p>
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
          <button className="button-outline-primary ms-2" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
      <>
        <AddGuardForm formType="Add" showForm={showAddForm} setShowForm={setShowAddForm} />
      </>
      <CCard className="">
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
              <button className="button-primary" disabled={isFetching}>
                Search
              </button>
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
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="d-flex justify-content-center gap-3">
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">All</h6>
            <p className="m-0">
              <CountUp
                start={0}
                duration={0.9}
                end={dataForGrid.length}
                className="badge bg-primary-light p-2"
              />
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Active & Inactive</h6>
            <p className="m-0">
              <CountUp
                start={0}
                duration={0.9}
                end={activeUsers.length + inactiveUsers.length}
                className="badge bg-primary-light p-2"
              />
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Active</h6>
            <p className="m-0">
              <CountUp
                start={0}
                duration={0.9}
                end={activeUsers.length}
                className="badge bg-primary-light p-2"
              />
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Inactive</h6>
            <p className="m-0">
              <CountUp
                start={0}
                duration={0.9}
                end={inactiveUsers.length}
                className="badge bg-primary-light p-2"
              />
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Terminate</h6>
            <p className="m-0">
              <CountUp
                start={0}
                duration={0.9}
                end={terminatedUsers.length}
                className="badge bg-primary-light p-2"
              />
            </p>
          </div>
        </div>
      </div>
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
              hideFooterPagination
              hideFooter
              onSelectionModelChange={(employeeGuid) => {
                setSelectedRows(employeeGuid)
              }}
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
        </CCardBody>
      </CCard>
    </div>
  )
}

export default GuardsIndex

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
