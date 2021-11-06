import React from "react";
import { Link, useHistory } from "react-router-dom";


const DashboardNav = () => {
  return (
    <div>
      <Link to="/myPost"><p>Dashboard</p></Link>
      <p>Creat Post</p>
      <p>Profile</p>
      <p>Setting</p>
    </div>
  );
};

export default DashboardNav;
