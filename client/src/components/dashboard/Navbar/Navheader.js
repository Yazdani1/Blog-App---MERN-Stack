import React, { useState, useContext } from "react";
import "./navheader.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Navwebview from "./Navwebview";
import { UserContext } from "../../UserContext";
import { NavLink } from "react-router-dom";

const Navheader = (props) => {
  const [userdetails, setUserdetails] = useContext(UserContext);

  return (
    <>
      <div className="nav-dashboard-headear">
        <li>
          <GiHamburgerMenu size={25} onClick={props.data} />
        </li>
        <ul>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            <li>Home</li>
          </NavLink>
          <li>{userdetails && userdetails.name}</li>

          <div className="profile-image">
            {userdetails && userdetails.photo ? (
              <img src={userdetails && userdetails.photo} />
            ) : (
              <div className="profile-nave-avatar">
                <h4>
                  {userdetails &&
                    userdetails.name.substring(0, 2).toUpperCase()}
                </h4>
              </div>
            )}
          </div>

          {/* <div className="profile">
            {userdetails && userdetails.photo ? (
              <img
                src={userdetails && userdetails.photo}
                className="profile-picture-image"
              />
            ) : (
              <div className="profile-picture">
                <h4>
                  {userdetails &&
                    userdetails.name.substring(0, 2).toUpperCase()}
                </h4>
              </div>
            )}
          </div> */}
        </ul>
      </div>
    </>
  );
};

export default Navheader;
