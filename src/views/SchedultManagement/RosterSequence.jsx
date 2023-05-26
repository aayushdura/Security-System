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
import PropTypes from 'prop-types'
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
import RosterSequenceDrawer from 'src/components/ScheduleManagement/RosterSequenceDrawer'
import { useDispatch } from 'react-redux'
import { fetchAllRosterSequence, getALlScheduleClassList } from 'src/features/schedule/apiCalls'
import { useSelector } from 'react-redux'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'

const RosterSequence = () => {
  const dispatch = useDispatch()
  const { rosterSequence, isFetching } = useSelector((state) => state.rosterSequence)
  const [scheduleClassSearch, setScheduleClassSearch] = useState({
    ssequenceCode: '',
    day: '',
    status: '',
  })
  const [visible, setVisible] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const [currentProject, setCurrentProject] = useState({})

  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [page, setPage] = useState(0)

  const scheduleClassSearchInputs = [
    {
      id: 'ssequenceCode',
      label: 'SSequenceCode',
      inputType: 'text',
    },
    {
      id: 'day',
      label: 'Day',
      inputType: 'text',
    },
    {
      id: 'status',
      label: 'Status',
      inputType: 'select',
      options: [
        { label: 'Active', value: 1 },
        { label: 'Inactive', value: 2 },
      ],
    },
  ]

  const data =
    Array.isArray(rosterSequence) && rosterSequence.length > 0
      ? rosterSequence.map((roster, index) => {
          let id = index
          return {
            ...roster,
            id,
          }
        })
      : []

  const tableColumns = [
    {
      field: 'sSequenceCode',
      headerName: 'SSequenceCode',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      minWidth: 200,
    },
    {
      field: 'day',
      headerName: 'Day',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      minWidth: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      minWidth: 120,
      renderCell: (params) => {
        if (params.row.status === 1) {
          return 'Active'
        } else {
          return 'InActive'
        }
      },
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
    {
      field: 'actions',
      type: 'actions',
      align: 'right',
      flex: 2.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <button className="button-primary icon-button rounded-circle ">
              <BiChevronRight size={25} />
            </button>
          }
          label="Delete"
          key={1}
          className="me-2"
        />,
      ],
    },
  ]
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
    console.log(params.row)
    setCurrentProject(params.row)
  }

  const handleScheduleClassSearch = (e) => {
    const { name, value } = e.target
    setScheduleClassSearch({ ...scheduleClassSearch, [name]: value })
  }

  const handleSearchRosterSequence = () => {
    let params = {
      SSequenceCode:
        scheduleClassSearch.ssequenceCode === '' ? null : scheduleClassSearch.ssequenceCode,
      Day: scheduleClassSearch.day === '' ? null : scheduleClassSearch.day,
      Status: scheduleClassSearch.status === '' ? null : scheduleClassSearch.status,
    }
    dispatch(fetchAllRosterSequence(params))
  }
  const handleResetSearch = () => {
    setScheduleClassSearch({
      ssequenceCode: '',
      day: '',
      status: '',
    })
    dispatch(fetchAllRosterSequence())
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    dispatch(fetchAllRosterSequence())
  }, [dispatch])

  useEffect(() => {
    dispatch(getALlScheduleClassList())
  }, [dispatch])
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="">Recurring Sequence</h4>
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
          dispatch={dispatch}
        />
      </>
      <div>
        <RosterSequenceDrawer
          drawerType={updateType}
          setShowDrawer={setShowDrawer}
          showDrawer={showDrawer}
          CurrentSequence={currentProject}
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
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
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
                          {input.options?.map((optionValue, index) => {
                            return (
                              <option value={optionValue.value} key={index}>
                                {optionValue.label}
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
              <button className="button-primary" onClick={handleSearchRosterSequence}>
                Search
              </button>
              <button className="button-gray" onClick={handleResetSearch}>
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
              loading={isFetching}
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

const Modal = ({ visible, setVisible, type, project, dispatch }) => {
  const [loading, setLoading] = useState(false)
  const handleDeleteEnable = async (type) => {
    setLoading(true)
    if (type === 'delete') {
      try {
        let res = await request.deleteRosterSequence(project.sSequenceCode, project.day)
        if (res.data) {
          dispatch(fetchAllRosterSequence())
          toast.success('1 Deleted Sucessfully')
          setVisible(false)
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }
  }
  return (
    <CModal size="sm" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalBody className="py-4">
        <div className="d-flex flex-column justify-content-center align-items-center fw-bold ">
          <RiErrorWarningFill size={90} className="text-gray mb-2" />
          <h5 className="fw-bold text-capitalize">{type}?</h5>
          <p className=" text-capitalize">Are You Sure to {type} ?</p>
          <div className="d-flex justify-content-center gap-2  ">
            <button className="button-gray" onClick={() => setVisible(false)}>
              No, cancel.
            </button>
            <button
              disabled={loading}
              className="button-red"
              onClick={() => handleDeleteEnable(type)}
            >
              {loading ? (type === 'delete' ? 'Deleting...' : 'Enabling...') : `Yes, ${type}`}
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
  dispatch: PropTypes.func,
}

export default RosterSequence
