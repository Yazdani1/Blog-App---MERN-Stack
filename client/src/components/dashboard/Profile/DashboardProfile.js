import React from "react";
import "./dashboard-profile.css";

const DashboardProfile = () => {
  return (
    <div className="container card">
      <h5>Profile Info</h5>
      <div className="row">
        <div className="col-md-10">
          <div className="profile-name">
            <div className="profile-avatar">
              <p>HP</p>
            </div>
            <div className="profile-user-name">
              <p>Muller Jon</p>
              <p>email@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <h5>Edit</h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
