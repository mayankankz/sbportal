import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import AdminHome from "./pages/AdminPages/adminhome/AdminHome";
import AdminNavbar from "./components/adminnavbar/Navbar";
import Schools from "./pages/AdminPages/Schools/Schools";
import StudentData from "./pages/AdminPages/StudentData/StudentData";
import AdminSidebar from "./components/adminsidebar/Sidebar";
import CreateSchool from "./pages/AdminPages/CreateSchool/CreateSchool";
import { Users } from "./pages/AdminPages/Users/Users";
import { DesignAndPrint } from "./pages/AdminPages/DesignAndPrint/DesignAndPrint";
import Dashboard from "./pages/AdminPages/adminhome/AdminHome";
import { CreateInvoice } from "./pages/CreateInvoice/CreateInvoice";
import { AllInvoiceList } from "./pages/AdminPages/AllInvoiceList/AllInvoiceList";


function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const AdminLayout = () => {
    return (
      <div className="app" >
        <div className="adminSidebar">
          <AdminSidebar />
          <div className="adminNavbar">
            <AdminNavbar />
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "adminscreen",
          element: <Dashboard />
        },
        {
          path: "schools",
          element: <Schools />
        },
        {
          path: "users",
          element: <Users />
        },
        {
          path: "createinvoice",
          element: <CreateInvoice />
        },
        {
          path: "designandprint",
          element: <DesignAndPrint />
        },
        {
          path: "createschool",
          element: <CreateSchool title={'Create School'}/>
        },
        {
          path: "studentdata",
          element: <StudentData />
        },
        {
          path: "allinvoice",
          element: <AllInvoiceList />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
