import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div></div>
      <div className="ms-auto">
        <a href="/#" target="_blank" rel="noopener noreferrer">
          Bluesky Security System
        </a>
        <span className="ms-1">&copy; 2022 Blue Sky.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
