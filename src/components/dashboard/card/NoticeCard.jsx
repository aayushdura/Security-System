import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbCalendarStats } from 'react-icons/tb'

const NoticeCard = () => {
  return (
    <div className="dashboard-card dashboard-card-notice">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <TbCalendarStats className="text-muted" size={18} />
          <h5 className="m-0">Notice</h5>
        </div>
        <div>
          <GiHamburgerMenu className="text-primary" size={20} />
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>No Notice Found</strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeCard
