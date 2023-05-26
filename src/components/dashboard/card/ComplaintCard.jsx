import React from 'react'
import { BiPhoneCall } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'

const ComplaintCard = () => {
  return (
    <div className="dashboard-card dashboard-card-complaint">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <BiPhoneCall className="text-muted" size={18} />
          <h5 className="m-0">Complaint</h5>
        </div>
        <div>
          <GiHamburgerMenu className="text-primary" size={20} />
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Complaint Title : Impolite Tenant</strong>
            </h6>
            <p className="m-0">Description : Shout at me loudly</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Complaint Title : Impolite Tenant</strong>
            </h6>
            <p className="m-0">Description : Shout at me loudly</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Complaint Title : Impolite Tenant</strong>
            </h6>
            <p className="m-0">Description : Shout at me loudly</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintCard
