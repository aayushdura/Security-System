import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'

const Register = () => {
  const { values, handleChange, handleSubmit, isSubmitting, isValid } = useFormik({
    initialValues: {
      loginName: '',
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async () => {
      if (isValid) {
        try {
          let res = await request.registerNewUser(values)
          console.log(res.data)
          toast.success('Registered Successfully')
        } catch (error) {
          console.log(error)
          toast.error('Failed To Register')
        }
      }
    },
  })
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name"
                      id="firstName"
                      autoComplete="first name"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last Name"
                      id="lastName"
                      autoComplete="last name"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      id="loginName"
                      autoComplete="username"
                      value={values.loginName}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <div>
                    <p className="text-center">
                      {' '}
                      Already Have am Account? Please{' '}
                      <Link className="text-decoration-underline text-primary" to="/login">
                        Log in
                      </Link>
                    </p>
                  </div>
                  <div className="d-grid">
                    <CButton
                      className="d-flex justify-content-center"
                      color="success"
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <TailSpin height={22} color={'white'} visible={true} />
                      ) : (
                        'Create Account'
                      )}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
