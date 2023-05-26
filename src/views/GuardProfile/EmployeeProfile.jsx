import { CCard, CCardBody, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { GrMail } from 'react-icons/gr'
import AddGuardForm from 'src/components/Employees/GuardForms/AddGuardForms'
import GeneralInfo from 'src/components/Employees/GuardProfileSections/GeneralInfo'
import JobsPosition from 'src/components/Employees/GuardProfileSections/JobsPosition'
import { tabs } from 'src/utils/staticData'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getEmployee } from 'src/features/Employee/apiCalls'
import { useSelector } from 'react-redux'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import Leave from 'src/components/Employees/GuardProfileSections/Leave'
import PayrollSection from 'src/components/Employees/GuardProfileSections/PayrollSection'
import AttendanceSection from 'src/components/Employees/GuardProfileSections/AttendanceSection'
import Performance from 'src/components/Employees/GuardProfileSections/Performance'
import Document from 'src/components/Employees/GuardProfileSections/Document'
import addImage from './../../assets/images/addimage.png'
import {
  getDocumentList,
  getEducationHistoryList,
  getEmergencyContact,
  getFixedAllowance,
  getFixedDeduction,
  getLicenseList,
  getSkills,
  getTaxation,
  getWorkinExperienceList,
} from 'src/features/Employee/employeeExtraDetails/apiCalls'
import EmployeeSchedule from '../SchedultManagement/EmployeeSchedule'

