import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { isLoggedIn } from 'src/utils/helpers'
import { TailSpin } from 'react-loader-spinner'
import api from 'src/services/api'
import { loginFailure, loginStart, loginSuccess } from 'src/features/user/userSlice'

const Login = () => {
  const [user, setUser] = useState({
    email: 'admin@blueskyio.com',
    password: 'password',
  })

  const { isFetching } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = async () => {
    dispatch(loginStart())
    try {
      let res = await api.post('/users/authenticate', user)
      if (res.data.jwtToken) {
        let userCreds = {
          email: res.data.email,
          userGuid: res.data.userGuid,
          isVerified: res.data.isVerify,
          role: res.data.role,
        }
        dispatch(loginSuccess(userCreds))
        sessionStorage.setItem('accessToken', res.data.jwtToken)
        toast.success('Login successful')
        navigate('/dashboard')
      }
    } catch (err) {
      toast.error('Login Failed Due to Some Error, Please check console for further details')
      dispatch(loginFailure())
      console.log(err)
    }
  }

  useEffect(() => {
    if (isLoggedIn()) navigate('/dashboard')
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center px-5">
          <CCol className="col-lg-4 p-0 col-sm-8">
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          email: e.target.value,
                        })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={user.password}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          password: e.target.value,
                        })
                      }}
                    />
                  </CInputGroup>
                  <CRow className="align-items-center">
                    <CCol xs={4}>
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={handleLogin}
                        disabled={isFetching}
                      >
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={4} className="ps-4 pe-0">
                      {isFetching && (
                        <TailSpin
                          height="60"
                          width="60"
                          color="#6100ff"
                          ariaLabel="tail-spin-loading"
                          wrapperClass=""
                          visible={true}
                        />
                      )}
                    </CCol>
                    <CCol xs={4} className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="col-lg-4 p-0 col-sm-8">
            <CCard className="text-white bg-primary py-5 h-100">
              <CCardBody className="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p className="mt-3">
                    Don`t have an account? Please register to now in order to login
                  </p>
                  <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>
                      Register Now!
                    </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
