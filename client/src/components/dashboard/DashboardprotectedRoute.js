import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import Nav from "../../Nav";
import "./DashboardNav.css";
import { UserContext } from "../UserContext";
import Navwebview from "../dashboard/Navbar/Navwebview";
import Navheader from "../dashboard/Navbar/Navheader";
import { GiHamburgerMenu } from "react-icons/gi";

import "../dashboard/Navbar/navheader.css";
import "../dashboard/Navbar/navweb.css";
import "../dashboard/Navbar/navmobile.css";

const DashboardprotectedRoute = (props) => {
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();
  let DashboardProtected = props.Dashboardprocomp;

  useEffect(() => {
    if (!localStorage.getItem("tokenLogin")) {
      history.push("/signin");
    } else {
      // history.push("/Dashboard");
    }
  }, [user, setUser]);

  const [sidebar, setSidebar] = useState(true);

  const openNavbar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="container-fluid">
      {/* <Nav /> */}
      {/* <Navheader /> */}

        <Navheader data={openNavbar} />

        {/* <div className="container fluid"> */}
        <div className="row">
          <div className="col-xl-2">
            <Navwebview sidebar={sidebar} />
            {/* <DashboardNav /> */}
          </div>
          <div className="col-xl-10">
            <DashboardProtected />
          </div>
          {/* </div> */}
        </div>
   
    </div>
  );
};

export default DashboardprotectedRoute;
