import React, { useState } from 'react'
import './StudentData.scss'
import DropDown from '../../../components/DropDown/DropDown'
import { Alert } from '@mui/material';
import { Button } from 'flowbite-react';
import { useEffect } from 'react'
import axios from 'axios'
import { BASEPATH } from '../../../config'
import Loader from '../../../components/loader/Loader'
import { classes, schoolcolumns, schoolrows } from '../../../data'
import DataGridTable from '../../../components/DatagridTable/DatagridTable'
import StudentImage from '../../../components/StudentImage/StudentImage'
import jsPDF from 'jspdf'; // Import jspdf
import 'jspdf-autotable';
import { createTheme } from '@mui/material/styles';
import { toast } from 'react-toastify'
import {BsCloudDownload} from 'react-icons/bs'
import {AiOutlineReload} from 'react-icons/ai'
function StudentData() {
  const [schools, setSchools] = useState([])
  const [school, setSchool] = useState('')
  const [classValue, setClassValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingphoto, setLoadingPhoto] = useState(false)
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [studentsData, setStudentsData] = useState([])



const theme = createTheme({
  palette: {
    ochre: {
      main: '#DA423D',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});


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
      if(response.data.students.length){
        toast.success('Students data fetched successfully.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      
      if( response.data.students.length === 0){
        toast.warning('No students found.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  async function fetchStudentsPhoto() {
debugger
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

  


  const actionColumn = {
    field: "Image",
    headerName: "Image",
    flex: 1,
    renderCell: (params) => {
      return (
        <StudentImage id={params.row.id} />
      );
    },
  };

  


  // async function generatePDF() {
  //   debugger
  //   if (!school.trim() || !classValue.trim()) {
  //     setIsError(true);
  //     setError('Please select school and class.');
  //     setTimeout(() => {
  //       setIsError(false);
  //       setError('');
  //     }, 1000);
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   const imagePromises = []; // Array to store promises for fetching image URLs

  //   setLoadingPdf(true);

  //   // Fetch image URLs for each student and store the promises
  //   studentsData.forEach(async(student) => {
  //     debugger
  //       await getImage(student.id)
  //       .then((imageUrl) => {
  //         student.image = imageUrl; // Store the image URL in the student object
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         // Handle any errors while fetching image URLs (optional)
  //       });
  //   });


  //   setLoadingPdf(false);

  //   const columns = studentsData.length > 0 ? Object.keys(studentsData[0]).filter((key) => studentsData[0][key] !== null && studentsData[0][key] !== '').map((key) => key) : [];

  //   const tableData = studentsData.map((student) => {
  //     debugger
  //     const rowData = {};
  //     columns.forEach((col) => {
  //       rowData[col] = student[col];
  //     });
  //     rowData['Image'] = ''; // Empty placeholder for the image column
  //     return rowData;
  //   });

  //   doc.autoTable({
  //     head: [columns], // Table header
  //     body: tableData,
  //     startY: 20,
  //     didDrawPage: function (data) {
  //       if (data.pageCount === 1) {
  //         // Add images to the first page of the PDF
  //         studentsData.forEach((student, index) => {
  //           const { image } = student;
  //           if (image) {
  //             const imgWidth = 40;
  //             const imgHeight = 40;
  //             const imgX = 10;
  //             const imgY = 30 + index * 15;
  //             doc.addImage(image, 'JPEG', imgX, imgY, imgWidth, imgHeight);
  //           }
  //         });
  //       }
  //     },
  //   });

  //   // Save the PDF
  //   doc.save(`${school}_${classValue}_data.pdf`);
  // }
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

        <div className="buttongroup">

        <Button
        isProcessing={loading}
        gradientMonochrome="info"
        outline
        color ='light'
        size="md"
        onClick={fetchStudentsData}
      >
      <AiOutlineReload className="mr-3 h-5 w-4"/>
        <p>
          Get Data
        </p>
      </Button>


      <Button
        isProcessing={loadingphoto}
        outline
        gradientMonochrome="info"
        size="md"
        onClick={fetchStudentsPhoto}
      >
      <BsCloudDownload className="mr-3 h-5 w-4" />
        <p>
        Export Photos
        </p>
      </Button>
        
        </div>

      </div>
      {loading && <Loader />}
      
      {studentsData.length ? <DataGridTable data={studentsData} actionColumn={actionColumn} /> : 'No Record Found'}
    </div>
  )
}

export default StudentData