import React, { Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import './scss/style.scss'
import { Toaster } from 'react-hot-toast'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/login/Login'))
const Register = React.lazy(() => import('./views/Pages/register/Register'))
const Page404 = React.lazy(() => import('./views/Pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/page500/Page500'))

function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </HashRouter>
  )
}

export default App
