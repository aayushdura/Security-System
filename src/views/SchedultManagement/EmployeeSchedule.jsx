import { CRow } from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import React, { useLayoutEffect, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EditScheduleDrawer from 'src/components/ScheduleManagement/EditScheduleDrawer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getScheduledEmployees } from 'src/features/schedule/apiCalls'
const EmployeeSchedule = () => {
  const dispatch = useDispatch()
  const [openDrawer, setOpenDrawer] = useState(false)
  const params = useParams()
  useLayoutEffect(() => {
    dispatch(getScheduledEmployees())
  }, [dispatch])
  return (
    <>
      <>
        <EditScheduleDrawer
          OpenDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          EmployeeCode={params?.id}
        />
      </>

      <CRow className="align-items-center justify-content-between px-3 pb-3">
        <button className="button-primary-fit-content px-5">Print Summary</button>
        <button className="button-primary-fit-content px-5" onClick={() => setOpenDrawer(true)}>
          Edit Schedule
        </button>
      </CRow>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventDisplay="block"
        headerToolbar={{
          right: 'prevYear prev next nextYear',
          center: 'title',
          left: 'today',
        }}
        displayEventTime={false}
        events={[
          {
            groupId: '2023-02-05',
            title: 'Full Time',
            allDay: true,
            backgroundColor: '#A685DB',
            textColor: 'white',
            borderColor: '#A685DB',
            start: '2023-02-05T12:00',
          },
          {
            groupId: '2023-02-05',
            title: 'KLB003',
            backgroundColor: '#E31BCF',
            textColor: 'white',
            borderColor: '#E31BCF',
            start: '2023-02-05T14:00',
          },
          {
            groupId: '2023-02-05',
            title: '08:00-20:00',
            backgroundColor: '#1915ED',
            textColor: 'white',
            borderColor: '#1915ED',
            start: '2023-02-05T20:00',
          },
          {
            groupId: '2023-02-06',
            title: 'Full Time',
            allDay: true,
            backgroundColor: '#A685DB',
            textColor: 'white',
            borderColor: '#A685DB',
            start: '2023-02-06T12:00',
          },
          {
            groupId: '2023-02-06',
            title: 'KLB003',
            backgroundColor: '#E31BCF',
            textColor: 'white',
            borderColor: '#E31BCF',
            start: '2023-02-06T14:00',
          },
          {
            groupId: '2023-02-06',
            title: '08:00-20:00',
            backgroundColor: '#1915ED',
            textColor: 'white',
            borderColor: '#1915ED',
            start: '2023-02-06T20:00',
          },
          {
            groupId: '2023-02-07',
            title: 'Full Time',
            allDay: true,
            backgroundColor: '#A685DB',
            textColor: 'white',
            borderColor: '#A685DB',
            start: '2023-02-07T12:00',
          },
          {
            groupId: '2023-02-07',
            title: 'KLB003',
            backgroundColor: '#E31BCF',
            textColor: 'white',
            borderColor: '#E31BCF',
            start: '2023-02-07T14:00',
          },
          {
            groupId: '2023-02-07',
            title: '08:00-20:00',
            backgroundColor: '#1915ED',
            textColor: 'white',
            borderColor: '#1915ED',
            start: '2023-02-07T20:00',
          },
          {
            groupId: '2023-02-08',
            title: 'Part Time',
            allDay: true,
            backgroundColor: '#59B171',
            textColor: 'white',
            borderColor: '#59B171',
            start: '2023-02-08T12:00',
          },
          {
            groupId: '2023-02-08',
            title: 'KLB003',
            backgroundColor: '#E31BCF',
            textColor: 'white',
            borderColor: '#E31BCF',
            start: '2023-02-08T14:00',
          },
          {
            groupId: '2023-02-08',
            title: '08:00-20:00',
            backgroundColor: '#1915ED',
            textColor: 'white',
            borderColor: '#1915ED',
            start: '2023-02-08T20:00',
          },
          {
            groupId: '2023-02-21',
            title: 'Part Time',
            allDay: true,
            backgroundColor: '#59B171',
            textColor: 'white',
            borderColor: '#59B171',
            start: '2023-02-09T12:00',
          },
          {
            groupId: '2023-02-21',
            title: 'KLB003',
            backgroundColor: '#E31BCF',
            textColor: 'white',
            borderColor: '#E31BCF',
            start: '2023-02-09T14:00',
          },
          {
            groupId: '2023-02-21',
            title: '08:00-20:00',
            backgroundColor: '#1915ED',
            textColor: 'white',
            borderColor: '#1915ED',
            start: '2023-02-09T20:00',
          },
        ]}
      />
    </>
  )
}

export default EmployeeSchedule
