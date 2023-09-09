import React, { useEffect, useState } from 'react'
import { BASEPATH } from '../../../config'
import axios from 'axios'
import { Button, IconButton } from '@mui/material'
import DataGridTable from '../../../components/DatagridTable/DatagridTable'
import { toast } from 'react-toastify'
import Loader from '../../../components/loader/Loader'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'

export const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)


  async function handleDelete() {
    try {
      const responce = await axios.delete(`${BASEPATH}user/deleteuser/${id}`);
      toast.success('User deleted successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });
      setOpen(false);
      await fetchUsers();
    } catch (error) {

      toast.error('Something went wrong.', {
        position: toast.POSITION.TOP_CENTER,
      });

    }

  }

  function handleDeleteConfirm(id) {
    console.log(id);
    setId(id)
    setOpen(true)
  }

  async function fetchUsers() {
    setLoading(true);
    axios.get(`${BASEPATH}user/getallusers`).then((response) => {

      setUsers(response.data.data)
      toast.success('Users data fetched successfully.', {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      toast.error('Something went wronge.', {
        position: toast.POSITION.TOP_CENTER,
      });
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

          <div className="delete" onClick={() => handleDeleteConfirm(params.row.userid)}>
            <IconButton aria-label="delete" title="Delete" >
              <DeleteOutlinedIcon  color="error" />
            </IconButton>
          </div>
        </div>
      );
    },
  };
  if (loading) {
    return <Loader />
  }

  return (
    <div className="schoolsContainer">
      {open && <ConfirmBox open={open} setOpen={setOpen} Message={'Are you sure you want to delete this User?'} onConfirm={handleDelete} />}
      {users.length ? <DataGridTable actionColumn={actionColumn} data={users} Title={'Create New User'} /> : 'No Record Found'}
    </div>
  )
}
