import { CCollapse, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const JobsPosition = () => {
  const { currentEmployee } = useSelector((state) => state.employee)
  const [collapseVisible, setCollapseVisible] = useState({
    currentPostionDetails: true,
    entryDetails: true,
    probationDetails: true,
    transferDetails: true,
    promotionDetails: true,
    resignationDetails: true,
    salaryDetails: true,
  })
  console.log(currentEmployee)

  return (
    <>
      {/* current position details */}
      <div className="fs-6 fw-bold border">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Current Position Detail</span>
          <span>
            {collapseVisible.currentPostionDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      currentPostionDetails: !collapseVisible.currentPostionDetails,
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
                      currentPostionDetails: !collapseVisible.currentPostionDetails,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.currentPostionDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Department</div>:
                <div className="col">
                  {currentEmployee.department ? currentEmployee.department : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Date of Entry</div>:
                <div className="col">
                  {currentEmployee.dateOfEntry
                    ? moment(currentEmployee.dateOfEntry).format('ll')
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Site/Office Location</div>:
                <div className="col">
                  {currentEmployee.officeLocation ? currentEmployee.officeLocation : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Position</div>:
                <div className="col">
                  {currentEmployee.currentPosition ? currentEmployee.currentPosition : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Employee Period</div>:
                <div className="col">
                  {currentEmployee.employeedPeriod ? currentEmployee.employeedPeriod : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Employee Status</div>:
                <div className="col">
                  {currentEmployee.statusId ? (
                    <>
                      {currentEmployee.statusId === 0 && 'InActive'}
                      {currentEmployee.statusId === 1 && 'Active'}
                      {currentEmployee.statusId === 2 && 'Terminated'}
                    </>
                  ) : (
                    '---'
                  )}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Entry Details */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Entry Detail</span>
          <span>
            {collapseVisible.entryDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, entryDetails: !collapseVisible.entryDetails }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, entryDetails: !collapseVisible.entryDetails }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.entryDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Department</div>:
                <div className="col">
                  {currentEmployee.department ? currentEmployee.department : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Date of Entry</div>:
                <div className="col">
                  {currentEmployee.dateOfEntry
                    ? moment(currentEmployee.dateOfEntry).format('ll')
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Position</div>:
                <div className="col">
                  {currentEmployee.currentPosition ? currentEmployee.currentPosition : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Remarks</div>:
                <div className="col">
                  {currentEmployee.remarks ? currentEmployee.remarks : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Probation Details */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Probation Details</span>
          <span>
            {collapseVisible.probationDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      probationDetails: !collapseVisible.probationDetails,
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
                      probationDetails: !collapseVisible.probationDetails,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.probationDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Begining of Probation</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.probationStart
                    ? currentEmployee?.detailModel?.probationStart
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Probation Period</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.probationPeriod
                    ? currentEmployee?.detailModel?.probationPeriod
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">End of Probation</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.detailModel?.probationEnd
                    ? currentEmployee?.detailModel?.probationEnd
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Remarks</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.detailModel?.probationRemarks
                    ? currentEmployee?.detailModel?.probationRemarks
                    : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Transfer Details */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Transfer Detail</span>
          <span>
            {collapseVisible.transferDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, transferDetails: !collapseVisible.transferDetails }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, transferDetails: !collapseVisible.transferDetails }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.transferDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Former Department</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.detailModel?.formerDepartmentCode?.departmentName
                    ? currentEmployee?.detailModel?.formerDepartmentCode?.departmentName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Current Department</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.detailModel?.currentDepartmentCode?.departmentName
                    ? currentEmployee?.detailModel?.currentDepartmentCode?.departmentName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Transfer Valid Date From</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.detailModel?.transferValidfrom
                    ? currentEmployee?.detailModel?.transferValidfrom
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Former Postion</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.formerPositionCode?.positionName
                    ? currentEmployee?.detailModel?.formerPositionCode?.positionName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Current Position</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.currentPositionCode?.positionName
                    ? currentEmployee?.detailModel?.currentPositionCode?.positionName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Remarks</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.transferRemarks
                    ? currentEmployee?.detailModel?.transferRemarks
                    : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Promotion Detail */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Promotion Detail</span>
          <span>
            {collapseVisible.promotionDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      promotionDetails: !collapseVisible.promotionDetails,
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
                      promotionDetails: !collapseVisible.promotionDetails,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.promotionDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Department</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.promotionDepartmentCode?.departmentName
                    ? currentEmployee?.detailModel?.promotionDepartmentCode?.departmentName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Promotion Valid Date From</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.promotionValidFrom
                    ? currentEmployee?.detailModel?.promotionValidFrom
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Remarks</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.promotionRemarks
                    ? currentEmployee?.detailModel?.promotionRemarks
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Former Position</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.formerPositionCode?.positionName
                    ? currentEmployee?.detailModel?.formerPositionCode?.positionName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Promoted Position</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.promotedPositionCode?.positionName
                    ? currentEmployee?.detailModel?.promotedPositionCode?.positionName
                    : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Resignation Detail */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Resignation Detail</span>
          <span>
            {collapseVisible.resignationDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      resignationDetails: !collapseVisible.resignationDetails,
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
                      resignationDetails: !collapseVisible.resignationDetails,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.resignationDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Department</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.currentDepartmentCode?.departmentName
                    ? currentEmployee?.detailModel?.currentDepartmentCode?.departmentName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Resignation Notified Date</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.resignationNotifiedDate
                    ? currentEmployee?.detailModel?.resignationNotifiedDate
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Resignation Valid Date From</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.resignationValidateFrom
                    ? currentEmployee?.detailModel?.resignationValidateFrom
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Former Position</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.formerPositionCode?.positionName
                    ? currentEmployee?.detailModel?.formerPositionCode?.positionName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Resignation Notified Period</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.resignationNotifiedperiod
                    ? currentEmployee?.detailModel?.resignationNotifiedperiod
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Remarks</div>:
                <div className="col">
                  {currentEmployee?.detailModel?.resignationRemarks
                    ? currentEmployee?.detailModel?.resignationRemarks
                    : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Salary Detail */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Salary Detail</span>
          <span>
            {collapseVisible.salaryDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, salaryDetails: !collapseVisible.salaryDetails }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, salaryDetails: !collapseVisible.salaryDetails }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.salaryDetails}>
          <div className="row d-flex ps-4 py-3 pe-3 ps-3 gap-3">
            <CDropdown variant="button-group" style={{ width: 'min-content' }}>
              <CDropdownToggle className="button-primary" color="primary">
                2023
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>2024</CDropdownItem>
                <CDropdownItem>2025</CDropdownItem>
                <CDropdownItem>2026</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <button className="button-outline-primary">Filter</button>
          </div>
          <div className="row d-flex py-4 ps-4 pe-3 align-items-center justify-content-center">
            <div className="row border py-3 align-items-center">
              <div className="col">Department</div>
              <div className="col">Position</div>
              <div className="col">Site/Office</div>
              <div className="col">Salary</div>
              <div className="col">Salary Count Period </div>
              <div className="col">Remarks</div>
            </div>
          </div>
        </CCollapse>
      </div>
    </>
  )
}

export default JobsPosition
