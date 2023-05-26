import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'

// sidebar nav config
import navigation from '../_nav'
import logo from 'src/assets/images/logo.png'
import { logout } from 'src/features/user/apiCalls'
import { useNavigate } from 'react-router-dom'
import { request } from 'src/utils/requests'
import { loginFailure, setCurrentUser } from 'src/features/user/userSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { unfoldable } = useSelector((state) => state.dashboard)
  const { sidebarShow } = useSelector((state) => state.dashboard)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let res = await request.getUserInfo()
        if (res.data?.isVerify === true) {
          dispatch(setCurrentUser(res.data))
        } else {
          dispatch(logout())
          navigate('/login')
        }
      } catch (error) {
        dispatch(loginFailure())
        navigate('/login')
      }
    }
    let checkUserAuth = setInterval(() => {
      getUserInfo()
    }, 300000)

    return () => clearInterval(checkUserAuth)
  }, [dispatch, navigate])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      className="custom-scrollbar"
    >
      <CSidebarBrand className="d-none d-md-flex px-3" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <img src={logo} height={40} alt="logo" />
        <span className="sidebar-title sidebar-brand-full">BLUESKY</span>
        {/* <span className="sidebar-brand-full">Property Management System</span> */}
      </CSidebarBrand>
      <CSidebarNav
        style={{
          overflowY: 'scroll',
        }}
      >
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setFoldableShow(!unfoldable))}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
