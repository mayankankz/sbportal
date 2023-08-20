import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/material/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/material/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import axios from 'axios'; // Import Axios
import { BASEPATH } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BasicModalDialog({ open, setOpen }) {
  const [schoolName, setSchoolName] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [loading , setLoading] = useState(false);


  const handleCreateSchool = () => {
    setLoading(true);
    // Prepare the data for the POST request
    const data = {
      schoolname: schoolName,
      schoolcode: schoolCode,
    };

    // Make the Axios POST request to your server
    axios
      .post(`${BASEPATH}user/createschool`, data)
      .then((response) => {
        // Handle the response if needed (e.g., show a success message)
        console.log('School created successfully!', response.data);
        toast.success('School created successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error('Error creating school:', error);
        toast.error(`${error.response.data.errors[0].msg}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
      setLoading(false);
      
  };

  return (
    <React.Fragment>
    
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500, minWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new school
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the school.
          </Typography>
          <form onSubmit={(event) => event.preventDefault()}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>School Name</FormLabel>
                <Input
                  autoFocus
                  required
                  name="schoolname"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>School Code</FormLabel>
                <Input
                  required
                  name="schoolcode"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                />
              </FormControl>
              <Button type="button" onClick={handleCreateSchool}>
                {loading ? 'Loading': 'create'}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
