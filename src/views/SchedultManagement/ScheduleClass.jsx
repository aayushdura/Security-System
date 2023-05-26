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
import React, { useEffect, useState } from 'react'
// import MaterialTable from 'material-table'

import { BiChevronRight, BiEditAlt } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { BsCheckCircleFill } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri'
import * as PropTypes from 'prop-types'
import { Drawer, TextField } from '@mui/material'
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
import ScheduleClassDrawer from 'src/components/ScheduleManagement/ScheduleClassDrawer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteScheduleClass, fetchScheduleClass } from 'src/features/schedule/apiCalls'
import { toast } from 'react-hot-toast'

const SequenceClass = () => {
  const { scheduleClass, isFetching } = useSelector((state) => state.scheduleClass)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const [currentProject, setCurrentProject] = useState({})

  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)

  const [scheduleClassSearch, setScheduleClassSearch] = useState({
    sclassCode: '',
    sclassName: '',
    isHalfDay: '',
    timeSession: '',
  })
  const [page, setPage] = useState(0)

  const scheduleClassSearchInputs = [
    {
      id: 'sclassCode',
      label: 'SClassCode',
      inputType: 'text',
    },
    {
      id: 'sclassName',
      label: 'SClassName',
      inputType: 'text',
    },
    {
      id: 'isHalfDay',
      label: 'IsHalfDay',
      inputType: 'select',
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
    {
      id: 'timeSession',
      label: 'TimeSession',
      inputType: 'text',
    },
    {
      id: 'Status',
      label: 'Status',
      inputType: 'text',
    },
  ]

  const data = scheduleClass?.length > 0 ? scheduleClass : []

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
      field: 'sclassCode',
      headerName: 'SClassCode',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sclassName',
      headerName: 'SClassName',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'timeSession',
      headerName: 'TimeSession',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'isHalfDay',
      headerName: 'IsHalfDay',
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
      field: 'action',
      headerName: 'Action',
      type: 'actions',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            {/* <button className="btn-view" onClick={(e) => handleView(e, params)}>
              <AiFillEye />
            </button> */}
            <button className="button-green icon-button" onClick={(e) => handleEdit(e, params)}>
              <BiEditAlt />
            </button>
            <button
              className="button-sky-blue icon-button"
              onClick={(e) => handleStatusChange(e, params)}
            >
              <BsCheckCircleFill />
            </button>
            <button
              className="button-red icon-button"
              onClick={(e) => handleSingleDelete(e, params)}
            >
              <MdDelete />
            </button>
          </div>
        )
      },
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   align: 'right',
    //   width: 120,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={
    //         <button className="button-primary icon-button rounded-circle ">
    //           <BiChevronRight size={25} />
    //         </button>
    //       }
    //       label="Delete"
    //       key={1}
    //       className="me-2"
    //     />,
    //   ],
    // },
  ]

  const handleScheduleClassSearch = (e) => {
    const { name, value } = e.target
    setScheduleClassSearch({ ...scheduleClassSearch, [name]: value })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchScheduleClass(scheduleClassSearch))
  }

  const handleSearchReset = (e) => {
    try {
      setScheduleClassSearch({
        sclassCode: '',
        sclassName: '',
        isHalfDay: '',
        status: '',
      })
      dispatch(fetchScheduleClass())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleActionConfirm = (e) => {
    if (updateType === 'delete') {
      try {
        dispatch(deleteScheduleClass(currentProject.sclassCode))
        setVisible(false)
        toast.success('Schedule Class Deleted Successfully')
      } catch (error) {
        toast.error('Schedule Class Failed To Delete')
        setVisible(false)
      }
    }
  }

  useEffect(() => {
    dispatch(fetchScheduleClass())
  }, [dispatch])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="">Duty Class</h4>
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
          handleActionConfirm={handleActionConfirm}
        />
      </>
      <div>
        <ScheduleClassDrawer
          drawerType={updateType}
          setShowDrawer={setShowDrawer}
          currentScheduleClass={currentProject}
          showDrawer={showDrawer}
        />
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
                  {scheduleClassSearchInputs.map((input, index) => {
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

      <CCard className="mb-4">
        <CCardBody className="p-4">
          <CForm className="row gx-5 gy-4" onSubmit={handleSearchSubmit}>
            {scheduleClassSearchInputs.map((input, index) => {
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
                          value={scheduleClassSearch[input.id]}
                          onChange={handleScheduleClassSearch}
                        />
                      ) : (
                        <CFormSelect
                          onChange={handleScheduleClassSearch}
                          className="text-capitalize"
                          name={input.id}
                          value={scheduleClassSearch[input.id]}
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
                      )}

                      {/* */}
                    </CCol>
                  </CRow>
                </CCol>
              )
            })}
            <div className="d-flex flex-row justify-content-center gap-2">
              <button className="button-primary" type="submit">
                Search
              </button>
              <button className="button-gray" type="button" onClick={handleSearchReset}>
                Reset
              </button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-4">
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={tableColumns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
              columnBuffer={8}
              disableColumnMenu
              hideFooter={true}
              page={page}
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
              loading={isFetching}
              getRowId={(row) => row.sclassCode}
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

const Modal = ({ visible, setVisible, type, project, handleActionConfirm }) => {
  return (
    <CModal size="sm" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalBody className="py-4">
        <div className="d-flex flex-column justify-content-center align-items-center fw-bold ">
          <RiErrorWarningFill size={90} className="text-gray mb-2" />
          <h5 className="fw-bold text-capitalize">{type}?</h5>
          <p className=" text-capitalize">Are You Sure to {type} ?</p>
          <div className="d-flex justify-content-center gap-2  ">
            <button className="button-gray " onClick={() => setVisible(false)}>
              No, cancel.
            </button>
            <button className="button-red" onClick={handleActionConfirm}>
              Yes, {type}.
            </button>
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
  handleActionConfirm: PropTypes.func.isRequired,
}

export default SequenceClass
