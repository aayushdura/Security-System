import { CCollapse, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AddPaymentBasicInfo from '../AddEmployeeInfoModals/AddPayrollInfo/AddPaymentBasicInfo'
import AddBankAccountInfo from '../AddEmployeeInfoModals/AddPayrollInfo/AddBankAccountInfo'
import AddFixedAllowancesInfo from '../AddEmployeeInfoModals/AddPayrollInfo/AddFixedAllowancesInfo'
import AddHostelRetailInfo from '../AddEmployeeInfoModals/AddPayrollInfo/AddHostelRetailInfo'
import AddMedicalRetailInfo from '../AddEmployeeInfoModals/AddPayrollInfo/AddMedicalRetailInfo'
import AddReimbursement from '../AddEmployeeInfoModals/AddPayrollInfo/AddReimbursement'
import AddFixedDeduction from '../AddEmployeeInfoModals/AddPayrollInfo/AddFixedDeduction'
import AddTaxation from '../AddEmployeeInfoModals/AddPayrollInfo/AddTaxation'
const PayrollSection = ({ PaymentDetails }) => {
  const [collapseVisible, setCollapseVisible] = useState({
    basicInfo: true,
    bankAccountInfo: true,
    hostelRentalInfo: true,
    medicalInsuranceInfo: true,
    fixedAllowance: true,
    reimbursementAllowances: true,
    fixedDeduction: true,
    taxation: true,
  })
  const [showAddPaymentBasicModal, setShowAddPaymentBasicModal] = useState(false)
  const [showAddBankAccountModal, setShowAddBankAccountModal] = useState(false)
  const [showAddHostelInfoModal, setShowAddHostelInfoModal] = useState(false)
  const [showAddMedicalModal, setShowAddMedicalModal] = useState(false)
  const [showAddFixedAllowanceModal, setShowAddFixedAllowanceModal] = useState(false)
  const [showAddReimbursementModal, setShowAddReimbursementModal] = useState(false)
  const [showAddFixedDeductionModal, setShowAddFixedDeductionModal] = useState(false)
  const [showAddTaxationModal, setShowAddTaxationModal] = useState(false)
  const { currentEmployee } = useSelector((state) => state.employee)
  const { fixAllowanceInfo, reimbursementInfo, deductionInfo, taxtaionInfo } = useSelector(
    (state) => state.empExtraDetails.paymentInfo,
  )

  return (
    <>
      <div className="row d-flex gap-md-4 gap-lg-0 flex-wrap">
        {/* Payment Basic Info */}
        <div className="col-lg-6 fs-6 fw-bold">
          <div className="d-flex justify-content-between align-items-center  border  ps-4 py-3 pe-3">
            <span>Payment Basic Info</span>
            <span>
              {collapseVisible.basicInfo ? (
                <FaCaretUp
                  size={30}
                  onClick={() =>
                    setCollapseVisible((collapseVisible) => {
                      return { ...collapseVisible, basicInfo: !collapseVisible.basicInfo }
                    })
                  }
                />
              ) : (
                <FaCaretDown
                  size={30}
                  onClick={() =>
                    setCollapseVisible((collapseVisible) => {
                      return { ...collapseVisible, basicInfo: !collapseVisible.basicInfo }
                    })
                  }
                />
              )}
            </span>
          </div>
          <CCollapse visible={collapseVisible.basicInfo} className="border">
            <div className="row d-flex ps-4 py-3 pe-3">
              <div className="row my-2">
                <div className="col-sm-5">Payroll Type</div>:
                <div className="col">
                  {currentEmployee.payrollType ? currentEmployee.payrollType : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Basic Salary</div>:
                <div className="col">{currentEmployee.gender ? currentEmployee.gender : '---'}</div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Over Time Salary</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Over Time Rule</div>:
                <div className="col">
                  {currentEmployee.lastName ? currentEmployee.lastName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Late Rule</div>:
                <div className="col">
                  {currentEmployee.otherName ? currentEmployee.otherName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Absent Rule</div>:
                <div className="col">{currentEmployee.email ? currentEmployee.email : '---'}</div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Annual Leave</div>:
                <div className="col">{currentEmployee.email ? currentEmployee.email : '---'}</div>
              </div>
            </div>
            <div className="row px-4 mb-3">
              <button className="button-primary" onClick={() => setShowAddPaymentBasicModal(true)}>
                Update
              </button>
            </div>
          </CCollapse>
          <>
            <AddPaymentBasicInfo
              visible={showAddPaymentBasicModal}
              setVisible={setShowAddPaymentBasicModal}
            />
          </>
        </div>
        {/* Bank Account Info */}
        <div className="col-lg-6 fs-6 fw-bold h-100">
          <div className="d-flex justify-content-between align-items-center  border ps-4 py-3 pe-3">
            <span>Bank Account Info</span>
            <span>
              {collapseVisible.bankAccountInfo ? (
                <FaCaretUp
                  size={30}
                  onClick={() =>
                    setCollapseVisible((collapseVisible) => {
                      return {
                        ...collapseVisible,
                        bankAccountInfo: !collapseVisible.bankAccountInfo,
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
                        bankAccountInfo: !collapseVisible.bankAccountInfo,
                      }
                    })
                  }
                />
              )}
            </span>
          </div>
          <CCollapse visible={collapseVisible.bankAccountInfo} className="border">
            <div className="row d-flex ps-4 py-3 pe-3 mb-5">
              <div className="row my-2">
                <div className="col-sm-5">Account Holder Number</div>:
                <div className="col">
                  {currentEmployee.bankAccNo ? currentEmployee.bankAccNo : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Account Holder Name</div>:
                <div className="col">
                  {currentEmployee.bankHolderName ? currentEmployee.bankHolderName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Bank Name</div>:
                <div className="col">
                  {currentEmployee.bankName ? currentEmployee.bankName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Branch Name</div>:
                <div className="col">
                  {currentEmployee.bankBranchName ? currentEmployee.bankBranchName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Payment Method</div>:
                <div className="col">
                  {currentEmployee.paymentMethod ? currentEmployee.paymentMethod : '---'}
                </div>
              </div>
            </div>
            <div className="row px-4 mt-5 mb-3">
              <button className="button-primary" onClick={() => setShowAddBankAccountModal(true)}>
                Update
              </button>
            </div>
          </CCollapse>
          <>
            <AddBankAccountInfo
              visible={showAddBankAccountModal}
              setVisible={setShowAddBankAccountModal}
            />
          </>
        </div>
      </div>
      <div className="row gap-lg-0">
        {/* Hostel Retail Info */}
        <div className="col-lg-6 fs-6 fw-bold mt-5">
          <div className="d-flex justify-content-between align-items-center  border ps-4 py-3 pe-3">
            <span>Hostel Retail Info</span>
            <span>
              {collapseVisible.hostelRentalInfo ? (
                <FaCaretUp
                  size={30}
                  onClick={() =>
                    setCollapseVisible((collapseVisible) => {
                      return {
                        ...collapseVisible,
                        hostelRentalInfo: !collapseVisible.hostelRentalInfo,
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
                        hostelRentalInfo: !collapseVisible.hostelRentalInfo,
                      }
                    })
                  }
                />
              )}
            </span>
          </div>
          <CCollapse visible={collapseVisible.hostelRentalInfo} className="border ">
            <div className="row d-flex ps-4 py-3 pe-3">
              <div className="row my-2">
                <div className="col-sm-5">Hostel Name</div>:
                <div className="col">
                  {currentEmployee.firstName ? currentEmployee.firstName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Hostel Room/Bed</div>:
                <div className="col">{currentEmployee.gender ? currentEmployee.gender : '---'}</div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Hostel Rental</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
            </div>
            <div className="row px-4 mb-3">
              <button className="button-primary" onClick={() => setShowAddHostelInfoModal(true)}>
                Update
              </button>
            </div>
          </CCollapse>
          <>
            <AddHostelRetailInfo
              visible={showAddHostelInfoModal}
              setVisible={setShowAddHostelInfoModal}
            />
          </>
        </div>
        {/* Medical retail Info */}
        <div className="col-lg-6 fs-6 fw-bold mt-5">
          <div className="d-flex justify-content-between align-items-center  border ps-4 py-3 pe-3">
            <span>Medical Retail Info</span>
            <span>
              {collapseVisible.medicalInsuranceInfo ? (
                <FaCaretUp
                  size={30}
                  onClick={() =>
                    setCollapseVisible((collapseVisible) => {
                      return {
                        ...collapseVisible,
                        medicalInsuranceInfo: !collapseVisible.medicalInsuranceInfo,
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
                        medicalInsuranceInfo: !collapseVisible.medicalInsuranceInfo,
                      }
                    })
                  }
                />
              )}
            </span>
          </div>
          <CCollapse visible={collapseVisible.medicalInsuranceInfo} className="border ">
            <div className="row d-flex ps-4 py-3 pe-3">
              <div className="row my-2">
                <div className="col-sm-5">Insurance Provider</div>:
                <div className="col">
                  {currentEmployee.firstName ? currentEmployee.firstName : '---'}
                </div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Medical Scheme</div>:
                <div className="col">{currentEmployee.gender ? currentEmployee.gender : '---'}</div>
              </div>
              <div className="row my-2">
                <div className="col-sm-5">Insurance Subsidy</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
            </div>
            <div className="row px-4 mb-3">
              <button className="button-primary" onClick={() => setShowAddMedicalModal(true)}>
                Update
              </button>
            </div>
          </CCollapse>
          <>
            <AddMedicalRetailInfo
              visible={showAddMedicalModal}
              setVisible={setShowAddMedicalModal}
            />
          </>
        </div>
      </div>
      {/* Fixed allowances */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Fixed Allowances</span>
          <span>
            {collapseVisible.fixedAllowance ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      fixedAllowance: !collapseVisible.fixedAllowance,
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
                      fixedAllowance: !collapseVisible.fixedAllowance,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.fixedAllowance}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Paid Item</CTableDataCell>
                  <CTableDataCell>Paid Item Payment</CTableDataCell>
                </CTableRow>
                {fixAllowanceInfo?.length > 0 &&
                  fixAllowanceInfo.map((allowance) => (
                    <>
                      <CTableRow className="row border py-1 align-items-center">
                        <CTableDataCell>{allowance.allowanceItemName}</CTableDataCell>
                        <CTableDataCell>{allowance.allowanceAmount}</CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3"
                onClick={() => setShowAddFixedAllowanceModal(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        {/* Add Fixed Allowance Form */}
        <>
          <AddFixedAllowancesInfo
            visible={showAddFixedAllowanceModal}
            setVisible={setShowAddFixedAllowanceModal}
          />
        </>
      </div>
      {/* Reimbursement Allowance */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Reimbursement Allowance</span>
          <span>
            {collapseVisible.reimbursementAllowances ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      reimbursementAllowances: !collapseVisible.reimbursementAllowances,
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
                      reimbursementAllowances: !collapseVisible.reimbursementAllowances,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.reimbursementAllowances}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Paid Item</CTableDataCell>
                  <CTableDataCell>Paid Item Limit</CTableDataCell>
                </CTableRow>
                {reimbursementInfo?.length > 0 &&
                  reimbursementInfo.map((allowance) => (
                    <>
                      <CTableRow className="row border py-1 align-items-center">
                        <CTableDataCell>{allowance.allowanceItemName}</CTableDataCell>
                        <CTableDataCell>{allowance.allowanceAmount}</CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3"
                onClick={() => setShowAddReimbursementModal(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        {/* Add Fixed Allowance Form */}
        <>
          <AddReimbursement
            visible={showAddReimbursementModal}
            setVisible={setShowAddReimbursementModal}
          />
        </>
      </div>
      {/* Fixed Deduction */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Fixed Deduction</span>
          <span>
            {collapseVisible.fixedDeduction ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      fixedDeduction: !collapseVisible.fixedDeduction,
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
                      fixedDeduction: !collapseVisible.fixedDeduction,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.fixedDeduction}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Deduction Item</CTableDataCell>
                  <CTableDataCell>Deduction Payment</CTableDataCell>
                </CTableRow>
                {deductionInfo?.length > 0 &&
                  deductionInfo.map((allowance) => (
                    <>
                      <CTableRow className="row border py-1 align-items-center">
                        <CTableDataCell>{allowance.allowanceItemName}</CTableDataCell>
                        <CTableDataCell>{allowance.allowanceAmount}</CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3"
                onClick={() => setShowAddFixedDeductionModal(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        {/* Add Fixed Allowance Form */}
        <>
          <AddFixedDeduction
            visible={showAddFixedDeductionModal}
            setVisible={setShowAddFixedDeductionModal}
          />
        </>
      </div>
      {/* Taxation */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Taxation</span>
          <span>
            {collapseVisible.taxation ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      taxation: !collapseVisible.taxation,
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
                      taxation: !collapseVisible.taxation,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.taxation}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Taxation Item</CTableDataCell>
                  <CTableDataCell>Taxation Payment</CTableDataCell>
                </CTableRow>
                {taxtaionInfo?.length > 0 &&
                  taxtaionInfo.map((allowance) => (
                    <>
                      <CTableRow className="row border py-1 align-items-center">
                        <CTableDataCell>{allowance.allowanceItemName}</CTableDataCell>
                        <CTableDataCell>{allowance.allowanceAmount}</CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowAddTaxationModal(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        {/* Add Fixed Allowance Form */}
        <>
          <AddTaxation visible={showAddTaxationModal} setVisible={setShowAddTaxationModal} />
        </>
      </div>
    </>
  )
}

export default PayrollSection

PayrollSection.propTypes = {
  PaymentDetails: PropTypes.object,
}
