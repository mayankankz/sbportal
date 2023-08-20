import React, { useEffect, useState } from 'react'
import { BASEPATH } from '../../../config'
import axios from 'axios'
import { Button } from '@mui/material'
import DataGridTable from '../../../components/DatagridTable/DatagridTable'

export const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
  
    function handleDelete(id) {
      console.log('id', id);
  
    }
  
  
    async function fetchUsers() {
      setLoading(true);
      axios.get(`${BASEPATH}user/getallusers`).then((response) => {
  
        setUsers(response.data.data)
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
    }
  
    useEffect(() => {
        fetchUsers()
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
    {users.length ? <DataGridTable actionColumn={actionColumn} data={users} Title={'Create New User'} /> : 'No Record Found'}
    </div>
  )
}
