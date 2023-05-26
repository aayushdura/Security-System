import { CCollapse, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { request } from 'src/utils/requests'
import AddCreditPenalty from '../AddEmployeeInfoModals/AddPerformancesInfo/AddCreditPenalty'
import AddPerformanceReview from '../AddEmployeeInfoModals/AddPerformancesInfo/AddPerformanceReview'
import AddTraining from '../AddEmployeeInfoModals/AddPerformancesInfo/AddTraining'
import PropTypes from 'prop-types'

const Performance = ({ UserGuid }) => {
  const [collapseVisible, setCollapseVisible] = useState({
    performanceReview: true,
    training: true,
    creditPenalty: true,
  })
  const [showAddPerformanceReview, setShowAddPerformanceReview] = useState(false)
  const [showAddTraining, setShowAddTraining] = useState(false)
  const [showAddCreditPenalty, setShowAddCreditPenalty] = useState(false)
  const [generalDetailsList, setGeneralDetailsList] = useState({
    performanceList: [],
    trainingList: [],
    creditPenalty: [],
  })
  const getEmployeePerformanceList = useCallback(async () => {
    try {
      let res = await request.getPerformanceList(UserGuid)
      setGeneralDetailsList((generalDetailsList) => {
        return {
          ...generalDetailsList,
          performanceList: res.data.performance,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [UserGuid])
  const getTrainingList = useCallback(async () => {
    try {
      let res = await request.getTrainingList(UserGuid)
      setGeneralDetailsList((generalDetailsList) => {
        return {
          ...generalDetailsList,
          trainingList: res.data.trainingList,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [UserGuid])
  const getCreditPenalty = useCallback(async () => {
    try {
      let res = await request.getCreditPenaltyList(UserGuid)
      setGeneralDetailsList((generalDetailsList) => {
        return {
          ...generalDetailsList,
          creditPenalty: res.data.rewardPenalty,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [UserGuid])

  useEffect(() => {
    getEmployeePerformanceList()
  }, [getEmployeePerformanceList])
  useEffect(() => {
    getTrainingList()
  }, [getTrainingList])
  useEffect(() => {
    getCreditPenalty()
  }, [getCreditPenalty])

  return (
    <>
      {/* Performance Reviews */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Performance Reviews</span>
          <span>
            {collapseVisible.performanceReview ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      performanceReview: !collapseVisible.performanceReview,
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
                      performanceReview: !collapseVisible.performanceReview,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.performanceReview}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Date</CTableDataCell>
                  <CTableDataCell>Job Knowledge</CTableDataCell>
                  <CTableDataCell>Work Quality</CTableDataCell>
                  <CTableDataCell>Attendance/Punctuality</CTableDataCell>
                  <CTableDataCell>Communication/Listening</CTableDataCell>
                  <CTableDataCell>Dependability</CTableDataCell>
                  <CTableDataCell>Action Recommend</CTableDataCell>
                </CTableRow>
                {generalDetailsList.performanceList.length > 0 &&
                  generalDetailsList.performanceList.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-2 align-items-center"
                    >
                      <CTableDataCell>
                        {item.reviewDate ? moment(item.reviewDate).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.jobKnowledge ? item.jobKnowledge : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.workQuality ? item.workQuality : '---'}</CTableDataCell>
                      <CTableDataCell>{item.attendance ? item.attendance : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item.clientRating ? item.clientRating : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.supervisor ? item.supervisor : '---'}</CTableDataCell>
                      <CTableDataCell>{item.comments ? item.comments : '---'}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3"
                onClick={() => setShowAddPerformanceReview(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddPerformanceReview
            visible={showAddPerformanceReview}
            getPerformanceList={getEmployeePerformanceList}
            setVisible={setShowAddPerformanceReview}
          />
        </>
      </div>
      {/* Training */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Training</span>
          <span>
            {collapseVisible.training ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      training: !collapseVisible.training,
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
                      training: !collapseVisible.training,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.training}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Training Date</CTableDataCell>
                  <CTableDataCell>Code</CTableDataCell>
                  <CTableDataCell>Course Name</CTableDataCell>
                  <CTableDataCell>CPT</CTableDataCell>
                  <CTableDataCell>Score</CTableDataCell>
                  <CTableDataCell>Status</CTableDataCell>
                  <CTableDataCell>Remarks</CTableDataCell>
                </CTableRow>
                {generalDetailsList.trainingList.length > 0 &&
                  generalDetailsList.trainingList.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-3 align-items-center"
                    >
                      <CTableDataCell>
                        {item.trainingDate ? moment(item.trainingDate).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.courseCode ? item.courseCode : '---'}</CTableDataCell>
                      <CTableDataCell>{item.courseName ? item.courseName : '---'}</CTableDataCell>
                      <CTableDataCell>{item.cpt ? item.cpt : '---'}</CTableDataCell>
                      <CTableDataCell>{item.score ? item.score : '---'}</CTableDataCell>
                      <CTableDataCell>{item.status ? item.status : '---'}</CTableDataCell>
                      <CTableDataCell>{item.remarks ? item.remarks : '---'}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowAddTraining(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddTraining
            visible={showAddTraining}
            getTrainingList={getTrainingList}
            setVisible={setShowAddTraining}
          />
        </>
      </div>
      {/* Credit/Penalty */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Credit/Penalty</span>
          <span>
            {collapseVisible.creditPenalty ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      creditPenalty: !collapseVisible.creditPenalty,
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
                      creditPenalty: !collapseVisible.creditPenalty,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.creditPenalty}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-2 align-items-center">
                  <CTableDataCell>Date</CTableDataCell>
                  <CTableDataCell>Type</CTableDataCell>
                  <CTableDataCell>Reason</CTableDataCell>
                  <CTableDataCell>Supervisor</CTableDataCell>
                  <CTableDataCell>Supervisor Assessment</CTableDataCell>
                </CTableRow>
                {generalDetailsList.creditPenalty.length > 0 &&
                  generalDetailsList.creditPenalty.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-1 align-items-center"
                    >
                      <CTableDataCell>
                        {item.effectiveDate ? moment(item.effectiveDate).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.rpType ? item.rpType : '---'}</CTableDataCell>
                      <CTableDataCell>{item.reason ? item.reason : '---'}</CTableDataCell>
                      <CTableDataCell>{item.supervisor ? item.supervisor : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item.supervisorAssessment ? item.supervisorAssessment : '---'}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowAddCreditPenalty(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddCreditPenalty
            visible={showAddCreditPenalty}
            getCreditPenalty={getCreditPenalty}
            setVisible={setShowAddCreditPenalty}
          />
        </>
      </div>
    </>
  )
}

export default Performance
Performance.propTypes = {
  UserGuid: PropTypes.string,
}
