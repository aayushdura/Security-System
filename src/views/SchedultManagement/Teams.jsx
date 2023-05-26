import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { BiChevronRight, BiEditAlt } from 'react-icons/bi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddNewTeamsDrawer from 'src/components/ScheduleManagement/SchdeduleForms/AddNewTeamsDrawer'
import { searchTeams } from 'src/features/schedule/apiCalls'
import PropTypes from 'prop-types'
import { request } from 'src/utils/requests'
import { toast } from 'react-hot-toast'
const Teams = () => {
  const { teams, isFetching } = useSelector((state) => state.teams)
  const [teamsSearch, setTeamsSearch] = useState({
    TeamCode: '',
    TeamName: '',
  })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState()
  const [type, setType] = useState('')
  const [content, setContent] = useState({})
  const dispatch = useDispatch()
  const dataForGrid =
    teams?.length > 0
      ? teams.map((team) => {
          let id = team.teamCode
          let name = team.teamName
          return { ...team, id, name }
        })
      : []
  const tableColumns = [
    {
      field: 'id',
      headerName: 'Team Code',
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: 'name',
      headerName: 'Team Name',
      flex: 1,
      minWidth: 180,
      headerAlign: 'left',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-1">
            <button
              className="bg-green border-0 text-white py-1 px-2"
              onClick={(e) => handleEdit(e, params)}
            >
              <BiEditAlt />
            </button>
            <button
              className="bg-primary border-0 text-white py-1 px-2"
              onClick={(e) => handleStatusChange(e, params)}
            >
              <BsCheckCircleFill />
            </button>
            <button
              className="bg-danger border-0 text-white py-1 px-2"
              onClick={(e) => handleSingleDelete(e, params)}
            >
              <MdDelete />
            </button>
          </div>
        )
      },
    },
  ]
  const searchScheduleInputs = [
    {
      id: 'TeamCode',
      label: 'Team Code',
      inputType: 'text',
    },
    {
      id: 'TeamName',
      label: 'Team Name',
      inputType: 'text',
    },
  ]
  const handleEdit = (e, data) => {
    setType('edit')
    setOpenDrawer(true)
    setContent(data?.row)
  }
  const handleSingleDelete = (e, data) => {
    setOpenDeleteModal(true)
    setContent(data?.row)
  }
  const handleStatusChange = (e, data) => {
    console.log(data)
  }
  const handleTeamsSearchInput = (e) => {
    const { name, value } = e.target
    setTeamsSearch({ ...teamsSearch, [name]: value })
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault()
    let params = {
      TeamCode: teamsSearch.TeamCode === '' ? null : teamsSearch.TeamCode,
      TeamName: teamsSearch.TeamName === '' ? null : teamsSearch.TeamName,
    }
    dispatch(searchTeams(params))
  }
  const handleReset = () => {
    setTeamsSearch({
      TeamCode: '',
      TeamName: '',
    })
    dispatch(searchTeams())
  }
  useEffect(() => {
    dispatch(searchTeams())
  }, [dispatch])
  return (
    <>
      <>
        <AddNewTeamsDrawer
          showDrawer={openDrawer}
          setShowDrawer={setOpenDrawer}
          content={content}
          type={type}
        />
        <Modal
          content={content}
          visible={openDeleteModal}
          setVisible={setOpenDeleteModal}
          type="Delete"
        />
      </>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4>Teams</h4>
        <div className="d-flex flex-wrap gap-2 justify-content-center ">
          <button
            className="button-primary"
            onClick={() => {
              setOpenDrawer(true)
              setType('add')
            }}
          >
            Add New
          </button>
          <button
            className="button-outline-primary ms-2"
            onClick={() => toast.loading('Working On Multiple Delete', { duration: 800 })}
          >
            Remove
          </button>
        </div>
      </div>
      <CCard className="mb-4 mt-4">
        <CCardBody className="p-4">
          <CForm className="row gx-5 gy-4" onSubmit={handleFilterSubmit}>
            {searchScheduleInputs.map((input, index) => {
              return (
                <CCol md="12" lg="6" xl="6" key={index}>
                  <CRow>
                    <CCol sm={4}>
                      <CFormLabel className="col-form-label">
                        <strong>{input.label}</strong>
                      </CFormLabel>
                    </CCol>
                    <CCol>
                      {input.inputType === 'text' ? (
                        <CFormInput
                          type="text"
                          name={input.id}
                          value={teamsSearch[input.id]}
                          onChange={handleTeamsSearchInput}
                        />
                      ) : (
                        <CFormSelect
                          onChange={handleTeamsSearchInput}
                          className="text-capitalize"
                          name={input.id}
                          value={teamsSearch[input.id]}
                        >
                          <option disabled defaultValue value={''}>
                            Select {input.name}
                          </option>
                          {input.options?.map((optionValue, index) => {
                            return (
                              <option value={optionValue} key={index}>
                                {optionValue}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      )}

                      {/* */}
                    </CCol>
                  </CRow>
                </CCol>
              )
            })}
            <div className="d-flex flex-row justify-content-center gap-2">
              <button className="button-primary" type="submit" onClick={handleFilterSubmit}>
                Search
              </button>
              <button className="button-gray" type="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <div style={{ height: 500, width: '100%' }} className="fw-semibold">
            <DataGrid
              rows={dataForGrid}
              loading={isFetching}
              columns={tableColumns}
              pageSize={perPage}
              page={page}
              checkboxSelection
              columnBuffer={8}
              disableColumnMenu
              hideFooterPagination
              hideFooter
              onSelectionModelChange={(employeeGuid) => {
                setSelectedRows(employeeGuid)
              }}
              sx={{
                '.MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
                '.MuiDataGrid-columnHeaderTitle': {
                  fontWeight: '600',
                },
              }}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Teams

const Modal = ({ visible, setVisible, type, content }) => {
  const dispatch = useDispatch()
  const [deleting, setDeleting] = useState(false)
  const handleDelete = async () => {
    setDeleting(true)
    try {
      let res = await request.deleteTeams(content?.teamCode)
      dispatch(searchTeams())
      setDeleting(false)
      setVisible(false)
      res.data && toast.success('Deleted Succesfully')
    } catch (err) {
      setDeleting(false)
      toast.error('Could not Delete')
      console.log(err)
    }
  }
  return (
    <CModal size="sm" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalBody className="py-4">
        <div className="d-flex flex-column justify-content-center align-items-center fw-bold ">
          <RiErrorWarningFill size={90} className="text-gray mb-2" />
          <h5 className="fw-bold text-capitalize">{type}?</h5>
          <p className=" text-capitalize">Are You Sure to {type} ?</p>
          <div className="d-flex justify-content-center gap-2  ">
            <button className="button-gray " onClick={() => setVisible(false)}>
              No, cancel.
            </button>
            <button className="button-red " onClick={handleDelete}>
              {!deleting ? `Yes, ${type}. ` : 'Deleting . . .'}
            </button>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}
Modal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  type: PropTypes.string,
  content: PropTypes.object,
}
