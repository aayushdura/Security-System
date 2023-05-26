import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const SystemDefSettings = React.lazy(() => import('./views/SystemDefSetting/SystemDefSettings'))

// Basic Settings
const DepartmentSettings = React.lazy(() => import('./views/BasicSettings/DepartmentSettings'))
const PositionSettings = React.lazy(() => import('./views/BasicSettings/PositionSettings'))
const LocationSettings = React.lazy(() => import('./views/BasicSettings/LocationSettings'))
const StatusSettings = React.lazy(() => import('./views/BasicSettings/StatusSettings'))

// -----------------

// Staff Management
const StaffListing = React.lazy(() => import('./views/StaffManagement/StaffListing'))

// Schedule Management
const Teams = React.lazy(() => import('./views/SchedultManagement/Teams'))
const DutyClass = React.lazy(() => import('./views/SchedultManagement/DutyClass'))

const ScheduleSearch = React.lazy(() => import('./views/SchedultManagement/ScheduleSearch'))
const EmployeeSchedule = React.lazy(() => import('./views/SchedultManagement/EmployeeSchedule'))
const SiteScheduleDetails = React.lazy(() =>
  import('./views/SchedultManagement/SiteScheduleDetails'),
)
const ScheduleClass = React.lazy(() => import('./views/SchedultManagement/ScheduleClass'))
const RosterSequence = React.lazy(() => import('./views/SchedultManagement/RosterSequence'))
// const RosterRule = React.lazy(() => import('./views/SchedultManagement/RosterRule'))
const RosterPlanning = React.lazy(() => import('./views/SchedultManagement/RosterPlanning'))

// Guard Payment

const GuardPayment = React.lazy(() => import('./components/ScheduleManagement/Chart/index'))
// const GuardPayment = React.lazy(() => import('./views/SchedultManagement/RosterSequence'))

// Guard Profile
const GuardProfile = React.lazy(() => import('./views/GuardProfile/EmployeeProfile'))
const GuardIndex = React.lazy(() => import('./views/GuardProfile/GuardsIndex'))

// Work Location
const WorkLocationList = React.lazy(() => import('./views/WorkLocationManagment/WorkLocationList'))
const WorkLocation = React.lazy(() => import('./views/WorkLocationManagment/LocationDetail'))

// Visitor Management
const VisitorManagement = React.lazy(() =>
  import('./views/VisitorManagement/VisitorManagementList'),
)

// attendance
const AttendanceDetails = React.lazy(() =>
  import('./components/ScheduleManagement/Views/ByMonthSchedule'),
)

const Login = React.lazy(() => import('./views/Pages/login/Login'))

const authenticateRoutes = [
  {
    path: '/',
    exact: true,
    name: 'Login',
    isPrivate: false,
    element: Login,
  },
]

const basicSettings = [
  {
    path: '/settings/department-settings',
    exact: true,
    name: 'Department Settings',
    isPrivate: true,
    element: DepartmentSettings,
  },
  {
    path: '/settings/position-settings',
    exact: true,
    name: 'Position Settings',
    isPrivate: true,
    element: PositionSettings,
  },
  {
    path: '/settings/location-settings',
    exact: true,
    name: 'Location Settings',
    isPrivate: true,
    element: LocationSettings,
  },
  {
    path: '/settings/status-settings',
    exact: true,
    name: 'Status Settings',
    isPrivate: true,
    element: StatusSettings,
  },
]
const dashboardRoutes = [
  { path: '/', exact: true, name: 'Home', isPrivate: true, element: SystemDefSettings },
  { path: '/dashboard', name: 'Dashboard', isPrivate: true, element: SystemDefSettings },
]
const staffManagement = [
  { path: '/staff', name: 'Staff', element: StaffListing, isPrivate: true, exact: true },
  { path: '/staff-details', name: 'Staff', element: StaffListing, isPrivate: true, exact: true },
]
const attendance = [
  {
    path: '/attendance/details',
    name: 'Staff',
    element: AttendanceDetails,
    isPrivate: true,
    exact: true,
  },
]
const scheduleSection = [
  { path: '/schedule', name: 'Schedule', element: ScheduleSearch, isPrivate: true, exact: true },
  { path: '/schedule/teams', name: 'Teams', element: Teams, isPrivate: true, exact: true },
  {
    path: '/schedule/duty-class',
    name: 'Teams',
    element: ScheduleClass,
    isPrivate: true,
    exact: true,
  },
  { path: '/schedule/search', name: 'Schedule Search', isPrivate: true, element: ScheduleSearch },
  {
    path: '/employee-schedule/:id',
    name: 'Employee Schedule',
    isPrivate: true,
    element: EmployeeSchedule,
  },
  {
    path: '/schedule/schedule-details',
    name: 'Schedule Details',
    isPrivate: true,
    element: SiteScheduleDetails,
  },
  // { path: '/schedule/class', name: 'Schedule Class', isPrivate: true, element: ScheduleClass },
  {
    path: '/schedule/roster-sequence',
    name: 'Roster Sequence',
    isPrivate: true,
    element: RosterSequence,
  },
  // roster planning
  { path: '/schedule/roster-rule', name: 'Roster Rule', isPrivate: true, element: RosterPlanning },
]

const guardSection = [
  { path: '/guards-details', name: 'Guard Listing', isPrivate: true, element: GuardIndex },
  { path: `/employee-profile/:id`, name: 'Guard Profile', isPrivate: true, element: GuardProfile },
]
const guardPayment = [
  { path: '/guard-payment', name: 'Guard Payment', isPrivate: true, element: GuardPayment },
]

const workLocationMangement = [
  {
    path: '/worklocation-list',
    name: 'Work Location Management',
    isPrivate: true,
    element: WorkLocationList,
  },
  { path: '/worklocation/:id', name: 'Work Location', isPrivate: true, element: WorkLocation },
]
const visitorManagement = [
  {
    path: '/visitor-registration',
    name: 'Visitor Mangement',
    isPrivate: true,
    element: VisitorManagement,
  },
]
const appRoutes = [
  ...authenticateRoutes,
  ...dashboardRoutes,
  ...basicSettings,
  ...staffManagement,
  ...guardSection,
  ...scheduleSection,
  ...guardPayment,
  ...workLocationMangement,
  ...visitorManagement,
  ...attendance,
]

export default appRoutes
