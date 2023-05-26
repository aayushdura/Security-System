import React from 'react'

// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { getUser, logout } from 'src/features/user/apiCalls'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div className="">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-3 mt-4">
          <AppContent />
        </div>
        <div className="mt-4">
          <AppFooter />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
