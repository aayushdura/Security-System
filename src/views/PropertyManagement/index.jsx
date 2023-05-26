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
import { FiRefreshCcw } from 'react-icons/fi'
import { AiFillEye, AiFillInfoCircle } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { BsCheckCircleFill } from 'react-icons/bs'
import { RiErrorWarningFill } from 'react-icons/ri'
import PropTypes from 'prop-types'
import { Drawer } from '@mui/material'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

const Resident = () => {
  const [resident, setResident] = useState({
    name: '',
    buildingName: '',
    apartmentName: '',
    unitName: '',
    unitCategory: '',
    status: '',
  })
  const [residentSearch, setResidentSearch] = useState({
    name: '',
    buildingName: '',
    apartmentName: '',
    unitName: '',
    unitCategory: '',
    status: '',
  })

  const residentInput = [
    {
      id: 'residentName',
      label: 'Name',
      inputType: 'text',
      name: 'name',
    },
    {
      id: 'buildingName',
      label: 'Building Name',
      inputType: 'text',
      name: 'buildingName',
    },
    {
      id: 'apartmentName',
      label: 'Apartment Name',
      inputType: 'text',
      name: 'apartmentName',
    },
    {
      id: 'unitName',
      label: 'Unit Name',
      inputType: 'text',
      name: 'unitName',
    },
    {
      id: 'unitCategory',
      label: 'Unit Category',
      inputType: 'text',
      name: 'unitCategory',
    },
    {
      id: 'status',
      label: 'Status',
      inputType: 'select',
      name: 'status',
      options: ['active', 'inactive'],
    },
  ]
  const data = [
    {
      id: 1,
      name: 'John Doe',
      buildingName: 'Building 1',
      apartmentName: 'Apartment 1',
      unitName: 'Unit 1',
      unitCategory: 'Category 1',
      status: 'Active',
    },
    {
      id: 2,
      name: 'John Doe',
      buildingName: 'Building 2',
      apartmentName: 'Apartment 2',
      unitName: 'Unit 2',
      unitCategory: 'Category 2',
      status: 'InActive',
    },
  ]
  for (let i = 3; i < 30; i++) {
    data.push({
      id: i,
      name: 'John Doe',
      buildingName: 'Building ' + i,
      apartmentName: 'Apartment ' + i,
      unitName: 'Unit ' + i,
      unitCategory: 'Category ' + i,
      status: 'InActive',
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
      headerName: 'Code',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 140,
    },
    {
      field: 'buildingName',
      headerName: 'Building Name',
      width: 140,
    },
    {
      field: 'apartmentName',
      headerName: 'Apartment Name',
      width: 140,
    },
    {
      field: 'unitName',
      headerName: 'Unit Name',
      width: 140,
    },
    {
      field: 'unitCategory',
      headerName: 'Unit Category',
      width: 140,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-1">
            <button className="btn-view" onClick={(e) => handleView(e, params)}>
              <AiFillEye />
            </button>
            <button className="btn-edit" onClick={(e) => handleEdit(e, params)}>
              <BiEditAlt />
            </button>
            <button className="btn-status-active" onClick={(e) => handleStatusChange(e, params)}>
              <BsCheckCircleFill />
            </button>
            <button className="btn-sm-delete" onClick={(e) => handleSingleDelete(e, params)}>
              <MdDelete />
            </button>
          </div>
        )
      },
    },
  ]

  const handleResidentInput = (e) => {
    const { name, value } = e.target
    setResident({ ...resident, [name]: value })
  }
  const handleResidentSearchInput = (e) => {
    const { name, value } = e.target
    setResidentSearch({ ...residentSearch, [name]: value })
  }
  const [visible, setVisible] = useState(false)
  const [updateType, setUpdateType] = useState('')
  const [currentProject, setCurrentProject] = useState({})

  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)

  console.log(residentSearch)

  const handleFilterSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <>
        <Modal
          visible={visible}
          setVisible={setVisible}
          type={updateType}
          project={currentProject}
        />
      </>
      <div>
        <Drawer anchor={'right'} open={showDrawer} onClose={() => setShowDrawer(false)}>
          <div className="drawer">
            <div className="drawer-header ">
              <h5 className="fw-bold m-0 text-capitalize">{updateType} Details</h5>
            </div>
            <div className="drawer-body">
              <CContainer>
                <CRow className="gx-5 gy-4">
                  {residentInput.map((input, index) => {
                    return (
                      <CCol xs="12" sm={input.name === 'apartmentName' ? '12' : '6'} key={index}>
                        <CRow>
                          <CCol xs="12" sm="auto">
                            <CFormLabel className="col-form-label">
                              <strong>{input.label}</strong>
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            {/* <CFormInput
                              type="text"
                              name={input.name}
                              value={resident[input.name]}
                              onChange={handleResidentInput}
                            /> */}
                            {input.inputType === 'text' ? (
                              <CFormInput
                                type="text"
                                name={input.name}
                                value={resident[input.name]}
                                onChange={handleResidentInput}
                              />
                            ) : (
                              <CFormSelect
                                onChange={handleResidentInput}
                                className="text-capitalize"
                                name={input.name}
                                value={resident[input.name]}
                              >
                                <option disabled defaultValue value={''}>
                                  Select {input.name}
                                </option>
                                {input.options?.map((optionValue, index) => {
                                  return (
                                    <option value={optionValue} key={index}>
                                      {optionValue}
                                    </option>
                                  )
                                })}
                              </CFormSelect>
                            )}
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
                  setShowDrawer(false)
                }}
              >
                Cancel
              </button>
              <button className="btn-save">Save</button>
            </div>
          </div>
        </Drawer>
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
                  {residentInput.map((input, index) => {
                    return (
                      <CCol xs="12" sm="6" key={index}>
                        <CRow>
                          <CCol xs="6">
                            <p>
                              <strong>{input.label}</strong>
                            </p>
                          </CCol>
                          <CCol>
                            <p> {currentProject[input.name]}</p>
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
        <CCardBody className="pt-5 px-4">
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {residentInput.map((input, index) => {
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
                          name={input.name}
                          value={residentSearch[input.name]}
                          onChange={handleResidentSearchInput}
                        />
                      ) : (
                        <CFormSelect
                          onChange={handleResidentSearchInput}
                          className="text-capitalize"
                          name={input.name}
                          value={residentSearch[input.name]}
                        >
                          <option disabled defaultValue value={''}>
                            Select {input.name}
                          </option>
                          {input.options?.map((optionValue, index) => {
                            return (
                              <option value={optionValue} key={index}>
                                {optionValue}
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
              <button className="btn-extra-dark">Search</button>
              <button className="button-gray">Reset</button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <div className="d-flex justify-content-end mb-3 gap-2">
            <button className="btn-refresh">
              <FiRefreshCcw size={20} />
            </button>
            <button
              className="btn-add"
              onClick={() => {
                setUpdateType('add')
                setShowDrawer(true)
              }}
            >
              Add New
            </button>
            <button className="button-red">Delete</button>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={tableColumns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
              // onSelectionModelChange={(id) => {
              //   console.log(id)
              // }}

              components={{
                Pagination: CustomPagination,
              }}
            />
          </div>
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

export default Resident
