import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { toast } from 'react-hot-toast'
import { request } from 'src/utils/requests'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getDocumentList } from 'src/features/Employee/employeeExtraDetails/apiCalls'
import { useSelector } from 'react-redux'
import { handleFileOnChange } from 'src/utils/generalServerCalls'
import { FaFileAlt } from 'react-icons/fa'
import { addFiles, addFolder } from '../validationschemas/addInfoSchemas'
import { TailSpin } from 'react-loader-spinner'
import { getWorkDocuments } from 'src/features/WorkLocation/apiCalls'

const AddDocument = ({ formType, visible, setVisible, DocType }) => {
  const { folders } = useSelector((state) => state.empExtraDetails.documents)
  const { documents } = useSelector((state) => state.workLocation)
  const [document, setDocument] = useState({})
  const [uploadingDocs, setUploadingDocs] = useState(false)
  const [adding, setAdding] = useState(false)
  const dispatch = useDispatch()
  const fileRef = useRef()
  const params = useParams()
  const handleUpload = () => {
    fileRef.current.click()
  }
  const handleDocumentChange = (e) => {
    setUploadingDocs(true)
    handleFileOnChange(e, 'Id')
      .then((res) => {
        setDocument(res)
        setUploadingDocs(false)
        res.pictureId && toast.success('File Uploaded Succesfully')
      })
      .catch((err) => {
        setUploadingDocs(false)
        console.log(err)
      })
  }
  const workInitialValue =
    formType !== 'Folder'
      ? {
          id: 0,
          workLocationGuid: params.id,
          folderGuid: '',
          documentName: '',
          modified: '2023-1-13',
          createdBy: 'sam@gmail.com',
          fileSize: '',
        }
      : {
          workLocationGuid: params.id,
          folderName: '',
          folderGuid: params.id,
        }
  const formik = useFormik({
    validationSchema: formType === 'Folder' ? addFolder : addFiles,
    enableReinitialize: true,
    initialValues:
      DocType === 'worklocation'
        ? workInitialValue
        : formType !== 'Folder'
        ? {
            id: 0,
            employeeGuid: params.id,
            folderGuid: '',
            documentName: '',
            modified: '2023-1-13',
            createdBy: 'sam@gmail.com',
            fileSize: '',
          }
        : {
            employeeGuid: params.id,
            folderName: '',
            folderGuid: params.id,
          },
    onSubmit: async (values) => {
      setAdding(true)
      if (DocType === 'worklocation') {
        if (formType === 'Folder') {
          try {
            let res = await request.createWorkFolder(values)
            if (res.data) {
              formik.resetForm()
              dispatch(getWorkDocuments(params.id))
              setAdding(false)
              setVisible(false)
              setDocument({})
              toast.success('Folder Added Successfully')
            }
          } catch (err) {
            setDocument({})
            setAdding(false)
            console.log(err)
            toast.error('Failed to add folder')
          }
        } else {
          if (document?.pictureId) {
            try {
              let res = await request.createWorkDocument({
                ...values,
                pictureId: document?.pictureId ? document?.pictureId : 0,
              })
              if (res.data) {
                formik.resetForm()
                dispatch(getWorkDocuments(params.id))
                setAdding(false)
                setVisible(false)
                setDocument({})
                toast.success('File Added Successfully')
              }
            } catch (err) {
              console.log(err)
              setAdding(false)
              setDocument({})
              toast.error('Failed to add file')
            }
          } else {
            toast.error('Upload A File')
          }
        }
      } else {
        if (formType === 'Folder') {
          try {
            let res = await request.createFolder(values)
            if (res.data) {
              formik.resetForm()
              dispatch(getDocumentList(params.id))
              setAdding(false)
              setVisible(false)
              setDocument({})
              toast.success('Folder Added Successfully')
            }
          } catch (err) {
            setDocument({})
            setAdding(false)
            console.log(err)
            toast.error('Failed to add folder')
          }
        } else {
          if (document?.pictureId) {
            try {
              let res = await request.createDocument({
                ...values,
                pictureId: document?.pictureId ? document?.pictureId : 0,
              })
              if (res.data) {
                formik.resetForm()
                dispatch(getDocumentList(params.id))
                setAdding(false)
                setVisible(false)
                setDocument({})
                toast.success('File Added Successfully')
              }
            } catch (err) {
              console.log(err)
              setAdding(false)
              setDocument({})
              toast.error('Failed to add file')
            }
          } else {
            toast.error('Upload A File')
          }
        }
      }
    },
  })
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        {formType === 'Folder' ? <h3>Create Folder</h3> : <h3>Upload Document</h3>}
      </CModalHeader>
      <CModalBody className="ps-5">
        {formType === 'Folder' && (
          <form onSubmit={formik.handleSubmit}>
            <CRow>
              <CCol sm={4}>
                <CFormLabel className="fw-bold">Folder Name</CFormLabel>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  value={formik.values.folderName}
                  onChange={formik.handleChange}
                  id="folderName"
                  className={formik.errors.folderName && 'border-danger'}
                />
                <div className="validator-message text-danger">
                  {formik.errors.folderName && formik.errors.folderName}
                </div>
              </CCol>
            </CRow>
          </form>
        )}
        {formType === 'File' && (
          <form onSubmit={formik.handleSubmit}>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel className="fw-bold">Select Folder</CFormLabel>
              </CCol>
              <CCol sm={6}>
                <CFormSelect
                  className={formik.errors.folderGuid && 'border-danger'}
                  value={formik.values.folderGuid}
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue('folderGuid', e.target.value)
                    }
                  }}
                  id="folderGuid"
                >
                  <option disabled defaultValue value={''}></option>
                  {DocType === 'worklocation'
                    ? documents?.length > 0 &&
                      documents.map((folder, index) => (
                        <option key={index} value={folder.folderGuid}>
                          {folder.folderName}
                        </option>
                      ))
                    : folders?.length > 0 &&
                      folders.map((folder, index) => (
                        <option key={index} value={folder.folderGuid}>
                          {folder.folderName}
                        </option>
                      ))}
                </CFormSelect>
                <div className="validator-message text-danger">
                  {formik.errors.folderGuid && formik.errors.folderGuid}
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormLabel className="fw-bold">Document Name</CFormLabel>
              </CCol>
              <CCol sm={6}>
                <CFormInput
                  className={formik.errors.documentName && 'border-danger'}
                  value={formik.values.documentName}
                  onChange={formik.handleChange}
                  id="documentName"
                />
                <div className="validator-message text-danger">
                  {formik.errors.documentName && formik.errors.documentName}
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={4}>
                <CFormLabel className="fw-bold">Upload Document</CFormLabel>
              </CCol>
              <CCol sm="auto">
                <button
                  onClick={() => handleUpload()}
                  disabled={uploadingDocs}
                  className={
                    uploadingDocs
                      ? `button-primary d-flex justify-content-between align-items-center`
                      : `button-primary`
                  }
                  type="button"
                >
                  Upload
                  {uploadingDocs && (
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
                <CFormInput
                  ref={fileRef}
                  onChange={handleDocumentChange}
                  type="file"
                  accept=".pdf,.png,.jpeg"
                  id="document"
                  style={{ display: 'none' }}
                />
              </CCol>
              {document?.pictureId && (
                <CCol>
                  <FaFileAlt size={25} color="#A70000" />
                  {document?.fileName}
                </CCol>
              )}
            </CRow>
          </form>
        )}
      </CModalBody>
      <CModalFooter>
        <button
          className={
            adding
              ? `button-primary d-flex justify-content-between align-items-center`
              : `button-primary`
          }
          type="submit"
          disabled={adding}
          onClick={formik.handleSubmit}
        >
          Add
          {adding && (
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
      </CModalFooter>
    </CModal>
  )
}

export default AddDocument

AddDocument.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  formType: PropTypes.string,
  DocType: PropTypes.string,
}
