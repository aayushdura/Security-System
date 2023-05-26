import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrUserPolice } from 'react-icons/gr'
import { TbFileInvoice } from 'react-icons/tb'

const InvoiceCard = () => {
  const columns = [
    {
      key: 'id',
      label: 'Invoice No',
      _props: { scope: 'col' },
    },
    {
      key: 'member',
      label: 'Member Name',
      _props: { scope: 'col' },
    },
    {
      key: 'amount',
      label: 'Total Amount',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Heading',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      member: 'Mark',
      amount: 'Otto',
      status: <p>123</p>,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      member: 'Jacob',
      amount: 'Thornton',
      status: '@fat',
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <div className="dashboard-card dashboard-card-invoice">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <TbFileInvoice className="text-muted" size={20} />
          <h5 className="m-0">Invoice</h5>
        </div>
        <div>
          <GiHamburgerMenu className="text-primary" size={20} />
        </div>
      </div>
      <div className="dashboard-card-body font-base">
        {/* <CTable columns={columns} items={items} /> */}
        <CTable hover borderColor="light">
          <CTableHead>
            <CTableRow
              style={{
                borderBottom: 'hidden',
              }}
            >
              <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>DAS00001</CTableDataCell>
              <CTableDataCell>Dobby Poon</CTableDataCell>
              <CTableDataCell>69</CTableDataCell>
              <CTableDataCell>
                <span className="dashboard-card-item-green-tag">Unpaid</span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>DAS00002</CTableDataCell>
              <CTableDataCell>Yuen Xan</CTableDataCell>
              <CTableDataCell>86</CTableDataCell>
              <CTableDataCell>
                <span className="dashboard-card-item-green-tag">Unpaid</span>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        {/* <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>No invoice</strong>
            </h6>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default InvoiceCard
