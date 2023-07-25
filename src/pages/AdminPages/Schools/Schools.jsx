import React, { useState } from 'react'
import './Schools.scss'
import { DataGrid } from '@mui/x-data-grid';
import DataGridTable from '../../../components/DatagridTable/DatagridTable';
import { schoolcolumns, schoolrows } from '../../../data';
import DropDown from '../../../components/DropDown/DropDown';
import { useEffect } from 'react';
import axios from 'axios';
import { BASEPATH } from '../../../config';
import { Button } from '@mui/material';

function Schools() {
  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [classValue, setClassValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [studentsData, setStudentsData] = useState([])


  function handleDelete(id) {
    console.log('id', id);

  }


  async function fetchSchools() {
    setLoading(true);
    axios.get(`${BASEPATH}user/getallschools`).then((response) => {

      setSchools(response.data.schools)
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchSchools()
  }, [])



  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">

          <div className="delete" onClick={() => handleDelete(params.row.id)}>
          <Button color='error' variant="outlined">Delete</Button>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="schoolsContainer">

      <h2 style={{marginBottom: 20}}>Schools Data</h2>
      {schools.length ? <DataGridTable actionColumn={actionColumn} data={schools} /> : 'No Record Found'}
    </div>
  )
}

export default Schools