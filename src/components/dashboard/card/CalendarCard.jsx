import React from 'react'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

const CalendarCard = () => {
  return (
    <div className="dashboard-card dashboard-card-calendar">
      <div className="dashboard-card-header ">
        <div className="d-flex justify-content-center alight-items-center gap-2">
          <BsFillCalendarWeekFill className="text-muted" size={18} />
          <h5 className="m-0">Calendar</h5>
        </div>
      </div>
      <div className="dashboard-card-body">
        <div className="dashboard-card-calendar-item">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            initialView="dayGridMonth"
          />
        </div>
      </div>
    </div>
  )
}

export default CalendarCard
