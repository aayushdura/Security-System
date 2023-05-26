import React, { useState } from 'react'
import { CCol, CCollapse, CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCaretTop } from '@coreui/icons'
const InfoTable = () => {
  const [visible, setVisible] = useState(true)
  return (
    <CContainer className="mt-4">
      <CRow className="border">
        <CRow>
          <CCol>Basic Info</CCol>
          <CCol>
            <CIcon onClick={() => setVisible(!visible)} icon={cilCaretTop} size="sm" />
          </CCol>
        </CRow>
        <CRow className="border">
          <CCollapse visible={visible}>
            {/* use table */}
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
            squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident.
          </CCollapse>
        </CRow>
      </CRow>
    </CContainer>
  )
}

export default InfoTable
