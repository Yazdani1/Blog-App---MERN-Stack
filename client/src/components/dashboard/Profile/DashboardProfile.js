import React, { useState, useContext } from "react";
import "./dashboard-profile.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory } from "react-router-dom";

const DashboardProfile = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="container card">
      <h5>Profile Info</h5>
      <div className="row">
        <div className="col-md-10">
          <div className="profile-name">
            <div className="profile-avatar">
              <p>{user && user.name.substring(0, 2).toUpperCase()}</p>
            </div>
            <div className="profile-user-name">
              <p>{user && user.name}</p>
              <p>{user && user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
