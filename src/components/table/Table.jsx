import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {DeleteForeverOutlined, DeleteOutline, RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import axios from "axios";
import { BASEPATH } from "../../config";
import { toast } from "react-toastify";

const List = () => {
  const [rows,setRows] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    
      fetchInoices();
    
  },[])

  async function fetchInoices(){
    try {
      setLoading(true)
      await axios.get(`${BASEPATH}app/getallinvoice`).then((res)=>{
        setRows(res.data.data);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }).catch((err)=>{
        toast.error(`Something went wronge.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      })
      
    } catch (error) {
      toast.error(`Something went wronge.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
    } 
  }
  

  return (
    <>

    <div className="datatableTitle">Previous Invoices</div>
    {loading && <Loader />}
    {rows.length > 0 ?  <TableContainer component={Paper} className="table">
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor: '#E33931'}}>
          <TableRow style={{color: 'white'}}>
            <TableCell className="tableCell">Invoice Number</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Issue Date</TableCell>
            <TableCell className="tableCell">Due Date</TableCell>
            <TableCell className="tableCell">Total Amount</TableCell>
            <TableCell className="tableCell">Gst</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.invoicenumber}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.issuedate}</TableCell>
              <TableCell className="tableCell">{row.duedate}</TableCell>
              <TableCell className="tableCell">{row.total}</TableCell>
              <TableCell className="tableCell">{row.isgstbill === false ? 'Non Gst' : 'Gst Bill'}</TableCell>
              
              <TableCell className="tableCell">
                <span className={`status ${row.status === 'Unpaid' ? 'Pending' : 'Approved' }`}>{row.status}</span>
              </TableCell>
              <TableCell className="tableCell">
                <Tooltip title="Preview">
                  <IconButton onClick={() => console.log(row.id)}>
                    <RemoveRedEyeOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => console.log(row.id)}>
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> 
    </TableContainer>: 'No Invoice Found.'}</>
  );
};

export default List;
