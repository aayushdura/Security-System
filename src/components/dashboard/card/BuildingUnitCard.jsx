import React from 'react'
import { BsBuilding } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

const BuildingUnit = () => {
  return (
    <div className="dashboard-card dashboard-card-building">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <BsBuilding className="text-muted" size={18} />
          <h5 className="m-0">Buildings Units</h5>
        </div>
        <div>
          <GiHamburgerMenu className="text-primary" size={20} />
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>No Building Units Found</strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildingUnit
