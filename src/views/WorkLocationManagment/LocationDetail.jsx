import { CCard, CCardBody, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsTelephoneFill } from 'react-icons/bs'
import { FiChevronLeft } from 'react-icons/fi'
import { GrMail } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AddWorkLocationModal from 'src/components/WorkLocation/AddLocationForms/AddWorkLocationModal'

import Document from 'src/components/WorkLocation/InfoSections/document'
import GeneralInfo from 'src/components/WorkLocation/InfoSections/generalInfo'
import WorkingEmployees from 'src/components/WorkLocation/InfoSections/workingEmployees'
import {
  getAllContactPersons,
  getAllPropEquipInfo,
  getAllWorkLocations,
  getSingleWorkLocation,
  getWorkDocuments,
} from 'src/features/WorkLocation/apiCalls'
import { request } from 'src/utils/requests'
import { workLocationTabs } from 'src/utils/staticData'
import addImage from '../../assets/images/addimage.png'
import SiteScheduleDetails from '../SchedultManagement/SiteScheduleDetails'

const LocationDetail = () => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  const [removeModalShow, setRemoveModalShow] = useState(false)
  const { currentLocation } = useSelector((state) => state.workLocation)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const handleClick = (e, index) => {
    setActiveKey(index)
  }
  const tabSwitch = () => {
    switch (activeKey) {
      case 0:
        return <GeneralInfo />
      case 1:
        return <SiteScheduleDetails />
      case 2:
        return <WorkingEmployees />
      case 3:
        return <Document />
      default:
        return <GeneralInfo />
    }
  }
  const handleTerminate = () => {}
  const handleEditProfile = () => {
    // toast.loading('Working on it', { duration: '200' })
    setShowEditForm(true)
  }
  const handleRemove = async () => {
    try {
      let res = await request.deleteSite(params?.id)
      if (res.data) {
        toast.success('Successfully Deleted 1 Site')
        dispatch(getAllWorkLocations())
        navigate(-1)
        setRemoveModalShow(false)
      }
    } catch (err) {
      console.log(err)
      toast.error('Could not Delete')
      setRemoveModalShow(false)
    }
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
  useEffect(() => {
    dispatch(getSingleWorkLocation(params?.id))
    dispatch(getAllContactPersons(params?.id))
    dispatch(getAllPropEquipInfo(params?.id))
    dispatch(getWorkDocuments(params?.id))
  }, [dispatch, params?.id])

  return (
    <>
      <>
        <AddWorkLocationModal
          formType="edit"
          ShowForm={showEditForm}
          setShowForm={setShowEditForm}
        />
      </>
      <>
        <CModal
          alignment="center"
          visible={removeModalShow}
          onClose={() => setRemoveModalShow(false)}
        >
          <CModalHeader onClose={() => setRemoveModalShow(false)}>
            <h3>Remove Profile ?</h3>
          </CModalHeader>
          <CModalBody>Are you sure you want to remove current site ?</CModalBody>
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
      <h4 className="d-flex">
        <FiChevronLeft
          className="me-3"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />{' '}
        Work Site Details
      </h4>
      <CCard className="mt-3 px-2 py-1">
        <CCardBody>
          {/* Employee Photo and detail Section */}
          <div className="d-flex justify-content-between flex-wrap gap-md-4 gap-sm-4">
            <div className="flex-grow-1">
              <div className="d-flex gap-4 flex-wrap">
                <div>
                  <img
                    src={currentLocation?.pictureModel?.pictureUrl ?? addImage}
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
                      {currentLocation?.siteName ? (
                        <h3>{`${currentLocation.siteName}`}</h3>
                      ) : (
                        '- - - '
                      )}
                      {currentLocation?.status === 0 && (
                        <button disabled className="button-orange-small">
                          InActive
                        </button>
                      )}
                      {currentLocation?.status === 1 && (
                        <button disabled className="button-green-small">{`Active`}</button>
                      )}
                      {currentLocation?.status === 2 && (
                        <button disabled className="button-red-small">
                          Terminated
                        </button>
                      )}
                    </div>
                    <h6 className="mt-3 fw-semibold">{currentLocation?.fullAddress}</h6>
                  </div>
                  <div className="h6">
                    <div className="d-flex gap-2">
                      <div className="text-gray-light d-flex flex-column gap-2 ">
                        <div>
                          <span className="fw-semibold">Type</span>
                        </div>
                        <div>
                          <span className="fw-semibold">District</span>
                        </div>
                        <div>
                          <span className="fw-semibold">Contact Person</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <div>
                          <span className="fw-semibold text-capitalize">
                            {currentLocation?.siteType ? currentLocation?.siteType : '- - - '}
                          </span>
                        </div>
                        <div>
                          <span className="fw-semibold text-capitalize">
                            {currentLocation?.district ? currentLocation?.district : '- - - '}
                          </span>
                        </div>
                        <div>
                          <span className="fw-semibold text-capitalize">
                            {currentLocation?.contactPerson
                              ? currentLocation?.contactPerson
                              : '- - - '}
                          </span>
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
                          {currentLocation?.personalEmail}
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
                  <button className="button-outline-primary" onClick={handleTerminate}>
                    Terminate
                  </button>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="button-dark" onClick={() => setRemoveModalShow(true)}>
                    Remove
                  </button>
                  <button className="button-primary-light">Print</button>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Section */}
          <div className="mt-5 d-flex align-items-center flex-wrap gap-sm-1">
            {workLocationTabs.map((tab, index) => (
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
    </>
  )
}

export default LocationDetail
