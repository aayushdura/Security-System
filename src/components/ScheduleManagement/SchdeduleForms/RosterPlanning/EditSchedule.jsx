import {
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { RiAddBoxFill, RiCheckFill, RiDeleteBin4Fill } from 'react-icons/ri'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { fetchAllRosterSequence, fetchScheduleClass } from 'src/features/schedule/apiCalls'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { request } from 'src/utils/requests'

const EditScheduleFromDate = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const { rosterSequence } = useSelector((state) => state.rosterSequence)
  const { scheduleClass } = useSelector((state) => state.scheduleClass)
  const [siteList, setsiteList] = useState([])
  const [addedsite, setAddedsite] = useState([])
  const [classOption, setClassOption] = useState([])
  const [sequenceOption, setSequenceOption] = useState([])
  const [loading, setLoading] = useState(false)
  const [locCodeKey, setLocCodeKey] = useState('')
  const [locNameKey, setLocNameKey] = useState('')
  const [selectedSequence, setSelectedSequence] = useState([])
  const [debouncedName] = useDebounce(locNameKey, 800)
  const [debouncedCode] = useDebounce(locCodeKey, 800)
  const { handleChange, handleSubmit, setFieldValue, isSubmitting, values } = useFormik({
    initialValues: {
      from: '',
      to: '',
      type: '',
      class: '',
      sequence: '',
      day: '',
    },
    onSubmit: () => {},
  })
  async function searchSite() {
    setLoading(true)
    let params = {
      SiteName: debouncedName ? debouncedName : null,
      SiteCode: debouncedCode ? debouncedCode : null,
    }
    try {
      let res = await request.getAllSites({ params })
      setsiteList(res.data?.location?.slice(0, 4))
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const handleAddsites = (site) => {
    setAddedsite([...addedsite, site])
  }
  const handleRemoveSites = (site) => {
    let filteredMembers = addedsite.filter((s) => s.siteCode !== site.siteCode)
    setAddedsite(filteredMembers)
  }
  useMemo(() => {
    if (rosterSequence?.length > 0) {
      let seqOpt = rosterSequence?.map((seq) => {
        return {
          label: seq.sSequenceCode,
          value: seq.sSequenceCode,
        }
      })
      setSequenceOption(seqOpt)
    }
    if (scheduleClass?.length > 0) {
      let classOpt = scheduleClass?.map((c) => {
        return {
          label: c.sclassName,
          value: c.sclassCode,
        }
      })
      setClassOption(classOpt)
    }
  }, [rosterSequence, scheduleClass])

  useMemo(() => {
    if (rosterSequence?.length > 0 && values.sequence) {
      let selectedSequence = rosterSequence?.filter((seq) => seq.sSequenceCode === values.sequence)
      setSelectedSequence(selectedSequence)
    }
  }, [values.sequence])
  const handleReset = (e) => {
    e.preventDefault()
    setLocCodeKey('')
    setLocNameKey('')
  }
  useEffect(() => {
    dispatch(fetchScheduleClass())
    dispatch(fetchAllRosterSequence())
  }, [])
  useMemo(() => {
    searchSite()
  }, [debouncedCode, debouncedName])
  return (
    <CModal size="xl" className="fw-bold" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader className="px-4" onClose={() => setVisible(false)}>
        <h2 className="text-capitalize"> Edit Schedule</h2>
      </CModalHeader>
      <CModalBody className="px-5 mx-4">
        <CForm className="mt-3" onSubmit={handleSubmit}>
          <CRow className="align-content-center flex-wrap mb-3">
            <CFormLabel className="col-auto">FROM:</CFormLabel>
            <CCol sm="4">
              <CFormInput type="date" value={values.from} onChange={handleChange} id="from" />
            </CCol>
            <CFormLabel className="col-auto ms-4">TO:</CFormLabel>
            <CCol sm="4">
              <CFormInput type="date" value={values.to} onChange={handleChange} id="to" />
            </CCol>
          </CRow>
          <CRow className="d-flex flex-column gap-3 align-items-center mb-3 col-5">
            <CCol className="d-flex gap-3 align-items-center">
              <CFormCheck
                type="radio"
                label="Class"
                name="type"
                value="class"
                onChange={handleChange}
              />
              <CFormSelect
                className="ms-4"
                id="class"
                value={values.class}
                onChange={(e) => {
                  if (e) {
                    setFieldValue('class', e.target.value)
                  }
                }}
                disabled={values.type === 'sequence' || values.type === ''}
              >
                <option defaultValue disabled value={''}>
                  Please select class
                </option>
                {classOption.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className="d-flex gap-3 align-items-center">
              <CFormCheck
                type="radio"
                label="Sequence"
                name="type"
                value="sequence"
                onChange={handleChange}
              />
              <CFormSelect
                id="sequence"
                disabled={values.type === 'class' || values.type === ''}
                value={values.sequence}
                onChange={(e) => {
                  if (e) {
                    setFieldValue('sequence', e.target.value)
                  }
                }}
              >
                <option defaultValue disabled value={''}>
                  Please select sequence
                </option>
                {sequenceOption.map((seq) => (
                  <option key={seq.value} value={seq.value}>
                    {seq.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow>
            <CTable className=" mt-3 border" align="middle" responsive={true}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell></CTableHeaderCell>
                  <CTableHeaderCell className="text-primary">Beginning Day</CTableHeaderCell>
                  <CTableHeaderCell>SClassCode</CTableHeaderCell>
                  <CTableHeaderCell>IsHalfDay</CTableHeaderCell>
                  <CTableHeaderCell>MustSubstitute</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {selectedSequence?.length > 0 &&
                  selectedSequence?.map((seq, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <CFormCheck type="radio" name="day" />
                      </CTableDataCell>
                      <CTableDataCell>{seq.day}</CTableDataCell>
                      <CTableDataCell>{seq.sclassCode}</CTableDataCell>
                      <CTableDataCell>{seq.isHalfDay === true ? 'Yes' : 'No'}</CTableDataCell>
                      <CTableDataCell>{seq.mustSubstitute === true ? 'Yes' : 'No'}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CRow>
          <div className="mt-4 px-2 border-top">
            <h4 className="mt-3">Sites</h4>
            <CRow className="mt-3">
              <CCol sm="4">
                <CFormInput
                  placeholder="Site Code"
                  value={locCodeKey}
                  onChange={(e) => setLocCodeKey(e.target.value)}
                />
              </CCol>
              <CCol sm="6">
                <CFormInput
                  placeholder="Site Name"
                  value={locNameKey}
                  onChange={(e) => setLocNameKey(e.target.value)}
                />
              </CCol>
              <CCol sm="2">
                <button className="button-red-small" type="button" onClick={handleReset}>
                  Reset
                </button>
              </CCol>
            </CRow>
            <CRow>
              <CTable align="middle" className="my-4 fw-semibold border" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Site Code</CTableHeaderCell>
                    <CTableHeaderCell>Site Name</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {!loading ? (
                    siteList?.length > 0 &&
                    siteList.map((loc) => (
                      <CTableRow key={loc?.siteCode}>
                        <CTableDataCell>{loc?.siteCode}</CTableDataCell>
                        <CTableDataCell>{loc?.siteName}</CTableDataCell>
                        <CTableDataCell style={{ cursor: 'pointer' }}>
                          {addedsite.some((site) => site.siteCode === loc.siteCode) ? (
                            <RiCheckFill className="text-green" size="20" />
                          ) : (
                            <RiAddBoxFill
                              className="text-primary"
                              size="20"
                              onClick={() => handleAddsites(loc)}
                            />
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <>
                      <CTableRow>
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
                        <CTableDataCell />
                        <CTableDataCell />
                      </CTableRow>
                    </>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
            {addedsite.length > 0 && (
              <>
                <h4>Selected Sites</h4>
                <CRow>
                  <CTable align="middle" className="my-4 fw-semibold border" responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Site Code</CTableHeaderCell>
                        <CTableHeaderCell>Site Name</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {addedsite.length > 0 &&
                        addedsite?.map((loc) => (
                          <CTableRow key={loc?.siteCode}>
                            <CTableDataCell>{loc?.siteCode}</CTableDataCell>
                            <CTableDataCell>{loc?.siteName}</CTableDataCell>
                            <CTableDataCell style={{ cursor: 'pointer' }}>
                              <RiDeleteBin4Fill
                                className="text-red"
                                size="20"
                                onClick={() => handleRemoveSites(loc)}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                </CRow>
              </>
            )}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <button className="button-primary">Save</button>
      </CModalFooter>
    </CModal>
  )
}

export default EditScheduleFromDate

EditScheduleFromDate.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
}
