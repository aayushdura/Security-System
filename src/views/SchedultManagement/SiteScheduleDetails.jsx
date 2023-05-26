import { CCard, CCardBody, CCol, CFormSelect, CRow } from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EditSiteScheduleDrawer from 'src/components/ScheduleManagement/EditSiteScheduleDrawer'
import CalendarChart from 'src/components/ScheduleManagement/Chart'
import Tab from 'src/components/Tab/Tab'

const SiteScheduleDetails = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  const tabTitle = ['view by location', 'details by location', 'statistics by location']
  return (
    <>
      <>
        <EditSiteScheduleDrawer OpenDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </>
      <CRow className="my-3 align-items-center justify-content-between">
        <CCol sm={'auto'} className="d-flex text-capitalize fw-bold gap-4">
          {tabTitle.map((tab, index) => (
            <Tab
              title={tab}
              key={index}
              style={activeKey === index ? { borderBottom: '3px solid' } : {}}
              handleClick={() => setActiveKey(index)}
            />
          ))}
        </CCol>
        <CCol sm={'auto'}>
          <button
            className="button-primary-fit-content px-5"
            type="button"
            onClick={() => setOpenDrawer(true)}
          >
            Edit Schedule
          </button>
        </CCol>
      </CRow>
      <CRow className="m-0 p-0">
        <CCard>
          <CCardBody>
            <CRow></CRow>
            <CalendarChart />
          </CCardBody>
        </CCard>
      </CRow>
    </>
  )
}

export default SiteScheduleDetails
