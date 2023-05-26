import React from 'react'

const BuildingWidget = () => {
  return (
    <div className="dashboard-widget dashboard-widget-building dashboard-widget-border-blue">
      <div className="dashboard-widget-info p-3">
        <h1 className="m-0">5</h1>
        <span className=" m-0 lh-1">Buildings</span>
      </div>
      <div className="dashboard-widget-image-container">
        <img src="/images/building.png" alt="buildings" />
      </div>
    </div>
  )
}

export default BuildingWidget
