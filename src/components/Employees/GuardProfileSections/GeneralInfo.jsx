import { CCollapse, CRow, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp, FaFileAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { findGender } from 'src/utils/helpers'
import AddEducation from '../AddEmployeeInfoModals/AddGeneralInfo/AddEducation'
import AddEmergencyDep from '../AddEmployeeInfoModals/AddGeneralInfo/AddEmergencyDep'
import AddLicense from '../AddEmployeeInfoModals/AddGeneralInfo/AddLicense'
import AddSkills from '../AddEmployeeInfoModals/AddGeneralInfo/AddSkills'
import AddWorkExperience from '../AddEmployeeInfoModals/AddGeneralInfo/AddWorkExperience'
import PropTypes from 'prop-types'
import { MdDeleteOutline } from 'react-icons/md'

const GeneralInfo = ({ UserGuid }) => {
  const [collapseVisible, setCollapseVisible] = useState({
    basicInfo: true,
    work: true,
    mpfDetaisl: true,
    personalDetails: true,
    workingExperience: true,
    education: true,
    license: true,
    skills: true,
    emergency: true,
  })
  const { currentEmployee } = useSelector((state) => state.employee)
  const { systemGenderType } = useSelector((state) => state.systemDef)
  const { workExperience, education, licenseCertification, skills, emergencyDependants } =
    useSelector((state) => state.empExtraDetails.generalInfo)
  const [showAddWorkModal, setShowAddWorkModal] = useState(false)
  const [showAddEducationModal, setShowEducationModal] = useState(false)
  const [showAddLicenseModal, setShowAddLicenseModal] = useState(false)
  const [showAddSkillsModal, setShowAddSkillsModal] = useState(false)
  const [showAddEmergencyModal, setShowAddEmergencyModal] = useState(false)

  return (
    <>
      {/* Basic Info */}
      <div className="fs-6 fw-bold border">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Basic Info</span>
          <span>
            {collapseVisible.basicInfo ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, basicInfo: !collapseVisible.basicInfo }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, basicInfo: !collapseVisible.basicInfo }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.basicInfo}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">First Name</div>:
                <div className="col">
                  {currentEmployee.firstName ? currentEmployee.firstName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Gender</div>:
                <div className="col">{findGender(currentEmployee.gender, systemGenderType)}</div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Employee ID</div>:
                <div className="col">
                  {currentEmployee.employeeCode ? currentEmployee.employeeCode : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Last Name</div>:
                <div className="col">
                  {currentEmployee.lastName ? currentEmployee.lastName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Other Name</div>:
                <div className="col">
                  {currentEmployee.otherName ? currentEmployee.otherName : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Email</div>:
                <div className="col">
                  {currentEmployee.personalEmail ? currentEmployee.personalEmail : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Work */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Work</span>
          <span>
            {collapseVisible.work ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, work: !collapseVisible.work }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, work: !collapseVisible.work }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.work}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Department</div>:
                <div className="col">
                  {currentEmployee.departmentCode ? currentEmployee.department : '---'}
                  {/* {currentEmployee.departmentCode === 'DEV' && 'Developer'}
                  {currentEmployee.departmentCode === 'ACC' && 'Account'} */}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Date of Entry</div>:
                <div className="col">
                  {currentEmployee.dateOfEntry
                    ? moment(currentEmployee.dateOfEntry).format('ll')
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Source of Recruitment</div>:
                <div className="col">
                  {currentEmployee.recuitmentSource ? currentEmployee.recuitmentSource : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Work Phone</div>:
                <div className="col">
                  {currentEmployee.workingPhone ? currentEmployee.workingPhone : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Work Email</div>:
                <div className="col">
                  {currentEmployee.workingEmail ? currentEmployee.workingEmail : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Position</div>:
                <div className="col">
                  {currentEmployee.currentPosition ? currentEmployee.currentPosition : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Date Of Re-Entry</div>:
                <div className="col">
                  {currentEmployee.dateOfReEntry ? currentEmployee.dateOfReEntry : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Employee Status</div>:
                <div className="col">
                  {currentEmployee.employeeStatus ? currentEmployee.employeeStatus : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Employee Type</div>:
                <div className="col">
                  {currentEmployee.employeeType ? currentEmployee.employeeType : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* MPF Details */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>MPF Details</span>
          <span>
            {collapseVisible.mpfDetaisl ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, mpfDetaisl: !collapseVisible.mpfDetaisl }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, mpfDetaisl: !collapseVisible.mpfDetaisl }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.mpfDetaisl}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">MPF Provider</div>:
                <div className="col">
                  {currentEmployee.mpfProvider ? currentEmployee.mpfProvider : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">MPF Scheme</div>:
                <div className="col">
                  {currentEmployee.mpfScheme ? currentEmployee.mpfScheme : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">MPF Account Creation Date</div>:
                <div className="col">
                  {currentEmployee.accountCreationDate
                    ? currentEmployee.accountCreationDate
                    : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Taxation Code</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.taxationCode ? currentEmployee.taxationCode : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Taxation Area</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.taxationArea ? currentEmployee.taxationArea : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Voulntary Contribtions</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.volunatryContributions
                    ? currentEmployee.volunatryContributions
                    : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Personal Details */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Personal Details</span>
          <span>
            {collapseVisible.personalDetails ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, personalDetails: !collapseVisible.personalDetails }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, personalDetails: !collapseVisible.personalDetails }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.personalDetails}>
          <div className="row d-flex ps-4 py-3 pe-3">
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Address 1</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.address1 ? currentEmployee.address1 : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">State/Province</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.addressModel?.countryDetail?.stateProvinceName
                    ? currentEmployee?.addressModel?.countryDetail?.stateProvinceName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Country</div>:
                <div className="col">
                  {' '}
                  {currentEmployee?.addressModel?.countryDetail?.countryName
                    ? currentEmployee?.addressModel?.countryDetail?.countryName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Mobile</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.mobile ? currentEmployee.mobile : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Date of Birth</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.dateOfBirth
                    ? moment(currentEmployee.dateOfBirth).format('ll')
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Nationality</div>:
                <div className="col">
                  {' '}
                  {currentEmployee.nationality ? currentEmployee.nationality : '---'}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row my-3">
                <div className="col-sm-4">Address 2</div>:
                <div className="col">
                  {currentEmployee.address2 ? currentEmployee.address2 : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">County/City</div>:
                <div className="col">
                  {currentEmployee?.addressModel?.countryDetail?.countyName
                    ? currentEmployee?.addressModel?.countryDetail?.countyName
                    : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Postal Code</div>:
                <div className="col">
                  {currentEmployee.postalCode ? currentEmployee.postalCode : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Personal Email</div>:
                <div className="col">
                  {currentEmployee.personalEmail ? currentEmployee.personalEmail : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Marrital Status</div>:
                <div className="col">
                  {currentEmployee.marritalStatus ? currentEmployee.marritalStatus : '---'}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-sm-4">Identity Card</div>:
                <div className="col">
                  {currentEmployee.identtyCard ? currentEmployee.identityCard : '---'}
                </div>
              </div>
            </div>
          </div>
        </CCollapse>
      </div>
      {/* Work Experience */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom ps-4 py-3 pe-3">
          <span>Work Experience</span>
          <span>
            {collapseVisible.workingExperience ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      workingExperience: !collapseVisible.workingExperience,
                    }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return {
                      ...collapseVisible,
                      workingExperience: !collapseVisible.workingExperience,
                    }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.workingExperience}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell>Previous Company</CTableDataCell>
                  <CTableDataCell>Country</CTableDataCell>
                  <CTableDataCell>Job Title</CTableDataCell>
                  <CTableDataCell>From</CTableDataCell>
                  <CTableDataCell>To</CTableDataCell>
                  <CTableDataCell>Job Description</CTableDataCell>
                  <CTableDataCell>Leave/Resign Reason</CTableDataCell>
                  <CTableDataCell>Documents</CTableDataCell>
                </CTableRow>
                {workExperience?.length > 0 &&
                  workExperience.map((item, index) => (
                    <CTableRow
                      key={index}
                      className="border-start border-bottom border-end py-3 align-items-center"
                    >
                      <CTableDataCell>{item.companyName ? item.companyName : '---'}</CTableDataCell>
                      <CTableDataCell>{item.CountryName ? item.CountryName : '---'}</CTableDataCell>
                      <CTableDataCell>{item.jobTitle ? item.jobTitle : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item.dateRangeStart ? moment(item.dateRangeStart).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.dateRangeEnd ? moment(item.dateRangeEnd).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.jobDescription ? item.jobDescription : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.reasonOfLeave ? item.reasonOfLeave : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item?.pictureModel?.pictureId ? <FaFileAlt color="#A70000" /> : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3 " onClick={() => setShowAddWorkModal(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddWorkExperience visible={showAddWorkModal} setVisible={setShowAddWorkModal} />
        </>
      </div>
      {/* Education */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Education</span>
          <span>
            {collapseVisible.education ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, education: !collapseVisible.education }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, education: !collapseVisible.education }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.education}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-1 align-items-center">
                  <CTableDataCell align="middle">School Name</CTableDataCell>
                  <CTableDataCell align="middle">Country</CTableDataCell>
                  <CTableDataCell align="middle">Level</CTableDataCell>
                  <CTableDataCell align="middle">Field(s) of Study</CTableDataCell>
                  <CTableDataCell align="middle">Year of Completion</CTableDataCell>
                  <CTableDataCell align="middle">Additional Notes</CTableDataCell>
                  <CTableDataCell align="middle">Remarks</CTableDataCell>
                  <CTableDataCell align="middle">Documents</CTableDataCell>
                </CTableRow>
                {education?.length > 0 &&
                  education.map((item, index) => (
                    <CTableRow
                      key={index}
                      className=" border-start border-bottom border-end py-2 align-items-center"
                    >
                      <CTableDataCell>{item.schoolName ? item.schoolName : '---'}</CTableDataCell>
                      <CTableDataCell>{item.countryCode ? item.countryCode : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item.educationLevelCode ? item.educationLevelCode : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.fieldofStudy ? item.fieldofStudy : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.dateRangeEnd
                          ? moment(item.dateRangeEnd, 'YYYY/MM/DD').format('YYYY')
                          : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.additionalNotes ? item.additionalNotes : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.remarks ? item.remarks : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {' '}
                        {item?.pictureModel?.pictureId ? <FaFileAlt color="#A70000" /> : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowEducationModal(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddEducation visible={showAddEducationModal} setVisible={setShowEducationModal} />
        </>
      </div>
      {/* License & Certification */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>License & Certification</span>
          <span>
            {collapseVisible.license ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, license: !collapseVisible.license }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, license: !collapseVisible.license }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.license}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Name</CTableDataCell>
                  <CTableDataCell>Country</CTableDataCell>
                  <CTableDataCell>Institute</CTableDataCell>
                  <CTableDataCell>Type</CTableDataCell>
                  <CTableDataCell>Valid Date From</CTableDataCell>
                  <CTableDataCell>Valid Date To</CTableDataCell>
                  <CTableDataCell>Remarks</CTableDataCell>
                  <CTableDataCell>Documents</CTableDataCell>
                </CTableRow>
                {licenseCertification?.length > 0 &&
                  licenseCertification.map((item, index) => (
                    <CTableRow
                      key={index}
                      className=" border-start border-bottom border-end py-1 align-items-center"
                    >
                      <CTableDataCell>{item.certName}</CTableDataCell>
                      <CTableDataCell>{item.countryCode}</CTableDataCell>
                      <CTableDataCell>{item.issueOrganization}</CTableDataCell>
                      <CTableDataCell>{item.certType}</CTableDataCell>
                      <CTableDataCell>
                        {item.issueDate ? moment(item.issueDate).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.expiryDate ? moment(item.expiryDate).format('ll') : '---'}
                      </CTableDataCell>
                      <CTableDataCell>{item.remarks ? item.remarks : '---'}</CTableDataCell>
                      <CTableDataCell>
                        {item?.pictureModel?.pictureId ? <FaFileAlt color="#A70000" /> : '---'}
                      </CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowAddLicenseModal(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddLicense visible={showAddLicenseModal} setVisible={setShowAddLicenseModal} />
        </>
      </div>
      {/* Skills */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Skills</span>
          <span>
            {collapseVisible.skills ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, skills: !collapseVisible.skills }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, skills: !collapseVisible.skills }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.skills}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable align="middle" responsive>
              <CTableBody>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Type</CTableDataCell>
                  <CTableDataCell>Name</CTableDataCell>
                  <CTableDataCell>Level</CTableDataCell>
                  <CTableDataCell>Remarks</CTableDataCell>
                </CTableRow>
                {skills?.length > 0 &&
                  skills.map((skill, index) => (
                    <CTableRow key={index} className="border py-3 align-items-center">
                      <CTableDataCell>{skill.skillType}</CTableDataCell>
                      <CTableDataCell>{skill.skillName}</CTableDataCell>
                      <CTableDataCell>{skill.skillLevel}</CTableDataCell>
                      <CTableDataCell>{skill.description}</CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button className="button-primary me-3" onClick={() => setShowAddSkillsModal(true)}>
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddSkills visible={showAddSkillsModal} setVisible={setShowAddSkillsModal} />
        </>
      </div>
      {/* Emergency Dependants */}
      <div className="fs-6 fw-bold border mt-5">
        <div className="d-flex justify-content-between align-items-center  border-bottom  ps-4 py-3 pe-3">
          <span>Emergency Dependants</span>
          <span>
            {collapseVisible.emergency ? (
              <FaCaretUp
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, emergency: !collapseVisible.emergency }
                  })
                }
              />
            ) : (
              <FaCaretDown
                size={30}
                onClick={() =>
                  setCollapseVisible((collapseVisible) => {
                    return { ...collapseVisible, emergency: !collapseVisible.emergency }
                  })
                }
              />
            )}
          </span>
        </div>
        <CCollapse visible={collapseVisible.emergency}>
          <CRow className="ps-2 m-0 pt-4">
            <CTable responsive>
              <CTableBody>
                <CTableRow className="border py-3 align-items-center">
                  <CTableDataCell>Name</CTableDataCell>
                  <CTableDataCell>Relationship</CTableDataCell>
                  <CTableDataCell>Phone Number</CTableDataCell>
                </CTableRow>
                {emergencyDependants?.length > 0 &&
                  emergencyDependants.map((item, index) => (
                    <CTableRow key={index} className="border py-3 align-items-center">
                      <CTableDataCell>{item.contactName}</CTableDataCell>
                      <CTableDataCell>{item.relationship}</CTableDataCell>
                      <CTableDataCell>{item.mobile}</CTableDataCell>
                      <CTableDataCell>
                        <MdDeleteOutline size={25} color="#C4C4C4" />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
            <div className="mb-3">
              <button
                className="button-primary me-3"
                onClick={() => setShowAddEmergencyModal(true)}
              >
                Add New
              </button>
              <button className="button-outline-primary">Remove</button>
            </div>
          </CRow>
        </CCollapse>
        <>
          <AddEmergencyDep visible={showAddEmergencyModal} setVisible={setShowAddEmergencyModal} />
        </>
      </div>
    </>
  )
}

export default GeneralInfo

GeneralInfo.propTypes = {
  UserGuid: PropTypes.string,
}
