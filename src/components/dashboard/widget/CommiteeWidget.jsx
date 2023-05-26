import React from 'react'

const CommiteeWidget = () => {
  return (
    <div className="dashboard-widget dashboard-widget-commitee dashboard-widget-border-blue">
      <div className="dashboard-widget-info p-3">
        <h1 className="m-0">2</h1>
        <span className="m-0 lh-1">Commitee Members</span>
      </div>
      <div className="dashboard-widget-image-container">
        <img src="/images/commitee.png" alt="commitee" />
      </div>
    </div>
  )
}

export default CommiteeWidget
