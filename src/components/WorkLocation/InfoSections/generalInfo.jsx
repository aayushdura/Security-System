import { CCollapse, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import AddContactPerson from '../AddLocationForms/AddContactPerson'
import AddPropEquipInfo from '../AddLocationForms/AddPropEquipInfo'

const GeneralInfo = () => {
  const { currentLocation, contactPersons, propEquipInfo } = useSelector(
    (state) => state.workLocation,
  )
  const [collapseVisible, setCollapseVisible] = useState({
    basicInfo: true,
    contactPerson: true,
    propEquipment: true,
  })
  const [showAddContactPerson, setShowAddContactPerson] = useState(false)
  const [showAddPropEquipInfo, setShowAddPropEqipInfo] = useState(false)
  return (
    <>
      {/* Basic Info  */}
      <div className="fs-6 fw-bold border">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Basic Info</span>
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
        <CCollapse visible={collapseVisible.basicInfo}>
          <div className="row d-flex ps-4 py-3 pe-3 text-capitalize">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Site Name</div>:
                <div className="col">
                  {currentLocation?.siteName ? currentLocation.siteName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Site Type</div>:
                <div className="col">
                  {currentLocation?.siteType ? currentLocation.siteType : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Site ID</div>:
                <div className="col">
                  {currentLocation?.siteId ? currentLocation.siteId : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Storey</div>:
                <div className="col">
                  {currentLocation?.storey ? currentLocation.storey : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Room per storey</div>:
                <div className="col">
                  {currentLocation?.roomPerStorey ? currentLocation.roomPerStorey : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">District</div>:
                <div className="col">
                  {currentLocation?.district ? currentLocation.district : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Full Address</div>:
                <div className="col">
                  {currentLocation?.fullAddress ? currentLocation.fullAddress : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Service Hour</div>:
                <div className="col">
                  {currentLocation?.serviceHour ? currentLocation.serviceHour : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Status</div>:
                <div className="col">
                  {currentLocation?.status ? currentLocation.status : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Contact Person */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Contact Person</span>
          <span>
            {collapseVisible.contactPerson ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      contactPerson: !collapseVisible.contactPerson,
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
                      contactPerson: !collapseVisible.contactPerson,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.contactPerson}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Name</CTableDataCell>
                  <CTableDataCell>Phone Number</CTableDataCell>
                  <CTableDataCell>Email Account</CTableDataCell>
                  <CTableDataCell>Description</CTableDataCell>
                </CTableRow>
                {contactPersons?.length > 0 &&
                  contactPersons.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-3 align-items-center"
                    >
                      <CTableDataCell>{item.name ? item.name : '---'}</CTableDataCell>
                      <CTableDataCell>{item.phoneNumber ? item.phoneNumber : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item.emailAccount ? item.emailAccount : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.description ? item.description : '---'}</CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3 "
                onClick={() => setShowAddContactPerson(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddContactPerson visible={showAddContactPerson} setVisible={setShowAddContactPerson} />
        </>
      </div>
      {/* Property and EquipmentInfo */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Property & Equipment Info</span>
          <span>
            {collapseVisible.propEquipment ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      propEquipment: !collapseVisible.propEquipment,
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
                      propEquipment: !collapseVisible.propEquipment,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.propEquipment}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Name</CTableDataCell>
                  <CTableDataCell>Amount</CTableDataCell>
                  <CTableDataCell>Type</CTableDataCell>
                  <CTableDataCell>Description</CTableDataCell>
                </CTableRow>
                {propEquipInfo?.length > 0 &&
                  propEquipInfo.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-3 align-items-center"
                    >
                      <CTableDataCell>{item.name ? item.name : '---'}</CTableDataCell>
                      <CTableDataCell>{item.amount ? item.amount : '---'}</CTableDataCell>
                      <CTableDataCell className="text-capitalize">
                        {item.type ? item.type : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.description ? item.description : '---'}</CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3 " onClick={() => setShowAddPropEqipInfo(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddPropEquipInfo visible={showAddPropEquipInfo} setVisible={setShowAddPropEqipInfo} />
        </>
      </div>
    </>
  )
}

export default GeneralInfo
