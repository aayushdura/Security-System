import { CCol, CCollapse, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { BsSquareFill } from 'react-icons/bs'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const AttendanceSection = () => {
  const [collapseVisible, setCollapseVisible] = useState({
    summary: true,
    attendanceList: true,
  })
  let currentEmployee = {}
  return (
    <>
      <CRow className="align-items-center justify-content-between">
        <CCol className="col-sm-auto d-flex align-items-center fw-bold gap-2 ">
          <div className="border px-3 py-1">
            {' '}
            May 2020 <FaCaretDown />{' '}
          </div>
          <button className="button-primary-small px-4">Filter</button>
        </CCol>
        <CCol className="col-sm-auto">
          <button className="button-primary-fit-content px-5">Print Summary</button>
        </CCol>
      </CRow>
      {/* Summary */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom px-4 py-2">
          <span>Summary</span>
          <span>
            {collapseVisible.summary ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      summary: !collapseVisible.summary,
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
                      summary: !collapseVisible.summary,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.summary}>
          <div className="row d-flex px-4 py-2">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Total Work Time</div>:
                <div className="col">
                  {currentEmployee.firstName ? currentEmployee.firstName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Total Working Days</div>:
                <div className="col">{currentEmployee.gender}</div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Total Early Left</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Total Present</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Total Leave</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Over TIme Hours</div>:
                <div className="col">
                  {currentEmployee.lastName ? currentEmployee.lastName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Deduction Hours</div>:
                <div className="col">
                  {currentEmployee.otherName ? currentEmployee.otherName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Deduction days</div>:
                <div className="col">
                  {currentEmployee.personalEmail ? currentEmployee.personalEmail : '---'}
                </div>
              </div>
              <div className="row my-3 text-red">
                <div className="col-sm-4">Total Absent</div>:
                <div className="col">
                  {currentEmployee.personalEmail ? currentEmployee.personalEmail : '---'}
                </div>
              </div>
              <div className="row my-3 text-red">
                <div className="col-sm-4">Total Late</div>:
                <div className="col">
                  {currentEmployee.personalEmail ? currentEmployee.personalEmail : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Other Leave History */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom px-4 py-2">
          <span>Attendance List</span>
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
            <CTable className="mt-3 border" responsive>
              <CTableBody>
                <CTableRow className="py-1 border align-items-center">
                  <CTableDataCell>Date</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                  <CTableDataCell>Checkin</CTableDataCell>
                  <CTableDataCell>Checkout</CTableDataCell>
                  <CTableDataCell>Time Worked</CTableDataCell>
                  <CTableDataCell>Work Location ID</CTableDataCell>
                  <CTableDataCell>Remarks</CTableDataCell>
                </CTableRow>
                <CTableRow className="py-1 align-items-center">
                  <CTableDataCell>2021-09-12</CTableDataCell>
                  <CTableDataCell className="d-flex align-items-center gap-2">
                    <BsSquareFill className=" text-green" /> Present
                  </CTableDataCell>
                  <CTableDataCell>08:00:00</CTableDataCell>
                  <CTableDataCell>20:00:00</CTableDataCell>
                  <CTableDataCell>12h 0m</CTableDataCell>
                  <CTableDataCell>KLB001</CTableDataCell>
                  <CTableDataCell>Normal</CTableDataCell>
                </CTableRow>
                <CTableRow className="py-1 align-items-center">
                  <CTableDataCell>2021-09-13</CTableDataCell>
                  <CTableDataCell className="d-flex align-items-center gap-2">
                    <BsSquareFill className="text-red" /> Absent
                  </CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
        </CCollapse>
      </div>
    </>
  )
}

export default AttendanceSection
