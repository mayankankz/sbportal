import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { PieChartComponent } from "../pieChart/PieChart";

const Featured = ({data}) => {
  return (
    <div className="adminfeatured">
      <div className="top">
        <h1 className="title">Total School/Students</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <PieChartComponent chartData={data} />
        </div>
        
      </div>
    </div>
  );
};

export default Featured;
