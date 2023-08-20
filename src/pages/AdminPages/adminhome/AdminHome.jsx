
import "./AdminHome.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/adminfeatured/Featured";
import Chart from "../../../components/chart/Chart"
import Table from '../../../components/table/Table'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../../config";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data,setData] = useState([]);
  useEffect(()=>{
    getData()
  },[])

  async function getData(){
    try {
     await axios.get(`${BASEPATH}app/admindashboard`).then((res)=>{
      setData(res.data.data);
      
      console.log(re.data);
      
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
     }).catch((err)=>{
      toast.error(err.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
     })

    } catch (error) {
      
    }
  }

  return (
   
      <div className="homeContainer">
        
        <div className="widgets">
          <Widget type="Schools" />
          <Widget type="Students" />
          <Widget type="Invoices" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured data={data} />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
       
      </div>
   
  );
};

export default Dashboard;
