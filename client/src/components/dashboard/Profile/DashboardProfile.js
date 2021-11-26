import React, { useState, useContext } from "react";
import "./dashboard-profile.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";

const DashboardProfile = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div className="container card profile-main-container">
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
          <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link>

            {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
          </div>
        </div>
      </div>
      <div className="container card profile-about-container">
        <div className="row">
          <div className="col-md-12">
            {/* {user && user.about ? (
              <div>
                <h5>About Me</h5>
                <hr />
              </div>
            ) : null} */}

            {/* <div>
              <h5>About Me</h5>
              <hr />
              {user && user.about }
            </div> */}

            <div className="user-about-page">
              <h5>About Me</h5>
              <hr />
              {user && user.about ? (
                <p>{ReactHtmlParser(user && user.about)}</p>
              ) : (
                "You did not add anything about yourself!"
              )}
            </div>
          </div>
          {/* <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link> */}

          {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
