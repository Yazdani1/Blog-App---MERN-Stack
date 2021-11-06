import React from "react";
import { Link, useHistory } from "react-router-dom";


const DashboardNav = () => {
  return (
    <div>
      <Link to="/Dashboard"><p>Dashboard</p></Link>
      <Link to="/createpost"><p>Createpost</p></Link>
      <p>Profile</p>
      <p>Setting</p>
    </div>
  );
};

export default DashboardNav;
