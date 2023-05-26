import {
  CCol,
  CContainer,
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
import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import { request } from 'src/utils/requests'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { fetchAllRosterSequence } from 'src/features/schedule/apiCalls'
import { useSelector } from 'react-redux'

const RosterSequenceDrawer = ({ drawerType, showDrawer, setShowDrawer, CurrentSequence }) => {
  const { allScheduleClass } = useSelector((state) => state.scheduleClass)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const rosterSequenceInputs = [
    {
      id: 'sSequenceCode',
      label: 'SSequenceCode',
      inputType: 'text',
    },
    {
      id: 'day',
      label: 'Day (Sequence Length)',
      inputType: 'select',
      options: [1, 2, 3, 4, 5, 6, 7],
    },
  ]

  const [rosterSequence, setRosterSequence] = useState({
    sSequenceCode: '',
    day: '',
  })
  const [classCodes, setClassCodes] = useState([])
  const handleRosterSequenceInput = (e) => {
    const { name, value } = e.target
    if (name === 'day') {
      let newSclassCodes = []
      for (let i = 1; i <= value; i++) {
        newSclassCodes.push({
          day: i,
          sclassCode: '',
          mustSubstitute: false,
        })
      }
      setClassCodes([...newSclassCodes])
    }
    setRosterSequence({ ...rosterSequence, [name]: value })
  }
  const handleMultipleClassCode = (e, i) => {
    let codes = classCodes
    let { value, name } = e.target
    let currentCode = classCodes.find((code) => code.day === i)
    let currentIndex = codes.indexOf(currentCode)
    if (name === 'classCode') {
      let newCurrentCode = { ...currentCode, sclassCode: value }
      codes[currentIndex] = newCurrentCode
      setClassCodes([...codes])
    }
    if (name === 'subsituteOptions') {
      let newCurrentCode = { ...currentCode, mustSubstitute: value }
      codes[currentIndex] = newCurrentCode
      setClassCodes([...codes])
    }
  }
  // {
  //   "sSequenceCode": "string",
  //   "day": 0,
  //   "scheduleRosterSequenceList": [
  //     {
  //       "sSequenceCode": "string",
  //       "day": 0,
  //       "sclassCode": "string",
  //       "isHalfDay": true,
  //       "mustSubstitute": true
  //     }
  //   ]
  // }
  const handleRosterSequenceSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    let req = {
      ...rosterSequence,
      scheduleRosterSequenceList: classCodes.map((code) => {
        return {
          sSequenceCode: rosterSequence.sSequenceCode,
          day: code.day,
          sclassCode: code.sclassCode,
          isHalfDay: false,
          mustSubstitute: code.mustSubstitute,
        }
      }),
    }
    try {
      let res = await request.createRosterSequence(req)
      if (res.data) {
        console.log(res.data)
        setLoading(false)
        setShowDrawer(false)
        dispatch(fetchAllRosterSequence())
        toast.success('Roster Sequence Added Sucessfully')
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      toast.error('Failed To Add RosterSequence')
    }
  }

  const renderRows = () => {
    let tableRows = []
    for (let i = 1; i <= rosterSequence.day; i++) {
      tableRows.push(
        <CTableRow key={i}>
          <CTableHeaderCell>
            <div>Day {i}</div>
          </CTableHeaderCell>
          <CTableDataCell className="p-2 d-flex justify-content-center fw-semibold">
            <CFormSelect
              id={`sClassCode${i}`}
              className="fw-semibold"
              name={'classCode'}
              onChange={(e) => handleMultipleClassCode(e, i)}
              value={classCodes?.find((code) => code.day === i)?.sclassCode}
            >
              <option selected disabled value={''}>
                Select One
              </option>
              {Array.isArray(allScheduleClass) &&
                allScheduleClass.length > 0 &&
                allScheduleClass.map((schedule) => (
                  <option key={schedule.sclassCode} value={schedule.sclassCode}>
                    {schedule.sclassCode}
                  </option>
                ))}
            </CFormSelect>
          </CTableDataCell>
          <CTableHeaderCell>No</CTableHeaderCell>
          <CTableDataCell className="p-2 d-flex justify-content-center">
            <CFormSelect
              name={'subsituteOptions'}
              className="fw-semibold"
              onChange={(e) => handleMultipleClassCode(e, i)}
              value={classCodes?.find((code) => code.day === i)?.mustSubstitute}
            >
              <option disabled value={''} selected>
                Select One
              </option>
              <option value={true}>Yes</option>
              <option defaultValue value={false}>
                No
              </option>
            </CFormSelect>
          </CTableDataCell>
        </CTableRow>,
      )
    }
    return tableRows
  }
  const setFormValues = (drawerType) => {
    if (drawerType === 'edit') {
      setRosterSequence({
        sSequenceCode: CurrentSequence?.sSequenceCode,
        day: CurrentSequence?.day,
      })
    } else if (drawerType === 'add') {
      setRosterSequence({
        sSequenceCode: '',
        day: '',
      })
    }
  }
  useEffect(() => {
    setFormValues(drawerType)
  }, [drawerType, CurrentSequence])
  return (
    <Drawer anchor={'right'} open={showDrawer} onClose={() => setShowDrawer(false)}>
      <form className="drawer" onSubmit={handleRosterSequenceSubmit}>
        <div className="drawer-header">
          <h5 className="fw-bold m-0 text-capitalize">{drawerType} Details</h5>
        </div>
        <div className="drawer-body mt-4">
          <CContainer>
            <CRow className="gx-5 gy-4">
              {rosterSequenceInputs.map((input, index) => {
                return (
                  <React.Fragment key={index}>
                    <CCol xs="12" sm={input.fullRow ? '12' : '6'}>
                      <CRow>
                        <CCol
                          xs="12"
                          style={{
                            width: '140px',
                          }}
                        >
                          <CFormLabel className="col-form-label">
                            <strong>{input.label}</strong>
                          </CFormLabel>
                        </CCol>
                        <CCol>
                          {drawerType === 'view' ? (
                            <p>{rosterSequence[input.id]}</p>
                          ) : input.inputType === 'text' ? (
                            <CFormInput
                              type="text"
                              name={input.id}
                              value={rosterSequence[input.id]}
                              onChange={handleRosterSequenceInput}
                              required
                            />
                          ) : input.inputType === 'select' ? (
                            <CFormSelect
                              onChange={handleRosterSequenceInput}
                              className="text-capitalize"
                              name={input.id}
                              value={rosterSequence[input.id]}
                              required
                            >
                              <option disabled defaultValue value={''}></option>
                              {input.options?.map((optionValue, index) => {
                                return (
                                  <option value={optionValue} key={index}>
                                    {optionValue}
                                  </option>
                                )
                              })}
                            </CFormSelect>
                          ) : (
                            <CFormInput
                              type="time"
                              name={input.id}
                              value={rosterSequence[input.id]}
                              onChange={handleRosterSequenceInput}
                            />
                          )}
                        </CCol>
                      </CRow>
                    </CCol>
                    {input.linebreak && <CCol sm="6" className="d-none d-sm-inline" />}
                  </React.Fragment>
                )
              })}
            </CRow>
            {rosterSequence.day > 0 && (
              <CTable className="border text-center mt-4">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">SClassCode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">IsHalfDay</CTableHeaderCell>
                    <CTableHeaderCell scope="col">MustSubsitute</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{renderRows()}</CTableBody>
              </CTable>
            )}
          </CContainer>
        </div>
        <div className="drawer-footer">
          <button
            type="button"
            className="button-gray-light"
            onClick={() => {
              setShowDrawer(false)
            }}
          >
            Cancel
          </button>
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
        </div>
      </form>
    </Drawer>
  )
}

RosterSequenceDrawer.propTypes = {
  drawerType: PropTypes.string.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  setShowDrawer: PropTypes.func.isRequired,
  CurrentSequence: PropTypes.object,
}

export default RosterSequenceDrawer
