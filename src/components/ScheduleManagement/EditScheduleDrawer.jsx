import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { request } from 'src/utils/requests'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'

const EditScheduleDrawer = ({ OpenDrawer, setOpenDrawer }) => {
  const [showSiteCodeEditor, setShowSiteCodeEditor] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [listOfSites, setListOfSites] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentEmployee } = useSelector((state) => state.employee)

  const { handleChange, handleSubmit, setFieldValue, isSubmitting, values, isValid } = useFormik({
    initialValues: {
      employeeGuid: currentEmployee?.employeeGuid,
      rosterDate: '2023-03-13T08:36:32.743Z',
      siteCode: '',
      siteAreaCode: '',
      postPointCode: '',
      beginSequence: '',
      truncateSequence: '',
    },
    onSubmit: async () => {
      if (isValid) {
        try {
          let res = await request.createRosterPlanning(values)
          res.data && toast.success('Site Code Added Succesfully')
          setShowSiteCodeEditor(false)
        } catch (err) {
          console.log(err)
          toast.error('Could Not Add Site Code')
          setShowSiteCodeEditor(false)
        }
      }
    },
  })

  let [debouncedQuery] = useDebounce(searchQuery, 1000)

  const handleSiteCodeSearch = (e) => {
    if (e.target.value?.length < 0) return
    setSearchQuery(e.target.value)
  }

  useEffect(async () => {
    setLoading(true)
    let params = { SiteCode: debouncedQuery ? debouncedQuery : null }
    try {
      let res = await request.getAllSites({ params })
      setListOfSites(res.data?.location)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [debouncedQuery])

  return (
    <Drawer anchor="right" onClose={() => setOpenDrawer(false)} open={OpenDrawer}>
      <div className="drawer-header">
        <h5 className="fw-bold m-0 text-capitalize">Edit Schedule</h5>
      </div>
      <div className="drawer-body fw-bold mx-4">
        {!showSiteCodeEditor ? (
          <>
            {' '}
            <CRow className="py-4 pe-2 ps-2 gap-4 align-items-center">
              <CCol className="d-flex gap-2">
                <span>EmployeeCode :</span>
                <span>{currentEmployee?.employeeCode ? currentEmployee?.employeeCode : '---'}</span>
              </CCol>
              <CCol className="d-flex gap-2">
                <span className="fw-bold">EmployeeName :</span>
                <span className="fw-bold">
                  {currentEmployee?.firstName
                    ? `${currentEmployee?.firstName} ${currentEmployee?.lastName}`
                    : '---'}
                </span>
              </CCol>
            </CRow>
            <CRow className="py-4 pe-5 ps-2 gap-4 ">
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>SiteCode</span>
                <CFormSelect>
                  <option value={null}>{'All'}</option>
                  <option value={null}>{'Service1'}</option>
                  <option value={null}>{'Service2'}</option>
                  <option value={null}>{'Service3'}</option>
                  <option value={null}>{'Service4'}</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="pe-5 ps-2 gap-4 ">
              <CCol>
                <button
                  className="button-primary-light"
                  onClick={() => setShowSiteCodeEditor(true)}
                >
                  Add
                </button>
              </CCol>
            </CRow>
            <CTable align="middle" className="mt-4 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Begin Sequence</CTableHeaderCell>
                  <CTableHeaderCell>Truncate Sequence</CTableHeaderCell>
                  <CTableHeaderCell>SiteCode</CTableHeaderCell>
                  <CTableHeaderCell>SiteAreaCode</CTableHeaderCell>
                  <CTableHeaderCell>PostpointCode</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell>01/12/2022</CTableDataCell>
                  <CTableDataCell>10/12/2022</CTableDataCell>
                  <CTableDataCell
                    className="text-center fw-bold text-primary text-decoration-underline "
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/schedule/schedule-details')}
                  >
                    SERVICE1
                  </CTableDataCell>
                  <CTableDataCell>AOO</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                </CTableRow>
                <CTableRow className="border-bottom-1">
                  <CTableDataCell>01/12/2022</CTableDataCell>
                  <CTableDataCell>10/12/2022</CTableDataCell>
                  <CTableDataCell
                    className="text-center fw-bold text-primary text-decoration-underline "
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/schedule/schedule-details')}
                  >
                    SERVICE1
                  </CTableDataCell>
                  <CTableDataCell>AOO</CTableDataCell>
                  <CTableDataCell>---</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </>
        ) : (
          <>
            <CRow className="py-4 pe-2 ps-2 gap-3 align-items-center">
              <CCol className="d-flex gap-2">
                <span>EmployeeCode :</span>
                <span>{currentEmployee?.employeeCode ? currentEmployee?.employeeCode : '---'}</span>
              </CCol>
              <CCol className="d-flex gap-2">
                <span className="fw-bold">EmployeeName :</span>
                <span className="fw-bold">
                  {currentEmployee?.firstName
                    ? `${currentEmployee?.firstName} ${currentEmployee?.lastName}`
                    : '---'}
                </span>
              </CCol>
            </CRow>
            <CRow className="py-4 pe-5 ps-2 gap-4 ">
              <CCol className="d-flex gap-2 align-items-center">
                <span>SiteCode</span>
                <CFormInput onChange={(e) => handleSiteCodeSearch(e)} />
              </CCol>
            </CRow>
            <CTable align="middle" className="my-4 fw-semibold border" responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell></CTableHeaderCell>
                  <CTableHeaderCell>SiteCode</CTableHeaderCell>
                  <CTableHeaderCell>SiteName</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Working Employees</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {!loading ? (
                  listOfSites.length > 0 &&
                  listOfSites.map((site, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <CFormCheck
                          type="radio"
                          value={site.siteCode}
                          onChange={handleChange}
                          name="siteCode"
                        />
                      </CTableDataCell>
                      <CTableDataCell>{site.siteCode}</CTableDataCell>
                      <CTableDataCell>{site.siteName}</CTableDataCell>
                      <CTableDataCell>{site.siteType}</CTableDataCell>
                      <CTableDataCell>{site?.workingEmployees}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell />
                    <CTableDataCell />
                    <CTableDataCell />
                    <CTableDataCell>
                      <TailSpin
                        height="80"
                        width="80"
                        color="#6100ff"
                        ariaLabel="tail-spin-loading"
                        wrapperClass=""
                        visible={true}
                      />
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            <CRow className="my-3">
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>SiteArea Code</span>
                <CFormSelect
                  id="siteareacode"
                  onChange={(e) => {
                    if (e) {
                      setFieldValue('siteareacode', e.target.value)
                    }
                  }}
                  value={values.siteAreaCode}
                >
                  <option value={null}>{'A00'}</option>
                  <option value={null}>{'A01'}</option>
                  <option value={null}>{'A02'}</option>
                  <option value={null}>{'A03'}</option>
                </CFormSelect>
              </CCol>
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>PostPointCode</span>
                <CFormSelect>
                  <option value={null}>{'A00'}</option>
                  <option value={null}>{'A01'}</option>
                  <option value={null}>{'A02'}</option>
                  <option value={null}>{'A03'}</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>Begin Sequence</span>
                <CFormInput
                  type="date"
                  id="beginSequence"
                  value={values.beginSequence}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" className="d-flex gap-2 align-items-center">
                <span>Truncate Sequence</span>
                <CFormInput
                  type="date"
                  id="truncateSequence"
                  value={values.truncateSequence}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          </>
        )}
      </div>
      <div className="drawer-footer">
        {!showSiteCodeEditor ? (
          <button className="button-gray-light" type="button" onClick={() => setOpenDrawer(false)}>
            Close
          </button>
        ) : (
          <>
            <button
              className="button-gray-light"
              type="button"
              onClick={() => setShowSiteCodeEditor(false)}
            >
              Cancel
            </button>
            <button
              className={
                isSubmitting
                  ? `button-primary-light d-flex justify-content-between align-items-center`
                  : `button-primary-light`
              }
              disabled={isSubmitting}
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          </>
        )}
        {/* {
          <button
            className={
              loading
                ? `button-primary-light d-flex justify-content-between align-items-center`
                : `button-primary-light`
            }
            type="submit"
          >
            Save
            {loading && (
              <TailSpin
                height="20"
                width="30"
                color="white"
                ariaLabel="tail-spin-loading"
                wrapperClass=""
                visible={true}
              />
            )}
          </button>
        } 
        */}
      </div>
    </Drawer>
  )
}

export default EditScheduleDrawer

EditScheduleDrawer.propTypes = {
  OpenDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
  EmployeeCode: PropTypes.string,
}
