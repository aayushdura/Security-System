import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { Avatar } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import { RiUserSettingsLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddDepartmentForm from 'src/components/BasicSettings/AddDepartmentForm'
import TableFooter from 'src/components/Pagination/TableFooter'
import { getAllDepartments } from 'src/features/SystemGeneralDef/apiCalls'
import { getSystemDepartment } from 'src/features/SystemGeneralDef/systemDefSlice'
import { request } from 'src/utils/requests'

const DepartmentSettings = () => {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [departmentSearch, setDepartmentSearch] = useState({
    DepartmentName: null,
    ParentDepartment: null,
    DepartmentCode: null,
  })
  const [selectedRows, setSelectedRows] = useState([])
  const { systemDepartments, isFetching } = useSelector((state) => state.systemDef)
  const dataForGrid =
    systemDepartments?.length > 0
      ? systemDepartments.map((dep) => {
          let id = dep.departmentCode
          return { ...dep, id }
        })
      : []
  const departmentSearchInputs = [
    {
      id: 'DepartmentName',
      label: 'Department Name',
      inputType: 'text',
    },
    {
      id: 'ParentDepartment',
      label: 'Parent Department',
      inputType: 'text',
    },
    {
      id: 'DepartmentCode',
      label: 'Department Code',
      inputType: 'text',
    },
  ]
  const tableColumns = [
    {
      field: 'id',
      headerName: 'Department Code',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'deparmentName',
      headerName: 'Department Name',
      flex: 1,
      minWidth: 180,
      headerAlign: 'left',
    },
    {
      field: 'parentDepartmentCode',
      headerName: 'Parent Department Code',
      flex: 1,
      headerAlign: 'left',
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   align: 'right',
    //   width: 80,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={
    //         <button className="button-primary icon-button rounded-circle ">
    //           <BiChevronRight
    //             size={25}
    //             className="m-0"
    //             // onClick={(e) => navigate(`/employee-profile/${params.row.employeeGuid}`)}
    //           />
    //         </button>
    //       }
    //       label="Delete"
    //       key={1}
    //       className="me-2"
    //     />,
    //   ],
    // },
  ]

  const handleDepartmentSearch = (e) => {
    const { name, value } = e.target
    setDepartmentSearch({ ...departmentSearch, [name]: value })
  }
  const handleReset = (e) => {
    e.preventDefault()
    setDepartmentSearch({ DepartmentName: null, ParentDepartment: null, DepartmentCode: null })
    // dispatch(getStaffList())
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    let params = { ...departmentSearch }
    // dispatch(getStaffList(params))
  }

  useEffect(() => {
    dispatch(getAllDepartments())
  }, [dispatch])
  return (
    <>
      <>
        <AddDepartmentForm showForm={showForm} setShowForm={setShowForm} />
      </>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="d-flex align-items-center gap-2">
          <RiUserSettingsLine /> Department Settings
        </h3>
        <button className="button-primary" onClick={() => setShowForm(true)}>
          Add New
        </button>
      </div>
      <CCard className="mb-4">
        <CCardBody className="p-4">
          <h5 className="mb-4">Filter Search</h5>
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {departmentSearchInputs.map((input, index) => {
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
                          value={departmentSearch[input.id]}
                          onChange={handleDepartmentSearch}
                        />
                      ) : input.inputType === 'select' ? (
                        <CFormSelect
                          onChange={handleDepartmentSearch}
                          className="text-capitalize"
                          name={input.id}
                          value={departmentSearch[input.id]}
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
                          value={departmentSearch[input.id]}
                          onChange={handleDepartmentSearch}
                        />
                      ) : null}

                      {/* */}
                    </CCol>
                  </CRow>
                </CCol>
              )
            })}
            <div className="d-flex flex-row justify-content-center gap-2">
              <button
                className="button-primary"
                onClick={() => toast.loading('Working On It', { duration: 800 })}
              >
                Search
              </button>
              <button
                className="button-red"
                type="button"
                onClick={() => toast.loading('Working On It', { duration: 800 })}
                // disabled={isFetching}
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
              columns={tableColumns}
              // pageSize={10}
              loading={isFetching}
              checkboxSelection
              columnBuffer={8}
              disableColumnMenu
              hideFooter
              // page={page}
              // onPageChange={(newPage) => {
              // setPage(newPage)
              // }}
              onSelectionModelChange={(id) => {
                setSelectedRows(id)
              }}
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
          <TableFooter
            handleNextPage={() => {}}
            handlePerPage={() => {}}
            selectedData={selectedRows?.length}
            totalNoOfData={dataForGrid?.length}
          />
          {/* <Paginator /> */}
          {/* <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <CFormSelect
                onChange={(e) => {
                  setPage(e.target.value)
                  console.log(page)
                }}
                value={page}
              >
                <option value={0}>Page 1/800</option>
                <option value={1}>Page 2/800</option>
                <option value={2}>Page 3 /800</option>
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

export default DepartmentSettings
