import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "./navmobilefront.css";
import "./navwebfront.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";


const Navbarwebviewfront = () => {

    const [userdetails, setUserdetails] = useContext(UserContext);


  return (
    <>
      <div className="nav-dashboard-front">
        
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
      </div>
    </>
  );
};

export default Navbarwebviewfront;
