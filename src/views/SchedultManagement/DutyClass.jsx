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
import { Tooltip } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

const DutyClass = () => {
  const [dutyClassSearch, setDutyClassSearch] = useState({
    ClassCode: '',
    Day: '',
    Status: '',
  })
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState()
  const isFetching = false
  const dataForGrid = [{ id: 'AAD1', name: 'Avengers', status: 'active' }]
  const tableColumns = [
    {
      field: 'id',
      headerName: 'Team Code',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'name',
      headerName: 'Team Name',
      flex: 1,
      minWidth: 180,
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.name}>
            <span>{params.row.name}</span>
          </Tooltip>
        )
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
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-1">
            <button
              className="bg-green border-0 text-white py-1 px-2"
              onClick={(e) => handleEdit(e, params)}
            >
              <BiEditAlt />
            </button>
            <button
              className="bg-primary border-0 text-white py-1 px-2"
              onClick={(e) => handleStatusChange(e, params)}
            >
              <BsCheckCircleFill />
            </button>
            <button
              className="bg-danger border-0 text-white py-1 px-2"
              onClick={(e) => handleSingleDelete(e, params)}
            >
              <MdDelete />
            </button>
          </div>
        )
      },
    },
  ]
  const searchDutyClassInputs = [
    {
      id: 'ClassCode',
      label: 'Class Code',
      inputType: 'text',
    },
    {
      id: 'Day',
      label: 'Day',
      inputType: 'text',
    },
    {
      id: 'Status',
      label: 'Status',
      inputType: 'select',
      options: ['active', 'inactive'],
    },
  ]
  const handleTeamsSearchInput = (e) => {
    const { name, value } = e.target
    setDutyClassSearch({ ...dutyClassSearch, [name]: value })
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
  }
  const handleReset = () => {
    setDutyClassSearch({
      ClassCode: '',
      Day: '',
      Status: '',
    })
  }
  const handleEdit = () => {}
  const handleStatusChange = () => {}
  const handleSingleDelete = () => {}
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4>Duty Class</h4>
        <div className="d-flex flex-wrap gap-2 justify-content-center ">
          <button className="button-primary">Add New</button>
          <button className="button-outline-primary ms-2">Remove</button>
        </div>
      </div>
      <CCard className="mb-4 mt-4">
        <CCardBody className="p-4">
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {searchDutyClassInputs.map((input, index) => {
              return (
                <CCol md="12" lg="6" xl="4" key={index}>
                  <CRow>
                    <CCol sm={4}>
                      <CFormLabel className="col-form-label">
                        <strong>{input.label}</strong>
                      </CFormLabel>
                    </CCol>
                    <CCol>
                      {input.inputType === 'text' ? (
                        <CFormInput
                          type="text"
                          name={input.id}
                          value={dutyClassSearch[input.id]}
                          onChange={handleTeamsSearchInput}
                        />
                      ) : (
                        <CFormSelect
                          onChange={handleTeamsSearchInput}
                          className="text-capitalize"
                          name={input.id}
                          value={dutyClassSearch[input.id]}
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
              <button className="button-primary" type="submit" onClick={handleFilterSubmit}>
                Search
              </button>
              <button className="button-gray" type="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
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
                '.MuiDataGrid-cellContent': {
                  textTransform: 'capitalize',
                },
              }}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default DutyClass
