import React, { useState } from 'react'
import './Schools.scss'
import { DataGrid } from '@mui/x-data-grid';
import DataGridTable from '../../../components/DatagridTable/DatagridTable';
import { schoolcolumns, schoolrows } from '../../../data';
import DropDown from '../../../components/DropDown/DropDown';
import { useEffect } from 'react';
import axios from 'axios';
import { BASEPATH } from '../../../config';
import {RiDeleteBin6Line} from 'react-icons/ri'
import Loader from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox';
import { Button } from 'flowbite-react';
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';

function Schools() {
  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [classValue, setClassValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(null)


  async function handleDelete() {
    try {
      const responce = await axios.delete(`${BASEPATH}user/deleteschool/${id}`);
      toast.success('School deleted successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });
      setOpen(false);
      await fetchSchools();
    } catch (error) {
      
      console.log(error);
     
    }

  }

  function handleOpenHandle (params){
    setId(params.row.id)
    setOpen(true);

  }



  async function fetchSchools() {
    setLoading(true);
    axios.get(`${BASEPATH}user/getallschools`).then((response) => {

      setSchools(response.data.schools)
      toast.success('Schools fetched successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });
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

          <div className="delete" onClick={()=> handleOpenHandle(params)}>
          <IconButton aria-label="delete" title="Delete" color="error">
          <DeleteOutlinedIcon  />
        </IconButton>
          </div>
        </div>
      );
    },
  };

  if(loading){
    return <Loader />
  }
    

  return (
    <div className="schoolsContainer">
    {open && <ConfirmBox open={open} setOpen={setOpen} Message={'Are you sure you want to delete this School?'} onConfirm={handleDelete} />}
    {schools.length ? <DataGridTable actionColumn={actionColumn} data={schools} Title={'Create New School'} /> : 'No Record Found'}
    </div>
  )
}

export default Schools