const Index = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeKey, setActiveKey] = useState(0)
  const [showEditForm, setShowEditForm] = useState(false)
  const [removeModalShow, setRemoveModalShow] = useState(false)
  const { currentEmployee } = useSelector((state) => state.employee)
  const params = useParams()

  const handleClick = (e, index) => {
    setActiveKey(index)
  }
  const handleEditProfile = () => {
    setShowEditForm(true)
  }
  const handleEditStatus = () => {}
  const handleRemoveProfile = () => {
    setRemoveModalShow(true)
  }
  useLayoutEffect(() => {
    dispatch(getEmployee(params.id))
  }, [dispatch, params.id])

  async function removeCurrentEmp() {
    await request
      .deleteEmployee(params?.id)
      .then((res) => {
        console.log(res.data)
        toast.success('1 Employee Succesfully Deleted')
        navigate(-1)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Failed to Delete 1 Employee')
      })
  }

  const handleRemove = () => {
    removeCurrentEmp()
  }
  const active = {
    color: ' black',
    fontWeight: '700',
    backgroundColor: 'white',
    border: '1px solid #d9d9d9',
  }
  const inActive = {
    color: ' black',
    fontWeight: '500',
    backgroundColor: '#d9d9d9',
    border: '1px solid #d9d9d9',
  }
  const tabSwitch = () => {
    switch (activeKey) {
      case 0:
        return <GeneralInfo UserGuid={params.id} />
      case 1:
        return <PayrollSection UserGuid={params.id} />
      case 2:
        return <JobsPosition UserGuid={params.id} />
      case 3:
        return <EmployeeSchedule />
      case 4:
        return <Leave UserGuid={params.id} />
      case 5:
        return <AttendanceSection UserGuid={params.id} />
      case 6:
        return <Performance UserGuid={params.id} />
      case 7:
        return <Document UserGuid={params.id} />
      default:
        return <GeneralInfo UserGuid={params.id} />
    }
  }

  useEffect(() => {
    dispatch(getWorkinExperienceList(params.id))
    dispatch(getEducationHistoryList(params.id))
    dispatch(getLicenseList(params.id))
    dispatch(getSkills(params.id))
    dispatch(getEmergencyContact(params.id))
    dispatch(getFixedAllowance(params.id))
    dispatch(getFixedDeduction(params.id))
    dispatch(getTaxation(params.id))
    dispatch(getDocumentList(params.id))
  }, [dispatch, params.id])
  return (
    <div>
      <>
        <CModal
          alignment="center"
          visible={removeModalShow}
          onClose={() => setRemoveModalShow(false)}
        >
          <CModalHeader onClose={() => setRemoveModalShow(false)}>
            <h3>Remove Profile ?</h3>
          </CModalHeader>
          <CModalBody>Are you sure you want to remove current profile?</CModalBody>
          <CModalFooter>
            <button className="button-red-small" onClick={handleRemove}>
              Remove
            </button>
            <button
              className="button-outline-primary-small"
              onClick={() => setRemoveModalShow(false)}
            >
              Cancel
            </button>
          </CModalFooter>
        </CModal>
      </>
      <>
        <AddGuardForm formType="Edit" showForm={showEditForm} setShowForm={setShowEditForm} />
      </>
      <h4 className="">Employee Profile</h4>
      <CCard className="mt-3 px-2 py-1">
        <CCardBody>
          {/* Employee Photo and detail Section */}
          <div className="d-flex justify-content-between flex-wrap gap-md-4 gap-sm-4">
            <div className="flex-grow-1">
              <div className="d-flex gap-4 flex-wrap">
                <div>
                  <img
                    src={currentEmployee?.pictureModel?.pictureUrl ?? addImage}
                    alt="user"
                    style={{ objectFit: 'contain' }}
                    className="object-fit-sm-contain"
                    height={300}
                    width={250}
                  />
                </div>
                <div className="d-flex flex-column gap-5">
                  <div>
                    <div className="d-flex gap-3 flex-wrap">
                      {currentEmployee.firstName ? (
                        <h3>{`${currentEmployee.firstName}  ${currentEmployee.lastName}`}</h3>
                      ) : (
                        '---'
                      )}
                      {currentEmployee.statusId === 0 && (
                        <button disabled className="button-orange-small">
                          InActive
                        </button>
                      )}
                      {currentEmployee.statusId === 1 && (
                        <button disabled className="button-green-small">{`Active`}</button>
                      )}
                      {currentEmployee.statusId === 2 && (
                        <button disabled className="button-red-small">
                          Terminated
                        </button>
                      )}
                    </div>
                    <h6 className="mt-3 fw-semibold">Employed for 5 years, 11 months</h6>
                  </div>
                  <div className="h6">
                    <div className="d-flex gap-2">
                      <div className="text-gray-light d-flex flex-column gap-2 ">
                        <div>
                          <span className="fw-semibold">Position</span>
                        </div>
                        <div>
                          <span className="fw-semibold">Departments</span>
                        </div>
                        <div>
                          <span className="fw-semibold">Site/Office Location</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span className="fw-semibold">Guard</span>
                        </div>
                        <div>
                          <span className="fw-semibold">Security</span>
                        </div>
                        <div>
                          <span className="fw-semibold">Hong Kong</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column mt-4 gap-3">
                      <div className="d-flex align-items-center  gap-2 ">
                        <BsTelephoneFill className="text-gray-light" size={18} />
                        <span className="m-0">(852) 6432 1846</span>
                      </div>
                      <div className="d-flex  gap-2">
                        <GrMail className="text-gray-light" size={20} />
                        <span className="text-decoration-underline">
                          {currentEmployee.personalEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex flex-lg-column gap-2 font-sm flex-md-row flex-wrap">
                <div className="d-flex justify-content-end gap-2">
                  <button className="button-primary pl-2" onClick={handleEditProfile}>
                    Edit
                  </button>
                  <button className="button-outline-primary" onClick={handleEditStatus}>
                    Status
                  </button>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="button-dark" onClick={handleRemoveProfile}>
                    Remove
                  </button>
                  <button className="button-primary-light">Print</button>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Section */}
          <div className="mt-5 d-flex align-items-center flex-wrap gap-sm-1">
            {tabs.map((tab, index) => (
              <div
                key={index}
                style={activeKey === index ? active : inActive}
                className="profile-tabs"
                onClick={(e) => handleClick(e, index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <div className="mt-5">{tabSwitch()}</div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Index
