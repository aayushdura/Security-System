import { CCol, CRow } from '@coreui/react'
import React from 'react'
import Paginator from './Paginator'

const TableFooter = ({ selectedData, handleNextPage, handlePerPage, totalNoOfData }) => {
  return (
    <CRow className="justify-content-end align-items-center mt-2">
      <CCol>
        {selectedData > 0 ? (
          <span> {selectedData} item selected</span>
        ) : (
          <span> No item selected</span>
        )}
      </CCol>
      <CCol sm="auto">
        <Paginator
          changePage={handleNextPage}
          changePerPage={handlePerPage}
          totalData={totalNoOfData}
        />
      </CCol>
    </CRow>
  )
}

export default TableFooter
