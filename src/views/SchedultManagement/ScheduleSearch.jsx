import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getScheduledEmployees } from 'src/features/schedule/apiCalls'

const ScheduleSearch = () => {
  const { scheduledEmployees, isFetching } = useSelector((state) => state.schedule)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [scheduleSearch, setScheduleSearch] = useState({
    EmployeeCode: '',
    EmployeeName: '',
    Position: '',
    SiteCode: '',
    SiteAreaCode: '',
    PostPointCode: '',
  })

  const searchScheduleInputs = [
    {
      id: 'EmployeeCode',
      label: 'EmployeeCode',
      inputType: 'text',
    },
    {
      id: 'EmployeeName',
      label: 'EmployeeName',
      inputType: 'text',
    },
    {
      id: 'Position',
      label: 'Position/Title',
      inputType: 'text',
    },
    {
      id: 'SiteCode',
      label: 'SiteCode',
      inputType: 'text',
    },
    {
      id: 'SiteAreaCode',
      label: 'SiteAreaCode',
      inputType: 'text',
    },
    {
      id: 'PostPointCode',
      label: 'PostPointCode',
      inputType: 'text',
    },
  ]

  const handleScheduleSearchInput = (e) => {
    const { name, value } = e.target
    setScheduleSearch({ ...scheduleSearch, [name]: value })
  }

  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    let params = { ...scheduleSearch }
    dispatch(getScheduledEmployees(params))
  }
  const handleReset = (e) => {
    e.preventDefault()
    setScheduleSearch({
      EmployeeCode: '',
      EmployeeName: '',
      Position: '',
      SiteCode: '',
      SiteAreaCode: '',
      PostPointCode: '',
    })
    dispatch(getScheduledEmployees())
  }
  useEffect(() => {
    dispatch(getScheduledEmployees())
  }, [dispatch])
  return (
    <div>
      <h4 className="mb-3">Schedule Search</h4>
      <CCard className="mb-4">
        <CCardBody className="p-4 ">
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {searchScheduleInputs.map((input, index) => {
              return (
                <CCol md="12" lg="6" xl="4" key={index}>
                  <CRow>
                    <CCol sm={5}>
                      <CFormLabel className="col-form-label">
                        <strong>{input.label}</strong>
                      </CFormLabel>
                    </CCol>
                    <CCol>
                      {input.inputType === 'text' ? (
                        <CFormInput
                          type="text"
                          name={input.id}
                          value={scheduleSearch[input.id]}
                          onChange={handleScheduleSearchInput}
                        />
                      ) : (
                        <CFormSelect
                          onChange={handleScheduleSearchInput}
                          className="text-capitalize"
                          name={input.id}
                          value={scheduleSearch[input.id]}
                        >
                          <option disabled defaultValue value={''}>
                            Select {input.name}
                          </option>
                          {input.options?.map((optionValue, index) => {
                            return (
                              <option value={optionValue} key={index}>
                                {optionValue}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      )}

                      {/* */}
                    </CCol>
                  </CRow>
                </CCol>
              )
            })}
            <div className="d-flex flex-row justify-content-center gap-2">
              <button className="button-primary" type="submit" onClick={handleFilterSubmit}>
                Search
              </button>
              <button className="button-gray" type="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <p className="mb-3">About 2 Results</p>

      <CCard>
        <CCardBody className="p-4">
          {!isFetching ? (
            <CTable className="border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>EmployeeCode</CTableHeaderCell>
                  <CTableHeaderCell>EmployeeName</CTableHeaderCell>
                  <CTableHeaderCell>Position/Title</CTableHeaderCell>
                  <CTableHeaderCell>SiteCode</CTableHeaderCell>
                  <CTableHeaderCell>SiteAreaCode</CTableHeaderCell>
                  <CTableHeaderCell>PostPointCode</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {scheduledEmployees.length > 0 &&
                  scheduledEmployees.map((emp) => (
                    <CTableRow key={emp.employeeGuid}>
                      <CTableDataCell
                        style={{ cursor: 'pointer' }}
                        className="fw-semibold text-primary"
                        onClick={() => navigate(`/employee-schedule/${emp.employeeCode}`)}
                      >
                        {emp.employeeCode}
                      </CTableDataCell>
                      <CTableDataCell>{emp.employeeName}</CTableDataCell>
                      <CTableDataCell>{emp.position}</CTableDataCell>
                      <CTableDataCell
                        style={{ cursor: 'pointer' }}
                        className="fw-semibold text-primary"
                        onClick={
                          // emp?.siteCode
                          () => navigate(`/schedule/schedule-details`)
                          // : () => {
                          // toast.error('Site Code is Not Assigned')
                          // }
                        }
                      >
                        {emp?.siteCode}
                      </CTableDataCell>
                      <CTableDataCell>{emp.siteAreaCode}</CTableDataCell>
                      <CTableDataCell>{emp.postPointCode}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '20rem' }}
            >
              <TailSpin
                height="80"
                width="80"
                color="#6100ff"
                ariaLabel="tail-spin-loading"
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ScheduleSearch
