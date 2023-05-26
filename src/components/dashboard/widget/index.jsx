import { CCol, CRow } from '@coreui/react'
import React from 'react'
import BuildingWidget from './BuildingWidget'
import CommiteeWidget from './CommiteeWidget'
import MemberWidget from './MemberWidget'
import MessageWidget from './MessageWidget'

const DashboardWidgets = () => {
  return (
    <div>
      <CRow className="gy-3 mb-4">
        <CCol sm="6" lg="3">
          <MemberWidget />
        </CCol>
        <CCol sm="6" lg="3">
          <CommiteeWidget />
        </CCol>
        <CCol sm="6" lg="3">
          <BuildingWidget />
        </CCol>
        <CCol sm="6" lg="3">
          <MessageWidget />
        </CCol>
      </CRow>
    </div>
  )
}

export default DashboardWidgets
