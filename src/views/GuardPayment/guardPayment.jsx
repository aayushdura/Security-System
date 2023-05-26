import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
// import MaterialTable from 'material-table'

import { BiChevronRight } from 'react-icons/bi'

import { RiErrorWarningFill } from 'react-icons/ri'
import PropTypes from 'prop-types'
import { Avatar, Drawer } from '@mui/material'
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
import RosterRuleDrawer from 'src/components/ScheduleManagement/RosterRuleDrawer'
import { faker } from '@faker-js/faker'

const GuardPayment = () => {
  const [staffSearch, setStaffSearch] = useState({
    name: '',
    department: '',
    position: '',
    employeeId: '',
    lastWorkingDate: '',
    status: '',
    dateOfEntry: '',
  })
  const [page, setPage] = useState(0)

  const staffSearchInputs = [
    {
      id: 'name',
      label: 'Name',
      inputType: 'text',
    },
    {
      id: 'department',
      label: 'Department',
      inputType: 'select',
      options: [
        {
          value: 'IT',
          label: 'IT',
        },
        {
          value: 'HR',
          label: 'HR',
        },
      ],
    },
    {
      id: 'type',
      label: 'Type',
      inputType: 'select',
      options: [
        {
          value: 'Senior',
          label: 'Option 1',
        },
        {
          value: 'Junior',
          label: 'Option 2',
        },
      ],
    },
    {
      id: 'dateOfEntry',
      label: 'Date of Entry',
      inputType: 'date',
    },

    {
      id: 'lastWorkingDate',
      label: 'Last Working Date',
      inputType: 'date',
    },
    {
      id: 'status',
      label: 'Status',
      inputType: 'select',
      options: [
        {
          label: 'Active',
          value: true,
        },
        {
          label: 'Inactive',
          value: false,
        },
      ],
    },
    {
      id: 'employeeId',
      label: 'Employee ID',
      inputType: 'text',
    },
  ]

  const data = []
  for (let i = 3; i < 15; i++) {
    data.push({
      id: i * 12345,
      name: 'Chan Ho Nam',
      position: 'Guard',
      dateOfPayment: 'Day 7 per month',
      lastWorkingDate: '2022-10-10',
      type: 'Full Time',
      status: 'Active',
    })
  }

  const handleSingleDelete = (e, params) => {
    e.stopPropagation()
    setUpdateType('delete')
    setVisible(true)
    setCurrentProject(params.row)
  }
  const handleStatusChange = (e, params) => {
    e.stopPropagation()
    setUpdateType('enable')
    setVisible(true)
    setCurrentProject(params.row)
  }
  const handleEdit = (e, params) => {
    e.stopPropagation()
    setUpdateType('edit')
    setShowDrawer(true)
    setCurrentProject(params.row)
  }
  const handleView = (e, params) => {
    e.stopPropagation()
    setCurrentProject(params.row)
    setShowDetailsDrawer(true)
  }
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
      field: 'position',
      headerName: 'Position',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'dateOfPayment',
      minWidth: 160,
      headerName: 'Date of Payment',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },

    {
      field: 'lastWorkingDate',
      headerName: 'Last Working Date',
      minWidth: 160,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: 'Type',
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
              <BiChevronRight size={25} className="m-0" />
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
  const [visible, setVisible] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const [currentProject, setCurrentProject] = useState({})

  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)

  const handleFilterSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h4>Guard Payment</h4>
          <p className="m-0">
            <span className="badge bg-primary-light p-2">2000</span>
          </p>
        </div>

        <div>
          <button
            className="button-primary"
            onClick={() => {
              setUpdateType('add')
              setShowDrawer(true)
            }}
          >
            Add New
          </button>
          <button className="button-outline-primary ms-2">Remove</button>
        </div>
      </div>
      <>
        <Modal
          visible={visible}
          setVisible={setVisible}
          type={updateType}
          project={currentProject}
        />
      </>
      <div>
        {/* <RosterRuleDrawer
          drawerType={updateType}
          setShowDrawer={setShowDrawer}
          showDrawer={showDrawer}
        /> */}
      </div>
      <div>
        <Drawer
          anchor={'right'}
          open={showDetailsDrawer}
          onClose={() => setShowDetailsDrawer(false)}
        >
          <div className="drawer">
            <div className="drawer-header ">
              <h5 className="fw-bold m-0 text-capitalize">View Details</h5>
            </div>
            <div className="drawer-body">
              <CContainer className="py-3">
                <CRow className="gx-5 gy-3">
                  {staffSearchInputs.map((input, index) => {
                    return (
                      <CCol xs="12" sm="6" key={index}>
                        <CRow>
                          <CCol xs="6">
                            <p>
                              <strong>{input.label}</strong>
                            </p>
                          </CCol>
                          <CCol>
                            <p> {currentProject[input.id]}</p>
                          </CCol>
                        </CRow>
                      </CCol>
                    )
                  })}
                </CRow>
              </CContainer>
            </div>
            <div className="drawer-footer">
              <button
                className="button-gray"
                onClick={() => {
                  setShowDetailsDrawer(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Drawer>
      </div>

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
              <button className="button-primary">Search</button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="d-flex justify-content-center gap-3">
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">All</h6>
            <p className="m-0">
              <span className="badge bg-primary-light p-2">2000</span>
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Active & Inactive</h6>
            <p className="m-0">
              <span className="badge bg-primary-light p-2">1500</span>
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Active</h6>
            <p className="m-0">
              <span className="badge bg-primary-light p-2">1000</span>
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Inactive</h6>
            <p className="m-0">
              <span className="badge bg-primary-light p-2">500</span>
            </p>
          </div>
          <div className="vr bg-dark opacity-100"></div>
          <div className="d-flex align-items-center gap-2 ">
            <h6 className="m-0">Terminate</h6>
            <p className="m-0">
              <span className="badge bg-primary-light p-2">200</span>
            </p>
          </div>
        </div>
      </div>
      <CCard>
        <CCardBody className="p-4">
          <div style={{ height: 500, width: '100%' }} className="fw-semibold">
            <DataGrid
              rows={data}
              columns={tableColumns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
              columnBuffer={8}
              disableColumnMenu
              hideFooterPagination
              page={page}
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
              // getRowClassName={(params) => `fw-semibold`}
              // onSelectionModelChange={(id) => {
              //   console.log(id)
              // }}

              // components={{
              //   Pagination: CustomPagination,
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

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      showFirstButton
      showLastButton
      // @ts-expect-error
      renderItem={(props2) => (
        <PaginationItem
          {...props2}
          disableRipple
          // components={{
          //   next: (props) => (
          //     <small
          //       {...props}
          //       style={{
          //         fontSize: '12px',
          //         padding: '5px',
          //       }}
          //     >
          //       Next
          //     </small>
          //   ),
          //   previous: (props) => (
          //     <small
          //       style={{
          //         fontSize: '12px',
          //         padding: '5px',
          //       }}
          //       {...props}
          //     >
          //       Previous
          //     </small>
          //   ),
          // }}
        />
      )}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

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

export default GuardPayment
