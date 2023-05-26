import { CCol, CContainer, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { Drawer } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { fetchScheduleClass } from 'src/features/schedule/apiCalls'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { request } from 'src/utils/requests'
import moment from 'moment'

const ScheduleClassDrawer = ({ drawerType, showDrawer, setShowDrawer, currentScheduleClass }) => {
  const dispatch = useDispatch()

  const sequenceClassInputs = [
    {
      id: 'sclassCode',
      label: 'SClassCode',
      inputType: 'text',
    },
    {
      id: 'isHalfDay',
      label: 'IsHalfDay',
      inputType: 'select',
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
    {
      id: 'sclassName',
      label: 'SClassName',
      inputType: 'text',
      fullRow: true,
    },
    {
      id: 'timeSession',
      label: 'TimeSession',
      inputType: 'select',
      options: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
      ],

      linebreak: true,
    },
    {
      id: 'checkInTime1',
      label: 'CheckInTime1',
      inputType: 'time',
      group: 1,
    },
    {
      id: 'checkOutTime1',
      label: 'CheckOutTime1',
      inputType: 'time',
      group: 1,
    },
    {
      id: 'checkInTime2',
      label: 'CheckInTime2',
      inputType: 'time',
      group: 2,
    },
    {
      id: 'checkOutTime2',
      label: 'CheckOutTime2',
      inputType: 'time',
      group: 2,
    },
    {
      id: 'checkInTime3',
      label: 'CheckInTime3',
      inputType: 'time',
      group: 3,
    },
    {
      id: 'checkOutTime3',
      label: 'CheckOutTime3',
      inputType: 'time',
      group: 3,
    },
  ]

  const [scheduleClass, setScheduleClass] = useState({
    sclassCode: '',
    sclassName: '',
    isHalfDay: '',
    timeSession: '',
    checkOutTime1: '',
    checkInTime1: '',
    checkOutTime2: '',
    checkInTime2: '',
    checkOutTime3: '',
    checkInTime3: '',
  })
  const setFormValues = (drawerType) => {
    if (drawerType === 'edit') {
      setScheduleClass({
        sclassCode: currentScheduleClass?.sclassCode,
        sclassName: currentScheduleClass?.sclassName,
        isHalfDay: currentScheduleClass?.isHalfDay,
        timeSession: currentScheduleClass?.timeSession,
        checkOutTime1: moment(currentScheduleClass?.checkOutTime1).format('HH:MM:SS'),
        checkInTime1: moment(currentScheduleClass?.checkInTime1).format('HH:MM:SS'),
        checkOutTime2: moment(currentScheduleClass?.checkOutTime2).format('HH:MM:SS'),
        checkInTime2: moment(currentScheduleClass?.checkInTime2).format('HH:MM:SS'),
        checkOutTime3: moment(currentScheduleClass?.checkOutTime3).format('HH:MM:SS'),
        checkInTime3: moment(currentScheduleClass?.checkOutTime3).format('HH:MM:SS'),
      })
    } else if (drawerType === 'add') {
      setScheduleClass({
        sclassCode: '',
        sclassName: '',
        isHalfDay: '',
        timeSession: '',
        checkOutTime1: '',
        checkInTime1: '',
        checkOutTime2: '',
        checkInTime2: '',
        checkOutTime3: '',
        checkInTime3: '',
      })
    }
  }
  useEffect(() => {
    setFormValues(drawerType)
  }, [drawerType, currentScheduleClass])
  const handleScheduleClassInput = (e) => {
    const { name, value } = e.target
    if (name === 'timeSession') {
      if (value === '1') {
        return setScheduleClass((prev) => ({
          ...prev,
          [name]: value,
          checkOutTime2: '',
          checkInTime2: '',
          checkOutTime3: '',
          checkInTime3: '',
        }))
      }
      if (value === '2') {
        return setScheduleClass({
          ...scheduleClass,
          [name]: value,
          checkInTime3: '',
          checkOutTime3: '',
        })
      }
    }
    return setScheduleClass({ ...scheduleClass, [name]: value })
  }
  const [validated, setValidated] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() && validated) {
      if (drawerType === 'add') {
        try {
          let res = await request.createScheduleClass(scheduleClass)
          if (res.data) {
            setScheduleClass({
              sclassCode: '',
              sclassName: '',
              isHalfDay: '',
              timeSession: '',
              checkOutTime1: '',
              checkInTime1: '',
              checkOutTime2: '',
              checkInTime2: '',
              checkOutTime3: '',
              checkInTime3: '',
            })
            setShowDrawer(false)
            dispatch(fetchScheduleClass())
            setValidated(false)
            toast.success('Schedule Class Added Successfully')
          }
        } catch (error) {
          console.log(error)
          setShowDrawer(false)
          toast.error('Failed To Add New ScheduleClass')
        }
      }
      if (drawerType === 'edit') {
        try {
          let res = await request.updateScheduleClass(scheduleClass.sclassCode, scheduleClass)
          if (res.data) {
            setScheduleClass({
              sclassCode: '',
              sclassName: '',
              isHalfDay: '',
              timeSession: '',
              checkOutTime1: '',
              checkInTime1: '',
              checkOutTime2: '',
              checkInTime2: '',
              checkOutTime3: '',
              checkInTime3: '',
            })
            setShowDrawer(false)
            dispatch(fetchScheduleClass())
            setValidated(false)
            toast.success('Schedule Class Updated Successfully')
          }
        } catch (error) {
          console.log(error)
          setScheduleClass({
            sclassCode: '',
            sclassName: '',
            isHalfDay: '',
            timeSession: '',
            checkOutTime1: '',
            checkInTime1: '',
            checkOutTime2: '',
            checkInTime2: '',
            checkOutTime3: '',
            checkInTime3: '',
          })
          setShowDrawer(false)
          toast.error('Failed To Update ScheduleClass')
        }
      }
    }
  }
  return (
    <Drawer anchor={'right'} open={showDrawer} onClose={() => setShowDrawer(false)}>
      <CForm
        className="drawer"
        noValidate
        validated={validated}
        onSubmit={() => {
          toast.loading('Working On It', { duration: 800 })
        }}
      >
        <div className="drawer-header">
          <h5 className="fw-bold m-0 text-capitalize">{drawerType} Details</h5>
        </div>
        <div className="drawer-body mt-4">
          <CContainer>
            <CRow className="gx-5 gy-4">
              {sequenceClassInputs.map((input, index) => {
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
                            <p>{scheduleClass[input.id]}</p>
                          ) : input.inputType === 'text' || input.inputType === 'number' ? (
                            <CFormInput
                              type={input.inputType}
                              name={input.id}
                              value={scheduleClass[input.id]}
                              onChange={handleScheduleClassInput}
                              required
                              feedbackInvalid={`Please enter ${input.id}`}
                            />
                          ) : input.inputType === 'select' ? (
                            <CFormSelect
                              onChange={handleScheduleClassInput}
                              className="text-capitalize"
                              name={input.id}
                              value={scheduleClass[input.id]}
                              feedbackInvalid={`Please select ${input.id}`}
                              required
                            >
                              <option disabled defaultValue value={''}></option>
                              {input.options?.map((option, index) => {
                                return (
                                  <option value={option.value} key={index}>
                                    {option.label}
                                  </option>
                                )
                              })}
                            </CFormSelect>
                          ) : (
                            <CFormInput
                              type="time"
                              name={input.id}
                              value={scheduleClass[input.id]}
                              onChange={handleScheduleClassInput}
                              step="2"
                              disabled={scheduleClass.timeSession >= input.group ? false : true}
                              required
                              feedbackInvalid={`Please enter ${input.id}`}
                            />
                            // <TimePicker
                            //   name={input.id}
                            //   value={scheduleClass[input.id]}
                            //   onChange={(newValue) => {
                            //     setScheduleClass({ ...scheduleClass, [input.id]: newValue })
                            //   }}
                            //   renderInput={(params) => <TextField size="small" {...params} />}
                            // />
                          )}
                        </CCol>
                      </CRow>
                    </CCol>
                    {input.linebreak && <CCol sm="6" className="d-none d-sm-inline" />}
                  </React.Fragment>
                )
              })}
            </CRow>
          </CContainer>
        </div>
        <div className="drawer-footer">
          <button
            className="button-gray-light"
            type="button"
            onClick={() => {
              setShowDrawer(false)
            }}
          >
            Cancel
          </button>
          <button className="button-primary-light" type="button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </CForm>
    </Drawer>
  )
}

ScheduleClassDrawer.propTypes = {
  drawerType: PropTypes.string.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  setShowDrawer: PropTypes.func.isRequired,
  currentScheduleClass: PropTypes.object,
}

export default ScheduleClassDrawer
