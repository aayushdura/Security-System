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
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import React, { useLayoutEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddNewVisitorManagement from 'src/components/VisitorManagement/AddNewVisitorManagement'
import { getAllVisitors } from 'src/features/VisitorRegistration/apiCalls'
import { getAllWorkLocations } from 'src/features/WorkLocation/apiCalls'
import { request } from 'src/utils/requests'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { RiErrorWarningFill } from 'react-icons/ri'
import moment from 'moment'
const VisitorManagementList = () => {
  const { allVisitors, isFetching } = useSelector((state) => state.visitors)
  const [showForm, setShowForm] = useState(false)
  const [openDelteModal, setOpenDeleteModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [staffSearch, setStaffSearch] = useState({
    VisitorName: '',
    VisitorPhone: '',
    EntryDate: '',
    LocationId: '',
    LocationName: '',
    District: '',
  })
  const dispatch = useDispatch()
  const allWorkLocations = []
  const dataForGrid =
    allVisitors?.length > 0
      ? allVisitors.map((visitor) => {
          let id = visitor.visitorId
          let entryTime = moment(visitor.entryTime).format('hh:mm')
          let entryDate = moment(visitor.entryDate).format('DD MMMM YYYY')
          return {
            ...visitor,
            id,
            entryDate,
            entryTime,
          }
        })
      : []
  const staffSearchInputs = [
    {
      id: 'VisitorName',
      label: 'Visitor Name',
      inputType: 'text',
    },
    {
      id: 'VisitorPhone',
      label: 'Visitor Phone',
      inputType: 'text',
    },
    {
      id: 'EntryDate',
      label: 'Entry Date',
      inputType: 'date',
      // options: [
      //   {
      //     value: 'Commercial',
      //     label: 'Commercial',
      //   },
      //   {
      //     value: 'Industrial',
      //     label: 'Industrial',
      //   },
      //   {
      //     value: 'Residential',
      //     label: 'Residential',
      //   },
      // ],
    },
    {
      id: 'LocationId',
      label: 'Location Id',
      inputType: 'text',
    },
    {
      id: 'LocationName',
      label: 'Location Name',
      inputType: 'text',
      //   options: [
      //     {
      //       value: 'Kowloon',
      //       label: 'Kowloon',
      //     },
      //     {
      //       value: 'Hong Kong',
      //       label: 'Hong Kong',
      //     },
      //     {
      //       value: 'New Territories',
      //       label: 'New Territories',
      //     },
      //   ],
    },
    {
      id: 'District',
      label: 'District',
      inputType: 'text',
      //   options: [
      //     {
      //       label: 'InActive',
      //       value: 0,
      //     },
      //     {
      //       label: 'Active',
      //       value: 1,
      //     },
      //     {
      //       label: 'Terminated',
      //       value: 2,
      //     },
      //   ],
    },
  ]
  const tableColumns = [
    {
      field: 'visitorName',
      headerName: 'Visitor Name',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'visitorPhone',
      headerName: 'Visitor Phone',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'visitorId',
      headerName: 'Visitor ID',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'entryTime',
      headerName: 'Entry Time',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'entryDate',
      headerName: 'Entry Date',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'locationId',
      headerName: 'Location ID',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'locationName',
      headerName: 'Location Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'district',
      headerName: 'District',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  const handleRemove = async () => {
    if (selectedRows?.length >= 1 && allVisitors?.length >= 1) {
      // let selectedGuids = []
      // selectedRows.forEach((empId) => {
      //   selectedGuids = [
      //     ...selectedGuids,
      //     allVisitors.find((employee) => empId === employee.visitorId).visitorId,
      //   ]
      // })
      try {
        let res = await request.deleteVisitor(selectedRows[0])
        if (res.data) {
          toast.success('Successfully Deleted 1 Visitor')
          dispatch(getAllVisitors())
          setOpenDeleteModal(false)
        }
      } catch (err) {
        toast.error('Could not Delete')
        setOpenDeleteModal(false)
      }
    } else {
      toast.error('Select Any Visitor To Remove')
      setOpenDeleteModal(false)
    }
  }
  const DeleteModal = ({ visible, setVisible, type, project, handleRemove }) => {
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
              <button className="button-red " onClick={handleRemove}>
                Yes, {type}.
              </button>
            </div>
          </div>
        </CModalBody>
      </CModal>
    )
  }
  DeleteModal.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    type: PropTypes.string,
    project: PropTypes.object,
    handleRemove: PropTypes.func,
  }
  const handleStaffSearch = (e) => {
    const { name, value } = e.target
    setStaffSearch({ ...staffSearch, [name]: value })
  }
  const handleReset = (e) => {
    e.preventDefault()
    setStaffSearch({
      VisitorName: '',
      VisitorPhone: '',
      EntryDate: '',
      LocationId: '',
      LocationName: '',
      District: '',
    })
    dispatch(getAllVisitors())
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    let params = {
      VisitorName: staffSearch.VisitorName === '' ? null : staffSearch.VisitorName,
      LocationId: staffSearch.LocationId === '' ? null : staffSearch.LocationId,
      VisitorPhone: staffSearch.VisitorPhone === '' ? null : staffSearch.VisitorPhone,
      EntryDate: staffSearch.EntryDate === '' ? null : staffSearch.EntryDate,
      District: staffSearch.District === '' ? null : staffSearch.District,
      LocationName: staffSearch.LocationName === '' ? null : staffSearch.LocationName,
    }
    dispatch(getAllVisitors({ ...params }))
  }

  useLayoutEffect(() => {
    dispatch(getAllVisitors())
    dispatch(getAllWorkLocations())
  }, [dispatch])
  return (
    <>
      <>
        <DeleteModal
          visible={openDelteModal}
          setVisible={setOpenDeleteModal}
          type="Delete"
          handleRemove={handleRemove}
        />
      </>
      <>
        <AddNewVisitorManagement formType="add" visible={showForm} setVisible={setShowForm} />
      </>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h4>Visitor Registration</h4>
          <h6>
            <CountUp
              start={0}
              duration={0.9}
              end={allWorkLocations?.length}
              className="badge bg-primary-light p-2"
            />
          </h6>
        </div>

        <div>
          <button
            className="button-primary"
            onClick={() => {
              setShowForm(true)
            }}
          >
            Add New
          </button>
          <button className="button-outline-primary ms-2" onClick={() => setOpenDeleteModal(true)}>
            Remove
          </button>
        </div>
      </div>
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
        <CCardBody className="p-4">
          <div style={{ height: 500, width: '100%' }} className="fw-semibold">
            <DataGrid
              rows={dataForGrid}
              columns={tableColumns}
              pageSize={10}
              loading={isFetching}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowHeight={() => 'auto'}
              columnBuffer={8}
              disableColumnMenu
              hideFooterPagination
              onSelectionModelChange={(workLocationGuid) => {
                setSelectedRows(workLocationGuid)
              }}
              // page={page}
              // onPageChange={(newPage) => {
              //   setPage(newPage)
              // }}
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
                  fontWeight: '800',
                },
                '.MuiDataGrid-cellContent': {
                  fontWeight: '600',
                },
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                  mx: 0,
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
    </>
  )
}

export default VisitorManagementList
