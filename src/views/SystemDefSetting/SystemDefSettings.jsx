import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useLayoutEffect } from 'react'
import CountUp from 'react-countup'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getStaffList } from 'src/features/Employee/apiCalls'
import Widgets from '../widgets/Widgets'

const SystemDefSettings = () => {
  const dispatch = useDispatch()
  const { allStaffs } = useSelector((state) => state.employee)
  useLayoutEffect(() => {
    dispatch(getStaffList())
  }, [dispatch])
  let activeUsers =
    allStaffs?.length > 0 ? allStaffs.filter((staff) => staff.status === 'Active') : '---'
  let inactiveUsers =
    allStaffs?.length > 0 ? allStaffs.filter((staff) => staff.status === 'InActive') : '---'
  let terminatedUsers =
    allStaffs?.length > 0 ? allStaffs.filter((staff) => staff.status === 'Terminate') : '---'
  return (
    <>
      <Widgets />
      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-4">
          <h1>BlueSky Security System</h1>
        </div>
      </div>
      <CCard>
        <CCardHeader className="d-flex py-4 flex-wrap gap-2 justify-content-around">
          <div className="m-0 fs-5 fw-bold">
            Total Number of Staff:{' '}
            <CountUp
              start={0}
              duration={0.9}
              end={allStaffs?.length && allStaffs.length}
              className="badge bg-primary-light ms-2 p-3"
            />
          </div>
          <div className="m-0 fs-5 fw-bold">
            Total Number of Active Staff:{' '}
            <CountUp
              start={0}
              duration={0.9}
              end={activeUsers.length}
              className="badge bg-green p-3 ms-2"
            />
          </div>
          <div className="m-0 fs-5 fw-bold">
            Total Number of InActive Staff:{' '}
            <CountUp
              start={0}
              duration={0.9}
              end={inactiveUsers.length}
              className="badge bg-orange p-3 ms-2"
            />
          </div>
          <div className="m-0 fs-5 fw-bold">
            Total Number of Terminated Staff:{' '}
            <CountUp
              start={0}
              duration={0.9}
              end={terminatedUsers.length}
              className="badge bg-red p-3 ms-2"
            />
          </div>
        </CCardHeader>
        <CCardBody className="mt-4">
          <div className="row gap-lg-0 gap-sm-2 px-2 ">
            <CCol lg={3} className="border p-0">
              <CRow className="m-0 py-2 px-2 border-bottom d-flex justify-content-between">
                {' '}
                <span className="col-sm-auto fs-5 text-gray fw-bold mb-2 m-xl-0">
                  Departments{' '}
                </span>{' '}
                <button
                  className="button-outline-primary-small"
                  onClick={() => toast.loading('Working On it', { duration: '100' })}
                >
                  Add New
                </button>
              </CRow>
              <CRow className="p-3 m-0" style={{ overflowY: 'scroll' }}>
                <p>Engineering</p>
                <p>Sales</p>
                <p>Human Resource</p>
                <p>Administration</p>
                <p>Administration</p>
                <p>Administration</p>
              </CRow>
            </CCol>
            <CCol lg={3} className="border p-0">
              <CRow className="m-0 py-2 pe-2 border-bottom d-flex flex-row justify-content-between">
                {' '}
                <span className="col-sm-auto fs-5 text-gray fw-bold">Gender </span>{' '}
                <button
                  className="button-outline-primary-small"
                  onClick={() => toast.loading('Working On it', { duration: '100' })}
                >
                  Add New
                </button>
              </CRow>
              <CRow className="p-3 m-0">
                <p>Male</p>
                <p>Female</p>
                <p>Lesbian</p>
                <p>Gay</p>
              </CRow>
            </CCol>
            <CCol lg={3} className="border p-0">
              <CRow className="m-0 py-2 pe-2 border-bottom d-flex flex-row justify-content-between">
                <span className="col-sm-auto fs-5 text-gray fw-bold">Country</span>{' '}
                <button
                  className="button-outline-primary-small"
                  onClick={() => toast.loading('Working On it', { duration: '100' })}
                >
                  Add New
                </button>
              </CRow>
              <CRow className="px-4 py-3">
                <p>Nepal</p>
                <p>United States Of America</p>
                <p>India</p>
              </CRow>
            </CCol>
            <CCol lg={3} className="border p-0">
              <CRow className="m-0 py-2 pe-2 border-bottom d-flex flex-row justify-content-between">
                {' '}
                <span className="col-sm-auto fs-5 text-gray fw-bold">Position</span>{' '}
                <button
                  className="button-outline-primary-small"
                  onClick={() => toast.loading('Working On it', { duration: '100' })}
                >
                  Add New
                </button>
              </CRow>
              <CRow className="px-4 py-3">
                <p>Lead</p>
                <p>Senior</p>
                <p>Mid</p>
                <p>Junior</p>
              </CRow>
            </CCol>
          </div>
        </CCardBody>
      </CCard> */}
    </>
  )
}

export default SystemDefSettings
