import {
  CCol,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { FaFileAlt } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { RiFolder5Fill } from 'react-icons/ri'
import AddDocument from '../AddEmployeeInfoModals/DocumentAdd/AddDocument'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { request } from 'src/utils/requests'
import { useDispatch } from 'react-redux'
import { getDocumentList } from 'src/features/Employee/employeeExtraDetails/apiCalls'
const Document = ({ UserGuid }) => {
  const dispatch = useDispatch()
  const { folders } = useSelector((state) => state.empExtraDetails.documents)
  const [visible, setVisible] = useState({
    folder: false,
    file: false,
  })
  const [selectedFilesId, setSelectedFilesId] = useState([])
  const [selectedFoldersId, setSelectedFoldersId] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [removeModalShow, setRemoveModalShow] = useState(false)
  const handleRemove = async () => {
    let req = {
      deleteMultipleFolderGuid: selectedFoldersId,
      deleteMultipleDocumentId: selectedFilesId,
      deleteAll: allChecked,
    }
    try {
      let res = await request.deleteFolder(req)
      if (res.data) {
        setRemoveModalShow(false)
        dispatch(getDocumentList(UserGuid))
        setAllChecked(false)
        toast.success('Deleted Succesfully')
        setSelectedFilesId([])
        setSelectedFoldersId([])
      }
    } catch (err) {
      setAllChecked(false)
      setRemoveModalShow(false)
      toast.error('Failed To Delete')
    }
  }
  const handleFolderCheckUncheck = (checked, folderId, folder) => {
    if (checked) {
      let checkedFolderIds = [...selectedFoldersId, folderId]
      setSelectedFoldersId(checkedFolderIds)
      let filesOfCurrentFolders = folder?.uploaddocumentModel?.map((file) => file.id)
      setSelectedFilesId((selectedFilesId) => [...selectedFilesId, ...filesOfCurrentFolders])
    } else {
      let checkedOnlyFolderIds = selectedFoldersId.filter((id) => id !== folderId)
      setSelectedFoldersId(checkedOnlyFolderIds)
    }
  }

  const handleFileCheckUncheck = (checked, fileId) => {
    if (checked) {
      let checkedFileIds = [...selectedFilesId, fileId]
      setSelectedFilesId(checkedFileIds)
    } else {
      let checkedOnlyFileIds = selectedFilesId.filter((id) => id !== fileId)
      setSelectedFilesId(checkedOnlyFileIds)
    }
  }
  const checkAll = (e) => {
    if (e) {
      setAllChecked(true)
      setSelectedFoldersId(folders.map((folder) => folder?.folderGuid))
    }
  }

  return (
    <>
      <>
        <CModal
          alignment="center"
          visible={removeModalShow}
          onClose={() => setRemoveModalShow(false)}
        >
          <CModalHeader onClose={() => setRemoveModalShow(false)}>
            <h3>Remove {allChecked && `All`} ?</h3>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to remove {allChecked && ` all files and folder `} ?
          </CModalBody>
          <CModalFooter>
            <button className="button-red-small" onClick={handleRemove}>
              Remove
            </button>
            <button
              className="button-outline-primary-small"
              onClick={() => setRemoveModalShow(false)}
            >
              Cancel
            </button>
          </CModalFooter>
        </CModal>
      </>
      <CRow className="justify-content-lg-between justify-content-sm-start jus gap-3 gap-lg-0">
        <CCol sm="auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="px-3"
                style={{ height: '100%', background: 'white', border: ' solid 1px #C4C4C4' }}
              >
                <FiSearch color={'#6100ff'} />
              </button>
            </div>
          </div>
        </CCol>
        <CCol sm="auto">
          <button
            style={{ width: 'fit-content' }}
            onClick={() =>
              setVisible((visible) => {
                return {
                  ...visible,
                  folder: !visible.folder,
                }
              })
            }
            className="button-outline-primary me-2 mb-2"
          >
            Create Folder
          </button>
          <button
            style={{ width: 'fit-content' }}
            onClick={() =>
              setVisible((visible) => {
                return {
                  ...visible,
                  file: !visible.file,
                }
              })
            }
            className="button-primary-fit-content me-2 mb-2"
          >
            Upload Document
          </button>
          <button className="button-gray" onClick={() => setRemoveModalShow(true)}>
            Remove
          </button>
        </CCol>
      </CRow>
      <CTable align="middle" responsive className="mt-3">
        <CTableBody className="fw-bold border">
          <CTableRow className="py-1 border">
            <CTableDataCell className="d-flex gap-2">
              <CFormCheck
                className="me-2"
                checked={allChecked}
                onChange={(e) => {
                  setAllChecked(e.target.checked)
                  if (!e.target.checked) {
                    setSelectedFilesId([])
                    setSelectedFoldersId([])
                  } else {
                    checkAll(e)
                  }
                }}
              />{' '}
              Check All
            </CTableDataCell>
            <CTableDataCell>Modified</CTableDataCell>
            <CTableDataCell>Created By</CTableDataCell>
            <CTableDataCell>File Size</CTableDataCell>
          </CTableRow>
          {folders?.length > 0 &&
            folders.map((folder, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableRow className="py-1 align-items-center">
                    <CTableDataCell className="d-flex align-items-center">
                      <CFormCheck
                        className="pe-2"
                        checked={allChecked || selectedFoldersId.includes(folder.folderGuid)}
                        onChange={(e) =>
                          handleFolderCheckUncheck(e.target.checked, folder.folderGuid, folder)
                        }
                      />
                      <RiFolder5Fill className="me-2 ms-1" size={25} color="#C4C4C4" />
                      {folder.folderName}
                    </CTableDataCell>
                  </CTableRow>
                  {folder?.uploaddocumentModel?.map((file, id) => {
                    return (
                      <CTableRow key={id} className="py-1 border-0">
                        <CTableDataCell className="d-flex align-items-center">
                          <CFormCheck
                            className="pe-2"
                            checked={allChecked || selectedFilesId.includes(file.id)}
                            onChange={(e) => handleFileCheckUncheck(e.target.checked, file.id)}
                          />
                          <FaFileAlt className="mx-2" size={20} color="#A70000" />
                          {file.documentName}
                        </CTableDataCell>
                        <CTableDataCell>{file.modified}</CTableDataCell>
                        <CTableDataCell className="text-decoration-underline">
                          {file.createdBy}
                        </CTableDataCell>
                        <CTableDataCell>{file.fileSize}</CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </React.Fragment>
              )
            })}
        </CTableBody>
      </CTable>
      <>
        <AddDocument formType="Folder" visible={visible.folder} setVisible={setVisible} />
        <AddDocument formType="File" visible={visible.file} setVisible={setVisible} />
      </>
    </>
  )
}

export default Document

Document.propTypes = {
  UserGuid: PropTypes.string,
}
