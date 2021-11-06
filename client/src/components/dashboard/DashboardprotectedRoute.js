import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import DashboardNav from './DashboardNav';

const DashboardprotectedRoute = (props) => {
    const history = useHistory();

    let DashboardProtected = props.Dashboardprocomp;
  
    useEffect(() => {
      if (!localStorage.getItem("tokenLogin")) {
        history.push("/signin");
      } else {
        history.push("/Dashboard");
      }
    }, []);
    return (
      <div>
        <DashboardNav />
        <DashboardProtected />
      </div>
    );
  
}

export default DashboardprotectedRoute
