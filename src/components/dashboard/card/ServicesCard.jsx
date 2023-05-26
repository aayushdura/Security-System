import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

const ServiceCard = () => {
  return (
    <div className="dashboard-card dashboard-card-service">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <AiOutlineSetting className="text-muted" size={18} />
          <h5 className="m-0">Service</h5>
        </div>
        <div>
          <GiHamburgerMenu className="text-primary" size={20} />
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Service Name : Cleansing Service</strong>
            </h6>
            <p className="m-0">Bluesky Cleansing Service Company</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Service Name : Cleansing Service</strong>
            </h6>
            <p className="m-0">Bluesky Cleansing Service Company</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Service Name : Cleansing Service</strong>
            </h6>
            <p className="m-0">Bluesky Cleansing Service Company</p>
          </div>
          <div className="dashboard-card-item-tag">October 18, 2022</div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
