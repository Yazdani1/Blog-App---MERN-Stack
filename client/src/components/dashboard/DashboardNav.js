import React from "react";
import { Link, useHistory } from "react-router-dom";
import Mypost from "../Mypost";
import "./DashboardNav.css";
import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";



const DashboardNav = () => {
  return (
    <div className="container card">
      <div className="row">
        <div className="col-md-12">
          <div className="adminnavbar">
            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              <li><AiFillDashboard size={25}/> Dashboard</li>
            </Link>
            <Link to="/createpost" style={{ textDecoration: "none" }}>
              <li><RiEditFill size={25}/>Createpost</li>
            </Link>
            <Link to="/Dashboardprofile" style={{ textDecoration: "none" }}>
              <li>Profile</li>
            </Link>

            <li>Setting</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
