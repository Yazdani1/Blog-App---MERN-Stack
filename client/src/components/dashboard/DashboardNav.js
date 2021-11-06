import React from "react";
import { Link, useHistory } from "react-router-dom";
import Mypost from "../Mypost";

const DashboardNav = () => {
  return (
    <div className="container">
      <Link to="/Dashboard">
        <p>Dashboard</p>
      </Link>
      <Link to="/createpost">
        <p>Createpost</p>
      </Link>
      <p>Profile</p>
      <p>Setting</p>
      {/* <div className="row">
        <div className="col-md-4">
          <Link to="/Dashboard">
            <p>Dashboard</p>
          </Link>
          <Link to="/createpost">
            <p>Createpost</p>
          </Link>
          <p>Profile</p>
          <p>Setting</p>
        </div>
        <div className="col-md-8">
          <Mypost />
        </div>
      </div> */}
    </div>
  );
};

export default DashboardNav;
