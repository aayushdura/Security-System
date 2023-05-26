import React from 'react'

const MessageWidget = () => {
  return (
    <div className="dashboard-widget dashboard-widget-message dashboard-widget-border-blue">
      <div className="dashboard-widget-info p-3">
        <h1 className="m-0">2</h1>
        <span className=" m-0 lh-1">Message</span>
      </div>
      <div className="dashboard-widget-image-container">
        <img src="/images/message.png" alt="message" />
      </div>
    </div>
  )
}

export default MessageWidget
