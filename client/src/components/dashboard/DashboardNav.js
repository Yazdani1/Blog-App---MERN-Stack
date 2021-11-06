import React from "react";
import { Link, useHistory } from "react-router-dom";
import Mypost from "../Mypost";
import "./DashboardNav.css";
import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";

const DashboardNav = () => {
  return (
    <div className="container card">
      <div className="row">
        <div className="col-md-12">
          <div className="adminnavbar">
            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              <li>
                <AiFillDashboard size={25} /> Dashboard
              </li>
            </Link>
            <Link to="/createpost" style={{ textDecoration: "none" }}>
              <li>
                <RiEditFill size={25} />
                Createpost
              </li>
            </Link>
            <Link to="/Dashboardprofile" style={{ textDecoration: "none" }}>
              <li>
                <FaUserNurse size={25} />
                Profile
              </li>
            </Link>

            <li>
              <RiSettings2Fill size={25} />
              Setting
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
