import { CFormSelect } from '@coreui/react'
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
const Paginator = ({ totalData, changePage, changePerPage }) => {
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  useMemo(() => {
    let tempTotalPage = totalData > 1 ? Math.ceil(totalData / perPage) : 1
    setTotalPages(tempTotalPage)
  }, [perPage, totalData])
  return (
    <div className="d-flex justify-content-start gap-4 fw-bolder">
      <div className="d-flex align-items-center gap-2">
        <span className="text-nowrap">Per Page</span>
        <CFormSelect
          className="fw-bolder"
          value={perPage}
          onChange={(e) => {
            if (e) {
              setPerPage(parseInt(e.target.value))
              changePerPage(e.target.value)
            }
          }}
        >
          <option className="fw-bolder" value={10}>
            10
          </option>
          <option className="fw-bolder" value={20}>
            20
          </option>
          <option className="fw-bolder" value={50}>
            50
          </option>
          <option className="fw-bolder" value={100}>
            100
          </option>
        </CFormSelect>
      </div>
      <div>
        <CFormSelect
          className="fw-bolder"
          onChange={(e) => {
            if (e) {
              setCurrentPage(parseInt(e.target.value))
              changePage(parseInt(e.target.value))
            }
          }}
          value={currentPage}
        >
          {[...Array(totalPages)].map((page, i) => (
            <option key={i} className="fw-bolder" value={i}>
              {i + 1} / {totalPages}
            </option>
          ))}
        </CFormSelect>
      </div>
    </div>
  )
}

export default Paginator

Paginator.propTypes = {
  totalData: PropTypes.number,
  changePage: PropTypes.func,
  changePerPage: PropTypes.func,
}
