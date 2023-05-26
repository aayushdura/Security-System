import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { isLoggedIn } from 'src/utils/helpers'
import { useSelector } from 'react-redux'

const AppContent = () => {
  const { pathname } = useLocation()
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser && !isLoggedIn()) {
      navigate('/login')
    }
  }, [pathname])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    route.isPrivate ? (
                      isLoggedIn() ? (
                        <route.element />
                      ) : (
                        <Navigate to="/login" />
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
