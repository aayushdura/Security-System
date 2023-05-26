import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import userReducer from '../features/user/userSlice'
import scheduleClassReducer from '../features/schedule/scheduleClassSlice'
import scheduleReducer from '../features/schedule/scheduleSlice'
import employeeReducer from 'src/features/Employee/employeeSlice'
import systemDefReducer from 'src/features/SystemGeneralDef/systemDefSlice'
import employeeExtraReducer from 'src/features/Employee/employeeExtraDetails/empExtraDetailsSlice'
import rosterRuleReducer from 'src/features/schedule/rosterRuleSlice'
import rosterSequenceReducer from 'src/features/schedule/rosterSequenceSlice'
import workLocationReducer from 'src/features/WorkLocation/workLocationSlice'
import visitorReducer from 'src/features/VisitorRegistration/visitorSlice'
import teamsReducer from 'src/features/schedule/teamSlice'
const store = configureStore({
  reducer: {
    systemDef: systemDefReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    schedule: scheduleReducer,
    scheduleClass: scheduleClassReducer,
    rosterRule: rosterRuleReducer,
    rosterSequence: rosterSequenceReducer,
    employee: employeeReducer,
    empExtraDetails: employeeExtraReducer,
    workLocation: workLocationReducer,
    visitors: visitorReducer,
    teams: teamsReducer,
  },
})

export default store
