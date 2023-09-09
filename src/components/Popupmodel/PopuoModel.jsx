import axios from 'axios';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { BASEPATH } from '../../config';
import { toast } from 'react-toastify';

export default function FormElements({ open, setOpen }) {

    const [schoolName, setSchoolName] = useState('');
    const [schoolCode, setSchoolCode] = useState('');
    const [loading, setLoading] = useState(false);

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
        <>
            <Modal show={open} size="lg" popup onClose={() => setOpen(false)} >
                <Modal.Header />
                <Modal.Body style={{minHeight: '300px'}}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white"  style={{ marginBottom: '1rem' }}>Create School</h3>
                        <div  style={{ marginBottom: '1rem' }}>
                            <div className="mb-2 block">
                                <Label htmlFor="School Name" value="School Name" />
                            </div>
                            <TextInput
                                placeholder="School Name.."
                                required
                                name="schoolname"
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                            />
                        </div>
                        <div  style={{ marginBottom: '1rem' }}>
                            <div className="mb-2 block">
                                <Label htmlFor="School Code" value="School Code" />
                            </div>
                            <TextInput
                                type="password"
                                placeholder='School Code'
                                required
                                name="schoolcode"
                                value={schoolCode}
                                onChange={(e) => setSchoolCode(e.target.value)}
                            />
                        </div>
                        <div className="w-full"  style={{ marginTop: '1rem' }}>
                            <Button isProcessing={loading} onClick={handleCreateSchool}>Create</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


