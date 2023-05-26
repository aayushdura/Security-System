import {
  CCol,
  CCollapse,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { BsSquareFill } from 'react-icons/bs'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const WorkingEmployees = () => {
  const [collapseVisible, setCollapseVisible] = useState({
    attendanceList: true,
  })
  return (
    <>
      <div className="p-3 border">
        <CRow className=" px-3 py-4 align-items-center justify-content-evenly fw-bold">
          <CCol sm="auto">
            <CFormLabel>Name</CFormLabel>
          </CCol>
          <CCol sm="3">
            <CFormInput />
          </CCol>
          <CCol sm="auto">
            <CFormLabel>EmployeeCode</CFormLabel>
          </CCol>
          <CCol sm="3">
            <CFormInput />
          </CCol>
          <CCol sm="auto">
            <CFormLabel>Date</CFormLabel>
          </CCol>
          <CCol sm="3">
            <CFormInput type="date" />
          </CCol>
        </CRow>
        <CRow className="justify-content-center pb-2">
          <button className="button-primary">Search</button>
        </CRow>
      </div>
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom px-4 py-2">
          <span>Employee List</span>
          <span>
            {collapseVisible.attendanceList ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      attendanceList: !collapseVisible.attendanceList,
                    }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      attendanceList: !collapseVisible.attendanceList,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.attendanceList}>
          <CRow className="m-0">
            <CTable className="my-2 border" responsive>
              <CTableBody>
                <CTableRow className="py-1 border align-items-center">
                  <CTableDataCell>Date</CTableDataCell>
                  <CTableDataCell>EmployeeCode</CTableDataCell>
                  <CTableDataCell>Employee Name</CTableDataCell>
                  <CTableDataCell>Mobile</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                  <CTableDataCell>Checkin</CTableDataCell>
                  <CTableDataCell>Checkout</CTableDataCell>
                  <CTableDataCell>Description</CTableDataCell>
                </CTableRow>
                <CTableRow className="py-1 align-items-center">
                  <CTableDataCell>08 Oct 2020</CTableDataCell>
                  <CTableDataCell>541661416</CTableDataCell>
                  <CTableDataCell>Sammy Cheng</CTableDataCell>
                  <CTableDataCell>(852) 3143 1341</CTableDataCell>
                  <CTableDataCell className="d-flex align-items-center gap-2">
                    <BsSquareFill className=" text-green" /> Present
                  </CTableDataCell>
                  <CTableDataCell>08:00:00</CTableDataCell>
                  <CTableDataCell>20:00:00</CTableDataCell>
                  <CTableDataCell>Duty Replaced Sammy Cheng From 05 May to 08 May</CTableDataCell>
                </CTableRow>
                <CTableRow className="py-1 align-items-center">
                  <CTableDataCell>08 Oct 2020</CTableDataCell>
                  <CTableDataCell>541661416</CTableDataCell>
                  <CTableDataCell>Xan Chun</CTableDataCell>
                  <CTableDataCell>(852) 3143 1341</CTableDataCell>
                  <CTableDataCell className="d-flex align-items-center gap-2">
                    <BsSquareFill className=" text-red" /> Absent
                  </CTableDataCell>
                  <CTableDataCell>08:00:00</CTableDataCell>
                  <CTableDataCell>20:00:00</CTableDataCell>
                  <CTableDataCell>Duty Replaced Sammy Cheng From 05 May to 08 May</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
        </CCollapse>
      </div>
    </>
  )
}

export default WorkingEmployees
