import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import TableFooter from 'src/components/Pagination/TableFooter'

const ByMonthSchedule = () => {
  return (
    <>
      <div>
        <h4>Schedule Arrangement</h4>
      </div>
      <CCard className="p-2">
        <CCardBody className="fw-bold">
          <CRow className="my-2">
            <p>Please select the month for schedule arrangement</p>
            <CCol sm="3">
              <CFormInput type="month" />
            </CCol>
          </CRow>
          <CRow className="mt-5">
            <p>Please select the schedule arrangement by employee or by location</p>
            <CCol className="d-flex justify-content-between" sm="4">
              <CFormCheck type="radio" name="filterBy" label="By Employee" />
              <CFormCheck type="radio" name="filterBy" label="By Location" />
            </CCol>
          </CRow>
          <>
            <CRow className="mt-3">
              <p>Please have a quick search and select your desired location</p>
              <CCol className="d-flex justify-content-between gap-2" sm="6">
                <CFormInput type="text" placeholder="Employee Code" />
                <CFormInput type="text" placeholder="Employee Name" />
              </CCol>
            </CRow>
            <CTable className="mt-4 mb-0" responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>Employee Code</CTableDataCell>
                  <CTableDataCell>Employee Name</CTableDataCell>
                  <CTableDataCell>Date of Entry</CTableDataCell>
                  <CTableDataCell>Last Working Date</CTableDataCell>
                  <CTableDataCell>Type</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                </CTableRow>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>
                    <CFormCheck type="radio" />
                  </CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <TableFooter />
          </>
          <>
            <CRow className="mt-3">
              <p>Please have a quick search and select your desired location</p>
              <CCol className="d-flex justify-content-between gap-2" sm="4">
                <CFormCheck type="radio" name="filter" label="Same as Previous Month" />
                <CFormCheck type="radio" name="filter" label="Custom" />
              </CCol>
            </CRow>
            <CTable className="mt-4 mb-0" responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>Site Code</CTableDataCell>
                  <CTableDataCell>Site Name</CTableDataCell>
                  <CTableDataCell>Full Address</CTableDataCell>
                  <CTableDataCell>Location Type</CTableDataCell>
                  <CTableDataCell>District</CTableDataCell>
                  <CTableDataCell>Working Employees</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                </CTableRow>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>
                    <CFormCheck type="checkbox" />
                  </CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
            <TableFooter />
            <button className="button-primary" type="button">
              Add
            </button>
          </>
          <CRow className="mt-4">
            <p>Location list on desired employee : </p>
            <CTable className="mb-0" responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Site Code</CTableDataCell>
                  <CTableDataCell>Site Name</CTableDataCell>
                  <CTableDataCell>Full Address</CTableDataCell>
                  <CTableDataCell>Location Type</CTableDataCell>
                  <CTableDataCell>District</CTableDataCell>
                  <CTableDataCell>Working Employees</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
          <div className="mt-4 d-flex justify-content-end gap-2">
            <button className="button-primary" type="button">
              Save
            </button>
            <button className="button-outline-primary" type="button">
              Cancel
            </button>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ByMonthSchedule
