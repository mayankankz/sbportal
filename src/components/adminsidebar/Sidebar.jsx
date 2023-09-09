import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Sidebar = () => {
  //const { dispatch } = useContext(DarkModeContext);
  const {pathname} = useLocation()
  
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem('isloggedIn');
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo"><img src="/img/1.png" /><span> SB ONLINE <br />SERVICES</span></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin/adminscreen" style={{ textDecoration: "none" }} >
          <li className={`${pathname.includes('adminscreen') ? 'active' : ''}`}>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </li>
          </Link>
          
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li  className={`${pathname.includes('users') ? 'active' : ''}`}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/schools"  style={{ textDecoration: "none" }}>
            <li className={`${pathname.includes('schools') ? 'active' : ''}`}>
              <StoreIcon className="icon" />
              <span>Schools</span>
            </li>
          </Link>
          <Link to="/admin/studentdata" style={{ textDecoration: "none" }}>
            <li className={`${pathname.includes('studentdata') ? 'active' : ''}`} >
              <CreditCardIcon className="icon" />
              <span>Student Data</span>

            </li>
          </Link>
          <p className="title">Billing</p>
          <Link to="/admin/createinvoice"  style={{ textDecoration: "none" }}>
          <li className={`${pathname.includes('createinvoice') ? 'active' : ''}`}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Invoice</span>
          </li>
          </Link>

          <Link to="/admin/allinvoice"  style={{ textDecoration: "none" }}>
          <li className={`${pathname.includes('allinvoice') ? 'active' : ''}`}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>All Invoice</span>
          </li>
          </Link>

         
          <p className="title">Design And Print</p>
          <Link to="/admin/designandprint"  style={{ textDecoration: "none" }}>
            <li className={`${pathname.includes('designandprint') ? 'active' : ''}`}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Design and Print</span>
            </li>
          </Link>


          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;