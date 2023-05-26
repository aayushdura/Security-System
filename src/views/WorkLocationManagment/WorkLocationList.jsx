import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { toast } from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddWorkLocationModal from 'src/components/WorkLocation/AddLocationForms/AddWorkLocationModal'
import { getAllWorkLocations } from 'src/features/WorkLocation/apiCalls'
import { request } from 'src/utils/requests'
import PropTypes from 'prop-types'
import { RiErrorWarningFill } from 'react-icons/ri'
const WorkLocationList = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [staffSearch, setStaffSearch] = useState({
    SiteName: '',
    SiteCode: '',
    LocationType: '',
    FullAddress: '',
    District: '',
    Status: '',
  })
  const { allWorkLocations, isFetching } = useSelector((state) => state.workLocation)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dataForGrid =
    allWorkLocations?.length > 0
      ? allWorkLocations.map((location, index) => {
          let id = location.siteCode ?? index
          let siteCode = location.siteCode
          let district = 'Kowloon'
          let fullAddress = 'Kowloon, Hong Kong'
          return { ...location, id, siteCode, district, fullAddress }
        })
      : []
  const staffSearchInputs = [
    {
      id: 'SiteName',
      label: 'Site Name',
      inputType: 'text',
    },
    {
      id: 'SiteCode',
      label: 'Site Id',
      inputType: 'text',
    },
    {
      id: 'LocationType',
      label: 'Site Type',
      inputType: 'select',
      options: [
        {
          value: 'Commercial',
          label: 'Commercial',
        },
        {
          value: 'Industrial',
          label: 'Industrial',
        },
        {
          value: 'Residential',
          label: 'Residential',
        },
      ],
    },
    {
      id: 'FullAddress',
      label: 'Full Address',
      inputType: 'text-area',
    },
    {
      id: 'District',
      label: 'District',
      inputType: 'select',
      options: [
        {
          value: 'Kowloon',
          label: 'Kowloon',
        },
        {
          value: 'Hong Kong',
          label: 'Hong Kong',
        },
        {
          value: 'New Territories',
          label: 'New Territories',
        },
      ],
    },
    {
      id: 'Status',
      label: 'Status',
      inputType: 'select',
      options: [
        {
          label: 'InActive',
          value: 0,
        },
        {
          label: 'Active',
          value: 1,
        },
        {
          label: 'Terminated',
          value: 2,
        },
      ],
    },
  ]
  const tableColumns = [
    {
      field: 'siteCode',
      headerName: 'Site ID',
      flex: 1,
      maxWidth: 100,
      headerAlign: 'left',
    },
    {
      field: 'siteName',
      headerName: 'Site Name',
      flex: 1,
      minWidth: 180,
      headerAlign: 'left',
    },
    {
      field: 'fullAddress',
      headerName: 'Full Address',
      flex: 1,
      minWidth: 230,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'siteType',
      headerName: 'Site Type',
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
    {
      field: 'workingEmployees',
      headerName: 'Working Employees',
      flex: 1,
      align: 'center',
      headerAlign: 'left',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        if (params.row.status === 0) {
          return 'InActive'
        } else if (params.row.status === 1) {
          return 'Active'
        } else if (params.row.status === 2) {
          return 'Terminate'
        }
      },
    },
    {
      field: 'actions',
      type: 'actions',
      align: 'right',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => navigate(`/worklocation/${params.id}`)}
          icon={
            <BiChevronRight size={25} className="button-primary icon-button rounded-circle m-0" />
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
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    let params = {
      SiteName: staffSearch.SiteName === '' ? null : staffSearch.SiteName,
      SiteCode: staffSearch.SiteCode === '' ? null : staffSearch.SiteCode,
      LocationType: staffSearch.LocationType === '' ? null : staffSearch.LocationType,
      FullAddress: staffSearch.FullAddress === '' ? null : staffSearch.FullAddress,
      District: staffSearch.District === '' ? null : staffSearch.District,
      Status: staffSearch.Status === '' ? null : staffSearch.Status,
    }
    dispatch(getAllWorkLocations({ ...params }))
  }
  const handleReset = (e) => {
    e.preventDefault()
    setStaffSearch({
      SiteName: '',
      SiteCode: '',
      LocationType: '',
      FullAddress: '',
      District: '',
      Status: '',
    })
    dispatch(getAllWorkLocations())
  }
  const handleRemove = async () => {
    if (selectedRows?.length >= 1 && allWorkLocations?.length >= 1) {
      let selectedGuids = []
      selectedRows.forEach((empId) => {
        selectedGuids = [
          ...selectedGuids,
          allWorkLocations.find((employee) => empId === employee.workLocationGuid).workLocationGuid,
        ]
      })
      try {
        let res = await request.deleteWorkLocation(selectedRows[0])
        if (res.data) {
          toast.success('Successfully Deleted 1 Site')
          dispatch(getAllWorkLocations())
          setOpenDeleteModal(false)
        }
      } catch (err) {
        toast.error('Could not Delete')
        setOpenDeleteModal(false)
      }
    } else {
      toast.error('Select Any Work Site To Remove')
      setOpenDeleteModal(false)
    }
  }
  useEffect(() => {
    dispatch(getAllWorkLocations())
  }, [dispatch])

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

  return (
    <>
      <>
        <DeleteModal
          visible={openDeleteModal}
          handleRemove={handleRemove}
          setVisible={setOpenDeleteModal}
          type={'delete'}
        />
      </>
      <>
        <AddWorkLocationModal formType={'add'} ShowForm={showForm} setShowForm={setShowForm} />
      </>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h4>Work Site</h4>
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
                      ) : input.inputType === 'text-area' ? (
                        <CFormTextarea rows={2} cols={50} />
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
                  textTransform: 'capitalize',
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

export default WorkLocationList
