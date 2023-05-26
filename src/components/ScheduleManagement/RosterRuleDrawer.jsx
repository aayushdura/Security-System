import { CCol, CContainer, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { Drawer } from '@mui/material'
// import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const RosterRuleDrawer = ({ drawerType, showDrawer, setShowDrawer, currentRule }) => {
  const { allScheduleClass } = useSelector((state) => state.scheduleClass)
  const { rosterSequence } = useSelector((state) => state.rosterSequence)
  const [loading, setLoading] = useState(false)
  const sequenceClassInputs = [
    {
      id: 'rosterCode',
      label: 'RosterRuleCode',
      inputType: 'text',
      linebreak: true,
    },
    {
      id: 'rosterName',
      label: 'RosterRuleName',
      inputType: 'text',
      fullWidth: true,
    },
    {
      id: 'isClassSequence',
      label: 'UseClassSequence',
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
      linebreak: true,
    },
    {
      id: 'ssequenceCode',
      label: 'SSequenceCode',
      inputType: 'select',
      options: [
        {
          label: 'APNX',
          value: 'APNX',
        },
        {
          label: 'NX',
          value: 'NX',
        },
      ],
      linebreak: true,
    },
    {
      id: 'sclassCode',
      label: 'SClassCode',
      inputType: 'select',
      options: [
        {
          label: 'OOH9',
          value: 'OOH9',
        },
        {
          label: 'OOH10',
          value: 'OOH10',
        },
        {
          label: 'ACD1',
          value: 'ACD1',
        },
        {
          label: 'CRX2',
          value: 'CRX2',
        },
      ],
      linebreak: true,
    },
    {
      id: 'workOnSat',
      label: 'WorkOnSaturday',
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
      linebreak: true,
    },
    {
      id: 'workOnSun',
      label: 'WorkOnSunday',
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
      linebreak: true,
    },
    {
      id: 'workOnHoliday',
      label: 'WorkOnHoliday',
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
      linebreak: true,
    },
  ]
  useMemo(() => {
    const sequenceCodeGenerator = () => {
      let sequenceCodeList = rosterSequence.map((sequence) => sequence.sSequenceCode)
      let uniqueSequenceCodeList = [...new Set(sequenceCodeList)]
    }
    sequenceCodeGenerator()
  }, [rosterSequence])

  const [rosterRule, setRosterRule] = useState({
    rosterCode: '',
    rosterName: '',
    isClassSequence: '',
    ssequenceCode: '',
    sclassCode: '',
    workOnSat: '',
    workOnSun: '',
    workOnHoliday: '',
  })
  const handleScheduleClassInput = (e) => {
    const { name, value } = e.target
    setRosterRule({ ...rosterRule, [name]: value })
  }
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      setLoading(true)
      if (drawerType === 'add') {
        try {
          let res = await request.createRosterRule(rosterRule)
          console.log(res.data)
          toast.success('Roster Rule Created Successfully')
          setValidated(false)
          setShowDrawer(false)
          setLoading(false)
        } catch (err) {
          console.log(err)
          toast.error('Failed to create Roster Rule')
          setValidated(false)
          setLoading(false)
        }
      }
      if (drawerType === 'edit') {
        try {
          let res = await request.updateRosterRules(rosterRule.rosterCode, rosterRule)
          console.log(res.data)
          toast.success('Roster Rule updated Successfully')
          setValidated(false)
          setShowDrawer(false)
        } catch (err) {
          console.log(err)
          toast.error('Failed to update Roster Rule')
          setValidated(false)
        }
      }
    } else {
      setLoading(false)
      event.stopPropagation()
    }
    setValidated(true)
  }

  const handleDrawerClose = () => {
    setShowDrawer(false)
    setValidated(false)
  }
  const setFormValues = useCallback(
    (drawerType) => {
      if (drawerType === 'edit') {
        setRosterRule({
          rosterCode: currentRule?.rosterCode,
          rosterName: currentRule?.rosterName,
          isClassSequence: currentRule?.isClassSequence,
          ssequenceCode: currentRule?.ssequenceCode ? currentRule?.ssequenceCode : '',
          sclassCode: currentRule?.sclassCode ? currentRule?.sclassCode : '',
          workOnSat: currentRule?.workOnSat,
          workOnSun: currentRule?.workOnSun,
          workOnHoliday: currentRule?.workOnHoliday,
        })
      } else if (drawerType === 'add') {
        setRosterRule({
          rosterCode: '',
          rosterName: '',
          isClassSequence: '',
          ssequenceCode: '',
          sclassCode: '',
          workOnSat: '',
          workOnSun: '',
          workOnHoliday: '',
        })
      }
    },
    [currentRule],
  )

  useEffect(() => {
    setFormValues(drawerType)
  }, [drawerType, setFormValues])
  return (
    <Drawer anchor={'right'} open={showDrawer} onClose={handleDrawerClose}>
      <CForm noValidate validated={validated} onSubmit={handleSubmit} className="drawer">
        <div className="drawer-header">
          <h5 className="fw-bold m-0 text-capitalize">{drawerType} Details</h5>
        </div>
        <div className="drawer-body mt-4">
          <CContainer>
            <CRow className="gx-5 gy-4">
              {sequenceClassInputs.map((input, index) => {
                return (
                  <React.Fragment key={index}>
                    <CCol xs="12" sm={input.fullWidth ? '12' : '6'}>
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
                            <p>{rosterRule[input.id]}</p>
                          ) : input.inputType === 'text' ? (
                            <CFormInput
                              type="text"
                              name={input.id}
                              value={rosterRule[input.id]}
                              onChange={handleScheduleClassInput}
                              required
                              feedbackInvalid={`${input.label} is required`}
                            />
                          ) : input.inputType === 'select' ? (
                            !['ssequenceCode', 'sclassCode'].includes(input.id) ? (
                              <>
                                <CFormSelect
                                  onChange={handleScheduleClassInput}
                                  className="text-capitalize"
                                  name={input.id}
                                  value={rosterRule[input.id]}
                                  required
                                  feedbackInvalid={`${input.label} is required`}
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
                              </>
                            ) : (
                              <>
                                {input.id === 'ssequenceCode' && (
                                  <CFormSelect
                                    onChange={handleScheduleClassInput}
                                    className="text-capitalize"
                                    name={input.id}
                                    value={rosterRule[input.id]}
                                    required
                                    disabled={
                                      rosterRule.isClassSequence === '' ||
                                      rosterRule.isClassSequence === 'false' ||
                                      rosterRule.isClassSequence === false
                                    }
                                    feedbackInvalid={`${input.label} is required`}
                                  >
                                    <option disabled defaultValue value={''}></option>
                                    {Array.isArray(rosterSequence) &&
                                      rosterSequence.length > 0 &&
                                      rosterSequence.map((seq, index) => (
                                        <option key={index} value={seq.sSequenceCode}>
                                          {seq.sSequenceCode}
                                        </option>
                                      ))}
                                  </CFormSelect>
                                )}
                                {input.id === 'sclassCode' && (
                                  <CFormSelect
                                    onChange={handleScheduleClassInput}
                                    className="text-capitalize"
                                    name={input.id}
                                    value={rosterRule[input.id]}
                                    required
                                    disabled={
                                      rosterRule.isClassSequence === '' ||
                                      rosterRule.isClassSequence === true ||
                                      rosterRule.isClassSequence === 'true'
                                    }
                                    feedbackInvalid={`${input.label} is required`}
                                  >
                                    <option disabled defaultValue value={''}></option>
                                    {Array.isArray(allScheduleClass) &&
                                      allScheduleClass.length > 0 &&
                                      allScheduleClass.map((schedule) => (
                                        <option
                                          key={schedule.sclassCode}
                                          value={schedule.sclassCode}
                                        >
                                          {schedule.sclassCode}
                                        </option>
                                      ))}
                                  </CFormSelect>
                                )}
                              </>
                            )
                          ) : (
                            <CFormInput
                              type="time"
                              name={input.id}
                              value={rosterRule[input.id]}
                              onChange={handleScheduleClassInput}
                            />
                            // <TimePicker
                            //   name={input.id}
                            //   value={rosterRule[input.id]}
                            //   onChange={(newValue) => {
                            //     setRosterRule({ ...rosterRule, [input.id]: newValue })
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
          <button className="button-gray-light" type="button" onClick={handleDrawerClose}>
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
      </CForm>
    </Drawer>
  )
}

RosterRuleDrawer.propTypes = {
  drawerType: PropTypes.string.isRequired,
  showDrawer: PropTypes.bool.isRequired,
  setShowDrawer: PropTypes.func.isRequired,
  currentRule: PropTypes.object,
}

export default RosterRuleDrawer
