import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "./navmobilefront.css";
import "./navwebfront.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import Navmobileviewfront from "./Navmobileviewfront";

const Navbarwebviewfront = () => {
  const [userdetails, setUserdetails] = useContext(UserContext);

  return (
    <>
      <div className="nav-dashboard-front">
        {window.localStorage.getItem("tokenLogin") ? (
          <>
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li>Home</li>
              </Link>
              <Link to={"/Dashboard"} style={{ textDecoration: "none" }}>
                <li>Dashboard</li>
              </Link>
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
            </ul>
          </>
        ) : (
          <>
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <li>Home</li>
              </Link>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "activenav-front" : "inactive"
                }
              >
                <li>Sign Up</li>
              </Link>
              <Link
                to={"/signin"}
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "activenav-front" : "inactive"
                }
              >
                <li>Sign In</li>
              </Link>
            </ul>
          </>
        )}
      </div>
      <Navmobileviewfront />
    </>
  );
};

export default Navbarwebviewfront;
