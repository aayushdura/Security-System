import {
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import AddNewTeamsDrawer from 'src/components/ScheduleManagement/SchdeduleForms/AddNewTeamsDrawer'
import EditScheduleFromDate from 'src/components/ScheduleManagement/SchdeduleForms/RosterPlanning/EditSchedule'
import Tab from 'src/components/Tab/Tab'

const RosterPlanning = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'))
  const [visible, setVisible] = useState(true)
  const [activeKey, setActiveKey] = useState(0)
  const [addTeamShow, setAddTeamShow] = useState(false)

  function getDaysArrayByMonth() {
    var daysInMonth = moment(selectedMonth).daysInMonth()
    var arrDays = []

    while (daysInMonth) {
      var current = moment(selectedMonth).date(daysInMonth)
      arrDays.unshift(current)
      daysInMonth--
    }

    return arrDays
  }
  const tabTitle = ['roster by team', 'roster by location', 'roster by calendar']

  function returnDays(day) {
    switch (day) {
      case 0:
        return 'Su'
      case 1:
        return 'Mo'
      case 2:
        return 'Tu'
      case 3:
        return 'We'
      case 4:
        return 'Th'
      case 5:
        return 'Fr'
      case 6:
        return 'Sa'
    }
  }
  let schedule = getDaysArrayByMonth()
  let formattedDays = schedule.map((item) => {
    return {
      date: item.format('DD'),
      day: returnDays(item.day()),
    }
  })
  let users = [
    {
      empCode: 'Sammy23',
      empName: 'Sammy Cheng',
    },
    {
      empCode: 'Everly01',
      empName: 'Everly Cheng',
    },
    {
      empCode: 'Rd1',
      empName: 'Reman Desh',
    },
    {
      empCode: 'Aad1',
      empName: 'Aayush Dura',
    },
    {
      empCode: 'dpk23',
      empName: 'dipika padukon',
    },
  ]
  const handleDayClick = (e, user, day) => {
    e.preventDefault()
    if (e.nativeEvent.button === 2) {
      console.log({ rightClick: { user: user, date: day.day } })
    }
  }

  return (
    <>
      <>
        <AddNewTeamsDrawer showDrawer={addTeamShow} setShowDrawer={setAddTeamShow} type="add" />
      </>
      <>
        <EditScheduleFromDate visible={visible} setVisible={setVisible} />
      </>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Roster Planning</h2>
        <button
          className="button-primary-light"
          onClick={() => {
            setAddTeamShow(true)
          }}
        >
          Add Team
        </button>
      </div>
      <CCard>
        <CCardBody className="p-4 fw-bold">
          <CCol sm={'auto'} className="d-flex text-capitalize fw-bold gap-4">
            {tabTitle.map((item, index) => (
              <Tab
                style={activeKey === index ? { borderBottom: '3px solid' } : {}}
                title={item}
                key={index}
                handleClick={() => setActiveKey(index)}
              />
            ))}
          </CCol>
          <section>
            <CRow className="my-3 align-items-center justify-content-between">
              <p className="my-1">Please have a quick search and select your desired team : </p>
              <CCol className="d-flex gap-2" sm="auto">
                <CFormInput className="fw-bold" placeholder="Team Name" />
                <CFormInput
                  className="fw-bold"
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value)
                  }}
                />
              </CCol>
              <CCol className="d-flex gap-2" sm="auto">
                <button className="button-primary">Search</button>
                <button className="button-gray">Reset</button>
              </CCol>
            </CRow>
            <CTable bordered={true} responsive>
              <CTableHead>
                <CTableHeaderCell
                  colSpan={2}
                  className="py-3 px-1 border-end border-start fw-bolder"
                >
                  Team : -
                </CTableHeaderCell>
                {formattedDays.map((item, index) => (
                  <CTableHeaderCell
                    key={index}
                    className={
                      item.day === 'Su'
                        ? 'px-2 py-3 text-danger text-center border-end border-start'
                        : 'px-2 py-3 text-center border-end border-start'
                    }
                  >
                    {item.day}
                  </CTableHeaderCell>
                ))}
              </CTableHead>
              <CTableBody>
                <CTableRow className="align-middle fw-bold ">
                  <CTableDataCell className="py-2 px-4 border-end border-start">
                    EmployeeCode
                  </CTableDataCell>
                  <CTableDataCell className="py-2 w-auto px-4 border-end border-start">
                    EmployeeName
                  </CTableDataCell>
                  {formattedDays.map((item, index) => (
                    <CTableDataCell
                      key={index}
                      className={
                        item.day === 'Su'
                          ? 'p-2 text-danger text-center border-end border-start'
                          : 'p-2 text-center border-end border-start'
                      }
                    >
                      {item.date}
                    </CTableDataCell>
                  ))}
                </CTableRow>
                {users.map((user, index) => (
                  <CTableRow key={index} className="fw-bold align-middle text-uppercase">
                    <CTableDataCell className="py-3 px-4 border-end border-start">
                      {user.empCode}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{ whiteSpace: 'nowrap', gap: '5rem' }}
                      className="py-3 px-4 w-auto align-middle d-flex justify-content-between border-end border-start"
                    >
                      <span> {user.empName}</span>
                      <span style={{ display: 'flex', gap: '1rem' }}>
                        <MdDelete className="text-danger" size={20} />
                        <FaEye className="text-primary" size={20} />
                      </span>
                    </CTableDataCell>
                    {formattedDays.map((item, index) => (
                      <CTableDataCell
                        key={index}
                        onClick={(e) => handleDayClick(e, user, item)}
                        onContextMenu={(e) => handleDayClick(e, user, item)}
                        className={
                          item.day === 'Su'
                            ? 'p-0 text-danger text-center border-end border-start'
                            : 'p-0 text-center border-end border-start'
                        }
                      >
                        {['04', '05', '06', '07', '08', '09', '21'].includes(item.date) && (
                          <div className="w-100 h-25 bg-primary text-blue">&nbsp;</div>
                        )}
                        {['12', '18', '25', '28'].includes(item.date) && (
                          <div className="w-100 h-25 bg-green">&nbsp;</div>
                        )}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <span
              className="pt-2 text-primary text-decoration-underline"
              style={{ cursor: 'pointer' }}
            >
              Add Team Members
            </span>
          </section>
        </CCardBody>
        {/* <EmployeeSchedule /> */}
      </CCard>
    </>
  )
}

export default RosterPlanning
