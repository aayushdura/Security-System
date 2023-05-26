import {
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const Leave = () => {
  const [collapseVisible, setCollapseVisible] = useState({
    annualLeave: true,
    otherLeaveHistory: true,
  })
  return (
    <>
      {/* Annual Leave */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Annual Leave</span>
          <span>
            {collapseVisible.annualLeave ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      annualLeave: !collapseVisible.annualLeave,
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
                      annualLeave: !collapseVisible.annualLeave,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.annualLeave}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Reason</CTableDataCell>
                  <CTableDataCell>Days</CTableDataCell>
                  <CTableDataCell>Scheduled</CTableDataCell>
                  <CTableDataCell>Days Remain </CTableDataCell>
                  <CTableDataCell>Time Period</CTableDataCell>
                </CTableRow>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Private Reason</CTableDataCell>
                  <CTableDataCell>2 Days</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                  <CTableDataCell>3 days</CTableDataCell>
                  <CTableDataCell>5 June 2019 - 6 June 2019</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
        </CCollapse>
      </div>
      {/* Other Leave History */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Other Leave History</span>
          <span>
            {collapseVisible.otherLeaveHistory ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      otherLeaveHistory: !collapseVisible.otherLeaveHistory,
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
                      otherLeaveHistory: !collapseVisible.otherLeaveHistory,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.otherLeaveHistory}>
          <div className="row d-flex pt-4 ps-4 pe-3 align-items-center ">
            <CDropdown alignment="start" variant="button-group" style={{ width: 'max-content' }}>
              <CDropdownToggle className="button-primary p-2" color="primary">
                All Leave Type
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Annual Leave</CDropdownItem>
                <CDropdownItem>Sick Leave</CDropdownItem>
                <CDropdownItem>Unpaid Leave</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown alignment="start" variant="button-group" style={{ width: 'min-content' }}>
              <CDropdownToggle className="button-primary" color="primary">
                2020
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>2021</CDropdownItem>
                <CDropdownItem>2022</CDropdownItem>
                <CDropdownItem>2023</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <button className="button-outline-primary">Filter</button>
          </div>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Date</CTableDataCell>
                  <CTableDataCell>Leave Type</CTableDataCell>
                  <CTableDataCell>Days</CTableDataCell>
                  <CTableDataCell>Paid Leave</CTableDataCell>
                  <CTableDataCell>Approver</CTableDataCell>
                  <CTableDataCell>Description</CTableDataCell>
                </CTableRow>
                <CTableRow className="border py-2 align-items-center">
                  <CTableDataCell>3 June 2020 - 4 June 2020</CTableDataCell>
                  <CTableDataCell>Annual Leave</CTableDataCell>
                  <CTableDataCell>2 Days</CTableDataCell>
                  <CTableDataCell>Y</CTableDataCell>
                  <CTableDataCell>Sammy Cheng</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
        </CCollapse>
        {/* Add Fixed Allowance Form */}
      </div>
    </>
  )
}

export default Leave
