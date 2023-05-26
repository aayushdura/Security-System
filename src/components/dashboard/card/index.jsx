import { CCol, CRow } from '@coreui/react'
import React from 'react'
import BuildingUnit from './BuildingUnitCard'
import CalendarCard from './CalendarCard'
import ComplaintCard from './ComplaintCard'
import GatekeeperCard from './GatekeeperCard'
import InvoiceCard from './invoiceCard'
import NoticeCard from './NoticeCard'
import ServiceCard from './ServicesCard'

const DashboardCards = () => {
  return (
    <div>
      <CRow className="gy-3 mb-4">
        <CCol lg="6">
          <NoticeCard />
        </CCol>
        <CCol lg="6">
          <BuildingUnit />
        </CCol>
        <CCol lg="6">
          <ComplaintCard />
        </CCol>
        <CCol lg="6">
          <ServiceCard />
        </CCol>
        <CCol lg="6">
          <CalendarCard />
        </CCol>
        <CCol lg="6">
          <div className="d-flex flex-column gap-3  h-100">
            <div>
              <GatekeeperCard />
            </div>
            <div className="flex-grow-1 ">
              <InvoiceCard />
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  )
}

export default DashboardCards
