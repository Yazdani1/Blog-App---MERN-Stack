import React, { useState, useEffect,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import Nav from "../../Nav";
import "./DashboardNav.css";
import { UserContext } from "../UserContext";


const DashboardprotectedRoute = (props) => {

  const[user,setUser] = useContext(UserContext);

  const history = useHistory();

  let DashboardProtected = props.Dashboardprocomp;

  useEffect(() => {
    if (!localStorage.getItem("tokenLogin")) {
      history.push("/signin");
    } else {
      // history.push("/Dashboard");
    }
  }, [user,setUser]);
  return (
    <div>
      <Nav />
      <div className="dashboard-nav-protected">
      
        <div className="row">
          <div className="col-md-2">
            <DashboardNav />
          </div>
          <div className="col-md-9">
            <DashboardProtected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardprotectedRoute;
