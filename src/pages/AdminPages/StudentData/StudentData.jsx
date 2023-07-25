import React, { useState } from 'react'
import './StudentData.scss'
import DropDown from '../../../components/DropDown/DropDown'
import { Alert, Button } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import { BASEPATH } from '../../../config'
import Loader from '../../../components/loader/Loader'
import { classes, schoolcolumns, schoolrows } from '../../../data'
import DataGridTable from '../../../components/DatagridTable/DatagridTable'
function StudentData() {
  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [classValue, setClassValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingphoto, setLoadingPhoto] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [studentsData, setStudentsData] = useState([])

  async function fetchStudentsData() {

    if (!school.trim() || !classValue.trim()) {
      setIsError(true);
      setError('Please select schoola and class.')
      setTimeout(() => {
        setIsError(false);
        setError('')
      }, 1000)
      return
    }
    setLoading(true);
    axios.post(`${BASEPATH}user/getstudentsdata`, {
      classname: classValue,
      schoolname: school
    }).then((response) => {
      setStudentsData(() => response.data.students)
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  async function fetchStudentsPhoto() {

    if (!school.trim() || !classValue.trim()) {
      setIsError(true);
      setError('Please select schoola and class.')
      setTimeout(() => {
        setIsError(false);
        setError('')
      }, 1000)
      return
    }

    try {
      setLoadingPhoto(true)
      await axios.get(`${BASEPATH}user/downloadphotos?schoolname=${school}&classname=${classValue}`, {
        responseType: "blob", // Set the response type to 'blob' to handle binary data
      }).then((response) => {
        // Create a URL object from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and set its attributes to initiate the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${school}_${classValue}.zip`);
        document.body.appendChild(link);

        // Programmatically click the link to start the download
        link.click();

        // Remove the link from the DOM after the download is initiated
        document.body.removeChild(link);
        setLoadingPhoto(false)
      }).catch((err) => {
        setLoadingPhoto(false)
      })
    } catch (error) {
      setLoadingPhoto(false)
      console.log(error);
    }

  }

  async function fetchSchools() {
    setLoading(true);
    axios.get(`${BASEPATH}user/getallschools`).then((response) => {

      setSchools(response.data.schools.map((school) => {
        return { "label": school.schoolname, "value": school.schoolname }
      }))
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  if (loading) {
    return <Loader />
  }
  return (

    <div className="studentContainer">
      {isError && <Alert severity="error">{error}</Alert>}
      <div className="selectContainer">
        <div className="dropdown">
          <DropDown label={"School"} value={school} options={schools} onChange={setSchool} />
        </div>

        <div className="dropdown">
          <DropDown label={"Class"} value={classValue} options={classes} onChange={setClassValue} />
        </div>

        <Button variant="contained" color="success" style={{ width: '150px' }} onClick={fetchStudentsData}>
          Get Data
        </Button>

        {
          loadingphoto ? 'Please Wait' : <Button variant="contained" color="success" style={{ width: '150px' }} onClick={fetchStudentsPhoto}>
            Export Photos
          </Button>
        }




      </div>
      <h2 style={{ margin: '10px 10px 10px 0px' }}>Students Data</h2>
      {studentsData.length ? <DataGridTable data={studentsData} /> : 'No Record Found'}
    </div>
  )
}

export default StudentData