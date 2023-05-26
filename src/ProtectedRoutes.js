import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { isLoggedIn } from './utils/helpers'
// import PropTypes from 'prop-types'

const ProtectedRoutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes

// ProtectedRoutes.propTypes = {
//   component: PropTypes.object.isRequired,
//   path: PropTypes.string.isRequired,
//   name: PropTypes.string,
// }
