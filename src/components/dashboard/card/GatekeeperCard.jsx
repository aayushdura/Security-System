import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrUserPolice } from 'react-icons/gr'

const GatekeeperCard = () => {
  return (
    <div className="dashboard-card dashboard-card-gatekeeper">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-1">
          <GrUserPolice className="text-muted" size={18} />
          <h5 className="m-0">GateKeeper</h5>
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-item">
          <div className="d-flex flex-column ">
            <h6 className="m-0 mb-1">
              <strong>Gatekeeper Name : Kelvin Fok</strong>
            </h6>
          </div>
          <div className="dashboard-card-item-tag">Entrance A</div>
        </div>
      </div>
    </div>
  )
}

export default GatekeeperCard
