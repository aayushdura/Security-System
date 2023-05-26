import React from 'react'

const MemberWidget = () => {
  return (
    <div className="dashboard-widget dashboard-widget-member dashboard-widget-border-blue">
      <div className="dashboard-widget-info p-3">
        <h1 className="m-0">25</h1>
        <span className=" m-0 ">Members</span>
      </div>
      <div className="dashboard-widget-image-container">
        <img src="/images/members.png" alt="member" />
      </div>
    </div>
  )
}

export default MemberWidget
