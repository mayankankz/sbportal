
import "./AdminHome.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/adminfeatured/Featured";
import Chart from "../../../components/chart/Chart"
import Table from '../../../components/table/Table'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEPATH } from "../../../config";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
      getData()
  }, [])

  async function getData() {
    setLoading(true);
    try {
      await axios.get(`${BASEPATH}app/admindashboard`).then((res) => {
        setData(res.data.data);
        setCounts(res.data.counts);
        setChartData(res.data.studentsChart)
        console.log(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }).catch((err) => {
        toast.error(err.data.message, {
          position: toast.POSITION.TOP_CENTER,

        });
        setLoading(false);
      })

    } catch (error) {
      setLoading(false);
    }
  }

  

  return (
    
    <div className="homeContainer">
    {loading && <Loader />}
      {data && <><div className="widgets">
        <Widget type="Schools" amount={counts.schoolsCount} />
        <Widget type="Students" amount={counts.studentCount} />
        <Widget type="Invoices" amount={counts.invoiceInfo?.invoiceCount} />
        <Widget type="balance" amount={counts.invoiceInfo?.total_price.toFixed(2)} />
      </div>
      <div className="charts">
        <Featured data={data} />
        <Chart title="Last 6 Months (Students Data)" chartData={chartData} aspect={2 / 1} />
      </div>
    </>
    }

    </div>

  );
};

export default Dashboard;
