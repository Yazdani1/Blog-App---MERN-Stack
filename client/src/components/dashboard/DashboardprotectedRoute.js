import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import Nav from "../../Nav";
import "./DashboardNav.css";
const DashboardprotectedRoute = (props) => {
  const history = useHistory();

  let DashboardProtected = props.Dashboardprocomp;

  useEffect(() => {
    if (!localStorage.getItem("tokenLogin")) {
      history.push("/signin");
    } else {
      // history.push("/Dashboard");
    }
  }, []);
  return (
    <div>
      <Nav />
      <div className="container dashboard-nav-protected">
      
        <div className="row">
          <div className="col-md-4 ">
            <DashboardNav />
          </div>
          <div className="col-md-8">
            <DashboardProtected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardprotectedRoute;
