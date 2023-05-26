import React from 'react'
// import CIcon from '@coreui/icons-react'
// import {
//   cilBell,
//   cilCalculator,
//   cilChartPie,
//   cilCursor,
//   cilDescription,
//   cilDrop,
//   cilNotes,
//   cilPencil,
//   cilPuzzle,
//   cilSpeedometer,
//   cilStar,
//   cilHouse,
//   cilBuilding,
// } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

// icons
import { BiRun } from 'react-icons/bi'

// import { IoBuildOutline } from 'react-icons/io5'
import { FaPeopleArrows, FaUser, FaUserAlt } from 'react-icons/fa'
import { AiFillCar, AiFillDashboard, AiOutlineTable } from 'react-icons/ai'
import { RiFileSettingsLine, RiShieldStarFill, RiUserSettingsLine } from 'react-icons/ri'

import { GiSettingsKnobs, GiSevenPointedStar } from 'react-icons/gi'

import { TiLocation } from 'react-icons/ti'

import { IoIosPeople } from 'react-icons/io'

// import ReceptionIcon from 'src/assets/icons/Reception.svg'

import { HiUser } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import { MdOutlineSettings, MdSettingsAccessibility, MdSettingsInputAntenna } from 'react-icons/md'

const _appNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <AiFillDashboard className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Staff Management',
    icon: (
      <IoIosPeople
        className="nav-icon"
        style={{
          fontSize: '2rem',
        }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: 'Staff Details',
        to: '/staff-details',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Department Setting',
        to: '/settings/department-settings',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Position Setting',
        to: '/settings/position-settings',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Property Project Management',
  // },
  {
    component: CNavItem,
    name: 'Staff Profile',
    to: '/guards-details',
    icon: <HiUser className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payroll Arrangement',
    to: 'guard-payment',
    icon: <RiShieldStarFill className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Attendance Log',
    icon: <BiRun className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Attendance Details',
        to: '/attendance/details',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Holiday Setting',
        to: '/attendance/holiday',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Leave Setting',
        to: '/attendance/leave',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Schedule Management',
    icon: <AiOutlineTable className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Teams',
        to: '/schedule/teams',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Duty Class',
        to: '/schedule/duty-class',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Recurring Sequence',
        to: '/schedule/roster-sequence',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Roster Planning',
        to: '/schedule/roster-rule',
        icon: <GiSevenPointedStar className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Work Location Management',
    to: '/worklocation-list',
    icon: <TiLocation className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Visitor Registration',
    to: '/visitor-registration',
    icon: <FaPeopleArrows className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Basic Settings',
    icon: <MdOutlineSettings className="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Department Settings',
      //   to: '/settings/department-settings',
      //   // icon: <RiUserSettingsLine className="nav-icon" />,
      //   icon: <GiSevenPointedStar className="nav-icon" />,
      // },
      // {
      //   component: CNavItem,
      //   name: 'Position Settings',
      //   to: '/settings/position-settings',
      //   icon: <GiSevenPointedStar className="nav-icon" />,
      //   // icon: <MdSettingsAccessibility className="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: 'Status Settings',
        to: '/settings/status-settings',
        icon: <GiSevenPointedStar className="nav-icon" />,
        // icon: <GiSettingsKnobs className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Location Settings',
        to: '/settings/location-settings',
        icon: <GiSevenPointedStar className="nav-icon" />,
        // icon: <MdSettingsInputAntenna className="nav-icon" />,
      },
    ],
  },
]

export default _appNav
